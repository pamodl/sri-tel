import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Grid,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Chip,
  Switch,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  LinearProgress,
  Rating,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Payment as PaymentIcon,
  Settings as SettingsIcon,
  Chat as ChatIcon,
  ReceiptLong as BillIcon,
  Home as HomeIcon,
  AccountCircle as AccountIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  AssignmentTurnedIn as ApprovedIcon,
  Pending as PendingIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const BILL_API_URL = 'http://localhost:8082';
const PAYMENT_API_URL = 'http://localhost:8083';
const SERVICE_API_URL = 'http://localhost:8085';
const CHAT_API_URL = 'http://localhost:8086';

// Material 3 Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1F5E3C 0%, #4CAF50 100%)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: '8px',
  padding: '10px 24px',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[6],
  },
}));

const StatusChip = styled(Chip)(({ status, theme }) => ({
  fontWeight: 600,
  borderRadius: '20px',
  fontSize: '0.85rem',
  backgroundColor: status === 'PAID' || status === 'active' ? '#E8F5E9' : status === 'PENDING' ? '#FFF3E0' : '#FFEBEE',
  color: status === 'PAID' || status === 'active' ? '#1B5E20' : status === 'PENDING' ? '#E65100' : '#C62828',
}));

const MessageBox = styled(Box)(({ theme, sender }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: '12px',
  backgroundColor: sender === 'customer' ? '#1F5E3C' : '#F5F5F5',
  color: sender === 'customer' ? '#fff' : '#1F2937',
  marginLeft: sender === 'customer' ? theme.spacing(8) : 0,
  marginRight: sender === 'agent' ? theme.spacing(8) : 0,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid #E5E7EB',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1F5E3C',
    height: '4px',
    borderRadius: '4px 4px 0 0',
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #F8F9FA 0%, #F0F4F8 100%)',
  borderRadius: '12px',
  marginBottom: theme.spacing(3),
  border: '1px solid rgba(0, 0, 0, 0.05)',
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Dashboard() {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetchBills();
    fetchServices();
  }, [token]);

  const fetchBills = async () => {
    try {
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

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${SERVICE_API_URL}/services/user/1`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(response.data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setServices([]);
    }
  };

  const handlePayBill = async (billId) => {
    setPaymentStatus('Processing payment...');
    try {
      await axios.post(`${PAYMENT_API_URL}/payments/pay`, {
        billId: billId,
        userId: 1,
        amount: selectedBill.amount,
        cardToken: 'test-token-12345'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPaymentStatus('Payment successful! ✓');
      setPaymentDialogOpen(false);
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
    const action = service.status === 'active' ? 'deactivate' : 'activate';
    try {
      await axios.post(
        `${SERVICE_API_URL}/services/${action}`,
        { userId: 1, service: service.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPaymentStatus(`Service ${service.name} ${action}d successfully!`);
      setTimeout(() => setPaymentStatus(''), 3000);
      fetchServices();
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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F8F9FA' }}>
      <StyledAppBar position="static">
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
            <BillIcon sx={{ mr: 1, fontSize: 28 }} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 700, fontFamily: '"Figtree", sans-serif' }}>
              Sri-Care
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: '#4CAF50', width: 40, height: 40, fontWeight: 600 }}>
                {username?.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#fff' }}>
                  {username}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Customer
                </Typography>
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
            <Tooltip title="Logout">
              <IconButton
                color="inherit"
                onClick={handleLogout}
                sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Container maxWidth="lg" sx={{ flex: 1, py: 3 }}>
        {paymentStatus && (
          <Alert
            severity={paymentStatus.includes('successful') ? 'success' : 'error'}
            sx={{ mb: 3, borderRadius: '8px' }}
            onClose={() => setPaymentStatus('')}
          >
            {paymentStatus}
          </Alert>
        )}

        <Paper sx={{ borderBottom: '1px solid #E5E7EB', borderRadius: 0, boxShadow: 'none' }}>
          <StyledTabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            aria-label="dashboard tabs"
            sx={{ px: 3 }}
          >
            <Tab 
              label="Bills & Payments" 
              icon={<PaymentIcon sx={{ mr: 1 }} />} 
              iconPosition="start"
              sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.95rem' }}
            />
            <Tab 
              label="Services" 
              icon={<SettingsIcon sx={{ mr: 1 }} />} 
              iconPosition="start"
              sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.95rem' }}
            />
            <Tab 
              label="Support Chat" 
              icon={<ChatIcon sx={{ mr: 1 }} />} 
              iconPosition="start"
              sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.95rem' }}
            />
          </StyledTabs>
        </Paper>

        <TabPanel value={activeTab} index={0}>
          <Box>
            <HeaderBox>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <PaymentIcon sx={{ fontSize: 32, color: '#1F5E3C' }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1F2937' }}>
                  Your Bills
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Track and pay your monthly bills
              </Typography>
            </HeaderBox>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <CircularProgress size={48} sx={{ mb: 2 }} />
                  <Typography color="text.secondary">Loading bills...</Typography>
                </Box>
              </Box>
            ) : bills.length === 0 ? (
              <Alert severity="info" sx={{ borderRadius: '8px', border: '1px solid #BFDBFE' }}>
                No bills found. Your account is all set!
              </Alert>
            ) : (
              <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#F3F4F6', borderBottom: '2px solid #E5E7EB' }}>
                      <TableCell sx={{ fontWeight: 700, color: '#1F2937' }}>Bill Month</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1F2937' }}>Amount</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1F2937' }}>Due Date</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1F2937' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1F2937' }} align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bills.map((bill) => (
                      <TableRow 
                        key={bill.id} 
                        hover
                        sx={{ 
                          '&:hover': { bgcolor: '#F9FAFB' },
                          borderBottom: '1px solid #E5E7EB'
                        }}
                      >
                        <TableCell sx={{ fontWeight: 500 }}>{new Date(bill.billDate).toLocaleDateString()}</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#1F5E3C' }}>LKR {bill.amount.toFixed(2)}</TableCell>
                        <TableCell sx={{ color: '#6B7280' }}>{new Date(bill.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <StatusChip
                            status={bill.status}
                            label={bill.status}
                            icon={bill.status === 'PAID' ? <CheckIcon sx={{ fontSize: 14 }} /> : <PendingIcon sx={{ fontSize: 14 }} />}
                            variant="filled"
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          {bill.status !== 'PAID' && (
                            <StyledButton
                              variant="contained"
                              color="primary"
                              size="small"
                              startIcon={<PaymentIcon sx={{ fontSize: 16 }} />}
                              onClick={() => {
                                setSelectedBill(bill);
                                setPaymentDialogOpen(true);
                              }}
                              sx={{ textTransform: 'none', fontWeight: 600 }}
                            >
                              Pay Now
                            </StyledButton>
                          )}
                          {bill.status === 'PAID' && (
                            <Chip
                              icon={<CheckIcon />}
                              label="Paid"
                              variant="outlined"
                              color="success"
                              size="small"
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Box>
            <HeaderBox>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <SettingsIcon sx={{ fontSize: 32, color: '#0891B2' }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1F2937' }}>
                  Manage Your Services
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Activate or deactivate your mobile services
              </Typography>
            </HeaderBox>
            {services.length === 0 ? (
              <Alert severity="info" sx={{ borderRadius: '8px', border: '1px solid #BFDBFE' }}>
                No services available at the moment.
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {services.map((service) => (
                  <Grid item xs={12} sm={6} md={4} key={service.id}>
                    <StyledCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ pb: 2, flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                          <SettingsIcon sx={{ fontSize: 28, color: '#0891B2' }} />
                          <StatusChip
                            status={service.status}
                            label={service.status === 'active' ? 'Active' : 'Inactive'}
                            size="small"
                            variant="filled"
                          />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1F2937' }}>
                          {service.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Service ID: {service.id}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                          <Typography variant="body2">
                            {service.status === 'active' ? 'Active' : 'Inactive'}
                          </Typography>
                          <Switch
                            checked={service.status === 'active'}
                            onChange={() => handleToggleService(service)}
                            color="primary"
                          />
                        </Box>
                      </CardContent>
                      <Divider />
                      <CardActions sx={{ pt: 2 }}>
                        <StyledButton
                          size="small"
                          variant={service.status === 'active' ? 'outlined' : 'contained'}
                          color={service.status === 'active' ? 'error' : 'success'}
                          onClick={() => handleToggleService(service)}
                          fullWidth
                          startIcon={service.status === 'active' ? <DeleteIcon /> : <CheckIcon />}
                          sx={{ fontWeight: 600 }}
                        >
                          {service.status === 'active' ? 'Deactivate' : 'Activate'}
                        </StyledButton>
                      </CardActions>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Box>
            <HeaderBox>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <ChatIcon sx={{ fontSize: 32, color: '#3B82F6' }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1F2937' }}>
                  Customer Support Chat
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Get instant help from our support team
              </Typography>
            </HeaderBox>
            <Paper elevation={0} sx={{ 
              height: '500px', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                flex: 1, 
                overflowY: 'auto', 
                p: 3,
                bgcolor: '#F8F9FA',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {chatMessages.length === 0 ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <ChatIcon sx={{ fontSize: 48, color: '#D1D5DB', mb: 2 }} />
                      <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                        Start a conversation with our support team
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <MessageBox key={idx} sender={msg.sender}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <Avatar sx={{ 
                          width: 32, 
                          height: 32, 
                          bgcolor: msg.sender === 'customer' ? '#1F5E3C' : '#3B82F6',
                          fontSize: '0.875rem'
                        }}>
                          {msg.sender === 'customer' ? 'Y' : 'A'}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {msg.sender === 'customer' ? 'You' : 'Support Agent'}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5, lineHeight: 1.5 }}>{msg.text}</Typography>
                          <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 0.5 }}>
                            {msg.timestamp}
                          </Typography>
                        </Box>
                      </Box>
                    </MessageBox>
                  ))
                )}
              </Box>
              <Divider />
              <Box sx={{ p: 2, bgcolor: '#FFFFFF', display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    }
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                />
                <Tooltip title="Send message (Shift+Enter for new line)">
                  <IconButton
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    sx={{ 
                      bgcolor: '#1F5E3C',
                      color: '#fff',
                      '&:hover': { 
                        bgcolor: '#0D3B1F',
                        transform: 'scale(1.05)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                    size="small"
                  >
                    <SendIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          </Box>
        </TabPanel>
      </Container>

      <Dialog 
        open={paymentDialogOpen} 
        onClose={() => setPaymentDialogOpen(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: '12px' }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: 1 }}>
          <PaymentIcon sx={{ color: '#1F5E3C' }} />
          Confirm Payment
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          {selectedBill && (
            <Box>
              <Box sx={{ mb: 3, p: 2, bgcolor: '#F3F4F6', borderRadius: '8px' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
                  Bill Amount
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1F5E3C' }}>
                  LKR {selectedBill.amount.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
                  Bill Date
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {new Date(selectedBill.billDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
                  Due Date
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {new Date(selectedBill.dueDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Alert severity="info" sx={{ borderRadius: '8px' }}>
                Payment will be processed through our secure payment gateway.
              </Alert>
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <StyledButton 
            onClick={() => setPaymentDialogOpen(false)}
            variant="outlined"
            color="inherit"
          >
            Cancel
          </StyledButton>
          <StyledButton
            variant="contained"
            color="success"
            onClick={() => handlePayBill(selectedBill.id)}
            startIcon={<PaymentIcon />}
            autoFocus
          >
            Confirm Payment
          </StyledButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
