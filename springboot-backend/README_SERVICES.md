Spring Boot services added:

- `user-service`: endpoints under `/users`:
  - POST `/users/register` {phone,email,password}
  - POST `/users/login` {phone,password}
  - POST `/users/password/reset` {phone}
  - PUT `/users/password/change` {id,password}

- `billing-service`: endpoints under `/bills`:
  - GET `/bills/{userId}`
  - GET `/bills`

- `payment-service`: endpoints under `/payments`:
  - POST `/payments/pay` -> forwards to mock payment gateway

- `service-management-service`: endpoints under `/services`:
  - POST `/services/activate` -> forwards to provisioning mock
  - POST `/services/deactivate` -> forwards to provisioning mock

- `notification-service`: endpoint `/notify` (logs notification payload)

Build each service with:

```powershell
cd springboot-backend\<service>
mvn clean package
```

Then run docker-compose with the `docker-compose-springboot.yml` in `docker` folder.
