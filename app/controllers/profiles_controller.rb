class ProfilesController < ApplicationController
    
    # GET /users/:user_id/profile/new
    def new
        # Render blank profile details form
        @profile = Profile.new
    end
end