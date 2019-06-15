import React, {useRef, useState} from 'react';
import styled from "styled-components";
import {OptionsButton} from "../atoms";
import {OptionsPopover} from "./OptionsPopover";
import {useOnClickOutside} from "../hooks";
import {Input} from "../../auth/atoms";

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
    let [isTitleRenamed, setIsTitleRenamed] = useState(false);
    let [isPopoverOpen, setIsPopoverOpen] = useState(false);
    let titleRef = useRef(null);

    const renameTitle = () => {
        setIsTitleRenamed(false);
    };

    useOnClickOutside(titleRef, renameTitle);

    const op = () => {
        console.log('open');
        setIsTitleRenamed(true);
    };

    const popover = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    const closePopover = () => {
        setIsPopoverOpen(false);
    };

    return (
        <Container>
            {
                isTitleRenamed
                    ? <Input>{children}</Input>
                    : <Text onClick={op}>{children}</Text>
            }
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