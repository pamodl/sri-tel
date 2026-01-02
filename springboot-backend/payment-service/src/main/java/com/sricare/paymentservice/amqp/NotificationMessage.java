package com.sricare.paymentservice.amqp;

import java.time.Instant;

public class NotificationMessage {
    private String type;
    private String targetUser;
    private String message;
    private Instant timestamp;

    public NotificationMessage() {}

    public NotificationMessage(String type, String targetUser, String message) {
        this.type = type;
        this.targetUser = targetUser;
        this.message = message;
        this.timestamp = Instant.now();
    }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getTargetUser() { return targetUser; }
    public void setTargetUser(String targetUser) { this.targetUser = targetUser; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}
