import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppRoutes />
  </ThemeProvider>
</StrictMode>
)
