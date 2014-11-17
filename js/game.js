// game developed based on
// http://www.codecademy.com/forum_questions/519e43b2d7d159a6e9000534

var game = function() {
    var self = this;

    //tags array
    self.arrTags = ['p', 'a', 'div', 'span', 'head', 'body', 'aside', 'script', 'h3', 'strong'];

    self.timer = 0;

    self.gameState= 1;

    self.mousemove = 0;

    self.timeCoin = 0;

    self.selected1 = 0;

    self.selected2 = 0;

    self.config =  { timeOpen: 1500, Timeout: 2000 }

    // AUDIO
    var audioBGMusic = new Audio();
    audioBGMusic.src = './audio/lullatone.mp3';
    audioBGMusic.loop = true; // we want the background music to loop
	var chord = new Audio();
    chord.src = './audio/chord.mp3';

    self.shuffleTags = function() {

    	var tags = self.arrTags;

        var length = tags.length

        for (var i = 0; i < length; i++) {

            tags[i + length] = "/" + tags[i];

        };

        var d, c, b = tags.length;

        while (b) {
            c = Math.floor(Math.random() * b);
            d = tags[--b];
            tags[b] = tags[c];
            tags[c] = d;
        }

        return tags;
    }

    self.startGame = function() {

    	self.timeCoin = 0;
        self.selected1 = 0;
        self.selected2 = 0;
        $('#game-field').empty();

        var tags = self.shuffleTags();

        for (i = 0; i < tags.length; i++) {
            var cont = $('<div>').addClass('tile ' + tags[i].replace('/', '')).append(
                $('<div>').addClass('flipper').append(
                    $('<div>').addClass('front').append('&lt;' + tags[i] + '&gt;')
                ).append(
                    $('<div>').addClass('back')
                ));
            $('#game-field').append(cont);

        }

        setTimeout(function() {
            $('.flipper').addClass('tileOut');
            $('.layer').css('z-index', -1);
        }, self.config.Timeout);

        audioBGMusic.play();
        self.gamePlay();
        self.startTimer();
        
    }

    self.init = function(){
    	$('#composition').css('display', 'block');
    	$('header').fadeIn();
        $('#start_page').fadeOut();
        setTimeout(function() {
            $('#game-field').fadeIn();
            self.startGame();
        }, 500);

    }

    self.flipBack = function(){
    	
	    if(self.selected1 != 0){
    		self.selected1.find('.flipper').addClass('tileOut');
	    	self.selected1.find('.flipper').dequeue();
		}

		if(self.selected2 != 0){
	    	self.selected2.find('.flipper').addClass('tileOut');
	    	self.selected2.find('.flipper').dequeue();
	    }

	    self.selected1 = 0;
	    self.selected2 = 0;

	    
    }

    self.gamePlay = function() {
	    $('.tile').click(function() {

	    	if(self.selected1 == 0){
	    		self.selected1 = $(this);
	    	} else if(self.selected2 == 0 && self.selected1[0] != $(this)[0]) {
	    		self.selected2 = $(this);
	    	} else {
	    		return false;
	    	}

	        $(this).find('.flipper').removeClass('tileOut').delay(self.config.timeOpen).queue(self.flipBack);

	        if ( self.selected1 != 0 && self.selected2 != 0 && self.selected1.attr('class') === self.selected2.attr('class')) {

				self.selected1.animate({opacity: 0}, 1000);
				self.selected2.animate({opacity: 0}, 1000);
				chord.play();
	            self.timeCoin = self.timeCoin + 1;

	        } 


	        if (self.timeCoin === 10) {
	            var end_time = document.getElementById('h3').innerHTML;
	            self.gameState= 0;
	            console.log(end_time);
	            $('#composition').fadeOut();
	            $('#game-field').fadeOut();
				$('.r_timer').html(end_time);
				$('header').fadeOut();

				if(self.timer < 30){
					$('#ninja').fadeIn();
				} else if(self.timer < 60) {
					$('#grunt').fadeIn();
				} else {
					$('#noob').fadeIn();
				}
			}
		});

	}

	self.gameTimer = function(sec, block, direction) {
	    var time = sec;
	    direction = direction || false;

	    var hour = parseInt(time / 3600);
	    if (hour < 1) hour = 0;
	    time = parseInt(time - hour * 3600);
	    if (hour < 10) hour = '0' + hour;

	    var minutes = parseInt(time / 60);
	    if (minutes < 1) minutes = 0;
	    time = parseInt(time - minutes * 60);
	    if (minutes < 10) minutes = '0' + minutes;

	    var seconds = time;
	    if (seconds < 10) seconds = '0' + seconds;

	    block.innerHTML = hour + ':' + minutes + ':' + seconds;



	    if (self.gameState== 1) {
	        if (direction) {
	            sec++;
              self.timer = sec;
	            setTimeout(function() {
	                self.gameTimer(sec, block, direction);
	            }, 1000);
	        } else {
	            sec--;

	            if (sec > 0) {
	                setTimeout(function() {
	                    self.gameTimer(sec, block, direction);
	                }, 1000);
	            } else {
	                alert('woops');
	            }
	        }
	    }
	}

	self.startTimer = function(){
		var block = document.getElementById('h3');
    	self.gameTimer(0, block, true);
	}




}

var instance = new game();


$(document).ready(function() {
	$('#start_page').fadeIn();
    $('#startBtn').click(function() {
    	instance.init();
    });
});

