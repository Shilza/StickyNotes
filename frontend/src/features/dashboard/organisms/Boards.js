import React from 'react';
import {Board} from "./Board";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {$dashboard, setColumns} from "../models/dashboard";
import {useStore} from "effector-react";
import styled from "styled-components";

const ColumnsList = styled.ul`
    display: flex;
`;

export const Boards = () => {
    const {columns} = useStore($dashboard);

    const onSortEnd = ({oldIndex, newIndex}) => {
        setColumns(arrayMove(columns, oldIndex, newIndex));
    };
    console.log('update', columns);

    return (
        <SortableList axis='x' items={columns} onSortEnd={onSortEnd}/>
    );
};

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