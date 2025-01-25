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

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
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
end
