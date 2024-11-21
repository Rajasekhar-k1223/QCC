var app = angular.module('QCC', ['ui.bootstrap']);

var ProjectSelectionDetails = [];
var EmpCode = [];
var ApprovedResponseEdit = [];
var MailTemplate = [];
app.controller("ProjectDetailsController", function ($scope, $http) {
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/QCC.Web/Home/Index';
    }
    $scope.EmpCode = EmpCode = $('#myHiddenempCode').val();
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
            $http({ url: '/QCC.Web/ProjectDetails/FetchTeamDetailsByAdminProjectSelectionLevel', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                $scope.ApprovedResponse = response.data.temaDetailsResponse;
                $scope.totalCount = response.data.totalCount;
                $scope.ApprovedCount = response.data.length;
            }, function (x) {
                // Request error
            });
        }
        else {
            $http({ url: '/QCC.Web/ProjectDetails/FetchTeamDetailsByProjectSelectionLevel', method: "GET", params: { Level: $scope.EmpCode, pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                var Role = $('#myHiddenroleId').val()
                if (Role == 2) {
                    if (response.data.temaDetailsResponse[0].Status == 5 && Role == 2) {
                        $(".Pending_For_Approval").hide();
                        window.location = "/QCC.Web/ProjectDetails/ProjectClosure";
                    }
                }
                
                $scope.ApprovedResponse = response.data.temaDetailsResponse;
                $scope.totalCount = response.data.totalCount;
                $scope.ApprovedCount = response.data.length;
            }, function (x) {
                // Request error
            });
        }
       
    }
    $scope.toggleEdit = function (Approved) {
        Approved.showEdit = Approved.showEdit ? false : true;
        $scope.TeamId = Approved.Id;
        ApprovedResponseEdit = Approved;
        $scope.ProjectDetailsResponse = [];
        $(".body_blur").show();
        $("#ProjectSelectionSheetView").show();
        $http({ url: '/QCC.Web/ProjectDetails/FetchProjectsByLevelAndStatus', method: "GET", params: { TeamId: Approved.Id, Level: $scope.EmpCode } }).then(function (response) {
            // Request completed successfully
            $scope.ProjectDetailsResponse = response.data;
        }, function (x) {
            // Request error
        });
    }
    $scope.Close = function () {
        $(".showtableList,.body_blur").hide();
        $("#ProjectSelectionSheetView").hide();
        $("#ApprovedView").hide();
    }

    $scope.Submit = function () {
        var data = { TeamId: $scope.TeamId, Title: $scope.Title, Objective: $scope.Objective, Goal: $scope.Goal, ProjectStartDate: $scope.ProjectStartDate, ProjectEndDate: $scope.ProjectEndDate, ExpectedCostSaving: $scope.ExpectedCostSaving, Status: 1, Level1: $scope.Level1 };
        $http.post('/QCC.Web/ProjectDetails/ProjectSelectionSaveOrUpdate', data).then(function (d) {
            $scope.StatusMessage = d.data;
        }, function (error) {

        });
    }
    $scope.toggleImageEdit = function (Approved) {
        Approved.showEdit = Approved.showEdit ? false : true;
        $scope.CircleName = Approved.TeamName;
        $scope.Plant = Approved.Plant;
        $scope.BusinessUnit = Approved.BusinessUnit;
        $scope.StatusName = Approved.StatusName;
        $(".body_blur").show();
        $("#ApprovedView").show();
        $http({ url: '/QCC.Web/ProjectDetails/FetchProjectsByTeamId', method: "GET", params: { TeamId: Approved.Id } }).then(function (response) {
            // Request completed 
            $scope.P2 = true;
            $scope.P1 = true;
            for (var i = 0; i < response.data.length; i++) {
                if (i == 0) {
                    $scope.Project1 = response.data[i].StatusName;
                    $scope.P1 = false;
                }
                else if (i == 1) {
                    $scope.Project2 = response.data[i].StatusName;
                    $scope.P2 = false;
                }
            }
        }, function (x) {
            // Request error
        });
        $http({ url: '/QCC.Web/TeamRegistration/FetchCircleDetailsByName', method: "GET", params: { CircleName: Approved.TeamName, EmpCode: $scope.EmpCode, Plant: Approved.Plant, BusinessUnit: Approved.BusinessUnit } }).then(function (response) {
            // Request completed successfully
            $scope.CircleResponse = response.data;
            if ($scope.CircleResponse.length > 1) {
                $scope.SectionEmpCode = response.data[$scope.CircleResponse.length - 1].EmpCode;
                $scope.SectionEmpName = response.data[$scope.CircleResponse.length - 1].EmpName;
                $scope.SectionDepartment = response.data[$scope.CircleResponse.length - 1].Department;
                $scope.SectionGrade = response.data[$scope.CircleResponse.length - 1].Grade;
                $scope.SectionImage = response.data[$scope.CircleResponse.length - 1].Image;
                $scope.CircleResponse.splice($scope.CircleResponse.length - 1, 1);
            }
            $scope.TeamCount = response.data.length;
        }, function (x) {
            // Request error
        });
        $http({ url: '/QCC.Web/TeamRegistration/conventionsConClaveScoreAward', method: "GET", params: { TeamName: Approved.TeamName } }).then(function (response) {
            // Request completed 
            $scope.chapterConventionsScoreAndAwards = response.data.chapterConventionsScoreAndAwards;
            $scope.internalConventionScoreAndAwards = response.data.internalConventionScoreAndAwards;
            $scope.internationalConventionScoreAndAwards = response.data.internationalConventionScoreAndAwards;
            $scope.nationalConventionScoreAndAwards = response.data.nationalConventionScoreAndAwards;
        }, function (x) {
            // Request error
        });
    }
    $scope.toggleEdit1 = function (ProjectDetails) {
        var keyhtml = '<div style="width:100%;position:absolute;"><div style="width:50%;float:left;text-align:center;padding-left: 33%;padding-top: 1.2%;"><button class="btn btn-info" style="margin: 2%;font-size:12px;width:80px;font-weight:bold;" onclick="javascript:return Approved()">Approve</button><button class="btn btn-danger" style ="width:80px;font-size:12px;font-weight:bold;margin:2% 8% 2% 0%;" onclick="javascript:return Rejected()"> Reject</button ></div><div style="width:50%;float:left;"><textarea style="width: 190px; height: 53px;margin: 1% 10% 1% 1%;border:1px solid #000;border-radius:5px;padding-left:5px;" id="Remarks" placeholder="Enter Remarks"></textarea></div></div>';
        $(".project_" + ProjectDetails.ProjectId).after(keyhtml);
        ProjectSelectionDetails = ProjectDetails;
        ProjectDetails.showEdit = ProjectDetails.showEdit ? false : true;
        $(".aprovedviewBtn").hide();
        $("#ProjectSelectionSheetView").css({ "height": "20rem"});
    }
    // Server Paging
    $scope.pageChanged = function () {
        InIt();
    };
})
function Approved() {
    //console.log(ProjectSelectionDetails);
    if (ProjectSelectionDetails.Status == 4) {
        MailTemplate = [{ email: ApprovedResponseEdit.PlLoginMailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + "Approval Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " has approved by Level2 waiting for Level3 approval." }, { email: ApprovedResponseEdit.L1MailId, subject: ApprovedResponseEdit.TeamName + ProjectSelectionDetails.Title + "Approval Status", emailBody: ApprovedResponseEdit.TeamName + ProjectSelectionDetails.Title + "has approved by Level2 waiting for Level3 approval." }];
        ProjectSelectionDetails.Level2 = ApprovedResponseEdit.Level2;
        ProjectSelectionDetails.Status = 5;
        ProjectSelectionDetails.TeamStatus = 8;
        ProjectSelectionDetails.UpdatedBy = EmpCode;
    } else if (ProjectSelectionDetails.Status == 5) {
        MailTemplate = [{ email: ApprovedResponseEdit.PlLoginMailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + "Approval Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " has approved by Level2 waiting for Level3 approval." }, { email: ApprovedResponseEdit.L1MailId, subject: ApprovedResponseEdit.TeamName + ProjectSelectionDetails.Title + "Approval Status", emailBody: ApprovedResponseEdit.TeamName + ProjectSelectionDetails.Title + "has approved by Level2 waiting for Level3 approval." }];
     
        ProjectSelectionDetails.Status = 6;
        ProjectSelectionDetails.TeamStatus = 9;
        ProjectSelectionDetails.UpdatedBy = EmpCode;
    }
    else if (ProjectSelectionDetails.Status == 3) {
        MailTemplate = [{ email: ApprovedResponseEdit.PlLoginMailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + "Approval Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " has approved by Level1 waiting for Level2 approval." }];
        ProjectSelectionDetails.Level2 = ApprovedResponseEdit.Level2;
        ProjectSelectionDetails.Status = 4;
        ProjectSelectionDetails.TeamStatus = 7;
        ProjectSelectionDetails.UpdatedBy = EmpCode;
    }
    else if (ProjectSelectionDetails.Status == 2) {
        alert(ProjectSelectionDetails.Status)
        MailTemplate = [{ email: ApprovedResponseEdit.PlLoginMailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + "Approval Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " has approved by Level2 waiting for Level3 approval." }, { email: ApprovedResponseEdit.L1MailId, subject: ApprovedResponseEdit.TeamName + ProjectSelectionDetails.Title + "Approval Status", emailBody: ApprovedResponseEdit.TeamName + ProjectSelectionDetails.Title + "has approved by Level2 waiting for Level3 approval." }];
        ProjectSelectionDetails.Level3 = ApprovedResponseEdit.Level3;
        ProjectSelectionDetails.TeamStatus = 6;
        ProjectSelectionDetails.Status = 3;
        ProjectSelectionDetails.UpdatedBy = EmpCode;
    }
    else if (ProjectSelectionDetails.Status == 1) {
        MailTemplate = [{ email: ApprovedResponseEdit.PlLoginMailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + "Approval Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " has approved by Level1 waiting for Level2 approval." }];
        ProjectSelectionDetails.Level2 = ApprovedResponseEdit.Level2;
        ProjectSelectionDetails.Status = 2;
        ProjectSelectionDetails.TeamStatus = 5;
        ProjectSelectionDetails.UpdatedBy = EmpCode;
    }
    console.log(ProjectSelectionDetails);
    $.post("/QCC.Web/ProjectDetails/ProjectSelectionSaveOrUpdate", ProjectSelectionDetails,
        function (data, status) {
            $(".showtableList,.body_blur").hide();
            $("#ProjectSelectionSheetView").hide();
        
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/QCC.Web/ProjectDetails/SendingBulkEmails',
                data: JSON.stringify(MailTemplate)
            });
        });
}
function Rejected() {
    ProjectSelectionDetails.Remarks = $("#Remarks").val();
    if (ProjectSelectionDetails.Status == 5) {
        MailTemplate = [{ email: ApprovedResponseEdit.PlLoginMailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " Rejected Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " is  rejected due to" + " " + ProjectSelectionDetails.Remarks }, { email: ApprovedResponseEdit.L1MailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + "Rejected Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " is  rejected due to" + " " + ProjectSelectionDetails.Remarks }, { email: ApprovedResponseEdit.L2MailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + "Rejected Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " is  rejected due to" + " " + ProjectSelectionDetails.Remarks }];
        ProjectSelectionDetails.Status = 11; ProjectSelectionDetails.Level2 = ApprovedResponseEdit.Level2; ProjectSelectionDetails.Level3 = ApprovedResponseEdit.Level3;
    }
    else if (ProjectSelectionDetails.Status == 6) {
        MailTemplate = [{ email: ApprovedResponseEdit.PlLoginMailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " Rejected Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " is  rejected due to" + " " + ProjectSelectionDetails.Remarks }, { email: ApprovedResponseEdit.L1MailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + "Rejected Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " is  rejected due to" + " " + ProjectSelectionDetails.Remarks }, { email: ApprovedResponseEdit.L2MailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + "Rejected Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " is  rejected due to" + " " + ProjectSelectionDetails.Remarks }];
        ProjectSelectionDetails.Status = 11; ProjectSelectionDetails.Level2 = ApprovedResponseEdit.Level2; ProjectSelectionDetails.Level3 = ApprovedResponseEdit.Level3;
    } else if (ProjectSelectionDetails.Status == 4) {
        MailTemplate = [{ email: ApprovedResponseEdit.PlLoginMailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " Rejected Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " is  rejected due to" + " " + ProjectSelectionDetails.Remarks }, { email: ApprovedResponseEdit.L1MailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + "Rejected Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " is  rejected due to" + " " + ProjectSelectionDetails.Remarks }, { email: ApprovedResponseEdit.L2MailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + "Rejected Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " is  rejected due to" + " " + ProjectSelectionDetails.Remarks }];
        ProjectSelectionDetails.Status = 11; ProjectSelectionDetails.Level2 = ApprovedResponseEdit.Level2; ProjectSelectionDetails.Level3 = ApprovedResponseEdit.Level3;
    }
    else {
        MailTemplate = [{ email: ApprovedResponseEdit.PlLoginMailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " Rejected Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " is  rejected due to" + " " + ProjectSelectionDetails.Remarks }, { email: ApprovedResponseEdit.L1MailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + "Rejected Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " is  rejected due to" + " " + ProjectSelectionDetails.Remarks }, { email: ApprovedResponseEdit.L2MailId, subject: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + "Rejected Status", emailBody: ApprovedResponseEdit.TeamName + " " + ProjectSelectionDetails.Title + " " + " is  rejected due to" + " " + ProjectSelectionDetails.Remarks }];
        ProjectSelectionDetails.Status = 1; ProjectSelectionDetails.Level2 = ProjectSelectionDetails.Level3 = null;
    }
    $.post("/QCC.Web/ProjectDetails/ProjectSelectionSaveOrUpdate", ProjectSelectionDetails,
        function (data, status) {
            $(".showtableList,.body_blur").hide();
            $("#ProjectSelectionSheetView").hide();
          
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/QCC.Web/ProjectDetails/SendingBulkEmails',
                data: JSON.stringify(MailTemplate)
            });
        });
}