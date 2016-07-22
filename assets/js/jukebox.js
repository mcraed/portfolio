	$(document).ready(function(){

	console.log('working');

	function Jukebox(){

		function Song(name, artist, file_name){
			this.name = name;
			this.artist = artist;
			this.file_name = file_name;
		}

		// songs in playlist
		var alright = new Song('Alright', 'Kendrick Lamar', 'assets/audio/Alright.mp3'); 
		var pyramids= new Song('Pyramids', 'Frank Ocean', 'assets/audio/Pyramids.mp3'); 
		var helena = new Song('Helena', 'My Chemical Romance', 'assets/audio/Helena.mp3');
		var berry = new Song('The Blacker the Berry', 'Kendrick Lamar', 'assets/audio/The_Blacker_the_Berry.mp3');
		var taylor_gang = new Song('Taylor Gang', 'Wiz Khalifa', 'assets/audio/Taylor_Gang.mp3');
		var devil = new Song('Booksmart Devil', 'Silversun Pickups', 'assets/audio/Booksmart_Devil.mp3');
		var house = new Song('Red House', 'Jimi Hendrix', 'assets/audio/Red_House.mp3');
		var risk = new Song('Risk', 'Deftones', 'assets/audio/Risk.mp3');

		songs = [taylor_gang, berry, alright, pyramids, helena, devil, house, risk];

		play_history = [];
		audio = document.createElement('audio');
		playing = false;
		var shuffle = true; // default shuffle setting
		var track_count = songs.length;
		var i = Math.floor((Math.random() * track_count));
		var h	= play_history.length - 1;
		now_playing = songs[i];

		$('#aud-pause').hide();

		audio.src = now_playing.file_name;

			e = 0;

		function playButton(){
			playing = true;
			$('#aud-play').hide();
			$('#aud-pause').show();
		}

		var history_push = function(hps){
			play_history.push(hps);
		};

		// this is the playlist (ul) - add click event that will play corresponding song and push to play history  
		var song_list = $('#playlist-ul');

		songs.map( (song, f) => {
			var li = $('<li/>')
				.appendTo(song_list)
			var a = $('<a>')
				.addClass('playlist-item')
				.attr('id', String(songs.indexOf(song)))
				.attr('href', '#')
				.text(song.name + ' - ' + song.artist)
				.appendTo(li);
		});

		function highlighter(item){

			for(var i = 0; i < songs.length; i ++){
				var song = songs[i];
				var song_id = String('#' + i);
				if(item === song){
					$(song_id).css('background', 'rgba(13, 1, 5, .7');
				}else{
					$(song_id).css('background', 'none');
				}
			}
		}
			// make playlist interactive
			// (to do)place in queue when clicked
		$('.playlist-item').on('click', function($e){
			$e.preventDefault();
			var selected = songs[this.id];
			audio.src = selected.file_name;
			audio.play();
			now_playing = selected;
			$('#now-playing-artist').text(now_playing.artist);
			$('#now-playing-song').text(now_playing.name);
			highlighter(now_playing);
			history_push(selected);
			playButton();
		});

		$('.playlist-item').mouseover(function(){
			var link = String('#' + this.id);
			$(link).css('background', 'blue');

			$(this).mouseleave(function(){
				$(link).css('background', 'none');
			});
		});


		var random_track = function(){
			// audio.pause();
			// audio.currentTime = 0;
			i = Math.floor((Math.random() * track_count));
			audio.src = songs[i].file_name;
			audio.play();
			now_playing = songs[i];
			$('#now-playing-artist').text(now_playing.artist);
			$('#now-playing-song').text(now_playing.name);
			highlighter(now_playing);
			history_push(now_playing);
		};

		var show_shuffle_status = function(){
			if(shuffle){
				$('#shuffle-status').text('On');
			}else{
				$('#shuffle-status').text('Off');
			};
		};

		show_shuffle_status();

		$(audio).on('ended', function(){
			if(shuffle){
				random_track();				
			}else{
				i = i + 1
				audio.src = songs[i].file_name;
				audio.play();
				now_playing = songs[i];
				history_push(now_playing);
			}
		});

		this.play = function(){
			// audio.play();
			$('#now-playing-artist').text(now_playing.artist);
			$('#now-playing-song').text(now_playing.name);
			highlighter(now_playing);

			history_push(now_playing);
		}

		// $('#aud-stop').on('click', function(){
		// 	audio.pause();
		// 	audio.currentTime = 0;
		// 	now_playing = 0;
		// });


		$('.play-pause').on('click', function(){
			if(!playing){
				console.log('playing...');
				audio.play();
				playing = true;
				$('#aud-play').hide();
				$('#aud-pause').show();
			}else if(playing){
				console.log('playback should be paused.');
				audio.pause();
				playing = false;
				$('#aud-pause').hide();
				$('#aud-play').show();
			};
		});
			
			// if(!clicked){
			// 	audio.play();
			// 	clicked = true;
			// 	$('#aud-play').hide();
			// 	$('#aud-pause').show();
			// }else{
			// 	audio.pause();
			// 	clicked = false;
			// 	$('#aud-pause').hide();
			// 	$('#aud-play').show();				
			// };

		$('#aud-shuffle').click(function(){

			if(!shuffle){
				shuffle = true;
			}else{
				shuffle =  false;
			};

			show_shuffle_status();
		});

		// when song is selected from playlist, Taylor gang is populated in play_history

		$('#aud-last').on('click', function(){

			if(audio.currentTime > 4){
				audio.currentTime = 0;
				audio.play();	
				h = play_history.length - 1;
			}else{
				if(h == 0){					
					h = 0;
				}else{
					h = h - 1
					audio.src = play_history[h].file_name;
					audio.play();
					now_playing = play_history[h];
					$('#now-playing-artist').text(now_playing.artist);
					$('#now-playing-song').text(now_playing.name);
					highlighter(now_playing);
				};
			};
		});

		$('#aud-next').on( 'click', function(){
		
			// testing if element is NOT in an array
			if(now_playing === play_history[h] ){
				if(h == play_history.length - 1){
					random_track();
					playButton();
				}else{
					h = h + 1;
					audio.src = play_history[h].file_name;
					audio.play();
					playButton();
					now_playing = play_history[h];
					$('#now-playing-artist').text(now_playing.artist);
					$('#now-playing-song').text(now_playing.name);
					highlighter(now_playing);
				};
			}else{
				if(shuffle){
					random_track();
					playButton();
				}else{

					if(i == track_count - 1){
						i = 0;					
					}else{
						i = i + 1;
					};
					audio.src = songs[i].file_name;
					audio.play();
					playButton();
					now_playing = songs[i];
					$('#now-playing-artist').text(now_playing.artist);
					$('#now-playing-song').text(now_playing.name);
					highlighter(now_playing);
					history_push(now_playing);
				};
			};	
		});
		
		// $('#aud-random').click(function(){
		// 	random_track();
		// });	

		// $('#add-song-submit').on('click', function(){
		// 	var song_name = $('#song-name-input').val();
		// 	var artist_name = $('#artist-name-input').val();
		// 	var file_name = $('#file-name-input').val();

		// 	var new_song = new Song(song_name, artist_name, file_name);
		// 	songs.push(new_song);
		// 	i = songs.length - 1
		// 	audio.src = songs[i].file_name;
		// 	audio.play();
		// 	now_playing = songs[i]
		// 	$('#now-playing-artist').text(now_playing.artist);
		// 	$('#now-playing-song').text(now_playing.name);

		// 	var li = $('<li/>')
		// 		.addClass('song-name')
		// 		.appendTo(song_list);
		// 	var a = $('<a>')
		// 		.addClass('playlist-item')
		// 		.attr('href', '#')
		// 		.text(new_song.name + ' - ' + new_song.artist)
		// 		.appendTo(li);

		// 	console.log(song_name +' by ' + artist_name + " has been added to your playlist!");
		// 	// history_push();
		// });
	};

	var tunes = new Jukebox();
	tunes.play();


});