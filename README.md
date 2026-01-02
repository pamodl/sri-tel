# Sri-Care: Telecom Self-Care Platform - Complete Solution

## Project Overview

**Sri-Care** is a production-ready prototype of a microservices-based customer self-care platform for telecom operators. It enables customers to:

✅ Register and manage accounts  
✅ View current and past bills  
✅ Pay bills online  
✅ Activate/deactivate telecom services  
✅ Receive real-time notifications  

Built with **Java Spring Boot**, **PostgreSQL**, **RabbitMQ**, **React**, and **Docker**.

---

## Key Features

### 🔐 Security
- **JWT Token-Based Authentication** - Stateless, distributed-ready security
- **Password Hashing** - BCrypt with strength 10
- **Protected Endpoints** - Authorization checks on all sensitive operations
- **CORS Support** - Allows frontend to communicate with backend

### 💾 Persistence
- **PostgreSQL Database** - Reliable, ACID-compliant data storage
- **JPA/Hibernate ORM** - Object-relational mapping for database operations
- **Automatic Schema Management** - Hibernate DDL generation
- **Seeded Test Data** - Pre-loaded sample users and bills for testing

### 🔄 Messaging
- **RabbitMQ Pub/Sub** - Asynchronous event-driven architecture
- **Payment Notifications** - Automated notification publishing on payment success
- **Service Event Streaming** - Service activation/deactivation events

### 📚 API Documentation
- **OpenAPI/Swagger** - Auto-generated API documentation
- **Swagger UI** - Interactive API testing interface
- **RESTful Design** - Standard HTTP methods and status codes

### 🎨 Frontend
- **React SPA** - Single-page application for smooth UX
- **Responsive Design** - Mobile and desktop compatible
- **Token Management** - Secure JWT handling with localStorage
- **Real-time Updates** - Async communication with backend services

---

## Project Structure

```
assignment sri tel/
│
├── springboot-backend/           # 5 microservices
│   ├── user-service/             # User auth & registration (Port 8081)
│   │   ├── src/main/java/com/sricare/userservice/
│   │   │   ├── entity/           # JPA entities
│   │   │   ├── repository/       # Spring Data repositories
│   │   │   ├── controller/       # REST controllers
│   │   │   ├── jwt/              # JWT utilities
│   │   │   ├── config/           # Security configuration
│   │   │   └── dto/              # Data transfer objects
│   │   ├── pom.xml               # Maven dependencies
│   │   └── Dockerfile            # Container image definition
│   │
│   ├── billing-service/          # Bill management (Port 8082)
│   │   ├── src/main/java/com/sricare/billingservice/
│   │   ├── pom.xml
│   │   └── Dockerfile
│   │
│   ├── payment-service/          # Payment processing (Port 8083)
│   │   ├── src/main/java/com/sricare/paymentservice/
│   │   ├── pom.xml
│   │   └── Dockerfile
│   │
│   ├── notification-service/     # RabbitMQ consumer (Port 8084)
│   │   ├── src/main/java/com/sricare/notificationservice/
│   │   ├── pom.xml
│   │   └── Dockerfile
│   │
│   └── service-management-service/  # Service activation (Port 8085)
│       ├── src/main/java/com/sricare/servicemanagementservice/
│       ├── pom.xml
│       └── Dockerfile
│
├── frontend/                      # React web application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx          # Authentication page
│   │   │   ├── Register.jsx       # Registration page
│   │   │   ├── Dashboard.jsx      # Main dashboard
│   │   │   └── *.css              # Component styles
│   │   ├── App.jsx                # Main app component
│   │   ├── index.jsx              # React entry point
│   │   └── App.css                # Global styles
│   ├── public/
│   │   └── index.html             # HTML template
│   └── package.json               # npm dependencies
│
├── mocks/                         # External system mocks
│   ├── payment-gateway/
│   │   └── index.js               # Payment gateway mock (Node.js)
│   └── provisioning-system/
│       └── index.js               # Provisioning mock (Node.js)
│
├── docker/
│   ├── docker-compose-springboot.yml    # Multi-container orchestration
│   ├── init-db.sql                      # Database schema
│   ├── seed-data.sql                    # Test data
│   ├── start.sh                         # Linux/Mac startup script
│   ├── start.bat                        # Windows startup script
│   └── README.md                        # Docker setup guide
│
├── COMPLETE_DOCUMENTATION.md      # Full technical documentation
├── QUICK_START.md                 # Quick setup guide
├── README.md                       # This file
└── README_SERVICES.md              # Service-specific details

```

