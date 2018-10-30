var lc_base_url = '//ld-app.xoobo.com/';
var store_url = 'milk-eggs.myshopify.com';

var blackOutDays;

var maxdate = "";
var mindate = "";

$(document).ready(function () {

    var xld = $("#xld_main");

    $.post(lc_base_url + "/js/index/getBlackout.json", {}, function (e) {
        blackOutDays = e.dates;
    });
    
    
    
    if (xld.length > 0) {

        var btnCheckout = $("input[name='checkout']");

        btnCheckout.attr('disabled', 'disabled');
        btnCheckout.attr('data-temp', 'Select delivery date before checkout');
        btnCheckout.val('Select delivery date before checkout');

        xld.find('#xld_html').html('<h3 data-test="trure" class="label">Please select delivery date below:</h3><a href="https://cdn.shopify.com/s/files/1/1078/0310/files/map201712.jpg?1309964536974562640" target="0"><img src="https://cdn.shopify.com/s/files/1/1078/0310/files/map201712-small.jpg?1309964536974562640" width="250"><br>Los Angeles / Orange County Delivery Area Map</a>');

            
        $.post(lc_base_url + "/js/index/getOff.json", {}, function (e) {
            console.log(e);          	
            maxdate = "+" + e.maxdate + "D";
            mindate = "+" + e.mindate + "D";
            console.log(maxdate);
            console.log(mindate);
          if(e.status == "success"){
            $("#xld_main").find('#datepicker').datepicker({

                showAnim: 'fold',
                showOtherMonths: true,
                selectOtherMonths: true,
                showOptions: {
                    direction: "up"
                },
                beforeShow: function () {
                    $("#xld_main").find("#datepicker").blur();
                },
                dateFormat: 'yy/mm/dd',
                minDate: mindate,
                maxDate: maxdate,
                beforeShowDay: getUnavailableDays,
                onSelect: function (text, int) {
                    loadTimes(text);
                }
            });
          }
        });
        /// init DatePicker
      
      	//var date_value = $("#xld_main").find('#datepicker').val();
      	//console.log("Date_value " + date_value);
        //if (date_value != '') {
        //    loadTimes(date_value);
        //}
        




    }



});


function loadTimes(text) {
    var btnCheckout = $("input[name='checkout']");
    var xld_time = $("#xld_time");
    xld_time.html('<option value="">Please wait...</option>').attr('disabled', 'disabled');
    btnCheckout.attr('disabled', 'disabled');
    $.post(lc_base_url + "/js/index/checkcap.json", {
        date: text,
    }, function (e) {
        console.log(e);
        if (e.status == 'full') {
            $('.del_date_full_error_text').show();
             btnCheckout.attr('disabled', 'disabled');
             btnCheckout.attr('data-temp', 'Select another delivery date');
            btnCheckout.val('Select another delivery date');
        } else if (e.status == 'not full') {
            $('.del_date_full_error_text').hide();
            $.post(lc_base_url + "/js/index/dates.json", {
                date: text,
                store_url: store_url
            }, function (e) {
                if (e.status == 'success') {
                    xld_time.html(e.html);
                    xld_time.removeAttr('disabled');                    
                    btnCheckout.val(btnCheckout.attr('data-temp')).removeAttr('disabled');
                    btnCheckout.attr('data-temp', 'Checkout');
                    btnCheckout.val('Checkout');                    
                    console.log(e);                    
                } else if (e.status == 'noslot') {
                    console.log(e);
                    xld_time.html(e.html);
                    btnCheckout.attr('disabled', 'disabled');
                    btnCheckout.attr('data-temp', 'Select another delivery date');
                    btnCheckout.val('Select another delivery date');  
                }

                if (typeof attrCallback === 'function') {
                    attrCallback(text);
                }
            });
        }
    });
}


function getUnavailableDays(date) {

    var availableDays = [1, 2, 3, 4, 5, 6];

    var backup = ['2018/02/01', '2018/01/02', '2017/12/25', '2017/12/26', '2017/11/24', '2017/07/04', '2017/01/02', '2018/01/11', '2018/01/12'];

    if ($.inArray(date.getDay(), availableDays) != '-1') {
        if ($.inArray($.datepicker.formatDate('yy/mm/dd', date), blackOutDays) > -1) {
            return [false, '', 'Booked'];
        } else {
            return [true, '', 'Book Now'];
        }

    } else {
        return [false, '', 'Booked'];
    }
}
