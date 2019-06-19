import React, {useRef, useState} from 'react';
import {useOnClickOutside} from "../hooks";
import {PopoverTitle} from "../../../ui/molecules/PopoverTitle";
import {Loader, PopoverButton} from "../../../ui/atoms";
import {withApollo} from "react-apollo";
import {REMOVE_COLUMN} from "../api";
import {removeColumn} from "../models/dashboard";
import {Popover} from "../../../ui/organisms";

export const ColumnPopover = withApollo(({closePopover, columnId, client, op}) => {
    let popoverRef = useRef(null);
    let [isLoading, setIsLoading] = useState(false);

    useOnClickOutside(popoverRef, closePopover);

    const remove = async () => {
        setIsLoading(true);
        await client.mutate({
            mutation: REMOVE_COLUMN,
            variables: {
                columnId
            }
        });

        setIsLoading(false);
        closePopover();
        removeColumn(columnId);
    };

    return (
        <Popover ref={popoverRef}>
            <PopoverTitle>Actions with list</PopoverTitle>
            <PopoverButton onClick={remove} disabled={isLoading}>
                Remove list
                {
                    isLoading && <Loader color='#fff'/>
                }
            </PopoverButton>
            <PopoverButton onClick={op}>Rename list</PopoverButton>
        </Popover>
    );
});