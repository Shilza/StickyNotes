import styled from "styled-components";
import {Button} from "../../../ui/atoms";

export const OptionsButton = styled(Button)`
  height: 28px;
  width: 28px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  
  &:hover {
    background: lightgray;
  }
  
  &:active {
    background: darkgray;
  }
`;