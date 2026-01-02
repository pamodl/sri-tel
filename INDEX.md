# Sri-Care Project - Documentation Index

## 📋 Start Here

**New to this project?** Start with one of these:

1. **[QUICK_START.md](QUICK_START.md)** (5-15 minutes)
   - Get the system running immediately
   - Test basic functionality
   - Includes curl examples

2. **[README.md](README.md)** (10-20 minutes)
   - Project overview
   - Architecture explanation
   - Technology stack
   - Quick reference guide

3. **[DELIVERY_SUMMARY.md](DELIVERY_SUMMARY.md)** (5 minutes)
   - What was delivered
   - Completion checklist
   - File manifest
   - Testing guide

4. **[COMPLETE_DOCUMENTATION.md](COMPLETE_DOCUMENTATION.md)** (30+ minutes)
   - Comprehensive technical guide
   - Detailed architecture
   - Configuration reference
   - Security deep-dive
   - Deployment guide

---

## 🚀 Getting Started (3 Steps)

### Step 1: Start Backend Services
```bash
cd docker
docker compose -f docker-compose-springboot.yml up -d
# Wait 30-60 seconds
```

### Step 2: Start Frontend (Optional)
```bash
cd frontend
npm install
npm start
# Opens http://localhost:3000
```

### Step 3: Test the System
- Register new account OR login with: `john_doe` / `password123`
- View bills → Make payment → Get notification

---

## 📚 Documentation by Purpose

### I want to...

