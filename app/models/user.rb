class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  belongs_to :plan
  
  attr_accessor :stripe_card_token
  # If Pro user passes validations (email, pw), call Stripe to set
  # up a Pro subscription after charging the customer's card. Then
  # Stripe responds with customer data, then store customer.id as
  # as the customer token, then save the user
  def save_with_subscription
    if valid?
      customer = Stripe::Customer.create(email: email, plan: ENV['stripe_pro_plan_id'], card: stripe_card_token)
      self.stripe_customer_token = customer.id
      save!
    end
  end
end
