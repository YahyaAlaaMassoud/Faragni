class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users.to_json(:methods => :profilePic_url)
  end

  # GET /users/1
  def show
    render json: @user.to_json(:methods => :profilePic_url)
  end

  # POST /users
  def create
    @user = User.new(create_user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      if(params[:id].present?)
        @user = User.find(params[:id])
      else
        @user = User.first
      end
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:FirstName, :LastName, :DateOfBirth, :UserName, :Email, :Password, :bio, :profilePic)
    end

    def create_user_params
      p = user_params
      p[:user][:profilePic_base] = p[:profilePic]
      p[:user].delete :profilePic
      p[:user][:password] = p[:Password]
      p[:user].delete :Password
    end
end
