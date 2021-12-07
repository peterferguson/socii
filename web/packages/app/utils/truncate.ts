
export const truncate = (input, length, end = "...") => {
    if (input.length > length) {
        return `${input.substring(0, length - end.length)}${end}`;
    }
    return input;
};
