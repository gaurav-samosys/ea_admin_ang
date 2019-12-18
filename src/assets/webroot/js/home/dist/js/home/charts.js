// (function ($) {

  

//   jQuery('.enrolled-students .highcharts-container').append('<div class="custom-legend"><div class="legend-inner"><span class="green-dot"></span><span class="legend-name">Active Users</span></div><div class="legend-inner"><span class="blue-dot"></span><span class="legend-name">Inactive Users</span></div></div>')

// }(jQuery));

(function ($) {


  Highcharts.setOptions({
            colors: ['#94cb29', '#2b73a6'],
            
    });
      

  jQuery('.video-views .highcharts-container').append('<div class="custom-legend"><div class="legend-inner"><span class="green-dot"></span><span class="legend-name">Video Views</span></div><div class="legend-inner"><span class="blue-dot"></span><span class="legend-name">Video Completions</span></div></div>')

}(jQuery));

(function ($) {


  

  jQuery('.certificates-issue .highcharts-container').append('<div class="custom-legend"><div class="legend-inner"><span class="green-dot"></span><span class="legend-name">Claimed</span></div><div class="legend-inner"><span class="blue-dot"></span><span class="legend-name">unclaimed</span></div></div>')

}(jQuery));

function redrawDatalabels() {
    var chart = this,
        cX = chart.series[0].center[0],
        cY = chart.series[0].center[1],
        shapeArgs, ang, posX, posY, bBox;

    Highcharts.each(chart.series[0].data, function (point, i) {
        if (point.dataLabel) {
            bBox = point.dataLabel.getBBox();
            shapeArgs = point.shapeArgs;
            ang = (shapeArgs.end - shapeArgs.start) / 2 + shapeArgs.start;
            posX = cX + (shapeArgs.r / 2) * Math.cos(ang);
            posY = cY + (shapeArgs.r / 2) * Math.sin(ang);
            
            point.dataLabel._pos.x = posX + ((point.labelPos[6] == "right" ? (1) : (-1)) * bBox.width/20);
            point.dataLabel._pos.y = posY - bBox.height/3;
        }
    });
    chart.series[0].placeDataLabels();
}

$(function () {

        
    });



$(function () {

        
    });






$(function () {
    

 


});




$(function() {

  // Highcharts.Renderer.prototype.symbols.callout = function(x, y, w, h, options) {
  //     var arrowLength = 6,
  //       halfDistance = 6,
  //       r = Math.min((options && options.r) || 0, w, h),
  //       safeDistance = r + halfDistance,
  //       anchorX = options && options.anchorX,
  //       anchorY = options && options.anchorY,
  //       path;

  //     path = [
  //       'M', x + r, y,
  //       'L', x + w - r, y, // top side
  //       'C', x + w, y, x + w, y, x + w, y + r, // top-right corner
  //       'L', x + w, y + h - r, // right side
  //       'C', x + w, y + h, x + w, y + h, x + w - r, y + h, // bottom-right corner
  //       'L', x + r, y + h, // bottom side
  //       'C', x, y + h, x, y + h, x, y + h - r, // bottom-left corner
  //       'L', x, y + r, // left side
  //       'C', x, y, x, y, x + r, y // top-right corner
  //     ];

  //     path.splice(23, 3,
  //       'L', w / 2 + halfDistance, y + h,
  //       w / 2, y + h + arrowLength,
  //       w / 2 - halfDistance, y + h,
  //       x + r, y + h
  //     );

  //     return path;
  //   };
});





jQuery(function () {
    
      jQuery('.tabs-menu [data-tab]').on('click', function (e) {
        
        jQuery(this).parent().addClass("current");
        jQuery(this).parent().siblings().removeClass("current");
        var tab = jQuery(this).attr("data-tab");
        //alert(tab); 
        jQuery(".tab-content").not(tab).css("display", "none");
        jQuery(tab).fadeIn();
        //alert(tab);
        e.preventDefault();

        // jQuery('.total-course-completation').highcharts().reflow();
        // jQuery('#course-completation-pie').highcharts().reflow();
        // jQuery('#certificates-issue-pie').highcharts().reflow();
        // jQuery('.video-views').highcharts().reflow();
        // jQuery('.certificates-issue').highcharts().reflow();


      
    });
});