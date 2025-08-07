import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress
} from '@mui/material';
import {
  PeopleAlt,
  Bloodtype,
  Assignment,
  BarChart,
  HowToReg,
  Block
} from '@mui/icons-material';
import axios from 'axios';

function Admin() {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, donorsRes, requestsRes] = await Promise.all([
          axios.get('/api/admin/users'),
          axios.get('/api/admin/donors'),
          axios.get('/api/admin/requests')
        ]);
        
        setUsers(usersRes.data);
        setDonors(donorsRes.data);
        setRequests(requestsRes.data);
        setLoading(false);
      } catch (err) {
        toast.error('ডাটা লোড করতে সমস্যা হয়েছে');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleVerifyUser = async (userId) => {
    try {
      await axios.put(`/api/admin/verify/${userId}`);
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isVerified: true } : user
      ));
      toast.success('ইউজার ভেরিফাই করা হয়েছে');
    } catch (err) {
      toast.error('ভেরিফাই করতে সমস্যা হয়েছে');
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        এডমিন ড্যাশবোর্ড
      </Typography>
      
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="ইউজার্স" icon={<PeopleAlt />} />
        <Tab label="রক্তদাতা" icon={<Bloodtype />} />
        <Tab label="অনুরোধসমূহ" icon={<Assignment />} />
        <Tab label="স্ট্যাটিস্টিক্স" icon={<BarChart />} />
      </Tabs>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ mt: 3 }}>
          {tabValue === 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>নাম</TableCell>
                    <TableCell>ইমেইল</TableCell>
                    <TableCell>ফোন</TableCell>
                    <TableCell>স্ট্যাটাস</TableCell>
                    <TableCell>অ্যাকশন</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        {user.isVerified ? 'ভেরিফাইড' : 'অনভেরিফাইড'}
                      </TableCell>
                      <TableCell>
                        {!user.isVerified && (
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            startIcon={<HowToReg />}
                            onClick={() => handleVerifyUser(user._id)}
                          >
                            ভেরিফাই করুন
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          startIcon={<Block />}
                          sx={{ ml: 1 }}
                        >
                          ব্লক করুন
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          
          {tabValue === 1 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>নাম</TableCell>
                    <TableCell>ব্লাড গ্রুপ</TableCell>
                    <TableCell>জেলা</TableCell>
                    <TableCell>সর্বশেষ ডোনেশন</TableCell>
                    <TableCell>স্ট্যাটাস</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donors.map((donor) => (
                    <TableRow key={donor._id}>
                      <TableCell>{donor.name}</TableCell>
                      <TableCell>{donor.bloodGroup}</TableCell>
                      <TableCell>{donor.district}</TableCell>
                      <TableCell>
                        {new Date(donor.lastDonation).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {donor.isAvailable ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          
          {tabValue === 2 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>রোগীর নাম</TableCell>
                    <TableCell>ব্লাড গ্রুপ</TableCell>
                    <TableCell>হাসপাতাল</TableCell>
                    <TableCell>স্ট্যাটাস</TableCell>
                    <TableCell>তারিখ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request._id}>
                      <TableCell>{request.patientName}</TableCell>
                      <TableCell>{request.bloodGroup}</TableCell>
                      <TableCell>{request.hospital}</TableCell>
                      <TableCell>
                        {request.status === 'pending' ? 'মুলতুবি' : 'সম্পূর্ণ'}
                      </TableCell>
                      <TableCell>
                        {new Date(request.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          
          {tabValue === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                সিস্টেম স্ট্যাটিস্টিক্স
              </Typography>
              {/* এখানে চার্ট বা স্ট্যাটস যোগ করুন */}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default Admin;
