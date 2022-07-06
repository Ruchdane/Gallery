export function rounded(value, max, min = 0) {
    if (isNaN(value)) return min;
    return value < min ? max + (value % max) : value % max;
}
export function random(begin, end) {
    return Math.floor(Math.random() * end);
}

export function isUndefined(value) {
    return value === undefined ? "" : value;
}
