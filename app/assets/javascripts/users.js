// Indicate $ and Stripe are defined elsewhere.
/* global $, Stripe */

$(document).on('turbolinks:load', function () {
    var proForm = $('#pro_form');
    var signupBtn = $('#form-signup-btn');
    // Set Stripe public key
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));
    
    // Prevent default behavior when formed submitted
    // and retrieve Stripe user token
    signupBtn.click(function(event) {
        event.preventDefault();
        signupBtn.val("Processing...").prop("disabled", true);
        
        // Collect credit card fields
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
        
        // Use Stripe JS library to check for card errors
        var error = false;
        
        // Validate card num
        if (!Stripe.card.validateCardNumber(ccNum)) {
            error = true;
            alert('The credit card number appears to be invalid.');
        }
        
        // Validate cvc num
        if (!Stripe.card.validateCVC(cvcNum)) {
            error = true;
            alert('The CVC number appears to be invalid.');
        }
        
        // Validate expiry date
        if (!Stripe.card.validateExpiry(expMonth, expYear)) {
            error = true;
            alert('The expiration date appears to be invalid.');
        }
        
        if (error) {
            signupBtn.prop('diabled', false).val('Sign up');
        } else {
            // Send the card details to Stripe
            Stripe.createToken({
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
            }, stripeResponseHandler);
        }
        
        return false;
    });
    
    // Callback function for Stripe response
    function stripeResponseHandler(status, response) {
        // Get token from response
        var token = response.id;
        
        // Inject token into hidden field
        proForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
        
        // Submit form
        proForm.get(0).submit();
    }
});