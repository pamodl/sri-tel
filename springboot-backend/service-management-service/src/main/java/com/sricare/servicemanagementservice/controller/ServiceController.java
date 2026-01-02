package com.sricare.servicemanagementservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/services")
public class ServiceController {
    private final RestTemplate rest = new RestTemplate();
    private final String provisioningUrl = "http://provisioning-system:4000/activate"; // for activate
    private final String provisioningDeactivate = "http://provisioning-system:4000/deactivate";

    @PostMapping("/activate")
    public ResponseEntity<?> activate(@RequestBody Map<String, Object> body) {
        try {
            Object resp = rest.postForObject(provisioningUrl, body, Object.class);
            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            return ResponseEntity.status(502).body(Map.of("error","provisioning-unavailable"));
        }
    }

    @PostMapping("/deactivate")
    public ResponseEntity<?> deactivate(@RequestBody Map<String, Object> body) {
        try {
            Object resp = rest.postForObject(provisioningDeactivate, body, Object.class);
            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            return ResponseEntity.status(502).body(Map.of("error","provisioning-unavailable"));
        }
    }
}
