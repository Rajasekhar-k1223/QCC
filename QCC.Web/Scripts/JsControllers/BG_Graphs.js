var app = angular.module('QCC', []);

app.controller("GraphController", function ($scope, $http, $window, $filter) {
    activateController();
    function activateController() {
        alert($scope.EmpCode);
        $http({
            url: '/AReQCC/BusinessGoals/BusinessGolsGetByEmpCode', method: "GET", params: { empCode: $scope.EmpCode }
        }).then(function (response) {
            // Request completed successfully
            console.log(response.data); return false;
            $scope.BusinessGoals = response.data;
            if (response.data.BusinessUnit == null) {
                $scope.btnText = "Save Goals";
                $http({ url: '/AReQCC/TeamRegistration/BusinessGoalsAutoFetch', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
                    // Request completed successfully
                  }, function (x) {// Request error 
                });
            }
            else {
                $scope.BusinessUnit = response.data.BusinessUnit;
                $scope.Plant = response.data.Plant;
                $scope.BusinessGoals.EligibleHeadCount = response.data.EligibleHeadCount;
                $scope.BusinessGoals.NoOfOldCircles = response.data.NoofNewCircles;
                $scope.BusinessGoals.NoofNewCircles = response.data.NoofNewCircles;
                $scope.BusinessGoals.CirclesYTD = response.data.CirclesYTD;
                $scope.BusinessGoals.NoofqcTarget = response.data.NoofqcTarget;
                $scope.BusinessGoals.TEIYTD = response.data.TEIYTD;
                $scope.BusinessGoals.ProjectsYTD = response.data.ProjectsYTD;
                $scope.btnText = "Update Goals";
            }
        }, function (x) {
            // Request error
        });
    }
})