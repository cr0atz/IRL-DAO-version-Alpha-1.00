import { useEffect, useState } from "react";
import Axios from 'axios';

function useFetch(wallet, privateKey) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAllAddresses = async () => {
            try {
                await Axios.post(`${process.env.REACT_APP_API_HTTP}getDAO`, {
                    wallet: wallet,
                    privateKey: privateKey
                }).then((response) => {
                    setData(response.data);
                    setLoading(false);
                });
            } catch (error) {
                setError(error);
            }
        };
        getAllAddresses();
    }, [wallet, privateKey]);

    const refetch = async () => {
        try {
            await Axios.post(`${process.env.REACT_APP_API_HTTP}getDAO`, {
                wallet: wallet,
                privateKey: privateKey
            }).then((response) => {
                setData(response.data);
                setLoading(false);
            });
        } catch (err) {
            setError(err);
        }
    };

    return { data, loading, error, refetch };
}
export default useFetch;