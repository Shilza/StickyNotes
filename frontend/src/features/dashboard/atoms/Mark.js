import styled from "styled-components";

export const Mark = styled.div`
  width: 100%;
  height: 30px;
  background-color: ${props => props.backgroundColor};
  opacity: 0.9;
  border-radius: 5px;
  transition: 0.1s;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px;
  cursor: pointer;
  
  &+& {
    margin-top: 10px;
  }
  
  &:hover {
    opacity: 1;
    transform: scale(1.01);
  }
`;
