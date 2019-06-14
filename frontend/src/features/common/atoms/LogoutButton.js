import styled from "styled-components";
import {Button} from "../../../ui/atoms";

export const LogoutButton = styled(Button)`
    color: #ffffff;
    font-size: 14px;
    line-height: 1.55;
    font-weight: 600;
    border-width: 1px;
    border-radius: 5px;
    background-color: #1070b6;
    background-position: center center;
    border-color: transparent;
    border-style: solid;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    box-shadow: 0 5px 20px 0 rgba(25,105,176,1);
`;