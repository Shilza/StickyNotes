import React, {useRef, useState} from 'react';
import styled from "styled-components";
import {OptionsButton} from "../atoms";
import {ColumnPopover} from "./ColumnPopover";
import {useOnClickOutside} from "../hooks";
import {Input} from "../../auth/atoms";
import {withApollo} from "react-apollo";
import {RENAME_COLUMN} from "../api";
import {renameColumn} from "../models/dashboard";
import {toast} from "react-toastify";
import {getErrorMessage} from "../../common/utils";

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

export const Title = withApollo(({icon, children, client, columnId}) => {
    let [isTitleRenamed, setIsTitleRenamed] = useState(false);
    let [isPopoverOpen, setIsPopoverOpen] = useState(false);
    let titleRef = useRef(null);

    const renameColumnn = () => {
        const title = titleRef.current.value;
        if (title !== children && title.length > 0 && title.length < 20) {
            client.mutate({
                mutation: RENAME_COLUMN,
                variables: {
                    columnId,
                    title
                }
            })
                .then(() => {
                    renameColumn({
                        columnId,
                        title
                    });
                })
                .catch(error => toast.error(getErrorMessage(error)));
        }
        setIsTitleRenamed(false);
    };

    const op = async () => {
        await setIsTitleRenamed(true);
        titleRef.current.focus();
        closePopover();
    };

    useOnClickOutside(titleRef, renameColumnn);

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
                    ? <Input height='28px' defaultValue={children} ref={titleRef}/>
                    : <Text>{children}</Text>
            }
            <OptionsButton onClick={popover}>{icon}</OptionsButton>
            {
                isPopoverOpen &&
                <ColumnPopover
                    op={op}
                    closePopover={closePopover}
                    columnId={columnId}
                />
            }
        </Container>
    );
});