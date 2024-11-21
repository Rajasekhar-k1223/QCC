var app = angular.module('QCC', ['ui.bootstrap']);

app.controller("HomeController", function ($scope, $http) {
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/QCC.Web/Home/Index';
    }
    $scope.EmpCode = $('#myHiddenempCode').val();
    $scope.RoleId = $('#myHiddenroleId').val();
    $scope.maxSize = 5;     // Limit number for pagination display number.
    $scope.totalCount = 0;  // Total number of items in all pages. initialize as a zero
    $scope.pageIndex = 1;   // Current page number. First page is 1.-->
    $scope.pageSizeSelected = 25; // Maximum number of items per page.
    $scope.logout = function () {
        $http({ url: '/QCC.Web/Login/Logout', method: "GET" }).then(function (response) {
            // Request completed successfully
            window.location.href = '/QCC.Web/Home/Index';
        }, function (x) {
            // Request error
        });
    }
    InIt();
    function InIt() {
        if ($scope.RoleId == 5) {
            $http({ url: '/QCC.Web/TeamDetails/FetchTeamDetailsByAdminStatus', method: "GET", params: { Status: '4', pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                $scope.RejectedResponse = response.data.temaDetailsResponse;
                $scope.totalCount = response.data.totalCount;
            }, function (x) {
                // Request error
            });
            $http({ url: '/QCC.Web/TeamRegistration/NotificationAlertAdmin', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully
                $scope.InflowCount = response.data.InflowCount;
                $scope.ApproveCount = response.data.ApproveCount;
                $scope.RejectCount = response.data.RejectCount;

            }, function (x) {
                // Request error
            });
        }
        else {
            $http({ url: '/QCC.Web/TeamDetails/FetchTeamDetailsByStatus', method: "GET", params: { Status: '4', CreatedBy: $scope.EmpCode, pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                $scope.RejectedResponse = response.data.temaDetailsResponse;
                $scope.totalCount = response.data.totalCount;
            }, function (x) {
                // Request error
            });
            $http({ url: '/QCC.Web/TeamRegistration/NotificationAlert', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully
                $scope.InflowCount = response.data.InflowCount;
                $scope.ApproveCount = response.data.ApproveCount;
                $scope.RejectCount = response.data.RejectCount;
            }, function (x) {
                // Request error
            });
        }
        
    }
    $scope.toggleEdit = function (Rejected) {
        Rejected.showEdit = Rejected.showEdit ? false : true;
        teamDetails = Rejected;
        $(".body_blur").show();
        $("#RejectedView").show();
        $http({ url: '/QCC.Web/TeamRegistration/FetchCircleDetailsByName', method: "GET", params: { CircleName: Rejected.TeamName, EmpCode: $scope.EmpCode, Plant: Rejected.Plant, BusinessUnit: Rejected.BusinessUnit } }).then(function (response) {
            // Request completed successfully
            $scope.CircleResponse = response.data;
            $scope.Remarks = Rejected.Remarks;
        }, function (x) {
            // Request error
        });
    }
    $scope.Close = function () {
        $(".showtableList,.body_blur").hide();
        $("#RejectedView").hide();
    }
    // Server Paging
    $scope.pageChanged = function () {
        InIt();
    };
})