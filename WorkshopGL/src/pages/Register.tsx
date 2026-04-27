import React from 'react';
import { useNavigate } from 'react-router';
import { 
  Box, Tabs, Tab, TextField, Button, Paper, Typography, CssBaseline 
} from '@mui/material';

export default function Register() {
  const navigate = useNavigate();

  // Navigăm înapoi la login dacă se dă click pe primul tab (index 0)
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) navigate('/login');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Logica de înregistrare se execută aici...');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      // Fundal Bej Pastel
      background: 'linear-gradient(135deg, #F5F5DC 0%, #E8E8D0 100%)',
      padding: 2
    }}>
      <CssBaseline />

      {/* Decoratiune fundal pentru a accentua efectul de sticla (Glassmorphism) */}
      <Box sx={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: '#D4E0AD', // Verde foarte pal
        borderRadius: '50%',
        filter: 'blur(80px)',
        top: '10%',
        left: '15%',
        zIndex: 0
      }} />

      <Paper elevation={0} sx={{ 
        width: '100%', 
        maxWidth: 400,
        borderRadius: '24px',
        overflow: 'hidden',
        zIndex: 1,
        // Stilul Glassmorphism
        background: 'rgba(255, 255, 255, 0.4)', 
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
      }}>
        
        <Tabs 
          value={1} // Tab-ul "Creează cont" este activ
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
              color: '#6B8E23 !important' // Verde Olive/Pastel
            },
            '& .MuiTabs-indicator': { 
              backgroundColor: '#A8C69F', // Verde Sage
              height: '4px',
              borderRadius: '4px 4px 0 0'
            }
          }}
        >
          <Tab label="Intră în cont" />
          <Tab label="Creează cont" />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ 
            color: '#4A4A3F', 
            fontWeight: 800, 
            textAlign: 'center', 
            mb: 1 
          }}>
            Alătură-te comunității
          </Typography>
          <Typography sx={{ 
            color: '#8C8C7E', 
            textAlign: 'center', 
            mb: 3, 
            fontSize: '0.9rem' 
          }}>
            Creează-ți un cont în câteva secunde.
          </Typography>
          
          <Box sx={{ mt: 1 }}>
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

            <TextField
              fullWidth
              label="Confirmă parola"
              variant="outlined"
              margin="normal"
              type="password"
              required
              sx={inputStyle}
            />

            <Typography sx={{ 
              color: '#8C8C7E', 
              fontSize: '0.75rem', 
              mt: 2, 
              textAlign: 'center' 
            }}>
              Prin înregistrare, ești de acord cu <b>Termenii și Condițiile</b> noastre.
            </Typography>

            <Button 
              fullWidth 
              variant="contained" 
              type="submit"
              sx={{ 
                mt: 3,
                backgroundColor: '#A8C69F', // Verde Sage
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
              Creează Contul
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

// Stilul pentru Input-uri (reutilizabil)
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