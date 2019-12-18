$(function() {
   var webroot = getWebroot();
   var initbasepath = getinitbasepath();
   $('.topic_head').click(function (argument) {
   		if($(this).find('.disable-circle-head').length){
   			return false;
   		}
   		var topic = $(this).find('a').attr('data-topic-id');
   		current_topic_data = '';
   		 $.ajax({
                type: "POST",
                data: {"topic_id": topic,"topic_data":true},
                url: getWebroot()+'users/topic_video_content',
                success: function(response) {
					var all_video = response.length;					
					var ijk = 0;
					var mlenth = 0;
					for (ijk = 0; ijk < all_video; ijk++) {
						if(typeof response[ijk].category_associations != 'undefined'){
						    if (response[ijk].category_associations.viewed_status == 1 || response[ijk].category_associations.date_view == 1) {
						        mlenth++;
						    }
					    }
					 }  
					if(mlenth > 0 ) mlenth++;
					
					var progress = (mlenth/all_video)*100;
					
					current_topic_data = response[all_video-1].topic_data;					
					
					$title =  current_topic_data.cat_name;
					$title = $.trim($title.substring(0, $title.indexOf('|')));
					
					$encoded_topic_id = btoa(current_topic_data.id);
					$('.course-dynamic-title').html($title);
					$('.progress-bar-inner').css('width', progress + "%");

					$('.all-course a').attr('href',getWebroot()+'users/videos?topic_id='+$encoded_topic_id);
					if(Math.round(progress) ==  100){
						$('.progress-bar-inner').removeClass('progress-o');
						$('.progress-bar-inner').addClass('completed-progress-bar');
						$('.completed-inner').show();

						nextTopicTitle = $('#topic_'+topic).next().find('.overlay-title-big');
						if(nextTopicTitle.length == 1){
							nextTopicTitle = nextTopicTitle.html();
						}else{
							nextTopicTitle = $('#topic_'+topic).parent().next().next().find('.overlay-title-big').eq(0);
							if(nextTopicTitle.length == 1){
								nextTopicTitle = nextTopicTitle.html();
							}else{
								nextTopicTitle = 'All topics completed';
							}
						}
						
						$('.course-dynamic-next-title').html(nextTopicTitle);

						$('.jump-to-quiz').attr('href',getWebroot()+'users/welcomeQuiz?topic_id='+$encoded_topic_id);
					}else{
						$('.progress-bar-inner').removeClass('completed-progress-bar');
						if(Math.round(progress) == 0){
							$('.progress-bar-inner').addClass('progress-o');
						}else{
							$('.progress-bar-inner').removeClass('progress-o');
						}
						$('.completed-inner').hide();
						$('.jump-to-quiz').removeAttr('href');
					}

					$('.gdb-image-inner img').attr('src',$('#topic_'+topic+' .topic-bg-image').attr('src'));
					
					$('.main-bar-head').html(Math.round(progress) + "%");   
					$('.video-href').attr('href','test');
					$('.course-sequence').html('Course '+response[all_video-1].sequence);
					$('.gdb-course-detail p').html(current_topic_data.description);
					$('.gdb-course-detail i').html(response[all_video-1].duration);
					if (!$(".course-percentage, .db-image-wrap").hasClass('completed-all-courses-div')) {
						$('html, body').animate({
							scrollTop: $(".course-section-top").offset().top
						}, 1000);
					}
                }
            });
   });

});
