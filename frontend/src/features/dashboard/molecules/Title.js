import React, {useState} from 'react';
import styled from "styled-components";
import {OptionsButton} from "../atoms";
import {OptionsPopover} from "./OptionsPopover";

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    min-height: 34px;
    padding: 10px 0 4px 0;
    overflow: visible;
`;

const Text = styled.span`
    font-weight: bold;
`;

export const Title = ({icon, children, columnId}) => {
    let [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const popover = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    const closePopover = () => {
        setIsPopoverOpen(false);
    };

    return (
        <Container>
            <Text>{children}</Text>
            <OptionsButton onClick={popover}>{icon}</OptionsButton>
            {
                isPopoverOpen &&
                <OptionsPopover
                    closePopover={closePopover}
                    columnId={columnId}
                />
            }
        </Container>
    );
};