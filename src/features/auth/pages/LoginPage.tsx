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


const LoginPage = () => {

    const navigate = useNavigate();


    const [email, setEmail] = useState('');


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
                    placeholder='digite seu email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    id="senha"
                    label="Senha"
                    type="password"
                    placeholder='digite sua senha'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    color="primary"
                    label='Logar'
                    sx={{
                         width: '100%',
                         marginBottom: '5%'
                     }}
                    onClick={() => alert(`seu email é ${email}`)}
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





