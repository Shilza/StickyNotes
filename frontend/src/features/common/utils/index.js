
export const getErrorMessage = error => {
    const errorText = 'Error: GraphQL error:';
    return error.toString().substring(errorText.length);
};