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
import { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import ModalCompanie from '../components/ModalCompanie';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Company } from '../../../types/company'
import { addCompany, deleteCompany, setCompanies, updateCompany } from '../../../store/companySlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import ConfirmDialog from '../../../components/ModalDelete';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';




const CompaniesPage = () => {


    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const userId = useSelector((state: RootState) => state.user.id);
    const companiesData = useSelector((state: RootState) => state.company.companies);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);
    const [open, setOpen] = useState(false);
    const [titleModal, setTitleModal] = useState('Adicionar empresa');
    const [companySelect, setCompanySelecionada] = useState<Company>({
        id: 0,
        name: '',
        website: '',
        cnpj: '',
        userId: userId!,
        locations: [],
    });


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`company/${userId}`);
                dispatch(setCompanies(response.data))
            } catch (error) {
                console.error('Erro ao buscar locations:', error);
            }



        }

        getData();
    }, [userId, dispatch])



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

    const editCompanie = (company: Company) => {
        setOpen(true);
        setCompanySelecionada(company);
        setTitleModal(`Editar: ${company.name}`);
    }

    const addCompanie = (): void => {
        setOpen(true);
        setTitleModal('Adicionar  empresa');
        setCompanySelecionada({
            id: 0,
            name: '',
            locations: [],
            website: '',
            cnpj: '',
            userId: userId!,
        });
    }


    const handleDelete = async (company: Company) => {
        setCompanyToDelete(company);

        setOpenConfirm(true);
    };

    const confirmDelete = async () => {
        if (companyToDelete) {
            dispatch(deleteCompany(companyToDelete.id));
            await api.delete(`/company/delete/${companyToDelete.id}`);
        }
        setOpenConfirm(false);
    };


    const handleConfirm = async (company: Company) => {
        try {

            if (companySelect && companiesData.some(c => c.id === company.id)) {

                await api.put(`/company/update/${company.id}`, {
                    name: company.name,
                    website: company.website,
                    cnpj: company.cnpj,
                    userId: userId
                });
                dispatch(updateCompany(company));
                showSnackbar('Empresa editada com sucesso!');
            } else {

                const response = await api.post('/company/create', {
                    name: company.name,
                    website: company.website,
                    cnpj: company.cnpj,
                    userId: userId
                });

                const newCompany = response.data.createCompany;

                console.log('data:', response.data.createCompany)
                dispatch(addCompany({
                    id: newCompany.id,
                    name: newCompany.name,
                    website: newCompany.website,
                    cnpj: newCompany.cnpj,
                    userId: newCompany.userId,
                    locations: []
                }));
                setOpenSnackBar(true)
                showSnackbar('empresa adicionada com sucesso !')    
            }

            setOpen(false);
        } catch (error) {
            console.error('Erro ao salvar empresa:', error);
            alert('Erro ao salvar empresa. Tente novamente.');
        }
    };


    const redirectToLocationPage = (company: Company) => {
        navigate(`/company/${company.id}/locations`)
    }


    return (
        <Container>
            <Header />

            {companiesData && companiesData.length === 0 ? (
                <MessegeContainer>
                    <MessegeContent>Nenhuma empresa</MessegeContent>
                    <MessegeContent>cadastrada!</MessegeContent>
                    <Button
                        onClick={addCompanie}
                        sx={{ width: '23%' }}
                        label="Cadastrar"
                    />
                     <ModalCompanie
                            open={open}
                            title={titleModal}
                            company={companySelect}
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
                            label='Adicionar Empresa'
                            sx={{
                                width: '15%',
                                marginRight: '2%',
                            }}
                            onClick={addCompanie}
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
                                        <TableCell><strong>Empresa</strong></TableCell>
                                        <TableCell><strong>Qt de locais</strong></TableCell>
                                        <TableCell align="center"><strong>Ações</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {companiesData?.length > 0 &&
                                        companiesData
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((company) => (
                                                <TableRow key={company.id}>
                                                    <TableCell>{company.name}</TableCell>
                                                    <TableCell>{company.locations?.length || 0}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton color="inherit" aria-label="edit"
                                                            onClick={() => editCompanie(company)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton color="inherit" aria-label="location"
                                                            onClick={() => redirectToLocationPage(company)}>
                                                            <LocationPinIcon />
                                                        </IconButton>
                                                        <IconButton color="error" aria-label="delete">
                                                            <DeleteIcon onClick={() => handleDelete(company)} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            component="div"
                            count={companiesData?.length}
                            ActionsComponent={TablePaginationActions}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            labelRowsPerPage="Qt por página:"
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[10, 15, 20]}
                        />
                        <ModalCompanie
                            open={open}
                            title={titleModal}
                            company={companySelect}
                            onClose={handleClose}
                            onConfirm={handleConfirm}
                            cancelText="Não"
                            confirmText="confirmar" message={''} />
                        <ConfirmDialog
                            open={openConfirm}
                            title={`Excluir: ${companyToDelete?.name}`}
                            message={`Tem certeza que deseja excluir a empresa ${companyToDelete?.name} será excluída. tem certeza dessa ação?` }
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

export default CompaniesPage;


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


function TablePaginationActions(props: any) {
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
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

