package com.sricare.notificationservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/notify")
public class NotificationController {
    @PostMapping
    public ResponseEntity<?> notify(@RequestBody Map<String, Object> body) {
        // In real system we would publish to RabbitMQ or send via SMTP/SMS gateway
        System.out.println("[Notification] " + body);
        return ResponseEntity.ok(Map.of("status","queued","detail",body));
    }
}
