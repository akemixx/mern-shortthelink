import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from "../hooks/http.cook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";

export const DetailsPage = () => {
    const { token } = useContext(AuthContext);
    const { request, isLoading } = useHttp();
    const [ link, setLink ] = useState(null);
    const linkId = useParams().id;

    const getLink = useCallback(async () => {
        try {
            const fetchedLink = await request(
                `/api/link/${linkId}`,
                'GET',
                null,
                {
                    Authorization: `Bearer ${ token }`
                }
            );
            setLink(fetchedLink);
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
    }, [ token, linkId, request ]);

    useEffect(() => {
        getLink();
    }, [getLink]);

    if (isLoading) {
        return (<Loader/>);
    }

    return (
        <>
            {!isLoading && link && <LinkCard link={link}/>}
        </>
    );
}