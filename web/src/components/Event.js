import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import AJAXForm from './AJAXForm.js';
import { api_location, req_settings } from '../config.json';


const EventWrapper = styled.li`
    width: 80%;
    height: 15vmin;
    background-color: var(--clear-blue);
    margin-bottom: 1%;
    padding: 0.3%;

    border: solid var(--blue) 2px;

    display: flex;
    flex-direction: row;

    @media (max-width: 850px){
        width: 90%;
        height: 60vmin;
    }
`;

const EventLeft = styled.div`
    width: 75%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3{
        width: 100%;
        height: 75%;

        margin: 0;
        padding: 0;

    }

    p{
        width: 100%;
        height: 25%;

        margin: 0;
        padding: 0;
    }

    .danger{
        color: var(--red);
    }

    form{
        width: 100%;
        height: 80%;
        
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: 50% 50%;
    }

    form div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .form-grouper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

    }

    .form-group {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .form-group input, .form-group label{
        width: 90%;
    }


    form textarea {
        width: 80%;
        padding: 0;
        resize: none;
    }

    form input {
        width: 25%;
    }

    form label{
        width: 80%;
        font-size: 80%;
        text-align: left;
    }

    #description {
        height: 60%;
    }


`;

const EventRight = styled.div`
    width: 25%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    button {
        border: none;
        width: 80%;
        height: 30%;
        color: var(--white);

        border-radius: 5px;
        transition: .4s;
    }

    button:hover, button:focus {
        width: 90%;
        height: 40%;
        cursor: pointer;
        font-size: 110%;
    }

    @media (max-width: 850px){
        button{
            font-size: 85%;
        }
    }


`;

const UpdateButton = styled.button`
    background-color: var(--blue);
`;

const DeleteButton = styled.button`
    background-color: var(--red);
`;

const ConfirmButton = styled.button`
    background-color: var(--green);
`;


function Event(props){
    const params = useParams();
    const day = params.d;
    const month = params.m;
    const year = params.y;

    const [mode,setMode] = useState("show");

    const toggleShowMode = () => {
        setMode("show");
    }

    const toggleDeleteMode = () => {
        setMode("delete");
    }

    const toggleEditMode = () => {
        setMode("edit");
    }

    const deleteEvent = async () => {
        const url = `${api_location}/events`;
        const reqSettings = {...req_settings,
                             method: "DELETE",
                             body: JSON.stringify({id: props.id})}
        const res = await fetch(url,reqSettings);
        const resJSON = await res.json();

        if(resJSON.deleted){
            setMode("deleted");
        }
        else{
            alert("Algo deu errado. Tente novamente mais tarde.");
        }
    }

    const editCallback = async(res) => {
        const resJSON = await res.json();
        if(!resJSON.err){
            toggleShowMode();
        }
        props.editCallback(resJSON);
    }

    let leftSection, rightSection;
    if(mode === "show"){
        leftSection = (
            <EventLeft>
                <h3>{props.desc}</h3>
                <p>Das <b>{props.start}</b> às <b>{props.end}</b></p>
            </EventLeft>
        );
        rightSection = (
            <EventRight>
                <UpdateButton onClick={toggleEditMode}>Editar</UpdateButton>
                <DeleteButton onClick={toggleDeleteMode}>Excluir</DeleteButton>
            </EventRight>
        );
    }
    else if (mode === "delete"){
        leftSection = (
            <EventLeft >
                <h3 className="danger">Você tem certeza?</h3>
                <p className="danger">Essa ação não pode ser desfeita.</p>
            </EventLeft>
        );
        rightSection = (
            <EventRight>
                <DeleteButton onClick={deleteEvent}>Excluir</DeleteButton>
                <UpdateButton onClick={toggleShowMode}>Cancelar</UpdateButton>
            </EventRight>
        );

    }
    else if (mode === "edit"){
        const formId = "EventEditForm"+props.id;
        leftSection = (
            <EventLeft>
                <h3>Editar Evento</h3>
                <AJAXForm id={formId} callback={editCallback} method="PUT" action={`${api_location}/events`} >
                    <div>
                        <label form={formId} htmlFor="description">Descrição</label>
                        <textarea id="description" name="description" type="textarea" placeholder="Dar banho no cachorro, aniversário da Lili, etc." defaultValue={props.desc} required></textarea>
                    </div>
                    <div className="form-grouper">
                        <div className="form-group">
                            <label form={formId} htmlFor="start">Início</label>
                            <input id="start" name="start" type="time" defaultValue={props.start} required/>
                        </div>
                        <div className="form-group">
                            <label form={formId} htmlFor="end">Fim</label>
                            <input id="end" name="end" type="time" defaultValue={props.end} required/>
                        </div>
                    </div>
                    <input type="hidden" id="day" name="day" value={day}/>
                    <input type="hidden" id="month" name="month" value={month}/>
                    <input type="hidden" id="year" name="year" value={year}/>
                    <input type="hidden" id="id" name="id" value={props.id}/>
                </AJAXForm>
            </EventLeft>
        );
        rightSection = (
            <EventRight>
                <UpdateButton onClick={toggleShowMode}>Cancelar</UpdateButton>
                <ConfirmButton type="submit" form={formId}>Atualizar</ConfirmButton>
            </EventRight>
        );


    }

    if (mode !== "deleted"){
        return(
            <EventWrapper>
                {leftSection}
                {rightSection}
            </EventWrapper>
        )
    }
    else return (<noscript/>);
}

export default Event;