require 'test_helper'

class ModelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @model = models(:one)
  end

  test "should get index" do
    get models_url, as: :json
    assert_response :success
  end

  test "should create model" do
    assert_difference('Model.count') do
      post models_url, params: { model: { watchlists: @model.watchlists } }, as: :json
    end

    assert_response 201
  end

  test "should show model" do
    get model_url(@model), as: :json
    assert_response :success
  end

  test "should update model" do
    patch model_url(@model), params: { model: { watchlists: @model.watchlists } }, as: :json
    assert_response 200
  end

  test "should destroy model" do
    assert_difference('Model.count', -1) do
      delete model_url(@model), as: :json
    end

    assert_response 204
  end
end
