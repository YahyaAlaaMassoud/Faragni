class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :set_single_user, only: [:index]

  # GET /users
  def index
    if(@single_user.present?)
      @users = @single_user.send((request.url["followers"] || request.url["followings"]).to_sym)
    else
      @users = User.all
    end

    render json: @users.to_json(:only => [:FirstName, :LastName, :UserName, :DateOfBirth, :JoiningDate, :bio, :Email], :methods => :profilePic)
  end

  # GET /users/1
  def show
    render json: @user.to_json(:only => [:FirstName, :LastName, :UserName, :DateOfBirth, :JoiningDate, :bio, :Email], :methods => :profilePic)
  end

  # POST /users
  def create
    @user = User.new(create_user_params)

    if @user.save
      render json: @user.to_json(:only => [:FirstName, :LastName, :UserName, :DateOfBirth, :JoiningDate, :bio, :Email], :methods => :profilePic), status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(create_user_params)
      render json: @user.to_json(:only => [:FirstName, :LastName, :UserName, :DateOfBirth, :JoiningDate, :bio, :Email], :methods => :profilePic)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  # GET /users/:user_id/follow
  def follow
    if current_user.follow(params[:user_id])
      render json: current_user.followings.to_json(:only => [:FirstName, :LastName, :UserName, :DateOfBirth, :JoiningDate, :bio, :Email], :methods => :profilePic)
    else
      render json: current_user.errors, status: :unprocessable_entity
    end
  end

  # GET /users/:user_id/unfollow
  def unfollow
    if current_user.unfollow(params[:user_id])
      render json: current_user.followings.to_json(:only => [:FirstName, :LastName, :UserName, :DateOfBirth, :JoiningDate, :bio, :Email], :methods => :profilePic)
    else
      render json: current_user.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      if(params[:id].present?)
        @user = User.find(params[:id])
      else
        @user = current_user
      end
    end

    def set_single_user
      if(params[:id].blank? && request.url["users"].blank?)
        @single_user = current_user
      elsif (params[:user_id].present?)
        @single_user = User.find(params[:user_id])
      else
        @single_user = nil
      end
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:FirstName, :LastName, :DateOfBirth, :UserName, :Email, :Password, :bio, :profilePic)
    end

    def create_user_params
      p = user_params
      p[:profilePic_base] = p[:profilePic] if p[:profilePic].present?
      p.delete :profilePic 
      p[:password] = p[:Password] if p[:Password].present?
      p.delete :Password
      return p
    end
end
