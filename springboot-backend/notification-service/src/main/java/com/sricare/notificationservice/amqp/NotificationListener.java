package com.sricare.notificationservice.amqp;

import com.sricare.notificationservice.amqp.NotificationMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class NotificationListener {
    private final Logger logger = LoggerFactory.getLogger(NotificationListener.class);

    @RabbitListener(queues = "sricare.notifications")
    public void handleNotification(NotificationMessage msg) {
        logger.info("Received notification: type={} user={} msg={} ts={}", msg.getType(), msg.getTargetUser(), msg.getMessage(), msg.getTimestamp());
        // TODO: persist or forward via email/SMS
    }
}
