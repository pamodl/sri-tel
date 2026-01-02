# Sri-Care Solution

Minimal microservices prototype for the Sri-Care assignment, with backend services, mocks, and containerized infrastructure to run everything locally.

## Table of contents
- [Prerequisites](#prerequisites)
- [Quick start (development)](#quick-start-development)
- [Services & ports](#services--ports)
- [Development notes](#development-notes)
- [Environment & data](#environment--data)
- [Next steps](#next-steps)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites
- Docker & Docker Compose
- Node.js (for local development of service packages and mocks)
- Optional: PostgreSQL client, RabbitMQ management UI (for inspection)

## Quick start (development)
1. Install Node dependencies for services and mocks (from repo root):
   - For each service or mock directory run:
     - cd <service-or-mock-dir>
     - npm install
2. Start everything with Docker Compose:
   - cd docker
   - docker-compose up --build
3. Open services in your browser or use curl/postman against the ports listed below.

Tip: Use `docker compose logs -f` (or `docker-compose logs -f`) to follow logs, and `docker compose exec` to run commands in containers.

## Services & ports
- User Service:        http://localhost:3001
- Billing Service:     http://localhost:3002
- Payment Service:     http://localhost:3003
- Notification Service: http://localhost:3004
- Service Management:  http://localhost:3005
- Provisioning Mock:   http://localhost:4001
- Payment Gateway Mock: http://localhost:4002
- PostgreSQL:          localhost:5432
- RabbitMQ (management): http://localhost:15672

Ports above reflect the local Docker Compose mapping defined in /docker. Adjust if you change the compose file.

## Development notes
- Each service is a separate package; follow each service's local README for implementation details and available endpoints.
- To run a single service locally without Docker:
  - cd services/<service-name>
  - npm install
  - npm start (or the script defined in package.json)
- Use environment variables defined in each service's README or .env.example where present.

## Environment & data
- Database migrations/seeding: check each backend service for migration scripts. The Compose setup provides a PostgreSQL container; inspect volumes in docker-compose if you need persistent data.
- Message queue: RabbitMQ is used for inter-service events. Use the management UI at port 15672 to inspect exchanges/queues.

## Next steps / TODO
- Implement missing endpoints in each service
- Add tests and CI workflow
- Add frontend (React) in /frontend
- Extend mocks to better simulate upstream integrations
- Add health checks and readiness probes for each service

## Contributing
1. Fork the repo and open a feature branch
2. Run and test your changes locally (see Quick start)
3. Create a PR with a clear description of changes and any migration steps

## License
This repository is a minimal prototype for the assignment. Extend and adapt as needed. Add project license file if required.
