import React, {useRef, useState} from 'react';
import styled from "styled-components";
import {useOnClickOutside} from "../hooks";
import {OptionsPopoverTitle} from "./OptionsPopoverTitle";
import {Loader, PopoverButton} from "../../../ui/atoms";
import {withApollo} from "react-apollo";
import {REMOVE_COLUMN} from "../api";
import {removeColumn} from "../models/dashboard";

const Container = styled.div`
    background: #fff;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 16px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
    position: absolute;
    width: 300px;
    padding: 4px;
    z-index: 70;
    top: 45px;
    left: 220px;
    text-align: center;
    transform: translateZ(0);
    
    @media (max-width: 375px) {
      width: 250px;
    }
    
    @media (max-width: 768px) {
      left: 30px;
    }
`;

export const OptionsPopover = withApollo(({closePopover, columnId, client}) => {
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
        <Container ref={popoverRef}>
            <OptionsPopoverTitle>Actions with list</OptionsPopoverTitle>
            <PopoverButton onClick={remove} disabled={isLoading}>
                Remove list
                {
                    isLoading && <Loader color='#fff'/>
                }
            </PopoverButton>
        </Container>
    );
});