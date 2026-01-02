# Spring Boot Microservices for Sri-Care

## Structure
- user-service
- billing-service
- payment-service
- notification-service
- service-management-service

Each folder contains a minimal Spring Boot application with a REST endpoint at `/`.

## How to Build and Run
1. Build each service with Maven or Gradle:
   - `cd user-service && mvn clean package`
   - Repeat for each service
2. Use the provided `docker-compose-springboot.yml` to run all services, PostgreSQL, and RabbitMQ:
   - `cd ../../docker`
   - `docker-compose -f docker-compose-springboot.yml up --build`

## Next Steps
- Add `pom.xml` or `build.gradle` to each service
- Implement business logic and REST endpoints
- Configure database and message broker connections

---
This is a minimal scaffold. Extend as needed for your assignment.
