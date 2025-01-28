class MoviesController < ApplicationController
  def index
    if params[:genre]
      @movies = Movie.where("JSON_CONTAINS(genre_ids, ?)", params[:genre])
    else
      @movies = Movie.all
    end
    render json: @movies
  end

  def populars
    threshold = 500
    @movies = Movie.where("popularity > ?", threshold).order(popularity: :desc)
    render json: @movies
  end

  def by_genre
    genre_id = params[:id]
    @movies = Movie.where("genre_ids LIKE ?", "%#{genre_id}%")
    render json: @movies
  end

  def top_rated
    threshold = 8
    @movies = Movie.where("vote_average > ?", threshold).order(vote_average: :desc)
    render json: @movies
  end

  def create
    @movie = Movie.new(movie_params)
    if @movie.save
      render json: @movie, status: :created
    else
      render json: @movie.errors, status: :unprocessable_entity
    end
  end

  def search_by_name
    name = params[:name].downcase.strip
    normalized_name = name.gsub(/[^a-z0-9\s]/, '')
    keywords = normalized_name.split
  
    query = keywords.map { |word| "LOWER(REPLACE(title, '-', '')) LIKE ?" }.join(' AND ')
    query_params = keywords.map { |word| "%#{word}%" }
  
    movies = Movie.where(query, *query_params)
  
    if movies.any?
      render json: movies, status: :ok
    else
      render json: {}, status: :not_found
    end
  end

  private

  def movie_params
    params.require(:movie).permit(:movie_id, :adult, :backdrop_path, :genre_ids, :original_language, :original_title, :overview, :popularity, :poster_path, :release_date, :title, :video, :vote_average, :vote_count)
  end
end
