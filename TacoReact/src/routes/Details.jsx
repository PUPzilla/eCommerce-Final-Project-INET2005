import React, { useState, useEffect } from "react";
import Card from '../ui/card';
import { useParams } from "react-router-dom";

export default function Details() {
    const { id } = useParams();

    //  Display product desc

    const [product, setProd] = useState(null);
    const apiHost = import.meta.env.VITE_API_HOST;
    const apiUrl = apiHost + `/api/products/details/${id}`;

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(apiUrl);
            if(response.ok){
                const data = await response.json();
                if(!ignore){
                    setProd(data);
                }
            } else {
                setProd(null);
            }
        }
        let ignore = false;
        fetchData();
        return () => {
            ignore = true;
        }
    }, [apiUrl]);

    return(
        <>
        <h1>Details Page</h1>
        {   
        error ? (
            <p>{error}</p>
        ) : product ? (
            <Card key={product.id} product={product} apiHost={apiHost} showLinks={true}/>
        ) : (
            <p>Loading...</p>
        )}
        </>
    );
};
