import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { api_location, req_settings } from '../config.json';
import { useParams, Link } from 'react-router-dom';

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
    width: 47%;
    padding-left: 3%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

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

    .returnLink{
        display: none;
    }

    @media (max-width: 850px){
        &{
            width: 100%;
            justify-content: center;
            font-size: 80%;
        }

        .returnLink {
            display: inherit;
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

const StyledLink = styled(Link)`
    &{
        transition: .4s;
        text-decoration: none;
    }

    &:hover {
        cursor: pointer;
        font-size: 120%;
    }
`;



 
function AppNav(){
    const params = useParams();
    const month = params.m;
    const year = params.y;
    const isOnDayPage = params.d;

    const returnURL = `/calendario/${month}/${year}`;

    const [user, setUser] = useState('Usuário');

    const fetchUser = async () => {
        const res = await fetch(`${api_location}/session`,req_settings);
        const resJSON = await res.json();
        setUser(resJSON.email);
    }

    useEffect(() => {
        fetchUser();
    },[]);

    const logout = ()=>{
        document.cookie = `jwt = ;path=/; expires =Thu, 01 Jan 1970 00:00:00 GMT`;
        window.location.href = "/login";
    }

    return(
        <StyledNav>
            <NavRight>
                {(isOnDayPage) ? <StyledLink className="returnLink" to={returnURL}>Voltar para o calendário</StyledLink> : ""} 
            </NavRight>
            <NavLeft>
                
                {(isOnDayPage) ? (<StyledLink className="returnLink" to={returnURL}>Voltar</StyledLink>) : ""}
                {(isOnDayPage) ? (<Divider className="returnLink"> | </Divider>) : ""}
                <span>Logado como <b>{user}</b></span>
                <Divider> | </Divider>
                <LogoutAnchor onClick={logout}>Sair</LogoutAnchor>
            </NavLeft>
        </StyledNav>
    )
}

//<img src={process.env.PUBLIC_URL + "/logout.svg"}>
export default AppNav;