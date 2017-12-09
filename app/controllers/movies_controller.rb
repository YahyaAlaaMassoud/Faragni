class MoviesController < ApplicationController
  before_action :set_movie, only: [:show, :update, :destroy]
  before_action :set_single_user, only: :index
  skip_before_action :authenticate_user, only: [:index, :show]
  
  # GET /movies
  def index
    if @single_user.present?
      @movies = @single_user.watchlist
    else
      @movies = params[:genre].present?? Genre.where(name: params[:genre]).first.movies : Movie.all
      if(params[:criteria].present?)
        @movies = @movies.order(params[:criteria].to_sym).all
      else
        @movies = @movies.all
      end
    end
    render json: @movies.to_json(:methods => [:Poster, :Genres])
  end

  # GET /movies/1
  def show
    render json: @movie.to_json(:methods => [:Poster, :Genres])    
  end

  # POST /movies
  def create
    @movie = Movie.new(create_movie_params)

    if @movie.save
      render json: @movie.to_json(:methods => [:Poster, :Genres]), status: :created, location: @movie
    else
      render json: @movie.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /movies/1
  def update
    if @movie.update(movie_params)
      render json: @movie.to_json(:methods => [:Poster, :Genres])
    else
      render json: @movie.errors, status: :unprocessable_entity
    end
  end

  # DELETE /movies/1
  def destroy
    @movie.destroy
  end

  #GET /user/get_new_recommendations
  # not implemented yet, this should call the training model
  def get_new_recommendations
    user = current_user
    @recommended_movies = RecommendationEngine::Recommender.recommend(user)
    render json: @recommended_movies.to_json
  end

  # GET /movies/:movie_id/add_to_watchlist
  def add_to_watchlist
    if current_user.add_to_watchlist(params[:movie_id])
      render json: current_user.watchlist
    else
      render json: current_user.errors, status: :unprocessable_entity
    end
  end

  # GET /movies/:movie_id/remove_from_watchlist
  def remove_from_watchlist
    if current_user.remove_from_watchlist(params[:movie_id])
      render json: current_user.watchlist
    else
      render json: current_user.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_movie
      @movie = Movie.find(params[:id])
    end

    def set_single_user
      if(request.url["watchlist"].present?)
        @single_user = current_user
      else
        @single_user = nil
      end
    end

    # Only allow a trusted parameter "white list" through.
    def create_movie_params
      p = movie_params
      p[:poster_base] = p[:Poster]
      p.delete :Poster
      p.delete :ProductionCompany
      return p
    end
    
    def movie_params
      p = params.permit(:imdbID, :imdbVotes, :imdbRating, :Title, :Language, :TagLine, :ReleaseDate, :Poster, :Popularity, :Actors, :BoxOffice, :Country, :Genres, :Director, :Metascore, :Plot, :Runtime, :Website, :Writer, :Year, :ProductionCompany, :criteria)
      p[:genres] = Genre.get_genres_from_string(p[:Genres])
      p.delete :Genres
      p.delete :ProductionCompany
      return p
    end
end
