import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const BILL_API_URL = 'http://localhost:8082';
const PAYMENT_API_URL = 'http://localhost:8083';
const SERVICE_API_URL = 'http://localhost:8085';
const CHAT_API_URL = 'http://localhost:8086';

export default function Dashboard() {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([
    { id: 1, name: 'International Roaming', status: 'active' },
    { id: 2, name: 'Data Top-up', status: 'inactive' },
    { id: 3, name: 'Ring Tone Personalization', status: 'active' },
    { id: 4, name: 'Premium Voice', status: 'inactive' }
  ]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState('bills');
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetchBills();
  }, [token]);

  const fetchBills = async () => {
    try {
      // For now, we'll use a test user ID (would be from decoded JWT in real app)
      const response = await axios.get(`${BILL_API_URL}/bills/1`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBills(response.data);
    } catch (error) {
      console.error('Failed to fetch bills:', error);
      setBills([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePayBill = async (billId) => {
    setPaymentStatus('Processing payment...');
    try {
      const response = await axios.post(`${PAYMENT_API_URL}/payments/pay`, {
        billId: billId,
        userId: 1,
        amount: selectedBill.amount,
        cardToken: 'test-token-12345'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPaymentStatus('Payment successful! ✓');
      setTimeout(() => fetchBills(), 1500);
    } catch (error) {
      setPaymentStatus(`Payment failed: ${error.response?.data?.error || 'Unknown error'}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  const handleToggleService = async (service) => {
    try {
      const action = service.status === 'active' ? 'deactivate' : 'activate';
      const response = await axios.post(
        `${SERVICE_API_URL}/services/${action}`,
        { userId: 1, service: service.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local service status
      setServices(services.map(s =>
        s.id === service.id
          ? { ...s, status: action === 'activate' ? 'active' : 'inactive' }
          : s
      ));
      setPaymentStatus(`Service ${service.name} ${action}d successfully!`);
      setTimeout(() => setPaymentStatus(''), 3000);
    } catch (error) {
      setPaymentStatus(`Failed to ${action} service: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const newMessage = { sender: 'customer', text: chatInput, timestamp: new Date().toLocaleTimeString() };
    setChatMessages([...chatMessages, newMessage]);
    setChatInput('');

    try {
      const response = await axios.post(
        `${CHAT_API_URL}/chat/send`,
        { username, message: chatInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Simulate agent response (would be WebSocket in production)
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          sender: 'agent',
          text: response.data.response || 'Thank you for contacting us. An agent will respond shortly.',
          timestamp: new Date().toLocaleTimeString()
        }]);
      }, 1000);
    } catch (error) {
      console.error('Chat error:', error);
    }
  };


  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Sri-Care Dashboard</h1>
        <div className="header-actions">
          <span>Welcome, {username}!</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={`nav-btn ${activeTab === 'bills' ? 'active' : ''}`}
          onClick={() => setActiveTab('bills')}
        >
          Bills & Payments
        </button>
        <button 
          className={`nav-btn ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Services
        </button>
        <button 
          className={`nav-btn ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          Support Chat
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'bills' && (
          <section className="bills-section">
            <h2>Your Bills</h2>
            {loading ? (
              <p>Loading bills...</p>
            ) : bills.length === 0 ? (
              <p>No bills found.</p>
            ) : (
              <table className="bills-table">
                <thead>
                  <tr>
                    <th>Bill Month</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map((bill) => (
                    <tr key={bill.id}>
                      <td>{new Date(bill.billDate).toLocaleDateString()}</td>
                      <td>LKR {bill.amount.toFixed(2)}</td>
                      <td>{new Date(bill.dueDate).toLocaleDateString()}</td>
                      <td className={`status-${bill.status.toLowerCase()}`}>{bill.status}</td>
                      <td>
                        {bill.status !== 'PAID' && (
                          <button onClick={() => {
                            setSelectedBill(bill);
                            handlePayBill(bill.id);
                          }} className="pay-btn">Pay Now</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {paymentStatus && (
              <div className={`alert ${paymentStatus.includes('successful') ? 'alert-success' : 'alert-error'}`}>
                {paymentStatus}
              </div>
            )}
          </section>
        )}

        {activeTab === 'services' && (
          <section className="services-section">
            <h2>Manage Your Services</h2>
            <div className="services-grid">
              {services.map((service) => (
                <div key={service.id} className="service-card">
                  <h3>{service.name}</h3>
                  <p className={`service-status ${service.status}`}>
                    Status: {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                  </p>
                  <button
                    className={`service-btn ${service.status}`}
                    onClick={() => handleToggleService(service)}
                  >
                    {service.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'chat' && (
          <section className="chat-section">
            <h2>Customer Care Chat</h2>
            <div className="chat-container">
              <div className="chat-messages">
                {chatMessages.length === 0 ? (
                  <p className="no-messages">Start a conversation with our support team</p>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <div key={idx} className={`chat-message ${msg.sender}`}>
                      <strong>{msg.sender === 'customer' ? 'You' : 'Support Agent'}</strong>
                      <p>{msg.text}</p>
                      <span className="timestamp">{msg.timestamp}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="chat-input-area">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                  placeholder="Type your message..."
                  rows="3"
                />
                <button onClick={handleSendMessage}>Send Message</button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
