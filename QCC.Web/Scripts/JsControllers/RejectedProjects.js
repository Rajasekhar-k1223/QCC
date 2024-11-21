var app = angular.module('QCC', ['ui.bootstrap']);
var ProjectDetailsEdit = [];
app.controller("ProjectDetailsController", function ($scope, $http, $filter) {
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/AReQCC';
    }
    $scope.EmpCode = $('#myHiddenempCode').val();
    $scope.EmailId = $('#myHiddenempMailId').val();
    $scope.RoleId = $('#myHiddenroleId').val();
    this.currentPage = 1;
    this.numPerPage = 15;
    this.maxSize = 4;
    $scope.maxSize = 5;     // Limit number for pagination display number.
    $scope.totalCount = 0;  // Total number of items in all pages. initialize as a zero
    $scope.pageIndex = 1;   // Current page number. First page is 1.-->
    $scope.pageSizeSelected = 1000000000; // Maximum number of items per page.
    $scope.ProjectInitiation = true;
    $scope.logout = function () {
        $http({ url: '/AReQCC/Login/Logout', method: "GET" }).then(function (response) {
            // Request completed successfully
            window.location.href = '/AReQCC';
        }, function (x) {
            // Request error
        });
    }
    $http({ url: '/AReQCC/TeamRegistration/NotificationAlert', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
        // Request completed successfully
        $scope.ProjectDetails = response.data.ProjectDetails;
        $("#subcount,#poa").text($scope.ProjectDetails);
        $("#rejectProject").text(response.data.RejectedProject);

        //  alert($scope.ProjectDetails);
    }, function (x) {
        // Request error
    });
    InIt();
    $scope.toggleEdit1 = function (ProjectDetails) {
       // $(".aprovedviewBtn").attr("ng-click", " ");
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
        $(".backgroundBlur").show();
        $("#ProjectSelectionSheetVieweditView").show().css({"width": "68%", "margin": "2vw 15vw", "z-index": "4", "position":"absolute","background":"#fff"});
        $("#ProjectSelectionSheetVieweditView > Input").css({ "font-size": "1.5rem" });



    }
    function InIt() {
        if ($scope.RoleId == 5) {
            $http({ url: '/AReQCC/TeamDetails/FetchTeamDetailsByAdminStatus', method: "GET", params: { Status: '11', pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                $scope.RejectedResponse = response.data.temaDetailsResponse;
                $scope.totalCount = response.data.totalCount;
                $scope.RejectCount = response.data.temaDetailsResponse.length;
            }, function (x) {
                // Request error
            });
            $http({ url: '/AReQCC/TeamRegistration/NotificationAlertAdmin', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully
                $scope.InflowCount = response.data.InflowCount;
                $scope.ApproveCount = response.data.ApproveCount;
                $scope.RejectCount = response.data.RejectCount;

            }, function (x) {
                // Request error
            });
        }
        else {
           // alert("hello");
            $http({ url: '/AReQCC/ProjectDetails/FetchProjectByStatusLevel', method: "GET", params: { Status: '8', CreatedBy: $scope.EmpCode, pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                console.log(response.data.projectSelectionSheetResponse);
                $scope.RejectedResponse = response.data.projectSelectionSheetResponse;
                $scope.totalCount = response.data.totalCount;
            }, function (x) {
                // Request error
            });
            $http({ url: '/AReQCC/ProjectDetails/NotificationAlert', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully
                $scope.InflowCount = response.data.InflowCount;
                $scope.ApproveCount = response.data.ApproveCount;
                $scope.RejectCount = response.data.RejectCount;
            }, function (x) {
                // Request error
            });
        }
        $scope.pageChanged = function () {
            InIt();
        };
        $scope.delete = function (ProjectId) {
            $http({ url: '/AReQCC/ProjectDetails/ProjectDelete', method: "GET", params: { ProjectId: ProjectId } }).then(function (response) {
                // Request completed successfully
                location.reload(); 
                console.log(response.data.projectSelectionSheetResponse);
                //$scope.RejectedResponse = response.data.projectSelectionSheetResponse;
                //$scope.totalCount = response.data.totalCount;
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
            location.reload();
        }
        $scope.Submit = function () {
            //alert($('#datepicker-range-start').val()); return false;
            var data = { TeamId: $scope.TeamId, Title: $scope.Title, Objective: $scope.Objective, Goal: $scope.Goal, GoalTo: $scope.GoalTo, ProjectStartDate: $('#datepicker-range-start').val(), ProjectEndDate: $('#datepicker-range-end').val(), ExpectedCostSaving: $scope.ExpectedCostSaving, Status: 1, TeamStatus: 4, Level1: $scope.Level1, CreatedBy: $scope.EmpCode, GoalToUOM: $scope.GoalToUOM, GoalUOM: $scope.GoalUOM };

            console.log(data);
            if ($scope.ActualGoal != null) {
                //alert($scope.ActualGoal); 
                ProjectDetailsEdit.ActualGoal = $scope.ActualGoal;
                ProjectDetailsEdit.ActualProjectStartDate = $('#datepicker-range-APstart').val();
                ProjectDetailsEdit.ActualProjectEndDate = $('#datepicker-range-APend').val();
                ProjectDetailsEdit.ActualExpectedCostSaving = $scope.ActualExpectedCostSaving;
                ProjectDetailsEdit.ProjectStartDate = $('#datepicker-range-start').val();
                ProjectDetailsEdit.ProjectEndDate = $('#datepicker-range-end').val();
                ProjectDetailsEdit.Status = 1;
                ProjectDetailsEdit.TeamStatus = 3;
                ////Need To Check this line
                //ProjectDetailsEdit.Level2 = ProjectDetailsEdit.Level3 = null;
                //console.log(ProjectDetailsEdit);
                //return false;
                $http.post('/AReQCC/ProjectDetails/ProjectSelectionSaveOrUpdate', ProjectDetailsEdit).then(function (d) {
                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                    $("#ProjectSelectionSheetView").hide();
                    $('#datepicker-range-APstart').val('');
                    $('#datepicker-range-APend').val('');
                    $('#datepicker-range-start').val('');
                    $('#datepicker-range-end').val('');
                    $scope.StatusMessage = d.data;
                    $scope.Title = $scope.Objective = $scope.ActualGoal = $scope.ActualProjectStartDate = $scope.ActualProjectEndDate = $scope.ActualExpectedCostSaving = null;
                    $scope.Title = $scope.Objective = $scope.Goal = $scope.GoalTo = $scope.ProjectStartDate = $scope.ProjectEndDate = $scope.ExpectedCostSaving = $scope.GoalToUOM = $scope.GoalUOM = null;
                    $(".showtableList,.body_blur").hide();
                    location.reload();

                }, function (error) {

                });
            }
            else {
                $http.post('/AReQCC/ProjectDetails/ProjectSelectionSaveOrUpdate', data).then(function (d) {
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
    }

});
app.filter('imgThumb', function () {
    return function (images, start) {
        return images.slice(start);
    };
});