<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	function __construct(){
		parent::__construct();
		$protectMethod = array('previousBooking','dashboard','updateCustomerProfile','customerChat','profileSettings','updateBeautyDetails');
		if (in_array(get_current_page_method(), $protectMethod)){
			if(!is_user_logged_in('customer')){
				redirect(base_url());
			}
		}
	}

	public function index() { 
		$service_url = api_base_url('getReferrals');
		$curl_post_data = array();
		$response = call_postMethodWithEmptyArray($type = "POST",$service_url,$curl_post_data);
		$data1 = json_decode($response);
		$data['title'] = 'Glam Army';
		$this->load->view('includes/user/metadata',$data);
		$this->load->view('includes/user/header');
		$this->load->view('home/home_page',$data1);
		$this->load->view('includes/user/footer');
	}

	public function customer_terms() { 		
		$data['title'] = 'Glam Army';
		$this->load->view('includes/user/metadata',$data);
		
		$this->load->view('home/customer_terms');
		$this->load->view('includes/user/footer');
	}		

	public function stylists_terms() { 		
		$data['title'] = 'Glam Army';
		$this->load->view('includes/user/metadata',$data);
		
		$this->load->view('home/stylists_terms');
		$this->load->view('includes/user/footer');
	}	
	public function faq() { 		
		$data['title'] = 'Glam Army';
		$this->load->view('includes/user/metadata',$data);		
		$this->load->view('home/faq');
		$this->load->view('includes/user/footer');
	}
	public function contact_us() { 		
		$data['title'] = 'Glam Army';
		$this->load->view('includes/user/metadata',$data);		
		$this->load->view('home/contact_us');
		$this->load->view('includes/user/footer');
	}
	public function mailing_list() { 	

	if(!empty($_POST)){
		$data['subscribe'] = 1;
		$data['email'] = $_POST['email'];
		
		$this->db->where('email',trim($_POST['email']));
		$this->db->limit(1);
		$obj = $this->db->get('subscribe')->row();

		if(!empty($obj)){
			$this->db->where('email',trim($_POST['email']));
			$this->db->limit(1);
			$this->db->update('subscribe',$data);
		}else{
			$this->db->insert('subscribe',$data);
		}

		$this->session->set_flashdata('success', 'Thank you for your subscription on Glamarmy.');

		}
		$data['title'] = 'Glam Army';
		$this->load->view('includes/user/metadata',$data);		
		$this->load->view('home/mailing_list');
		$this->load->view('includes/user/footer');
	}

	//customer  Login 
	public function login(){
		$_POST['email'] = $this->input->post('email'); 
		$_POST['password'] = $this->input->post('password'); 
		$_POST['user_type'] = 1; 
		$service_url = api_base_url('login');
		$curl_post_data = $_POST;
		$response = call_postMethod($type = "POST",$service_url,$curl_post_data);
		$data = json_decode($response);
		if($data->status == 1){
			set_login('customer',$data);
			die(json_encode(['success'=>'1','message'=>$data->message,'user_type'=>$data->data->user_type]));
		}else{     
			die(json_encode(['success'=>'0','message'=>$data->message,'user_type'=>$data->status]));
		}
	}

	//Customer  Customer Dashboard 
	public function previousBookings(){
		$service_url = api_base_url('getPreviousAppoinment');
		$post['user_id'] = $_SESSION['customer']->data->id;
		if(isset($_SESSION['customer']->data->token) && $_SESSION['customer']->data->token !='' ){
			$post['token'] = $_SESSION['customer']->data->token;
		}else{
			$post['token'] = $_SESSION['customer']->token;
		}
		$post['user_type'] = 1;
		$curl_post_data = $post;
		$response = call_postMethod($type = "POST",$service_url,$curl_post_data);
		$data = json_decode($response);		
		return $data;
	}

	//Customer  Customer Dashboard 
	public function chatList(){

		$service_url = api_base_url('getChatList');
		$post['user_id'] = $_SESSION['customer']->data->id;
		if(isset($_SESSION['customer']->data->token) && $_SESSION['customer']->data->token !='' ){
			$post['token'] = $_SESSION['customer']->data->token;
		}else{
			$post['token'] = $_SESSION['customer']->token;
		}
		$curl_post_data = $post;
		$response = call_postMethod($type = "POST",$service_url,$curl_post_data);
		$data = json_decode($response);	
		return $data;
	}

	// Get Upcoming Booking BY Customer ID
	public function appoinmentDetails(){

		$post['user_id'] =$_SESSION['customer']->data->id;
		$appoinment_id = $_POST['s_id'];
		$post['appoinment_id'] = $_POST['s_id'];
		$post['user_type'] = 1;
		$get_appoinments = getDataByMethod('getAppoinmentDetails', $post);
		$status 			= $get_appoinments->status;
		$half_payment 		= round($get_appoinments->total_cost/2,2);
		$full_payment 		= $get_appoinments->total_cost;
		$amount_paid 		= $get_appoinments->amount_paid_by_customer;
		$remaining_amount 	= round($full_payment-$amount_paid,2);
		$appointment_date 	= strtotime($get_appoinments->appointment_date);
		$current_date 		= strtotime(date('Y-m-d H:i:s', strtotime('+ 30 days')));

		/**
		 * Payment Details
		 */
		$query 		= "SELECT * FROM `payment` WHERE appoinment_id = $appoinment_id";
		$get_payment_data = $this->db->query($query)->result();

		
		if (!empty($get_appoinments)) {

			if($get_appoinments->status == '1'){
				$button = '<b class="y_btn yellow">Awaiting Response</b>';
			}elseif ($get_appoinments->status == '2') {
				$button ='<b class="y_btn yellow">Pay Now</b>';
			}elseif ($get_appoinments->status == '3') {
				$button ='<b class="y_btn red">Rejected</b>';
			}elseif ($get_appoinments->status == '4') {
				$button ='<b class="y_btn red">Cancelled</b>';
			}elseif ($get_appoinments->status == '5') {
				$button ='<b class="y_btn green">Half &#163;</b>';
			}elseif ($get_appoinments->status == '6') {
				$button ='<b class="y_btn green">Confirm</b>';
			}elseif ($get_appoinments->status == '7') {
				$button ='<b class="y_btn green">Arrived At Venue</b>';
			}elseif ($get_appoinments->status == '8') {
				$button ='<b class="y_btn green">Starting Job Now</b>';
			}elseif ($get_appoinments->status == '9') {
				$button ='<b class="y_btn green">Job Completed</b>';
			}elseif ($get_appoinments->status == '10') {
				$button ='<b class="y_btn green">Feedback Required</b>';
			}elseif ($get_appoinments->status == '11') { 
				$button ='<b class="y_btn green">Feedback Submitted</b>';
			}
			
			if(!empty($get_appoinments->profile_pic)){
				$imgProfile =$get_appoinments->profile_pic;
			}else{
				$imgProfile = 'http://'.$_SERVER['SERVER_NAME'].'/glamarmy/uploads/avtar.png';
			}
			
			$html = '';
			$html .= '<div class="tab_con_row Upcoming_user show_tab">
			<div class="tab_con_container">
			<span class="img_ico"><img src="'.$imgProfile.'"></span>
			<div class="txt_container"><h6>'.ucwords($get_appoinments->firstname).' '.ucwords($get_appoinments->lastname).'</h6></div>
			<h5 class="price_tag">£'.round($get_appoinments->total_cost,2).'</h5>
			<span>&nbsp&nbsp&nbsp&nbsp'.$button.'</span>&nbsp&nbsp&nbsp&nbsp#'.$get_appoinments->appoinment_id.'</div>
			<div class="tab_schedule_row detail_row">
			<ul class="sc_ul"><li class="sc-date fa fa-calendar"> <span>'.date('D dS M, Y', strtotime($get_appoinments->appointment_date)).'</span></li>
			<li class="sc-time fa fa-clock-o"> <span>'.date('g:i A', strtotime($get_appoinments->appointment_date)).'</span></li>
			<li class="sc-location fa fa-map-marker" title="Location"> <span>'.ucwords($get_appoinments->address).'</span></li>
			</ul>
			</div>
			<div class="listing_con clearfix">
			<div class="tab_schedule_row service_row col-md-6 col-sm-6 col-xs-12">
			<ul class="sc_ul"><div class="list_row"><li class="sc-date"><span><b>Services</b>: </span></li></div>';
			if (!empty($get_appoinments->services) && is_array($get_appoinments->services)) {
				foreach ($get_appoinments->services as $key => $value) {
					$html .= '<div class="list_row">
					<li class="sc-time"><span>'.$value->service_name.'</span></li>
					<li class="sc-time"><span>£'.round($value->service_charge,2).'</span></li>
					</div>';
				}
			}
			$html .='</ul>
			</div>
			<div class="tab_schedule_row charges_row col-md-6 col-sm-6 col-xs-12">
			<ul class="sc_ul">
			<div class="list_row"><li class="sc-date"><span><b>Additional Charges</b>: </span></li></div>
			<div class="list_row">
			<li class="sc-date"><span>Parking Fees: </span></li>
			<li class="sc-time"><span>£'.$get_appoinments->parking_fee.'</span></li>
			</div>
			<div class="list_row">
			<li class="sc-date"><span>Travel Fees: </span></li>
			<li class="sc-time"><span>£'.$get_appoinments->travel_fee.'</span></li>
			</div>
			</ul>
			</div>
			</div>
			<div class="tab_schedule_row total_row">
			<ul class="sc_ul">
			<li class="sc-date"><span><b>Total Amount</b>: </span></li>
			<li class="sc-time"><span>£'.number_format($get_appoinments->total_cost,2).'</span></li>
			</ul></div>';

			if ($amount_paid > 0) {
				$html .= '<div class="tab_schedule_row total_row">';
				if (!empty($get_payment_data)) {
					foreach ($get_payment_data as $payment_data) {
						$html .= '<ul class="sc_ul"><li class="sc-date"><span><b>Paid Amount</b>: </span></li>
						<li class="sc-time"><span>£'.$payment_data->amount.'</span></li>
						<li class="sc-date"><span><b>Transaction id</b>: </span></li>
						<li class="sc-time"><span>'.$payment_data->transaction_id.'</span></li>
						<li class="sc-date"><span><b>Date</b>: </span></li>
						<li class="sc-time"><span>'.date("D, j F Y g:i A",strtotime($payment_data->created_date)).'</span></li></ul>';		
					}
				}
				$html .= '</div>';
			}

			if ($get_appoinments->status == 5) {
				$html .= '<div class="tab_schedule_row">
				<ul class="sc_ul"><li class="sc-date"><span><b>Remaining Payment</b>: </span></li>
				<li class="sc-time"><span>£'.$remaining_amount.'</span></li>
				</ul><p>Pay Remaining Payment</p>';
					// Full Payment
				$html .= '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" style="display:inline;" onsubmit="return payPalfullPaymentForm(this);">
				<input name="business" value="info@sukymakeupartist.com" type="hidden">
				<input name="cmd" value="_xclick" type="hidden">
				<input name="item_name" value="'.$get_appoinments->firstname.'" type="hidden">
				<input name="item_number" value="'.$get_appoinments->appoinment_id.'" type="hidden">
				<input name="custom" value="full" type="hidden">
				<input name="amount" value="'.$remaining_amount.'" type="hidden">
				<input name="currency_code" value="GBP" type="hidden">
				<input name="cancel_return" value="'.base_url().'Home/paypalPaymentResponce" type="hidden">
				<input name="return" value="'.base_url().'Home/paypalPaymentResponce" type="hidden">
				<input type="submit" class="btn btn_green pay_now_btn1" value="Pay">
				</form>';
			}
			
			$html .= '</div>';


			
			// 1-'Pending'
			// 2-'Accept',
			// 3-'Reject',
			// 4-'Cancel',
			// 5-'Half Payment',
			// 6-'Full Payment',
			// 7-'Arrived At Venue',
			// 8-'Job Start Now',
			// 9-'Job Completed',
			// 10-'Feedback',
			// 11-'Feedback Submitted' 

			// if ( $get_appoinments->status == 1 ){}
			// if ( $get_appoinments->status == 2 ){}
			// if ( $get_appoinments->status == 3 ){}
			// if ( $get_appoinments->status == 4 ){}
			// if ( $get_appoinments->status == 5 ){}
			// if ( $get_appoinments->status == 6 ){}
			$btn_not_show = array('3','4');
			if ( !in_array($status, $btn_not_show) ) {
				$chat_room_id = get_current_user_id().'-'.$get_appoinments->styler_id;
				$html .= '<div class="tab_schedule_row">';
				$html .= "<a href=".base_url('Home/customerchat/?chat_id='.base64_encode($chat_room_id)).'&user_id='.base64_encode($get_appoinments->styler_id)." class='btn_indigo'>Chat to stylist</a>  ";
				$html .= "<a onclick='cancelupcoming($get_appoinments->appoinment_id,$get_appoinments->parking_fee,$get_appoinments->travel_fee)' class='btn_red'>Cancel appointment</a></div>";
			}

			if ($get_appoinments->status == 2) {
				if ($appointment_date > $current_date) {
					$html .= '<div class="tab_schedule_row payment_section"><p>Payment Options</p>';
					// Full Payment
					$html .= '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" style="display:inline;" onsubmit="return payPalfullPaymentForm(this);">
					<input name="business" value="info@sukymakeupartist.com" type="hidden">
					<input name="cmd" value="_xclick" type="hidden">
					<input name="item_name" value="'.$get_appoinments->firstname.'" type="hidden">
					<input name="item_number" value="'.$get_appoinments->appoinment_id.'" type="hidden">
					<input name="custom" value="full" type="hidden">
					<input name="amount" value="'.$full_payment.'" type="hidden">
					<input name="currency_code" value="GBP" type="hidden">
					<input name="cancel_return" value="'.base_url().'Home/paypalPaymentResponce" type="hidden">
					<input name="return" value="'.base_url().'Home/paypalPaymentResponce" type="hidden">
					<input type="submit" class="btn btn_green pay_now_btn1" value="Full Payment">
					</form>';

					// Half Payment
					$html .= '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" style="display:inline;" onsubmit="return payPalHalfPaymentForm(this);">
					<input name="business" value="info@sukymakeupartist.com" type="hidden">
					<input name="cmd" value="_xclick" type="hidden">
					<input name="item_name" value="'.$get_appoinments->firstname.'" type="hidden">
					<input name="item_number" value="'.$get_appoinments->appoinment_id.'" type="hidden">
					<input name="custom" value="half" type="hidden">
					<input name="amount" value="'.$half_payment.'" type="hidden">
					<input name="currency_code" value="GBP" type="hidden">
					<input name="cancel_return" value="'.base_url().'Home/paypalPaymentResponce" type="hidden">
					<input name="return" value="'.base_url().'Home/paypalPaymentResponce" type="hidden">
					<input type="submit" class="btn btn_indigo pay_now_btn1" value="Half Payment">
					</form>';
					
				}else{
					$html .= '<div class="tab_schedule_row payment_section"><p>Payment Options</p>';
					// Full Payment
					$html .= '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" style="display:inline;" onsubmit="return payPalfullPaymentForm(this);">
					<input name="business" value="info@sukymakeupartist.com" type="hidden">
					<input name="cmd" value="_xclick" type="hidden">
					<input name="item_name" value="'.$get_appoinments->firstname.'" type="hidden">
					<input name="item_number" value="'.$get_appoinments->appoinment_id.'" type="hidden">
					<input name="custom" value="full" type="hidden">
					<input name="amount" value="'.$full_payment.'" type="hidden">
					<input name="currency_code" value="GBP" type="hidden">
					<input name="cancel_return" value="'.base_url().'Home/paypalPaymentResponce" type="hidden">
					<input name="return" value="'.base_url().'Home/paypalPaymentResponce" type="hidden">
					<input type="submit" class="btn btn_green pay_now_btn1" value="Full Payment">
					</form>';
				}
			}

			$html .= '</div>';

		}
		echo json_encode(array("success"=>1,"data"=>$html));
	}


	//Customer  Customer Dashboard 
	public function cancelAppoinment(){
	 	$post['user_id'] = $_SESSION['customer']->data->id;
		$post['appoinment_id'] = $_POST['s_id'];
		$post['status'] = 4;
		$post['parking_fee'] = $_POST['parking_fee'];
		$post['travel_fee'] = $_POST['travel_fee'];
		$data = getDataByMethod('updateAppoinmentStatus', $post);
		if($data->status == 1){
			die(json_encode(["success"=>1,"message"=>$data->message]));
		}else{
			die(json_encode(["success"=>0,"message"=>$data->message]));
		}
	}


	//Customer  Customer Dashboard 
	public function getCategoryList(){

		$service_url = api_base_url('getCategory');

		$post['user_id'] = $_SESSION['customer']->data->id;

		if(isset($_SESSION['customer']->data->token) && $_SESSION['customer']->data->token !='' ){

			$post['token'] = $_SESSION['customer']->data->token;

		}else{
			$post['token'] = $_SESSION['customer']->token;
		}

		$curl_post_data = $post;

		$response = call_postMethod($type = "POST",$service_url,$curl_post_data);

		$data = json_decode($response);	

		return $data;
	}

	// Customer  Customer Dashboard 
	public function getStylistList(){

		$lat_long = $_POST['lat_long'];
		$lat_long = explode('_', $lat_long);
		$_POST['appointment_date'] 	= $_POST['appointment_date'];
		$_POST['lat'] 				= $lat_long[0];
		$_POST['lang'] 				= $lat_long[1];
		$_POST['service_ids'] 		= $_POST['treat_sub_cat'];
		$stylist_data = getDataByMethod('getStylistList',$_POST);
		$html = '';

		$html .= '<div class="outer_box">';
		$html .= '<div class="all_stylist">';

		if (!empty($stylist_data)) {
			foreach ($stylist_data as $key => $value) {
				$img = '';
				if (!empty($value->portfoilioData)) {
					foreach ($value->portfoilioData as $key => $imgs) {
						$img .= '<li class="img_ico"><img src="'.$imgs.'"></li>';
					}
				}
				$html .= '<div class="tab_con_row stylist" data-id="'.$value->styler_id.'">
				<a class="stylist_man">
				<span class="img_ico"><img src="'.$value->profile_pic.'"></span>
				<input type="radio" id="st_'.$value->styler_id.'" class="stylist_ids" name="stylist_ids" value="'.$value->styler_id.'">
				<label for="st_'.$value->styler_id.'" class="stylist_name">'.ucwords($value->firstname).'</label>
				</a>				
				<a class="stylist_profile"><i class="fa fa-user"></i> <span>View Profile</span></a>
				<input type="hidden" name="category_name" value="'.$value->category_name.'" class="category_name">
				
				<div class="portfoilio_data" style="display:none;">'.$img.'</div>
				</div>';
			}
		}
		$html .= '<a data-tab="payment" class="next_btn">Proceed to Confirm <i class="fa fa-arrow-circle-right"></i></a>
		</div>
		</div>';

		if (!empty($stylist_data)) {
			//if($data->status == 1){
			die(json_encode(['success'=>'1','message'=>'$data->message','data'=>$html]));
			//}else{     
			//}
		}else{
			die(json_encode(['success'=>'0','message'=>'$data->message']));

		}
	}


	// Customer Dashboard 
	public function dashboard(){

		$data['upcomingBooking'] 	= getDataByMethod('upcomingAppoinment');
		$data['previousBooking'] 	= getDataByMethod('getPreviousAppoinment');
		$data['chatlist'] 			= $this->chatList();
		$data['categoryList'] 		= getDataByMethod('getCategory');
		$this->load->view('includes/user/metadata',$data);
		$this->load->view('includes/user/dashboard_header');
		$this->load->view('includes/user/sidebar');
		$this->load->view('home/dashboard');
		$this->load->view('includes/user/footer');	

	}

	// Customer previousBooking
	public function previousBooking(){
		$this->load->view('includes/user/metadata');
		$this->load->view('includes/user/dashboard_header');
		$this->load->view('includes/user/sidebar');
		$this->load->view('home/previousBooking');
		$this->load->view('includes/user/footer');	

	}

	// Customer previousBooking
	public function customerChat(){
		$this->load->view('includes/user/metadata');
		$this->load->view('includes/user/dashboard_header');
		$this->load->view('includes/user/sidebar');
		$this->load->view('home/customerChat');
		$this->load->view('includes/user/footer');	
	}

	// Customer previousBooking
	public function profileSettings( $child_page = 'profileSettings' ){
		$this->load->view('includes/user/metadata');
		$this->load->view('includes/user/dashboard_header');
		$this->load->view('includes/user/sidebar');
		$this->load->view('home/'.$child_page);
		$this->load->view('includes/user/footer');	

	}
	
	public function getViewStylish($id){
		$data = $this->db->select('*')->where(array('id'=>$id))->get('users')->result();
    	// echo "<pre>";
    	// print_r($data);
    	// die;
		echo json_encode(["success"=>1,"data"=>$data]);
	}

	//Customer Registration
	public function register() {
		$_POST['firstname'] 		= $this->input->post('firstname');
		$_POST['lastname'] 			= $this->input->post('lastname');
		$_POST['email'] 			= $this->input->post('email');
		$_POST['password'] 			= $this->input->post('password'); 
		$_POST['password_confirm'] 	= $this->input->post('password_confirm');
		$_POST['mobile'] 	        = $this->input->post('mobile');
		$_POST['referral_id'] 		= $this->input->post('referral_id');
		$_POST['user_type'] 		= 1;
		$_POST['certificate_ids'] 	= 1;
		unset($_POST['password_confirm']); 
		$service_url 		= api_base_url('register');
		$curl_post_data 	= $_POST;
		$response 			= call_postMethod("POST",$service_url,$curl_post_data);
		$data 				= json_decode($response);

		if (isset($data->status)) {
			if($data->status == 1){
				set_login('customer',$data);
				die(json_encode(['success'=>'1','message'=>$data->message,'user_type'=>$data->data->user_type]));
			}else{     
				die(json_encode(['success'=>'0','message'=>$data->message,'user_type'=>$data->status]));
			}
		}else{
			die(json_encode(['success'=>'0','message'=> 'Error in Mysql Connection','user_type'=> 'empty']));
		}
	}
	//Customer Logout
	public function logout(){

		$_POST['user_id'] = get_current_user_id();
		$service_url = api_base_url('logout');
		$curl_post_data = $_POST;
		$response = call_postMethod($type = "POST",$service_url,$curl_post_data);
		$data = json_decode($response);
		if($data->status == 1){
			session_destroy();
			unset($_SESSION['customer']);
			die(json_encode(['success'=>'1','message'=>$data->message]));
		}else{     
			die(json_encode(['success'=>'0','message'=>$data->message]));
		}
	}
	//Customer Forgot Password
	public function forgotPass() 
	{
		$_POST['email'] = $this->input->post('email');
		$_POST['user_type'] = 1; 
		$curl_post_data =$_POST;
		$service_url = api_base_url('forgetPassword');
		$response = call_postMethod($type = "POST",$service_url,$curl_post_data);
		$data = json_decode($response);
		if($data->status == 1){
			die(json_encode(['success'=>'1','message'=>$data->message]));
		}else{     
			die(json_encode(['success'=>'0','message'=>$data->message]));
		}
	}

	// Insert/Add New Appoinments
	public function submit_add_new_appointments_form(){
		if (isset($_POST['location_address'])) {
			$post = array();
			$post['location_postal_code'] 	= (isset($_POST['location_postal_code'])) ? $_POST['location_postal_code'] : '';
			$location_address 				= (isset($_POST['location_address'])) ? $_POST['location_address'] : '';
			$location_address 				= explode('_', $location_address);
			$post['lattitude'] 				= $location_address[0];
			$post['longitude'] 				= $location_address[1];
			$post['location']				= $_POST['location'];
			$post['category_id'] 			= (isset($_POST['treatment_type'])) ? $_POST['treatment_type'] : '';
			$category_id 					= (isset($_POST['treatment_data'])) ? $_POST['treatment_data'] : '';
			$post['service_id'] 			= implode(',', $category_id); 
			$post['appointment_date'] 		= (isset($_POST['date'])) ? date('Y-m-d H:i:s', strtotime($_POST['date'])) : '';
			$post['styler_id'] 				= (isset($_POST['stylist_id'])) ? $_POST['stylist_id'] : '';
			echo getDataByMethod('addAppoinment', $post, 'json');
		}
		die();
	}
	/**
	 * Paypal Payments Response
	 */
	function paypalPaymentResponce(){
		// paypalPaymentResponce?amt=80.00&cc=GBP&item_name=amansir&item_number=459&st=Completed&tx=4L415500PG737943N

		$appoinment_id 	= (isset($_GET['item_number'])) ? $_GET['item_number'] : ''; 
		$currency_code 	= (isset($_GET['cc'])) ? $_GET['cc'] : '';
		$status 	= (isset($_GET['st'])) ? $_GET['st'] : '';
		$tx 		= (isset($_GET['tx'])) ? $_GET['tx'] : '';
		$amount 	= (isset($_GET['amt'])) ? $_GET['amt'] : '';
		if (!empty($appoinment_id)) {
			
			// Get Old Amount
			// $old_amount = 0;
			// $query = "SELECT amount_paid_by_customer FROM `appointments` WHERE id=".$appoinment_id;
			// $getoldamount = $this->db->query($query)->row();
			// if (!empty($getoldamount)) {
			// 	if (isset($getoldamount->amount_paid_by_customer)) {
			// 		$old_amount = $getoldamount->amount_paid_by_customer;
			// 	}	
			// }

			$total_amt 		= $amount;
			$payment_type 	= (isset($_GET['cm'])) ? $_GET['cm'] : '';
			$payment_status = ($payment_type == 'full') ? '6' : '5';
			$status 		= ($status == 'Completed') ? $payment_status : '1';
			$postData 		= array();

			if (!empty($appoinment_id) && !empty($total_amt)) {
				$postData['appoinment_id'] 	= $appoinment_id;
				$postData['amount'] 		= $total_amt;
				$postData['transaction_id'] = (isset($_GET['tx'])) ? $_GET['tx'] : '';
				$postData['status'] 		= $status;
				$res = getDataByMethod('saveAppoinmentPayment',$postData);
				redirect("Home/dashboard");

			}else{
				redirect("Home/dashboard");
			}
		}else{
			redirect("Home/dashboard");
		}

	}

	public function insertrow($data,$table)
	{
		$this->db->insert($table,$data);
		
	}
	public function updaterow($data,$table,$id)
	{
		$this->db->where($id);
		$this->db->update($table,$data);
	}
	public function profileSetting(){

		if(empty($_SESSION['customer'])){
			redirect("Home");
		}

		$service_url = api_base_url('getCustomerProfile');
		
		$post['customer_id'] = $_SESSION['customer']->data->id;

		if(isset($_SESSION['customer']->data->token) && $_SESSION['customer']->data->token !='' ){

			$post['token'] = $_SESSION['customer']->data->token;

		}else{
			$post['token'] = $_SESSION['customer']->token;
		}

		$post['user_type'] = 1; 

		$curl_post_data = $post;

		$response = call_postMethod($type = "POST",$service_url,$curl_post_data);

		$data['getCustomerProfile'] = json_decode($response);
		// echo "<pre>";
		// print_r($response); die;
		$this->load->view('includes/user/metadata',$data);
		$this->load->view('includes/user/dashboard_header');
		$this->load->view('includes/user/sidebar');
		$this->load->view('home/profile_setting');
		$this->load->view('includes/user/footer');	
	}


	public function upload_Customerpic($name,$file_name)
	{

		$directory = 'uploads/customer/'.$_SESSION['customer']->data->id;
		if (is_dir($directory)) {
			//chmod($directory, 0777);
			$error = error_get_last();
			$res['directory_error_message'] = $error['message'];
		}else{
			mkdir($directory, 0777);
		}

		$config['upload_path'] = 'uploads/customer/'.$_SESSION['customer']->data->id;
		$config['allowed_types'] = 'gif|jpg|png|jpeg';
		$config['max_size'] = '30000';
		$config['max_width'] = '102400';
		$config['max_height'] = '76800';
		$config['file_name'] = $file_name;

		$this->upload->initialize($config);		
		$this->load->library('upload');
		if($this->upload->do_upload($name)) {
			$databasea['upload_data'] = $this->upload->data();
			return  $databasea['upload_data']['file_name'];
		} else {

			return array('error' => $this->upload->display_errors());

		}
	}

	public function updateCustomerProfile(){

		$service_url = api_base_url('updateCustomerProfile');
		
		$post['user_id'] = $_SESSION['customer']->data->id;

		if(isset($_SESSION['customer']->data->token) && $_SESSION['customer']->data->token !='' ){
			$post['token'] = $_SESSION['customer']->data->token;
		}else{
			$post['token'] = $_SESSION['customer']->token;
		}

		$post['firstname'] = $_POST['firstname'];
		$post['lastname'] = $_POST['lastname'];
		$post['mobile'] = $_POST['mobile'];
		$post['landline'] = $_POST['landline'];

		$user_type = 1;


		if(!empty($_FILES['profile_pic']['name']) && isset($_FILES['profile_pic']['name'])){

			$img_array = explode(".", $_FILES['profile_pic']['name']);

			$ext = end($img_array);

			$new_fileName = time().'_'.time().".".$ext;	
			$profileIMG['image'] = $this->upload_Customerpic('profile_pic',$new_fileName);
			$this->insertrow($profileIMG,'users_images');

			$imagID =  $this->db->insert_id();

			$dataID['profile_pic'] = $imagID;

			$whr['id'] = $_SESSION['customer']->data->id;
			$this->updaterow($dataID,'users',$whr);

		}

		$curl_post_data = $post;

		$response = call_postMethod($type = "POST",$service_url,$curl_post_data);

		$data['getCustomerProfile'] = json_decode($response);
		$this->session->set_flashdata('success',$data['getCustomerProfile']->message); 
		redirect(get_current_page_method_url('profilesettings/settings'));


	}

	public function changePassword(){

		if(empty($_SESSION['customer'])){
			redirect("Home");
		}

		$this->load->view('includes/user/metadata');
		$this->load->view('includes/user/dashboard_header');
		$this->load->view('includes/user/sidebar');
		$this->load->view('home/changePassword');
		$this->load->view('includes/user/footer');	
	}


	public function customerChangePassword(){


		if(empty($_SESSION['customer'])){
			redirect("Home");
		}

		$service_url = api_base_url('changeUserPassword');
		
		$post['user_id'] = $_SESSION['customer']->data->id;

		if(isset($_SESSION['customer']->data->token) && $_SESSION['customer']->data->token !='' ){

			$post['token'] = $_SESSION['customer']->data->token;

		}else{
			$post['token'] = $_SESSION['customer']->token;
		}

		$post['old_password'] = $_POST['old_password'];
		$post['new_password'] = $_POST['new_password'];
		
		$curl_post_data = $post;

		$response = call_postMethod($type = "POST",$service_url,$curl_post_data);
		
		$data['getCustomerProfile'] = json_decode($response);
		
		$this->session->set_flashdata('success',$data['getCustomerProfile']->message); 

		redirect(get_current_page_method_url('profilesettings/changePassword'));

	}


	public function yourBeautyDetails()
	{
		if(empty($_SESSION['customer'])){
			redirect("Home");
		}

		$service_url = api_base_url('getBeautyCategory');
		
		$post['customer_id'] = $_SESSION['customer']->data->id;

		if(isset($_SESSION['customer']->data->token) && $_SESSION['customer']->data->token !='' ){

			$post['token'] = $_SESSION['customer']->data->token;

		}else{
			$post['token'] = $_SESSION['customer']->token;
		}

		$curl_post_data = $post;

		$response = call_postMethod($type = "POST",$service_url,$curl_post_data);

		$data['getBeautyCategory'] = json_decode($response);

		$this->load->view('includes/user/metadata',$data);
		$this->load->view('includes/user/dashboard_header');
		$this->load->view('includes/user/sidebar');
		$this->load->view('home/your_beauty_details');
		$this->load->view('includes/user/footer');	
	}


	public function upload_Customerpics()
	{

		// $directory = 'uploads/customer/'.$_SESSION['customer']->data->id;
		// if (is_dir($directory) == false) {

		// 	if (!@mkdir($directory)) 
  //         {
  //         	$error = error_get_last();
  //           $res['directory_error_message'] = $error['message']; 
  //         }
  //         else
  //         {
  //         	chmod($directory, 0777); 
		//   }

		// }
		$config['upload_path'] = 'uploads/customer/'.$_SESSION['customer']->data->id;
		$config['allowed_types'] = 'gif|jpg|png|jpeg';
		$config['max_size'] = '30000';
		$config['max_width'] = '102400';
		$config['max_height'] = '76800';

		return $config;
	}
	public function updateBeautyDetails(){
		$array = $new_image_ids = $uploadData = array();
		$service_url = api_base_url('updateBeautyDetails');
		$post['user_id'] = $_SESSION['customer']->data->id;
		if(isset($_SESSION['customer']->data->token) && $_SESSION['customer']->data->token !='' ){
			$post['token'] = $_SESSION['customer']->data->token;
		}else{
			$post['token'] = $_SESSION['customer']->token;
		}
		$dat = count($_POST);
		for ($i=0; $i < $dat; $i++) { 
			if (isset($_POST['beauty_sub_category_ids'.$i])) {
				$array[] = $_POST['beauty_sub_category_ids'.$i];	
			}
			$beautySUBCat = implode(',', $array);
		}
		$post['beauty_sub_category_ids'] = $beautySUBCat; 
		if(!empty($_FILES['image_ids']['name']) && $_FILES['image_ids']['error'] != 0){

			$cpt = count($_FILES['image_ids']['name']);
			$file_name_data = $_FILES['image_ids']['name'];
			if (!empty($file_name_data) && is_array($file_name_data)) {
				if (array_key_exists('0', $file_name_data)) {
					$upload_data1 = $file_name_data[0];
					if (!empty($upload_data1)) {
						
						$file_data = count($file_name_data);

						for($i=0; $i < $file_data; $i++){           
							$_FILES['image_id']['name'] 	= $_FILES['image_ids']['name'][$i];
							$_FILES['image_id']['type'] 	= $_FILES['image_ids']['type'][$i];
							$_FILES['image_id']['tmp_name']= $_FILES['image_ids']['tmp_name'][$i];
							$_FILES['image_id']['error']	= $_FILES['image_ids']['error'][$i];
							$_FILES['image_id']['size']	= $_FILES['image_ids']['size'][$i];    

							$this->load->library('upload');
							$this->upload->initialize($this->upload_Customerpics());
							$this->upload->do_upload('image_id');
							$proImg = $this->upload->data();

							$uploadData[$i]['image'] = $proImg['file_name'];
							$uploadData[$i]['created_date'] = date("Y-m-d H:i:s");

							$data1['image'] = $proImg['file_name'];
							$new_image_ids[] = $this->insertrow($data1,'users_images');

						}
						if (!empty($uploadData) && isset($_POST['old_image_ids']) && $_POST['old_image_ids']) {
							
							$new_image_ids = multifileUpload($uploadData);

							$old_image_ids = $_POST['old_image_ids'];

							$merge_images = array_merge($new_image_ids,$old_image_ids);

							$image_ids = implode(',', $merge_images);
						}else{
							$new_image_ids = multifileUpload($uploadData);
							if (!empty($new_image_ids)) {
								$image_ids = implode(',', $new_image_ids);
							}else{
								$image_ids = '';
							}
						}
						$post['image_ids'] = $image_ids;
					}else{
						// Upload Exist Images
						if (isset($_POST['old_image_ids']) && $_POST['old_image_ids']) {
							$post['image_ids'] = implode(',', $_POST['old_image_ids']);
						}
					}
				}
			}
		}else{
			// Upload Exist Images
			if (isset($_POST['old_image_ids']) && $_POST['old_image_ids']) {
				$post['image_ids'] = $_POST['old_image_ids'];
			}
		}

		$post['allergy'] = $_POST['allergy'];		
		$curl_post_data = $post;

		$response = call_postMethod($type = "POST",$service_url,$curl_post_data);
		$data['updateBeautyDetails'] = json_decode($response);
		$this->session->set_flashdata('success',$data['updateBeautyDetails']->message); 
		redirect(site_url().'home/profilesettings/yourBeautyDetails');

	}


	public function yourAddresses()
	{

		if(empty($_SESSION['customer'])){
			redirect("Home");
		}

		$service_url = api_base_url('customerAddress');
		
		$post['user_id'] = $_SESSION['customer']->data->id;

		if(isset($_SESSION['customer']->data->token) && $_SESSION['customer']->data->token !='' ){

			$post['token'] = $_SESSION['customer']->data->token;

		}else{
			$post['token'] = $_SESSION['customer']->token;
		}

		$curl_post_data = $post;

		$response = call_postMethod($type = "POST",$service_url,$curl_post_data);

		$data['getAddress'] = json_decode($response);
		$this->load->view('includes/user/metadata',$data);
		$this->load->view('includes/user/dashboard_header');
		$this->load->view('includes/user/sidebar');
		$this->load->view('home/yourAddresses');
		$this->load->view('includes/user/footer');	
	}

	public function saveCustomerAddress(){ 
		$latitude_longitude 	= $this->input->post('latitude_longitude');
		$new_address 			= $this->input->post('add_new_address');
		if (!empty($latitude_longitude) && !empty($new_address)) {
			$lat_long = explode("_", $latitude_longitude);
			$data['lattitude'] 	= $lat_long[0];
			$data['longitude'] 	= $lat_long[1];
			if (!empty($lat_long) && is_array($lat_long)){
				$data['lattitude'] 	= $lat_long[0];
				$data['longitude'] 	= $lat_long[1];
			}
			$data['address'] 	= $new_address;
			$response = getDataByMethod('addAddress',$data);
			if($response->status == 1){
				$this->session->set_flashdata('message',$response->message);
				redirect(get_current_page_method_url('profilesettings/?msg=address_added'));
			}else{
				$this->session->set_flashdata('message',$response->message);
				redirect(get_current_page_method_url('profilesettings/?msg=address_error'));
			}
		}else{
			$this->session->set_flashdata('message', 'please address is required!');
			redirect(get_current_page_method_url('profilesettings/?msg=address_empty'));
		}
	}

	/**
	 * Save Users Chat Data
	 * @method -> saveChat
	 * @params user_id, token, message_to, message, status, room_id
	 */

	public function saveUsersChat(){
		$data['message_to'] = $this->input->post('message_to');
		$data['message'] 	= base64_encode($this->input->post('message'));
		//$data['status'] 	= $this->input->post('status');
		$data['room_id'] 	= $this->input->post('room_id');
		getDataByMethod('saveChat',$data);
		echo json_encode(array('status' => '1'));
	}
	/**
	 * Delete Saved Address
	 */

	public function deleteSavedAddress( $delete_add = '2 Holker Cottages, Cark in Cartmel, Grange-over-Sands, Cumbria' ){

		$curr_user_id = get_current_user_id();
		echo '<pre>';
		$query 			= "SELECT address FROM `users` WHERE id=$curr_user_id";
		$address_data 	= $this->db->query($query)->row();
		if (!empty($address_data)) {
			$address 		= $address_data->address.'<br/>';
			$updated_add 	= str_replace($delete_add,'',$address);

			$this->session->set_flashdata('delete_address_request', '<div class="alert alert-success text-center">Address Deleted!</div>');
		}else{
			$this->session->set_flashdata('delete_address_request', '<div class="alert alert-warning text-center">Could Not Delete Address!</div>');
		}
	}

   public function delete()
   {
   	 	$curr_user_id = get_current_user_id();
   	    $whr['id']=$curr_user_id;
        $this->db->select('address');
        $this->db->where('id',$curr_user_id);
        $data = $this->db->get('users');


        $address = $data->row()->address;
        $exp_add = explode('#', $address);
        $user_add = (isset($_GET['add'])) ? $_GET['add'] : '';

        foreach ($exp_add as $key => $value) {
	        if ($user_add == $value) {
	        	unset($exp_add[$key]);
	        }
        }

        $save_add = implode('#', $exp_add);
      
        $query = $this->db->query("UPDATE users SET address='$save_add' WHERE id=$curr_user_id");
		redirect(get_current_page_method_url('profilesettings/?msg=address_deleted'));
        //redirect('Home/profilesettings');
   	}

	public function payments() {
		$title['title']	= "Payment Preferences";
		$this->load->view('includes/user/metadata',$title);
		$this->load->view('includes/user/dashboard_header',$title);
		$this->load->view('home/payments');
		$this->load->view('includes/user/footer');
	}
	/**
	* Set Payment Preferences
	*/
	public function setPaymentPreferences() {
		$_POST['user_id'] = $_SESSION['customer']->data->id;
		$_POST['token'] = $_SESSION['customer']->data->token;
		$_POST['preferences_text'] =base64_encode($_POST['preferences_text']);
		$service_url = api_base_url('savePaymentPreferences');
		$response = call_postMethod($type = "POST",$service_url,$_POST);
		$data = json_decode($response);
		if($data->status == 1){
			die(json_encode(['success'=>'1','message'=>$data->message]));
		}else{     
			die(json_encode(['success'=>'0','message'=>$data->message]));
		}	
	}
	/**
	* get Payment Preferences
	*/
	public function getPaymentPreferences() {	
		$_POST['user_id'] = $_SESSION['customer']->data->id;
		$service_url = api_base_url('getPaymentPreferences');
		$response = call_postMethod($type = "POST",$service_url,$_POST);
		$data = json_decode($response);
		if($data->status == 1){
			die(json_encode($data));
		}else{     
			die(json_encode($data));
		}	
	}

	public function notification(){
		$title['title']	= "Notification";
		$this->load->view('includes/user/metadata',$title);
		$this->load->view('includes/user/dashboard_header',$title);
		$this->load->view('home/notification');
		$this->load->view('includes/user/footer');
		
	}
	//Get Notification notificationCount
	public function notificationCount(){

		$_POST['user_id'] = $_SESSION['customer']->data->id;
		$_POST['token'] = $_SESSION['customer']->token;
		$data = getDataByMethod('getNotification',$_POST);
		$data1 = getDataByMethod('getUnreadNotification',$_POST);
		if (!empty($data)) {
			$count_notif = count($data);
		}else{
			$count_notif = 0;
		}
		if($count_notif == 0){
			die(json_encode(['success'=>'0','message'=>"No data"]));
		}else{     
			die(json_encode(['success'=>'1','message'=>"Success",'count'=>$data1,'data'=>$data]));
		}
	}
	public function updateNotificationStatus(){
		$_POST['user_id'] = $_SESSION['customer']->data->id;
		$_POST['token'] = $_SESSION['customer']->token;
		$_POST['status']= 1;
		$service_url = api_base_url('updateNotificationStatus');
		$response = call_postMethod($type = "POST",$service_url,$_POST);
		$data = json_decode($response);
        if($data->status == 1){
            die(json_encode(['success'=>'1','message'=>$data->message]));
        }else{     
            die(json_encode(['success'=>'0','message'=>$data->message]));
        }
	}

	public function imageToUrl(){
   		$files = $_FILES['file_attach']['name'];
   		$arr = explode('.', $files);
   		$ext = end($arr);
   		if( ( $ext == 'gif')  || ( $ext == 'jpg')  || ( $ext == 'png')  || ( $ext == 'jpeg')){
   			$type = 1;
   		}else{
   			$type = 2;
   		}      
    	$config ['upload_path'] = 'uploads/attachment/';
    	$config ['allowed_types'] = 'gif|jpg|png|jpeg|pdf|doc';
    	$config['encrypt_name'] = TRUE;
    	$this->upload->initialize($config);
   		if($this->upload->do_upload('file_attach')){
        	$fileData = $this->upload->data();
        	chmod($fileData['full_path'], 0777);
        	$filename = $fileData['file_name'];
        	$imgPath = base_url().'/uploads/attachment/'.$filename;
     		exit(json_encode(array('img' => $imgPath,'type' => $type ))); 
   		}else{
   			exit(json_encode(array('error' => $this->upload->display_errors(),'type' => $type ))); 
   		}      
	}

	public function privacyPolicy(){
		$title['title']	= "Trems & Privacy Policy";
		$this->load->view('home/privacy_policy');
	}

}