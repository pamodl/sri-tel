# Sri-Care Quick Start Guide

## 1. Prerequisites
- Docker & Docker Compose installed
- Node.js & npm (for frontend)
- Git (optional, for version control)

## 2. Starting the Backend Services

```bash
# Navigate to the docker directory
cd "c:\Users\Lakshan\Desktop\cs_spc_4_2\SOC\assignment sri tel\docker"

# Start all services (microservices, PostgreSQL, RabbitMQ)
docker compose -f docker-compose-springboot.yml up -d

# Verify services are running
docker compose -f docker-compose-springboot.yml ps

# View logs
docker compose -f docker-compose-springboot.yml logs -f
```

**Wait 30-60 seconds for all services to initialize.**

## 3. Accessing the Services

Once all services are running:

| Service | URL | Purpose |
|---------|-----|---------|
| User Service | http://localhost:8081 | Registration & Login |
| Billing Service | http://localhost:8082 | View Bills |
| Payment Service | http://localhost:8083 | Process Payments |
| Notification Service | http://localhost:8084 | Notification Logs |
| Service Management | http://localhost:8085 | Service Activation |
| RabbitMQ Admin | http://localhost:15672 | Message Queue Management |
| PostgreSQL | localhost:5432 | Database (stldb) |

## 4. Running the React Frontend

```bash
# Navigate to frontend directory
cd "c:\Users\Lakshan\Desktop\cs_spc_4_2\SOC\assignment sri tel\frontend"

# Install dependencies
npm install

# Start development server
npm start

# Frontend will open at http://localhost:3000
```

## 5. Test the Complete Flow

### Step 1: Register a New Account
- Go to http://localhost:3000
- Click "Register here"
- Fill in the form:
  - Username: `testuser`
  - Email: `test@sricare.com`
  - Password: `password123`
  - First Name: `Test`
  - Last Name: `User`
  - Phone: `0701234567`
- Click "Register"

### Step 2: Login
- Click "Login here"
- Enter username: `testuser`
- Enter password: `password123`
- Click "Login"

### Step 3: View Bills
- Dashboard will load with your bills
- You should see sample bills from the seeded database

### Step 4: Pay a Bill
- Click "Pay Now" on any PENDING bill
- Success message should appear
- Check notification service logs:
  ```bash
  docker compose -f docker-compose-springboot.yml logs notification-service
  ```
  - You should see: "Received notification: type=payment user=testuser ..."

## 6. Using Pre-loaded Test Accounts

If you prefer not to register, use these pre-loaded accounts:

| Username | Password | Email |
|----------|----------|-------|
| john_doe | password123 | john@sricare.com |
| jane_smith | password123 | jane@sricare.com |
| mike_wilson | password123 | mike@sricare.com |

## 7. API Testing with Curl

### Register User
```bash
curl -X POST http://localhost:8081/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "email": "new@sricare.com",
    "password": "password123",
    "firstName": "New",
    "lastName": "User"
  }'
```

### Login User
```bash
curl -X POST http://localhost:8081/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "password123"
  }'
```

### Get User Bills
```bash
curl -X GET http://localhost:8082/bills/1 \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN_HERE>"
```

### Make a Payment
```bash
curl -X POST http://localhost:8083/payments/pay \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN_HERE>" \
  -d '{
    "billId": 1,
    "userId": 1,
    "amount": 1500.00,
    "cardToken": "test-token-12345"
  }'
```

## 8. Accessing API Documentation

Each service exposes Swagger UI:

- http://localhost:8081/swagger-ui.html (User Service)
- http://localhost:8082/swagger-ui.html (Billing Service)
- http://localhost:8083/swagger-ui.html (Payment Service)
- http://localhost:8084/swagger-ui.html (Notification Service)
- http://localhost:8085/swagger-ui.html (Service Management Service)

## 9. Database Access

### Connect to PostgreSQL
```bash
# Using Docker
docker exec -it <db-container-id> psql -U stluser -d stldb

# Inside psql:
\dt                    # List tables
SELECT * FROM users;   # View all users
SELECT * FROM bills;   # View all bills
```

## 10. RabbitMQ Management

Visit http://localhost:15672
- Username: `guest`
- Password: `guest`

Monitor message queues and view `sricare.notifications` queue for payment/service notifications.

## 11. Troubleshooting

### Services Won't Start
```bash
# Check Docker logs
docker compose -f docker-compose-springboot.yml logs

# Ensure ports 8081-8085, 5432, 5672, 15672 are available
netstat -an | findstr LISTENING  # Windows
```

### Database Connection Issues
```bash
# Verify PostgreSQL container
docker ps | grep postgres

# Check database credentials in docker-compose-springboot.yml
```

### Frontend Can't Reach Backend
- Ensure backend services are running: `docker compose ps`
- Check browser console for CORS errors
- Verify API URLs in frontend components

### RabbitMQ Not Working
- Check RabbitMQ container: `docker logs rabbitmq`
- Verify credentials: default is guest/guest
- Ensure other services have RABBITMQ_HOST=rabbitmq

## 12. Stopping Services

```bash
# Stop all services
docker compose -f docker-compose-springboot.yml down

# Stop and remove volumes (delete data)
docker compose -f docker-compose-springboot.yml down -v
```

## 13. Rebuilding Services

If you make code changes:

```bash
# Rebuild and start
docker compose -f docker-compose-springboot.yml up -d --build

# Or rebuild specific service
docker compose -f docker-compose-springboot.yml build --no-cache payment-service
```

## 14. Key Files to Review

- `COMPLETE_DOCUMENTATION.md` - Full technical documentation
- `springboot-backend/*/pom.xml` - Maven dependencies and build config
- `springboot-backend/*/src/main/java/com/sricare/*/` - Service source code
- `frontend/src/` - React components and styling
- `docker/docker-compose-springboot.yml` - Orchestration configuration
- `docker/init-db.sql` - Database schema
- `docker/seed-data.sql` - Test data

## 15. Next Steps

1. ✓ Backend microservices running
2. ✓ Database initialized with test data
3. ✓ RabbitMQ message broker active
4. Start React frontend: `npm install && npm start`
5. Register/Login and test the flows
6. Review API docs on Swagger UIs
7. Explore microservices code in `springboot-backend/`

---

**Happy Testing! 🚀**

For detailed technical information, see `COMPLETE_DOCUMENTATION.md`
