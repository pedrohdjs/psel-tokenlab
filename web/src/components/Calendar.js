import React, { useEffect, useState } from 'react';
import { nextMonth, previousMonth, daysInMonth, firstWeekdayInMonth }  from '../modules/DateUtil.js';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DayPreview from './DayPreview.js';
import { api_location, req_settings } from '../config.json';


const Container = styled.div`
    &{
        width: 100%;
        height: 100%;
    }
`;

const Header = styled.header`
    &{
        width: 100%;
        height: 9%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    &  li:nth-of-type(-n+7){
        background-color: red;
    }

    & h2 {
        font-size: 200%;
    }
`;

const Button = styled(Link)`
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    transition: .4s;

    text-decoration: none;

    color: var(--grey);
    font-size: 200%;

    &:hover{
        cursor: pointer;
        font-size: 250%;
    }

`

const Body = styled.ul`
    &{
        list-style: none;
        padding: 0;
        margin: 0;

        width: 100%;
        height: 90%;

        display: grid;
        grid-template-columns: repeat(7,calc(100%/7));
        grid-template-rows: 5% repeat(6,calc(95%/6));
        grid-column-gap: 0;
        grid-row-gap: 0;

    }

    & li {
        border: solid var(--blue) 2px;
    }

    & li:nth-of-type(-n+7){
        color: var(--white);
        background-color: var(--clear-grey);
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    & li:nth-of-type(-n+42){
        border-bottom: solid var(--blue) 1px;
    }

    & li:nth-of-type(n+8){
        border-top: solid var(--blue) 1px;
    }

    & li:not(:nth-of-type(7n+1)){
        border-left: solid var(--blue) 1px;
    }

    & li:not(:nth-of-type(7n)){
        border-right: solid var(--blue) 1px;
    }

`;


function Calendar(props){
    
    const month = Number(props.month);
    const year = Number(props.year);

    const [events,setEvents] = useState(() => {
        const arr = [];
        for(let i = 1; i<=31;i++){
            arr[i] = [];
        }
        return arr;
    })

    const fetchEvents = async () => {
        const url = `${api_location}/events?month=${month+1}&year=${year}`;
        const reqConfig = {...req_settings, method: "GET"};
        const res = await fetch(url,reqConfig);
        const resJSON = await res.json();
        const newEvents = [];
        for(let i = 1; i<=31;i++){
            newEvents[i] = [];
        }
        Object.keys(resJSON.events).forEach((key) => {
            const currentEvent = resJSON.events[key];
            const day = Number((currentEvent.date));
            newEvents[day].push(currentEvent);
        })
        setEvents(newEvents);
    }

    useEffect(() => {
        fetchEvents();
    },[month]);

    const [nextY, nextM] = nextMonth(year,month+1);
    const nextMonthLink = `/calendario/${nextM}/${nextY}`
    const [prevY, prevM] = previousMonth(year,month+1);
    const prevMonthLink = `/calendario/${prevM}/${prevY}`


   //Generate calendar for current year and month
    let rows = [];
    const currentMonthDays = daysInMonth(year,month);
    const [prevMonthYear, prevMonth] = previousMonth(year,month);
    const previousMonthDays = daysInMonth(prevMonthYear,prevMonth);
    let i = 1; //Day index for current month
    let j = firstWeekdayInMonth(year,month); //Unpushed days from previous month
    let k = 1; //Day index for next month
    while(rows.length<42){//Total boxes in the calendar
        if(j>0){
            rows.push(<li key={i-j}><DayPreview inactive day={previousMonthDays-j+1} month={month+1}/></li>);
            j--;
        }
        else if ( i<= currentMonthDays){
            rows.push(<li key={i}><DayPreview day={i} events={events[i]} month={month+1} year={year}/></li>)
            i++;
        }
        else{
            rows.push(<li key={i+k}><DayPreview inactive day={k} month={month+1}/></li>)
            k++;
        }
    }

    return(
        <Container>
            <Header>
                <Button to={prevMonthLink}>&#10094;</Button>
                <h2>{month + 1}/{year}</h2>
                <Button to={nextMonthLink}>&#10095;</Button>
            </Header>
            <Body>
                <li>Dom</li>
                <li>Seg</li>
                <li>Ter</li>
                <li>Qua</li>
                <li>Qui</li>
                <li>Sex</li>
                <li>Sab</li>
                {rows}
            </Body>
        </Container>
    )
}

export default Calendar;