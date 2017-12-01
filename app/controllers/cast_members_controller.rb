class CastMembersController < ApplicationController
  before_action :set_cast_member, only: [:show, :update, :destroy]

  # GET /cast_members
  def index
    @cast_members = CastMember.all

    render json: @cast_members
  end

  # GET /cast_members/1
  def show
    render json: @cast_member
  end

  # POST /cast_members
  def create
    @cast_member = CastMember.new(cast_member_params)

    if @cast_member.save
      render json: @cast_member, status: :created, location: @cast_member
    else
      render json: @cast_member.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cast_members/1
  def update
    if @cast_member.update(cast_member_params)
      render json: @cast_member
    else
      render json: @cast_member.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cast_members/1
  def destroy
    @cast_member.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cast_member
      @cast_member = CastMember.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def cast_member_params
      params.require(:cast_member).permit(:first_name, :last_name, :age, :popularity, :date_of_birth, :date_of_death, :biography)
    end
end
