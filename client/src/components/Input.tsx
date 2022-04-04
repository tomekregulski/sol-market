import React, { useState } from 'react';

// @ts-ignore
const Input = (props) => {
    const [text, setText] = useState(props.value);
    // @ts-ignore
    const handleChange = (e) => {
        props.callback({ name: props.name, value: e.target.value, type: props.type });
        setText(e.target.value);
    };
    return (
        <>
            <label>{props.name}</label>
            <input onChange={(e) => handleChange(e)} type={props.type} value={text} />
        </>
    );
};

export default Input;
