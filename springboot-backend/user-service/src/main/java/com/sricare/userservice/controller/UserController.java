package com.sricare.userservice.controller;

import com.sricare.userservice.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/users")
public class UserController {
    private final Map<String, User> users = new ConcurrentHashMap<>();

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        String id = UUID.randomUUID().toString();
        user.setId(id);
        users.put(id, user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> body) {
        String phone = body.get("phone");
        String password = body.get("password");
        for (User u : users.values()) {
            if (u.getPhone() != null && u.getPhone().equals(phone) && u.getPassword().equals(password)) {
                return ResponseEntity.ok("token-" + u.getId());
            }
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/password/reset")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> body) {
        String phone = body.get("phone");
        for (User u : users.values()) {
            if (u.getPhone() != null && u.getPhone().equals(phone)) {
                // In real app send OTP; here return a fake token
                return ResponseEntity.ok("reset-token-for-" + u.getId());
            }
        }
        return ResponseEntity.badRequest().body("Phone not found");
    }

    @PutMapping("/password/change")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> body) {
        String id = body.get("id");
        String newPass = body.get("password");
        User u = users.get(id);
        if (u == null) return ResponseEntity.badRequest().body("User not found");
        u.setPassword(newPass);
        return ResponseEntity.ok("Password updated");
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id) {
        User u = users.get(id);
        if (u == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(u);
    }
}
