require 'test_helper'

class CastMembersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cast_member = cast_members(:one)
  end

  test "should get index" do
    get cast_members_url, as: :json
    assert_response :success
  end

  test "should create cast_member" do
    assert_difference('CastMember.count') do
      post cast_members_url, params: { cast_member: { age: @cast_member.age, biography: @cast_member.biography, date_of_birth: @cast_member.date_of_birth, date_of_death: @cast_member.date_of_death, first_name: @cast_member.first_name, last_name: @cast_member.last_name, popularity: @cast_member.popularity } }, as: :json
    end

    assert_response 201
  end

  test "should show cast_member" do
    get cast_member_url(@cast_member), as: :json
    assert_response :success
  end

  test "should update cast_member" do
    patch cast_member_url(@cast_member), params: { cast_member: { age: @cast_member.age, biography: @cast_member.biography, date_of_birth: @cast_member.date_of_birth, date_of_death: @cast_member.date_of_death, first_name: @cast_member.first_name, last_name: @cast_member.last_name, popularity: @cast_member.popularity } }, as: :json
    assert_response 200
  end

  test "should destroy cast_member" do
    assert_difference('CastMember.count', -1) do
      delete cast_member_url(@cast_member), as: :json
    end

    assert_response 204
  end
end
