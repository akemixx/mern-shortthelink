import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.cook';
import {useHistory} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

export const CreatePage = () => {
    const history = useHistory();
    const [ link, setLink ] = useState('');
    const { request } = useHttp();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        window.M.updateTextFields();
    });

    const pressHandler = async event => {
        if(event.key === 'Enter'){
            try{
                const data = await request(
                    '/api/link/generate',
                    'POST',
                    { from: link },
                    { Authorization: `Bearer ${authContext.token}` });
                history.push(`/details/${data.link._id}`);
            } catch (e) {

            }
        }
    };

    return (
        <div className="row">
            <h1>Create Page</h1>

            <div className="col s8 offset-s2 paddingTop">
                <div className="input-field">
                    <input
                        placeholder="Enter the link"
                        id="link"
                        type="text"
                        value = { link }
                        onChange={ e => setLink(e.target.value) }
                        onKeyPress={ pressHandler }
                    />
                    <label htmlFor="link">Enter the link</label>
                </div>
            </div>
        </div>
    )
}