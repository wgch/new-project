function changeCurrency(value){
    if(value == 1){
        $( "#senderCountry" ).removeClass( "hidden" )
        $( "#receiverCountry" ).addClass( "hidden" )
    }else{
        $( "#receiverCountry" ).removeClass( "hidden" )
        $( "#senderCountry" ).addClass( "hidden" )
    }
}
var countries = []
var exchangeRate =0
var senderCurrency='AED'
var receiverCurrency = 'KES'
$('#receiverCur span.rCurrency').text(receiverCurrency)
$('#senderCur span.sCurrency').text(senderCurrency)
$.get({
    url: 'https://api.helasend.com/v1/exchangerates',
    type: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNiMTVlZDdjMzMxYzVhNjdhMjYzYjY0N2M0MGI4ODEwM2E1Mzc3N2JmYjVhZGJkZGUzMDg1NjZkOTk1YWM5ZDMyNWFkMTZjMmYzZTlhMzU5In0.eyJhdWQiOiIyIiwianRpIjoiM2IxNWVkN2MzMzFjNWE2N2EyNjNiNjQ3YzQwYjg4MTAzYTUzNzc3YmZiNWFkYmRkZTMwODU2NmQ5OTVhYzlkMzI1YWQxNmMyZjNlOWEzNTkiLCJpYXQiOjE2MTQ3ODMxMzcsIm5iZiI6MTYxNDc4MzEzNywiZXhwIjoxNjQ2MzE5MTM3LCJzdWIiOiIiLCJzY29wZXMiOltdfQ.BBmvqFqVnyhv6bWVLCVL_cCRRNc5OiQPY32mo7jSUHw3Di3pWc0mzyYTKmaJ_E--0O1FxQyTmtPHev5tuIDjltFt9zn8gQByH_mOZ1tQbIbvyrLWAaTPiQgQrtF40z3YQCAzNJy9eDJQvx9RpQdPsmFiJMULjiu_5ubjkdNMbUr1mvAez2dVY8hpp51zBy5H6Rh6Wlaj-Y3OGLC8aippP5misYCMKb9A7da6GeYd-V2LKjaINK5XbniRxgk4w3i0EO4cgXxPEP_1qMAU0F0lEY-2E6JcRboOLp8pAs2tbaNURGD6ejWlX4ncoV800UDNFBhuc-iZB80IXmgnI-qsrpG_zsC-R94W1IZLKIeXv_xAwZQnJFKVY2v7CQUPueSLIf-ThMlCqrQMpUm69ikROscF_KlkUm5UDRa4qPXY3hf_aJsUMw3E-YSHjp-96ZLZq13dEObDExqQ6GlX1kHNXvzsijJLK25c2IDy9rubjC0fv0Cq4rqH4FheboT-6UjSMbIHR9L9D5HAd0dSOijhneySy8MhSNp3WtRWlFbNcweat26I_lRcO_ea4Xj6Fi1RCPaPE-H45SOmvAPench6Nav1pWO6QVlhl4YyNRVD8_n9goJHImifLlaO1I80d3oyr-CbQQwDO2IRhjtRS-seYsJYpBDCaZhnycfne99eykc"
    },
    success: function (response, status, jQxhr) {
        $( "#loader" ).addClass( "hidden" )
        countries = response.data
        for (var j=0; j < countries.length; j++) {
            var currencyType= countries[j].currency
            var country =  countries[j].name
            var senderFee = 0
            if(countries[j].isSourceCountry == 1){
                $("#countriesSend").append('<li id="'+currencyType+'" class="flex items-center py-2 px-3 cursor-pointer border-b hover:bg-gray-50" value="'+currencyType+'"><img src="'+countries[j].flag+'" class="flex-shrink inline-block align-middle rounded-sm border mr-2" width="16px" /><span class="flex-grow inline-block align-middle">'+countries[j].name+'</span><span class="flex-shrink">'+currencyType+'</span></li>');
                //onclick="selectedSender('+countries[i].currency+')"
                $("#"+countries[j].currency).attr("onclick", "selectedSender('"+currencyType+"')");
            }
            if(countries[j].isDestinationCountry == 1){
                $("#countriesReceive").append('<li class="'+currencyType+' flex items-center py-2 px-3 cursor-pointer border-b hover:bg-gray-50" value="'+currencyType+'"><img src="'+countries[j].flag+'" class="flex-shrink inline-block align-middle mr-2 border rounded-sm" width="16px" /><span class="flex-grow inline-block align-middle whitespace-nowrap">'+countries[j].name+'</span><span class="flex-shrink">'+currencyType+'</span></li>');
                $("."+countries[j].currency).attr("onclick", "selectedReceiver('"+currencyType+"')");
            };
        }
        for (var i=0; i < countries.length; i++) {
            var currencyType= countries[i].currency
            var country =  countries[i].name
            var senderFee = 0;
            if (countries[i].currency == receiverCurrency) {
                var isDestination = countries[i].isDestinationCountry
                var payoutOptionData = countries[i].payoutOptionsData
                if(senderCurrency=='USD') {
                    exchangeRate = countries[i].rates;
                    senderFee = countries[i].fee;
                }
                else {
                    var senderUSDExhangeRate = 0
                    var senderExchangeRate = countries[i].rates
                    for (var i=0; i < countries.length; i++) {
                        if (countries[i].currency == senderCurrency) {
                            senderUSDExhangeRate = countries[i].marketRates;
                            senderFee = countries[i].fee;
                            //console.log("Exhange rate "+senderUSDExhangeRate+" Rate kes for usd "+senderExchangeRate)
                        }
                        exchangeRate = (1/senderUSDExhangeRate)  * senderExchangeRate
                    }
                }
                $('#feeState').text(senderCurrency+' '+senderFee)
                $('#exchangeRate').text('1 '+senderCurrency+' = '+exchangeRate.toFixed(2)+' '+receiverCurrency);
                if(isDestination == 1){

                    if(payoutOptionData.length> 0){
                        $('#deliveryMethods').removeClass('hidden');
                        $("#deliveryList").empty();
                        for (var j=0; j < payoutOptionData.length; j++) {
                            $("#deliveryType").text('Select channel')
                            $("#deliveryList").append('<li id="'+j+'" class="px-3 py-2 text-gray-500 border-b hover:bg-gray-50 cursor-pointer"><div class="text-md font-montserrat font-medium">'+payoutOptionData[j].payoutOptionName+'</div><div class="text-xs">Send money via '+payoutOptionData[j].providerName+'</div></li>');
                            $("#"+j).attr("onclick", "selectDelivery('"+payoutOptionData[j].providerName+"')");
                        }
                    }
                }
            }
        }

    },
    error: function (jQxhr, status, error) {
        $( "#loader" ).addClass( "hidden" )
    }
});

