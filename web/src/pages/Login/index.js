import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import AJAXForm from '../../components/AJAXForm';
import { api_location } from '../../config.json';


const Box = styled.div`
    &{
        width: 30vmax;
        height: 70%;

        display: flex;
        flex-direction: column;
        align-items: center;
        
        background-color: var(--clear-blue);
        
        border-radius: 5%;
        overflow: hidden;
    }

    @media (max-width: 850px){
        &{
            width: 80%;
            height: 80%;
        }
    }
`;

const BoxHeader = styled.header`
    &{
        width: 100%;
        height: 15%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        overflow: hidden;

        background-color: var(--blue);
        color: var(--white);
    }
`;

const FormWrapper = styled.div`
    &{
        height: 60%;
        width: 100%;

        padding-top: 5%;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    

    form{
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    form > input {
        width: 80%;
        height: 15%;

        padding: 5%;

        border: none;
        border-radius: 10px;

        margin-bottom: 8%;

        transition: .4s;
    }

    form > input:last-of-type {
        margin-bottom: 4%;
    }

    form > input:focus {
        outline: none;
        border: 2px solid var(--dark-blue);
        border-radius: 10px;

        width: 85%;
        height: 20%;

    }

    form > label {
        width: 80%;
        margin-bottom: 2%;
    }

    form > button {
        width: 60%;
        height: 15%;

        font-size: 100%;
        font-weight: bold;

        background-color: var(--blue);
        color: var(--white);

        border: none;
        border-radius: 10px;

        transition: .4s;
    }

    form > span {
        width: 80%;
        height: 6%;

        margin-bottom: 4%;
        text-align: center;

        font-size: 90%;
        font-weight: lighter;
        color: red;
    }

    form > button:focus, form >button:hover {
        width: 70%;
        height: 20%;

        font-size: 120%;

        outline: none;
        border-radius: 10px;

    }

    form > button:focus{
        border: 5px solid var(--dark-blue);
    }

    @media (max-width: 850px){
        form > input {
            padding: 2%;
            margin-bottom: 4%;
        }

        form > input:last-of-type {
            margin-bottom: 4%;
        }

    }
`;

const BoxFooter = styled.footer`
    &{
        width: 100%;
        height: 20%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
`;

const StyledLink = styled(Link)`
    &{
        transition: .4s;
    }
    &:hover {
        font-size: 120%;
    }
`;



function LoginPage(){
    const [loginError, setLoginError] = useState("");

    const submitCallback = async (res) => {
        const resJSON = await res.json();
        if (resJSON.loggedIn){
            setLoginError("");
            let inTwoHours = new Date();
            inTwoHours.setTime(inTwoHours.getTime + 1000 * 60 * 60 * 2);
            document.cookie = `jwt=${resJSON.token}; expires=${inTwoHours.toUTCString}`;
            window.location.href = "/calendario";
        }
        else{
            setLoginError(resJSON.err);
        }    
    }

    return (
        <Box>
            <BoxHeader>
                <h2>Login</h2>
            </BoxHeader>
            <FormWrapper>
                <AJAXForm id="loginForm" method="POST" action={`${api_location}/session`} callback={submitCallback}>
                    <label form="loginForm" htmlFor="email">E-mail</label>
                    <input id="email" name="email" type="text" required/>
                    <label form="loginForm" htmlFor="password">Senha</label>
                    <input id="password" name="password" type="password" required/>
                    <span>{loginError}</span>
                    <button type="submit">Fazer login</button>
                </AJAXForm>
            </FormWrapper>
            <BoxFooter>
                <p>
                    Não tem uma conta? <StyledLink to="/cadastro">Cadastre-se agora!</StyledLink>
                </p>
            </BoxFooter>

        </Box>
    )
}

export default LoginPage;