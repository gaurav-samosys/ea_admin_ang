// JavaScript Document
//$(document).ready(function(){
$(document).ready(function  () { 
    var flag = 0;
    var isiframeEsist=0;
    var flagInit = 0;
	
	setInterval(function(){ 
		var html =  $('.course-video-inner').html();
		if((html.indexOf('iframe') !== -1)){
			if(isiframeEsist==0){
				var iframe2 = $('#vimeo-player')[0];
				var player = $f(iframe2);
				initVideo();
				isiframeEsist=1;
			}
		}else{
			isiframeEsist=0;
		}
		}, 200);
	
	function initVideo() {
		pauseFlag = $("#pauseFlag").val();
		iframe2 = $('#vimeo-player')[0];
		player = $f(iframe2);
		player.addEvent('ready', function() {
			if(flag == 0) {
				
					if(pauseFlag == 1)
					{
						player.api('pause');
					}
					else
					{
						player.api('play');
					}
					//player.api('play');
					
					player.addEvent('pause', onPause);
					player.addEvent('play', onPlay);
					player.addEvent('finish', onFinish);
					player.addEvent('playProgress', onPlayProgress);
					flag = 1;
				
			}
			else
			{
				player.addEvent('pause', onPause);
				player.addEvent('play', onPlay);
				player.addEvent('finish', onFinish);
				player.addEvent('playProgress', onPlayProgress);
			}
		});
		
	}

    function onPause(id) {
		      
        $("#pauseFlag").val('1');
     
			/*player.addEvent('ready', function() {
				player.api('pause');
			});*/
        
    } 
    
     /*function onPause(id) {
        status.text('paused');
    }*/
    
    function onPlay(id) {
        
        $("#pauseFlag").val('0');
        
			/*player.addEvent('ready', function() {
				player.api('play');
			});*/
        
    }

    function onFinish(id) {
        var a = 0;
		var res = 0;
		res = after_finish(a);
		setInterval(function(){
			if(a==0){
				if(res == 1){
					var html =  $('.course-video-inner').html();
		
					if((html.indexOf('iframe') !== -1)){
							initVideo();
							a=1;
					}
				}
			}
		},200);
    }
   
    function onPlayProgress(data, id){
		/*status.text(data.seconds + 's played');*/
    }     
});
//});
