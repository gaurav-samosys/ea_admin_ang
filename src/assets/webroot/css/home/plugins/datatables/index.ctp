<?php echo $this->Session->flash('custom-flash'); ?>
 <div class="bg-main landing-wrapped full-height">
        <div class="wrapped bg-main">
            <header class="header header-desktop">
                <div class="container">
                    <div class="widget">
                        <div class="logo">
                            <div class="logo-wrap">
                                <div class="logo-inner">
                                   <img src="<?php echo $this->webroot; ?>app/webroot/img/home/images/enriched-logo.jpg" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="logo-sub-heading">because everyone deserves <span>financial awareness</span></div>
                        <div class="buttons-group text-right">
                            <ul>
                                <li class="signin">
                                    <a href="javascript:void(0)" class="blue-button go-to-login stopProp">Sign In</a>
                                </li>
                                <li class="Register">
                                    <a href="javascript:void(0)" class="gray-button go-to-resigter-code stopProp">Register</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <div class="header-mobile">
                <header class="header">
                    <div class="container">
                        <div class="logo-wrap">
                            <div class="logo-inner">
                               <img src="<?php echo $this->webroot; ?>app/webroot/img/home/images/logo.jpg" alt="">
                            </div>
                        </div>
                        <div class="tag-line">
                            <p>because everyone deserves <span>financial awareness</span></p>
                        </div>
                        <div class="buttons-group text-right">
                           <ul>
                                <li class="signin">
                                    <a class="blue-button stopProp" href="javascript:void(0)" title="Sign In"><span></span></a>
                                </li>
                                <li class="Register">
                                    <a class="gray-button stopProp" href="javascript:void(0)" title="Register"><span></span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
                <div class="tag-line">
                    <p>because everyone deserves <span>financial awareness</span></p>
                </div>
            </div>

            <div class="content landing-cotent">
                <div class="container landing-cotainer">
                    <div class="row landing-row">
                        <div class="col-md-6 col-sm-6 landing-columns">
                            <div class="black-transparent full-center landing-column-left">
                                <div class="widget">
                                    <div class="widget-inner">
                                        <div class="widget-inner-item">
                                            <h1>Are you part of our partner organizations?</h1>
                                            <div class="spacer20"></div><div class="spacer20"></div>
                                            <h6>You can <span>search</span> below for organization you study or work in order to use our courses</h6>
                                            <div class="search-feild">
                                                <div class="search-button">
                                                	<button class="go-to-login" 
                                                	type="button">Search</button>
                                                </div>
                                                <input type="hidden" id="search-box-hidden" name="search" value="">
                                                <input type="text" id="search-box" autocomplete="off"  onkeypress="return runScript(event)"  placeholder="Type to search" value="">
                                                <div id="suggesstion-box"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="visible-xs spacer20"></div>
                        <div class="col-md-6 col-sm-6 landing-columns">
                            <div class="landing-column-right full-center">
                                <div class="widget">
                                    <div class="widget-inner">
                                        <div class="widget-inner-item">
                                            <h1>Individual/invite code <br><br></h1>
                                            <div class="spacer20 spacer20 hidden-xs hidden-sm"></div><div class="spacer20 spacer20 hidden-xs hidden-sm"></div>
                                            <h6>That’s not a problem. You still can use our courses to become better in managing your finances</h6>
                                            <div class="spacer20"></div><div class="spacer20"></div>
                                            <div class="buttons-group">
                                                <ul>
                                                    <li class="signin">
                                                        <a class="blue-button go-to-resigter stopProp" href="javascript:void(0)">Register for free!</a>
                                                    </li>
                                                    <li class="visible-sm visible-xs spacer10"></li>
                                                    <li class="Register">
                                                        <a class="blue-button-bordered stopProp" href="javascript:void(0)">Learn More</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 <?php
echo $this->Html->script(initbasepath.
						'js/home/dist/js/home/company.js', 
						array('block' => 'scriptBottom'));


  
  ?>