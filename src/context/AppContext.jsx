import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const [query, setQuery] = useState('');
    const [isTouched, setIsTouched] = useState(false)
    const [tracks, setTracks] = useState([]);
    const [artists, setArtists] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState({});

    useEffect(() => {
        if (!query && isTouched) {
            setIsError(true);
            setError((prev) => ({
                ...prev,
                message: 'Please input a search term',
            }));
            return;
        }

        fetch(
            `https://shazam.p.rapidapi.com/search?term=${query}&locale=en-US&offset=0&limit=5`,
            {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key':
                        '84c519c945msh92ea5d88a1ca5ecp19d27cjsn54d7ea5f78f0',
                    'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                // setIsLoading(false);
                setIsError(false);
                setTracks(data.tracks.hits);
                setArtists(data.artists.hits);
            })
            .catch((err) => {
                // setIsLoading(false);
                setIsError(true);
                setError((prev) => ({
                    ...prev,
                    message: err.message,
                }));
            });
    }, [query, isError]);

    return (
        <AppContext.Provider
            value={{
                query,
                artists,
                tracks,
                isError,
                isTouched,
                // isLoading,
                error,
                setQuery,
                // setIsLoading,
                setIsTouched,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
