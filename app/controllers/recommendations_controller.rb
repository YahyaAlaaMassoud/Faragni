class RecommendationsController < ApplicationController
  before_action :set_recommendation, only: [:show, :update, :destroy]
  before_action :set_single_user, only: :index

  # GET /recommendations
  def index
    if @single_user.present?
      if params[:status].present?
        @recommendations = @single_user.recommendations.send(params[:status].to_sym)
      else
        @recommendations = @single_user.recommendations
      end
    elsif params[:movie_id].present?
        @recommendations = Movie.find(params[:movie_id]).recommendations
    else
        @recommendations = Recommendation.all
    end

    render json: @recommendations.to_json(:except => [:movie_id, :from_user_id, :to_user_id, :id],
                                          :methods => [:MovieID, :ByUserID, :ToUserID, :RecommendationID])
  end

  # GET /recommendations/1
  def show 
    render json: @recommendation.to_json(:except => [:movie_id, :from_user_id, :to_user_id, :id],
                                         :methods => [:MovieID, :ByUserID, :ToUserID, :RecommendationID])
  end

  # POST /users/:id/recommend
  def create
    @recommendation = Recommendation.new(recommendation_params)

    if @recommendation.save
      render json: @recommendation.to_json(:except => [:movie_id, :from_user_id, :to_user_id, :id],
                                           :methods => [:MovieID, :ByUserID, :ToUserID, :RecommendationID]),
                                           status: :created,
                                           location: @recommendation
    else
      render json: @recommendation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /recommendations/1
  def update
    if @recommendation.update(recommendation_params)
      render json: @recommendation.to_json(:except => [:movie_id, :from_user_id, :to_user_id, :id],
                                           :methods => [:MovieID, :ByUserID, :ToUserID, :RecommendationID]),
                                           status: :ok,
                                           location: @recommendation   
    else
      render json: @recommendation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /recommendations/1
  def destroy
    @recommendation.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recommendation
      @recommendation = Recommendation.find(params[:id] || params[:recommendation_id])
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
    def recommendation_params
      p = params.permit(:ByUserID, :ToUserID, :MovieID, :ExpectedRating, :UserRating, :Message)
      p[:to_user_id] = params[:user_id] if p[:to_user_id].blank? && p[:user_id].present?
      p[:from_user_id] = current_user.id unless request.method == "PATCH" || request.method == "PUT"
      p[:movie_id] = p[:MovieID]
      p.delete :MovieID
      return p
    end
end
