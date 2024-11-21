var app = angular.module('QCC', ['ui.bootstrap']);
var ProjectDetailsEdit = [];
app.controller("ProjectDetailsController", function ($scope, $http, $filter) {
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/QCC.Web/Home/Index';
    }
    $scope.EmpCode = $('#myHiddenempCode').val();
    $scope.EmailId = $('#myHiddenempMailId').val();
    $scope.RoleId = $('#myHiddenroleId').val();
    $scope.maxSize = 5;     // Limit number for pagination display number.
    $scope.totalCount = 0;  // Total number of items in all pages. initialize as a zero
    $scope.pageIndex = 1;   // Current page number. First page is 1.-->
    $scope.pageSizeSelected = 25; // Maximum number of items per page.
    $scope.ProjectInitiation = true;
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
            $http({ url: '/QCC.Web/TeamDetails/FetchTeamDetailsByAdminStatus', method: "GET", params: { Status: '3', pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                $scope.ApprovedResponse = response.data.temaDetailsResponse;
                $scope.totalCount = response.data.totalCount;
            }, function (x) {
                // Request error
            });
        }
        else {
            $http({ url: '/QCC.Web/TeamDetails/FetchTeamDetailsByStatusProjects', method: "GET", params: { Status: '4', CreatedBy: $scope.EmpCode, pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
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
        $scope.Level1 = Approved.Level1;
        $scope.CircleName = Approved.TeamName;
        $scope.Plant = Approved.Plant;
        $scope.BusinessUnit = Approved.BusinessUnit;
        $(".body_blur").show();
        $("#ProjectSelectionSheetView").show();
        $http({ url: '/QCC.Web/ProjectDetails/FetchProjectsByTeamId', method: "GET", params: { TeamId: Approved.Id } }).then(function (response) {
            // Request completed successfully
            $scope.ProjectDetailsResponse = response.data;
        }, function (x) {
            // Request error
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
            //if (response.data.internalConventionScoreAndAwards.length > 0 || response.data.chapterConventionsScoreAndAwards.length > 0 || response.data.nationalConventionScoreAndAwards.length > 0 || response.data.internationalConventionScoreAndAwards.length>0) {
                $scope.internalConventionScoreAndAwards = response.data.internalConventionScoreAndAwards;
                $scope.chapterConventionsScoreAndAwards = response.data.chapterConventionsScoreAndAwards;
                $scope.nationalConventionScoreAndAwards = response.data.nationalConventionScoreAndAwards;
                $scope.internationalConventionScoreAndAwards = response.data.internationalConventionScoreAndAwards;
                //$scope.TeamJourny = false;
            //}
            //else {
            //    $scope.TeamJourny = true;
            //}
            
        }, function (x) {
            // Request error
        });
    }
    $scope.Close = function () {
        $(".showtableList,.body_blur").hide();
        $("#ProjectSelectionSheetView").hide();
        $("#ApprovedView").hide();
        $('#datepicker-range-APstart').val('');
        $('#datepicker-range-APend').val('');
        $('#datepicker-range-start').val('');
        $('#datepicker-range-end').val('');
    }
    $scope.Submit = function () {
        var data = { TeamId: $scope.TeamId, Title: $scope.Title, Objective: $scope.Objective, Goal: $scope.Goal, GoalTo: $scope.GoalTo, ProjectStartDate: $('#datepicker-range-start').val(), ProjectEndDate: $('#datepicker-range-end').val(), ExpectedCostSaving: $scope.ExpectedCostSaving, Status: 1,TeamStatus:4, Level1: $scope.Level1, CreatedBy: $scope.EmpCode, GoalToUOM: $scope.GoalToUOM, GoalUOM: $scope.GoalUOM };
        if ($scope.ActualGoal != null) {
            alert($scope.ActualGoal); 
            ProjectDetailsEdit.ActualGoal = $scope.ActualGoal;
            ProjectDetailsEdit.ActualProjectStartDate = $('#datepicker-range-APstart').val();
            ProjectDetailsEdit.ActualProjectEndDate = $('#datepicker-range-APend').val();
            ProjectDetailsEdit.ActualExpectedCostSaving = $scope.ActualExpectedCostSaving;
            ProjectDetailsEdit.Status = 4;
            ProjectDetailsEdit.TeamStatus = 7;
            //Need To Check this line
            ProjectDetailsEdit.Level2 = ProjectDetailsEdit.Level3 = null;
            console.log(ProjectDetailsEdit); 
            $http.post('/QCC.Web/ProjectDetails/ProjectSelectionSaveOrUpdate', ProjectDetailsEdit).then(function (d) {
                $("#ProjectSelectionSheetView").hide();
                $('#datepicker-range-APstart').val('');
                $('#datepicker-range-APend').val('');
                $('#datepicker-range-start').val('');
                $('#datepicker-range-end').val('');
                $scope.StatusMessage = d.data;
                $scope.Title = $scope.Objective = $scope.ActualGoal = $scope.ActualProjectStartDate = $scope.ActualProjectEndDate = $scope.ActualExpectedCostSaving = null;
                $scope.Title = $scope.Objective = $scope.Goal = $scope.GoalTo = $scope.ProjectStartDate = $scope.ProjectEndDate = $scope.ExpectedCostSaving = $scope.GoalToUOM = $scope.GoalUOM= null;
                $(".showtableList,.body_blur").hide();

            }, function (error) {

            });
        }
        else {
            $http.post('/QCC.Web/ProjectDetails/ProjectSelectionSaveOrUpdate', data).then(function (d) {
                $scope.StatusMessage = d.data;
                $scope.Title = $scope.Objective = $scope.Goal = $scope.GoalTo = $scope.ProjectStartDate = $scope.ProjectEndDate = $scope.ExpectedCostSaving = $scope.GoalToUOM = $scope.GoalUOM = null;
                $(".showtableList,.body_blur").hide();
                $("#ProjectSelectionSheetView").hide();
                $('#datepicker-range-start').val('');
                $('#datepicker-range-end').val('');
            }, function (error) {

            });
        }
    }
    $scope.toggleEdit1 = function (ProjectDetails) {
        $(".aprovedviewBtn").attr("ng-click"," ");
        ProjectDetails.showEdit = ProjectDetails.showEdit ? false : true;
        $scope.Title = ProjectDetails.Title;
        $scope.Objective = ProjectDetails.Objective;
        $scope.ProjectInitiation = false;
        $scope.ProjectInitiationSelection = false;
        $scope.Goal = ProjectDetails.Goal;
        $scope.GoalTo = ProjectDetails.GoalTo;
        $scope.GoalToUOM = ProjectDetails.GoalToUOM;
        $scope.GoalUOM = ProjectDetails.GoalUOM;
        $scope.ExpectedCostSaving = ProjectDetails.ExpectedCostSaving;
        $('#datepicker-range-start').val(ProjectDetails.ProjectStartDate.split(' ')[0]);
        $('#datepicker-range-end').val(ProjectDetails.ProjectEndDate.split(' ')[0]);
        $scope.GoalTo = ProjectDetails.GoalTo;
        ProjectDetailsEdit = ProjectDetails;
      
    }
    // Server Paging
    $scope.pageChanged = function () {
        InIt();
    };
    $scope.GaolUOM = function () {
        $scope.GoalToUOM = $scope.GoalUOM;
    }

})