var app = angular.module('QCC', []);

app.controller("HomeController", function ($scope, $http, $window, $filter) {
    
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/QCC.Web/Home/Index';
    }
    $scope.EmpCode = $('#myHiddenempCode').val();
//    totclamalksmd($scope.EmpCode);
    activateController();
    
    function activateController() {
        $http({ url: '/QCC.Web/TeamRegistration/ReportsDroppDownResponse', method: "GET" }).then(function (response) {
            // Request completed successfully
            if (response.data.Company != null) {
                $scope.Company = [];
                for (var i = 0; i < response.data.Company.length; i++) {
                    var company = { "Id": i, "Name": response.data.Company[i] };
                    $scope.Company.push(company);
                }
            }
            if (response.data.BusinessUnit != null) {
                $scope.BusinessUnit = [];
                for (var i = 0; i < response.data.BusinessUnit.length; i++) {
                    var business = { "Id": i, "Name": response.data.BusinessUnit[i] };
                    $scope.BusinessUnit.push(business);
                }
            }

            if (response.data.Department != null) {
                $scope.Department = [];
                for (var i = 0; i < response.data.Department.length; i++) {
                    var department = { "Id": i, "Name": response.data.Department[i] };
                    $scope.Department.push(department);
                }
            }

            if (response.data.Plant != null) {
                $scope.Plant = [];
                for (var i = 0; i < response.data.Plant.length; i++) {
                    var plant = { "Id": i, "Name": response.data.Plant[i] };
                    $scope.Plant.push(plant);
                }
            }

        }, function (x) {// Request error 
        });
        // alert($scope.EmpCode);  FetchBusinessGoalsByEmpCode
        $http({ url: '/QCC.Web/BusinessGoals/FetchBusinessGoalsByEmpCode', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
            console.log(response.data.businessGoalResponse);
     //       alert(response.data.businessGoalResponse.length)
            for (i = 0; i < response.data.businessGoalResponse.length; i++) {
              //  alert(response.data.businessGoalResponse[i].Yearly);
              
                    //alert(response.data.businessGoalResponse[i].Yearly);
                    $("#yearsList").append('<option value="' + response.data.businessGoalResponse[i].Yearly+ '">' + response.data.businessGoalResponse[i].Yearly+ '</option>');
                
            }
        });
        $http({ url: '/QCC.Web/TeamRegistration/FetchEmployeeDetailsByLevel', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
           // console.log(response)
            // Request completed successfully
            if (response.data.empCode != null) {
                $scope.EmpCode = response.data.empCode;
                $scope.EmpName = response.data.empName;
                $scope.Grade = response.data.grade;
                $scope.DepartmentN = response.data.department;
                $scope.EmpMailId = response.data.emailId;
                $scope.Company = response.data.company;
                $scope.Plant = response.data.Plant;
                $scope.BusinessUnit = response.data.businessUnit;
                $scope.userSelect = response.data.department;
                
            }
            else {
                $scope.EmpCode = $scope.EmpName = $scope.Grade = $scope.Department = $scope.EmpMailId = $scope.Company = $scope.Plant = $scope.BusinessUnit = null;
                InIt();
            }
        }, function (x) {
            // Request error
        });
        $http({
            url: '/QCC.Web/BusinessGoals/BusinessGolsGetByEmpCode', method: "GET", params: { empCode: $scope.EmpCode }
        }).then(function (response) {
            // Request completed successfully
            // $scope.BusinessGoals = response.data;
            console.log(response.data);
           
            //alert($scope.TEIYTD);
            console.log(response.data);
            $scope.btnText = "Save Goals";
            $scope.BusinessUnit = response.data.BusinessUnit;
            $scope.Plant = response.data.Plant;
            $("#btntxt").text("Save Goals");
          //  $scope.Company = response.data.Company;
        
        }, function (x) {
            // Request error
        });
    }
    $scope.excuteGraphs = function () {
        var selYEar = $("#yearsList").val();
        $http({
            url: '/QCC.Web/BusinessGoals/BusinessGolsGetByEmpCodeYear', method: "GET", params: { empCode: $scope.EmpCode, yearSelect: selYEar }
        }).then(function (response) {
            //alert(response.data);
            console.log(response.data.businessGoalResponse[0].CirclesYTD);
            CirclesYTD = response.data.businessGoalResponse[0].CirclesYTD;
            ProjectsYTD = response.data.businessGoalResponse[0].ProjectsYTD;
            TEITarget = response.data.businessGoalResponse[0].TEITarget;
            TEIYTD = response.data.businessGoalResponse[0].TEIYTD;
            //alert(response.data.businessGoalResponse[0].CirclesYTD);
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
            //var JsonDataCircle = [];
            //$.each(response.data, function (key, value) {
            //    if (key == "totalcount") {
            //        JsonDataCircle.push('{"Total Count" :"' + key["totalcount"] + '"}');
            //    }
                
            //});
            //console.log(JsonDataCircle);
           // console.log(response.data["totalcount"]);

        });
        $(".containGraph").show();
        getGraphbarList2(selYEar);
        getGraphbarList(); getGraphbarList3($scope.Company, $scope.EmpCode);
        
    };
    $scope.excuteGraphsAwards = function () {
        var selYEar = $("#yearsList").val();
        var depts = $("#depts").val();
        var bussinessUnit = $.trim($("#bussinessUnit").text());
        $http({
            url: '/QCC.Web/ConventionsConclave/FetchNationConventionByAwardsYearGold', method: "GET", params: { BussinessUnit: bussinessUnit, Department: depts, Yearly: selYEar }
        }).then(function (response) {
            //alert(response.data);
            console.log(response.data); 
            console.log(response.data.nationalConventionResponses[0].Gold);
            Gold = response.data.nationalConventionResponses[0].Gold;
         
            $(".progrs1 span").text(Gold);
            //$(".progrs2 span").text(ProjectsYTD);
            $(".progrs3 span").text(Gold);
            //$(".progrs4 span").text(TEIYTD);
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

            //var JsonDataCircle = [];
            //$.each(response.data, function (key, value) {
            //    if (key == "totalcount") {
            //        JsonDataCircle.push('{"Total Count" :"' + key["totalcount"] + '"}');
            //    }

            //});
            //console.log(JsonDataCircle);
            // console.log(response.data["totalcount"]);

        });
        $http({
            url: '/QCC.Web/ConventionsConclave/FetchNationConventionByAwardsYearSilver', method: "GET", params: { BussinessUnit: bussinessUnit, Department: depts, Yearly: selYEar }
        }).then(function (response) {
            //alert(response.data);
            console.log(response.data);
            console.log(response.data.nationalConventionResponses[0].Silver);
            Gold = response.data.nationalConventionResponses[0].Silver;

            //$(".progrs1 span").text(Gold);
            $(".progrs2 span").text(Silver);
            //$(".progrs3 span").text(TEITarget);
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

            //var JsonDataCircle = [];
            //$.each(response.data, function (key, value) {
            //    if (key == "totalcount") {
            //        JsonDataCircle.push('{"Total Count" :"' + key["totalcount"] + '"}');
            //    }

            //});
            //console.log(JsonDataCircle);
            // console.log(response.data["totalcount"]);

        });

    };

    //$scope.excuteGraphsCount = function (value) {
    //   // var selYEar = $("#yearsList").val();

    //    var valsplit = value.split('-');
    //    var valueone = valsplit[0];
    //    var valtwo = valsplit[1];
    //    $http({
    //        url: '/QCC.Web/BusinessGoals/BusinessGolsGetByEmpCodeYear', method: "GET", params: { empCode: $scope.EmpCode, yearSelect1: valueone, yearSelect2: valtwo }
    //    }).then(function (response) {
    //        //alert(response.data);
    //        console.log(response.data);
    //        //var JsonDataCircle = [];
    //        //$.each(response.data, function (key, value) {
    //        //    if (key == "totalcount") {
    //        //        JsonDataCircle.push('{"Total Count" :"' + key["totalcount"] + '"}');
    //        //    }

    //        //});
    //        //console.log(JsonDataCircle);
    //        // console.log(response.data["totalcount"]);

    //    });

    //};

    $scope.logout = function () {
        $http({ url: '/QCC.Web/Login/Logout', method: "GET" }).then(function (response) {
            // Request completed successfully
            window.location.href = '/QCC.Web/Home/Index';
        }, function (x) {
            // Request error
        });
    }
    $scope.Save = function () {
        $scope.BusinessGoals.Emp_Code = $scope.EmpCode;
        $scope.BusinessGoals.Plant = $scope.Plant;
        $scope.BusinessGoals.BusinessUnit = $scope.BusinessUnit;
        $scope.BusinessGoals.Company = $scope.Company;
        $scope.BusinessGoals.EligibleHeadCount = $("#EligibleHeadCount").val(); 
        $scope.BusinessGoals.NoofNewCircles = $("#NoofNewCircles").val(); 
        $scope.BusinessGoals.TEIYTD = $("#TEIYTD").val(); 
       // alert($scope.BusinessGoals.TEIYTD);
        //alert($scope.BusinessGoals.EligibleHeadCount);
       // return false;
        $scope.BusinessGoals.Yearly = $("#datepicker-example11").val() + '-' + $("#datepicker-example12").val();
      //  alert($scope.BusinessGoals.Company);
      //  alert($scope.BusinessGoals.Company);
       // return false;
        $http.post('/QCC.Web/BusinessGoals/BusinessGoalsInsertUpdate', $scope.BusinessGoals).then(function (d) {
            $scope.StatusMessage = "Successfully Updated";
            activateController();

        }, function (error) {

        });
    }
    $scope.TeamRegistration = function () {
        window.location.href = '/QCC.Web/Home/TeamRegistration';
    }
    //$scope.onChange = function () {
    //    var object_by_id = $filter('filter')($scope.PlantRegister, { Id: $scope.selectedItemvalue })[0];
    //    $scope.BusinessUnit = object_by_id.BusinessUnit;
    //}
    $scope.ProjectExecution = function () {
        window.location.href = '/QCC.Web/ProjectDetails/ProjectSelectionSheet';
    }
    $scope.Reports = function () {
        window.location.href = '/QCC.Web/Reports/Reports';
    }
    $scope.CirclePerFacilitator = function () {
        $scope.BusinessGoals.CirclesperFacilitator = ($scope.BusinessGoals.NoofqcTarget / $scope.BusinessGoals.NoofFacilitators);
    }
    

})
function fetchdetailsbGoals(EmpCode, Year) {
    $.ajax({
        url: '/QCC.Web/BusinessGoals/BusinessGolsGetByEmpCodeYTD', method: "GET", data: { empCode: EmpCode, Year: Year },
        success: function (response) {
            // Request completed successfully
            // $scope.BusinessGoals = response.data;

            //alert($scope.TEIYTD);
            //alert(response.BusinessUnit);
            //console.log(response);
            //$scope.btnText = "Save Goals";
            //$scope.BusinessUnit = response.data.BusinessUnit;
            //$scope.Plant = response.data.Plant;
            console.log(response.BusinessUnit);
            if (response.BusinessUnit == null) {

                $.ajax({ url: '/QCC.Web/TeamRegistration/BusinessGoalsAutoFetch', method: "GET", data: { empCode: EmpCode },success:function (resp) {
                    // Request completed successfully
                    console.log("hello");
                    console.log(resp);
                    if (resp != null) {
                       
                        //EligibleHeadCount = response.EligibleHeadCount;
                        //NoOfOldCircles = response.NoofOldCircles;
                        //NoofNewCircles = response.NoofNewCircles;
                        //CirclesYTD = response.NoofCirclesYTD;
                        //NoofqcTarget = response.NoofQcTarget;
                        //TEIYTD = response.TEIYTD;
                        //ProjectsYTD = response.NoofProjectsYTD;
                        //ProjectsTarget = (NoOfOldCircles * 2) + NoofNewCircles;
                        $("#EligibleHeadCount").val(resp.EligibleHeadCount);
                        $("#NoOfOldCircles").val(resp.NoOfOldCircles);
                        $("#NoofNewCircles").val(resp.NoofNewCircles);
                        $("#CirclesYTD").val(resp.CirclesYTD);
                        $("#NoofqcTarget").val(resp.NoofqcTarget);
                        $("#TEIYTD").val(resp.TEIYTD);
                        $("#ProjectsYTD").val(resp.ProjectsYTD);
                        $("#EmployeeHeadCount").val(resp.EmployeeHeadCount);
                        $("#ProjectsTarget").val((resp.NoOfOldCircles * 2) + resp.NoofNewCircles);
                        $("#NoofFacilitators").val("");
                        $("#CirclesperFacilitator").val("");
                        $("#TEITarget").val(""); 
                        $("#btntxt").text("Save Goals");


                    }

                } 
                });
            }
            else {
                //$scope.BusinessUnit = response.data.BusinessUnit;
                //$scope.Plant = response.data.Plant;
                //$scope.BusinessGoals.EligibleHeadCount = response.data.EligibleHeadCount;

                //$scope.BusinessGoals.NoOfOldCircles = response.data.NoofNewCircles;
                //$scope.BusinessGoals.NoofNewCircles = response.data.NoofNewCircles;

                //$scope.BusinessGoals.CirclesYTD = response.data.CirclesYTD;
                //$scope.BusinessGoals.NoofqcTarget = response.data.NoofqcTarget;
                //$scope.BusinessGoals.TEIYTD = response.data.TEIYTD;
                //$scope.BusinessGoals.ProjectsYTD = response.data.ProjectsYTD;
                //$scope.btnText = "Update Goals";
                //var object_by_id = $filter('filter')($scope.PlantRegister, { Plant: $scope.BusinessGoals.Plant })[0];
                //$scope.selectedItemvalue = object_by_id.Id;
                //$scope.BusinessUnit = object_by_id.BusinessUnit;


               // BusinessUnit = response.data.BusinessUnit;
               // Plant = response.data.Plant;
               // EligibleHeadCount = response.data.EligibleHeadCount;

               // NoOfOldCircles = response.data.NoofNewCircles;
               // NoofNewCircles = response.data.NoofNewCircles;

               // CirclesYTD = response.data.CirclesYTD;
               // NoofqcTarget = response.data.NoofqcTarget;
               //TEIYTD = response.data.TEIYTD;
               // ProjectsYTD = response.data.ProjectsYTD;
                
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
                $("#TEITarget").val(response.TEITarget); $("#btntxt").text("Update Goals");
                //var object_by_id = $filter('filter')($scope.PlantRegister, { Plant: $scope.BusinessGoals.Plant })[0];
                //$scope.selectedItemvalue = object_by_id.Id;
                //$scope.BusinessUnit = object_by_id.BusinessUnit;


            }




        }

    });
}
function totclamalksmd(empCode) {
    $.ajax({
        url: "/QCC.Web/BusinessGoals/FetchBusinessGoalsByEmpCode",
        method: "Get",
        data: { empCode: empCode },
        success: function (response) {
            var respopnnser = [];
            $.each(response.businessGoalResponse, function (key, value) {
                respopnnser.push(value.Executed_Year);
            });
            console.log(respopnnser);
       //     aklsjdflsakjd(empCode,respopnnser);
            
        }
    })
}
function aklsjdflsakjd(empCode, respopnnser) {
    var kjsdkfks = [];
    for (i = 0; i <= respopnnser.length; i++) {

        if (respopnnser - 1 == i) {
            //$("#yearsList").append('<option value="' + response.data.businessGoalResponse[i].Executed_Year + '-present' + '">' + response.data.businessGoalResponse[i].Executed_Year + ' - present' + '</option>');
            return false;
        } else {
            console.log(respopnnser[i] + '-' + respopnnser[i + 1]);
            $.ajax({
                url: "/QCC.Web/BusinessGoals/BusinessGolsGetByEmpCodeYear",
                method: "Get",
                data: { empCode: empCode, yearSelect1: respopnnser[i], yearSelect2: respopnnser[i + 1] },
                success: function (response) {
                    //  console.log("elsea");
                    kjsdkfks.push(response);
                    //  console.log(response);
                    //var respopnnser = [];
                    //$.each(response.businessGoalResponse, function (key, value) {
                    //    respopnnser.push(value.Executed_Year);
                    //});
                    //console.log(respopnnser);
                    //aklsjdflsakjd(respopnnser);

                }
            })
        }

        
    }
    console.log("helladam");
    console.log(kjsdkfks);
}
function getGraphbarList() {
    $.ajax({
        url:"/QCC.Web/BusinessGoals/BusinessGolsGetByYearCount",
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
        url: "/QCC.Web/BusinessGoals/BusinessGolsGetByYearCountPlant",
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
        url: "/QCC.Web/BusinessGoals/BusinessGolsGetByYearCountCompany",
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