package com.sricare.paymentservice.controller;

import com.sricare.paymentservice.amqp.AmqpConfig;
import com.sricare.paymentservice.amqp.NotificationMessage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/payments")
public class PaymentController {
    private final RestTemplate rest = new RestTemplate();
    private final String paymentGatewayUrl = "http://payment-gateway:4000/pay"; // when run in docker
    private final RabbitTemplate rabbitTemplate;

    public PaymentController(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @PostMapping("/pay")
    public ResponseEntity<?> pay(@RequestBody Map<String, Object> body) {
        try {
            Object resp = rest.postForObject(paymentGatewayUrl, body, Object.class);

            // publish notification about successful payment
            String user = body.containsKey("userId") ? body.get("userId").toString() : "unknown";
            String msg = "Payment processed for user: " + user;
            NotificationMessage n = new NotificationMessage("payment", user, msg);
            rabbitTemplate.convertAndSend(AmqpConfig.NOTIFICATION_QUEUE, n);

            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            // fallback: return local success if gateway not available
            try {
                String user = body.containsKey("userId") ? body.get("userId").toString() : "unknown";
                String msg = "Payment (fallback) processed for user: " + user;
                NotificationMessage n = new NotificationMessage("payment", user, msg);
                rabbitTemplate.convertAndSend(AmqpConfig.NOTIFICATION_QUEUE, n);
            } catch (Exception ignore) {}
            return ResponseEntity.ok(Map.of("status","mock-success","detail","gateway-unreachable"));
        }
    }
}
