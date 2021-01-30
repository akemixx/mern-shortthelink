import React, {useContext, useEffect, useState} from 'react';
import '../index.css';
import {useHttp} from "../hooks/http.cook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const authContext = useContext(AuthContext);
    const message = useMessage();
    const { isLoading, request, error, clearError } = useHttp();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [ error, message, clearError ]);

    useEffect(() => {
        window.M.updateTextFields();
    });

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const signUpHandler = async () => {
        try {
            const data = await request('/api/auth/signUp', 'POST', {...form});
            message(data.message);
        } catch (e) {
            console.log(`Error: ${ e.message }`);
        }
    };

    const signInHandler = async () => {
        try {
            const data = await request('/api/auth/signIn', 'POST', {...form});
            authContext.login(data.token, data.userId);
        } catch (e) {
            console.log(`Error: ${ e.message }`);
        }
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>SHORT THE LINK</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter the email"
                                    id="email"
                                    name="email"
                                    type="text"
                                    className="white-input"
                                    onChange={ changeHandler }
                                    value={ form.email }
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter the password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="white-input"
                                    onChange={ changeHandler }
                                    value = { form.password }
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4 marginRight"
                            onClick={ signInHandler }
                            disabled={ isLoading }
                        >
                            Sign in
                        </button>
                        <button
                            className="btn grey lighten-1"
                            onClick={ signUpHandler }
                            disabled={ isLoading }
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}