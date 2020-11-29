import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

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
            margin-bottom: 8%;
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



function LoginForm(){
    return (
        <Box>
            <BoxHeader>
                <h2>Login</h2>
            </BoxHeader>
            <FormWrapper>
                <form id="loginForm">
                    <label form="loginForm" htmlFor="email">E-mail</label>
                    <input id="email" name="email" type="text"/>
                    <label form="loginForm" htmlFor="password">Senha</label>
                    <input id="password" name="password" type="password"/>
                    <button type="button">Fazer login</button>
                </form>
            </FormWrapper>
            <BoxFooter>
                <p>
                    Não tem uma conta? <StyledLink to="/cadastro">Cadastre-se agora!</StyledLink>
                </p>
            </BoxFooter>

        </Box>
    )
}

export default LoginForm;