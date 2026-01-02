# Sri-Care: Telecom Self-Care Platform - Complete Implementation Guide

## 1. Project Overview

**Sri-Care** is a comprehensive microservices-based telecom customer self-care platform designed for Sri Telecom Ltd (STL). It enables customers to manage their accounts, view bills, make payments, activate/deactivate services, and receive notifications—all through web and mobile interfaces.

### Architecture Overview
```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
│              (Register, Login, Dashboard, Payments)         │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS REST API
        ┌──────────────┼──────────────┐
        │              │              │
    ┌───▼──┐      ┌───▼──┐     ┌────▼────┐
    │ User │      │Billing│    │ Payment │
    │Service       │Service    │ Service │
    └──┬───┘      └──┬────┘    └────┬────┘
       │             │             │
   ┌───▼─────────────▼─────────────▼───┐
   │      PostgreSQL Database          │
   │  (Users, Bills, Transactions)     │
   └───────────────────────────────────┘

   ┌──────────────────────────┐
   │  Service Mgmt Service    │
   │ (activate/deactivate)    │
   └──────────────┬───────────┘
                  │
        ┌─────────▼────────────┐
        │ Provisioning Mock    │
        │  (REST API)          │
        └──────────────────────┘

   ┌──────────────────────────┐
   │ Notification Service     │
   │ (RabbitMQ Consumer)      │
   └──────────────┬───────────┘
                  │
        ┌─────────▼────────────┐
        │ RabbitMQ Broker      │
        │ (Pub/Sub Messaging)  │
        └──────────────────────┘
```

## 2. Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Backend Services** | Java Spring Boot | 3.2.5 |
| **Database** | PostgreSQL | 14 |
| **Message Broker** | RabbitMQ | 3-management |
| **Containerization** | Docker & Docker Compose | Latest |
| **Security** | JWT (JJWT) | 0.11.5 |
| **API Docs** | springdoc-openapi | 2.1.0 |
| **Frontend** | React | 18.2.0 |
| **HTTP Client** | Axios | 1.6.0 |

## 3. Microservices Architecture

### 3.1 User Service (Port 8081)
**Responsibility**: User authentication, registration, and account management

**Key Endpoints**:
- `POST /users/register` - Create new user account
- `POST /users/login` - Authenticate and return JWT token
- `POST /users/password/reset` - Initiate password reset
- `POST /users/password/change` - Change user password
- `GET /users/{id}` - Retrieve user profile

**Database**: PostgreSQL `users` table
**Security**: JWT token-based authentication with bcrypt password hashing

### 3.2 Billing Service (Port 8082)
**Responsibility**: Bill management and history

**Key Endpoints**:
- `GET /bills/{userId}` - Get all bills for a user
- `GET /bills/user/{userId}/status/{status}` - Filter bills by status
- `GET /bills` - Retrieve all bills (admin)

**Database**: PostgreSQL `bills` table
**Data Model**: Bill ID, User ID, Amount, Bill Date, Due Date, Paid Date, Status (PENDING/PAID/OVERDUE)

### 3.3 Payment Service (Port 8083)
**Responsibility**: Process payments through external Payment Gateway

**Key Endpoints**:
- `POST /payments/pay` - Process payment transaction
  - Forwards request to Payment Gateway mock
  - Publishes notification to RabbitMQ on success

