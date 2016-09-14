angular.module('starter.controllers', ['ngOpenFB' ,'ionic-datepicker'])


//PAYPAL CONTROLLER
/*
succes{
  "client":{
    "environment": "sandbox",
    "product_name":"PayPal iOS SDK",
    "paypal_sdk_version":"2.14.0",
    "platform":"iOS"
  },
  "respose_type":"payment",
  "response":{
    "id":"PAY-2N37423hg4h23g423WGWQ",
    "state":"approved",
    "create_time":"2016-08-22T20:40:58Z",
    "intent":"sale"
  }
}
*/
.controller('PaypalCtrl', function($scope, $state, $ionicPopup, $ionicHistory, PaypalService){


  $scope.user= {
      min:20,
      max:1000,
      value:160,
      dollar:0.069

  }
  $scope.paidRecord = [];

  $scope.donate = function(){
    var d = new Date().toString().split(" ");
    // alert("D: "+ d[2]+" "+d[1]+" "+d[3] +"\nTime: "+d[4]);
    PaypalService.initPaymentUI().then(function () {
      PaypalService.makePayment($scope.user.value, 'Total Amount').then(function (response) {
          $scope.paidRecord = $scope.paidRecord.concat({date: d[2]+" "+d[1]+" "+d[3], time:d[4], value: $scope.user.value * $scope.user.dollar});
          showAlert();

      }, function (error) {
         
         console.log("Transaction Canceled");
      });

    });
  };

  // An alert dialog
  var showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Payment success',
     template: "Thank you for your donation." 
   });

   alertPopup.then(function(res) {
       $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go("app.feeds");
      console.log(res);

   });
  };

})


//LOGIN CONTROLLER
.controller('AppCtrl', function($scope, $ionicModal, $http, $timeout, $state, ngFB) {

  $scope.loginData = {};

  $scope.fbLogin = function () {
    ngFB.login({scope: 'email,public_profile,publish_actions'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                // $scope.closeLogin();
                $state.go("app.feeds");
            } else {
                alert('Facebook login failed');
                $state.go('logon');
            }
        });
    };
})


//NEWSFEED PAGE CONTROLLER
.controller('NewsfeedCtrl', function ($scope, $state, $ionicLoading, ngFB,$http) {
      $scope.facebookData = [];
      $scope.pages = [];
      $scope.whichFeed;
      
    $scope.show = function() {
      $ionicLoading.show({
        template: 'Loading...'
      }).then(function(){
         console.log("The loading indicator is now displayed");
      });
    };
    
    $scope.hide = function(){
      $ionicLoading.hide().then(function(){
         console.log("The loading indicator is now hidden");
      });
    };

    $scope.init = function(){
      $scope.show();
      $scope.list = [];
        ngFB.api({
            path: '/dignitydreams',
            params: {fields: 'id,name,events,posts{name,created_time,caption,description,full_picture,id,message,shares,picture,story,link}'}
        }).then( 
            function (res) {
              // $scope.hide();
              $scope.facebookData = res.posts.data;
              $http.get(res.posts.paging.next).then(function(resp){
                $scope.facebookData = $scope.facebookData.concat(resp.data.data);
                $scope.hide();
                console.log($scope.facebookData);
              });
              $scope.whichFeed = $state.params.feedId;
            },
            function (error) {
                console.log('Facebook error: ' + error.error_description);
                $state.go('logon');
            }
        );
      };


    $scope.init();

    $scope.checkState = function(){
      if($scope.facebookData){
        console.log($scope.facebookData);
      }else{
        $scope.facebookData = DataFactory.GetAll();
      }
    }

  $scope.doRefresh = function() {
    console.log('Refreshing!');
    $scope.init();
    $scope.$broadcast('scroll.refreshComplete');
  }
     

})

//VIEW PROFILE PAGE CONTROLLER
.controller('ProfileCtrl', function ($scope, ngFB, $ionicLoading, $state) {
    $scope.show = function() {
        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){
           console.log("The loading indicator is now displayed");
        });
      };
      
    $scope.hide = function(){
      $ionicLoading.hide().then(function(){
         console.log("The loading indicator is now hidden");
      });
    };

    var init = function(){
      $scope.show();
      ngFB.api({
          path: '/me',
          params: {fields: 'id,name,email'}
      }).then(
          function (user) {
              $scope.hide();
              $scope.user = user;

          },
          function (error) {
              console.log('Facebook error: ' + error.error_description);
              $state.go('logon');
          }
      );
    }();
})

//CALENDAR PAGE CONTROLLER
.controller('CalendarCtrl', function($scope,$ionicModal, $ionicPopup, ionicDatePicker) {
    //ref: https://github.com/rajeshwarpatlolla/ionic-datepicker
          
      //jquery calendar
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
                  $(".pDate").text(date);},
                  // $(".pDate").text("Selection for: "+date);},

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

    $scope.submit = function(){  
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
        $scope.moods = [];

        $("#datepicker").datepicker().slideDown(500);
        $(".spinners").slideUp(400);
    
        var mood = [{name:"Acne", value: acneSpinnerVal, date:dateKey}, {name:"Apetite",value: apetiteSpinnerVal, date:dateKey}, {name:"Backache", value:backacheSpinnerVal, date:dateKey}, {name:"Constipation", value:constipationSpinnerVal, date:dateKey}];
        $scope.moods.concat(mood);
        console.log(mood);
        
    };

    $scope.cancel = function(){
      $("#datepicker").datepicker().slideDown(500);
      $(".spinners").slideUp(400);
    }


})

//POST ON FACEBOOK VIA APP CONTROLLER
.controller('PostCtrl', function($scope, $stateParams, ngFB) {


    $scope.share = function (event) {
    ngFB.api({
        method: 'POST',
        path: '/me/feed',
        params: {
            message: "I am posting this from dignity dreamz beta app"
        }
    }).then(
        function () {
            alert('The session was shared on Facebook');
        },
        function () {
            alert('An error occurred while sharing this session on Facebook');
            $state.go("logon")
        });
    };
});
