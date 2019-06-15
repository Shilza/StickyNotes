import React, {useRef, useEffect} from "react";
import {SortableContainer, SortableElement} from "react-sortable-hoc";
import {Card} from "../molecules";
import styled from "styled-components";
import {reorderRecords} from "../models/dashboard";

const CardsList = styled.ul`
   overflow-y: auto;
`;

export const Cards = ({columnId, records}) => {
    let containerRef = useRef(null);

    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [records.length]);

    const onSortEnd = ({oldIndex, newIndex}) => {
        reorderRecords({columnId, oldIndex, newIndex});
    };

    return (
        <SortableList
            items={records}
            onSortEnd={onSortEnd}
            containerRef={containerRef}
            />
    );
};

const SortableItem = SortableElement(({item}) => (
    <Card recordId={item.id}>
        {item.text}
    </Card>
));

const SortableList = SortableContainer(({items, containerRef}) => (
    <CardsList ref={containerRef}>
        {
            Array.isArray(items) && items.map((item, index) => (
                <SortableItem key={`record-${index}`} index={index} item={item}/>
            ))
        }
    </CardsList>
));