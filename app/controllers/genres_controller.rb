class GenresController < ApplicationController
  before_action :set_genre, only: [:show, :update, :destroy]

  # GET /genres
  def index
    @genres = Genre.all
    render json: @genres.to_json(:except => :id, :methods => :GenreID)
  end

  # GET /genres/1
  def show
    render json: @genres.to_json(:except => :id, :methods => :GenreID)
  end

  # POST /genres
  def create
    @genre = Genre.new(genre_params)

    if @genre.save
      render json: @genres.to_json(:except => :id, :methods => :GenreID), status: :created, location: @genre
    else
      render json: @genre.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /genres/1
  def update
    if @genre.update(genre_params)
      render json: @genres.to_json(:except => :id, :methods => :GenreID)
    else
      render json: @genre.errors, status: :unprocessable_entity
    end
  end

  # DELETE /genres/1
  def destroy
    @genre.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_genre
      @genre = Genre.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def genre_params
      params.permit(:Name)
    end
end