---

## Technology Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Backend** | Java Spring Boot | 3.2.5 | Microservices framework |
| **ORM** | Spring Data JPA | 3.2.5 | Database mapping |
| **Security** | Spring Security + JJWT | 3.2.5 + 0.11.5 | Authentication & JWT |
| **Messaging** | Spring AMQP + RabbitMQ | 3.2.5 + 3.x | Event streaming |
| **API Docs** | springdoc-openapi | 2.1.0 | Swagger/OpenAPI |
| **Database** | PostgreSQL | 14 | Data persistence |
| **Message Broker** | RabbitMQ | 3-management | Pub/Sub messaging |
| **Containerization** | Docker & Docker Compose | Latest | Orchestration |
| **Frontend** | React | 18.2.0 | Web UI |
| **HTTP Client** | Axios | 1.6.0 | API communication |
| **Routing** | React Router | 6.20.0 | Navigation |
| **Build Tool** | Maven | 3.9.x | Java build automation |

---

## Quick Start (5 Minutes)

### Prerequisites
- Docker & Docker Compose installed
- Node.js & npm installed
- 4GB+ RAM available

### Step 1: Start Backend Services

**Windows:**
```bash
cd docker
./start.bat
```

**Linux/Mac:**
```bash
cd docker
bash start.sh
```

Or manually:
```bash
cd docker
docker compose -f docker-compose-springboot.yml up -d
```

**Wait 30-60 seconds for services to initialize.**

### Step 2: Start Frontend (Optional)

```bash
cd frontend
npm install
npm start
```

Frontend opens at `http://localhost:3000`

### Step 3: Test the System

**Via Frontend:**
- Navigate to http://localhost:3000
- Register new account or login with `john_doe` / `password123`
- View bills and make payments

**Via API:**
```bash
# Register
curl -X POST http://localhost:8081/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"pass123","firstName":"Test","lastName":"User"}'

# Login
curl -X POST http://localhost:8081/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","password":"password123"}'
```

---

## Service Details

### User Service (Port 8081)
**Endpoints:**
```
POST   /users/register              - Create account
POST   /users/login                 - Authenticate
POST   /users/password/reset        - Reset password
POST   /users/password/change       - Change password
GET    /users/{id}                  - Get profile
GET    /swagger-ui.html             - API docs
```

**Database Tables:**
- `users` - User accounts with bcrypt-hashed passwords

---

### Billing Service (Port 8082)
**Endpoints:**
```
GET    /bills/{userId}              - Get user's bills
GET    /bills/user/{userId}/status/{status} - Filter by status
GET    /bills                       - Get all bills
GET    /swagger-ui.html             - API docs
```

**Database Tables:**
- `bills` - Customer bills with status (PENDING/PAID/OVERDUE)

---

### Payment Service (Port 8083)
**Endpoints:**
```
POST   /payments/pay                - Process payment
GET    /swagger-ui.html             - API docs
```

**Features:**
- Forwards requests to Payment Gateway mock
- Publishes notifications to RabbitMQ on success
- Graceful fallback if gateway unavailable

---

### Service Management Service (Port 8085)
**Endpoints:**
```
POST   /services/activate           - Activate service
POST   /services/deactivate         - Deactivate service
GET    /swagger-ui.html             - API docs
```

