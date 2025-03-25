import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";

const useApi = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiCall = async (method, url, data = {}, params = {}, headers = {}) => {
        setLoading(true);
        setError(null);

        try {
            const token = await getAccessTokenSilently();
            const API_URL = `${import.meta.env.VITE_APP_BASEURL}${url}`;

            const response = await axios({
                method,
                url: API_URL,
                data,
                params,
                headers: {
                    ...headers,
                    Authorization: `Bearer ${token}`,
                },
            });

            return {
                success: true,
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            console.error("API Error:", error);
            setError(error.response?.data?.message || error.message);
            return {
                success: false,
                message: error.response?.data?.message || error.message,
                status: error.response?.status || 500,
            };
        } finally {
            setLoading(false);
        }
    };

    return { apiCall, loading, error };
};

export default useApi;
