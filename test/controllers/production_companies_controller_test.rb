require 'test_helper'

class ProductionCompaniesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @production_company = production_companies(:one)
  end

  test "should get index" do
    get production_companies_url, as: :json
    assert_response :success
  end

  test "should create production_company" do
    assert_difference('ProductionCompany.count') do
      post production_companies_url, params: { production_company: { company_name: @production_company.company_name, description: @production_company.description, headquarters: @production_company.headquarters } }, as: :json
    end

    assert_response 201
  end

  test "should show production_company" do
    get production_company_url(@production_company), as: :json
    assert_response :success
  end

  test "should update production_company" do
    patch production_company_url(@production_company), params: { production_company: { company_name: @production_company.company_name, description: @production_company.description, headquarters: @production_company.headquarters } }, as: :json
    assert_response 200
  end

  test "should destroy production_company" do
    assert_difference('ProductionCompany.count', -1) do
      delete production_company_url(@production_company), as: :json
    end

    assert_response 204
  end
end
