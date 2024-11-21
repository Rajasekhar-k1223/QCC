var app = angular.module('QCC', ['ui.bootstrap']);
var MailTemplate = [];
app.controller("HomeController", function ($scope, $http) {
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/Home/Index';
    }
    $scope.EmpCode = $('#myHiddenempCode').val();
    $scope.RoleId = $('#myHiddenroleId').val();
    $scope.maxSize = 5;     // Limit number for pagination display number.
    $scope.totalCount = 0;  // Total number of items in all pages. initialize as a zero
    $scope.pageIndex = 1;   // Current page number. First page is 1.-->
    $scope.pageSizeSelected = 25; // Maximum number of items per page.
    var teamDetails = [];
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
            $http({ url: '/QCC.Web/TeamDetails/FetchTeamDetailsByAdminLevels', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                $scope.InFlowResponse = response.data.temaDetailsResponse;
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
            //alert($scope.EmpCode);
            $http({ url: '/QCC.Web/TeamDetails/FetchTeamDetailsByLevels', method: "GET", params: { Level: $scope.EmpCode, pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                console.log(response);
                $scope.InFlowResponse = response.data.temaDetailsResponse;
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
    $scope.toggleEdit = function (InFlow) {
        InFlow.showEdit = InFlow.showEdit ? false : true;
        teamDetails = InFlow;
        $("#InflowView").show();
        $(".body_blur").show();
        $scope.L1MailId = InFlow.L1MailId;
        $scope.PlLoginMailId = InFlow.PlLoginMailId;
        $http({ url: '/QCC.Web/TeamRegistration/FetchCircleDetailsByName', method: "GET", params: { CircleName: InFlow.TeamName, EmpCode: $scope.EmpCode, Plant: InFlow.Plant, BusinessUnit: InFlow.BusinessUnit } }).then(function (response) {
         
            if (teamDetails.Status == 2) {
                teamDetails.Level3 = response.data[0].Level3;
                teamDetails.Status = 3;
                teamDetails.UpdatedBy = $scope.EmpCode;
                MailTemplate = [{ email: InFlow.PlLoginMailId, subject: InFlow.TeamName + " " + "Approval Status", emailBody: InFlow.TeamName + " " + " has approved by Level2 circle registered successfully." }, { email: InFlow.L1MailId, subject: InFlow.TeamName + " " + "Approval Status", emailBody: InFlow.TeamName + " " + " has approved by Level2 circle registered successfully." }];
            }
            else if (teamDetails.Status == 1) {
                teamDetails.Level2 = response.data[0].Level2;
                teamDetails.Status = 2;
                teamDetails.UpdatedBy = $scope.EmpCode;
                MailTemplate = [{ email: InFlow.PlLoginMailId, subject: InFlow.TeamName + " " + "Approval Status", emailBody: InFlow.TeamName + " " + " has approved by Level1 waiting for Level2 approval." }];
            }
            $scope.CircleResponse = response.data;
        }, function (x) {
            // Request error
        });
    }
    $scope.Close = function () {
        $(".showtableList,.body_blur").hide();
        $("#InflowView").hide();
    }
    $scope.Approved = function () {
        //alert("hello");
        $http.post('/QCC.Web/TeamDetails/SaveOrUpdateTeamDetails', teamDetails).then(function (d) {
            $scope.StatusMessage = d.data;
            $scope.btnSubmit = true;
            $(".showtableList,.body_blur").hide();
            $("#InflowView").hide();
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/QCC.Web/ProjectDetails/SendingBulkEmails',
                data: JSON.stringify(MailTemplate)
            });

            window.location.href = '/QCC.Web/Home/Inflow';
           
        }, function (error) {

        });
    }
    $scope.Rejected = function () {

        if (teamDetails.Status == 2) {
            MailTemplate = [{ email: $scope.PlLoginMailId, subject: teamDetails.TeamName + " " + "Reject Status", emailBody: teamDetails.TeamName + " " + " has rejected by Level2 due to " + $scope.Remarks }, { email: $scope.L1MailId, subject: teamDetails.TeamName + " " + "Reject Status", emailBody: teamDetails.TeamName + " " + " has rejected by Level2 due to " + $scope.Remarks }];
        }
        else if (teamDetails.Status == 1) {
            MailTemplate = [{ email: $scope.PlLoginMailId, subject: teamDetails.TeamName + " " + "Reject Status", emailBody: teamDetails.TeamName + " " + " has rejected by Level1 due to " + $scope.Remarks}];
        }
        teamDetails.Status = 11;
        teamDetails.Level3 = teamDetails.Level2;
        teamDetails.UpdatedBy = $scope.EmpCode;
        teamDetails.Remarks = $scope.Remarks;

        $http.post('/QCC.Web/TeamDetails/SaveOrUpdateTeamDetails', teamDetails).then(function (d) {
            InIt();
            $scope.StatusMessage = d.data;
            $scope.btnSubmit = true;
            $(".showtableList,.body_blur").hide();
            $("#InflowView").hide();
          
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/QCC.Web/ProjectDetails/SendingBulkEmails',
                data: JSON.stringify(MailTemplate)
            });

            window.location.href = '/QCC.Web/Home/Inflow';
        }, function (error) {

        });
    }
     // Server Paging
    $scope.pageChanged = function () {
        InIt();
    };
})