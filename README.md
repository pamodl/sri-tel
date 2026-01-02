# Sri-Care Solution - Quick Start

## Prerequisites
- Docker & Docker Compose installed
- Node.js (for local development)

## How to Run (Development)
1. Install dependencies for each service:
   - Go to each backend and mock service folder and run:
     npm install
2. Start all services with Docker Compose:
   cd docker
   docker-compose up --build

## Services
- User Service:        http://localhost:3001
- Billing Service:     http://localhost:3002
- Payment Service:     http://localhost:3003
- Notification Service:http://localhost:3004
- Service Management:  http://localhost:3005
- Provisioning Mock:   http://localhost:4001
- Payment Gateway Mock:http://localhost:4002
- PostgreSQL:          localhost:5432
- RabbitMQ:            http://localhost:15672

## Next Steps
- Implement endpoints in each service
- Add frontend (React) in /frontend
- Extend mocks as needed

---
This is a minimal prototype. Extend as required for your assignment.
