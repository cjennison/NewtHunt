// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('newthunt', ['ionic', 'ngFx', 'ngAnimate'])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url:'/',
      templateUrl:"js/templates/main.html",
      controller:'MainCtrl',
      onEnter:function($rootScope){
        $rootScope._RUNNING = false;
      }
    })
    .state('runner', {
      url:'/runner',
      templateUrl:"js/templates/runner.html",
      controller:'RunnerCtrl',
      onEnter:function($rootScope){
        $rootScope._RUNNING = true;
      }
    })
    .state('done', {
      url:'/done',
      templateUrl:"js/templates/done.html",
      controller:'DoneCtrl',
      onEnter:function($rootScope){
        $rootScope._RUNNING = false;
      }
    });
})
.run(function($rootScope, $ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });


})

document.addEventListener("deviceready", getPermissions, false);
function getPermissions(){
  navigator.geolocation.getCurrentPosition(function(position){
    console.log("User Approved Permissions");
  });    
}