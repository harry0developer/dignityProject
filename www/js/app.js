angular.module('starter', ['ionic', 'starter.controllers', 'ngOpenFB','ionic-datepicker'])

.run(function($ionicPlatform, ngFB) {
  // old id 1323836720979005 
  ngFB.init({appId: '1105352759546729'});

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  
$ionicConfigProvider.backButton.previousTitleText(false);
$ionicConfigProvider.backButton.icon('ion-ios-arrow-left');
$ionicConfigProvider.backButton.text('')
  
$stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('logon', {
    url: '/logon',
    templateUrl: 'templates/logon.html',
    controller: 'AppCtrl'

  })

  .state('app.calendar', {
    url: "/calendar",
    views: {
        'menuContent': {
            templateUrl: "templates/calendar.html",
            controller: "CalendarCtrl"
        }
    }
  })

  .state('app.donate', {
    url: "/donate",
    views: {
        'menuContent': {
            templateUrl: "templates/donate.html",
            controller: "DonateCtrl"
        }
    }
  })

  .state('app.feeds', {
      url: '/feeds',
      views: {
        'menuContent': {
          templateUrl: 'templates/feeds.html',
          controller: 'NewsfeedCtrl'
        }
      }
  })

  .state('app.feed', {
    url: '/feeds/:feedId',
    views: {
      'menuContent': {
        templateUrl: 'templates/feed.html',
        controller: 'NewsfeedCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/logon');
});
