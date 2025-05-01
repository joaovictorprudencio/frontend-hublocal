import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Location } from '../../../types/location'
import { useEffect, useState } from 'react';


type CustomDialogProps = {
  open: boolean;
  title: string;
  message: string;
  location: Location;
  onClose: () => void;
  onConfirm: (updatedLocation: Location) => void;
  cancelText?: string;
  confirmText?: string;
};


export default function ModalLocation({
  open,
  title,
  location,
  onClose,
  onConfirm,
  cancelText = 'Cancelar',
  confirmText = 'Confirmar',
}: CustomDialogProps) {


  const [locationData, setLocationData] = useState(location);

  useEffect(() => {
    setLocationData(location);
  }, [location]);


  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="custom-dialog-title"
      aria-describedby="custom-dialog-description"
      sx={{
        '& .MuiDialog-paper': {
          width: '700px',
          maxWidth: '90vw',
          borderRadius: '8px',
        },
      }}
    >
      <DialogTitle id="custom-dialog-title"
        sx={{
          backgroundColor: '#0385FD',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between'

        }}

      >
        {title}
        <CloseIcon onClick={onClose} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="custom-dialog-description">
          <InputContainer>
            <Input
             style={{ marginBottom: '3%' }}
              id="name"
              label="Nome"
              type="text"
              placeholder=' digite o nome '
              value={locationData.name}
              onChange={(e) =>
                setLocationData({ ...locationData, name: e.target.value })
              }
            />
          </InputContainer>
          <InputContainer>
            <Input
            style={{ marginBottom: '3%' }}
              id="zipCode"
              label="CEP"
              type="text"
              placeholder=' digite o cep'
              value={locationData.zipCode}
              onChange={(e) =>
                setLocationData({ ...locationData, zipCode: e.target.value })
              }
            />
            <Input
              id="rua"
              label="Rua"
              type="text"
              placeholder='digite a rua'
              value={locationData.street}
              onChange={(e) =>
                setLocationData({ ...locationData, street: e.target.value })
              }
            />
          </InputContainer>
          <InputContainer>
            <Input
             style={{ marginBottom: '3%' }}
              id="number"
              label="Numero"
              type="number"
              placeholder=' digite o numero'
              value={locationData.number}
              onChange={(e) =>
                setLocationData({ ...locationData, number: e.target.value })
              }
            />
            <Input
              id="neighborhood"
              label="Bairro"
              type="text"
              placeholder='digite o bairro'
              value={locationData.neighborhood}
              onChange={(e) =>
                setLocationData({ ...locationData, neighborhood: e.target.value })
              }
            />
          </InputContainer>
          <InputContainer>
            <Input
              id="city"
              label="Cidade"
              type="text"
              placeholder=' digite a cidade'
              value={locationData.city}
              onChange={(e) =>
                setLocationData({ ...locationData, city: e.target.value })
              }
            />
            <Input
              id="state"
              label="Estado"
              type="text"
              placeholder='digite o estado'
              value={locationData.state}
              onChange={(e) =>
                setLocationData({ ...locationData, state: e.target.value })
              }
            />
          </InputContainer>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ boxShadow: '0px -4px 6px -2px rgba(0, 0, 0, 0.2)' }}>
        <Button
          sx={{ marginBottom: '1%', marginTop: '1%' }}
          label={confirmText}
          onClick={() => onConfirm(locationData)} />
      </DialogActions>
    </Dialog>
  );
}



const InputContainer = styled.div`
width: 100%; 
margin-top:1%; 
display: flex;
gap:4%;
background-color: primary;
`;