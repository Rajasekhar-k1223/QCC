var app = angular.module('QCC', []);

app.controller("GraphController", function ($scope, $http, $window, $filter) {
    activateController();
    function activateController() {
        alert($scope.EmpCode);
        $http({
            url: '/QCC.Web/BusinessGoals/BusinessGolsGetByEmpCode', method: "GET", params: { empCode: $scope.EmpCode }
        }).then(function (response) {
            // Request completed successfully
            console.log(response.data); return false;
            $scope.BusinessGoals = response.data;
            if (response.data.BusinessUnit == null) {
                $scope.btnText = "Save Goals";
                $http({ url: '/QCC.Web/TeamRegistration/BusinessGoalsAutoFetch', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
                    // Request completed successfully
                    console.log(response.data)
                    //if (response.data != null) {
                    //    $scope.BusinessGoals.BusinessUnit = response.data.BusinessUnit;
                    //    $scope.BusinessGoals.Plant = response.data.Plant;
                    //    $scope.BusinessGoals.EligibleHeadCount = response.data.EligibleHeadCount;
                    //    $scope.BusinessGoals.NoOfOldCircles = response.data.NoofOldCircles;
                    //    $scope.BusinessGoals.NoofNewCircles = response.data.NoofNewCircles;
                    //    $scope.BusinessGoals.CirclesYTD = response.data.NoofCirclesYTD;
                    //    $scope.BusinessGoals.NoofqcTarget = response.data.NoofQcTarget;
                    //    $scope.BusinessGoals.TEIYTD = response.data.TEIYTD;
                    //    $scope.BusinessGoals.ProjectsYTD = response.data.NoofProjectsYTD;
                    //    $scope.BusinessGoals.ProjectsTarget = ($scope.BusinessGoals.NoOfOldCircles * 2) + $scope.BusinessGoals.NoofNewCircles;


                    //}

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
                //var object_by_id = $filter('filter')($scope.PlantRegister, { Plant: $scope.BusinessGoals.Plant })[0];
                //$scope.selectedItemvalue = object_by_id.Id;
                //$scope.BusinessUnit = object_by_id.BusinessUnit;
            }
        }, function (x) {
            // Request error
        });
    }
})