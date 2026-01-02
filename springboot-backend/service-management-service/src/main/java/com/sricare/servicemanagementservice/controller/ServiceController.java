package com.sricare.servicemanagementservice.controller;

import com.sricare.servicemanagementservice.amqp.AmqpConfig;
import com.sricare.servicemanagementservice.amqp.NotificationMessage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
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
    private final RabbitTemplate rabbitTemplate;

    public ServiceController(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @PostMapping("/activate")
    public ResponseEntity<?> activate(@RequestBody Map<String, Object> body) {
        try {
            Object resp = rest.postForObject(provisioningUrl, body, Object.class);

            // publish notification about service activation
            String user = body.containsKey("userId") ? body.get("userId").toString() : "unknown";
            String service = body.containsKey("service") ? body.get("service").toString() : "service";
            String msg = "Service activated: " + service + " for user: " + user;
            NotificationMessage n = new NotificationMessage("service_activation", user, msg);
            rabbitTemplate.convertAndSend(AmqpConfig.NOTIFICATION_QUEUE, n);

            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            return ResponseEntity.status(502).body(Map.of("error","provisioning-unavailable"));
        }
    }

    @PostMapping("/deactivate")
    public ResponseEntity<?> deactivate(@RequestBody Map<String, Object> body) {
        try {
            Object resp = rest.postForObject(provisioningDeactivate, body, Object.class);

            // publish notification about service deactivation
            String user = body.containsKey("userId") ? body.get("userId").toString() : "unknown";
            String service = body.containsKey("service") ? body.get("service").toString() : "service";
            String msg = "Service deactivated: " + service + " for user: " + user;
            NotificationMessage n = new NotificationMessage("service_deactivation", user, msg);
            rabbitTemplate.convertAndSend(AmqpConfig.NOTIFICATION_QUEUE, n);

            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            return ResponseEntity.status(502).body(Map.of("error","provisioning-unavailable"));
        }
    }
}
