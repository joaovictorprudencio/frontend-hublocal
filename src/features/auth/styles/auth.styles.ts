import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;  
  min-height: 50vh;      
  width: 100%;     
`;

export const FormContainer = styled.form`
 width:100%;
 height:100dvh; 
 font-family: Poppins;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;   
`;


export const BannerContainer = styled.div`
 width: 100%;
 height: 100dvh;
 background-color:#0485FF;
 display: flex;
 flex-direction: column;
`;


export const LogoImage = styled.img`
  width: 276px;
  margin-top:17%;
`;

export const BannerImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
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
  align-items: center;
  flex-direction: column;
  height: calc(100dvh - 120px);
  background-color:#00CC99;
  color:#FFFFFF;
  font-family: Poppins;
`;

export const BannerTitle = styled.h1`
    text-align:center;
    align-content: center;
    padding-top: 20px;
    white-space: pre-wrap;
    width: 50%;
    line-height: 1.12;
    font-size: 32px;
    font-weight: 700;
`;


export const BannerText = styled.h2`
text-align:center;
padding-top: 16px;
font-size: 16px;
font-weight:400;
`;