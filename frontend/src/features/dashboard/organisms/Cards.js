import React from "react";
import {SortableContainer, SortableElement} from "react-sortable-hoc";
import {Card} from "../molecules";
import styled from "styled-components";
import {getRecordsByColumnId} from "../selectors";
import {$dashboard, reorderRecords} from "../models/dashboard";
import {useStore} from "effector-react";

const CardsList = styled.ul`
   overflow-y: auto;
`;

export const Cards = ({columnId}) => {
    let dashboard = useStore($dashboard);
    let records = getRecordsByColumnId(dashboard, columnId);

    const onSortEnd = ({oldIndex, newIndex}) => {
        reorderRecords({columnId, oldIndex, newIndex});
    };

    return (
        <SortableList items={records} onSortEnd={onSortEnd}/>
    );
};

const SortableItem = SortableElement(({value}) => (
    <Card>
        {value.text}
    </Card>
));

const SortableList = SortableContainer(({items}) => (
    <CardsList>
        {
            Array.isArray(items) && items.map((value, index) => (
                <SortableItem key={`record-${index}`} index={index} value={value}/>
            ))
        }
    </CardsList>
));