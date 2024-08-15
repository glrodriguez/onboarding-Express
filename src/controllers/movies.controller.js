import Movie from "../models/movieModel.js";


// Create movie from body
export const saveMovie = async (req, res) => {
  try {
    const { title, year, description, director, length, rating, genres } = req.body;

    // Ver que pasa cuando no recibo alguno de los datos que no son obligatorios. Queda la variable undefined? como creo despues el objeto
    const movie = new Movie({
      title,
      year,
      description,
      director,
      length,
      rating,
      genres
    });

    await movie.save();

    res.status(201).json({ message: 'Movie created correctly', movie });
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(500).json({ error: 'Error creating movie' });
  }
};

// Get all movie list
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({isDeleted: false});

    res.status(200).json(movies);
  } catch (error) {
    console.error('Error getting movies: ', error);
    res.status(500).json({ error: 'Error getting movies' });
  }
};

// Get movie data by id
export const getMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);

    res.status(200).json(movie);
  } catch (error) {
    console.error('Error getting movie data: ', error);
    res.status(500).json({ error: 'Error getting movie data' });
  }
};

// Update movie by id
export const updateMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, year, description, director, length, rating, genres } = req.body;

    const movie = await Movie.findByIdAndUpdate(
      id,
      {
        title,
        year,
        description,
        director,
        length,
        rating,
        genres
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie updated correctly', movie });
  } catch (error) {
    console.error('Error updating movie: ', error);
    res.status(500).json({ error: 'Error updating movie' });
  }
}

// Delete movie (soft) by id
export const deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;

    const movie = await Movie.findByIdAndUpdate(
      id,
      {
        isDeleted: true
      },
      {
        new: true
      }
    );

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie deleted correctly', movie });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ error: 'Error deleting movie' });
  }
};
