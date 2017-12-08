class WatchlistsController < ApplicationController
  before_action :set_watchlist, only: [:show, :update, :destroy]

  # GET /watchlists
  # GET /watchlists.json
  def index
    @watchlists = Watchlist.all
  end

  # GET /watchlists/1
  # GET /watchlists/1.json
  def show
  end

  # POST /watchlists
  # POST /watchlists.json
  def create
    @watchlist = Watchlist.new(watchlist_params)

    if @watchlist.save
      render :show, status: :created, location: @watchlist
    else
      render json: @watchlist.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /watchlists/1
  # PATCH/PUT /watchlists/1.json
  def update
    if @watchlist.update(watchlist_params)
      render :show, status: :ok, location: @watchlist
    else
      render json: @watchlist.errors, status: :unprocessable_entity
    end
  end

  # DELETE /watchlists/1
  # DELETE /watchlists/1.json
  def destroy
    @watchlist.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_watchlist
      @watchlist = Watchlist.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def watchlist_params
      params.fetch(:watchlist, {})
    end
end
