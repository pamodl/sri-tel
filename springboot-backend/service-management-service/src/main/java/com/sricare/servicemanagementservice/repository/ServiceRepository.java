package com.sricare.servicemanagementservice.repository;

import com.sricare.servicemanagementservice.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findByUserId(Long userId);
    Optional<Service> findByUserIdAndName(Long userId, String name);
}
