import React from 'react';
import styled from 'styled-components'
import { useParams } from "react-router-dom";
import AJAXForm from './AJAXForm.js';
import { api_location } from '../config.json';


const NewEventWrapper = styled.li`
    width: 80%;
    height: 30%;
    background-color: var(--clear-blue);
    margin-bottom: 1%;
    padding: 0.3%;

    border: solid var(--blue) 2px;

    display: flex;
    flex-direction: column;

    h3{
        width: 100%;
        height: 20%;

        margin: 0;
        padding: 0;
    }

    form{
        width: 100%;
        height: 80%;
        

        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: repeat(2,calc(75%/2)) 25%;
    }

    form div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }


    form input, form textarea {
        width: 80%;
        padding: 0;
        resize: none;
    }

    form input:first-of-type {
        margin-bottom: 2%;
    }

    form label{
        width: 80%;
        text-align: left;
    }

    #description {
        height: 60%;
    }

    form button {
        border: none;
        width: 80%;
        height: 30%;
        color: var(--white);

        border-radius: 5px;
        transition: .4s;
    }

    form button:hover, button:focus {
        width: 90%;
        height: 40%;
        cursor: pointer;
        font-size: 110%;
    }


`;


const InsertButton = styled.button`
    background-color: var(--green);
`;

function NewEvent(props){
    const params = useParams();
    const day = params.d;
    const month = params.m;
    const year = params.y;


    return(
        <NewEventWrapper>

            <h3>Novo evento</h3>
            <AJAXForm id="newEventForm" method="POST" callback={props.callback} action={`${api_location}/events`} >
                <div>
                    <label form="newEventForm" htmlFor="description">Descrição</label>
                    <textarea id="description" name="description" type="textarea" placeholder="Dar banho no cachorro, aniversário da Lili, etc." required/>
                </div>
                <div>
                    <label form="newEventForm" htmlFor="start">Início</label>
                    <input id="start" name="start" type="time" required/>
                    <label form="newEventForm" htmlFor="end">Fim</label>
                    <input id="end" name="end" type="time" required/>
                </div>
                <div>
                    <InsertButton type="submit">Inserir</InsertButton>
                </div>
                <input type="hidden" id="day" name="day" value={day}/>
                <input type="hidden" id="month" name="month" value={month}/>
                <input type="hidden" id="year" name="year" value={year}/>
            </AJAXForm>

        </NewEventWrapper>

    )
}

export default NewEvent;