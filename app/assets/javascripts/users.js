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
        
        // Collect credit card fields
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
        
        // Send the card details to Stripe
        Stripe.createToken({
            number: ccNum,
            cvc: cvcNum,
            exp_month: expMonth,
            exp_year: expYear
        }, stripeResponseHandler);
    });
});