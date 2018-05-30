
$("#paypal-button").submit(function() {
  if ($("#paypal-button").doSumit == "no") {
    return;
  }
  $("#paypal-button").doSubmit = "no";
  var currentUserId = $("#currentUserId").text();
  var ebookId = $("#ebookId");
  if (!currentUserId) {
    return alert("user id missing, can't purchase");
  }
  if (!ebookId) {
    return alert("ebook id missing, can't purchase");
  }
  var secretKey = 
  var data
  $.ajax({
    url: "/ebooks/" + ebookId + "/buy",
    method: "POST"
  });
});

// Courtesy of: https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/add-paypal-button/
// to purchase ebook
paypal.Button.render({
  env: 'production', // Or 'sandbox',

  commit: true, // Show a 'Pay Now' button

  payment: function(data, actions) {
    
  },

  onAuthorize: function(data, actions) {
    /*
     * Execute the payment here
     */
  },

  onCancel: function(data, actions) {
    /*
     * Buyer cancelled the payment
     */
  },

  onError: function(err) {
    /*
     * An error occurred during the transaction
     */
  }
}, '#NOT paypal-button');