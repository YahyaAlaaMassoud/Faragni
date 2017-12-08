class MoviesController < ApplicationController
  before_action :set_movie, only: [:show, :update, :destroy]

  # GET /movies
  def index
    @movies = Movie.all

    render json: @movies.to_json(:methods => :poster_url)
  end

  # GET /movies/1
  def show
    render json: @movie.to_json(:methods => :poster_url)    
  end

  # POST /movies
  def create
    @movie = Movie.new(create_movie_params)

    if @movie.save
      render json: @movie, status: :created, location: @movie
    else
      render json: @movie.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /movies/1
  def update
    if @movie.update(movie_params)
      render json: @movie
    else
      render json: @movie.errors, status: :unprocessable_entity
    end
  end

  # DELETE /movies/1
  def destroy
    @movie.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_movie
      @movie = Movie.find(params[:id])
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
      params.require(:movie).permit(:imdbID, :imdbVotes, :imdbRating, :Title, :Language, :TagLine, :ReleaseDate, :Poster, :Popularity, :Actors, :BoxOffice, :Country, :Director, :Metascore, :Plot, :Runtime, :Website, :Writer, :Year, :ProductionCompany)
      p.delete :ProductionCompany
      return p
    end
end
