import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box, Tabs, Tab, TextField, Button, Paper,
  Typography, CssBaseline, Alert, CircularProgress
} from '@mui/material';
import { authApi } from '../api/endpoints';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

    const [form, setForm] = React.useState({
        email: "",
        password: "",
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login(email, password);
      const token = response?.token;
      if (token) localStorage.setItem('authToken', token);
      navigate('/homepage');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error?.response?.data?.message || 'Email sau parolă incorectă.');
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
      background: 'linear-gradient(135deg, #F5F5DC 0%, #E8E8D0 100%)',
      padding: 2
    }}>
      <CssBaseline />

      <Paper elevation={0} sx={{
        width: '100%',
        maxWidth: 400,
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
      }}>

        <Tabs
          value={0}
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
            Bine ai revenit
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mt: 2, borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mt: 3 }}>
            <TextField fullWidth label="Adresa de email" variant="outlined" margin="normal" required
              value={email} onChange={(e) => setEmail(e.target.value)} sx={inputStyle} />

            <TextField fullWidth label="Parolă" variant="outlined" margin="normal" type="password" required
              value={password} onChange={(e) => setPassword(e.target.value)} sx={inputStyle} />

            <Typography sx={{
              color: '#6B8E23', fontSize: '0.85rem', cursor: 'pointer',
              mt: 1, textAlign: 'right', fontWeight: 600,
              '&:hover': { opacity: 0.8 }
            }}>
              Ai uitat parola?
            </Typography>

            <Button
              fullWidth variant="contained" type="submit" disabled={loading}
              sx={{
                mt: 4, backgroundColor: '#A8C69F', color: '#fff', padding: '12px',
                borderRadius: '12px', fontWeight: 700, fontSize: '1rem', textTransform: 'none',
                boxShadow: '0 4px 14px rgba(168, 198, 159, 0.4)',
                '&:hover': { backgroundColor: '#8EB482', boxShadow: '0 6px 20px rgba(168, 198, 159, 0.6)' }
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Autentificare'}
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
