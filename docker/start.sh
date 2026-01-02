#!/bin/bash
# Build and run Sri-Care microservices with Docker Compose

set -e

echo "============================================"
echo "Sri-Care Microservices - Docker Compose Setup"
echo "============================================"

# Navigate to docker directory
cd docker

echo ""
echo "[1/4] Building Docker images..."
docker compose -f docker-compose-springboot.yml build

echo ""
echo "[2/4] Starting services..."
docker compose -f docker-compose-springboot.yml up -d

echo ""
echo "[3/4] Waiting for services to initialize (30 seconds)..."
sleep 30

echo ""
echo "[4/4] Verifying services..."
docker compose -f docker-compose-springboot.yml ps

echo ""
echo "============================================"
echo "✓ All services started successfully!"
echo "============================================"
echo ""
echo "Services are available at:"
echo "  User Service:       http://localhost:8081"
echo "  Billing Service:    http://localhost:8082"
echo "  Payment Service:    http://localhost:8083"
echo "  Notification Svc:   http://localhost:8084"
echo "  Service Mgmt Svc:   http://localhost:8085"
echo "  PostgreSQL:         localhost:5432"
echo "  RabbitMQ Admin:     http://localhost:15672"
echo ""
echo "To view logs:"
echo "  docker compose logs -f"
echo ""
echo "To stop services:"
echo "  docker compose down"
echo ""
echo "Next: Start the React frontend"
echo "  cd frontend"
echo "  npm install"
echo "  npm start"
echo ""
