class RatingsController < ApplicationController
  before_action :set_rating, only: [:show, :update, :destroy]
  before_action :set_single_user, only: :index
  
  # GET /ratings
  def index
    if(@single_user.present?)
      @ratings = @single_user.ratings
    else
      if params[:movie_id].present?
        @ratings = Rating.where(movie_id: params[:movie_id]).all
      else
        @ratings = Rating.all
      end
    end

    render json: @ratings.to_json(:except => [:movie_id, :user_id], :methods => [:MovieID, :UserID])
  end

  # GET /ratings/1
  def show
    render json: @rating.to_json(:except => [:movie_id, :user_id], :methods => [:MovieID, :UserID])
  end

  # POST /ratings
  def create
    @rating = Rating.new(rating_params)

    if @rating.save
      render json: @rating.to_json(:except => [:movie_id, :user_id], :methods => [:MovieID, :UserID]), status: :created, location: @rating
    else
      render json: @rating.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /ratings/1
  def update
    if @rating.update(rating_params)
      render json: @rating.to_json(:except => [:movie_id, :user_id], :methods => [:MovieID, :UserID])
    else
      render json: @rating.errors, status: :unprocessable_entity
    end
  end

  # DELETE /ratings/1
  def destroy
    @rating.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_rating
      @rating = Rating.find(params[:id])
    end

    def set_single_user
      if(params[:user_id].blank? && request.url["users"].blank? && request.url["user"].present?)
        @single_user = current_user
      elsif (params[:user_id].present?)
        @single_user = User.find(params[:user_id])
      else
        @single_user = nil
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def rating_params
      p = params.permit(:Rating, :Review, :MovieID)
      p[:rating] = p[:Rating]
      p[:review] = p[:Review]
      p[:movie_id] = p[:MovieID]
      p.delete :Rating
      p.delete :Review
      p.delete :MovieID
      p[:user_id] = current_user.id
      return p
    end
end
