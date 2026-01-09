package com.sricare.servicemanagementservice.controller;

import com.sricare.servicemanagementservice.amqp.AmqpConfig;
import com.sricare.servicemanagementservice.amqp.NotificationMessage;
import com.sricare.servicemanagementservice.dto.ServiceDTO;
import com.sricare.servicemanagementservice.entity.Service;
import com.sricare.servicemanagementservice.repository.ServiceRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/services")
public class ServiceController {
    private final RestTemplate rest = new RestTemplate();
    private final String provisioningUrl = "http://provisioning-system:4000/activate";
    private final String provisioningDeactivate = "http://provisioning-system:4000/deactivate";
    private final RabbitTemplate rabbitTemplate;
    private final ServiceRepository serviceRepository;

    public ServiceController(RabbitTemplate rabbitTemplate, ServiceRepository serviceRepository) {
        this.rabbitTemplate = rabbitTemplate;
        this.serviceRepository = serviceRepository;
    }

    @PostMapping("/activate")
    public ResponseEntity<?> activate(@RequestBody Map<String, Object> body) {
        try {
            Object resp = rest.postForObject(provisioningUrl, body, Object.class);

            // Save service activation status
            Long userId = body.containsKey("userId") ? Long.parseLong(body.get("userId").toString()) : null;
            String serviceName = body.containsKey("service") ? body.get("service").toString() : "service";
            
            if (userId != null) {
                Service service = serviceRepository.findByUserIdAndName(userId, serviceName)
                        .orElse(new Service());
                service.setUserId(userId);
                service.setName(serviceName);
                service.setStatus("active");
                serviceRepository.save(service);
            }

            // publish notification about service activation
            String user = userId != null ? userId.toString() : "unknown";
            String msg = "Service activated: " + serviceName + " for user: " + user;
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

            // Save service deactivation status
            Long userId = body.containsKey("userId") ? Long.parseLong(body.get("userId").toString()) : null;
            String serviceName = body.containsKey("service") ? body.get("service").toString() : "service";
            
            if (userId != null) {
                Service service = serviceRepository.findByUserIdAndName(userId, serviceName)
                        .orElse(new Service());
                service.setUserId(userId);
                service.setName(serviceName);
                service.setStatus("inactive");
                serviceRepository.save(service);
            }

            // publish notification about service deactivation
            String user = userId != null ? userId.toString() : "unknown";
            String msg = "Service deactivated: " + serviceName + " for user: " + user;
            NotificationMessage n = new NotificationMessage("service_deactivation", user, msg);
            rabbitTemplate.convertAndSend(AmqpConfig.NOTIFICATION_QUEUE, n);

            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            return ResponseEntity.status(502).body(Map.of("error","provisioning-unavailable"));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ServiceDTO>> getUserServices(@PathVariable Long userId) {
        try {
            List<Service> services = serviceRepository.findByUserId(userId);
            List<ServiceDTO> dtos = services.stream()
                    .map(s -> new ServiceDTO(s.getId(), s.getName(), s.getStatus()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        } catch (Exception ex) {
            return ResponseEntity.status(502).body(Collections.emptyList());
        }
    }
}

