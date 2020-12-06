import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';
import AppNav from '../components/AppNav';
import Calendar from '../components/Calendar';

const Viewport = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
`

const CalendarContainer = styled.div`
    width: 100%;
    height: 90%;
    padding: 1% 2% 0% 2%;
`;

function CalendarPage(){
    const params = useParams();
    const month = params.m-1;
    const year = params.y;

    return (
        <Viewport>
            <AppNav/>
            <CalendarContainer>
                <Calendar month={month} year={year}/>
            </CalendarContainer>
        </Viewport>
        
    )
}

export default CalendarPage;