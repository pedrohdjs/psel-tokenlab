import React, { useEffect, useState } from 'react';
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
    return (
        <Viewport>
            <AppNav/>
            <CalendarContainer>
                <Calendar/>
            </CalendarContainer>
        </Viewport>
        
    )
}

export default CalendarPage;