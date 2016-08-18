$( function() {
    var acneSpinner = $( "#acneSpinner" ).spinner();
    var apetiteSpinner = $( "#apetiteSpinner" ).spinner();
    var backacheSpinner = $( "#backacheSpinner" ).spinner();
    var constipationSpinner = $( "#constipationSpinner" ).spinner();

    acneSpinner.spinner( "value", 0 );
    apetiteSpinner.spinner( "value", 0 );
    backacheSpinner.spinner( "value", 0 );
    constipationSpinner.spinner( "value", 0 );
    
    $(".ui-spinner-button").on("click", function(){
        var val = acneSpinner.spinner("value");
        if ( val > 3){acneSpinner.spinner( "value", 3 );alert('Please choose a value between 0 and 3');}
        else if (val < 0){acneSpinner.spinner( "value", 0 );alert('Please choose a value between 0 and 3');}
    });    
    
    $(".ui-spinner-button").on("click", function(){
        var val = apetiteSpinner.spinner("value");
        if ( val > 3){apetiteSpinner.spinner( "value", 3 );alert('Please choose a value between 0 and 3');}
        else if (val < 0){apetiteSpinner.spinner( "value", 0 );alert('Please choose a value between 0 and 3');}
    });    
    
    $(".ui-spinner-button").on("click", function(){
        var val = backacheSpinner.spinner("value");
        if ( val > 3){backacheSpinner.spinner( "value", 3 );alert('Please choose a value between 0 and 3');}
        else if (val < 0){backacheSpinner.spinner( "value", 0 );alert('Please choose a value between 0 and 3');}
    });   
    
    $(".ui-spinner-button").on("click", function(){
        var val = constipationSpinner.spinner("value");
        if ( val > 3){constipationSpinner.spinner( "value", 3 );alert('Please choose a value between 0 and 3');}
        else if (val < 0){constipationSpinner.spinner( "value", 0 );alert('Please choose a value between 0 and 3');}
    });
  });

var $datesDict = {};
var $dates = [];

$(document).ready(function() {
    $('#datepicker').datepicker( {
        onSelect: function(date) {
        
            if ($datesDict[date]){
                $( "#acneSpinner" ).spinner("value", $datesDict[date]["ac"]);
                $( "#apetiteSpinner" ).spinner("value",$datesDict[date]["ap"]);
                $( "#backacheSpinner" ).spinner("value",$datesDict[date]["ba"]);
                $( "#constipationSpinner" ).spinner("value",$datesDict[date]["co"]);
            }else{
                $( "#acneSpinner" ).spinner("value", 0);
                $( "#apetiteSpinner" ).spinner("value", 0);
                $( "#backacheSpinner" ).spinner("value", 0);
                $( "#constipationSpinner" ).spinner("value", 0);
                $datesDict[date] = {}
                $dates.push(date);}    
            $("#datepicker").datepicker().slideUp(600);
            $(".spinners").slideDown(300);
            $(".pDate").text("Selection for: "+date);},

        beforeShowDay: function(date) {
            if($.inArray($.datepicker.formatDate('yy-mm-dd', date ), $dates) > -1)
            {return [true,"inserted",""];}
            else{return [true,'notInserted',""];}},
        dateFormat: 'yy-mm-dd',
        selectWeek: true,
        inline: true,
        startDate: '01/01/2000',
        firstDay: 1
    });    
});
function submit(){  
  var acneSpinnerVal = $( "#acneSpinner" ).spinner("value");
  var apetiteSpinnerVal = $( "#apetiteSpinner" ).spinner("value");
  var backacheSpinnerVal = $( "#backacheSpinner" ).spinner("value");
  var constipationSpinnerVal = $( "#constipationSpinner" ).spinner("value");  
  var date = $("#datepicker").datepicker( 'getDate' );
  
  $("#datepicker").datepicker('enable');
  dateKey = $.datepicker.formatDate('yy-mm-dd', date); 
  
  $datesDict[dateKey]["ac"] = acneSpinnerVal;
  $datesDict[dateKey]["ap"] = apetiteSpinnerVal;
  $datesDict[dateKey]["ba"] = backacheSpinnerVal;
  $datesDict[dateKey]["co"] = constipationSpinnerVal;
  
  $("#datepicker").datepicker().slideDown(500);
  $(".spinners").slideUp(400);
};
