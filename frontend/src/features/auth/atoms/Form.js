import styled from "styled-components";
import {Input} from "./Input";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 320px;
    min-height: 200px;
    justify-content: space-evenly;
    
    ${Input}+${Input} {
      margin-top: 2px;
    }
`;