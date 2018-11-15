import React from 'react';

import './Input.css';

const input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                                className="InputElement" {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea 
                                className="InputElement" {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = (
                <select
                    className="InputElement"
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map((config) => {
                        return (
                            <option key={config.value} value={config.value}>
                                {config.displayValue}
                            </option>
                        )
                    })}
                              
                </select>
            )
            break;
        default:
            inputElement = <input 
                                className="InputElement" {...props.elementConfig} 
                                value={props.value}/>
    }

    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;