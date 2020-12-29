class ContactMailer < ActionMailer::Base
    default_to: 'johnathan.hewit@outlook.com'
    
    def contact_email(name, email, body)
        @name = name
        @email = email
        @body = body
        
        mail(from: email, subject: 'Contact Form Message')
    end
end