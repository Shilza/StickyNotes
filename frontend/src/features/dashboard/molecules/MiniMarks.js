import React from 'react';
import styled from "styled-components";
import {useStore} from "effector-react";
import {$dashboard} from "../models/dashboard";
import {getMarksByRecordId} from "../selectors";

const MarksList = styled.ul`
  display: flex;
  align-self: flex-start;
  margin: 4px 0 8px 0;
`;

const MiniMark = styled.li`
  width: 44px;
  height: 6px;
  border-radius: 3px;
  opacity: 0.9;
  background-color: ${props => props.backgroundColor};
  cursor: pointer;
  
  &+& {
    margin-left: 3px;
  }
`;

export const MiniMarks = ({recordId}) => {
    let {columns} = useStore($dashboard);
    let miniMarks = getMarksByRecordId(columns, recordId);

    return (
        <>
            {
                miniMarks.length > 0 &&
                <MarksList>
                    {
                        miniMarks.map(({color}, index) => (
                            <MiniMark key={index} backgroundColor={color}/>
                        ))
                    }
                </MarksList>
            }
        </>
    );
};