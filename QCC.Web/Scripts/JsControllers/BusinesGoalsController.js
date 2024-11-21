var app = angular.module('QCC', []);

app.controller("HomeController", function ($scope, $http, $window, $filter) {
    
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/AReQCC';
    }
    $scope.EmpCode = $('#myHiddenempCode').val();
    activateController();
    
    function activateController() {
        var d = new Date();
        var m = d.getMonth() - 1;
        var mm = '03';
        var m1 = d.getMonth()+1;
        var mm1 = '04';
        var dd = d.getDate();
        var ddd = ("0" + dd).slice(-2)
        var yy = d.getFullYear() - 1;
        var yy1 = d.getFullYear();
        var myDateString = yy + '-' + mm + '-' + ddd;
        var myDateString1 = yy1 + '-' + mm1 + '-' + ddd;    
        $scope.Year1 = yy;
        $scope.Year2 = yy1;
        $("#datepicker-example12").val(yy1);
        $http({ url: '/AReQCC/TeamRegistration/ReportsDroppDownResponse', method: "GET" }).then(function (response) {
            if (response.data.Department != null) {
                $scope.Department = [];
                for (var i = 0; i < response.data.Department.length; i++) {
                    var department = { "Id": i, "Name": response.data.Department[i] };
                    $scope.Department.push(department);
                }
            }
        }, function (x) {// Request error 
        });
        $http({ url: '/AReQCC/BusinessGoals/FetchBusinessGoalsByEmpCode', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
            for (i = 0; i < response.data.businessGoalResponse.length; i++) {
                     $("#yearsList").append('<option value="' + response.data.businessGoalResponse[i].Yearly+ '">' + response.data.businessGoalResponse[i].Yearly+ '</option>');
             }
        });
        $http({ url: '/AReQCC/TeamRegistration/FetchEmployeeDetailsByLevel', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
           
            if (response.data.empCode != null) {
                console.log("hello ++++ " + response.data);
                console.log(response.data);
                $scope.EmpCode = response.data.empCode;
                $scope.EmpName = response.data.empName;
                $scope.Grade = response.data.grade;
                $scope.DepartmentN = response.data.department;
                $scope.EmpMailId = response.data.emailId;
                $scope.Company = response.data.company;
                $scope.Plant = response.data.Plant;
                $scope.BusinessUnit = response.data.businessUnit;
                $scope.userSelect = response.data.department;
                $(".backgroundBlur,#ngloader").hide();
            }
            else {
                $scope.EmpCode = $scope.EmpName = $scope.Grade = $scope.Department = $scope.EmpMailId = $scope.Company = $scope.Plant = $scope.BusinessUnit = null;
                InIt();
            }
        }, function (x) {
            // Request error
        });
        $.ajax({
            url: '/AReQCC/TeamRegistration/BusinessGoalsAutoFetch', method: "GET", data: { empCode: $scope.EmpCode, startDate: myDateString, endDate: myDateString1 }, success: function (resp) {
                // Request completed successfully
                if (resp != null) {
                    //var TEIYtd = parseFloat((resp.InvolvementHeadCount / resp.EmployeeHeadCount) * 100).toFixed(2);
                    var TEIYtd = Math.ceil((resp.InvolvementHeadCount / resp.EmployeeHeadCount) * 100);
                    $("#EmployeeHeadCount").val(resp.EmployeeHeadCount);
                    $("#EligibleHeadCount").val(resp.EligibleHeadCount);
                    $("#NoOfOldCircles").val(resp.NoofOldCircles);
                    $("#NoofNewCircles").val(resp.NoofNewCircles);
                    $("#CirclesYTD").val(resp.NoofCirclesYTD);
                    var notarget = (resp.EligibleHeadCount / 6)
                    //$("#NoofqcTarget").val(notarget.toFixed(2));
                    $("#NoofqcTarget").val(Math.ceil(notarget));
                    $("#ProjectsYTD").val(resp.NoofProjectsYTD);
                    $("#InvolvementHeadCount").val(resp.InvolvementHeadCount);
                    $("#TEIYTD").val(TEIYtd);
                    $("#EmployeeHeadCount").val(resp.EmployeeHeadCount);
                    $("#ProjectsTarget").val((resp.NoofOldCircles * 2) + resp.NoofNewCircles);
                    $("#NoofFacilitators").val("");
                    $("#CirclesperFacilitator").val("");
                    $("#TEITarget").val("");
                    $("#btntxt").text("Save Goals");
                    $(".backgroundBlur,#ngloader").hide();
                }

            }
        });
       // alert($scope.EmpCode);
        //alert(yy1)
        fetchdetailsbGoals($scope.EmpCode, yy + '-' + yy1)
       // $("#datepicker-example11").trigger("onSelect");
    }
    
    $scope.excuteGraphs = function () {
        var selYEar = $("#yearsList").val();
        $http({
            url: '/AReQCC/BusinessGoals/BusinessGolsGetByEmpCodeYear', method: "GET", params: { empCode: $scope.Plant, yearSelect: selYEar }
        }).then(function (response) {
            $(".progress1").hide();
            $(".containGraph").hide();
            if (response.data.businessGoalResponse[0] != undefined) {

                $(".errortext").hide();
                CirclesYTD = response.data.businessGoalResponse[0].CirclesYTD;
                ProjectsYTD = response.data.businessGoalResponse[0].ProjectsYTD;
                TEITarget = response.data.businessGoalResponse[0].TEITarget;
                $(".progrs1 span").text(CirclesYTD);
                $(".progrs2 span").text(ProjectsYTD);
                $(".progrs3 span").text(TEITarget);
                $(".progrs4 span").text(TEIYTD);
                $(".progress1").show();
                $(".progress1").each(function () {
                    var $bar = $(this).find(".bar");
                    var $val = $(this).find("span");
                    var perc = parseInt($val.text(), 10);
                    $({ p: 0 }).animate({ p: perc }, {
                        duration: 3000,
                        easing: "swing",
                        step: function (p) {
                            $bar.css({
                                transform: "rotate(" + (45 + (p * 1.8)) + "deg)", // 100%=180° so: ° = % * 1.8
                                // 45 is to add the needed rotation to have the green borders at the bottom
                            });
                            $val.text(p | 0);
                        }
                    });
                });
                 $(".containGraph").show();
                getGraphbarList2(selYEar);
                getGraphbarList(); getGraphbarList3($scope.Company, $scope.EmpCode);
            } else {
                
                $(".errortext").text("Data Not Found").css({ "color": "red", "font-weight": "bold", "text-align": "center" }).show();
            }
        });
    }
    $scope.excuteGraphsAwards = function () {
        var selYEar = $("#yearsList").val();
        var depts = $("#depts").val();
        var bussinessUnit = $.trim($("#bussinessUnit").text());
        $http({
            url: '/AReQCC/ConventionsConclave/FetchNationConventionByAwardsYearGold', method: "GET", params: { BussinessUnit: bussinessUnit, Department: depts, Yearly: selYEar }
        }).then(function (response) {
             Gold = response.data.nationalConventionResponses[0].Gold;
             $(".progrs1 span").text(Gold);
             $(".progrs3 span").text(Gold);
             $(".progress1").show();
            $(".progress1").each(function () {
                var $bar = $(this).find(".bar");
                var $val = $(this).find("span");
                var perc = parseInt($val.text(), 10);
                $({ p: 0 }).animate({ p: perc }, {
                    duration: 3000,
                    easing: "swing",
                    step: function (p) {
                        $bar.css({
                            transform: "rotate(" + (45 + (p * 1.8)) + "deg)", // 100%=180° so: ° = % * 1.8
                            // 45 is to add the needed rotation to have the green borders at the bottom
                        });
                        $val.text(p | 0);
                    }
                });
            });
        });
        $http({
            url: '/AReQCC/ConventionsConclave/FetchNationConventionByAwardsYearSilver', method: "GET", params: { BussinessUnit: bussinessUnit, Department: depts, Yearly: selYEar }
        }).then(function (response) {
            Gold = response.data.nationalConventionResponses[0].Silver;
            $(".progrs2 span").text(Silver);
            $(".progrs4 span").text(Silver);
            $(".progress1").show();
            $(".progress1").each(function () {
                var $bar = $(this).find(".bar");
                var $val = $(this).find("span");
                var perc = parseInt($val.text(), 10);
                $({ p: 0 }).animate({ p: perc }, {
                    duration: 3000,
                    easing: "swing",
                    step: function (p) {
                        $bar.css({
                            transform: "rotate(" + (45 + (p * 1.8)) + "deg)", // 100%=180° so: ° = % * 1.8
                            // 45 is to add the needed rotation to have the green borders at the bottom
                        });
                        $val.text(p | 0);
                    }
                });
            });
        });

    };
    $scope.logout = function () {
        $http({ url: '/AReQCC/Login/Logout', method: "GET" }).then(function (response) {
            // Request completed successfully
            window.location.href = '/AReQCC';
        }, function (x) {
            // Request error
        });
    }
    $scope.Save = function () {
        if ($("#datepicker-example11").val() == '') {
            $("#error").css({ "color": "red", }).show();
            setTimeout(function () {
                $("#error").hide()
            },3000)
            return false;
        }
        $scope.BusinessGoals.Emp_Code = $scope.EmpCode;
        $scope.BusinessGoals.Plant = $scope.Plant;
        $scope.BusinessGoals.BusinessUnit = $scope.BusinessUnit;
        $scope.BusinessGoals.Company = $scope.Company;
        $scope.BusinessGoals.EligibleHeadCount = $("#EligibleHeadCount").val(); 
        $scope.BusinessGoals.NoofNewCircles = $("#NoofNewCircles").val(); 
        $scope.BusinessGoals.TEIYTD = $("#TEIYTD").val(); 
        $scope.BusinessGoals.NoofqcTarget = $("#NoofqcTarget").val();
        $scope.BusinessGoals.CirclesYTD = $("#CirclesYTD").val();
        $scope.BusinessGoals.TEITarget = $("#TEITarget").val();
        $scope.BusinessGoals.EmployeeHeadCount = $("#EmployeeHeadCount").val();
        $scope.BusinessGoals.ProjectsTarget = $("#ProjectsTarget").val();
        $scope.BusinessGoals.ProjectsYTD = $("#ProjectsYTD").val();
        $scope.BusinessGoals.NoofFacilitators = $("#NoofFacilitators").val();
        $scope.BusinessGoals.CirclesperFacilitator = $("#CirclesperFacilitator").val();
        $scope.BusinessGoals.NoOfOldCircles = $("#NoOfOldCircles").val();
        $scope.BusinessGoals.InvolvedHeadCount = $("#InvolvementHeadCount").val();
        $scope.BusinessGoals.TEIGAP = $("#Gap").val();
        $scope.BusinessGoals.Yearly = $("#datepicker-example11").val() + '-' + $("#datepicker-example12").val();
         $http.post('/AReQCC/BusinessGoals/BusinessGoalsInsertUpdate', $scope.BusinessGoals).then(function (d) {
            $scope.StatusMessage = "Successfully Submit";
            setTimeout(function () {
                $(".backgroundBlur,#ngloader").show();
                location.reload();
            }, 2000);
            activateController();

        }, function (error) {

        });
    }
    $scope.TeamRegistration = function () {
        window.location.href = '/AReQCC/Home/TeamRegistration';
    }
     $scope.ProjectExecution = function () {
        window.location.href = '/AReQCC/ProjectDetails/ProjectSelectionSheet';
    }
    $scope.Reports = function () {
        window.location.href = '/AReQCC/Reports/Reports';
    }
    $scope.CirclePerFacilitator = function () {
console.log($("#NoofqcTarget").val());
        console.log($("#NoofFacilitators").val());
        $scope.BusinessGoals.CirclesperFacilitator = Math.ceil($("#NoofqcTarget").val() / $("#NoofFacilitators").val());
    }
    

})
function fetchdetailsbGoals(EmpCode, Year) {
   // alert(Year)
     $.ajax({
        url: '/AReQCC/BusinessGoals/BusinessGolsGetByEmpCodeYTD', method: "GET", data: { empCode: EmpCode, Year: Year },
         success: function (response) {
            if (response.BusinessUnit == null) {
                var d = new Date();
                var m = d.getMonth();
                var mm = '03';
                var m1 = d.getMonth() + 1;
                var mm1 = '04'
                var dd = d.getDate();
                var ddd = ("0" + dd).slice(-2)
                var yy = d.getFullYear() - 1;
                var yy1 = d.getFullYear();
                var yr = Year.split('-');
                var y1 = yr[0];
                var y2 = yr[1];
                var myDateString = y1 + '-' + mm + '-' + ddd;
                var myDateString1 = y2 + '-' + mm1 + '-' + ddd;

                $.ajax({
                    url: '/AReQCC/TeamRegistration/BusinessGoalsAutoFetch', method: "GET", data: { empCode: EmpCode, startDate: myDateString, endDate: myDateString1 }, success: function (resp) {
                    // Request completed successfully
                    
                        if (resp != null) {
                        console.log("not emp")
                        console.log(resp);
                        var TEIYtd = Math.ceil((resp.InvolvementHeadCount / resp.EmployeeHeadCount) * 100);
                        $("#EmployeeHeadCount").val(resp.EmployeeHeadCount);
                        $("#EligibleHeadCount").val(resp.EligibleHeadCount);
                        $("#NoOfOldCircles").val(resp.NoofOldCircles);
                        $("#NoofNewCircles").val(resp.NoofNewCircles);
                        $("#CirclesYTD").val(resp.NoofCirclesYTD);
                         //   alert(resp.NoofQcTarget)
                            var notarget = (resp.EligibleHeadCount / 6)
                            //$("#NoofqcTarget").val(notarget.toFixed(2));
                            $("#NoofqcTarget").val(Math.ceil(notarget));
                        $("#ProjectsYTD").val(resp.NoofProjectsYTD);
                        $("#InvolvementHeadCount").val(resp.InvolvementHeadCount);
                        $("#TEIYTD").val(TEIYtd);
                        $("#EmployeeHeadCount").val(resp.EmployeeHeadCount);
                        $("#ProjectsTarget").val((resp.NoofOldCircles * 2) + resp.NoofNewCircles);
                        $("#NoofFacilitators").val("");
                        $("#CirclesperFacilitator").val("");
                        $("#TEITarget").val("");
                        $("#btntxt").text("Save Goals");
                        $("#Gap").val("");
                        $("#InvolvementHeadCount").val(resp.InvolvementHeadCount);

                        $(".backgroundBlur,#ngloader").hide();


                    } else {
 //                       alert("old");
                        
                    }

                } 
                });
            }
            else {
                console.log(response);
                $("#EligibleHeadCount").val(response.EligibleHeadCount);
                $("#NoOfOldCircles").val(response.NoOfOldCircles);
                $("#NoofNewCircles").val(response.NoofNewCircles);
                $("#CirclesYTD").val(response.CirclesYTD);
                $("#NoofqcTarget").val(response.NoofqcTarget);
                $("#TEIYTD").val(response.TEIYTD);
                $("#ProjectsYTD").val(response.ProjectsYTD);
                $("#EmployeeHeadCount").val(response.EmployeeHeadCount);
                $("#NoofFacilitators").val(response.NoofFacilitators);
                $("#CirclesperFacilitator").val(response.CirclesperFacilitator);
                $("#ProjectsTarget").val(response.ProjectsTarget);
                $("#Gap").val(response.TEIGAP);
                $("#TEITarget").val(response.TEITarget);
                $("#btntxt").text("Update Goals");
                $("#InvolvementHeadCount").val(response.InvolvedHeadCount);
                $(".backgroundBlur,#ngloader").hide();
            }
        }

    });
}
function totclamalksmd(empCode) {
    $.ajax({
        url: "/AReQCC/BusinessGoals/FetchBusinessGoalsByEmpCode",
        method: "Get",
        data: { empCode: empCode },
        success: function (response) {
            var respopnnser = [];
            $.each(response.businessGoalResponse, function (key, value) {
                respopnnser.push(value.Executed_Year);
            });
           
        }
    })
}
function aklsjdflsakjd(empCode, respopnnser) {
    var kjsdkfks = [];
    for (i = 0; i <= respopnnser.length; i++) {

        if (respopnnser - 1 == i) {
            return false;
        } else {
            console.log(respopnnser[i] + '-' + respopnnser[i + 1]);
            $.ajax({
                url: "/AReQCC/BusinessGoals/BusinessGolsGetByEmpCodeYear",
                method: "Get",
                data: { empCode: empCode, yearSelect1: respopnnser[i], yearSelect2: respopnnser[i + 1] },
                success: function (response) {
                    kjsdkfks.push(response);
                }
            })
        }
  
    }
}
function getGraphbarList() {
    $.ajax({
        url:"/AReQCC/BusinessGoals/BusinessGolsGetByYearCount",
        method:"Get",
        success: function (response) {
            var newGraphList = [];
            $.each(response.graphList1Response, function (key, value) {
                
                newGraphList.push({ x: key + 1, y: value["CirclesYTD"], label: value["Yearly"], indexLabel: value['CirclesYTD'].toString() });
            });
            barCharGraph(newGraphList);
       
        }
    });
}
function getGraphbarList2(yearly) {

    $.ajax({
        url: "/AReQCC/BusinessGoals/BusinessGolsGetByYearCountPlant",
        method: "Get",
        data: {Yearly:yearly},
        success: function (response) {
            var newGraphList = [];
            $.each(response.graphList1Response, function (key, value) {
                newGraphList.push({ x: key + 1, y: value["CirclesYTD"], label: value["Plant"], indexLabel: value["CirclesYTD"].toString() });
            });
            barCharGraph2(newGraphList, yearly);

        }
    });
}
function getGraphbarList3(company,EmpCode) {
    $.ajax({
        url: "/AReQCC/BusinessGoals/BusinessGolsGetByYearCountCompany",
        method: "Get",
        data: { Company: company, empCode: EmpCode },
        success: function (response) {
            var newGraphList = [];
            $.each(response.graphList1Response, function (key, value) {
                newGraphList.push({ x: key + 1, y: value["CirclesYTD"], label: value["Yearly"], indexLabel: value["CirclesYTD"].toString()});
            });
            barCharGraph3(newGraphList);

        }
    });
}
function barCharGraph(newGraphList) {
    var chart = new CanvasJS.Chart("chartContainer",
        {
            title: {
                text: "Quality Circles Year Wise AR Group"
            },
            axisY: {
                title: "No. Of Circles"
            },
            data: [

                {
                    dataPoints: newGraphList
                }
            ]
        });

    chart.render();
}
function barCharGraph2(newGraphList,yearly) {
    var chart = new CanvasJS.Chart("chartContainer1",
        {
            title: {
                text: "Quality Circles Year Wise FY " + yearly+" AR Group"
            },
            axisY: {
                title: "No. Of Circles"
            },
            data: [

                {
                    dataPoints: newGraphList
                }
            ]
        });

    chart.render();
}
function barCharGraph3(newGraphList) {
    var chart = new CanvasJS.Chart("chartContainer2",
        {
            title: {
                text: "ARBL QC STATUS YEAR WISE"
            },
            axisY: {
                title: "No. Of Circles"
            },
            data: [

                {
                    dataPoints: newGraphList
                }
            ]
        });

    chart.render();
}
function checkGap(val) {
    $("#Gap").val(val-($("#TEIYTD").val()))
}