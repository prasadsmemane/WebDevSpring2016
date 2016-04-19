(function () {
    "use strict";
    angular
        .module("SportsBarApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, SportsService, $location, $rootScope) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        vm.message = null;
        vm.errorMessage = null;

        vm.update = update;
        vm.checkCurrentUserSports = checkCurrentUserSports;
        vm.toggleSelection = toggleSelection;
        vm.selection = [];

        SportsService.findAllSports().then(function(response) {
            vm.sports = response.data;
            for (var sport in vm.currentUser.sports) {
                vm.selection.push(vm.currentUser.sports[sport]);
            }
        });

        function checkCurrentUserSports(sportName) {
            var selected = vm.selection;
            for(var sport in selected) {
                if(sportName === selected[sport])
                    return true;
            }
            return false;
        }

        function toggleSelection(sportName) {
            var idx = vm.selection.indexOf(sportName);

            // is currently selected
            if (idx > -1) {
                vm.selection.splice(idx, 1);
            }

            // is newly selected
            else {
                vm.selection.push(sportName);
            }
        }

        function update(currentUser){
            currentUser.sports = vm.selection;
            vm.message = null;
            vm.errorMessage = null;

            if(angular.isUndefined(currentUser) || !currentUser.username){
                vm.errorMessage = "Please provide a username";
                return;
            }
            if(!currentUser.password){
                vm.errorMessage = "Please provide a password";
                return;
            }

            if(!currentUser.email){
                vm.errorMessage = "Please provide an email";
                return;
            }

            if(currentUser.sports.length === 0) {
                vm.errorMessage = "Please select at least one favourite sports";
                return;
            }

            UserService.updateUser(currentUser._id, currentUser)
                .then(function(response) {
                    UserService.setCurrentUser(response.data);
                    vm.message = "Profile Successfully Updated";
                    $location.url('/profile');
                });
        }

    }
}());
