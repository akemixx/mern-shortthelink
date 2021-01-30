import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.cook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";

export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {request, isLoading} = useHttp();
    const {token} = useContext(AuthContext);

    const getLinks = useCallback(async () => {
        try {
            const data = await request(
                '/api/link',
                'GET',
                null,
                { Authorization: `Bearer ${token}` }
            );
            setLinks(data);
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
    }, [ request, token ]);

    useEffect(() => {
        getLinks();
    }, [ getLinks ]);

    if (isLoading) {
        return (<Loader/>);
    }

    console.log(links);

    return (
        <>
        {!isLoading && <LinksList links={ links }/>}
        </>
    )
}