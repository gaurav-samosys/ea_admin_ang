// JavaScript Document
//$(document).ready(function(){
$(function() {
    var flag = 0;
    var pauseFlag = 0;
	var iframe = $('#vimeo-player')[0];
    var player = $f(iframe);
    var status = $('.status');
    var flagInit = 0;
	
	
	setInterval(function(){ 
		
			initVideo();
		}, 700);
	
	function initVideo() { 
	pauseFlag = $("#pauseFlag").val();
		if(flag == 0) {
			
			var iframe2 = $('#vimeo-player')[0];
			var player = $f(iframe2);
			var status = $('.status');
			
			//alert("flag in : "+flag)
			player.addEvent('ready', function() {
				//alert("Why : "+status.text())
				status.text('ready');
				//alert($(iframe2).attr('src'))
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
			});
		}
		else
		{
			var iframe2 = $('#vimeo-player')[0];
			var player = $f(iframe2);
			var status = $('.status');
			player.addEvent('ready', function() {
				//alert("Why : "+status.text())
				status.text('ready');
				//alert($(iframe2).attr('src'))
				if(pauseFlag == 1)
				{
					player.api('pause');
					
				}
				else
				{
					player.api('play');
				}
				//player.api('play');
				player.addEvent('play', onPlay);
				player.addEvent('pause', onPause);
				player.addEvent('finish', onFinish);
				player.addEvent('playProgress', onPlayProgress);
				//flag = 1;
			});
		}
		
	}

    

    function onPause(id) {
        
        $("#pauseFlag").val('1');
        var iframe2 = $('#vimeo-player')[0];
			var player = $f(iframe2);
			var status = $('.status');
			player.addEvent('ready', function() {
				status.text('paused');
				player.api('pause');
			});
        
    } 
    
    function onPlay(id) {
        
        $("#pauseFlag").val('0');
        var iframe2 = $('#vimeo-player')[0];
			var player = $f(iframe2);
			var status = $('.status');
			player.addEvent('ready', function() {
				
				player.api('play');
			});
        
    } 

    function onFinish(id) {
		
        status.text('finished');
		$( ".money-myths-dtl" ).trigger( "click" );
		var a = 0;
		setInterval(function(){
			if(a==0)
			{
			var dat = $("#resCatAssociations").val();
			after_finish(dat);
			
			a=1;
			flag = 0;
			initVideo();
		/*var iframe2 = $('#vimeo-player')[0];
			var player = $f(iframe2);
			var status = $('.status');
			player.addEvent('ready', function() {
				
				player.api('play');
			});*/
		}
			}, 700);
    }
   
  

    function onPlayProgress(data, id) {
		//alert(status.text(data.seconds + 's played'));
        status.text(data.seconds + 's played');
       
    }
    
    
      
});
//});
