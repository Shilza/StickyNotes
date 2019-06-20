import React, {useRef, useState} from 'react';
import {useOnClickOutside} from "../hooks";
import {PopoverTitle} from "../../../ui/molecules/PopoverTitle";
import {Loader, PopoverButton} from "../../../ui/atoms";
import {withApollo} from "react-apollo";
import {REMOVE_COLUMN} from "../api";
import {removeColumn} from "../models/dashboard";
import {Popover} from "../../../ui/organisms";
import {toast} from "react-toastify";
import {getErrorMessage} from "../../common/utils";

export const ColumnPopover = withApollo(({closePopover, columnId, client, op}) => {
    let popoverRef = useRef(null);
    let [isLoading, setIsLoading] = useState(false);

    useOnClickOutside(popoverRef, closePopover);

    const remove = () => {
        setIsLoading(true);
        client.mutate({
            mutation: REMOVE_COLUMN,
            variables: {
                columnId
            }
        })
            .then(() => {
                setIsLoading(false);
                closePopover();
                removeColumn(columnId);
            })
            .catch(error => toast.error(getErrorMessage(error)));
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