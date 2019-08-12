export function isSomething<T extends any>(anything: T): anything is NonNullable<T> {
    return anything != null;
}

export const emptyString = '';
export const space = ' ';