function selectDelivery(value){
    $("#deliveryType").text(value)

}

function selectedSender(value){
    //console.log("am here")
    $( "#senderCountry" ).removeClass( "hidden" )
    // alert(value)
}
$('#sendAmount').bind('input', function() {
    var sendAmount = $('#sendAmount').val()
    var receiveAmount = sendAmount * exchangeRate
    $('#receiveAmount').val(receiveAmount.toFixed(2))
});
$('#receiveAmount').bind('input', function() {
    var receiveAmount = $('#receiveAmount').val()
    var sendAmount = receiveAmount / exchangeRate
    $('#sendAmount').val(sendAmount.toFixed(2))
});
document.addEventListener("click", (evt) => {
    const senderCur = document.getElementById("senderCur");
    const receiverCur = document.getElementById("receiverCur");
    const senderSearch = document.getElementById("senderSearch");
    const deliveryType = document.getElementById("deliveryType");
    let targetElement = evt.target; // clicked element
    do {
        if (targetElement == senderCur || targetElement == receiverCur  || targetElement == senderSearch || targetElement == deliveryType ) {
            //document.getElementById("flyout-debug").textContent = "Clicked inside!";
            if(targetElement == deliveryType){
                $('#deliveryListOb').removeClass('hidden')
            }
            //console.log("clicked inside")
            return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement);

    // This is a click outside.
    $( "#senderCountry" ).addClass( "hidden" )
    $( "#receiverCountry" ).addClass( "hidden" )
    $('#deliveryListOb').addClass( "hidden" )
    //console.log("clicked outside "+targetElement)
});
function selectedSender(value){
    $( "#loader" ).removeClass( "hidden" )
    //console.log("am here "+value)
    senderCurrency = value
    for (var i=0; i < countries.length; i++) {
        if (countries[i].currency == receiverCurrency) {
            if(senderCurrency=='USD') {
                exchangeRate = countries[i].rates;
                senderFee = countries[i].fee;
            }
            else {
                var senderUSDExhangeRate = 0
                var senderExchangeRate = countries[i].rates
                var Rate = 0
                var senderFee = 0
                for (var i=0; i < countries.length; i++) {
                    if (countries[i].currency == senderCurrency) {
                        senderUSDExhangeRate = countries[i].marketRates;
                        senderFee = countries[i].fee;
                        Rate = countries[i].rates;
                        //console.log("Exhange rate "+senderUSDExhangeRate+" Rate kes for usd "+senderExchangeRate)
                    }
                    if(senderCurrency=='KES'){
                        //console.log("this is the rate "+Rate)
                        exchangeRate = (1/Rate)  * senderExchangeRate
                    }
                    else {
                        exchangeRate = (1/senderUSDExhangeRate)  * senderExchangeRate
                    }
                }
            }
            if($('#sendAmount').val() > 0){
                var sendAmount = $('#sendAmount').val()
                var receiveAmount = sendAmount * exchangeRate
                $('#receiveAmount').val(receiveAmount.toFixed(2))
            }
            $('#feeState').text(senderCurrency+' '+senderFee)
            $('#exchangeRate').text('1 '+senderCurrency+' = '+exchangeRate.toFixed(2)+' '+receiverCurrency);
        }
    }
    $( "#loader" ).removeClass( "hidden" )
    $('#senderCur span.sCurrency').text(value)
    $( "#senderCountry" ).addClass( "hidden" )
    $( "#receiverCountry" ).addClass( "hidden" )

}
function selectedReceiver(value){
    //receiverCur
    $('#receiverCur span.rCurrency').text(value)
    receiverCurrency = value
    for (var i=0; i < countries.length; i++) {
        if (countries[i].currency == receiverCurrency) {
            if(senderCurrency=='USD') {
                exchangeRate = countries[i].rates;
            }
            else {
                var senderUSDExhangeRate = 0
                var Rate = 0
                var senderExchangeRate = countries[i].rates
                for (var i=0; i < countries.length; i++) {
                    if (countries[i].currency == senderCurrency) {
                        senderUSDExhangeRate = countries[i].marketRates;
                        Rate = countries[i].rate;
                        //console.log("Exhange rate "+senderUSDExhangeRate+" Rate kes for usd "+senderExchangeRate)
                    }
                    if(senderCurrency=='KES'){
                        exchangeRate = (1/Rate)  * senderExchangeRate
                    }
                    else {
                        exchangeRate = (1/senderUSDExhangeRate)  * senderExchangeRate
                    }

                }

            }
            $('#exchangeRate').text('1 '+senderCurrency+' = '+exchangeRate.toFixed(2)+' '+receiverCurrency);
        }
    }
    $( "#senderCountry" ).addClass( "hidden" )
    $( "#receiverCountry" ).addClass( "hidden" )
}

function searchSender(){

    var x = document.getElementById("senderSearch");
    var senderSearcCountries = filterByValue(countries,x.value)

    if(senderSearcCountries.length > 0){
        //console.log("am here ")
        $("#countriesSend").empty();
        for (var i=0; i < senderSearcCountries.length; i++) {
            if(senderSearcCountries[i].isSourceCountry == 1){
                $("#countriesSend").append('<li id="'+senderSearcCountries[i].currency+'" class="flex items-center py-2 px-3 cursor-pointer border-b hover:bg-gray-50" value="'+senderSearcCountries[i].currency+'"><img src="'+senderSearcCountries[i].flag+'" class="flex-shrink inline-block align-middle mr-2 rounded-sm" width="16px" /><span class="flex-grow inline-block align-middle whitespace-nowrap">'+senderSearcCountries[i].name+'</span><span class="flex-shrink">'+senderSearcCountries[i].currency+'</span></li>');
                $("#"+senderSearcCountries[i].currency).attr("onclick", "selectedSender('"+senderSearcCountries[i].currency+"')");
            }
        }
    }
}
function filterByValue(array, value) {
    return array.filter(
        function(val) {
            return val.currency.toLowerCase().includes(value.toLowerCase())
        });
}

$(".control-block").each(function(){
    $(this).click(function(){
        $(".control-content").css("display", "none");
        $(this).find(".control-content").css({display: "block"});
    });
});