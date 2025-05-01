import Header from '../../../components/Header';
import styled from 'styled-components';
import Button from '../../../components/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import ConfirmDialog from '../../../components/ModalDelete';
import { useNavigate, useParams } from 'react-router-dom';
import { Location } from '../../../types/location';
import ModalLocation from '../components/ModalLocation';
import { addLocation, deleteLocation, setLocations, updateLocation } from '../../../store/locationSlice';
import WestIcon from '@mui/icons-material/West';
import api from '../../../api/api';
import { useEffect } from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



const LocationsPage = () => {


    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    const { companyId } = useParams<{ companyId: string }>();
    const companyIdNumber = Number(companyId);


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`location/${companyId}`);
                dispatch(setLocations(response.data));
            } catch (error) {
                console.error('Erro ao buscar locations:', error);
            }
        };

        getData();

    }, [companyId, dispatch])





    const locationsData = useSelector((state: RootState) => state.location.locations);

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [messege, setMessage] = useState('');

    const showSnackbar = (msg: string) => {
        setMessage(msg);
        setOpenSnackBar(true);
    };


    const handleCloseSnackbar = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };


    const [openConfirm, setOpenConfirm] = useState(false);
    const [locationToDelete, setLocationDelete] = useState<Location | null>(null);
    const [open, setOpen] = useState(false);
    const [titleModal, setTitleModal] = useState('Adicionar empresa');
    const [locationSelect, setLocationSelect] = useState<Location>({
        id: 0,
        name: '',
        zipCode: '',
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        companyId: companyIdNumber,
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const editLocation = (location: Location) => {
        setOpen(true);
        setLocationSelect(location);
        setTitleModal(`Editar: ${location.name}`);
    }

    const addlocation = () => {
        setOpen(true);
        setTitleModal('Adicionar  Endereço');
        setLocationSelect({
            id: 0,
            name: '',
            zipCode: '',
            street: '',
            number: '',
            neighborhood: '',
            city: '',
            state: '',
            companyId: companyIdNumber,
        });
    }


    const handleDelete = (location: Location) => {
        setLocationDelete(location);
        setOpenConfirm(true);
    };

    const confirmDelete = async () => {
        if (locationToDelete) {
            await api.delete(`location/delete/${locationToDelete.id}`)
            dispatch(deleteLocation(locationToDelete.id));
        }
        setOpenConfirm(false);
    };


    const handleConfirm = async (location: Location) => {

        if (locationSelect && locationsData.some(c => c.id === location.id)) {

            console.log('empresa vindo pra editar', location)

            await api.put(`location/update/${location.id}`, {
                name: location.name,
                zipCode: location.zipCode,
                street: location.street,
                number: location.number,
                district: location.neighborhood,
                city: location.city,
                state: location.state,
                companyId: companyIdNumber,
            })

            dispatch(updateLocation(location))
            showSnackbar('Endereço editado com sucesso!');

        } else {
            const newLocaation = await api.post("location/create", {
                name: location.name,
                zipCode: location.zipCode,
                street: location.street,
                number: location.number,
                district: location.neighborhood,
                city: location.city,
                state: location.state,
                companyId: companyIdNumber,
            })
            dispatch(addLocation({
                id: newLocaation.data.id,
                name: newLocaation.data.name,
                zipCode: newLocaation.data.zipCode,
                street: newLocaation.data.street,
                number: newLocaation.data.number,
                neighborhood: newLocaation.data.district,
                city: newLocaation.data.city,
                state: newLocaation.data.state,
                companyId: companyIdNumber,
            }))
            showSnackbar('Endereço adicionado com sucesso !')    

        }

        setOpen(false);
    };


    return (
        <Container>
            <Header />
            <ReturnButtonContent>
                <WestIcon fontWeight={200} cursor={'pointer'} sx={{ marginTop: '1%' }} />
                <p
                    onClick={() => navigate(`/MyCompanies`)}
                    style={{
                        fontSize: '20px',
                        cursor: 'pointer',
                        marginTop: '0%'
                    }}>
                    minhas empresas
                </p>
            </ReturnButtonContent>

            {locationsData.length === 0 ? (
                <MessegeContainer>
                    <MessegeContent>Nenhuma endereço </MessegeContent>
                    <MessegeContent>cadastrado!</MessegeContent>
                    <Button
                        onClick={() => addlocation()}
                        sx={{ width: '23%' }}
                        label="Adicionar Local"
                    />
                    <ModalLocation
                        open={open}
                        title={titleModal}
                        location={locationSelect}
                        onClose={handleClose}
                        onConfirm={handleConfirm}
                        cancelText="Não"
                        confirmText="confirmar" message={''} />
                </MessegeContainer>
            ) : (
                <Container>
                    <ButtonContainer>
                        <Button
                            color="primary"
                            label='Adicionar Local'
                            sx={{
                                width: '15%',
                                marginRight: '2%',
                            }}
                            onClick={() => addlocation()}
                        />
                    </ButtonContainer >
                    <Paper sx={{
                        width: '95%',
                        marginLeft: '3%',
                        marginTop: '1%',
                        marginBottom: '5%',
                        overflow: 'hidden',
                        borber: '10px solid red',
                        padding: '7px',
                    }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Endereço</strong></TableCell>
                                        <TableCell align="center"><strong>Ações</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {locationsData?.length > 0 && locationsData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((location) => (
                                            <TableRow key={location.id}>
                                                <TableCell>{location.street}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton color="inherit" aria-label="edit"
                                                        onClick={() => editLocation(location)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton color="error" aria-label="delete">
                                                        <DeleteIcon onClick={() => handleDelete(location)} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            component="div"
                            count={locationsData.length}
                            ActionsComponent={TablePaginationActions}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            labelRowsPerPage="Qt por página:"
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[10, 15, 20]}
                        />
                        <ModalLocation
                            open={open}
                            title={titleModal}
                            location={locationSelect}
                            onClose={handleClose}
                            onConfirm={handleConfirm}
                            cancelText="Não"
                            confirmText="confirmar" message={''} />
                        <ConfirmDialog
                            open={openConfirm}
                            title={`Excluir: ${locationToDelete?.name}`}
                            message="Tem certeza que deseja excluir esta empresa? Essa ação não poderá ser desfeita."
                            onClose={() => setOpenConfirm(false)}
                            onConfirm={confirmDelete}
                        />

                        <Snackbar open={openSnackBar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                            <Alert
                                onClose={handleCloseSnackbar}
                                severity="success"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                {messege}
                            </Alert>
                        </Snackbar>
                    </Paper>
                </Container>

            )}
        </Container>
    );
}

export default LocationsPage;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  height:100dvh;    
  width: 100%; 
  background-color:#F5F5F5 ;
`;

const MessegeContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center; 
align-items: center; 
height:100dvh; 
width: 100%;  
font-weight: 700;   
font-size: 30px;
`;

const ButtonContainer = styled.div`
display: flex;
justify-content: end;
margin-top: 4%;
width: 100%;  

`;


const MessegeContent = styled.h1`
font-family: 'Poppins';

`;

const ReturnButtonContent = styled.div`
width: 17%;   
mouser: pointer;
margin-top: 2%;
margin-left:1%;
font-family: 'Poppins';
font-weight: 500;
color:#4D4D4D;
display:flex;
gap: 1%;

`;


function TablePaginationActions(props: any) {
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5, mt: '2%' }}>
            <Button
                onClick={handleBackButtonClick}
                disabled={page === 0}
                variant="contained"
                label='anteior'
                sx={{
                    backgroundColor: '#E0E0E0',
                    color: '#000',
                    fontSize: '12px',
                    width: '10%',
                    height: '10%',
                    '&:hover': {
                        backgroundColor: '#1976d2',
                        color: '#fff',
                    },
                    marginRight: 1,
                }}
            >
                Anterior
            </Button>
            <Button
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                variant="contained"
                sx={{
                    backgroundColor: '#E0E0E0',
                    color: '#000',
                    fontSize: '12px',
                    width: '10%',
                    height: '10%',
                    '&:hover': {
                        backgroundColor: '#1976d2',
                        color: '#fff',
                    },
                }} label={'proximo'}  >
                Próximo
            </Button>
        </Box>
    );
}

