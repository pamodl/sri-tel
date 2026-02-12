package com.sricare.userservice.controller;

import com.sricare.userservice.dto.AuthResponse;
import com.sricare.userservice.dto.LoginRequest;
import com.sricare.userservice.dto.RegisterRequest;
import com.sricare.userservice.entity.User;
import com.sricare.userservice.jwt.JwtTokenProvider;
import com.sricare.userservice.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (userRepository.findByUsername(req.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username already exists"));
        }
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setPhoneNumber(req.getPhoneNumber());

        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully", "username", user.getUsername()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        var user = userRepository.findByUsername(req.getUsername());
        if (user.isEmpty() || !passwordEncoder.matches(req.getPassword(), user.get().getPasswordHash())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }

        User u = user.get();
        String token = tokenProvider.generateToken(u.getUsername());
        return ResponseEntity.ok(new AuthResponse(token, u.getUsername(), u.getEmail(), u.getId()));
    }

    @PostMapping("/password/reset")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        var user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email not found"));
        }
        // TODO: Send OTP via email; for now, return success
        return ResponseEntity.ok(Map.of("message", "Reset link sent to email"));
    }

    @PostMapping("/password/change")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String oldPassword = body.get("oldPassword");
        String newPassword = body.get("newPassword");

        var user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
        }

        User u = user.get();
        if (!passwordEncoder.matches(oldPassword, u.getPasswordHash())) {
            return ResponseEntity.status(401).body(Map.of("error", "Old password is incorrect"));
        }

        u.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(u);
        return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        var user = userRepository.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user.get());
    }
}
