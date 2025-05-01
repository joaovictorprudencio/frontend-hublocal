import Logo from '../../../assets/logo.png';
import AuthBanner from '../../../assets/AuthBanner.png';
import { Container } from '../styles/auth.styles';
import { FormContainer } from '../styles/auth.styles';
import { LogoImage } from '../styles/auth.styles';
import { BannerContainer } from '../styles/auth.styles';
import { BannerImage } from '../styles/auth.styles';
import { BannerContent } from '../styles/auth.styles';
import { BannerTitle } from '../styles/auth.styles';
import { BannerText } from '../styles/auth.styles';
import { FormContent } from '../styles/auth.styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const ResgisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [messege, setMessage] = useState('');
    const navigate = useNavigate();

    const handlerUserCreate = async () => {

        if (password !== confirmPassword) {
            alert('senhas diferentes')
            return;
        }

        const user = await api.post('user/register', {
            email: email,
            password: password,
            name: name
        })

      

        if (!user) {

            alert('senhas diferentes')
            return;
        }

        showSnackbar('Cadastro feito com sucesso!');


}





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
    



    return (
        <Container>
            <BannerContainer>
                <BannerImage src={AuthBanner} alt="Banner" />
                <BannerContent>
                    <BannerTitle>
                        Junte-se a vários <br /> clientes satisfeitos
                    </BannerTitle>
                    <BannerText>
                        Cliente HubLocal ganha mais relevância, autoridade e <br />
                        visibilidade. Mais de 7.000 marcas confiam na nossa <br />
                        plataforma. Seja uma delas!
                    </BannerText>
                </BannerContent>
            </BannerContainer>
            <FormContainer>
                <LogoImage src={Logo} alt="logo" />
                <FormContent>
                    <Input
                        id="name"
                        label="Nome"
                        type="name"
                        value={name}
                        placeholder='digite seu nome'
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: '5%' }}
                    />
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        placeholder='digite seu email'
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginBottom: '5%' }}
                    />
                    <Input
                        id="password"
                        label="Senha"
                        type="password"
                        placeholder='digite sua senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginBottom: '5%' }}
                    />
                    <Input
                        id="repeat"
                        label="Repetir senha"
                        type="password"
                        value={confirmPassword}
                        placeholder='digite sua senha novamente'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ marginBottom: '5%' }}
                    />
                    <Button
                        color="primary"
                        label='registrar'
                        sx={{
                            width: '100%',
                            marginBottom: '5%'
                        }}
                        onClick={handlerUserCreate}
                    />
                    <Button
                        color="secondary"
                        label='login'
                        sx={{
                            width: '100%',
                            color: '#fff'
                        }}

                        onClick={() => navigate('/login')}
                    />
                </FormContent>
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
            </FormContainer>
        </Container>
    );
};

export default ResgisterPage;

