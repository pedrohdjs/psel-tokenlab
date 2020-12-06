import React from 'react';
import styled from 'styled-components';

const EventsPreviewWrapper = styled.div`
    &{
        width: 100%;
        height: 100%;
        padding: 3%;

    }

    div{
        width: 100% !important;
        height: 100% !important;
        overflow: hidden;
    }

    div p{
        margin: 0;
        padding: 0;
        text-align: center;
    }

    div b {
        width: 95%;
        white-space: nowrap;
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: center;
    }

    @media (max-width: 850px){
        div{
            display: none;
        }
    }

`;

const MobileContent = styled.div`
    width: 100%;
    height: 100%;

    flex-direction: column;
    align-items: center;
    justify-content: center !important;
    display: none;
    font-size: 12px;

    @media (max-width: 850px){
        display: flex !important;
    }
`

function EventsPreview (props){
    const numEvents = props.events.length;
    const eventsString = (numEvents === 2) ? "evento" : "eventos";
    
    let content;
    if (numEvents === 0){
        content = (<div><p>Nenhum evento</p></div>);
    }
    else{
        const firstEvent = props.events[0].description;
        content = (<div><b>{firstEvent}</b><p> e mais {numEvents-1} {eventsString}</p></div>)
    }

    const mobileContent = (<MobileContent><p>{numEvents} {eventsString}</p></MobileContent>)
    return(
        <EventsPreviewWrapper>
            {content}
            {mobileContent}
        </EventsPreviewWrapper>
    )
}

export default EventsPreview;