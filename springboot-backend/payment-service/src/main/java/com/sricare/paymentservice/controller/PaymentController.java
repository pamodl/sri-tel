package com.sricare.paymentservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/payments")
public class PaymentController {
    private final RestTemplate rest = new RestTemplate();
    private final String paymentGatewayUrl = "http://payment-gateway:4000/pay"; // when run in docker

    @PostMapping("/pay")
    public ResponseEntity<?> pay(@RequestBody Map<String, Object> body) {
        // forward to mock payment gateway
        try {
            Object resp = rest.postForObject(paymentGatewayUrl, body, Object.class);
            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            // fallback: return local success if gateway not available
            return ResponseEntity.ok(Map.of("status","mock-success","detail","gateway-unreachable"));
        }
    }
}
