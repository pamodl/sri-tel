package com.sricare.billingservice.controller;

import com.sricare.billingservice.entity.Bill;
import com.sricare.billingservice.repository.BillRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/bills")
public class BillingController {
    private final BillRepository billRepository;

    public BillingController(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Bill>> getBills(@PathVariable Long userId) {
        List<Bill> bills = billRepository.findByUserId(userId);
        return ResponseEntity.ok(bills);
    }

    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<Bill>> getBillsByStatus(@PathVariable Long userId, @PathVariable String status) {
        List<Bill> bills = billRepository.findByUserIdAndStatus(userId, status);
        return ResponseEntity.ok(bills);
    }

    @GetMapping
    public ResponseEntity<List<Bill>> getAll() {
        return ResponseEntity.ok(billRepository.findAll());
    }
}
