package com.sricare.billingservice.model;

public class Bill {
    private String id;
    private String userId;
    private double amount;
    private String period;

    public Bill() {}
    public Bill(String id, String userId, double amount, String period) {
        this.id = id; this.userId = userId; this.amount = amount; this.period = period;
    }
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }
}
