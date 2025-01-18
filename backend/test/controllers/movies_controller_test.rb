require "test_helper"

class MoviesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @movie = movies(:one)
  end

  test "should get index" do
    get movies_url, as: :json
    assert_response :success
  end

  test "should create movie" do
    assert_difference("Movie.count") do
      post movies_url, params: { movie: { adult: @movie.adult, backdrop_path: @movie.backdrop_path, budget: @movie.budget, homepage: @movie.homepage, imdb_id: @movie.imdb_id, original_language: @movie.original_language, original_title: @movie.original_title, overview: @movie.overview, popularity: @movie.popularity, poster_path: @movie.poster_path, release_date: @movie.release_date, revenue: @movie.revenue, runtime: @movie.runtime, status: @movie.status, tagline: @movie.tagline, title: @movie.title, video: @movie.video, vote_average: @movie.vote_average, vote_count: @movie.vote_count } }, as: :json
    end

    assert_response :created
  end

  test "should show movie" do
    get movie_url(@movie), as: :json
    assert_response :success
  end

  test "should update movie" do
    patch movie_url(@movie), params: { movie: { adult: @movie.adult, backdrop_path: @movie.backdrop_path, budget: @movie.budget, homepage: @movie.homepage, imdb_id: @movie.imdb_id, original_language: @movie.original_language, original_title: @movie.original_title, overview: @movie.overview, popularity: @movie.popularity, poster_path: @movie.poster_path, release_date: @movie.release_date, revenue: @movie.revenue, runtime: @movie.runtime, status: @movie.status, tagline: @movie.tagline, title: @movie.title, video: @movie.video, vote_average: @movie.vote_average, vote_count: @movie.vote_count } }, as: :json
    assert_response :success
  end

  test "should destroy movie" do
    assert_difference("Movie.count", -1) do
      delete movie_url(@movie), as: :json
    end

    assert_response :no_content
  end
end
