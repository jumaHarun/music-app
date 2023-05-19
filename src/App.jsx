import { useContext, useRef } from 'react';
import { AppContext } from './context/AppContext';
import './App.css';

function App() {
    const inputRef = useRef(null);
    const {
        setQuery,
        // setIsLoading,
        artists,
        tracks,
        isError,
        // isLoading,
        error,
    } = useContext(AppContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        // setIsLoading(true);

        setQuery(inputRef.current.value);
    };

    return (
        <>
            <h1>Muisc App</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" name="query" ref={inputRef} />
                <button type="submit">Submit</button>
            </form>

            <article>
                {isError ? (
                    <h4 className="error">{error.message}!</h4>
                ) 
                // : isLoading ? (
                //     <h4 className="loading">Loading...</h4>
                // ) 
                : (
                    <>
                        {tracks.length > 0 && (
                            <section className="tracks">
                                <h2>Top 5 Tracks</h2>
                                <ol>
                                    {tracks.map((el) => (
                                        <li key={el.track.key}>
                                            {el.track.title} -{' '}
                                            {el.track.subtitle}
                                        </li>
                                    ))}
                                </ol>
                            </section>
                        )}
                        {artists.length > 0 && (
                            <section className="artists">
                                <h2>Top 5 Artists</h2>
                                <ol>
                                    {artists.map((el) => (
                                        <li key={el.artist.adamid}>
                                            {el.artist.name}
                                        </li>
                                    ))}
                                </ol>
                            </section>
                        )}
                    </>
                )}
            </article>
        </>
    );
}

export default App;
