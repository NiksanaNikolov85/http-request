import React, {useState, useEffect} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-fa3d8-default-rtdb.firebaseio.com/movies.json');
      console.log(response, 77777);
      if (!response.ok) {
        throw new Error('Something went wrong...');
      }
      const data = await response.json();
      console.log(data, 888888);
      const loadedMovies = [];
      for (const keys in data) {
        loadedMovies.push({
          id: keys,
          title: data[keys].title,
          openingText: data[keys].openingText,
          releaseDate: data[keys].releaseDate
        })
      }
      // const transformMovies = loadedMovies.map(movieData => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseData: movieData.release_date
      //   }
      // });
      setMovies(loadedMovies);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      }
    setIsLoading(false);
   }

  const AddMovieHandler = async (movie) => {
    console.log(movie);
    const response = await fetch('https://react-http-fa3d8-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application.json'
      }
    })
    const data = await response.json();
    console.log(data);
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={AddMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>Loading ...</p>}
        {!isLoading && movies.length === 0 && !error && <p>No movies loaded</p>}
        <MoviesList movies={movies} />
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
