export const getTimeByMs = ms => {
    const date = new Date(parseInt(ms));

    return `
    ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}  
    ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}
    `
};