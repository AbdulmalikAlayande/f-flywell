// @flow
import * as React from 'react';
import {useEffect} from "react";

type Props = {

};

export function UseGoogleSearch(props: Props) {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cse.google.com/cse.js?cx=85708e4873af04f21';
        script.async = true;
        document.body.appendChild(script);
        const div = document.createElement('div');
        div.className = "gcse-search";
        document.body.appendChild(div);

        return () => {
            document.body.removeChild(script);
        };
    }, []);


    return (
        <div>

        </div>
    );
};