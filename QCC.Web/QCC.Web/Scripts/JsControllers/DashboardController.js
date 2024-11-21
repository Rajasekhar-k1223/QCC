var app = angular.module('QCC', []);

app.controller("HomeController", function ($scope, $http) {
    $scope.EmpCode = $('#myHiddenempCode').val();
    ReportsSearchList();
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/QCC.Web/Home/Index';
    }
    $scope.RoleId = $('#myHiddenroleId').val();
    InIt();
    function InIt() {
       
        if ($scope.RoleId == 5) {
            $http({ url: '/QCC.Web/TeamRegistration/NotificationAlertAdmin', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully

                $scope.ProjectDetails = response.data.ProjectDetails;

            }, function (x) {
                // Request error
            });
        }
        else {
          
            $http({ url: '/QCC.Web/TeamRegistration/NotificationAlert', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully
                $scope.ProjectDetails = response.data.ProjectDetails;
            }, function (x) {
                // Request error
            });
        }
    }
   
    $scope.logout = function () {
        $http({ url: '/QCC.Web/Login/Logout', method: "GET"}).then(function (response) {
            // Request completed successfully
            window.location.href = '/QCC.Web/Home/Index';
        }, function (x) {
            // Request error
        });
       
    }
    function ReportsSearchList() {
        var ReportsFetch = { Company: "", Plant: "", BusinessUnit: "", Department: "", StartDate:"", EndDate: "" };
        $http.post('/QCC.Web/TeamRegistration/ReportsFetchList', ReportsFetch).then(function (R) {
            $scope.ReportsResponseList = R.data;

            console.log(R.data);
            $.each($scope.ReportsResponseList, function (key, value) {
                var htmldat = '<div style="border:1px solid #000;border-radius:5px;margin:1%;padding:1%;"><div><div style="width:100px;float:left;">QC-Name </div><div style="float:left;">:- </div><div style="float:left;padding-left:1%;">' + value["QCName"] + '</div></div><div style="clear:both;"></div><div><div style="width:100px;float:left;">Status </div><div style="float:left;">:- </div><div style="float:left;padding-left:1%;">' + value["StatusName"]+'</div></div><div style="clear:both;"></div></div>';
                $("#notifiList").append(htmldat);
            });
        }, function (error) {

        });
    }

})