**External Integration**: Payment Gateway Mock (Node.js, http://payment-gateway:4000/pay)
**Messaging**: Publishes payment notifications to `sricare.notifications` RabbitMQ queue

### 3.4 Service Management Service (Port 8085)
**Responsibility**: Manage service activations and deactivations

**Key Endpoints**:
- `POST /services/activate` - Activate a service (roaming, data top-up, etc.)
- `POST /services/deactivate` - Deactivate a service

**External Integration**: Provisioning System Mock (Node.js, http://provisioning-system:4000/*)
**Messaging**: Publishes service events to RabbitMQ

### 3.5 Notification Service (Port 8084)
**Responsibility**: Consume and process notifications from RabbitMQ

**Key Features**:
- Listens to `sricare.notifications` RabbitMQ queue
- Logs notifications with user, type, and timestamp
- Extensible for email/SMS integration

**Messaging**: RabbitMQ consumer using `@RabbitListener`

## 4. Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Bills Table
```sql
CREATE TABLE bills (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL FOREIGN KEY,
    bill_amount NUMERIC(10, 2) NOT NULL,
    bill_date TIMESTAMP,
    due_date TIMESTAMP,
    paid_date TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 5. External Mocks

### Payment Gateway Mock (Port 4000)
**File**: `mocks/payment-gateway/index.js`
**Endpoint**: `POST /pay`
**Request**: `{ billId, userId, amount, cardToken }`
**Response**: `{ transactionId, status, message }`

### Provisioning System Mock (Port 4000)
**File**: `mocks/provisioning-system/index.js`
**Endpoints**:
- `POST /activate` - Activate service
- `POST /deactivate` - Deactivate service

## 6. Security Implementation

### JWT Authentication
- **Token Generation**: Issued on successful login via `JwtTokenProvider`
- **Token Validation**: `JwtAuthenticationFilter` validates token on each protected request
- **Secret Key**: Configurable via `jwt.secret` (application-dev.properties)
- **Expiration**: Default 24 hours, configurable via `jwt.expiration`

### Password Security
- **Hashing**: BCrypt with strength 10
- **Validation**: Compared on login using `PasswordEncoder.matches()`

### Protected Endpoints
```
✓ Public: POST /users/register, POST /users/login
✓ Public: GET /, /swagger-ui.html, /v3/api-docs/**
✗ Protected: All other endpoints require JWT token in Authorization header
```

## 7. Message-Driven Architecture

### RabbitMQ Integration

**Queue**: `sricare.notifications`

**Publishers**:
- Payment Service: Publishes after successful payment
- Service Management Service: Publishes on service activation/deactivation

**Subscriber**:
- Notification Service: Consumes all notification messages

**Message Format**:
```json
{
  "type": "payment|service_activation|service_deactivation",
  "targetUser": "username",
  "message": "Notification content",
  "timestamp": "ISO-8601 timestamp"
}
```

## 8. API Documentation

Each service exposes OpenAPI/Swagger documentation at:
- User Service: `http://localhost:8081/swagger-ui.html`
- Billing Service: `http://localhost:8082/swagger-ui.html`
- Payment Service: `http://localhost:8083/swagger-ui.html`
- Service Mgmt: `http://localhost:8085/swagger-ui.html`
- Notification: `http://localhost:8084/swagger-ui.html`

## 9. Frontend (React)

### Pages
1. **Login** (`/login`) - User authentication
2. **Register** (`/register`) - New user registration
3. **Dashboard** (`/dashboard`) - View bills and make payments

### Features
- Token-based authentication (stored in localStorage)
- Responsive design with CSS styling
- Real-time bill list from backend
- One-click payment processing
- Error and success notifications

### Environment Configuration
- User Service API: `http://localhost:8081`
- Billing Service API: `http://localhost:8082`
- Payment Service API: `http://localhost:8083`

## 10. Deployment with Docker Compose

### File: `docker/docker-compose-springboot.yml`

**Services**:
1. `user-service` - Port 8081
2. `billing-service` - Port 8082
3. `payment-service` - Port 8083
4. `notification-service` - Port 8084
5. `service-management-service` - Port 8085
6. `db` (PostgreSQL) - Port 5432
7. `rabbitmq` - Port 5672, 15672 (management)

### Build & Run

```bash
# Navigate to docker directory
cd docker

# Build all services
docker compose -f docker-compose-springboot.yml build

# Start all services
docker compose -f docker-compose-springboot.yml up -d

# View logs
docker compose -f docker-compose-springboot.yml logs -f

# Stop services
docker compose -f docker-compose-springboot.yml down
```

## 11. Test User Credentials

Use the seeded test data for testing:

| Username | Email | Password | Phone |
|----------|-------|----------|-------|
| john_doe | john@sricare.com | password123 | 0701234567 |
| jane_smith | jane@sricare.com | password123 | 0702345678 |
| mike_wilson | mike@sricare.com | password123 | 0703456789 |

## 12. End-to-End Flow

1. **User Registration**
   - User fills registration form
   - Frontend POSTs to `POST /users/register` (User Service)
   - User stored in PostgreSQL with bcrypt-hashed password
   - Success response returned to frontend

2. **User Login**
   - User submits username and password
   - User Service validates credentials
   - JWT token generated and returned
   - Token stored in browser localStorage

3. **View Bills**
   - User accesses dashboard (requires JWT token)
   - Frontend fetches bills from `GET /bills/{userId}` (Billing Service)
   - Bills displayed in table with status and amounts

4. **Pay Bill**
   - User clicks "Pay Now" on a bill
   - Frontend POSTs to Payment Service with bill details
   - Payment Service forwards to Payment Gateway mock
   - On success:
     - Payment Service publishes notification to RabbitMQ
     - Notification Service consumes and logs the message
     - Frontend shows success message

5. **Service Activation** (Optional Flow)
   - User submits service activation request
   - Service Management Service forwards to Provisioning mock
   - On success, publishes activation event to RabbitMQ
   - Notification Service processes the event

## 13. Configuration Files

### application-dev.properties (Each Service)

```properties
server.port=8080
spring.datasource.url=jdbc:postgresql://db:5432/stldb
spring.datasource.username=stluser
spring.datasource.password=stlpass
spring.jpa.hibernate.ddl-auto=update
spring.rabbitmq.host=rabbitmq
spring.rabbitmq.port=5672
jwt.secret=<secret-key>
jwt.expiration=86400000
springdoc.api-docs.path=/v3/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
```

## 14. Project Structure

```
assignment sri tel/
├── springboot-backend/
│   ├── user-service/
│   │   ├── src/main/java/com/sricare/userservice/
│   │   │   ├── entity/User.java
│   │   │   ├── repository/UserRepository.java
│   │   │   ├── controller/UserController.java
│   │   │   ├── jwt/JwtTokenProvider.java
│   │   │   ├── jwt/JwtAuthenticationFilter.java
│   │   │   ├── config/SecurityConfig.java
│   │   │   └── dto/...
│   │   ├── src/main/resources/application-dev.properties
│   │   ├── pom.xml
│   │   └── Dockerfile
│   ├── billing-service/
│   │   ├── src/main/java/com/sricare/billingservice/
│   │   │   ├── entity/Bill.java
│   │   │   ├── repository/BillRepository.java
│   │   │   └── controller/BillingController.java
│   │   └── ...
│   ├── payment-service/
│   ├── notification-service/
│   └── service-management-service/
├── mocks/
│   ├── payment-gateway/
│   │   └── index.js
│   └── provisioning-system/
│       └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── *.css
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── App.css
│   ├── public/index.html
│   └── package.json
└── docker/
    ├── docker-compose-springboot.yml
    ├── init-db.sql
    ├── seed-data.sql
    └── README.md
```

## 15. Assumptions & Design Decisions

1. **Authentication**: JWT tokens used for stateless authentication (suitable for distributed microservices)
2. **Message Broker**: RabbitMQ with "best-effort" delivery for notifications (no loss guarantees needed for notifications)
3. **Database**: Single PostgreSQL instance with separate tables (can be evolved to database-per-service pattern)
4. **External Systems**: Mocked using Node.js Express for demonstration; production would integrate with real systems
5. **Frontend**: React SPA with localStorage for token persistence (suitable for self-care portal)
6. **API Gateway**: Not implemented in this prototype (could be added with Spring Cloud Gateway or Nginx)
7. **Logging**: Console logging in notification service; can be extended to file/centralized logging

## 16. Future Enhancements

1. **API Gateway**: Add Spring Cloud Gateway for unified entry point
2. **Service Discovery**: Implement Eureka for dynamic service registration
3. **Configuration Server**: Add Spring Cloud Config for centralized configuration
4. **Distributed Tracing**: Integrate Sleuth + Zipkin for request tracing
5. **Circuit Breaker**: Implement Hystrix/Resilience4j for fault tolerance
6. **Caching**: Add Redis for caching frequently accessed data
7. **Email/SMS Notifications**: Implement real notification channels
8. **Chat Functionality**: Add WebSocket support for real-time chat
9. **Mobile Apps**: Native iOS/Android apps using same backend APIs
10. **Analytics**: Add monitoring with Prometheus + Grafana

## 17. Running the Project

### Prerequisites
- Docker & Docker Compose installed
- Node.js & npm (for frontend development)
- Java 17+ & Maven (for backend development)

### Quick Start

```bash
# 1. Navigate to docker directory
cd docker

# 2. Start all services (PostgreSQL, RabbitMQ, all microservices)
docker compose -f docker-compose-springboot.yml up -d

# 3. Wait for services to initialize (check logs)
docker compose -f docker-compose-springboot.yml logs -f

# 4. (Optional) Run React frontend locally
cd ../frontend
npm install
npm start
# Frontend will be available at http://localhost:3000

# 5. Test the system
# Visit http://localhost:3000 (or frontend address)
# Register a new account or login with test credentials
# View bills and make payments
```

## 18. Testing Checklist

- [ ] User Registration - Create new account
- [ ] User Login - Authenticate with credentials
- [ ] JWT Token - Verify token is returned and stored
- [ ] View Bills - Fetch and display user bills
- [ ] Filter Bills - Get bills by status
- [ ] Pay Bill - Process payment (calls mock gateway)
- [ ] Notifications - Verify RabbitMQ consumer receives payment notifications
- [ ] Service Activation - Activate service (calls mock provisioning)
- [ ] Password Reset - Initiate password reset flow
- [ ] API Docs - Access Swagger UI for each service
- [ ] Database Persistence - Verify data persists across restarts
- [ ] Docker Networking - Verify inter-service communication

## 19. Contact & Support

For questions or issues regarding this implementation, refer to the architecture documentation and API documentation exposed via Swagger UI on each service.

---

**Project Name**: Sri-Care Telecom Self-Care Platform  
**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Prototype Complete
