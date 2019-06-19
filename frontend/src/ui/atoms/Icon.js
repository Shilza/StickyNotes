import React from 'react';
import styled from "styled-components";

const Ellipsis = styled.div`
     position: relative;
     color: ${props => props.color || '#000'};
     width: 2px;
     height: 2px;
     border-radius: 50%;
     border: solid 1px currentColor;

    &:before {
      content: '';
      position: absolute;
      top: -1px;
      left: -6px;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      border: solid 1px currentColor;
    }

    &:after {
      content: '';
      position: absolute;
      top: -1px;
      left: 4px;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      border: solid 1px currentColor;
    }
`;

const Close = styled.div`
    color: #000;
    position: relative;
    width: 12px;
    height: 12px;
    
    &:before {
      content: '';
      position: absolute;
      top: 10px;
      width: 12px;
      height: 1px;
      background-color: currentColor;
      -webkit-transform: rotate(-45deg);
              transform: rotate(-45deg);
    }
    
    &:after {
      content: '';
      position: absolute;
      top: 10px;
      width: 12px;
      height: 1px;
      background-color: currentColor;
      -webkit-transform: rotate(45deg);
              transform: rotate(45deg);
    }
`;

const Plus = styled.div`
    color: #000;
    width: 20px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      width: 12px;
      height: 1px;
      background-color: currentColor;
    }
    
    &:after {
      content: '';
      position: absolute;
      width: 12px;
      height: 1px;
      background-color: currentColor;
      -webkit-transform: rotate(90deg);
              transform: rotate(90deg);
    }
`;

const Edit = styled.div`
      color: #000;
      width: 14px;
      height: 2px;
      border-radius: 1px;
      border: solid 1px currentColor;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);

    &:before {
      content: '';
      position: absolute;
      left: -12px;
      top: -1px;
      width: 0;
      height: 0;
      border-left: solid 5px transparent;
      border-right: solid 5px currentColor;
      border-top: solid 2px transparent;
      border-bottom: solid 2px transparent;
    }
`;

const Check = styled.div`
  color: #000;
  width: 14px;
  height: 8px;
  border-bottom: solid 1px currentColor;
  border-left: solid 1px currentColor;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
`;

const getIconByName = (name, props) => {
    switch (name) {
        case 'ellipsis':
            return <Ellipsis {...props}/>;
        case 'close':
            return <Close {...props}/>;
        case 'plus':
            return <Plus {...props}/>;
        case 'edit':
            return <Edit {...props}/>;
        case 'check':
            return <Check {...props}/>;
        default:
    }
};

export const Icon = ({name, ...props}) => (
    getIconByName(name, props)
);