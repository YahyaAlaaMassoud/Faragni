class RecommendationsController < ApplicationController
  before_action :set_recommendation, only: [:show, :update, :destroy]

  # GET /recommendations
  def index
    @recommendations = Recommendation.all

    render json: @recommendations
  end

  # GET /recommendations/1
  def show 
    render json: @recommendation
  end

  # POST /recommendations
  def create
    @recommendation = Recommendation.new(recommendation_params)

    if @recommendation.save
      render json: @recommendation, status: :created, location: @recommendation
    else
      render json: @recommendation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /recommendations/1
  def update
    if @recommendation.update(recommendation_params)
      render json: @recommendation, status: :ok, location: @recommendation
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
      @recommendation = Recommendation.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def recommendation_params
      params.require(:recommendation).permit(:from_user_id, :to_user_id, :ExpectedRating, :UserRating, :Message)
    end
end
