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
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/userSlice';
import { AppDispatch } from '../../../store/store';
import { useState } from 'react';
import api from '../../../api/api';

import { setCompanies } from '../../../store/companySlice';

const LoginPage = () => {


    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async () => {
        try {



            const res = await api.post('/auth/login', { email: Email, password: password });
            const token = res.data.acess_token;
            localStorage.setItem('token', token);


            const userRes = await api.get(`/user/${Email}`,);


            if (!userRes) {
                throw new Error('usuario nao encontrado');
            }

            const { id, name, email } = userRes.data;

            dispatch(login({ id, name, email }));

            const companies = await api.get(`/company/${id}`);



            dispatch(setCompanies(companies.data));

            navigate('/Mycompanies');
        } catch (error) {
            console.error('Erro no login:', error);
            alert('Login inválido:');
        }

    };


    const redrectToRegister = () => {
        navigate('/register');
    }


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
                        id="email"
                        label="Email"
                        type="email"
                        value={Email}
                        placeholder='digite seu email'
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginBottom: '5%' }}
                    />
                    <Input
                        id="senha"
                        label="Senha"
                        type="password"
                        placeholder='digite sua senha'
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginBottom: '5%' }}

                    />
                    <Button
                        color="primary"
                        label='Logar'
                        sx={{
                            width: '100%',
                            marginBottom: '5%'
                        }}
                        onClick={handleLogin}
                    />
                    <Button
                        color="secondary"
                        label='criar contar'
                        sx={{
                            width: '100%',
                            color: '#fff'
                        }}
                        onClick={redrectToRegister}
                    />
                </FormContent>
            </FormContainer>
        </Container>
    );
};

export default LoginPage;



