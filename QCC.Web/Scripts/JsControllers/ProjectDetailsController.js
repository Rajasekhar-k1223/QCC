var app = angular.module('QCC', ['ui.bootstrap']);
var ProjectDetailsEdit = [];
app.controller("ProjectDetailsController", function ($scope, $http, $filter) {
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/AReQCC';
    }
    $scope.EmpCode = $('#myHiddenempCode').val();
    $scope.EmailId = $('#myHiddenempMailId').val();
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
    function InIt() {
        if ($scope.RoleId == 5) {
            $http({ url: '/AReQCC/TeamDetails/FetchTeamDetailsByAdminStatusPSPC', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                $scope.ApprovedResponse = response.data.temaDetailsResponse;
              //  alert(response.data.temaDetailsResponse.length);
                $scope.totalCount = response.data.temaDetailsResponse.length;
                if (response.data.temaDetailsResponse.length > 200) {
                    //  alert(parseInt((response.data.totalCount / 50) * 10))
                    $scope.pageSize = parseInt((response.data.temaDetailsResponse.length / 50) * 10);
                }
                //response.data.temaDetailsResponse.length
                $scope.ApprovedCount = response.data.temaDetailsResponse.length;
                $http({ url: '/AReQCC/TeamRegistration/NotificationAlertAdmin', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
                    // Request completed successfully
                    //$scope.InflowCount = response.data.InflowCount;
                    //$scope.ApproveCount = response.data.ApproveCount;
                    //$scope.RejectCount = response.data.RejectCount;
                    $scope.ProjectSelection = response.data.projectselectCount;
                    $scope.projectPendingforapproval = response.data.projectPendingforapproval;
                    $scope.projectCloserCount = response.data.projectCloserCount;
                    console.log($scope.ProjectSelection);
                    console.log($scope.projectPendingforapproval);
                    console.log($scope.projectCloserCount);

                }, function (x) {
                    // Request error
                });
            }, function (x) {
                // Request error
            });
        }
        else {
            $http({ url: '/AReQCC/TeamDetails/FetchTeamDetailsByStatusProjects', method: "GET", params: { Status: '3', CreatedBy: $scope.EmpCode, pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                $scope.ApprovedResponse = response.data.temaDetailsResponse;
                $scope.ProjectSelection = response.data.totalCount;
                if (response.data.temaDetailsResponse.length > 200) {
                    //  alert(parseInt((response.data.totalCount / 50) * 10))
                    $scope.pageSize = parseInt((response.data.temaDetailsResponse.length / 50) * 10);
                }
               // alert($scope.totalCount);
                $scope.ApprovedCount = response.data.temaDetailsResponse.length;
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
        $http({ url: '/AReQCC/ProjectDetails/FetchProjectsByTeamId', method: "GET", params: { TeamId: Approved.Id } }).then(function (response) {
            // Request completed successfully
            console.log("hello raj");
            console.log(response.data.length);
            $scope.ProjectDetailsResponse = response.data;
            console.log($scope.ProjectDetailsResponse);
            $scope.ProjectStatusCheckone = [];
            if (response.data.length > 0) {
                for (var i = 0; i < response.data.length; i++) {
                  //  alert(response.data.length)
                    $scope.ProjectStatusCheckone.push($scope.ProjectDetailsResponse[i].Status);
                    // return $scope.ProjectStatusCheck;
                }
            } else {
                $scope.ProjectStatusCheckone.push(0);
            }
            
            var numbers = [1, 2, 3, 4];
          //  console.log(Math.max(...numbers)) // 4
            //console.log(Math.min(...$scope.ProjectStatusCheckone)) // 1
            console.log($scope.ProjectDetailsResponse.length);
            $scope.TeamApproved = $scope.ProjectDetailsResponse.length
            $scope.ProjectStatusCheckPro = Math.min(...$scope.ProjectStatusCheckone)
           // $scope.TeamApproved = 2;
            //alert()
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
      //  return false;
        $http({ url: '/AReQCC/ProjectDetails/FetchProjectsByTeamId', method: "GET", params: { TeamId: Approved.Id } }).then(function (response) {
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
        $http({ url: '/AReQCC/TeamRegistration/FetchCircleDetailsByName', method: "GET", params: { TeamId: Approved.Id, CircleName: Approved.TeamName, EmpCode: $scope.EmpCode, Plant: Approved.Plant, BusinessUnit: Approved.BusinessUnit } }).then(function (response) {
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
        $http({ url: '/AReQCC/TeamRegistration/conventionsConClaveScoreAward', method: "GET", params: { TeamName: Approved.TeamName } }).then(function (response) {
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
        location.reload(); 
    }
    $scope.Submit = function () {
        var data = { TeamId: $scope.TeamId, Title: $scope.Title, Objective: $scope.Objective, Goal: $scope.Goal, GoalTo: $scope.GoalTo, ProjectStartDate: $('#datepicker-range-start').val(), ProjectEndDate: $('#datepicker-range-end').val(), ExpectedCostSaving: $scope.ExpectedCostSaving, Status: 1,TeamStatus:4, Level1: $scope.Level1, CreatedBy: $scope.EmpCode, GoalToUOM: $scope.GoalToUOM, GoalUOM: $scope.GoalUOM };
        if ($scope.ActualGoal != null) {
            //alert($scope.ActualGoal); 
            ProjectDetailsEdit.ActualGoal = $scope.ActualGoal;
            ProjectDetailsEdit.ActualProjectStartDate = $('#datepicker-range-APstart').val();
            ProjectDetailsEdit.ActualProjectEndDate = $('#datepicker-range-APend').val();
            ProjectDetailsEdit.ActualExpectedCostSaving = $scope.ActualExpectedCostSaving;
            ProjectDetailsEdit.Status = 4;
            ProjectDetailsEdit.TeamStatus = 7;
            //Need To Check this line
            ProjectDetailsEdit.Level2 = ProjectDetailsEdit.Level3 = null;
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
                $scope.Title = $scope.Objective = $scope.Goal = $scope.GoalTo = $scope.ProjectStartDate = $scope.ProjectEndDate = $scope.ExpectedCostSaving = $scope.GoalToUOM = $scope.GoalUOM= null;
                $(".showtableList,.body_blur").hide();
                location.reload();

            }, function (error) {

            });
        }
        else {
            //alert($scope.ProjectDetailsResponse.length);
            console.log(data);
            //return false;
            $http.post('/AReQCC/ProjectDetails/ProjectSelectionSaveOrUpdate', data).then(function (d) {
                setTimeout(function () {
                    location.reload();
                }, 1000);
                $scope.StatusMessage = d.data;
                
                $scope.Title = $scope.Objective = $scope.Goal = $scope.GoalTo = $scope.ProjectStartDate = $scope.ProjectEndDate = $scope.ExpectedCostSaving = $scope.GoalToUOM = $scope.GoalUOM = null;
                $(".showtableList,.body_blur").hide();
                $("#ProjectSelectionSheetView").hide();
                $('#datepicker-range-start').val('');
                $('#datepicker-range-end').val('');
            }, function (error) {
                //alert(error);
                    //console.log(error);
                    $("#errordisplayProjectcreate").text("Please check given details correctly").css({ "color": "red", "text-align": "center" });
                    setTimeout(function () {
                        $("#errordisplayProjectcreate").text('');
                    }, 5000);
                    
            });
        }
    }
    $scope.ApprovedTeamByProject = function () {
        //alert($scope.TeamId);
        $http({ url: '/AReQCC/TeamRegistration/ApprovedTeamStatus', method: "GET", params: { TeamId: $scope.TeamId, Status: '10' } }).then(function (response) {
            location.reload();
        });
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

app.filter('imgThumb', function () {
    return function (images, start) {
        return images.slice(start);
    };
});