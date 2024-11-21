var app = angular.module('QCC', ['ui.bootstrap']);
var MailTemplate = [];
app.controller("HomeController", function ($scope, $http,$attrs) {
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/Home/Index';
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
            $http({ url: '/AReQCC/TeamDetails/FetchTeamDetailsByAdminLevels', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                $scope.InFlowResponse = response.data.temaDetailsResponse;
                //alert($scope.InFlowResponse.length)
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

            }, function (x) {
                // Request error
            });
        }
        else {
            //alert($scope.EmpCode);
            //alert($scope.functionCode);
           
            $http({ url: '/AReQCC/TeamDetails/FetchTeamDetailsByLevels', method: "GET", params: { Level: $scope.EmpCode, pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                console.log(response);
                $scope.InFlowResponse = response.data.temaDetailsResponse;
                if (response.data.totalCount > 200) {
                    //  alert(parseInt((response.data.totalCount / 50) * 10))
                    $scope.pageSize = parseInt((response.data.totalCount / 50) * 10);
                }
                $scope.totalCount = response.data.totalCount;
            }, function (x) {
                // Request error
            });
            $http({ url: '/AReQCC/TeamRegistration/NotificationAlert', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully
                $scope.InflowCount = response.data.InflowCount;
                $scope.ApproveCount = response.data.ApproveCount;
                $scope.RejectCount = response.data.RejectCount;
               
            }, function (x) {
                // Request error
            });
        }
       
    }
    $scope.sendtochange = function(Plant,TeamName,Id) {
        $http({ url: '/AReQCC/TeamDetails/changeteamdetails', method: "GET", params: { TeamName:TeamName, Plant:Plant} }).then(function (response) {
            // Request completed successfully
            var backgroundblur = '<div class="backgroundblur" style="width: 100%;height: 100%;background: #00000075;z-index: 4;position: fixed;top: 0px;"></div>';
            var alertshow = '<div class="alert alert-info hidealertclass" style="position:absolute;z-index:4;top:40vh;left:35vw;padding:1vw;font-size: 1vw;font-weight: bold;border-radius: 1vw;color:black;"><strong> ' + TeamName + '</strong> Forwarded to PlantLogin to change team Members.</div >';
            $("body").append(backgroundblur).append(alertshow);
           
            setTimeout(function () {
                location.reload();
            }, 3000);
            //$scope.InFlowResponse = response.data.temaDetailsResponse;
            //$scope.totalCount = response.data.totalCount;
        }, function (x) {
            // Request error
        });
    }
    $scope.toggleEdit = function (InFlow) {
        InFlow.showEdit = InFlow.showEdit ? false : true;
        teamDetails = InFlow;
        $("#InflowView").show();
        $(".body_blur").show();
        $scope.L1MailId = InFlow.L1MailId;
        $scope.PlLoginMailId = InFlow.PlLoginMailId;
        console.log(InFlow);
       
       // return false;
        $http({ url: '/AReQCC/TeamRegistration/FetchCircleDetailsByName', method: "GET", params: { TeamId: InFlow.Id, EmpCode: $scope.EmpCode, Plant: InFlow.Plant, BusinessUnit: InFlow.BusinessUnit } }).then(function (response) {
            console.log(response.data);
           // alert(response.data);
            if (response.data == '') {
               // alert("hello");
                $("#InflowView > table").hide();
                $(".textshowed").text("This Record don't have Data").css({ "font-weight": "bold", "text-align": "center" }).show();
                $("#rejectedPlantChange").hide().attr('disabled', true);
                $(".ApproveRejectedTeam").hide();
                $(".ApproveRejectedCheck").css({ "padding-left": "44%" });
                $scope.CircleResponse = "";

            } else {
                $scope.CircleResponse = response.data;
                $(".ApproveRejectedCheck").css({ "padding-left": "35%" });
                $("#InflowView > table").show();
                $(".ApproveRejectedTeam").show();
                $("#rejectedPlantChange").hide().attr('disabled', true);
                $(".textshowed").hide()
            }
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
            //console.log();
            if (InFlow.Plant != ($("#myHiddenfunctionDesc").val())) {
                $(".ApproveRejectedTeam").hide();
                //$attrs.$set('ngClick', $this.RejectedPlantNotIn()); 
                //var btn = document.querySelector('#rejectedPlantChange');
                //btn.setAttribute("ng-click", "RejectedPlantNotIn()");
                $("#rejectedPlant").hide().attr('disabled', true);
                $("#rejectedPlantChange").show();
                $("#remarks").val("this login change Plant or SubDivision. So Reject and Delete").attr("disabled", true);
            } else {
                $("#rejectedPlantChange").hide().attr('disabled', true);
            }
            
            
        }, function (x) {
            // Request error
        });
    }
    $scope.Close = function () {
        $(".showtableList,.body_blur").hide();
        $("#InflowView").hide();
    }
    $scope.Approved = function () {
        //console.log(teamDetails); return false;
       // console.log(teamDetails.CreatedDate);
        var year = teamDetails.CreatedDate.split('/');
        
        
        if (year[0].length < 2) {
            var day = '0' + year[0]
            if (year[1].length < 2) {
                var date = day + '0' + year[1];
               // return date;
            } else {
                var date = day + '-' + year[1];
                //return date;
            }

        } else {
            if (year[1].length < 2) {
                var date = year[0] + '-0' + year[1];
               // return date;
            } else {
                var date = year[0] + '-' + year[1];
               // return date;
            }
        }
        var yeardat = year[2].split(' ')
        var createdDateValue = yeardat[0] + '-' + date;
        //console.log(createdDateValue)
        var year = createdDateValue.split('-');
        //console.log(year[1]);
        if (year[1] >= '04') {
            teamDetails.yearandmonthdate = year[0] + '-04-01';
            teamDetails.endyearmonthdate = (parseInt(year[0]) + parseInt(1)) + '-03-31';
        }
        if (year[1] < '04') {
            teamDetails.yearandmonthdate = (parseInt(year[0]) - parseInt(1)) + '-04-01';
            teamDetails.endyearmonthdate = year[0] + '-03-31';
        }
        teamDetails.TeamId = teamDetails.Id;
        console.log(teamDetails);
        teamDetails.Plant = $("#myHiddenempfunctioncode").val();
        //teamDetails.yearandmonthdate = createdDateValue;
        //teamDetails.endyearmonthdate = createdDateValue;
       // console.log("check TeamDetails :- ", teamDetails);
        //return false;
        $http.post('/AReQCC/TeamDetails/SaveOrUpdateTeamDetails', teamDetails).then(function (d) {

            $scope.StatusMessage = d.data;
            //alert(d); console.log(d); return false;
            $scope.btnSubmit = true;
            $(".showtableList,.body_blur").hide();
            $("#InflowView").hide();
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/AReQCC/ProjectDetails/SendingBulkEmails',
                data: JSON.stringify(MailTemplate)
            });

            window.location.href = '/AReQCC/Home/Inflow';
           
        }, function (error) {

        });
    }
    $scope.Rejected = function () {

        if (teamDetails.Status == 2) {
            MailTemplate = [{ email: $scope.PlLoginMailId, subject: teamDetails.TeamName + " " + "Reject Status", emailBody: teamDetails.TeamName + " " + " has rejected by Level2 due to " + $scope.Remarks }, { email: $scope.L1MailId, subject: teamDetails.TeamName + " " + "Reject Status", emailBody: teamDetails.TeamName + " " + " has rejected by Level2 due to " + $scope.Remarks }];
        }
        else if (teamDetails.Status == 1) {
            MailTemplate = [{ email: $scope.PlLoginMailId, subject: teamDetails.TeamName + " " + "Reject Status", emailBody: teamDetails.TeamName + " " + " has rejected by Level1 due to " + $scope.Remarks }];
        }
        teamDetails.Status = 11;
        teamDetails.Level3 = teamDetails.Level2;
        teamDetails.UpdatedBy = $scope.EmpCode;
        teamDetails.Remarks = $scope.Remarks;
        teamDetails.TeamId = teamDetails.Id
        console.log(teamDetails.CreatedDate);
       // var year = teamDetails.CreatedDate.split('/');

        var year = teamDetails.CreatedDate.split('/');


        if (year[0].length < 2) {
            var day = '0' + year[0]
            if (year[1].length < 2) {
                var date = day + '0' + year[1];
                // return date;
            } else {
                var date = day + '-' + year[1];
                //return date;
            }

        } else {
            if (year[1].length < 2) {
                var date = year[0] + '-0' + year[1];
                // return date;
            } else {
                var date = year[0] + '-' + year[1];
                // return date;
            }
        }
        var yeardat = year[2].split(' ')
        var createdDateValue = yeardat[0] + '-' + date;
        //console.log(createdDateValue)
        var year = createdDateValue.split('-');
        //console.log(year[1]);
        if (year[1] >= '04') {
            teamDetails.yearandmonthdate = year[0] + '-04-01';
            teamDetails.endyearmonthdate = (parseInt(year[0]) + parseInt(1)) + '-03-31';
        }
        if (year[1] < '04') {
            teamDetails.yearandmonthdate = (parseInt(year[0]) - parseInt(1)) + '-04-01';
            teamDetails.endyearmonthdate = year[0] + '-03-31';
        }
        teamDetails.Plant = $("#myHiddenempfunctioncode").val();
        //var yeardat = year[2].split(' ')
        //var createdDateValue = yeardat[0] + '-' + date;
        //teamDetails.yearandmonthdate = createdDateValue;
        //teamDetails.endyearmonthdate = createdDateValue;
        console.log("check TeamDetails :- ", teamDetails);
    //    return false;
        //return false;
        var remarks = $("#remarks").val();

        if (remarks == "") {
            $("#error").text("Enter Remarks");
            return false;
        } else {
        $http.post('/AReQCC/TeamDetails/SaveOrUpdateTeamDetails', teamDetails).then(function (d) {
            InIt();
            $scope.StatusMessage = d.data;
            $scope.btnSubmit = true;
            $(".showtableList,.body_blur").hide();
            $("#InflowView").hide();

            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/AReQCC/ProjectDetails/SendingBulkEmails',
                data: JSON.stringify(MailTemplate)
            });

            window.location.href = '/AReQCC/Home/Inflow';
        }, function (error) {

        });
    }
    }

    $scope.RejectedPlantNotIn = function () {
        alert("hello")
        if (teamDetails.Status == 2) {
            MailTemplate = [{ email: $scope.PlLoginMailId, subject: teamDetails.TeamName + " " + "Reject Status", emailBody: teamDetails.TeamName + " " + " has rejected by Level2 due to " + $scope.Remarks }, { email: $scope.L1MailId, subject: teamDetails.TeamName + " " + "Reject Status", emailBody: teamDetails.TeamName + " " + " has rejected by Level2 due to " + $scope.Remarks }];
        }
        else if (teamDetails.Status == 1) {
            MailTemplate = [{ email: $scope.PlLoginMailId, subject: teamDetails.TeamName + " " + "Reject Status", emailBody: teamDetails.TeamName + " " + " has rejected by Level1 due to " + $scope.Remarks }];
        }
        teamDetails.Status = 11;
        teamDetails.Level3 = teamDetails.Level2;
        teamDetails.UpdatedBy = $scope.EmpCode;
        teamDetails.Remarks = $scope.Remarks;
        teamDetails.TeamId = teamDetails.Id
        console.log(teamDetails.CreatedDate);
        // var year = teamDetails.CreatedDate.split('/');

        var year = teamDetails.CreatedDate.split('/');


        if (year[0].length < 2) {
            var day = '0' + year[0]
            if (year[1].length < 2) {
                var date = day + '0' + year[1];
                // return date;
            } else {
                var date = day + '-' + year[1];
                //return date;
            }

        } else {
            if (year[1].length < 2) {
                var date = year[0] + '-0' + year[1];
                // return date;
            } else {
                var date = year[0] + '-' + year[1];
                // return date;
            }
        }
        var yeardat = year[2].split(' ')
        var createdDateValue = yeardat[0] + '-' + date;
        //console.log(createdDateValue)
        var year = createdDateValue.split('-');
        //console.log(year[1]);
        if (year[1] >= '04') {
            teamDetails.yearandmonthdate = year[0] + '-04-01';
            teamDetails.endyearmonthdate = (parseInt(year[0]) + parseInt(1)) + '-03-31';
        }
        if (year[1] < '04') {
            teamDetails.yearandmonthdate = (parseInt(year[0]) - parseInt(1)) + '-04-01';
            teamDetails.endyearmonthdate = year[0] + '-03-31';
        }
        teamDetails.Plant = $("#myHiddenempfunctioncode").val();
        //var yeardat = year[2].split(' ')
        //var createdDateValue = yeardat[0] + '-' + date;
        //teamDetails.yearandmonthdate = createdDateValue;
        //teamDetails.endyearmonthdate = createdDateValue;
        console.log("check TeamDetails :- ", teamDetails);
        //    return false;
        //return false;
        var remarks = $("#remarks").val();

        if (remarks == "") {
            $("#error").text("Enter Remarks");
            return false;
        } else {
            $http.post('/AReQCC/TeamDetails/SaveOrUpdateTeamDetailsPlantChanged', teamDetails).then(function (d) {
                InIt();
                $scope.StatusMessage = d.data;
                $scope.btnSubmit = true;
                $(".showtableList,.body_blur").hide();
                $("#InflowView").hide();

                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: 'POST',
                    url: '/AReQCC/ProjectDetails/SendingBulkEmails',
                    data: JSON.stringify(MailTemplate)
                });

                window.location.href = '/AReQCC/Home/Inflow';
            }, function (error) {

            });
        }
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