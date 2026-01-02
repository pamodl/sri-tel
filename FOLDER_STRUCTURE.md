# Sri-Care Solution - Sample Folder Structure

This folder structure is designed for a microservices-based architecture with clear separation of backend services, frontend, mocks, and Docker setup.

## Root Structure
- backend/                # All backend microservices
- frontend/               # Web frontend (React.js or similar)
- mocks/                  # Mocked external services (Provisioning, Payment Gateway)
- docker/                 # Docker Compose and related setup

## Backend Microservices
- backend/user-service/           # User management (registration, login, password)
- backend/billing-service/        # Billing and bill history
- backend/payment-service/        # Payment processing
- backend/notification-service/   # Email/SMS/Push notifications
- backend/service-management-service/ # Service activation/deactivation
- backend/common/                 # Shared code/utilities

## Mocks
- mocks/provisioning-system/      # Mock Provisioning System
- mocks/payment-gateway/          # Mock Payment Gateway

## Docker
- docker/db/                      # Database setup (PostgreSQL/MySQL)
- docker/message-broker/          # Message broker setup (RabbitMQ/Kafka)

---

You can now add code templates and Docker Compose files in these folders to start your implementation.