#### **Understand the architecture**
→ Read [README.md - Architecture Overview](README.md#architecture-overview)

#### **Set up the system**
→ Follow [QUICK_START.md](QUICK_START.md)

#### **See what was delivered**
→ Check [DELIVERY_SUMMARY.md](DELIVERY_SUMMARY.md)

#### **Understand technical details**
→ Study [COMPLETE_DOCUMENTATION.md](COMPLETE_DOCUMENTATION.md)

#### **Access API documentation**
→ Start services and visit:
- http://localhost:8081/swagger-ui.html (User Service)
- http://localhost:8082/swagger-ui.html (Billing Service)
- http://localhost:8083/swagger-ui.html (Payment Service)
- http://localhost:8084/swagger-ui.html (Notification Service)
- http://localhost:8085/swagger-ui.html (Service Mgmt Service)

#### **Review source code**
→ Browse `springboot-backend/` folders:
- `user-service/src/main/java/com/sricare/userservice/`
- `billing-service/src/main/java/com/sricare/billingservice/`
- `payment-service/src/main/java/com/sricare/paymentservice/`
- `notification-service/src/main/java/com/sricare/notificationservice/`
- `service-management-service/src/main/java/com/sricare/servicemanagementservice/`

#### **Review frontend code**
→ Browse `frontend/src/`:
- `components/Login.jsx` - Authentication
- `components/Register.jsx` - Registration
- `components/Dashboard.jsx` - Bill management
- `App.jsx` - Main application

#### **Test the APIs**
→ Use curl commands in [QUICK_START.md - API Testing](QUICK_START.md#7-api-testing-with-curl)

#### **Troubleshoot issues**
→ Check:
1. [QUICK_START.md - Troubleshooting](QUICK_START.md#11-troubleshooting)
2. [README.md - Troubleshooting](README.md#troubleshooting)

#### **Understand the database**
→ Read [COMPLETE_DOCUMENTATION.md - Database Schema](COMPLETE_DOCUMENTATION.md#4-database-schema)

#### **Learn about security**
→ See [COMPLETE_DOCUMENTATION.md - Security Implementation](COMPLETE_DOCUMENTATION.md#6-security-implementation)

#### **Understand messaging**
→ Check [COMPLETE_DOCUMENTATION.md - Message-Driven Architecture](COMPLETE_DOCUMENTATION.md#7-message-driven-architecture)

---

## 📁 Project Structure at a Glance

```
assignment sri tel/
│
├── 📄 README.md                    ← Start here for overview
├── 📄 QUICK_START.md              ← Fast setup guide
├── 📄 DELIVERY_SUMMARY.md         ← What was delivered
├── 📄 COMPLETE_DOCUMENTATION.md   ← Technical deep-dive
├── 📄 INDEX.md                    ← This file
│
├── springboot-backend/            ← 5 Microservices
│   ├── user-service/              ✅ Authentication & Profiles
│   ├── billing-service/           ✅ Bill Management
│   ├── payment-service/           ✅ Payment Processing
│   ├── notification-service/      ✅ RabbitMQ Consumer
│   └── service-management-service/✅ Service Activation
│
├── frontend/                      ← React Web Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── *.css
│   │   └── App.jsx
│   └── package.json
│
├── mocks/                         ← External System Mocks
│   ├── payment-gateway/
│   └── provisioning-system/
│
└── docker/                        ← Deployment
    ├── docker-compose-springboot.yml
    ├── init-db.sql
    ├── seed-data.sql
    ├── start.sh
    └── start.bat
```

---

## ✨ Key Features

### 🔐 Security
- JWT token-based authentication
- BCrypt password hashing
- Protected endpoints
- Authorization checks

### 📊 Data Management
- PostgreSQL persistence
- JPA/Hibernate ORM
- Automatic schema creation
- Seeded test data

### 🔄 Messaging
- RabbitMQ pub/sub
- Asynchronous notifications
- Event-driven architecture
- JSON message serialization

### 📚 API Documentation
- Swagger/OpenAPI on all services
- Interactive API testing
- Auto-generated from annotations
- RESTful design

### 🎨 Frontend
- React single-page application
- Token-based authentication
- Responsive design
- Real-time bill viewing

### 🐳 Deployment
- Docker containerization
- Docker Compose orchestration
- Multi-service networking
- Volume persistence

---

## 📝 Test Credentials

Pre-created accounts in database:

| Username | Password | Email |
|----------|----------|-------|
| john_doe | password123 | john@sricare.com |
| jane_smith | password123 | jane@sricare.com |
| mike_wilson | password123 | mike@sricare.com |

Each user has 2-3 sample bills with various statuses (PENDING, PAID, OVERDUE).

---

## 🔍 Quick Reference

### Service URLs
| Service | URL | Port |
|---------|-----|------|
| User Service | http://localhost:8081 | 8081 |
| Billing Service | http://localhost:8082 | 8082 |
| Payment Service | http://localhost:8083 | 8083 |
| Notification Service | http://localhost:8084 | 8084 |
| Service Management | http://localhost:8085 | 8085 |
| Database | localhost:5432 | 5432 |
| RabbitMQ Admin | http://localhost:15672 | 5672 |
| Frontend | http://localhost:3000 | 3000 |

### Database Credentials
- Username: `stluser`
- Password: `stlpass`
- Database: `stldb`

### RabbitMQ Credentials
- Username: `guest`
- Password: `guest`

---

## 📊 Technology Stack

**Backend**: Java, Spring Boot 3.2.5, Spring Data JPA, Spring Security, JJWT  
**Database**: PostgreSQL 14  
**Messaging**: RabbitMQ 3, Spring AMQP  
**API Docs**: springdoc-openapi 2.1.0  
**Frontend**: React 18.2.0, Axios, React Router  
**Deployment**: Docker, Docker Compose  

---

## ✅ Checklist

Before you start, verify:

- [ ] Docker & Docker Compose installed
- [ ] Node.js & npm installed (for frontend)
- [ ] Ports 8081-8085, 5432, 5672, 15672, 3000 available
- [ ] 2GB+ RAM available
- [ ] Read README.md for overview
- [ ] Follow QUICK_START.md to run
- [ ] Test with provided credentials

---

## 🆘 Need Help?

1. **Setup Issues**: Check [QUICK_START.md - Troubleshooting](QUICK_START.md#11-troubleshooting)
2. **API Questions**: Visit Swagger UI on service (`/swagger-ui.html`)
3. **Architecture**: Read [COMPLETE_DOCUMENTATION.md](COMPLETE_DOCUMENTATION.md)
4. **Code Questions**: Browse source in `springboot-backend/` folders

---

## 📦 What's Included

✅ **5 Production-Ready Microservices**  
✅ **React Web Frontend**  
✅ **PostgreSQL Database**  
✅ **RabbitMQ Messaging**  
✅ **Docker Containerization**  
✅ **Swagger API Documentation**  
✅ **Complete Source Code**  
✅ **Comprehensive Documentation**  
✅ **Test Data & Credentials**  
✅ **Startup Scripts**  

---

## 🎯 Next Steps

1. **Read** [README.md](README.md) (10 minutes)
2. **Follow** [QUICK_START.md](QUICK_START.md) (5-15 minutes)
3. **Explore** services at http://localhost:8081-8085
4. **Review** [COMPLETE_DOCUMENTATION.md](COMPLETE_DOCUMENTATION.md) (30+ minutes)
5. **Test** all workflows with provided credentials

---

## 📞 Project Information

**Project Name**: Sri-Care Telecom Self-Care Platform  
**Version**: 1.0.0  
**Status**: Complete & Ready to Deploy  
**Last Updated**: January 2026  

---

## 🎓 Learning Path

### Beginner
1. Start with README.md overview
2. Follow QUICK_START.md
3. Test with pre-created accounts
4. Review frontend code in React components

### Intermediate
1. Study microservices in springboot-backend/
2. Review controller and service classes
3. Check database schema and JPA entities
4. Test APIs via Swagger UI

### Advanced
1. Study JWT implementation
2. Review RabbitMQ messaging setup
3. Examine security configuration
4. Analyze Docker composition
5. Read COMPLETE_DOCUMENTATION.md

---

**Happy Exploring! 🚀**

Start with [QUICK_START.md](QUICK_START.md) to get running in minutes.
