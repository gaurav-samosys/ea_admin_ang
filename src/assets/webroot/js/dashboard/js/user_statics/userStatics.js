var url = window.location.protocol + "//" + window.location.host + "/"; 
$(function(){

var man_percent =0;
                    $.ajax({
                        type:"post",
                        url: url+"users/infographic_data",
                        datatype:"JSON",
                        
                        success: function(data)
                        {
                            //alert("xdfgdf");
                            
                            $("#years").html(data.fo[0].user_starting_answers.year +' Stats');
                            $("#second_years").html(data.fo[0].user_starting_answers.year);
                            var cal = data.fifteen_count/data.all_student;
                            float2rat(cal);

                            man_percent = data.fifteen;
                            progress(man_percent, $('#progressBar'));
                            
                           
                            
                             //percent 5th
                            var overall_progress = data.fifth_per;
                            var overall = Math.round(overall_progress);
                            if(overall<25){
                                    var angle = -90 + (overall/100)*360;
                                    $(".animate-0-25-b2").css("transform","rotate("+angle+"deg)");
                            }
                            else if(overall>=25 && overall<50){
                                    var angle = -90 + ((overall-25)/100)*360;
                                    $(".animate-0-25-b2").css("transform","rotate(0deg)");
                                    $(".animate-25-50-b2").css("transform","rotate("+angle+"deg)");
                            }
                            else if(overall>=50 && overall<75){
                                    var angle = -90 + ((overall-50)/100)*360;
                                    $(".animate-25-50-b2, .animate-0-25-b2").css("transform","rotate(0deg)");
                                    $(".animate-50-75-b2").css("transform","rotate("+angle+"deg)");
                            }
                            else if(overall>=75 && overall<=100){
                                    var angle = -90 + ((overall-75)/100)*360;
                                    $(".animate-50-75-b2, .animate-25-50-b2, .animate-0-25-b2").css("transform","rotate(0deg)");
                                    $(".animate-75-100-b2").css("transform","rotate("+angle+"deg)");
                            }
                            var fifthdata =data.fifth_per
                            $(".text_fifth").html(fifthdata.toFixed(1)+"%");
                            
                            //end 5th
                            
                            
                            
                             //percent 7th
                            var overall_progress = data.seventh_per;
                            var overall = Math.round(overall_progress);
                                if(overall<25){
                                    var angle = -90 + (overall/100)*360;
                                    $(".animate-0-25-b3").css("transform","rotate("+angle+"deg)");
                            }
                            else if(overall>=25 && overall<50){
                                    var angle = -90 + ((overall-25)/100)*360;
                                    $(".animate-0-25-b3").css("transform","rotate(0deg)");
                                    $(".animate-25-50-b3").css("transform","rotate("+angle+"deg)");
                            }
                            else if(overall>=50 && overall<75){
                                    var angle = -90 + ((overall-50)/100)*360;
                                    $(".animate-25-50-b3, .animate-0-25-b3").css("transform","rotate(0deg)");
                                    $(".animate-50-75-b3").css("transform","rotate("+angle+"deg)");
                            }
                            else if(overall>=75 && overall<=100){
                                    var angle = -90 + ((overall-75)/100)*360;
                                    $(".animate-50-75-b3, .animate-25-50-b3, .animate-0-25-b3").css("transform","rotate(0deg)");
                                    $(".animate-75-100-b3").css("transform","rotate("+angle+"deg)");
                            }
                            
                            var sevent_per = data.seventh_per;
                            $(".text_seventh").html(sevent_per.toFixed(1)+"%");
                            
                            //end 7th
                            
                            $(".eight-ten").html(data.ninth+'/'+data.all_student);
                            
                            $("#eight-ten-per").html(data.ninth_per.toFixed(1)+'%');
                            //progressSecond(data.ninth_per)
                            progressSecond(data.ninth_per, $('#progressBarMoney'));
                            $(".sevn-ten").html(data.first+'/'+data.all_student);
                            $("#sevn-ten-per").html(data.first_per.toFixed(1)+'%');
                            
                             //percent 15th
                            var overall_progress = data.fifteen;
                            var overall = Math.round(overall_progress);
                            if(overall<25){
                                    var angle = -90 + (overall/100)*360;
                                    $(".animate-0-25-b1").css("transform","rotate("+angle+"deg)");
                            }
                            else if(overall>=25 && overall<50){
                                    var angle = -90 + ((overall-25)/100)*360;
                                    $(".animate-0-25-b1").css("transform","rotate(0deg)");
                                    $(".animate-25-50-b1").css("transform","rotate("+angle+"deg)");
                            }
                            else if(overall>=50 && overall<75){
                                    var angle = -90 + ((overall-50)/100)*360;
                                    $(".animate-25-50-b1, .animate-0-25-b1").css("transform","rotate(0deg)");
                                    $(".animate-50-75-b1").css("transform","rotate("+angle+"deg)");
                            }
                            else if(overall>=75 && overall<=100){
                                    var angle = -90 + ((overall-75)/100)*360;
                                    $(".animate-50-75-b1, .animate-25-50-b1, .animate-0-25-b1").css("transform","rotate(0deg)");
                                    $(".animate-75-100-b1").css("transform","rotate("+angle+"deg)");
                            }
                            var per1 = data.fifteen;
                            $(".text_fifteen").html(per1.toFixed(1)+"%");
                            
                            //end 15th
                            
                            
                        },
                        error: function(error){
                            console.log(error);
                        }
                    });
                    

   
});
                    
function progress(percent, $element) {
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ width: progressBarWidth }, 500).html('');
}
function progressSecond(percent, $element) {
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ width: progressBarWidth }, 500).html('');
}

function float2rat(x) {
    var tolerance = 1.0E-6;
    var h1=1; var h2=0;
    var k1=0; var k2=1;
    var b = x;
    do {
        var a = Math.floor(b);
        var aux = h1; h1 = a*h1+h2; h2 = aux;
        aux = k1; k1 = a*k1+k2; k2 = aux;
        b = 1/(b-a);
    } while (Math.abs(x-h1/k1) > x*tolerance);
   $("#divide").html(h1+"/"+k1);
	}
