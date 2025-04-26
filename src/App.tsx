import { useState } from 'react'
import './App.css'
import { Button, TextField, Container, Typography } from '@mui/material';
import styled from 'styled-components';
function App() {
  const [nome, setNome] = useState<string>('');

  const handleClick = () => {
    alert(`Olá, ${nome}!`);
  };

  const Frase = styled.h1 `color: #e70c0c;`;

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao MUI + React + TypeScript!
      </Typography>
      <Frase>style componets aqui</Frase>x
      <TextField
        label="Digite seu nome"
        variant="outlined"
        fullWidth
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        disabled={!nome}
      >
        Dizer Olá
      </Button>
    </Container>
  )
}

export default App
