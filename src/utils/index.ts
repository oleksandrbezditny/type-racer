export function isSomething<T extends any>(anything: T): anything is NonNullable<T> {
    return anything != null;
}

export function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export const emptyString = '';
export const space = ' ';