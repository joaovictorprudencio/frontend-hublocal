import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from './Button';
import CloseIcon from '@mui/icons-material/Close';


type ConfirmDialogProps = {
    open: boolean;
    title: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
    cancelText?: string;
    confirmText?: string;
};


export default function ConfirmDialog({
    open,
    title,
    message,
    onClose,
    onConfirm,
    cancelText = 'Cancelar',
    confirmText = 'Excluir',
}: ConfirmDialogProps) {


    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="custom-dialog-title"
            aria-describedby="custom-dialog-description"
            sx={{
                '& .MuiDialog-paper': {
                    width: '600px',
                    maxWidth: '90vw',
                    borderRadius: '8px',
                },
            }}
        >
            <DialogTitle
                id="custom-dialog-title"
                sx={{
                    backgroundColor: '#C90808',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {title}
                <CloseIcon onClick={onClose} sx={{ cursor: 'pointer' }} />
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="custom-dialog-description" sx={{ paddingTop: '3%', paddingBottom:'5%' }}>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ boxShadow: '0px -4px 6px -2px rgba(0, 0, 0, 0.2)', justifyContent: 'flex-end' }}>
                <Button label={confirmText} onClick={onConfirm} color='error' />
            </DialogActions>
        </Dialog>
    );
}



