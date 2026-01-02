package com.sricare.billingservice.controller;

import com.sricare.billingservice.model.Bill;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/bills")
public class BillingController {
    private final Map<String, List<Bill>> billsByUser = new HashMap<>();

    public BillingController() {
        // seed sample data
        Bill b1 = new Bill("b1","user-1", 12.5, "2025-11");
        Bill b2 = new Bill("b2","user-1", 8.9, "2025-12");
        billsByUser.put("user-1", new ArrayList<>(Arrays.asList(b1,b2)));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Bill>> getBills(@PathVariable String userId) {
        List<Bill> list = billsByUser.getOrDefault(userId, Collections.emptyList());
        return ResponseEntity.ok(list);
    }

    @GetMapping
    public ResponseEntity<Map<String, List<Bill>>> getAll() {
        return ResponseEntity.ok(billsByUser);
    }
}
