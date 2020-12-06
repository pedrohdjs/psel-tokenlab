import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppNav from "../components/AppNav.js";
import Event from "../components/Event.js";
import NewEvent from "../components/NewEvent.js";

import styled from 'styled-components';
import { api_location, req_settings } from '../config.json';

const Viewport = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
`

const ContentContainer = styled.div`
    width: 100%;
    height: 90%;
    padding: 1% 2% 0% 2%;

    h2{
        margin: 0;
        padding: 0;
        height: 10%;
        width: 100%;
    }

    @media (max-width: 850px){
        h2{
            text-align: center;
        }
    }
`;

const EventList = styled.ul`
    margin: 0;
    padding: 0;
    height: 90%;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    list-style-type: none;

    overflow-y: auto;
`

function DayPage(){
    const params = useParams();
    const day = params.d;
    const month = params.m;
    const year = params.y;

    let [eventsListContent, setEventsListContent]  = useState(<h3>Carregando...</h3>)

    const newEventCallback = async (res) => {
        const resJSON = await res.json();
        if(!resJSON.err){
            loadEvents();
        }
        else{
            alert("Algo deu errado. Tente novamente mais tarde.");
        }
    }

    const editEventCallback = (res) => {
        if(!res.err){
            loadEvents();
        }
        else{
            alert("Algo deu errado. Tente novamente mais tarde.");
        }
    }


    const loadEvents = async () => {
        const res = await fetch(`${api_location}/events?day=${day}&month=${month}&year=${year}`,req_settings);
        const resJSON = await res.json();
        const events = resJSON.events;
        events.sort((a,b) => a.start.localeCompare(b.start))
        const newEventsListContent = [];
        events.forEach(el => {
            newEventsListContent.push(<Event key={el.id} editCallback={editEventCallback} desc={el.description} start={el.start} end={el.end} id={el.id}/>);
        });
        newEventsListContent.push(<NewEvent callback={newEventCallback} key={0}/>);
        setEventsListContent(newEventsListContent);
    }

    useEffect(() => {
        loadEvents();
    },[]);



    return(
        <Viewport>
            <AppNav/>
            <ContentContainer>
                <h2>Agenda do dia {day}/{month}/{year}</h2>
                <EventList>
                    {eventsListContent}
                </EventList>
            </ContentContainer>
        </Viewport>
    ) 
}

export default DayPage;