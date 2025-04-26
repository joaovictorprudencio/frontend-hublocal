import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;  
 /* align-items:center; */
  min-height: 50vh;      
  width: 100%;             
`;

export const FormContainer = styled.div`
 width:100%;
 height:100%; 
 font-family: Poppins;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;   
`;


export const BannerContainer = styled.div`
 width: 100%;
 overflow: hidden;
 background-color:#0485FF;
`;


export const LogoImage = styled.img`
  width: 276px;
  margin-top:17%;
  margin-bottom: 10%;
`;

export const BannerImage = styled.img`
  margin-top:30px;
  width:775px;
  height:490px;
  object-fit: cover;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;


export const FormContent = styled.div`
 margin-bottom:20%;
 width:55%;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center; 
`;


export const BannerContent = styled.div`
 display: flex;
  flex-direction: column;
  margin-top: auto;
 height:300px;
 background-color:#00CC99;
 color:#FFFFFF;
 font-family: Poppins;
`;

export const BannerTitle = styled.h1`
    text-align:center;
    padding-top: 20px;
    font-size:35px;
    font-weight:700;
`;


export const BannerText = styled.h2`
text-align:center;
padding-top: 40px;
font-size: 16px;
font-weight:400;
`;