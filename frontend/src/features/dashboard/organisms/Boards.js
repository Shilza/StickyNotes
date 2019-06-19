import React from 'react';
import {Board} from "./Board";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {$dashboard, reorderColumns, setColumns} from "../models/dashboard";
import {useStore} from "effector-react";
import styled from "styled-components";
import {withApollo} from "react-apollo";
import {REORDER_COLUMNS} from "../api";

const ColumnsList = styled.ul`
    display: flex;
`;

export const Boards = withApollo(({client}) => {
    const {columns} = useStore($dashboard);

    const onSortEnd = async ({oldIndex, newIndex}) => {
        if(newIndex !== oldIndex) {
            reorderColumns({oldIndex, newIndex});
            await client.mutate({
                mutation: REORDER_COLUMNS,
                variables: {
                    oldIndex: columns[oldIndex].index,
                    newIndex: columns[newIndex].index
                }
            });
        }
    };

    return (
        <SortableList axis='x' items={columns} onSortEnd={onSortEnd}/>
    );
});

const SortableItem = SortableElement(({item}) => <Board item={item}/>);


const SortableList = SortableContainer(({items}) => (
    <ColumnsList>
        {
            items.map((item, index) => (
                <SortableItem key={`column-${index}`} index={index} item={item}/>
            ))
        }
    </ColumnsList>
));