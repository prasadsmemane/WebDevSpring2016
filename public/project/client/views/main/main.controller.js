(function(){
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("MainController", MainController);

    function MainController($location, $scope){
        $scope.$location = $location;
    }
})();
