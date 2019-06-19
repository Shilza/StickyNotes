import React from 'react';
import styled from "styled-components";
import {CREATE_MARK, REMOVE_MARK} from "../api";
import {$dashboard, addMark, removeMark} from "../models/dashboard";
import {withApollo} from "react-apollo";
import {Icon} from "../../../ui/atoms";
import {useStore} from "effector-react";
import {getMarksByRecordId} from "../selectors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 15px;
  width: 60%;
`;

const MarkItem = styled.div`
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

const colors = [
    '#61bd4f',
    '#ffed1a',
    '#ff9f1a',
    '#eb5a46'
];

export const Marks = withApollo(({recordId, client}) => {
    let {columns} = useStore($dashboard);
    let marks = getMarksByRecordId(columns, recordId);

    const create = async color => {
        const result = await client.mutate({
            mutation: CREATE_MARK,
            variables: {
                color,
                recordId
            }
        });

        addMark({
            recordId,
            mark: result.data.createMark
        });
    };

    const remove = async color => {
        const markId = marks.find(mark => mark.color === color).id;
        await client.mutate({
            mutation: REMOVE_MARK,
            variables: {
                markId
            }
        });

        removeMark(markId);
    };

    const markOnClick = color => {
        const isExist = marks.some(mark => mark.color === color);
        isExist ? remove(color) : create(color);
    };

    return (
        <Container>
            {
                colors.map((color, index) =>
                    <MarkItem key={index} onClick={() => markOnClick(color)} backgroundColor={color}>
                        {marks.some(mark => mark.color === color) && <Icon name='check'/>}
                    </MarkItem>
                )
            }
        </Container>
    );
});