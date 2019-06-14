import styled from "styled-components";
import {Button} from "../../../ui/atoms";

export const SubmitButton = styled(Button)`
    position: relative;
    background-color: #00bcd5;
    color: #ffffff;
    height: 30px;
    transition: background-color 0.2s ease-in-out;
    margin-top: 10px;
    
    font-size: 14px;
    line-height: 1.55;
    font-weight: 600;
    border-width: 1px;
    border-radius: 3px;
    background-position: center center;
    border-color: transparent;
    border-style: solid;
    box-shadow: 0 5px 20px 0 rgba(25,105,176,1);
    
    &:hover {
      background-color: #00abc1;
    }
    
    &:active {
      background-color: #009eb3;
    }
`;