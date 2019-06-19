import styled from "styled-components";
import {Button} from "./Button";

export const PopoverButton = styled(Button)`
  position: relative;
  min-height: 34px;
  transition: 140ms;
  
  &:hover {
    background: #0074b9;
    color: #fff;
  }
`;