import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const BILL_API_URL = 'http://localhost:8082';
const PAYMENT_API_URL = 'http://localhost:8083';

export default function Dashboard() {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Sri-Care Dashboard</h1>
        <div className="header-actions">
          <span>Welcome, {username}!</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-content">
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
        </section>

        {paymentStatus && (
          <section className="payment-status">
            <p className={paymentStatus.includes('successful') ? 'success' : 'error'}>
              {paymentStatus}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
