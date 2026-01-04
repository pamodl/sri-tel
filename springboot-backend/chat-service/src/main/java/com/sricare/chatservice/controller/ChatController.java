package com.sricare.chatservice.controller;

import com.sricare.chatservice.dto.ChatRequest;
import com.sricare.chatservice.dto.ChatResponse;
import com.sricare.chatservice.entity.ChatMessage;
import com.sricare.chatservice.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/chat")
public class ChatController {
    @Autowired
    private ChatMessageRepository chatRepository;

    private static final String[] RESPONSES = {
        "Thank you for contacting us. How can we help you today?",
        "We appreciate your message. Our support team will assist you shortly.",
        "Your concern has been noted. We're here to help!",
        "Thank you for reaching out. Please provide more details so we can better assist you.",
        "We're reviewing your request and will get back to you soon."
    };

    @PostMapping("/send")
    public ResponseEntity<ChatResponse> sendMessage(@RequestBody ChatRequest request) {
        String conversationId = UUID.randomUUID().toString();

        // Save customer message
        ChatMessage customerMsg = ChatMessage.builder()
                .username(request.getUsername())
                .message(request.getMessage())
                .sender("customer")
                .conversationId(conversationId)
                .build();
        chatRepository.save(customerMsg);

        // Generate agent response (simulated)
        String agentResponse = RESPONSES[(int) (Math.random() * RESPONSES.length)];

        // Save agent response
        ChatMessage agentMsg = ChatMessage.builder()
                .username("support_agent")
                .message(agentResponse)
                .sender("agent")
                .conversationId(conversationId)
                .build();
        chatRepository.save(agentMsg);

        return ResponseEntity.ok(new ChatResponse(agentResponse, conversationId));
    }

    @GetMapping("/history/{username}")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@PathVariable String username) {
        List<ChatMessage> messages = chatRepository.findByUsernameOrderByCreatedAtDesc(username);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Chat Service is running");
    }
}
