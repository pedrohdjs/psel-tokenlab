import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import EventsPreview from './EventsPreview.js';


const DayWrapper = styled.div`
    &{
        width: 100%;
        height: 100%;
    }

    &:not(.inactive) > a{
        width: 100%;
        height: 100%;
        overflow: hidden;

        display: flex;
        flex-direction: column;

        background-size: 100% 210%; 
        background-image: linear-gradient(to bottom, #fff 50%, var(--blue) 50%);
        transition: background-position .2s ease-in-out, color .2s ease-in-out;

        text-decoration: none;
    }

    & h3{
        margin: 0;
        padding: 0;
    }

    &.inactive{
        background-color: var(--clear-grey);
        filter: opacity(40%);
    }

    & > a {
        display: flex;
        flex-direction: column;
    }

    & >a:hover {
        & {
            background-position: 0 98%;
            color: #fff;
        }
    }

    .active-day-first {
        width: 100%;
        height: 25%;
    }

    .active-day-second {
        width: 100%;
        height: 75%;
    }
`;

function InactiveDay (props){
    return(
        <div>
            <h3>{props.day}</h3>
        </div>
    )
}

function ActiveDay (props){
    return(
        <Link to={`/dia/${props.day}/${props.month}/${props.year}`}>
            <div className="active-day-first">
                <h3>{props.day}</h3>
            </div>
            <div className="active-day-second">
                <EventsPreview events={props.events}/>
            </div>
            
        </Link>
    )
}

function DayPreview(props){
    const day = (props.inactive) ?  InactiveDay(props) : ActiveDay(props);
    const className = (props.inactive) ? "inactive" : "";
    return(
        <DayWrapper className={className}>
            {day}
        </DayWrapper>
    )
}

export default DayPreview;