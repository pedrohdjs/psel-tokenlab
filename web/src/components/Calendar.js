import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { nextMonth, previousMonth, daysInMonth, firstWeekdayInMonth }  from '../modules/DateUtil.js';
import styled from 'styled-components';

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

const Button = styled.button`
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    transition: .4s;

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
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getUTCFullYear());
    let rows = [];

    const updateToNextMonth = () => {
        const [y,m] = nextMonth(year,month);
        setMonth(m);
        setYear(y);
    }

    const updateToPreviousMonth = () => {
        const [y,m] = previousMonth(year,month);
        setMonth(m);
        setYear(y);
    }


   
    rows = [];
    const currentMonthDays = daysInMonth(year,month);
    const [prevMonthYear, prevMonth] = previousMonth(year,month);
    const previousMonthDays = daysInMonth(prevMonthYear,prevMonth);
    let i = 0; //Day index for current/next month
    let j = firstWeekdayInMonth(year,month); //Unpushed days from previous month
    console.log(j);
    while(rows.length<42){
        if(j>0){
            rows.push((<li>{previousMonthDays-j+1}</li>));
            j--;
        }
        else {
            rows.push(<li>{i%(currentMonthDays)+1}</li>)
            i++;
        }
    }



    return(
        <Container>
            <Header>
                <Button onClick={updateToPreviousMonth}>&#10094;</Button>
                <h2>{month + 1}/{year}</h2>
                <Button onClick={updateToNextMonth}>&#10095;</Button>
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