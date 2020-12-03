import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { api_location, req_settings } from '../config.json';


const StyledNav = styled.nav`
    width: 100%;
    height: 10%;

    display: flex;
    flex-direction: row;
    align-items: center;
    
    background-color: var(--clear-blue);

    border-bottom: solid 2px var(--blue);
`;

const NavRight = styled.div`
    width: 50%;
    height: 100%;

    @media (max-width: 850px){
        &{
            display: none;
        }
    }
`

const NavLeft = styled.div`
    width: 47%;
    padding-right: 3%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    @media (max-width: 850px){
        &{
            width: 100%;
            justify-content: center;
            font-size: 80%;
        }
    }
`;

const Divider = styled.span`
    margin-left: 2%;
    margin-right: 2%;
`;

const LogoutAnchor = styled.a`
    &{
        transition: .4s;
    }

    &:hover {
        cursor: pointer;
        font-size: 120%;
    }
`;


 
function AppNav(){
    const [user, setUser] = useState('Usuário');

    const fetchUser = async () => {
        const res = await fetch(`${api_location}/session`,req_settings);
        const resJSON = await res.json();
        console.log(resJSON);
        setUser(resJSON.email);
    }

    useEffect(() => {
        fetchUser();
    },[]);

    const logout = ()=>{
        document.cookie = `jwt = ; expires =Thu, 01 Jan 1970 00:00:00 GMT`;
        window.location.href = "/login";
    }

    return(
        <StyledNav>
            <NavRight></NavRight>
            <NavLeft>
                <span>Logado como <b>{user}</b></span>
                <Divider> | </Divider>
                <LogoutAnchor onClick={logout}>Sair</LogoutAnchor>
            </NavLeft>
        </StyledNav>
    )
}

//<img src={process.env.PUBLIC_URL + "/logout.svg"}>
export default AppNav;