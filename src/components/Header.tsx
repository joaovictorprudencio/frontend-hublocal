import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import styled from 'styled-components';
import avatarImage from '.././assets/avatar_imagem.png';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ButtonAppBar() {
    const name = "Janiu"
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"
                sx={{
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    paddingRight: 0,
                }}>
                <Toolbar>
                    <Typography variant="h5"
                        component="div"
                        sx={{
                            flexGrow: 2,
                            fontFamily: 'Poppins',
                            fontWeight: 700,
                        }}>
                        <BusinessIcon sx={{ mr: 1 }} />
                        Minhas Empresas
                    </Typography>
                    <AvatarContent>
                        <Avatar alt="Remy Sharp" src={avatarImage} sx={{ ml: 1 }} />
                        <UserName>
                            {name}
                        </UserName>
                        <ExpandMoreOutlinedIcon />
                    </AvatarContent>
                </Toolbar>
            </AppBar>
        </Box>
    );
}


const AvatarContent = styled.div`
 width: 180px;
 height: 64px;
 background-color:#EAEAEA;
 display:flex;
 align-items: center;
`;

const UserName = styled.div`
    font-family: Poppins;
    font-weight: 600;
    margin-left: 8%;
    margin-right: 20%;
`;