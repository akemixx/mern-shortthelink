import {useCallback, useState} from 'react';

export const useHttp = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);

        try {
            if(body){
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, { method, body, headers });
            const data = await response.json();

            setIsLoading(false);

            if(!response.ok){
                throw new Error(data.message || 'Something went wrong.')
            }

            return data;
        } catch (e) {
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return { loading: isLoading, request, error, clearError };
}