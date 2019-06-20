import React from 'react';
import styled from "styled-components";
import {CREATE_MARK, REMOVE_MARK} from "../api";
import {$dashboard, addMark, removeMark} from "../models/dashboard";
import {withApollo} from "react-apollo";
import {Icon} from "../../../ui/atoms";
import {useStore} from "effector-react";
import {getMarksByRecordId} from "../selectors";
import {toast} from "react-toastify";
import {getErrorMessage} from "../../common/utils";
import {Mark} from "../atoms";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 15px;
  width: 60%;
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

    const createMark = color => {
        client.mutate({
            mutation: CREATE_MARK,
            variables: {
                color,
                recordId
            }
        })
            .then(({data}) => {
                addMark({
                    recordId,
                    mark: data.createMark
                });
            })
            .catch(error => toast.error(getErrorMessage(error)));
    };

    const remove = color => {
        const markId = marks.find(mark => mark.color === color).id;
        client.mutate({
            mutation: REMOVE_MARK,
            variables: {
                markId
            }
        })
            .then(() => {
                removeMark(markId);
            })
            .catch(error => toast.error(getErrorMessage(error)));
    };

    const markOnClick = color => {
        const isExist = marks.some(mark => mark.color === color);
        isExist ? remove(color) : createMark(color);
    };

    return (
        <Container>
            {
                colors.map((color, index) =>
                    <Mark key={index} onClick={() => markOnClick(color)} backgroundColor={color}>
                        {marks.some(mark => mark.color === color) && <Icon name='check'/>}
                    </Mark>
                )
            }
        </Container>
    );
});