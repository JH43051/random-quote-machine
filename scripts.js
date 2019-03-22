//const projectName = "random-quote-machine";
//localStorage.setItem('example_project', 'Random Quote Machine');

let quotesData = null;

function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var currentQuote = '', currentAuthor = '';

// Opens a new window when sharing quote
function openURL(url){
  window.open(url, 'Share', 'width=800, height=600, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

// Grabs list of possible quotes in JSON format via ajax call
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

function getRandomQuote() {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
}

function getQuote() {

  let randomQuote = getRandomQuote();
  
  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  if(inIframe())
  {
    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));

    $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
  }

  // Dymnically formats and inserts a citation into the blockquote element
  $("#text").attr("cite", "https://en.wikipedia.org/wiki/" + currentAuthor.replace(" ", "_"));
  
  $("#quote-text").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({opacity: 1}, 500);
      $('#text').html('<span class="fas fa-quote-left"></span>' + randomQuote.quote);
    }
  );

  $("#author-text").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({opacity: 1}, 500);
      $('#author').html("-" + randomQuote.author);
    }
  );

  var color = Math.floor(Math.random() * colors.length);

  $("main").animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );

  $("button, a").animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
}


// Runs this code block after html fully loads
$(document).ready(
  function() {
    getQuotes().then(() => {
      getQuote();
    });
    

    $('#new-quote').on('click', getQuote);

    $('#tweet-quote').on('click', function() {
      if(!inIframe()) {
        openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
      }
    });

    $('#tumblr-quote').on('click', function() {
      if(!inIframe()) {
        openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
      }
    });
  }
);