<?php
echo '<pre>';
print_r($_SERVER);
?>
<form action="https://www.enrichedacademy.com/users/cross_login" method="POST" target="_blank">
	<input type="hidden" value="User First Name" name="fname">
	<input type="hidden" value="User Last Name" name="lname">
	<input type="hidden" value="example@email.com" name="email">
	<input type="hidden" name="accesstoken" value="KxW714KNodN5">
	<input type="submit" name="submit" value="Connect With EA">
</form>