**Features:**
- Forwards requests to Provisioning System mock
- Publishes service events to RabbitMQ

---

### Notification Service (Port 8084)
**Features:**
- Consumes messages from RabbitMQ `sricare.notifications` queue
- Logs notifications with type, user, and message
- Extensible for email/SMS integration

**Database:**
- No dedicated table; logs to application logs

---

## Database Schema

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

---

## Security Architecture

### Authentication Flow
1. User submits credentials to `/users/login`
2. User Service validates against bcrypt hash
3. JWT token generated with 24-hour expiration
4. Token returned to frontend and stored locally
5. Token included in `Authorization: Bearer <token>` header on all requests
6. `JwtAuthenticationFilter` validates token on each request

### Protected Endpoints
```
Public:    POST /users/register, POST /users/login, GET /, /swagger-ui.html
Protected: All other endpoints require valid JWT token
```

---

## Message-Driven Architecture

### RabbitMQ Integration

**Queue:** `sricare.notifications`

**Publishers:**
- Payment Service: Publishes after successful payment
- Service Management Service: Publishes on service activation/deactivation

**Subscriber:**
- Notification Service: Consumes and logs all messages

**Message Format:**
```json
{
  "type": "payment|service_activation|service_deactivation",
  "targetUser": "username",
  "message": "Notification content",
  "timestamp": "2024-12-20T10:30:00Z"
}
```

---

## Development Guide

### Building Locally

**Prerequisites:**
- Java 17+
- Maven 3.9+
- PostgreSQL 14 (or use Docker)
- RabbitMQ (or use Docker)

**Build all services:**
```bash
cd springboot-backend/user-service && mvn clean package
cd ../billing-service && mvn clean package
cd ../payment-service && mvn clean package
cd ../notification-service && mvn clean package
cd ../service-management-service && mvn clean package
```

**Run locally:**
```bash
# Terminal 1: Start PostgreSQL
docker run -d --name postgres -e POSTGRES_PASSWORD=stlpass -p 5432:5432 postgres:14

# Terminal 2: Start RabbitMQ
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

# Terminal 3+: Start each service
java -jar user-service/target/user-service-0.0.1-SNAPSHOT.jar
java -jar billing-service/target/billing-service-0.0.1-SNAPSHOT.jar
# ... etc
```

### Frontend Development

```bash
cd frontend
npm install
npm start
```

**Hot Reload:** Changes auto-refresh in browser

---

## Testing Checklist

- [ ] User Registration - Create new account with unique username/email
- [ ] User Login - Authenticate with correct/incorrect credentials
- [ ] JWT Token - Verify token returned and stored in localStorage
- [ ] View Bills - Fetch bills from database, display in table
- [ ] Filter Bills - Filter by status (PENDING, PAID, OVERDUE)
- [ ] Pay Bill - Process payment, check notification in logs
- [ ] Service Activation - Activate service through provisioning mock
- [ ] RabbitMQ Notifications - Verify messages consumed by notification service
- [ ] API Documentation - Access Swagger UI on each service
- [ ] Database Persistence - Verify data persists across restarts
- [ ] Docker Networking - Inter-service communication works
- [ ] Error Handling - Graceful degradation when services unavailable

---

## Troubleshooting

### Services won't start
```bash
# Check if ports are in use
netstat -an | findstr LISTENING

# Check Docker logs
docker compose logs
```

### Database connection errors
```bash
# Verify PostgreSQL is running
docker ps | grep postgres

# Check database credentials
# Default: user=stluser, password=stlpass, db=stldb
```

### Frontend can't reach backend
```bash
# Verify backend services running
docker ps

# Check browser console for CORS errors
# Services must be running on expected ports 8081-8085
```

### RabbitMQ issues
```bash
# Check RabbitMQ logs
docker logs rabbitmq

# Access management UI
# http://localhost:15672 (guest/guest)

# Verify sricare.notifications queue exists
```

---

## Performance Considerations

