import React from 'react';
import { useNavigate } from 'react-router';
import { 
  Box, Tabs, Tab, TextField, Button, Paper, Typography, CssBaseline 
} from '@mui/material';

export default function Login() {
  const navigate = useNavigate();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue === 1) navigate('/register');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // Fundal Bej Pastel Cald
      background: 'linear-gradient(135deg, #F5F5DC 0%, #E8E8D0 100%)',
      padding: 2
    }}>
      <CssBaseline />
      
      <Paper elevation={0} sx={{ 
        width: '100%', 
        maxWidth: 400,
        borderRadius: '24px', // Mai rotunjit, stil modern
        overflow: 'hidden',
        // Glassmorphism pentru culori deschise
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
            '& .MuiTab-root': { 
              color: '#8C8C7E', 
              fontWeight: 600,
              textTransform: 'none',
              py: 2
            },
            '& .Mui-selected': { 
              color: '#6B8E23 !important' // Verde Olive/Pastel pentru tab selectat
            },
            '& .MuiTabs-indicator': { 
              backgroundColor: '#A8C69F', // Verde Pastel (Sage)
              height: '4px',
              borderRadius: '4px 4px 0 0'
            }
          }}
        >
          <Tab label="Intră în cont" />
          <Tab label="Creează cont" />
        </Tabs>

        <Box component="form" sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ 
            color: '#4A4A3F', 
            fontWeight: 800, 
            textAlign: 'center', 
            mb: 1 
          }}>
            Bine ai revenit
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Adresa de email"
              variant="outlined"
              margin="normal"
              required
              sx={inputStyle}
            />

            <TextField
              fullWidth
              label="Parolă"
              variant="outlined"
              margin="normal"
              type="password"
              required
              sx={inputStyle}
            />

            <Typography sx={{ 
              color: '#6B8E23', 
              fontSize: '0.85rem', 
              cursor: 'pointer',
              mt: 1,
              textAlign: 'right',
              fontWeight: 600,
              '&:hover': { opacity: 0.8 }
            }}>
              Ai uitat parola?
            </Typography>

            <Button 
              fullWidth 
              variant="contained" 
              type="submit"
              sx={{ 
                mt: 4,
                backgroundColor: '#A8C69F', // Verde Pastel principal
                color: '#fff',
                padding: '12px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(168, 198, 159, 0.4)',
                '&:hover': {
                  backgroundColor: '#8EB482',
                  boxShadow: '0 6px 20px rgba(168, 198, 159, 0.6)',
                }
              }}
            >
              Autentificare
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

// Stil reutilizabil pentru Input-uri (Vibe OLX + Soft)
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