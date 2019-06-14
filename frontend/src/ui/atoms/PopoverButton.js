import styled from "styled-components";
import {Button} from "./Button";

export const PopoverButton = styled(Button)`
  min-height: 34px;
  transition: 0.2s;
  
  &:hover {
    background: #0074b9;
    color: #fff;
  }
`;