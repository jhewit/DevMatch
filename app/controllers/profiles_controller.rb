class ProfilesController < ApplicationController
    
    # GET /users/:user_id/profile/new
    def new
        # Render blank profile details form
        @profile = Profile.new
    end
    
    # POST /users/:user_id/profile
    def create
        # Ensure that we have the user who is filling out the form
        @user = User.find( params[:user_id] )
        # Create profile linked to this specific user
        @profile = @user.build_profile( profile_params )
        if @profile.save
            flash[:success] = "Profile updated"
            redirect_to user_path( params[:user_id] )
        else
            render action: :new
        end
    end
    
    # Whitelist profile form fields
    private
        def profile_params
            params.require(:profile).permit(:first_name, :last_name, :avatar, :job_title, :phone_number, :contact_email, :description)
        end
end