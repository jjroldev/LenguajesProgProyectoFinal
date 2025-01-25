class UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def add_favorite
    user = User.find_by(email: params[:email]) # Buscar el usuario por correo
    movie = Movie.find_or_create_by(movie_params) # Buscar o crear la película
  
    if user && movie
      user.movies << movie unless user.movies.include?(movie) # Evitar duplicados
      render json: { message: "Película agregada a favoritos exitosamente" }, status: :ok
    else
      render json: { error: "Usuario o película no encontrados" }, status: :not_found
    end
  end
  
  def remove_favorite
    user = User.find_by(email: params[:email]) # Buscar el usuario por correo
    movie = Movie.find_by(movie_id: params[:movie][:movie_id]) # Buscar la película por su movie_id

    if user && movie && user.movies.include?(movie)
      user.movies.delete(movie) # Eliminar la película de los favoritos del usuario
      render json: { message: "Película eliminada de favoritos exitosamente" }, status: :ok
    else
      render json: { error: "Usuario o película no encontrados" }, status: :not_found
    end
  end


  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy_by_email
    user = User.find_by(email: params[:email]) # Buscar usuario por email
  
    if user
      user.destroy
      render json: { message: "Usuario eliminado exitosamente" }, status: :ok
    else
      render json: { error: "Usuario no encontrado" }, status: :not_found
    end
  end
  

  def favorites
    user = User.find_by(email: params[:email]) # Buscar el usuario por correo
    if user
      render json: user.movies, status: :ok # Retornar las películas favoritas
    else
      render json: { error: "Usuario no encontrado" }, status: :not_found
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :last_name, :email, :password)
  end

  def movie_params
    params.require(:movie).permit(
      :adult,
      :backdrop_path,
      :genre_ids,
      :movie_id,
      :original_language,
      :original_title,
      :overview,
      :popularity,
      :poster_path,
      :release_date,
      :title,
      :video,
      :vote_average,
      :vote_count
    )
  end
end
