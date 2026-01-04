package com.sricare.chatservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDTO {
    private Long id;
    private String username;
    private String message;
    private String sender;
    private LocalDateTime createdAt;
    private String conversationId;
}
