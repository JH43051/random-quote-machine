////////////////////////////////////////////////////////////////////////////////////////
// NOTE: This code requires the following libraries to function properyly:            //
//                                                                                    //
// jQuery (https://jquery.com/),                                                      //
// jQuery Color Animation Plugin (https://bitstorm.org/jquery/color-animation/)       //
////////////////////////////////////////////////////////////////////////////////////////


// Global Variables
let quotesData = null;
var colors = ['#16a085',
              '#27ae60',
              '#2c3e50',
              '#f39c12',
              '#e74c3c',
              '#9b59b6',
              '#FB6964',
              '#342224',
              "#472E32",
              "#BDBB99",
              "#77B1A9",
              "#73A857"];

// Code to run after window load
$(document).ready(function() {
  getQuotes().then(() => getQuote());

  $('#new-quote').on('click', getQuote);
});

// Grabs list of possible quotes in JSON format via AJAX
function getQuotes() {
  return $.ajax({
    headers: {
      Accept: "application/json"
    },
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function(jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
      }
    },
     error: function() {
      alert("Sorry, the internet has run out of quotes! Please check back soon.");
    }
  });
}

function getQuote() {
  // Grabs a random quote object from the JSON data
  let randomQuote = quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
  let currentQuote = randomQuote.quote;
  let currentAuthor = randomQuote.author;
  // Inserts references into Twitter/Tumblr link elements
  $('#tweet-quote').attr('href',
                          'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
                          encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
  $('#tumblr-quote').attr('href',
                          'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
                          encodeURIComponent(currentAuthor) +
                          '&content=' +
                          encodeURIComponent(currentQuote) +
                          '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
  // Inserts a citation into the blockquote element
  $("#text").attr("cite", "https://en.wikipedia.org/wiki/" + currentAuthor.replace(" ", "_"));
  // Inserts the quote into the blockquote element and animates it
  $("#quote-text").animate(
     { opacity: 0 },
     500,
    function() {
      $(this).animate({opacity: 1}, 500);
      $('#text').html('<span class="fas fa-quote-left"></span>' + randomQuote.quote);
     }
  );
  // Inserts the author into the paragraph element and animates it
  $("#author-text").animate(
     { opacity: 0 },
     500,
    function() {
      $(this).animate({opacity: 1}, 500);
      $('#author').html("-" + randomQuote.author);
     }
  );
  // Picks a random color from our color list
  var color = Math.floor(Math.random() * colors.length);
  // Animates the background color
  $("main").animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
     1000
  );
  // Animates the button colors
  $("button, a").animate(
     {
       backgroundColor: colors[color]
    },
    1000
  );
}
