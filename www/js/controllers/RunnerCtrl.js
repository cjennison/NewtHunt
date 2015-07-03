app
  .controller('RunnerCtrl', function($scope, $state, $rootScope, $animate, $interval){
    console.log("Runner");

    //Time Calculator 
    //TODO: This is a Directive
    $scope.time = "00:00:00";
    var elapsedSeconds = 0;
    var timer = $interval(function(){
      if(!$rootScope._RUNNING) return;
      elapsedSeconds++;
      $scope.time = secondsToTime(elapsedSeconds);
    },1000)

    function secondsToTime(s){
      var sec_num = parseInt(s, 10); // don't forget the second param
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      var time    = hours+':'+minutes+':'+seconds;
      return time;
    }

    //Distance Calculator 
    //TODO: This is a Directive
    $scope.dist_unit = "km";
    $scope.dist_traveled = 0.00;
    var last_position = { lat:null, lon:null };
    var geo_options = {
      enableHighAccuracy: true, 
      maximumAge        : 30000, 
      timeout           : 27000
    };
    var watchPosition = navigator.geolocation.watchPosition(function(position){
      if(!$rootScope._RUNNING) return;
      console.log("User has moved");
      //if the last position wasn't null, calculate distance traveled
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      if(last_position.lat && last_position.lon){
        var newDist = getDistanceFromLatLonInKm(last_position.lat, last_position.lon, lat, lon);
        if($scope.dist_unit == "mi"){
          newDist *= 0.621371;
        }
        $scope.dist_traveled += newDist
      }

      last_position.lat = lat;
      last_position.lon = lon;
    }, null, geo_options);

    $scope.changeUnits = function(){
      if($scope.dist_unit == 'mi') {
        $scope.dist_unit = "km";
        $scope.dist_traveled = $scope.dist_traveled * 1.60934;
      }
      else 
      {
        $scope.dist_unit = 'mi';
        $scope.dist_traveled = $scope.dist_traveled * 0.621371;
      }
    }

    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }


    //Newt Calculator
    //TODO: This is a Directive
    $scope.newts = 0;
    $scope.spawn = 0;
    $scope.spawnText = "";    
    $scope.newtFound = function(){
      $scope.spawnText = "+1";
      $scope.newts++;
      $scope.spawn = 1;

      setTimeout(function(){

        $scope.spawn = 0;
        $scope.$apply();
      },100)
    };


    $scope.reset = function(){
      //TODO: Change this 
      var res = confirm("Are you sure you want to reset?");
      if(res){
        $scope.time = "00:00:00";
        elapsedSeconds = 0;
        $newts = 0;
        $scope.dist_traveled = 0;
      } else {

      }
    }

    //Save Variables
    $scope.saveData = function(){
      $rootScope.data = {
        time:$scope.time,
        distance:$scope.dist_traveled,
        distance_units:$scope.dist_unit,
        newts:$scope.newtFound
      };

      $state.go('done');
    }




  })