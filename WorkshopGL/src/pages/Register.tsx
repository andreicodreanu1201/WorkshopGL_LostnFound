import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box, Tabs, Tab, TextField, Button, Paper,
  Typography, CssBaseline, Alert, CircularProgress
} from '@mui/material';
import { authApi } from '../api/endpoints';

export default function Register() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) navigate('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.register(
        email, password, firstname, lastname, address, phone
      );
      const token = response?.token;
      if (token) localStorage.setItem('authToken', token);
      navigate('/homepage');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error?.response?.data?.message || 'A apărut o eroare. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #F5F5DC 0%, #E8E8D0 100%)',
      padding: 2
    }}>
      <CssBaseline />

      <Box sx={{
        position: 'absolute', width: '300px', height: '300px',
        background: '#D4E0AD', borderRadius: '50%', filter: 'blur(80px)',
        top: '10%', left: '15%', zIndex: 0
      }} />

      <Paper elevation={0} sx={{
        width: '100%',
        maxWidth: 400,
        borderRadius: '24px',
        overflow: 'hidden',
        zIndex: 1,
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
      }}>

        <Tabs
          value={1}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': { color: '#8C8C7E', fontWeight: 600, textTransform: 'none', py: 2 },
            '& .Mui-selected': { color: '#6B8E23 !important' },
            '& .MuiTabs-indicator': { backgroundColor: '#A8C69F', height: '4px', borderRadius: '4px 4px 0 0' }
          }}
        >
          <Tab label="Intră în cont" />
          <Tab label="Creează cont" />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ color: '#4A4A3F', fontWeight: 800, textAlign: 'center', mb: 1 }}>
            Alătură-te comunității
          </Typography>
          <Typography sx={{ color: '#8C8C7E', textAlign: 'center', mb: 3, fontSize: '0.9rem' }}>
            Creează-ți un cont în câteva secunde.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mt: 1 }}>
            <TextField fullWidth label="Prenume" variant="outlined" margin="normal" required
              value={firstname} onChange={(e) => setFirstname(e.target.value)} sx={inputStyle} />

            <TextField fullWidth label="Nume" variant="outlined" margin="normal" required
              value={lastname} onChange={(e) => setLastname(e.target.value)} sx={inputStyle} />

            <TextField fullWidth label="Adresa de email" variant="outlined" margin="normal" required
              value={email} onChange={(e) => setEmail(e.target.value)} sx={inputStyle} />

            <TextField fullWidth label="Adresă" variant="outlined" margin="normal" required
              value={address} onChange={(e) => setAddress(e.target.value)} sx={inputStyle} />

            <TextField fullWidth label="Număr de telefon" variant="outlined" margin="normal" required
              value={phone} onChange={(e) => setPhone(e.target.value)} sx={inputStyle} />

            <TextField fullWidth label="Parolă" variant="outlined" margin="normal" type="password" required
              value={password} onChange={(e) => setPassword(e.target.value)} sx={inputStyle} />

            <Typography sx={{ color: '#8C8C7E', fontSize: '0.75rem', mt: 2, textAlign: 'center' }}>
              Prin înregistrare, ești de acord cu <b>Termenii și Condițiile</b> noastre.
            </Typography>

            <Button
              fullWidth variant="contained" type="submit" disabled={loading}
              sx={{
                mt: 3, backgroundColor: '#A8C69F', color: '#fff', padding: '12px',
                borderRadius: '12px', fontWeight: 700, fontSize: '1rem', textTransform: 'none',
                boxShadow: '0 4px 14px rgba(168, 198, 159, 0.4)',
                '&:hover': { backgroundColor: '#8EB482', boxShadow: '0 6px 20px rgba(168, 198, 159, 0.6)' }
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Creează Contul'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '12px',
    '& fieldset': { borderColor: 'rgba(0,0,0,0.05)' },
    '&:hover fieldset': { borderColor: '#A8C69F' },
    '&.Mui-focused fieldset': { borderColor: '#A8C69F' },
  },
  '& .MuiInputLabel-root': { color: '#8C8C7E' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#6B8E23' }
};