1. **Connection Pooling** - HikariCP configured for database
2. **JWT Caching** - Token validation cached in memory
3. **Message Batching** - RabbitMQ can batch notifications
4. **Database Indexes** - Indexes on frequently queried columns
5. **API Response Caching** - Bills endpoint can be cached

---

## Deployment Considerations

### Production Checklist
- [ ] Change JWT secret from default
- [ ] Update database credentials
- [ ] Configure HTTPS/TLS
- [ ] Set up centralized logging (ELK, Splunk)
- [ ] Configure distributed tracing (Jaeger, Zipkin)
- [ ] Set up monitoring (Prometheus, Grafana)
- [ ] Configure alerts and incident response
- [ ] Set up auto-scaling policies
- [ ] Configure CI/CD pipeline
- [ ] Load test before production

---

## File Quick Reference

| File | Purpose |
|------|---------|
| `COMPLETE_DOCUMENTATION.md` | Full 19-section technical guide |
| `QUICK_START.md` | 15-minute setup and testing guide |
| `docker-compose-springboot.yml` | Multi-container orchestration |
| `init-db.sql` | Database schema creation |
| `seed-data.sql` | Test data (3 users, 7 bills) |
| `springboot-backend/*/pom.xml` | Maven dependencies per service |
| `frontend/src/App.jsx` | React main component |
| `frontend/src/components/Dashboard.jsx` | Bill view and payment |

---

## Default Test Credentials

| Username | Password | Email |
|----------|----------|-------|
| john_doe | password123 | john@sricare.com |
| jane_smith | password123 | jane@sricare.com |
| mike_wilson | password123 | mike@sricare.com |

---

## Support Resources

1. **Technical Documentation**: See `COMPLETE_DOCUMENTATION.md`
2. **API Documentation**: Visit Swagger UI on each service (`http://localhost:8XXX/swagger-ui.html`)
3. **Source Code**: Reviewed in `springboot-backend/*/src`
4. **Docker Compose**: Configuration in `docker-compose-springboot.yml`

---

## Known Limitations

1. **Single Database** - Production would use database-per-service
2. **No API Gateway** - Could add Spring Cloud Gateway
3. **No Service Discovery** - Would add Eureka in production
4. **No Distributed Caching** - Could add Redis
5. **No Circuit Breaker** - Could add Resilience4j
6. **Email/SMS** - Notifications currently logged only
7. **Chat Module** - Not implemented (architecture described in docs)
8. **Mobile Apps** - Frontend is web-only (APIs support native apps)

---

## Future Enhancements

1. Add API Gateway for unified entry point
2. Implement service discovery (Eureka)
3. Add distributed tracing (Sleuth + Zipkin)
4. Implement circuit breaker pattern (Resilience4j)
5. Add Redis for distributed caching
6. Implement real email/SMS notifications
7. Add WebSocket support for real-time chat
8. Develop native iOS/Android apps
9. Add analytics with Prometheus + Grafana
10. Implement advanced billing features (taxes, discounts, subscriptions)

---

## Project Completion Status

✅ **Completed:**
- 5 microservices with Spring Boot
- PostgreSQL database with schema and seed data
- JWT authentication with bcrypt hashing
- RabbitMQ event messaging
- React web frontend
- Docker containerization
- Swagger/OpenAPI documentation
- Comprehensive documentation
- Test data and credentials

⏳ **Optional Enhancements:**
- API Gateway
- Service Discovery
- Advanced monitoring
- Distributed tracing
- Real email/SMS
- Chat functionality
- Mobile apps

---

## License & Usage

This is a prototype/educational implementation. Use for learning, demonstration, and reference purposes.

---

## Contact

For questions about this implementation, refer to:
1. `COMPLETE_DOCUMENTATION.md` - Technical deep dive
2. `QUICK_START.md` - Setup and testing
3. Swagger UIs - API reference

---

**Sri-Care v1.0 - Complete & Ready to Deploy! 🚀**

*Last Updated: January 2026*
