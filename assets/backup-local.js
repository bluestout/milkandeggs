var lc_base_url = '//ld-app.xoobo.com/';
var store_url   = 'milk-eggs.myshopify.com';


	
$(document).ready(function(){

	var xld = $("#xld_main");

	if( xld.length > 0 ){

		var btnCheckout = $("input[name='checkout']");

		btnCheckout.attr('disabled','disabled').attr('data-temp',btnCheckout.val()).val('Select delivery date before checkout');

		xld.find('#xld_html').html('<h3 data-test="trure" class="label">Please select delivery date below:</h3><a href="https://cdn.shopify.com/s/files/1/1078/0310/files/map201712.jpg?1309964536974562640" target="0"><img src="https://cdn.shopify.com/s/files/1/1078/0310/files/map201712-small.jpg?1309964536974562640" width="250"><br>Los Angeles / Orange County Delivery Area Map</a>'); 
	

		var date_value = $("#xld_main").find('#datepicker').val();
		if(date_value!=''){
			loadTimes(date_value);
		}


		/// init DatePicker
		$("#xld_main").find('#datepicker').datepicker({
			showAnim: 'fold',
			showOtherMonths: true,
			selectOtherMonths: true,
			showOptions: { direction: "up" },
			beforeShow: function(){ $("#xld_main").find("#datepicker").blur(); },
			dateFormat: 'yy/mm/dd',
			minDate: '+2D',
			maxDate:'+32D',			beforeShowDay: getUnavailableDays,
			onSelect: function(text,int){
				loadTimes(text);
			}
		});




	}



});	


function loadTimes(text){
	var btnCheckout = $("input[name='checkout']");
	var xld_time = $("#xld_time");
	xld_time.html('<option value="">Please wait...</option>').attr('disabled','disabled');
	$.post(lc_base_url+"/js/index/dates.json",{
		date: text,
		store_url: store_url
	}, function(e){
		console.log('Hello this is new method');
		if(e.status=='success'){
			btnCheckout.val(btnCheckout.attr('data-temp')).removeAttr('disabled');
			btnCheckout.val('Checkout');
			xld_time.removeAttr('disabled');
			xld_time.html(e.html);
		}else{
			xld_time.html(e.html);
		}	

		if(typeof attrCallback === 'function'){
			attrCallback(text);
		}
	});
}


function getUnavailableDays(date){
	
	var availableDays = [1,2,3,4,5,6];

	var blackOutDates = ['2018/01/01','2018/01/02','2017/12/25','2017/12/26','2017/11/24','2017/07/04','2017/01/02','2018/02/06','2018/02/07'];

	if($.inArray(date.getDay(),availableDays) != '-1'){


		if($.inArray($.datepicker.formatDate('yy/mm/dd', date ), blackOutDates) > -1){
			return [false,'','Booked'];
		}else{
			return [true,'','Book Now'];
		}

	}else{
		return [false,'','Booked'];
	}
}