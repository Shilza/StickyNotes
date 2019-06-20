import styled from "styled-components";
import {Button} from "./Button";

export const LuminousButton = styled(Button)`
    width: ${props => props.width || '100px'};
    height: ${props => props.height || '24px'};
    margin: ${props => props.margin || '20px 0'};
    color: ${props => props.color || '#ffffff'};
    font-size: 14px;
    line-height: 1.55;
    font-weight: 600;
    border-width: 1px;
    border-radius: 3px;
    background-color: ${props => {
        if(props.green)
            return '#5fba4c';
        else if(props.red)
            return '#eb5a46';
    }};
    background-position: center center;
    border-color: transparent;
    border-style: solid;
    transition: 140ms;
    box-shadow: 0 5px 20px 0 ${props => {
    if(props.green)
        return '#52a041';
    else if(props.red)
        return '#eb4947';
    }};
    z-index: ${props => props.zIndex || 'auto'};
`;