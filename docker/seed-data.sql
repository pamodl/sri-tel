-- Seed test data for Sri-Care system
-- Password: password123 (bcrypt hash)
INSERT INTO users (username, password_hash, email, phone_number, first_name, last_name) VALUES
('john_doe', '$2a$10$slYQmyNdGzin7olVN3p5aOYtkGMjWfB5YxfXb9eWzTZKEL9BT7rEm', 'john@sricare.com', '0701234567', 'John', 'Doe'),
('jane_smith', '$2a$10$slYQmyNdGzin7olVN3p5aOYtkGMjWfB5YxfXb9eWzTZKEL9BT7rEm', 'jane@sricare.com', '0702345678', 'Jane', 'Smith'),
('mike_wilson', '$2a$10$slYQmyNdGzin7olVN3p5aOYtkGMjWfB5YxfXb9eWzTZKEL9BT7rEm', 'mike@sricare.com', '0703456789', 'Mike', 'Wilson')
ON CONFLICT (username) DO NOTHING;

-- Seed bills data (assuming user IDs 1, 2, 3 from the inserts above)
INSERT INTO bills (user_id, bill_amount, bill_date, due_date, status, description) VALUES
(1, 1500.00, '2024-12-01', '2024-12-15', 'PENDING', 'Monthly Bill - December 2024'),
(1, 1450.00, '2024-11-01', '2024-11-15', 'PAID', 'Monthly Bill - November 2024'),
(1, 1500.00, '2024-10-01', '2024-10-15', 'PAID', 'Monthly Bill - October 2024'),
(2, 2000.00, '2024-12-01', '2024-12-15', 'PENDING', 'Monthly Bill - December 2024'),
(2, 1950.00, '2024-11-01', '2024-11-15', 'PAID', 'Monthly Bill - November 2024'),
(3, 1200.00, '2024-12-01', '2024-12-15', 'OVERDUE', 'Monthly Bill - December 2024'),
(3, 1200.00, '2024-11-01', '2024-11-15', 'PAID', 'Monthly Bill - November 2024')
ON CONFLICT DO NOTHING;
