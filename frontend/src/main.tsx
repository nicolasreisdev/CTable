import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './API/AuthContext.tsx';
import { ThemeProvider } from 'styled-components';
import App from './App.tsx'
import { defaultTheme } from './styles/themes/default.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
