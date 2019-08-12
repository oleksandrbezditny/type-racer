import React, { FC } from 'react';

export type LoaderProps = Readonly<{
   loading: boolean;
   children: any;
}>;

export const Loader: FC<LoaderProps> = (props) => {
    if(props.loading) {
        return <div>Loading...</div>
    }
    return props.children;
}

Loader.displayName = 'Loader';
