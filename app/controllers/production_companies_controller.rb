class ProductionCompaniesController < ApplicationController
  before_action :set_production_company, only: [:show, :update, :destroy]

  # GET /production_companies
  def index
    @production_companies = ProductionCompany.all

    render json: @production_companies
  end

  # GET /production_companies/1
  def show
    render json: @production_company
  end

  # POST /production_companies
  def create
    @production_company = ProductionCompany.new(production_company_params)

    if @production_company.save
      render json: @production_company, status: :created, location: @production_company
    else
      render json: @production_company.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /production_companies/1
  def update
    if @production_company.update(production_company_params)
      render json: @production_company
    else
      render json: @production_company.errors, status: :unprocessable_entity
    end
  end

  # DELETE /production_companies/1
  def destroy
    @production_company.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_production_company
      @production_company = ProductionCompany.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def production_company_params
      params.require(:production_company).permit(:company_name, :description, :headquarters)
    end
end
