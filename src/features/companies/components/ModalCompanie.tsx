import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Company } from '../../../types/company'
import { useEffect, useState } from 'react';

type CustomDialogProps = {
  open: boolean;
  title: string;
  message: string;
  company: Company;
  onClose: () => void;
  onConfirm: (updatedCompany: Company) => void;
  cancelText?: string;
  confirmText?: string;
};


export default function ModalCompanie({
  open,
  title,
  company,
  onClose,
  onConfirm,
  cancelText = 'Cancelar',
  confirmText = 'Confirmar',
}: CustomDialogProps) {


  const [companyData, setCompanyData] = useState(company);

  useEffect(() => {
    setCompanyData(company);
  }, [company]);


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
              id="name"
              label="Nome"
              type="text"
              placeholder='nome da empresa'
              value={companyData.name}
              onChange={(e) =>
                setCompanyData({ ...companyData, name: e.target.value })
              }
            />
          </InputContainer>
          <InputContainer>
            <Input
              id="website"
              label="Website"
              type="text"
              placeholder=' website da empresa '
              value={companyData.website}
              onChange={(e) =>
                setCompanyData({ ...companyData, website: e.target.value })
              }
            />
            <Input
              id="cnpj"
              label="CNJP"
              type="text"
              placeholder='CNPJ da empresa'
              value={companyData.cnpj}
              onChange={(e) =>
                setCompanyData({ ...companyData, cnpj: e.target.value })
              }
            />
          </InputContainer>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ boxShadow: '0px -4px 6px -2px rgba(0, 0, 0, 0.2)' }}>
        <Button
          sx={{ marginBottom: '1%', marginTop: '1%' }}
          label={confirmText}
          onClick={() => onConfirm(companyData)} />
      </DialogActions>
    </Dialog>
  );
}


const InputContainer = styled.section`
width: 100%; 
margin-top:3%; 
display: flex;
gap:4%;
background-color: primary;
`;


