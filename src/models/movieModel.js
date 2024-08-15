import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  description: String,
  director: {
    type: String,
    required: true
  },
  length: Number,
  rating: Number,
  genres: [String],
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const Movie = new mongoose.model("Movie", movieSchema);

export default Movie;
