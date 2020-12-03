import React from 'react';

function AJAXForm(props){

    //Get the data from all form inputs as a JSON object
    const getFormDataAsJSON = (form) => {
        const data = {};
        const inputs = form.querySelectorAll("input");
        inputs.forEach(el => {data[el.name] = el.value})
        return data;
    }

    //Handle form submit event
    const submitHandler = async (ev)=>{
        ev.preventDefault();
        const data = getFormDataAsJSON(ev.target);
        const url = ev.target.action;
        
        const reqSettings = {method: props.method,
                             headers: {
                                 'Content-Type': 'application/json'
                             },
                             credentials: 'include',
                             body: JSON.stringify(data)}
        try{
            const res = await fetch(url,reqSettings);
            props.callback(res)
        } catch (ex) {
            console.log(ex);
        }
    }

    return(
        <form id={props.id} method={props.method} action={props.action} onSubmit={submitHandler}>
            {props.children}
        </form>
    )
}
export default AJAXForm;