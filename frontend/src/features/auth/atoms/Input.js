import styled from "styled-components";

export const Input = styled.input`
    border: 1px solid #d1d1d1;
    height: ${props => props.height || '35px'}
    padding: 0 10px;
    outline: none;
    transition: 0.4s;
    box-sizing: border-box;
    border-radius: 3px;
    
    &:focus {
        border: 1px solid #2196f3;
    }
`;