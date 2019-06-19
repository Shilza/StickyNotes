import React, {useEffect, useRef} from "react";
import {SortableContainer, SortableElement} from "react-sortable-hoc";
import {Card} from "../molecules";
import styled from "styled-components";
import {reorderRecords} from "../models/dashboard";
import {REORDER_RECORDS} from "../api";
import {withApollo} from "react-apollo";

const CardsList = styled.ul`
   overflow-y: auto;
`;

export const Cards = withApollo(({client, columnId, records}) => {
    let containerRef = useRef(null);

    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [records.length]);

    const onSortEnd = async ({oldIndex, newIndex}) => {
        if(newIndex !== oldIndex) {
            reorderRecords({columnId, oldIndex, newIndex});
            await client.mutate({
                mutation: REORDER_RECORDS,
                variables: {
                    columnId,
                    oldIndex: records[oldIndex].index,
                    newIndex: records[newIndex].index
                }
            });
        }
    };

    return (
        <SortableList
            items={records}
            onSortEnd={onSortEnd}
            containerRef={containerRef}
            />
    );
});

const SortableItem = SortableElement(({item}) => (
    <Card>
        {item}
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