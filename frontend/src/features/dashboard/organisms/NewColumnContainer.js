import React, {useState} from 'react';
import {NewColumn} from "./NewColumn";
import {AddColumnButton} from "../atoms";
import {CREATE_COLUMN} from "../api";
import {addColumn} from "../models/dashboard";
import {withApollo} from "react-apollo";
import {toast} from "react-toastify";
import {getErrorMessage} from "../../common/utils";

export const NewColumnContainer = withApollo(({boardTitle, client}) => {
    let [isNewColumn, setIsNewColumn] = useState(false);

    const addNewColumn = () => {
        setIsNewColumn(true);
    };

    const closeNewColumn = () => {
        setIsNewColumn(false);
    };

    const createColumn = title => {
        if (title.length > 0 && title.length < 20) {
            client.mutate({
                mutation: CREATE_COLUMN,
                variables: {
                    title,
                    boardTitle
                }
            })
                .then(({data}) => {
                    addColumn(data.createColumn);
                })
                .catch(error => toast.error(getErrorMessage(error)));
        }
    };

    return (
        <>
            {
                isNewColumn
                    ? <NewColumn createColumn={createColumn} closeNewColumn={closeNewColumn}/>
                    : <AddColumnButton onClick={addNewColumn}>+ Add new list</AddColumnButton>
            }
        </>
    );
});