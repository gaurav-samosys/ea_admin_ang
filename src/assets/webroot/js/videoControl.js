$(document).ready(function  () { 
		isiframeEsist=0,
		html = '';
		
	setInterval(function(){ 
		html =  $('#VVD').html();
		if((html.indexOf('iframe') !== -1)){
			if(isiframeEsist==0){
				initialiseVideoElement();
				isiframeEsist=1;
			}
		}else{
			isiframeEsist=0;
		}
		}, 400);
});


function initialiseVideoElement(){
		var isiframeEsist=0;
		setInterval(function(){ 
			var html =  $('#VVD').html();
			if((html.indexOf('iframe') !== -1)){
				if(isiframeEsist==0){
					initialiseVideo();
					isiframeEsist=1;
				}
			}else{
				isiframeEsist=0;
			}
			}, 400);
	}
		
	function initialiseVideo(){
		var iframe = $('#vimeo-player')[0];
		player = $f(iframe);
		player.addEvent('ready', function() {
			try{
				player.addEvent('finish', finishvideo);
				player.api('play');
			} catch(e){
				 initialiseVideoElement();
			}
		});
	}
	
    

    function finishvideo(id) {
    	//alert("video finish");
    	//location.reload();
        var a = 0;
		var res = 0;
		res = after_finish(a);
		setInterval(function(){
			if(a==0){
				if(res == 1){
					var html =  $('#VVD').html();
		
					if((html.indexOf('iframe') !== -1)){
							initialiseVideoElement();
							a=1; 
					}
				}
			}
		},600);
    }