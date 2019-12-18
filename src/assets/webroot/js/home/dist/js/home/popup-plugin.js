(function ( $ ) {

    
 
    $.fn.popify = function( options ) {

          var settings = $.extend({
            // These are the defaults.
            after:'footer',
            type:'default',
            subject : 'Default',
            message : '',
            buttons: true,
            buttonOk : true,
            buttonOkLink : '#',
            buttonCancel : true,
            buttonCancelLink : '#',
        }, options );

         $button = '';
        
         if(settings.buttons){
            $button = '<div class="popover_buttons">';
            if(settings.buttonOk){
               $button += '<li><a class="popover_button ok-click" href="'+settings.buttonOkLink+'">OK</a></li>';
            }
            if(settings.buttonCancel){
                $button += '<li><a class="popover_button cancel-click" href="'+settings.buttonCancelLink+'">Cancel</a></li>';
            }
            $button += '</div>';
         }

        $popclass = 'icon_warning';
         if(settings.type == 'success'){
            $popclass = 'icon_success';
         }else if(settings.type == 'error'){
              $popclass = 'icon_error';
         }else if(settings.type == 'warning'){
              $popclass = 'icon_warning';
         }

         $contentPopover = '<div class="icon_popover"><div class="'+$popclass+'"></div></div>';

         $contentData = '<h1>'+settings.subject+'</h1><p>'+settings.message+'</p><div class="spacer20"></div>';

         $content = '<div class="popover_wrapped"><div class="popover_inner"><div class="popover_main_content">'+$contentPopover+$contentData+$button+'</div></div></div>';
         $('.popover_wrapped').remove();
         $( $content ).insertAfter( settings.after );
         $('.ok-click,.cancel-click').click(function  (argument) {            
            $('.popover_wrapped').remove();
            return false;
         });

        return;
    };
 
}( jQuery ));