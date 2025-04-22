import { useEffect, useState } from "react";
import Axios from 'axios';

function useFetch() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAllAddresses = async () => {
            try {
                await Axios.post(`${process.env.REACT_APP_API_HTTP}get_real_daos`, {
                }).then((response) => {
                    setData(response.data);
                    setLoading(false);
                });
            } catch (error) {
                setError(error);
            }
        };
        getAllAddresses();
    }, []);

    return { data, loading, error };
}
export default useFetch;