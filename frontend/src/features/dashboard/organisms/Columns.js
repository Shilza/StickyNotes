import React from 'react';
import {Column} from "./Column";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {$dashboard, reorderColumns} from "../models/dashboard";
import {useStore} from "effector-react";
import styled from "styled-components";
import {withApollo} from "react-apollo";
import {REORDER_COLUMNS} from "../api";
import {toast} from "react-toastify";
import {getErrorMessage} from "../../common/utils";
import {$board} from "../models/board";

const ColumnsList = styled.ul`
    display: flex;
`;

export const Columns = withApollo(({client}) => {
    const {columns} = useStore($dashboard);
    const {id: boardId} = useStore($board);

    const onSortEnd = ({oldIndex, newIndex}) => {
        if (newIndex !== oldIndex) {
            reorderColumns({oldIndex, newIndex});
            client.mutate({
                mutation: REORDER_COLUMNS,
                variables: {
                    boardId,
                    oldIndex: columns[oldIndex].index,
                    newIndex: columns[newIndex].index
                }
            })
                .catch(error => toast.error(getErrorMessage(error)));
        }
    };

    return (
        <SortableList axis='x' items={columns} onSortEnd={onSortEnd}/>
    );
});

const SortableItem = SortableElement(({item}) => <Column item={item}/>);


const SortableList = SortableContainer(({items}) => (
    <ColumnsList>
        {
            items.map((item, index) => (
                <SortableItem key={`column-${index}`} index={index} item={item}/>
            ))
        }
    </ColumnsList>
));