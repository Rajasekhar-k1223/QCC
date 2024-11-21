var app = angular.module('QCC', ['ui.bootstrap']);

app.controller("HomeController", function ($scope, $http) {
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/AReQCC';
    }
    $scope.EmpCode = $('#myHiddenempCode').val();
    $scope.RoleId = $('#myHiddenroleId').val();
    $scope.pageIndex = 1;   // Current page number. First page is 1.-->
    $scope.pageSizeSelected = 1000000000; // Maximum number of items per page.
    $scope.pageSize = 30,
        $scope.currentPage = 1;
    $scope.totalCount = 0;
    $scope.viewby = 10;
    $scope.setItemsPerPage = function (num) {
        $scope.pageSize = num;
        $scope.currentPage = 1; //reset to first page
    }
    $("#viewby").val("10");
    InIt();
    $scope.logout = function () {
        $http({ url: '/AReQCC/Login/Logout', method: "GET" }).then(function (response) {
            // Request completed successfully
            window.location.href = '/AReQCC';
        }, function (x) {
            // Request error
        });
    }
    InIt();
    function InIt() {
        if ($scope.RoleId == 5) {
            $http({ url: '/AReQCC/TeamDetails/FetchTeamDetailsByAdminStatus', method: "GET", params: { Status: '10', pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                $scope.ApprovedResponse = response.data.temaDetailsResponse;
                if (response.data.totalCount > 200) {
                    //  alert(parseInt((response.data.totalCount / 50) * 10))
                    $scope.pageSize = parseInt((response.data.totalCount / 50) * 10);
                }
                $scope.totalCount = response.data.totalCount;
               
            }, function (x) {
                // Request error
            });
            $http({ url: '/AReQCC/TeamRegistration/NotificationAlertAdmin', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully
                $scope.InflowCount = response.data.InflowCount;
                $scope.ApproveCount = response.data.ApproveCount;
                $scope.RejectCount = response.data.RejectCount;
                $scope.totalApprovedProjectsCount = response.data.totalApprovedProjects;

            }, function (x) {
                // Request error
            });
        }
        else {
            $http({ url: '/AReQCC/TeamDetails/FetchTeamDetailsByStatus', method: "GET", params: { Status: '10', CreatedBy: $scope.EmpCode, pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                $scope.ApprovedResponse = response.data.temaDetailsResponse;
             //   alert($scope.ApprovedResponse.length);
                $scope.totalCount = response.data.totalCount;
             //   alert($scope.totalCount);
            }, function (x) {
                // Request error
            });
            $http({ url: '/AReQCC/TeamRegistration/NotificationAlert', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully

                $scope.InflowCount = response.data.InflowCount;
                $scope.ApproveCount = response.data.ApproveCount;
                $scope.RejectCount = response.data.RejectCount;
                $scope.totalApprovedProjectsCount = response.data.totalApprovedProjects;
            }, function (x) {
                // Request error
            });
        }
       
    }
    $scope.toggleEdit = function (Approved) {
        Approved.showEdit = Approved.showEdit ? false : true;
        $(".body_blur").show();
        $("#ApprovedView").show();
        $http({ url: '/AReQCC/TeamRegistration/FetchCircleDetailsByName', method: "GET", params: { TeamId: Approved.Id,CircleName: Approved.TeamName, EmpCode: $scope.EmpCode, Plant: Approved.Plant, BusinessUnit: Approved.BusinessUnit } }).then(function (response) {
            // Request completed successfully
            $scope.CircleResponse = response.data;
        }, function (x) {
            // Request error
        });
    }
    $scope.Close = function () {
        $(".showtableList,.body_blur").hide();
        $("#ApprovedView").hide();
    }
    // Server Paging
    $scope.pageChanged = function () {
        InIt();
    };
  
})

app.filter('imgThumb', function () {
    return function (images, start) {
        return images.slice(start);
    };
});