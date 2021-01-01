class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  # Check if devise form controller
  before_action :configure_permitted_parameters, if: :devise_controller?
  # Whitelist form field for devise so we can process them
  protected
    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:stripe_card_token, :email, :password, :password_confirmation) }
    end
end
