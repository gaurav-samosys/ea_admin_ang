<?php
//echo phpinfo();
?>
<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<script type="text/javascript">
/**
 * JS/jQuery - Set cookie of current user's UTC offset (format example: -06:00)
 *
 */
$(document).ready( function() {

        // Get UTC offset
        // var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
        // var offset = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);

        // if (document.cookie.indexOf("hp_time_offset") >= 0) {} else {

        //     // Set cookie
        //     $.cookie( 'hp_time_offset', offset, { expires : null, path:'/' } );     
        // }


        var visitortime = new Date();
        var visitortimezone = visitortime.getTimezoneOffset();

        alert(visitortimezone);



});

</script>

<?php


 echo <<<EOE
   <script type="text/javascript">
     if (navigator.cookieEnabled)
       document.cookie = "tzo="+ (- new Date().getTimezoneOffset());
   </script>
EOE;
  if (!isset($_COOKIE['tzo'])) {
    echo <<<EOE
      <script type="text/javascript">
        if (navigator.cookieEnabled) document.reload();
        else alert("Cookies must be enabled!");
      </script>
EOE;
    die();
  }

$ts = new DateTime('now', new DateTimeZone('GMT'));

$timeZone = $_COOKIE['hp_time_offset']; // $_COOKIE['tzo']

echo '<pre>';

print_r($_COOKIE['tzo']);

print_r($timeZone);


print_r($ts->add(DateInterval::createFromDateString($timeZone.' minutes')));
?>