import React, {useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

const App1 = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('https://react-http-fa3d8-default-rtdb.firebaseio.com/movies.json');
            if (!response.ok) {
                throw new Error('Something went wrong !')
            }
            const loadedMovies = [];
            const data = await response.json();
            for (const keys in data) {
                console.log(data);
                loadedMovies.push({
                    id: keys,
                    title: data[keys].title,
                    openingText: data[keys].openingText,
                    releaseDate: data[keys].releaseDate
                })
            }
            
            setMovies(loadedMovies)
            setIsLoading(false);
            

        } catch (error){
            setError(error.message);
            console.log(error.message);
            setIsLoading(false);
        }
    }

    const AddMovieHandler = async (movie) => {
        const ha =  JSON.stringify(movie);
        const loadedMovies = [];
        const response = await fetch('https://react-http-fa3d8-default-rtdb.firebaseio.com/movies.json', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application.json'
            }
        })
        const data = await response.json();
    }

    return (
        <div>
            <section>
                <AddMovie onAddMovie={AddMovieHandler} />
            </section>
            <section>
                <button onClick={fetchMovies}>Fetch Movies</button>
            </section>
            <section>
                {isLoading && <p>Loading ...</p>}
                {error && <p>{error}</p>}
                {!isLoading && !error && movies.length === 0 && <p>No movies loaded</p>}
                <MoviesList movies={movies} />
            </section>
        </div>
    )
}

export default App1;