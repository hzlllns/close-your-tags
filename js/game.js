// game developed based on
// http://www.codecademy.com/forum_questions/519e43b2d7d159a6e9000534


//store tags in array
var tiles = [];

var arrColor = ['black', 'navy','red', 'blue', 'green', 'orange', 'yellow', 'lime',  'black', 'navy', 'red', 'blue', 'green', 'orange', 'yellow', 'lime'];

//init
var mousemove = 0;

//time 
var timeOpen = 700;
var Timeout = 2000;
var timeCoin = 0;
var timeClick = 0;

//matching
var clickColor2 = 0;
var clickColor1 = 0;


//randomize tiles
var shuffleTiles = function(cards) {
  var d, c, b = cards.length;

   while (b) {
    c = Math.floor(Math.random() * b);
    d = cards[--b];
    cards[b] = cards[c];
    cards[c] = d;
   }
   return cards;
}

var startGame = function() {
    
    shuffleTiles(arrColor);
     
    for(i=0; i<16; i++) {
          $('#game-field').append('<div class="card ' + arrColor[i] + '">' + '</div>');
     }
     
    setTimeout(function() {
          $('.card').addClass('cardOut');
          $('.layer').css('z-index', -1);
    }, Timeout);
     
}

var gamePlay = function() {
     $('.card').click(function(){
          
          timeClick++;
          
          $(this).removeClass('cardOut').delay(timeOpen).queue(function () {$(this).addClass('cardOut');$(this).dequeue();
     });
     
	 $(this).mouseleave(function(){
		 mousemove++; 
	});
          
		  clickColor2 = $(this).attr('class');
          
          if (clickColor1 === clickColor2&&mousemove>0) {
               $('.'+clickColor2.substr(5)).animate({opacity:0}, 200);
			   mousemove = 0;
               clickColor1 = 0;
               timeCoin = timeCoin+1;
               
          } else {
               clickColor1 = clickColor2;
			   mousemove = 0;
          }
          
          if (timeCoin === 8) {
               
               setTimeout(function(){$('.card').removeClass('cardOut');}, 1000);
               setTimeout(function(){$('.card').animate({opacity:1}, 300).delay(500).animate({opacity:0});}, 1000);
			   setTimeout(function(){$('#game-field').empty().append('<br><br><br><h1>You won!</h1><br><h2>Clicks = '+timeClick+'</h2>');}, 2000);
               setTimeout(function(){$('#start-page').css('z-index', 2);}, 4000);
              
          }
          
     });
     
}

$(document).ready(function() {
	
     $('#1').click(function(){Timeout = 1000;});
	 $('#2').click(function(){Timeout = 2000;});
	 $('#3').click(function(){Timeout = 3000;});
	 $('#begin-btn').click(function(){
	 	  $('#game-field').css('display', 'block');
          timeCoin = 0;
          timeClick = 0;
          clickColor2 = 0;
          clickColor1 = 0;
          $('#game-field').empty();
          $('#start-page').css('z-index', -2);
		  startGame();
          gamePlay();
      });
     });