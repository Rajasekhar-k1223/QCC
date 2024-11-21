var app = angular.module('QCC', ['ui.bootstrap']);

app.factory('Excel', function ($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
        format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
    return {
        tableToExcel: function (tableId, worksheetName) {
            var table = $(tableId),
                ctx = { worksheet: worksheetName, table: table.html() },
                href = uri + base64(format(template, ctx));
            return href;
        }
    };
})

app.controller("ConventionsConclaveController", function ($scope, $http, $filter, Excel, $timeout) {
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/AReQCC';
    }
    $scope.EmpCode = $('#myHiddenempCode').val();
    $scope.RoleID = $('#myHiddenroleId').val();
    $scope.FunctionCodeID = $('#myHiddenfuncCode').val();
    $scope.pageIndex = 1;   // Current page number. First page is 1.-->
    $scope.pageSizeSelected = 1000000000; // Maximum number of items per page.
    $scope.pageSize = 30,
        $scope.currentPage = 1;
    $scope.totalCount = 0;
    $scope.number_of_change = 0;
    $scope.viewby = 10;
    $scope.setItemsPerPage = function (num) {
        $scope.pageSize = num;
        $scope.currentPage = 1; //reset to first page
    }

    //$scope.selectPage = function (page,event) {
    //    alert(page);
    //    if (!scope.isActive(page)) {
    //        scope.currentPage = page;
    //        scope.onSelectPage({ page: page });
    //    }
    //};
    $("#viewby").val("10");
    $(".overallFirstdateSelect,.backgroundBlur").show();
    $("body").css({ "overflow": "hidden" });
    InIt();
    //function selectPage(page, event) {
    //    alert(page); alert(event);
    //}
    function InIt() {
        //if ($scope.RoleID == 5) {
        //    $http({ url: '/AReQCC/TeamRegistration/OveralConventionsFetch', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
        //        // Request completed successfully
        //        console.log("overlal Condition")
        //        console.log(response.data.reportsResponses);
        //        $scope.OveralConventionsResponse = response.data.reportsResponses;
        //        $scope.totalCount = response.data.totalCount;
        //        $http({ url: '/AReQCC/TeamRegistration/InternalConventionsFetch', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
        //            // Request completed successfully
        //            console.log(response.data.internalConventionsResponses);
        //            $scope.InternalConventionsResponse = response.data.internalConventionsResponses;
        //            for (var i = 0; i < response.data.internalConventionsResponses.length; i++) {
        //                //alert(response.data.reportsResponses.TeamId);
        //                //if (response.data.internalConventionsResponses[i]['Id'] == response.data.reportsResponses.TeamId)
        //                $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
        //                $(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
        //            }
        //        });
        //        for (property in response.data.reportsResponses) {
        //            checkEmployeesOvearall(response.data.reportsResponses[property].TeamId, response.data.reportsResponses[property].QCName, (response.data.reportsResponses.length - 1) - property);

        //        }
        //        LoadInternalAwards();
        //    }, function (x) {// Request error 
        //    });
        //} else {
        //    $http({ url: '/AReQCC/TeamRegistration/OveralConventionsFetchLevel', method: "GET", params: { EmpCode: $scope.EmpCode, pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
        //        // Request completed successfully
        //        console.log("overall");
        //        console.log(response);
        //        $(".levelnotAdmin").hide();
        //        $(".levelparentnotAdmin").parent('tr').css({ "background": "#8080804a", "opacity": "0.5" })
        //        $scope.OveralConventionsResponse = response.data.reportsResponses;
        //        $scope.totalCount = response.data.totalCount;
        //        for (property in response.data.reportsResponses) {
        //            checkEmployeesOvearall(response.data.reportsResponses[property].TeamId, response.data.reportsResponses[property].QCName, (response.data.reportsResponses.length-1) - property);
        //        }
        //        LoadInternalAwards();
        //    }, function (x) {// Request error 
        //    });
        //}
    }
    function checkEmployeesOvearall(TeamId, QCName, index) {

        $http({ url: '/AReQCC/TeamRegistration/FetchCircleDetailsByNameConventions', method: "GET", params: { CircleName: QCName, TeamId: TeamId } }).then(function (response) {
            //   console.log(response.data);
            $scope.CircleResponse = response.data;
            var EmpList = [];
            for (var i = 0; i < $scope.CircleResponse.length - 1; i++) {
                //          console.log($scope.CircleResponse[i]);
                //        console.log($scope.CircleResponse[i].EmpName);
                var emp = "<li>" + $scope.CircleResponse[i].EmpCode + " :- " + $scope.CircleResponse[i].EmpName + "</li>";
                EmpList.push(emp);
            }
            console.log(EmpList);
            console.log(TeamId);
            console.log(index);
            $("#employeesList_" + TeamId + '_' + index).html('<ul style="margin-left: 0px;padding-left: 0px;text-align: left;list-style-type: none;width: 200px;">' + EmpList.join("") + '</ul>');
        }, function (x) {
            // Request error
        });
    }
    function LoadInternalAwards() {
        $http({ url: '/AReQCC/TeamRegistration/InternalConventionsAwardsFetch', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.InternalConventionsAwardsResponse = response.data;
        }, function (x) {// Request error 
        });
    }

    $scope.SubmitToInternalConvention = function () {

        //$scope.getTotalInternalProjects = function () {
        $http({ url: '/AReQCC/TeamRegistration/GettotalInternalProject', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.TotalProjectCount = response.data.totalCount;
            //alert("helo")
            //alert($scope.TotalProjectCount);
        }, function (x) {// Request error 
        });
        //}
        //return false;

        setTimeout(function () {
            $scope.OveralConventions = [];
            for (var i = 0; i < $scope.OveralConventionsResponse.length; i++) {
                if ($scope.OveralConventionsResponse[i].Selected) {
                    $(".overconventions_" + $scope.OveralConventionsResponse[i]['Id']).hide();
                    $(".overal_" + $scope.OveralConventionsResponse[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                    //if (i == 0 && parseInt($scope.TotalProjectCount) == 0) {
                    //    Object.assign($scope.OveralConventionsResponse[i], { "Id":1,"ActiveStatus": 1 });
                    //}else {
                    // alert(parseInt(parseInt($scope.TotalProjectCount) + parseInt(i) + parseInt(1)));
                    // alert(parseInt(parseInt($scope.TotalProjectCount) + parseInt(i) + parseInt(1))); 
                    if ($scope.TotalProjectCount > 0) {
                        Object.assign($scope.OveralConventionsResponse[i], { "Id": parseInt(parseInt($scope.TotalProjectCount) + parseInt(i) + parseInt(1)), "ActiveStatus": 1 });
                    } else {
                        Object.assign($scope.OveralConventionsResponse[i], { "Id": parseInt(parseInt($scope.TotalProjectCount + i) + parseInt(1)), "ActiveStatus": 1 });
                    }

                    //}
                    //alert("hello")
                    //alert(parseInt($scope.TotalProjectCount+i));
                    console.log(parseInt($scope.TotalProjectCount + i));
                    $scope.OveralConventions.push($scope.OveralConventionsResponse[i]);
                }
            }
            console.log($scope.OveralConventions);
            // return false;
            if ($scope.OveralConventions.length > 0) {
                $http.post('/AReQCC/TeamRegistration/SaveInternalConventions', $scope.OveralConventions).then(function (d) {
                    $scope.OveralConventions = [];
                    $("#Overal_conventions").hide();
                    $timeout(function () {
                        angular.element('.Internal_conventions').triggerHandler('click');
                    });
                }, function (error) {

                });
            }
        }, 2000)
    }

    $scope.SubmitToChapterConvention = function () {
        $http({ url: '/AReQCC/TeamRegistration/GettotalChapterProject', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.TotalChapterProjectCount = response.data.totalCount;
            // alert($scope.TotalChapterProjectCount)
            //alert($scope.TotalProjectCount);
        }, function (x) {// Request error 
        });
        setTimeout(function () {
            $scope.InternalConventions = [];
            for (var i = 0; i < $scope.InternalConventionsResponse.length; i++) {
                //  console.log($scope.InternalConventionsResponse); return false;
                if ($scope.InternalConventionsResponse[i].Selected) {
                    //  alert($scope.InternalConventionsResponse[i].Yearly);
                    var data = {
                        "Id": $scope.InternalConventionsResponse[i].InternalId,
                        "InternalId": $scope.InternalConventionsResponse[i].InternalId,
                        "Company": $scope.InternalConventionsResponse[i].Company,
                        "BusinessUnit": $scope.InternalConventionsResponse[i].BusinessUnit,
                        "Plant": $scope.InternalConventionsResponse[i].Plant,
                        "Department": $scope.InternalConventionsResponse[i].Department,
                        "QCName": $scope.InternalConventionsResponse[i].QCName,
                        "ProjectTitle": $scope.InternalConventionsResponse[i].ProjectTitle,
                        "FacilitatorName": $scope.InternalConventionsResponse[i].FacilitatorName,
                        "TeamCount": $scope.InternalConventionsResponse[i].TeamCount,
                        "NoOfProjects": $scope.InternalConventionsResponse[i].NoOfProjects,
                        "CostSaving": $scope.InternalConventionsResponse[i].CostSaving,
                        "TeamStatus": $scope.InternalConventionsResponse[i].TeamStatus,
                        "StatusName": $scope.InternalConventionsResponse[i].StatusName,
                        "Awards": $scope.InternalConventionsResponse[i].Awards,
                        "TeamId": $scope.InternalConventionsResponse[i].TeamId,
                        "ActiveStatus": 2,
                        "Score": $scope.InternalConventionsResponse[i].Score,
                        "Yearly": $scope.InternalConventionsResponse[i].Yearly,
                        "$$hashKey": $scope.InternalConventionsResponse[i].$$hashKey,
                        "Selected": $scope.InternalConventionsResponse[i].Selected
                    }
                    $("#Internal_conventions > table").addClass("internalconventiontable")
                    $(".internalconventions_" + $scope.InternalConventionsResponse[i]['Id']).hide();
                    $(".internal_" + $scope.InternalConventionsResponse[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                    $scope.InternalConventions.push(data);
                }
            }
            //console.log($scope.InternalConventions); return false;
            if ($scope.InternalConventions.length > 0) {
                $http.post('/AReQCC/TeamRegistration/SaveInternalConventions', $scope.InternalConventions).then(function (d) {
                    for (var i = 0; i < $scope.InternalConventions.length; i++) {
                        if ($scope.TotalChapterProjectCount > 0) {
                            Object.assign($scope.InternalConventions[i], { "Id": parseInt(parseInt($scope.TotalChapterProjectCount) + parseInt(i) + parseInt(1)), "Awards": null, "ActiveStatus": 1, });
                        } else {
                            Object.assign($scope.InternalConventions[i], { "Id": parseInt(parseInt($scope.TotalChapterProjectCount + i) + parseInt(1)), "Awards": null, "ActiveStatus": 1, });
                        }
                    }
                    // console.log($scope.InternalConventions);return false;
                    $http.post('/AReQCC/TeamRegistration/SaveChapterConventions', $scope.InternalConventions).then(function (d) {
                        $scope.InternalConventions = [];
                        $("#Internal_conventions").hide();
                        $timeout(function () {
                            angular.element('.Chapter_conventions').triggerHandler('click');
                        });
                        // LoadChapterConventions();
                    }, function (error) {

                    });
                }, function (error) {

                });
            }
        }, 2000);

    }
    $scope.SaveToInternalConvention = function () {
        $http({ url: '/AReQCC/TeamRegistration/GettotalInternalProject', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.TotalProjectCount = response.data.totalCount;
            //alert("helo")
            //alert($scope.TotalProjectCount);
        }, function (x) {// Request error 
        });
        //}
        //return false;

        setTimeout(function () {
            $scope.InternalConventions = [];
            for (var i = 0; i < $scope.InternalConventionsResponse.length; i++) {
                if ($scope.InternalConventionsResponse[i].ActiveStatus == 1) {
                    Object.assign($scope.InternalConventionsResponse[i], { "Id": parseInt(parseInt($scope.TotalProjectCount + i) + parseInt(1)) });
                    $scope.InternalConventions.push($scope.InternalConventionsResponse[i]);
                }
            }
            if ($scope.InternalConventions.length > 0) {
                $http.post('/AReQCC/TeamRegistration/SaveInternalConventions', $scope.InternalConventions).then(function (d) {
                    //for (var i = 0; i < $scope.InternalConventions.length; i++) {
                    //    Object.assign($scope.InternalConventions[i], { "Awards": null, "Score": null });
                    //}
                    $(".statuserror").text("successfully Saved").show();
                    setTimeout(function () {
                        $(".statuserror").hide();
                    }, 3000);
                }, function (error) {

                });
            }
        }, 2000);

    }
    $scope.SaveToChapterConvention = function () {
        $http({ url: '/AReQCC/TeamRegistration/GettotalChapterProject', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.TotalChapterProjectCount = response.data.totalCount;
            // alert($scope.TotalChapterProjectCount)
            //alert($scope.TotalProjectCount);
        }, function (x) {// Request error 
        });
        setTimeout(function () {
            $scope.ChapterConventions = [];
            for (var i = 0; i < $scope.ChapterConventionsResponse.length; i++) {
                if ($scope.ChapterConventionsResponse[i].ActiveStatus == 1) {
                    Object.assign($scope.ChapterConventionsResponse[i], { "Id": parseInt(parseInt($scope.TotalChapterProjectCount + i) + parseInt(1)), "Awards": $scope.ChapterConventionsResponse[i].AwardsId });
                    $scope.ChapterConventions.push($scope.ChapterConventionsResponse[i]);
                }
            }
            console.log("chapter  ...")
            // console.log($scope.ChapterConventionsResponse); return false;
            if ($scope.ChapterConventions.length > 0) {
                $http.post('/AReQCC/TeamRegistration/SaveChapterConventions', $scope.ChapterConventions).then(function (d) {
                    //for (var i = 0; i < $scope.InternalConventions.length; i++) {
                    //    Object.assign($scope.InternalConventions[i], { "Awards": null, "Score": null });
                    //}
                    $(".statuserror").text("successfully Saved").show();
                    setTimeout(function () {
                        $(".statuserror").hide();
                    }, 3000);
                }, function (error) {

                });
            }
        }, 2000);
    }
    $scope.SaveToNationalConvention = function () {
        $http({ url: '/AReQCC/TeamRegistration/GettotalNationalProject', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.TotalNationalProjectCount = response.data.totalCount;
            //alert("helo")
            //alert($scope.TotalProjectCount);
        }, function (x) {// Request error 
        });
        setTimeout(function () {
            $scope.NationalConventions = [];
            for (var i = 0; i < $scope.NationalConventionsResponse.length; i++) {
                if ($scope.NationalConventionsResponse[i].ActiveStatus == 1) {
                    Object.assign($scope.NationalConventionsResponse[i], { "Id": parseInt(parseInt($scope.TotalNationalProjectCount + i) + parseInt(1)), "Awards": $scope.NationalConventionsResponse[i].nationalId });
                    $scope.NationalConventions.push($scope.NationalConventionsResponse[i]);
                }
            }
            //console.log($scope.NationalConventions); return false;
            if ($scope.NationalConventions.length > 0) {
                $http.post('/AReQCC/TeamRegistration/SaveNationalConventions', $scope.NationalConventions).then(function (d) {
                    //for (var i = 0; i < $scope.InternalConventions.length; i++) {
                    //    Object.assign($scope.InternalConventions[i], { "Awards": null, "Score": null });
                    //}
                    $(".statuserror").text("successfully Saved").show();
                    setTimeout(function () {
                        $(".statuserror").hide();
                    }, 3000);
                }, function (error) {

                });
            }
        }, 2000);

    }
    $scope.SaveToICQCCConvention = function () {
        $http({ url: '/AReQCC/TeamRegistration/GettotalICQCCProject', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.TotalICQCCProjectCount = response.data.totalCount;
            //alert("helo")
            //alert($scope.TotalProjectCount);
        }, function (x) {// Request error 
        });

        setTimeout(function () {
            $scope.ICQCCConventions = [];
            for (var i = 0; i < $scope.ICQCCConventionsResponse.length; i++) {
                //console.log($scope.ICQCCConventionsResponse[i]);
                if ($scope.ICQCCConventionsResponse[i].ActiveStatus == 1) {
                    Object.assign($scope.ICQCCConventionsResponse[i], { "Id": parseInt(parseInt($scope.TotalICQCCProjectCount + i) + parseInt(1)), "Awards": $scope.ICQCCConventionsResponse[i].ICQCCId });
                    $scope.ICQCCConventions.push($scope.ICQCCConventionsResponse[i]);
                }
            }
            //console.log($scope.ICQCCConventions); return false;
            if ($scope.ICQCCConventions.length > 0) {
                $http.post('/AReQCC/TeamRegistration/SaveICQCCConventions', $scope.ICQCCConventions).then(function (d) {
                    //for (var i = 0; i < $scope.InternalConventions.length; i++) {
                    //    Object.assign($scope.InternalConventions[i], { "Awards": null, "Score": null });
                    //}
                    $(".statuserror").text("successfully Saved").show();
                    setTimeout(function () {
                        $(".statuserror").hide();
                    }, 3000);
                }, function (error) {

                });
            }
        }, 2000);

    }
    $scope.SaveToInterNationalConvention = function () {
        $http({ url: '/AReQCC/TeamRegistration/GettotalInterNationalProject', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.TotalInterNationalProjectCount = response.data.totalCount;
            //alert("helo")
            //alert($scope.TotalProjectCount);
        }, function (x) {// Request error 
        });
        setTimeout(function () {
            $scope.InterNationalConventions = [];
            for (var i = 0; i < $scope.InterNationalConventionsResponse.length; i++) {
                if ($scope.InterNationalConventionsResponse[i].ActiveStatus == 1) {
                    Object.assign($scope.InterNationalConventionsResponse[i], { "Id": parseInt(parseInt($scope.TotalInterNationalProjectCount + i) + parseInt(1)), "Awards": $scope.InterNationalConventionsResponse[i].InternalId });
                    $scope.InterNationalConventions.push($scope.InterNationalConventionsResponse[i]);
                }
            }
            //console.log($scope.InterNationalConventions); return false;
            if ($scope.InterNationalConventions.length > 0) {
                $http.post('/AReQCC/TeamRegistration/SaveInterNationalConventions', $scope.InterNationalConventions).then(function (d) {
                    //for (var i = 0; i < $scope.InternalConventions.length; i++) {
                    //    Object.assign($scope.InternalConventions[i], { "Awards": null, "Score": null });
                    //}
                    $(".statuserror").text("successfully Saved").show();
                    setTimeout(function () {
                        $(".statuserror").hide();
                    }, 3000);
                }, function (error) {

                });
            }
        }, 2000);

    }
    function LoadChapterConventions() {
        if ($scope.RoleID == 5) {
            $http({ url: '/AReQCC/TeamRegistration/GetChapterConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully

                $scope.ChapterConventionsResponse = response.data.chapterConventionResponse;
                // console.log("Chapter ", $scope.ChapterConventionsResponse);
                LoadChapterConventionsAwards();
                for (var i = 0; i < $scope.ChapterConventionsResponse.length; i++) {
                    $scope.ChapterConventionsResponse[i].chapterId = $scope.ChapterConventionsResponse[i].Awards;
                }
                $scope.totalCount = response.data.totalCount;

                $("#Chapter_conventions").show();

                $http({ url: '/AReQCC/TeamRegistration/GetNationalConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                    // Request completed successfully
                    $scope.NationalConventionsResponse = response.data.nationalConventionResponses;
                    // console.log(response.data.nationalConventionResponses)
                    for (var i = 0; i < response.data.nationalConventionResponses.length; i++) {
                        //$(".chapterconventions_" + response.data.nationalConventionResponses[i].Id).hide();
                        //$(".chapter_" + response.data.nationalConventionResponses[i].Id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                        //$(".chapter_" + response.data.nationalConventionResponses[i].Id).attr("disabled", "disabled");
                        var title = response.data.nationalConventionResponses[i].ProjectTitle.replace(/ /g, "-");
                        // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                        //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                        $("." + title).hide();
                        $(".chapter_" + title).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                    }
                });
                for (property in response.data.chapterConventionResponse) {
                    checkEmployeesChapter(response.data.chapterConventionResponse[property].id, response.data.chapterConventionResponse[property].QCName, property);
                }

            }, function (x) {// Request error 
            });
        } else {
            $http({ url: '/AReQCC/TeamRegistration/GetChapterConventionsLevel', method: "GET", params: { EmpCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully
                LoadChapterConventionsAwards();
                $scope.ChapterConventionsResponse = response.data.chapterConventionResponse;
                for (var i = 0; i < $scope.ChapterConventionsResponse.length; i++) {
                    $scope.ChapterConventionsResponse[i].chapterId = $scope.ChapterConventionsResponse[i].Awards
                }
                $scope.totalCount = response.data.totalCount;
                for (property in response.data.chapterConventionResponse) {
                    checkEmployeesChapter(response.data.chapterConventionResponse[property].chapterId, response.data.chapterConventionResponse[property].QCName, property);
                }
                $("#Chapter_conventions").show();
            }, function (x) {// Request error 
            });
        }

    }
    function checkEmployeesChapter(id, QCName, index) {
        $http({ url: '/AReQCC/TeamRegistration/FetchCircleDetailsByNameConventionName', method: "GET", params: { CircleName: QCName } }).then(function (response) {
            $scope.CircleResponse = response.data;
            var EmpList = [];
            for (var i = 0; i < response.data.length - 1; i++) {
                var emp = "<li>" + $scope.CircleResponse[i].EmpCode + " :- " + $scope.CircleResponse[i].EmpName + "</li>";
                EmpList.push(emp);
            }
            var classname = $('table').find(".chapaterConventionTeamMembers_" + id + '_' + index).length
            console.log(".chapaterConventionTeamMembers_" + QCName + '_' + (QCName - 1));
            $(".chapaterConventionTeamMembers_" + QCName + '_' +(QCName-1)).html('<ul style="margin-left: 0px;padding-left: 0px;text-align: left;list-style-type: none;width: 200px;">' + EmpList.join("") + '</ul>');
        }, function (x) {
            // Request error
        });
    }
    function checkEmployeesNation(id, QCName, index) {
        $http({ url: '/AReQCC/TeamRegistration/FetchCircleDetailsByNameConventionName', method: "GET", params: { CircleName: QCName } }).then(function (response) {
            $scope.CircleResponse = response.data;
            var EmpList = [];
            for (var i = 0; i < $scope.CircleResponse.length - 1; i++) {
                var emp = "<li>" + $scope.CircleResponse[i].EmpCode + " :- " + $scope.CircleResponse[i].EmpName + "</li>";
                EmpList.push(emp);
            }
            for (var i = 0; i < $scope.CircleResponse.length; i++) {
                $("#nationConventionTeamMembers_" + QCName + '_' + (QCName-1)).html('<ul style="margin-left: 0px;padding-left: 0px;text-align: left;list-style-type: none;width: 200px;">' + EmpList.join("") + '</ul>');
            }
        }, function (x) {
            // Request error
        });
    }

    function checkEmployeesIcqcc(id, QCName, index) {
        $http({ url: '/AReQCC/TeamRegistration/FetchCircleDetailsByNameConventionName', method: "GET", params: { CircleName: QCName } }).then(function (response) {
            $scope.CircleResponse = response.data;
            var EmpList = [];
            for (var i = 0; i < $scope.CircleResponse.length - 1; i++) {
                var emp = "<li>" + $scope.CircleResponse[i].EmpCode + " :- " + $scope.CircleResponse[i].EmpName + "</li>";
                EmpList.push(emp);
            }
            for (var i = 0; i < $scope.CircleResponse.length; i++) {
                $("#icqccconventionsTeamMembers_" + id + '_' + index).html('<ul style="margin-left: 0px;padding-left: 0px;text-align: left;list-style-type: none;width: 200px;">' + EmpList.join("") + '</ul>');
            }
        }, function (x) {
            // Request error
        });
    }
    function checkEmployeesInternal(id, QCName, index) {
        $http({ url: '/AReQCC/TeamRegistration/FetchCircleDetailsByNameConventionName', method: "GET", params: { CircleName: QCName } }).then(function (response) {
            $scope.CircleResponse = response.data;
            var EmpList = [];
            for (var i = 0; i < $scope.CircleResponse.length - 1; i++) {
                var emp = "<li>" + $scope.CircleResponse[i].EmpCode + " :- " + $scope.CircleResponse[i].EmpName + "</li>";
                EmpList.push(emp);
            }
            for (var i = 0; i < $scope.CircleResponse.length; i++) {
                $("#internationalTeamMembers_" + QCName + '_' + (QCName-1)).html('<ul style="margin-left: 0px;padding-left: 0px;text-align: left;list-style-type: none;width: 200px;">' + EmpList.join("") + '</ul>');
            }
        }, function (x) {
            // Request error
        });
    }
    function LoadChapterConventionsAwards() {
        $http({ url: '/AReQCC/TeamRegistration/ChapterConventionsAwardsFetch', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.ChapterConventionsAwardsResponse = response.data;
        }, function (x) {// Request error 
        });
    }
    $scope.pageChanged = function () {
        LoadChapterConventions();
    };
    $scope.logout = function () {
        $http({ url: '/AReQCC/Login/Logout', method: "GET" }).then(function (response) {
            // Request completed successfully
            window.location.href = '/AReQCC';
        }, function (x) {
            // Request error
        });
    }

    $scope.SubmitToNationalConvention = function () {
        $http({ url: '/AReQCC/TeamRegistration/GettotalNationalProject', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.TotalNationalProjectCount = response.data.totalCount;
            //alert("helo")
            //alert($scope.TotalProjectCount);
        }, function (x) {// Request error 
        });
        setTimeout(function () {
            $scope.ChapterConventions = [];
            //    console.log($scope.ChapterConventionsResponse);
            for (var i = 0; i < $scope.ChapterConventionsResponse.length; i++) {
                if ($scope.ChapterConventionsResponse[i].Selected) {
                    $("#Chapter_conventions > table").addClass("chapterconventiontable")
                    $(".chapterconventions_" + $scope.ChapterConventionsResponse[i]['chapterid']).hide();
                    $(".chapter_" + $scope.ChapterConventionsResponse[i]['chapterid']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                    //  alert($scope.ChapterConventionsResponse[i].Yearly);
                    var data = {
                        "Id": $scope.ChapterConventionsResponse[i].CId,
                        "chapterId": $scope.ChapterConventionsResponse[i].chapterId,
                        "Company": $scope.ChapterConventionsResponse[i].Company,
                        "BusinessUnit": $scope.ChapterConventionsResponse[i].BusinessUnit,
                        "Plant": $scope.ChapterConventionsResponse[i].Plant,
                        "Department": $scope.ChapterConventionsResponse[i].Department,
                        "QCName": $scope.ChapterConventionsResponse[i].QCName,
                        "ProjectTitle": $scope.ChapterConventionsResponse[i].ProjectTitle,
                        "FacilitatorName": $scope.ChapterConventionsResponse[i].FacilitatorName,
                        "TeamCount": $scope.ChapterConventionsResponse[i].TeamCount,
                        "NoOfProjects": $scope.ChapterConventionsResponse[i].NoOfProjects,
                        "CostSaving": $scope.ChapterConventionsResponse[i].CostSaving,
                        "TeamStatus": $scope.ChapterConventionsResponse[i].TeamStatus,
                        "Awards": $scope.ChapterConventionsResponse[i].AwardsId,
                        "Score": $scope.ChapterConventionsResponse[i].Score,
                        "TeamId": $scope.ChapterConventionsResponse[i].TeamId,
                        "Yearly": $scope.ChapterConventionsResponse[i].Year,
                        "ActiveStatus": 2,
                        "StatusName": $scope.ChapterConventionsResponse[i].StatusName,
                        "$$hashKey": $scope.ChapterConventionsResponse[i].$$hashKey,
                        "Selected": $scope.ChapterConventionsResponse[i].Selected
                    }
                    $scope.ChapterConventions.push(data);
                }

            }
            //  console.log($scope.ChapterConventions); return false;
            if ($scope.ChapterConventions.length > 0) {
                $http.post('/AReQCC/TeamRegistration/SaveChapterConventions', $scope.ChapterConventions).then(function (d) {
                    for (var i = 0; i < $scope.ChapterConventions.length; i++) {
                        if ($scope.TotalNationalProjectCount > 0) {
                            Object.assign($scope.ChapterConventions[i], { "Id": parseInt(parseInt($scope.TotalNationalProjectCount) + parseInt(i) + parseInt(1)), "Awards": null, "ActiveStatus": 1, });
                        } else {
                            Object.assign($scope.ChapterConventions[i], { "Id": parseInt(parseInt($scope.TotalNationalProjectCount + i) + parseInt(1)), "Awards": null, "ActiveStatus": 1, });
                        }
                    }
                    $http.post('/AReQCC/TeamRegistration/SaveNationalConventions', $scope.ChapterConventions).then(function (d) {
                        $scope.ChapterConventions = [];
                        $("#Internal_conventions").hide();
                        $("#Chapter_conventions").hide();
                        $timeout(function () {
                            angular.element('.National_conventions').triggerHandler('click');
                        });
                    }, function (error) {

                    });
                }, function (error) {

                });

            }
        }, 2000);
    }
    function LoadNationalConventions() {
        if ($scope.RoleID == 5) {
            $http({ url: '/AReQCC/TeamRegistration/GetNationalConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                console.log("national")
                console.log(response);
                LoadNationalConventionsAwards();
                $scope.NationalConventionsResponse = response.data.nationalConventionResponses;
                console.log(response)
                for (var i = 0; i < $scope.NationalConventionsResponse.length; i++) {
                    $scope.NationalConventionsResponse[i].nationalId = $scope.NationalConventionsResponse[i].Awards
                }
                $scope.totalCount = response.data.totalCount;
                $("#National_conventions").show();
                $http({ url: '/AReQCC/TeamRegistration/GetICQCCConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                    // Request completed successfully
                    LoadICQCCConventionsAwards();
                    $scope.ICQCCConventionsResponse = response.data.iCQCCConventionResponse;
                    for (var i = 0; i < response.data.iCQCCConventionResponse.length; i++) {
                        //$(".nationconventions_" + response.data.iCQCCConventionResponse[i].ICQCCId).hide();
                        //$(".nation_" + response.data.iCQCCConventionResponse[i].ICQCCId).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                        //$(".nation_" + response.data.iCQCCConventionResponse[i].ICQCCId).attr("disabled", "disabled");
                        var title = response.data.iCQCCConventionResponse[i].ProjectTitle.replace(/ /g, "-");
                        // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                        //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                        $("." + title).hide();
                        $(".nation_" + title).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                    }
                });
                for (property in response.data.nationalConventionResponses) {
                    checkEmployeesNation(response.data.nationalConventionResponses[property].Id, response.data.nationalConventionResponses[property].QCName, (response.data.nationalConventionResponses.length - 1) - property);
                }

            }, function (x) {// Request error 
            });
        } else {
            $http({ url: '/AReQCC/TeamRegistration/GetNationalConventionsLevel', method: "GET", params: { EmpCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully
                LoadNationalConventionsAwards();
                $scope.NationalConventionsResponse = response.data.nationalConventionResponses;
                for (var i = 0; i < $scope.NationalConventionsResponse.length; i++) {
                    $scope.NationalConventionsResponse[i].nationalId = $scope.NationalConventionsResponse[i].Awards
                }
                $scope.totalCount = response.data.totalCount;
                $("#National_conventions").show();
                for (property in response.data.nationalConventionResponses) {
                    checkEmployeesNation(response.data.nationalConventionResponses[property].Id, response.data.nationalConventionResponses[property].QCName, (response.data.nationalConventionResponses.length - 1) - property);
                }

            }, function (x) {// Request error 
            });
        }

    }
    function LoadNationalConventionsAwards() {
        $http({ url: '/AReQCC/TeamRegistration/NationalConventionsAwardsFetch', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.NationalConventionsAwardsResponse = response.data;
            console.log($scope.NationalConventionsAwardsResponse);
        }, function (x) {// Request error 
        });
    }
    function LoadICQCCConventions() {
        if ($scope.RoleID == 5) {
            $http({ url: '/AReQCC/TeamRegistration/GetICQCCConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully

                LoadICQCCConventionsAwards();
                console.log(response);
                $scope.ICQCCConventionsResponse = response.data.iCQCCConventionResponse;
                for (var i = 0; i < $scope.ICQCCConventionsResponse.length; i++) {
                    if ($scope.ICQCCConventionsResponse[i].ICQCCId != $scope.ICQCCConventionsResponse[i].Id) {
                        $scope.ICQCCConventionsResponse[i].ICQCCId = $scope.ICQCCConventionsResponse[i].Awards
                    } else {
                        $scope.ICQCCConventionsResponse[i].ICQCCId = $scope.ICQCCConventionsResponse[i].Awards
                    }

                }
                $scope.totalCount = response.data.totalCount;
                $("#ICQCC_conventions").show();
                $http({ url: '/AReQCC/TeamRegistration/GetInterNationalConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                    // Request completed successfully
                    $scope.InterNationalConventionsResponse = response.data.interNationalConvetionsResponses;
                    for (var i = 0; i < response.data.interNationalConvetionsResponses.length; i++) {
                        //$(".icqccconventions_"+response.data.interNationalConvetionsResponses[i].Id).hide();
                        //$(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                        //$(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).attr("disabled", "disabled");
                        var title = response.data.interNationalConventionResponses[i].ProjectTitle.replace(/ /g, "-");
                        // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                        //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                        $("." + title).hide();
                        $(".chapter_" + title).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                    }
                });

                for (property in response.data.iCQCCConventionResponse) {
                    checkEmployeesIcqcc(response.data.iCQCCConventionResponse[property].Id, response.data.iCQCCConventionResponse[property].QCName, (response.data.iCQCCConventionResponse.length - 1) - property);
                }

            }, function (x) {// Request error 
            });
        } else {
            $http({ url: '/AReQCC/TeamRegistration/GetICQCCConventionsLevel', method: "GET", params: { EmpCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully

                LoadICQCCConventionsAwards();
                $scope.ICQCCConventionsResponse = response.data.iCQCCConventionResponse;
                for (var i = 0; i < $scope.ICQCCConventionsResponse.length; i++) {
                    if ($scope.ICQCCConventionsResponse[i].ICQCCId != $scope.ICQCCConventionsResponse[i].Id) {
                        $scope.ICQCCConventionsResponse[i].ICQCCId = $scope.ICQCCConventionsResponse[i].Awards
                    } else {
                        $scope.ICQCCConventionsResponse[i].ICQCCId = $scope.ICQCCConventionsResponse[i].Awards
                    }

                }
                $scope.totalCount = response.data.totalCount;
                $("#ICQCC_conventions").show();
                for (property in response.data.iCQCCConventionResponse) {
                    checkEmployeesIcqcc(response.data.iCQCCConventionResponse[property].Id, response.data.iCQCCConventionResponse[property].QCName, (response.data.iCQCCConventionResponse.length - 1) - property);
                }

            }, function (x) {// Request error 
            });
        }

    }
    function LoadICQCCConventionsAwards() {
        $http({ url: '/AReQCC/TeamRegistration/ICQCCConventionsAwardsFetch', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.ICQCCConventionsAwardsResponse = response.data;
        }, function (x) {// Request error 
        });
    }

    $scope.SubmitToInterNationalConvention = function () {
        $http({ url: '/AReQCC/TeamRegistration/GettotalInterNationalProject', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.TotalInterNationalProjectCount = response.data.totalCount;
            //alert("helo")
            //alert($scope.TotalProjectCount);
        }, function (x) {// Request error 
        });
        setTimeout(function () {
            $scope.InterNationalConventions = [];
            for (var i = 0; i < $scope.ICQCCConventionsResponse.length; i++) {
                if ($scope.ICQCCConventionsResponse[i].Selected) {
                    $("#ICQCC_conventions > table").addClass("icqccconventiontable")
                    $(".icqccconventions_" + $scope.ICQCCConventionsResponse[i]['Id']).hide();
                    $(".icqcc_" + $scope.ICQCCConventionsResponse[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                    Object.assign($scope.ICQCCConventionsResponse[i], { "ActiveStatus": 2, "Awards": $scope.ICQCCConventionsResponse[i].ICQCCId });
                    $scope.InterNationalConventions.push($scope.ICQCCConventionsResponse[i]);
                }
            }

            if ($scope.InterNationalConventions.length > 0) {
                $http.post('/AReQCC/TeamRegistration/SaveICQCCConventions', $scope.InterNationalConventions).then(function (d) {
                    for (var i = 0; i < $scope.InterNationalConventions.length; i++) {
                        if ($scope.TotalInterNationalProjectCount > 0) {
                            Object.assign($scope.InterNationalConventions[i], { "Id": parseInt(parseInt($scope.TotalInterNationalProjectCount) + parseInt(i) + parseInt(1)), "Awards": null, "ActiveStatus": 1, });
                        } else {
                            Object.assign($scope.InterNationalConventions[i], { "Id": parseInt(parseInt($scope.TotalInterNationalProjectCount + i) + parseInt(1)), "Awards": null, "ActiveStatus": 1, });
                        }
                    }
                    $http.post('/AReQCC/TeamRegistration/SaveInterNationalConventions', $scope.InterNationalConventions).then(function (d) {
                        $("#Internal_conventions").hide();
                        $("#Chapter_conventions").hide();
                        $("#National_conventions").hide();
                        $scope.NationalConventions = [];
                        $timeout(function () {
                            angular.element('.Inter_National_conventions').triggerHandler('click');
                        });
                    }, function (error) {

                    });
                }, function (error) {

                });
            }
        }, 2000);
    }

    $scope.SubmitToICQCCConvention = function () {
        $http({ url: '/AReQCC/TeamRegistration/GettotalICQCCProject', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.TotalICQCCProjectCount = response.data.totalCount;
            //alert("helo")
            //alert($scope.TotalProjectCount);
        }, function (x) {// Request error 
        });
        setTimeout(function () {
            $scope.ICQCCConventions = [];
            for (var i = 0; i < $scope.NationalConventionsResponse.length; i++) {
                console.log($scope.NationalConventionsResponse[i]);
                if ($scope.NationalConventionsResponse[i].Selected) {
                    $("#National_conventions > table").addClass("nationalconventiontable")
                    $(".nationconventions_" + $scope.NationalConventionsResponse[i]['nationalId']).hide();
                    $(".nation_" + $scope.NationalConventionsResponse[i]['nationalId']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                    Object.assign($scope.NationalConventionsResponse[i], { 'ActiveStatus': 2, 'Awards': $scope.NationalConventionsResponse[i].nationalId });
                    $scope.ICQCCConventions.push($scope.NationalConventionsResponse[i]);
                }
            }

            // console.log($scope.ICQCCConventions);; return false;
            if ($scope.ICQCCConventions.length > 0) {
                $http.post('/AReQCC/TeamRegistration/SaveNationalConventions', $scope.ICQCCConventions).then(function (d) {
                    for (var i = 0; i < $scope.ICQCCConventions.length; i++) {
                        if ($scope.TotalICQCCProjectCount > 0) {
                            Object.assign($scope.ICQCCConventions[i], { "Id": parseInt(parseInt($scope.TotalICQCCProjectCount) + parseInt(i) + parseInt(1)), "Awards": null, "ActiveStatus": 1, });
                        } else {
                            Object.assign($scope.ICQCCConventions[i], { "Id": parseInt(parseInt($scope.TotalICQCCProjectCount + i) + parseInt(1)), "Awards": null, "ActiveStatus": 1, });
                        }
                    }
                    $http.post('/AReQCC/TeamRegistration/SaveICQCCConventions', $scope.ICQCCConventions).then(function (d) {
                        $("#Internal_conventions").hide();
                        $("#Chapter_conventions").hide();
                        $("#National_conventions").hide();
                        $scope.ICQCCConventions = [];
                        $timeout(function () {
                            angular.element('.ICQCC_conventions').triggerHandler('click');
                        });
                    }, function (error) {

                    });
                }, function (error) {

                });

            }
        }, 2000);
    }
    function checkcondition() {
        $http({ url: '/AReQCC/TeamRegistration/GetInterNationalConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
            // Request completed successfully
            for (var i = 0; i < response.data.interNationalConvetionsResponses.length; i++) {
                if (response.data.interNationalConvetionsResponses[i].Awards != '') {
                    $(".internationalconventions_" + response.data.interNationalConvetionsResponses[i].Id).hide();
                    $(".international_" + response.data.interNationalConvetionsResponses[i].Id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                    $(".international_" + response.data.interNationalConvetionsResponses[i].Id).attr("disabled", "disabled");
                }

            }

        }, function (x) {// Request error 
        });
    }
    function LoadInterNationalConventions() {
        if ($scope.RoleID == 5) {
            $http({ url: '/AReQCC/TeamRegistration/GetInterNationalConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                $scope.InterNationalConventionsResponse = response.data.interNationalConvetionsResponses;
                LoadInterNationalConventionsAwards();
                console.log($scope.InterNationalConventionsResponse);
                for (var i = 0; i < $scope.InterNationalConventionsResponse.length; i++) {
                    $scope.InterNationalConventionsResponse[i].InternalId = $scope.InterNationalConventionsResponse[i].Awards
                }
                $scope.totalCount = response.data.totalCount;

                $("#National_conventions").hide();
                $("#Inter_National_conventions").show();

                for (property in response.data.interNationalConvetionsResponses) {
                    checkEmployeesInternal(response.data.interNationalConvetionsResponses[property].Id, response.data.interNationalConvetionsResponses[property].QCName, (response.data.interNationalConvetionsResponses.length - 1) - property);
                }
                setTimeout(function () {
                    checkcondition();
                }, 2000);

            }, function (x) {// Request error 
            });
        } else {
            $http({ url: '/AReQCC/TeamRegistration/GetInterNationalConventionsLevel', method: "GET", params: { EmpCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully
                $scope.InterNationalConventionsResponse = response.data.interNationalConvetionsResponses;
                LoadInterNationalConventionsAwards();
                for (var i = 0; i < $scope.InterNationalConventionsResponse.length; i++) {
                    $scope.InterNationalConventionsResponse[i].InternalId = $scope.InterNationalConventionsResponse[i].Awards
                }
                $scope.totalCount = response.data.totalCount;

                $("#National_conventions").hide();
                $("#Inter_National_conventions").show();
                for (property in response.data.interNationalConvetionsResponses) {
                    checkEmployeesInternal(response.data.interNationalConvetionsResponses[property].Id, response.data.interNationalConvetionsResponses[property].QCName, (response.data.interNationalConvetionsResponses.length - 1) - property);
                }

            }, function (x) {// Request error 
            });
        }
    }

    function LoadInterNationalConventionsAwards() {
        $http({ url: '/AReQCC/TeamRegistration/InternationalConventionsAwardsFetch', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.InterNationalConventionsAwardsResponse = response.data;
        }, function (x) {// Request error 
        });
    }
    $scope.SubmitInterNationalConvention = function () {
        $scope.InterNationalConventions = [];
        for (var i = 0; i < $scope.InterNationalConventionsResponse.length; i++) {
            $("#Inter_National_conventions > table").addClass("internationalconventiontable")
            //console.log($scope.InterNationalConventionsResponse[i]); return false;
            if ($scope.InterNationalConventionsResponse[i].Selected) {
                //$(".internationalconventions_" + $scope.InterNationalConventionsResponse[i]['InterNatId']).hide();
                //$(".international_" + $scope.InterNationalConventionsResponse[i]['InterNatId']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                var title = $scope.InterNationalConventionsResponse[i].ProjectTitle.replace(/ /g, "-");
                // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                $("." + title).hide();
                $(".international_" + title).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                //alert($scope.InterNationalConventionsResponse[i].Awards); return false;
                var data = {
                    "Id": $scope.InterNationalConventionsResponse[i].InterNatId,
                    "InterNatId": $scope.InterNationalConventionsResponse[i].InterNatId,
                    "Company": $scope.InterNationalConventionsResponse[i].Company,
                    "BusinessUnit": $scope.InterNationalConventionsResponse[i].BusinessUnit,
                    "Plant": $scope.InterNationalConventionsResponse[i].Plant,
                    "Department": $scope.InterNationalConventionsResponse[i].Department,
                    "QCName": $scope.InterNationalConventionsResponse[i].QCName,
                    "ProjectTitle": $scope.InterNationalConventionsResponse[i].ProjectTitle,
                    "FacilitatorName": $scope.InterNationalConventionsResponse[i].FacilitatorName,
                    "TeamCount": $scope.InterNationalConventionsResponse[i].TeamCount,
                    "NoOfProjects": $scope.InterNationalConventionsResponse[i].NoOfProjects,
                    "CostSaving": $scope.InterNationalConventionsResponse[i].CostSaving,
                    "TeamStatus": $scope.InterNationalConventionsResponse[i].TeamStatus,
                    "StatusName": $scope.InterNationalConventionsResponse[i].StatusName,
                    "Awards": $scope.InterNationalConventionsResponse[i].InternalId,
                    "Score": $scope.InterNationalConventionsResponse[i].Score,
                    "TeamId": $scope.InterNationalConventionsResponse[i].TeamId,
                    "Yearly": $scope.InterNationalConventionsResponse[i].Yearly,
                    "ActiveStatus": 2,
                    "$$hashKey": $scope.InterNationalConventionsResponse[i].$$hashKey,
                    "Selected": $scope.InterNationalConventionsResponse[i].Selected
                }

                $scope.InterNationalConventions.push(data);
            }
        }
        //console.log($scope.InterNationalConventions);return false;
        if ($scope.InterNationalConventions.length > 0) {
            $http.post('/AReQCC/TeamRegistration/SaveInterNationalConventions', $scope.InterNationalConventions).then(function (d) {
                $scope.InterNationalConventions = [];
                $(".alert").show();
                setTimeout(function () {
                    $(".alert").hide();
                    $timeout(function () {
                        angular.element('.Inter_National_conventions').triggerHandler('click');
                    });
                }, 2000)
            }, function (error) {

            });
        }
    }
    $scope.myfunction = function (conventiontype, from, to) {
        $scope.fromDate = from;
        $scope.ToDate = to;

        if (conventiontype == 'overall') {
            if ($scope.RoleID == 5) {
                $http({ url: '/AReQCC/TeamRegistration/OveralConventionsFetchByDate', method: "GET", params: { from: from, to: to } }).then(function (response) {
                    // Request completed successfully
                    $scope.OveralConventionsResponse = response.data.reportsResponses;
                    if (response.data.reportsResponses.length > 200) {
                        //  alert(parseInt((response.data.totalCount / 50) * 10))
                        $scope.pageSize = parseInt((response.data.reportsResponses.length / 50) * 10);
                    }
                    $scope.totalCount = response.data.totalCount;
                    LoadInternalAwards();
                    console.log(response.data.reportsResponses);
                    $http({ url: '/AReQCC/TeamRegistration/InternalConventionsFetch', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                        // Request completed successfully
                        $scope.InternalConventionsResponse = response.data.internalConventionsResponses;
                        for (var i = 0; i < response.data.internalConventionsResponses.length; i++) {
                            var title = response.data.internalConventionsResponses[i].ProjectTitle.replace(/ /g, "-");
                            // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                            //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            //alert(response.data.internalConventionsResponses[i].TeamId+"_"+(response.data.internalConventionsResponses[i].TeamId-1))
                            $("._" + response.data.internalConventionsResponses[i].TeamId + "_" + (response.data.internalConventionsResponses[i].TeamId - 1)).hide();
                            //alert(title);
                            $(".overal_" + response.data.internalConventionsResponses[i].TeamId + "_" + (response.data.internalConventionsResponses[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                        }
                    });
                    for (property in response.data.reportsResponses) {
                        checkEmployeesOvearall(response.data.reportsResponses[property].TeamId, response.data.reportsResponses[property].QCName, (response.data.reportsResponses[property].TeamId - 1));
                    }
                    $scope.pageChanged = function () {
                        // console.log('Page changed to: ' + $scope.currentPage);
                        //  alert($scope.currentPage);
                        for (property in response.data.reportsResponses) {
                            console.log(response.data.reportsResponses.length - (30 * ($scope.currentPage - 1)));
                            if (response.data.reportsResponses[property].Id > (30 * ($scope.currentPage - 1))) {
                                console.log(response.data.reportsResponses);

                                checkEmployeesOvearall(response.data.reportsResponses[property].TeamId, response.data.reportsResponses[property].QCName, (response.data.reportsResponses[property].TeamId - 1));
                            }
                        }
                        $http({ url: '/AReQCC/TeamRegistration/InternalConventionsFetch', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                            // Request completed successfully
                            $scope.InternalConventionsResponse = response.data.internalConventionsResponses;
                            for (var i = 0; i < response.data.internalConventionsResponses.length; i++) {
                                var title = response.data.internalConventionsResponses[i].ProjectTitle.replace(/ /g, "-");
                                // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                                //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                //alert(response.data.internalConventionsResponses[i].TeamId+"_"+(response.data.internalConventionsResponses[i].TeamId-1))
                                $("._" + response.data.internalConventionsResponses[i].TeamId + "_" + (response.data.internalConventionsResponses[i].TeamId - 1)).hide();
                                //alert(title);
                                $(".overal_" + response.data.internalConventionsResponses[i].TeamId + "_" + (response.data.internalConventionsResponses[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            }
                        });
                    };
                }, function (x) {// Request error 
                });
            } else {
                $http({ url: '/AReQCC/TeamRegistration/OveralConventionsFetchByDateLevel', method: "GET", params: { EmpCode: $scope.EmpCode, from: from, to: to } }).then(function (response) {
                    // Request completed successfully
                    $scope.OveralConventionsResponse = response.data.reportsResponses;
                    if (response.data.reportsResponses.length > 200) {
                        //  alert(parseInt((response.data.totalCount / 50) * 10))
                        $scope.pageSize = parseInt((response.data.reportsResponses.length / 50) * 10);
                    }
                    $scope.totalCount = response.data.totalCount;
                    LoadInternalAwards();
                    $http({ url: '/AReQCC/TeamRegistration/InternalConventionsFetch', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                        // Request completed successfully
                        console.log(response.data.internalConventionsResponses);
                        $scope.InternalConventionsResponse = response.data.internalConventionsResponses;
                        for (var i = 0; i < response.data.internalConventionsResponses.length; i++) {
                            $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                            $(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                        }
                    });
                    for (property in response.data.reportsResponses) {
                        checkEmployeesOvearall(response.data.reportsResponses[property].TeamId, response.data.reportsResponses[property].QCName, (response.data.reportsResponses[property].TeamId - 1));
                    }
                    $scope.pageChanged = function () {
                        // console.log('Page changed to: ' + $scope.currentPage);
                        //  alert($scope.currentPage);
                        for (property in response.data.reportsResponses) {
                            console.log(response.data.reportsResponses.length - (30 * ($scope.currentPage - 1)));
                            if (response.data.reportsResponses[property].Id > (30 * ($scope.currentPage - 1))) {
                                console.log(response.data.reportsResponses);

                                checkEmployeesOvearall(response.data.reportsResponses[property].TeamId, response.data.reportsResponses[property].QCName, (response.data.reportsResponses[property].TeamId - 1));
                            }
                        }
                    };
                }, function (x) {// Request error 
                });
            }

        } else if (conventiontype == 'internal') {
            if ($scope.RoleID == 5) {
                $http({ url: '/AReQCC/TeamRegistration/InternalConventionsFetchByDate', method: "GET", params: { from: from, to: to } }).then(function (response) {
                    // Request completed successfully
                    $scope.InternalConventionsResponse = response.data.internalConventionsResponses;
                    for (var i = 0; i < $scope.InternalConventionsResponse.length; i++) {
                        $scope.InternalConventionsResponse[i].Id = $scope.InternalConventionsResponse[i].Awards
                    }
                    if (response.data.internalConventionsResponses.length > 200) {
                        //  alert(parseInt((response.data.totalCount / 50) * 10))
                        $scope.pageSize = parseInt((response.data.internalConventionsResponses.length / 50) * 10);
                    }
                    $scope.totalCount = response.data.totalCount;
                    $("#Internal_conventions").show();
                    $http({ url: '/AReQCC/TeamRegistration/GetChapterConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                        // Request completed successfully
                        console.log("chapter console")
                        console.log(response.data.chapterConventionResponse);// return false;
                        LoadChapterConventionsAwards();
                        for (var i = 0; i < response.data.chapterConventionResponse.length; i++) {
                            console.log(response.data.chapterConventionResponse[i].Id);
                            //$(".internalconventions_" + response.data.chapterConventionResponse[i].id).hide();
                            //$(".internal_" + response.data.chapterConventionResponse[i].id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            //$(".internal_" + response.data.chapterConventionResponse[i].id).attr("disabled", "disabled");
                            var title = response.data.chapterConventionResponse[i].ProjectTitle.replace(/ /g, "-");
                            // alert(title);
                            // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                            //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            $("._" + response.data.chapterConventionResponse[i].TeamId + "_" + (response.data.chapterConventionResponse[i].TeamId-1)).hide();
                            $(".internal_" + response.data.chapterConventionResponse[i].TeamId + "_" + (response.data.chapterConventionResponse[i].TeamId-1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            $(".internalTextSel_" + response.data.chapterConventionResponse[i].TeamId + "_" + (response.data.chapterConventionResponse[i].TeamId - 1)).attr("disabled", true);

                        }

                    });
                    for (property in response.data.internalConventionsResponses) {
                        checkEmployees(response.data.internalConventionsResponses[property].ProjectTitle.replace(/ /g, "-"), response.data.internalConventionsResponses[property].TeamId, (response.data.internalConventionsResponses[property].TeamId - 1));

                    }
                    $scope.pageChanged = function () {
                        // console.log('Page changed to: ' + $scope.currentPage);
                        //  alert($scope.currentPage);
                        for (property in response.data.internalConventionsResponses) {
                            // console.log(response.data.reportsResponses.length - (30 * ($scope.currentPage - 1)));
                            if (response.data.internalConventionsResponses.length > (30 * ($scope.currentPage - 1))) {
                                console.log(response.data.internalConventionsResponses[property].Id);

                                checkEmployees(response.data.internalConventionsResponses[property].ProjectTitle.replace(/ /g, "-"), response.data.internalConventionsResponses[property].TeamId, (response.data.internalConventionsResponses[property].TeamId - 1));
                            }
                        }
                        $http({ url: '/AReQCC/TeamRegistration/GetChapterConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                            // Request completed successfully
                            console.log("chapter console")
                            console.log(response.data.chapterConventionResponse);// return false;
                            LoadChapterConventionsAwards();
                            for (var i = 0; i < response.data.chapterConventionResponse.length; i++) {
                                console.log(response.data.chapterConventionResponse[i].Id);
                                //$(".internalconventions_" + response.data.chapterConventionResponse[i].id).hide();
                                //$(".internal_" + response.data.chapterConventionResponse[i].id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                //$(".internal_" + response.data.chapterConventionResponse[i].id).attr("disabled", "disabled");
                                var title = response.data.chapterConventionResponse[i].ProjectTitle.replace(/ /g, "-");
                                // alert(title);
                                // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                                //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $("._" + response.data.chapterConventionResponse[i].TeamId + "_" + (response.data.chapterConventionResponse[i].TeamId - 1)).hide();
                                $(".internal_" + response.data.chapterConventionResponse[i].TeamId + "_" + (response.data.chapterConventionResponse[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $(".internalTextSel_" + response.data.chapterConventionResponse[i].TeamId + "_" + (response.data.chapterConventionResponse[i].TeamId - 1)).attr("disabled", true);

                            }

                        });
                    };
                }, function (x) {// Request error 
                });
            } else {
                $http({ url: '/AReQCC/TeamRegistration/InternalConventionsFetchByDateLevel', method: "GET", params: { EmpCode: $scope.EmpCode, from: from, to: to } }).then(function (response) {
                    // Request completed successfully
                    $scope.InternalConventionsResponse = response.data.internalConventionsResponses;
                    for (var i = 0; i < $scope.InternalConventionsResponse.length; i++) {
                        $scope.InternalConventionsResponse[i].Id = $scope.InternalConventionsResponse[i].Awards
                    }
                    if (response.data.internalConventionsResponses.length > 200) {
                        //  alert(parseInt((response.data.totalCount / 50) * 10))
                        $scope.pageSize = parseInt((response.data.internalConventionsResponses.length / 50) * 10);
                    }
                    $scope.totalCount = response.data.totalCount;
                    $("#Internal_conventions").show();
                    $http({ url: '/AReQCC/TeamRegistration/GetChapterConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                        // Request completed successfully
                        LoadChapterConventionsAwards();
                        for (var i = 0; i < response.data.chapterConventionResponse.length; i++) {
                            //$(".internalconventions_" + response.data.chapterConventionResponse[i].id).hide();
                            //$(".internal_" + response.data.chapterConventionResponse[i].id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            //$(".internal_" + response.data.chapterConventionResponse[i].id).attr("disabled", "disabled");
                            var title = response.data.chapterConventionResponse[i].ProjectTitle.replace(/ /g, "-");
                            // alert(title);
                            // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                            //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            $("." + title).hide();
                            $(".internal_" + response.data.chapterConventionResponse[i].TeamId + "_" + (response.data.chapterConventionResponse[i].TeamId-1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            $(".internal_" + response.data.chapterConventionResponse[i].TeamId + "_" + (response.data.chapterConventionResponse[i].TeamId - 1)).attr("disabled", true);
                        }

                    });
                    for (property in response.data.internalConventionsResponses) {

                        checkEmployees(response.data.internalConventionsResponses[property].ProjectTitle.replace(/ /g, "-"), response.data.internalConventionsResponses[property].TeamId, (response.data.internalConventionsResponses[property].TeamId - 1));

                    }
                    $scope.pageChanged = function () {
                        // console.log('Page changed to: ' + $scope.currentPage);
                        //  alert($scope.currentPage);
                        for (property in response.data.internalConventionsResponses) {
                            // console.log(response.data.reportsResponses.length - (30 * ($scope.currentPage - 1)));
                            if (response.data.internalConventionsResponses.length > (30 * ($scope.currentPage - 1))) {
                                console.log(response.data.internalConventionsResponses[property].Id);

                                checkEmployees(response.data.internalConventionsResponses[property].ProjectTitle.replace(/ /g, "-"), response.data.internalConventionsResponses[property].TeamId, (response.data.internalConventionsResponses[property].TeamId - 1));
                            }
                        }
                        $http({ url: '/AReQCC/TeamRegistration/GetChapterConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                            // Request completed successfully
                            console.log("chapter console")
                            console.log(response.data.chapterConventionResponse);// return false;
                            LoadChapterConventionsAwards();
                            for (var i = 0; i < response.data.chapterConventionResponse.length; i++) {
                                console.log(response.data.chapterConventionResponse[i].Id);
                                //$(".internalconventions_" + response.data.chapterConventionResponse[i].id).hide();
                                //$(".internal_" + response.data.chapterConventionResponse[i].id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                //$(".internal_" + response.data.chapterConventionResponse[i].id).attr("disabled", "disabled");
                                var title = response.data.chapterConventionResponse[i].ProjectTitle.replace(/ /g, "-");
                                // alert(title);
                                // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                                //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $("._" + response.data.chapterConventionResponse[i].TeamId + "_" + (response.data.chapterConventionResponse[i].TeamId - 1)).hide();
                                $(".internal_" + response.data.chapterConventionResponse[i].TeamId + "_" + (response.data.chapterConventionResponse[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $(".internalTextSel_" + response.data.chapterConventionResponse[i].TeamId + "_" + (response.data.chapterConventionResponse[i].TeamId - 1)).attr("disabled", true);

                            }

                        });
                    }
                }, function (x) {// Request error 
                });
            }

        } else if (conventiontype == 'chapter') {
            if ($scope.RoleID == 5) {
                $http({ url: '/AReQCC/TeamRegistration/GetChapterConventionsByDate', method: "GET", params: { from: from, to: to } }).then(function (response) {
                    // Request completed successfully
                    console.log("ChapterConventions");
                    console.log(response.data.chapterConventionResponse[1].Yearly);
                    console.log(response.data.chapterConventionResponse)
                    LoadChapterConventionsAwards();
                    $scope.ChapterConventionsResponseGet = response.data.chapterConventionResponse;
                    for (var i = 0; i < response.data.chapterConventionResponse.length; i++) {
                        // alert(response.data.chapterConventionResponse[i].Id);
                        Object.assign($scope.ChapterConventionsResponseGet[i], { "CId": response.data.chapterConventionResponse[i].Id, "AwardsId": "" });
                    }
                    $scope.ChapterConventionsResponse = $scope.ChapterConventionsResponseGet;

                    console.log($scope.ChapterConventionsResponse); console.log("hello")
                    for (var i = 0; i < $scope.ChapterConventionsResponse.length; i++) {
                        //if ($scope.ChapterConventionsResponse[i].Awards == '') {
                        //    //$scope.ChapterConventionsResponse[i].Id = $scope.ChapterConventionsResponse[i].Awards
                        //    $scope.ChapterConventionsResponse[i].Id = '';
                        //}
                        //if ($scope.ChapterConventionsResponse[i].Awards != '') {
                        $scope.ChapterConventionsResponse[i].AwardsId = $scope.ChapterConventionsResponse[i].Awards
                        //$scope.ChapterConventionsResponse[i].Id = '';
                        //}
                        //if ($scope.ChapterConventionsResponse[i].Id == '')
                        //{
                        //    $scope.ChapterConventionsResponse[i].chapterId = $scope.ChapterConventionsResponse[i].Awards
                        //}
                        //if ($scope.ChapterConventionsResponse[i].Id != '' || $scope.ChapterConventionsResponse[i].chapterId != '') {
                        //    $scope.ChapterConventionsResponse[i].Id = $scope.ChapterConventionsResponse[i].Awards;
                        //}

                    }
                    $scope.totalCount = response.data.totalCount;
                    if (response.data.chapterConventionResponse.length > 200) {
                        //  alert(parseInt((response.data.totalCount / 50) * 10))
                        $scope.pageSize = parseInt((response.data.chapterConventionResponse.length / 50) * 10);
                    }
                    $("#Chapter_conventions").show();
                    $http({ url: '/AReQCC/TeamRegistration/GetNationalConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                        // Request completed successfully
                        $scope.NationalConventionsResponse = response.data.nationalConventionResponses;
                        for (var i = 0; i < response.data.nationalConventionResponses.length; i++) {
                            //$(".chapterconventions_" + response.data.nationalConventionResponses[i].Id).hide();
                            //$(".chapter_" + response.data.nationalConventionResponses[i].Id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            //$(".chapter_" + response.data.nationalConventionResponses[i].Id).attr("disabled", "disabled");
                            var title = response.data.nationalConventionResponses[i].ProjectTitle.replace(/ /g, "-");
                            // alert(title);
                            // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                            //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            $("._" + response.data.nationalConventionResponses[i].TeamId + "_" + (response.data.nationalConventionResponses[i].TeamId-1)).hide();
                            $(".chapter_" + response.data.nationalConventionResponses[i].TeamId + "_" + (response.data.nationalConventionResponses[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            $(".chapter_" + response.data.nationalConventionResponses[i].TeamId + "_" + (response.data.nationalConventionResponses[i].TeamId - 1)).attr("disabled", true);
                        }
                    });
                    for (var i = response.data.chapterConventionResponse.length - 1; i >= 0; i--) {
                        checkEmployeesChapter(response.data.chapterConventionResponse[i].chapterId, response.data.chapterConventionResponse[i].TeamId, (response.data.chapterConventionResponse[i].chapterId - 1));
                    }
                    $scope.pageChanged = function () {
                        // console.log('Page changed to: ' + $scope.currentPage);
                        //  alert($scope.currentPage);
                        //for (property in response.data.reportsResponses) {
                        for (var i = response.data.chapterConventionResponse.length - 1; i >= 0; i--) {
                            console.log(response.data.chapterConventionResponse.length - (30 * ($scope.currentPage - 1)));
                            if (response.data.chapterConventionResponse[i].length > (30 * ($scope.currentPage - 1))) {
                                console.log(response.data.chapterConventionResponse);

                                checkEmployeesChapter(response.data.chapterConventionResponse[i].chapterId, response.data.chapterConventionResponse[i].TeamId, (response.data.chapterConventionResponse[i].chapterId - 1));
                            } else {
                                checkEmployeesChapter(response.data.chapterConventionResponse[i].chapterId, response.data.chapterConventionResponse[i].TeamId, (response.data.chapterConventionResponse[i].chapterId - 1));
                            }
                        }
                        $http({ url: '/AReQCC/TeamRegistration/GetNationalConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                            // Request completed successfully
                            $scope.NationalConventionsResponse = response.data.nationalConventionResponses;
                            for (var i = 0; i < response.data.nationalConventionResponses.length; i++) {
                                //$(".chapterconventions_" + response.data.nationalConventionResponses[i].Id).hide();
                                //$(".chapter_" + response.data.nationalConventionResponses[i].Id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                //$(".chapter_" + response.data.nationalConventionResponses[i].Id).attr("disabled", "disabled");
                                var title = response.data.nationalConventionResponses[i].ProjectTitle.replace(/ /g, "-");
                                // alert(title);
                                // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                                //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $("._" + response.data.nationalConventionResponses[i].TeamId + "_" + (response.data.nationalConventionResponses[i].TeamId - 1)).hide();
                                $(".chapter_" + response.data.nationalConventionResponses[i].TeamId + "_" + (response.data.nationalConventionResponses[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $(".chapter_" + response.data.nationalConventionResponses[i].TeamId + "_" + (response.data.nationalConventionResponses[i].TeamId - 1)).attr("disabled", true);
                            }
                        });
                    };
                }, function (x) {// Request error 
                });
            } else {
                $http({ url: '/AReQCC/TeamRegistration/GetChapterConventionsByDateLevel', method: "GET", params: { EmpCode: $scope.EmpCode, from: from, to: to } }).then(function (response) {
                    // Request completed successfully
                    LoadChapterConventionsAwards();
                    $scope.ChapterConventionsResponse = response.data.chapterConventionResponse;
                    $scope.ChapterConventionsResponseGet = response.data.chapterConventionResponse;
                    for (var i = 0; i < response.data.chapterConventionResponse.length; i++) {
                        // alert(response.data.chapterConventionResponse[i].Id);
                        Object.assign($scope.ChapterConventionsResponseGet[i], { "CId": response.data.chapterConventionResponse[i].Id, "AwardsId": "" });
                    }
                    $scope.ChapterConventionsResponse = $scope.ChapterConventionsResponseGet;
                    for (var i = 0; i < $scope.ChapterConventionsResponse.length; i++) {
                        $scope.ChapterConventionsResponse[i].AwardsId = $scope.ChapterConventionsResponse[i].Awards
                    }
                    if (response.data.chapterConventionResponse.length > 200) {
                        //  alert(parseInt((response.data.totalCount / 50) * 10))
                        $scope.pageSize = parseInt((response.data.chapterConventionResponse.length / 50) * 10);
                    }
                    $scope.totalCount = response.data.totalCount;

                    $("#Chapter_conventions").show();
                    $http({ url: '/AReQCC/TeamRegistration/GetNationalConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                        // Request completed successfully
                        $scope.NationalConventionsResponse = response.data.nationalConventionResponses;
                        for (var i = 0; i < response.data.nationalConventionResponses.length; i++) {
                            var title = response.data.nationalConventionResponses[i].ProjectTitle.replace(/ /g, "-");
                            $("." + title).hide();
                            $(".chapter_" + title).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            $(".chapter_" + response.data.nationalConventionResponses[i].Id).attr("disabled", true);
                        }
                    });
                    console.log($scope.ChapterConventionsResponse);
                    for (var i = response.data.chapterConventionResponse.length - 1; i >= 0; i--) {
                        checkEmployeesChapter(response.data.chapterConventionResponse[i].chapterId, response.data.chapterConventionResponse[i].TeamId, (response.data.chapterConventionResponse[i].chapterId - 1));
                    }
                    $scope.pageChanged = function () {
                        // console.log('Page changed to: ' + $scope.currentPage);
                        //  alert($scope.currentPage);
                        //for (property in response.data.reportsResponses) {
                        for (var i = response.data.chapterConventionResponse.length - 1; i >= 0; i--) {
                            console.log(response.data.chapterConventionResponse.length - (30 * ($scope.currentPage - 1)));
                            if (response.data.chapterConventionResponse[i].length > (30 * ($scope.currentPage - 1))) {
                                console.log(response.data.chapterConventionResponse);

                                checkEmployeesChapter(response.data.chapterConventionResponse[i].chapterId, response.data.chapterConventionResponse[i].TeamId, (response.data.chapterConventionResponse[i].chapterId - 1));
                            } else {
                                checkEmployeesChapter(response.data.chapterConventionResponse[i].chapterId, response.data.chapterConventionResponse[i].TeamId, (response.data.chapterConventionResponse[i].chapterId - 1));
                            }
                        }
                        $http({ url: '/AReQCC/TeamRegistration/GetNationalConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                            // Request completed successfully
                            $scope.NationalConventionsResponse = response.data.nationalConventionResponses;
                            for (var i = 0; i < response.data.nationalConventionResponses.length; i++) {
                                //$(".chapterconventions_" + response.data.nationalConventionResponses[i].Id).hide();
                                //$(".chapter_" + response.data.nationalConventionResponses[i].Id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                //$(".chapter_" + response.data.nationalConventionResponses[i].Id).attr("disabled", "disabled");
                                var title = response.data.nationalConventionResponses[i].ProjectTitle.replace(/ /g, "-");
                                // alert(title);
                                // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                                //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $("._" + response.data.nationalConventionResponses[i].TeamId + "_" + (response.data.nationalConventionResponses[i].TeamId - 1)).hide();
                                $(".chapter_" + response.data.nationalConventionResponses[i].TeamId + "_" + (response.data.nationalConventionResponses[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $(".chapter_" + response.data.nationalConventionResponses[i].TeamId + "_" + (response.data.nationalConventionResponses[i].TeamId - 1)).attr("disabled", true);
                            }
                        });
                    };
                }, function (x) {// Request error 
                });
            }

        } else if (conventiontype == 'nation') {
            if ($scope.RoleID == 5) {
                $http({ url: '/AReQCC/TeamRegistration/GetNationalConventionsByDate', method: "GET", params: { from: from, to: to } }).then(function (response) {
                    // Request completed successfully
                    LoadNationalConventionsAwards();
                    $scope.NationalConventionsResponse = response.data.nationalConventionResponses;
                    for (var i = 0; i < $scope.NationalConventionsResponse.length; i++) {
                        $scope.NationalConventionsResponse[i].nationalId = $scope.NationalConventionsResponse[i].Awards
                    }
                    $scope.totalCount = response.data.totalCount;
                    if (response.data.nationalConventionResponses.length > 200) {
                        //  alert(parseInt((response.data.totalCount / 50) * 10))
                        $scope.pageSize = parseInt((response.data.nationalConventionResponses.length / 50) * 10);
            }
                    $("#National_conventions").show();
                    $http({ url: '/AReQCC/TeamRegistration/GetICQCCConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                        // Request completed successfully

                        LoadICQCCConventionsAwards();
                        $scope.ICQCCConventionsResponse = response.data.iCQCCConventionResponse;
                        for (var i = 0; i < response.data.iCQCCConventionResponse.length; i++) {
                            //$(".nationconventions_" + response.data.iCQCCConventionResponse[i].ICQCCId).hide();
                            //$(".nation_" + response.data.iCQCCConventionResponse[i].ICQCCId).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            //$(".nation_" + response.data.iCQCCConventionResponse[i].ICQCCId).attr("disabled", "disabled");
                            var title = response.data.iCQCCConventionResponse[i].ProjectTitle.replace(/ /g, "-");
                            // alert(title);
                            // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                            //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            $("._" + response.data.iCQCCConventionResponse[i].TeamId + "_" + (response.data.iCQCCConventionResponse[i].TeamId-1)).hide();
                            $(".nation_" + response.data.iCQCCConventionResponse[i].TeamId + "_" + (response.data.iCQCCConventionResponse[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            $(".nation_" + response.data.iCQCCConventionResponse[i].TeamId + "_" + (response.data.iCQCCConventionResponse[i].TeamId - 1)).attr("disabled", true);
                        }

                    });
                    for (property in response.data.nationalConventionResponses) {
                        checkEmployeesNation(response.data.nationalConventionResponses[property].Id, response.data.nationalConventionResponses[property].TeamId, (response.data.nationalConventionResponses[property].Id - 1));
                    }
                    $scope.pageChanged = function () {
                        // console.log('Page changed to: ' + $scope.currentPage);
                        //  alert($scope.currentPage);
                        for (property in response.data.nationalConventionResponses) {
                            console.log(response.data.nationalConventionResponses.length - (30 * ($scope.currentPage - 1)));
                            if (response.data.nationalConventionResponses[property].Id > (30 * ($scope.currentPage - 1))) {
                                console.log(response.data.nationalConventionResponses);

                                checkEmployeesNation(response.data.nationalConventionResponses[property].Id, response.data.nationalConventionResponses[property].TeamId, (response.data.nationalConventionResponses[property].Id - 1));
                            }
                        }
                        $http({ url: '/AReQCC/TeamRegistration/GetICQCCConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                            // Request completed successfully

                            LoadICQCCConventionsAwards();
                            $scope.ICQCCConventionsResponse = response.data.iCQCCConventionResponse;
                            for (var i = 0; i < response.data.iCQCCConventionResponse.length; i++) {
                                //$(".nationconventions_" + response.data.iCQCCConventionResponse[i].ICQCCId).hide();
                                //$(".nation_" + response.data.iCQCCConventionResponse[i].ICQCCId).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                //$(".nation_" + response.data.iCQCCConventionResponse[i].ICQCCId).attr("disabled", "disabled");
                                var title = response.data.iCQCCConventionResponse[i].ProjectTitle.replace(/ /g, "-");
                                // alert(title);
                                // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                                //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $("._" + response.data.iCQCCConventionResponse[i].TeamId + "_" + (response.data.iCQCCConventionResponse[i].TeamId - 1)).hide();
                                $(".nation_" + response.data.iCQCCConventionResponse[i].TeamId + "_" + (response.data.iCQCCConventionResponse[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $(".nation_" + response.data.iCQCCConventionResponse[i].TeamId + "_" + (response.data.iCQCCConventionResponse[i].TeamId - 1)).attr("disabled", true);
                            }

                        });
                    };
                }, function (x) {// Request error 
                });
            } else {
                $http({ url: '/AReQCC/TeamRegistration/GetNationalConventionsByDateLevel', method: "GET", params: { EmpCode: $scope.EmpCode, from: from, to: to } }).then(function (response) {
                    // Request completed successfully
                    LoadNationalConventionsAwards();
                    $scope.NationalConventionsResponse = response.data.nationalConventionResponses;
                    for (var i = 0; i < $scope.NationalConventionsResponse.length; i++) {
                        $scope.NationalConventionsResponse[i].nationalId = $scope.NationalConventionsResponse[i].Awards
                    }
                    $scope.totalCount = response.data.totalCount;
                    if (response.data.nationalConventionResponses.length > 200) {
                        //  alert(parseInt((response.data.totalCount / 50) * 10))
                        $scope.pageSize = parseInt((response.data.nationalConventionResponses.length / 50) * 10);
}
                    $("#National_conventions").show();
                    $http({ url: '/AReQCC/TeamRegistration/GetICQCCConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                        // Request completed successfully

                        LoadICQCCConventionsAwards();
                        $scope.ICQCCConventionsResponse = response.data.iCQCCConventionResponse;
                        for (var i = 0; i < response.data.iCQCCConventionResponse.length; i++) {
                            //$(".nationconventions_" + response.data.iCQCCConventionResponse[i].ICQCCId).hide();
                            //$(".nation_" + response.data.iCQCCConventionResponse[i].ICQCCId).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            //$(".nation_" + response.data.iCQCCConventionResponse[i].ICQCCId).attr("disabled", "disabled");
                            var title = response.data.iCQCCConventionResponse[i].ProjectTitle.replace(/ /g, "-");
                            // alert(title);
                            // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                            //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            $("._" + response.data.iCQCCConventionResponse[i].TeamId + "_" + (response.data.iCQCCConventionResponse[i].TeamId - 1)).hide();
                            $(".nation_" + response.data.iCQCCConventionResponse[i].TeamId + "_" + (response.data.iCQCCConventionResponse[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            $(".nation_" + response.data.iCQCCConventionResponse[i].TeamId + "_" + (response.data.iCQCCConventionResponse[i].TeamId - 1)).attr("disabled", true);
                        }

                    });
                    for (property in response.data.nationalConventionResponses) {
                        checkEmployeesNation(response.data.nationalConventionResponses[property].Id, response.data.nationalConventionResponses[property].TeamId, (response.data.nationalConventionResponses[property].Id - 1));
                    }
                    $scope.pageChanged = function () {
                        // console.log('Page changed to: ' + $scope.currentPage);
                        //  alert($scope.currentPage);
                        for (property in response.data.nationalConventionResponses) {
                            console.log(response.data.nationalConventionResponses.length - (30 * ($scope.currentPage - 1)));
                            if (response.data.nationalConventionResponses[property].Id > (30 * ($scope.currentPage - 1))) {
                                console.log(response.data.nationalConventionResponses);

                                checkEmployeesNation(response.data.nationalConventionResponses[property].Id, response.data.nationalConventionResponses[property].TeamId, (response.data.nationalConventionResponses[property].Id - 1));
                            }
                        }
                        $http({ url: '/AReQCC/TeamRegistration/GetICQCCConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                            // Request completed successfully

                            LoadICQCCConventionsAwards();
                            $scope.ICQCCConventionsResponse = response.data.iCQCCConventionResponse;
                            for (var i = 0; i < response.data.iCQCCConventionResponse.length; i++) {
                                //$(".nationconventions_" + response.data.iCQCCConventionResponse[i].ICQCCId).hide();
                                //$(".nation_" + response.data.iCQCCConventionResponse[i].ICQCCId).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                //$(".nation_" + response.data.iCQCCConventionResponse[i].ICQCCId).attr("disabled", "disabled");
                                var title = response.data.iCQCCConventionResponse[i].ProjectTitle.replace(/ /g, "-");
                                // alert(title);
                                // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                                //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $("._" + response.data.iCQCCConventionResponse[i].TeamId + "_" + (response.data.iCQCCConventionResponse[i].TeamId - 1)).hide();
                                $(".nation_" + response.data.iCQCCConventionResponse[i].TeamId + "_" + (response.data.iCQCCConventionResponse[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $(".nation_" + response.data.iCQCCConventionResponse[i].TeamId + "_" + (response.data.iCQCCConventionResponse[i].TeamId - 1)).attr("disabled", true);
                            }

                        });
                    };
                }, function (x) {// Request error 
                });
            }

        } else if (conventiontype == 'icqcc') {
            if ($scope.RoleID == 5) {
                $http({ url: '/AReQCC/TeamRegistration/GetICQCCConventionsByDate', method: "GET", params: { from: from, to: to } }).then(function (response) {
                    // Request completed successfully
                    LoadICQCCConventionsAwards();
                    $scope.ICQCCConventionsResponse = response.data.iCQCCConventionResponse;
                    for (var i = 0; i < $scope.ICQCCConventionsResponse.length; i++) {
                        if ($scope.ICQCCConventionsResponse[i].ICQCCId != $scope.ICQCCConventionsResponse[i].Id) {
                            $scope.ICQCCConventionsResponse[i].ICQCCId = $scope.ICQCCConventionsResponse[i].Awards
                        } else {
                            $scope.ICQCCConventionsResponse[i].ICQCCId = $scope.ICQCCConventionsResponse[i].Awards
                        }

                    }
                    if (response.data.iCQCCConventionResponse.length > 200) {
                        //  alert(parseInt((response.data.totalCount / 50) * 10))
                        $scope.pageSize = parseInt((response.data.iCQCCConventionResponse.length / 50) * 10);
            }
                    $scope.totalCount = response.data.totalCount;
                    $("#ICQCC_conventions").show();
                    $http({ url: '/AReQCC/TeamRegistration/GetInterNationalConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                        // Request completed successfully
                        $scope.InterNationalConventionsResponse = response.data.interNationalConvetionsResponses;
                        for (var i = 0; i < response.data.interNationalConvetionsResponses.length; i++) {
                            //$(".icqccconventions_" + response.data.interNationalConvetionsResponses[i].Id).hide();
                            //$(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            //$(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).attr("disabled", "disabled");
                            var title = response.data.interNationalConvetionsResponses[i].ProjectTitle.replace(/ /g, "-");
                            // alert(title);
                            // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                            //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            $("._" + response.data.interNationalConvetionsResponses[i].TeamId + "_" + (response.data.interNationalConvetionsResponses[i].TeamId-1)).hide();
                            $(".icqcc_" + response.data.interNationalConvetionsResponses[i].TeamId + "_" + (response.data.interNationalConvetionsResponses[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            $(".icqcc_" + response.data.interNationalConvetionsResponses[i].TeamId + "_" + (response.data.interNationalConvetionsResponses[i].TeamId - 1)).attr("disabled", true);
                        }
                    });

                    for (property in response.data.iCQCCConventionResponse) {
                        checkEmployeesIcqcc(response.data.iCQCCConventionResponse[property].Id, response.data.iCQCCConventionResponse[property].TeamId, (response.data.iCQCCConventionResponse[property].Id - 1));
                    }
                    $scope.pageChanged = function () {
                        // console.log('Page changed to: ' + $scope.currentPage);
                        //  alert($scope.currentPage);
                        for (property in response.data.iCQCCConventionResponse) {
                            console.log(response.data.iCQCCConventionResponse.length - (30 * ($scope.currentPage - 1)));
                            if (response.data.iCQCCConventionResponse[property].Id > (30 * ($scope.currentPage - 1))) {
                                console.log(response.data.iCQCCConventionResponse);

                                checkEmployeesIcqcc(response.data.iCQCCConventionResponse[property].Id, response.data.iCQCCConventionResponse[property].TeamId, (response.data.iCQCCConventionResponse[property].Id - 1));
                            }
                        }
                        $http({ url: '/AReQCC/TeamRegistration/GetInterNationalConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                            // Request completed successfully
                            $scope.InterNationalConventionsResponse = response.data.interNationalConvetionsResponses;
                            for (var i = 0; i < response.data.interNationalConvetionsResponses.length; i++) {
                                //$(".icqccconventions_" + response.data.interNationalConvetionsResponses[i].Id).hide();
                                //$(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                //$(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).attr("disabled", "disabled");
                                var title = response.data.interNationalConvetionsResponses[i].ProjectTitle.replace(/ /g, "-");
                                // alert(title);
                                // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                                //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $("._" + response.data.interNationalConvetionsResponses[i].TeamId + "_" + (response.data.interNationalConvetionsResponses[i].TeamId - 1)).hide();
                                $(".icqcc_" + response.data.interNationalConvetionsResponses[i].TeamId + "_" + (response.data.interNationalConvetionsResponses[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $(".icqcc_" + response.data.interNationalConvetionsResponses[i].TeamId + "_" + (response.data.interNationalConvetionsResponses[i].TeamId - 1)).attr("disabled", true);
                            }
                        });
                    };

                }, function (x) {// Request error 
                });
            } else {
                $http({ url: '/AReQCC/TeamRegistration/GetICQCCConventionsByDateLevel', method: "GET", params: { EmpCode: $scope.EmpCode, from: from, to: to } }).then(function (response) {
                    // Request completed successfully
                    LoadICQCCConventionsAwards();
                    $scope.ICQCCConventionsResponse = response.data.iCQCCConventionResponse;
                    for (var i = 0; i < $scope.ICQCCConventionsResponse.length; i++) {
                        if ($scope.ICQCCConventionsResponse[i].ICQCCId != $scope.ICQCCConventionsResponse[i].Id) {
                            $scope.ICQCCConventionsResponse[i].ICQCCId = $scope.ICQCCConventionsResponse[i].Awards
                        } else {
                            $scope.ICQCCConventionsResponse[i].ICQCCId = $scope.ICQCCConventionsResponse[i].Awards
                        }

                    }
                    if (response.data.iCQCCConventionResponse.length > 200) {
                        //  alert(parseInt((response.data.totalCount / 50) * 10))
                        $scope.pageSize = parseInt((response.data.iCQCCConventionResponse.length / 50) * 10);
}
                    $scope.totalCount = response.data.totalCount;
                    $("#ICQCC_conventions").show();
                    $http({ url: '/AReQCC/TeamRegistration/GetInterNationalConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                        // Request completed successfully
                        $scope.InterNationalConventionsResponse = response.data.interNationalConvetionsResponses;
                        for (var i = 0; i < response.data.interNationalConvetionsResponses.length; i++) {
                            //$(".icqccconventions_" + response.data.interNationalConvetionsResponses[i].Id).hide();
                            //$(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            //$(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).attr("disabled", "disabled");
                            var title = response.data.interNationalConvetionsResponses[i].ProjectTitle.replace(/ /g, "-");
                            // alert(title);
                            // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                            //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            $("." + title).hide();
                            $(".icqcc_" + title).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            $(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).attr("disabled", true);
                        }
                    });

                    for (property in response.data.iCQCCConventionResponse) {
                        checkEmployeesIcqcc(response.data.iCQCCConventionResponse[property].Id, response.data.iCQCCConventionResponse[property].TeamId, (response.data.iCQCCConventionResponse[property].Id - 1));
                    }
                    $scope.pageChanged = function () {
                        // console.log('Page changed to: ' + $scope.currentPage);
                        //  alert($scope.currentPage);
                        for (property in response.data.iCQCCConventionResponse) {
                            console.log(response.data.iCQCCConventionResponse.length - (30 * ($scope.currentPage - 1)));
                            if (response.data.iCQCCConventionResponse[property].Id > (30 * ($scope.currentPage - 1))) {
                                console.log(response.data.iCQCCConventionResponse);

                                checkEmployeesIcqcc(response.data.iCQCCConventionResponse[property].Id, response.data.iCQCCConventionResponse[property].TeamId, (response.data.iCQCCConventionResponse[property].Id - 1));
                            }
                        }
                        $http({ url: '/AReQCC/TeamRegistration/GetInterNationalConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                            // Request completed successfully
                            $scope.InterNationalConventionsResponse = response.data.interNationalConvetionsResponses;
                            for (var i = 0; i < response.data.interNationalConvetionsResponses.length; i++) {
                                //$(".icqccconventions_" + response.data.interNationalConvetionsResponses[i].Id).hide();
                                //$(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                //$(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).attr("disabled", "disabled");
                                var title = response.data.interNationalConvetionsResponses[i].ProjectTitle.replace(/ /g, "-");
                                // alert(title);
                                // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                                //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $("._" + response.data.interNationalConvetionsResponses[i].TeamId + "_" + (response.data.interNationalConvetionsResponses[i].TeamId - 1)).hide();
                                $(".icqcc_" + response.data.interNationalConvetionsResponses[i].TeamId + "_" + (response.data.interNationalConvetionsResponses[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $(".icqcc_" + response.data.interNationalConvetionsResponses[i].TeamId + "_" + (response.data.interNationalConvetionsResponses[i].TeamId - 1)).attr("disabled", true);
                            }
                        });
                    };

                }, function (x) {// Request error 
                });
            }

        } else if (conventiontype == 'international') {
            if ($scope.RoleID == 5) {
                $http({ url: '/AReQCC/TeamRegistration/GetInterNationalConventionsByDate', method: "GET", params: { from: from, to: to } }).then(function (response) {
                    // Request completed successfully
                    $scope.InterNationalConventionsResponse = response.data.interNationalConvetionsResponses;
                    LoadInterNationalConventionsAwards();
                    for (var i = 0; i < $scope.InterNationalConventionsResponse.length; i++) {
                        $scope.InterNationalConventionsResponse[i].InternalId = $scope.InterNationalConventionsResponse[i].Awards
                    }
                    if (response.data.interNationalConvetionsResponses.length > 200) {
                        //  alert(parseInt((response.data.totalCount / 50) * 10))
                        $scope.pageSize = parseInt((response.data.interNationalConvetionsResponses.length / 50) * 10);
            }
                    $scope.totalCount = response.data.totalCount;
                    setTimeout(function () {
                        for (var i = 0; i < response.data.interNationalConvetionsResponses.length; i++) {
                            //$(".icqccconventions_" + response.data.interNationalConvetionsResponses[i].Id).hide();
                            //$(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                            //$(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).attr("disabled", "disabled");

                            if ($scope.InterNationalConventionsResponse[i].ActiveStatus == 2) {
                                var title = $scope.InterNationalConventionsResponse[i].ProjectTitle.replace(/ /g, "-");
                                //alert(title);
                                // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                                //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });

                                // alert(title);
                                $("._" + $scope.InterNationalConventionsResponse[i].TeamId + "_" + ($scope.InterNationalConventionsResponse[i].TeamId-1)).hide();
                                $(".international_" + $scope.InterNationalConventionsResponse[i].TeamId + "_" + ($scope.InterNationalConventionsResponse[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                $(".international_" + $scope.InterNationalConventionsResponse[i].TeamId + "_" + ($scope.InterNationalConventionsResponse[i].TeamId - 1)).attr("disabled", true);

                            }
                        }
                    }, 1000);
                    $("#National_conventions").hide();
                    $("#Inter_National_conventions").show();
                    for (property in response.data.interNationalConvetionsResponses) {
                        checkEmployeesInternal(response.data.interNationalConvetionsResponses[property].Id, response.data.interNationalConvetionsResponses[property].TeamId, (response.data.interNationalConvetionsResponses[property].Id - 1));
                    }
                    $scope.pageChanged = function () {
                        // console.log('Page changed to: ' + $scope.currentPage);
                        //  alert($scope.currentPage);
                        for (property in response.data.interNationalConvetionsResponses) {
                            console.log(response.data.interNationalConvetionsResponses.length - (30 * ($scope.currentPage - 1)));
                            if (response.data.interNationalConvetionsResponses[property].Id > (30 * ($scope.currentPage - 1))) {
                                console.log(response.data.interNationalConvetionsResponses);

                                checkEmployeesInternal(response.data.interNationalConvetionsResponses[property].Id, response.data.interNationalConvetionsResponses[property].TeamId, (response.data.interNationalConvetionsResponses[property].Id - 1));
                            }
                        }
                        setTimeout(function () {
                            for (var i = 0; i < response.data.interNationalConvetionsResponses.length; i++) {
                                //$(".icqccconventions_" + response.data.interNationalConvetionsResponses[i].Id).hide();
                                //$(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                //$(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).attr("disabled", "disabled");

                                if ($scope.InterNationalConventionsResponse[i].ActiveStatus == 2) {
                                    var title = $scope.InterNationalConventionsResponse[i].ProjectTitle.replace(/ /g, "-");
                                    //alert(title);
                                    // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                                    //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });

                                    // alert(title);
                                    $("._" + $scope.InterNationalConventionsResponse[i].TeamId + "_" + ($scope.InterNationalConventionsResponse[i].TeamId - 1)).hide();
                                    $(".international_" + $scope.InterNationalConventionsResponse[i].TeamId + "_" + ($scope.InterNationalConventionsResponse[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                    $(".international_" + $scope.InterNationalConventionsResponse[i].TeamId + "_" + ($scope.InterNationalConventionsResponse[i].TeamId - 1)).attr("disabled", true);

                                }
                            }
                        }, 1000);
                    };
                }, function (x) {// Request error 
                });
            } else {
                $http({ url: '/AReQCC/TeamRegistration/GetInterNationalConventionsByDateLevel', method: "GET", params: { EmpCode: $scope.EmpCode, from: from, to: to } }).then(function (response) {
                    // Request completed successfully
                    $scope.InterNationalConventionsResponse = response.data.interNationalConvetionsResponses;
                    LoadInterNationalConventionsAwards();
                    for (var i = 0; i < $scope.InterNationalConventionsResponse.length; i++) {
                        $scope.InterNationalConventionsResponse[i].InternalId = $scope.InterNationalConventionsResponse[i].Awards
                    }
                    if (response.data.interNationalConvetionsResponses.length > 200) {
                        //  alert(parseInt((response.data.totalCount / 50) * 10))
                        $scope.pageSize = parseInt((response.data.interNationalConvetionsResponses.length / 50) * 10);
}
                    $scope.totalCount = response.data.totalCount;

                    $("#National_conventions").hide();
                    $("#Inter_National_conventions").show();
                    for (property in response.data.interNationalConvetionsResponses) {
                        checkEmployeesInternal(response.data.interNationalConvetionsResponses[property].Id, response.data.interNationalConvetionsResponses[property].TeamId, (response.data.interNationalConvetionsResponses[property].Id - 1));
                    }
                    $scope.pageChanged = function () {
                        // console.log('Page changed to: ' + $scope.currentPage);
                        //  alert($scope.currentPage);
                        for (property in response.data.interNationalConvetionsResponses) {
                            console.log(response.data.interNationalConvetionsResponses.length - (30 * ($scope.currentPage - 1)));
                            if (response.data.interNationalConvetionsResponses[property].Id > (30 * ($scope.currentPage - 1))) {
                                console.log(response.data.interNationalConvetionsResponses);

                                checkEmployeesInternal(response.data.interNationalConvetionsResponses[property].Id, response.data.interNationalConvetionsResponses[property].TeamId, (response.data.interNationalConvetionsResponses[property].Id - 1));
                            }
                        }
                        setTimeout(function () {
                            for (var i = 0; i < response.data.interNationalConvetionsResponses.length; i++) {
                                //$(".icqccconventions_" + response.data.interNationalConvetionsResponses[i].Id).hide();
                                //$(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                //$(".icqcc_" + response.data.interNationalConvetionsResponses[i].Id).attr("disabled", "disabled");

                                if ($scope.InterNationalConventionsResponse[i].ActiveStatus == 2) {
                                    var title = $scope.InterNationalConventionsResponse[i].ProjectTitle.replace(/ /g, "-");
                                    //alert(title);
                                    // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                                    //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });

                                    // alert(title);
                                    $("._" + $scope.InterNationalConventionsResponse[i].TeamId + "_" + ($scope.InterNationalConventionsResponse[i].TeamId - 1)).hide();
                                    $(".international_" + $scope.InterNationalConventionsResponse[i].TeamId + "_" + ($scope.InterNationalConventionsResponse[i].TeamId - 1)).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                                    $(".international_" + $scope.InterNationalConventionsResponse[i].TeamId + "_" + ($scope.InterNationalConventionsResponse[i].TeamId - 1)).attr("disabled", true);

                                }
                            }
                        }, 1000);
                    };
                }, function (x) {// Request error 
                });
            }

        }
    };
    $scope.DeleteChapterConvention = function () {
        var strUserIds;

        for (var i = 0; i < $scope.ChapterConventionsResponse.length; i++) {
            if ($scope.ChapterConventionsResponse[i].Selected) {
                //alert($scope.ChapterConventionsResponse[i].Selected)
                //alert()
                if (strUserIds == undefined) {
                    strUserIds = $scope.ChapterConventionsResponse[i].Id;
                }
                else {
                    strUserIds = strUserIds + "," + $scope.ChapterConventionsResponse[i].Id;
                }
            }
        }
        if (strUserIds != undefined) {
            $http({ url: '/AReQCC/TeamRegistration/DeleteChapterConventionsUpdateInternal', method: "GET", params: { strIds: strUserIds } }).then(function (response) {
                $http.post('/AReQCC/TeamRegistration/DeleteChapterConventions', { strIds: strUserIds }).then(function (d) {

                    //$scope.Chapterview();
                    $timeout(function () {
                        angular.element('.Chapter_conventions').trigger('click');
                    }, 1000);
                }, function (error) {

                });
            });
        }
    }
    $scope.DeleteNationalConvention = function () {
        var strUserIds;
        for (var i = 0; i < $scope.NationalConventionsResponse.length; i++) {
            if ($scope.NationalConventionsResponse[i].Selected) {
                // alert($scope.NationalConventionsResponse[i].Id);
                if (strUserIds == undefined) {
                    // alert($scope.NationalConventionsResponse[i].Id);
                    if ($scope.NationalConventionsResponse[i].Id == '') {
                        strUserIds = $scope.NationalConventionsResponse[i].nationalId;
                    } else {
                        strUserIds = $scope.NationalConventionsResponse[i].nationalId
                    }

                }
                else {
                    strUserIds = strUserIds + "," + $scope.NationalConventionsResponse[i].nationalId;
                }
            }
        }
        //console.log(strUserIds); return false;
        if (strUserIds != undefined) {
            $http({ url: '/AReQCC/TeamRegistration/DeleteNationalConventionsUpdateChapter', method: "GET", params: { strIds: strUserIds } }).then(function (response) {
                $http.post('/AReQCC/TeamRegistration/DeleteNationalConventions', { strIds: strUserIds }).then(function (d) {
                    $timeout(function () {
                        angular.element('.National_conventions').trigger('click');
                    }, 1000);
                }, function (error) {

                });
            });
        }
    }
    $scope.DeleteICQCCConvention = function () {
        var strUserIds;
        for (var i = 0; i < $scope.ICQCCConventionsResponse.length; i++) {
            if ($scope.ICQCCConventionsResponse[i].Selected) {
                if (strUserIds == undefined) {
                    strUserIds = $scope.ICQCCConventionsResponse[i].Id;
                }
                else {
                    strUserIds = strUserIds + "," + $scope.ICQCCConventionsResponse[i].Id;
                }
            }
        }
        if (strUserIds != undefined) {
            $http({ url: '/AReQCC/TeamRegistration/DeleteICQCCConventionsUpdateNation', method: "GET", params: { strIds: strUserIds } }).then(function (response) {
                $http.post('/AReQCC/TeamRegistration/DeleteICQCCConventions', { strIds: strUserIds }).then(function (d) {
                    $timeout(function () {
                        angular.element('.ICQCC_conventions').trigger('click');
                    }, 1000);
                }, function (error) {

                });
            })

        }
    }

    $scope.DeleteInternationalConvention = function () {
        var strUserIds;
        for (var i = 0; i < $scope.InterNationalConventionsResponse.length; i++) {
            if ($scope.InterNationalConventionsResponse[i].Selected) {
                if (strUserIds == undefined) {
                    strUserIds = $scope.InterNationalConventionsResponse[i].Id;
                }
                else {
                    strUserIds = strUserIds + "," + $scope.InterNationalConventionsResponse[i].Id;
                }
            }
        }
        if (strUserIds != undefined) {
            $http({ url: '/AReQCC/TeamRegistration/DeleteInterNationalConvetionsUpdateICQCC', method: "GET", params: { strIds: strUserIds } }).then(function (response) {
                // Request completed successfully
                $http.post('/AReQCC/TeamRegistration/DeleteInterNationalConvetions', { strIds: strUserIds }).then(function (d) {
                    $timeout(function () {
                        angular.element('.Inter_National_conventions').trigger('click');
                    }, 1000);
                }, function (error) {

                });
            });

        }
    }

    $scope.DeleteInternalConvention = function () {
        var strUserIds;
        for (var i = 0; i < $scope.InternalConventionsResponse.length; i++) {

            if ($scope.InternalConventionsResponse[i].Selected) {
                if (strUserIds == undefined) {
                    strUserIds = $scope.InternalConventionsResponse[i].InternalId;
                }
                else {
                    strUserIds = strUserIds + "," + $scope.InternalConventionsResponse[i].InternalId;
                }
            }
        }

        if (strUserIds != undefined) {
            $http.post('/AReQCC/TeamRegistration/DeleteInternalConventions', { strIds: strUserIds }).then(function (d) {
                $timeout(function () {
                    angular.element('.Internal_conventions').trigger('click');
                }, 1000);
            }, function (error) {

            });
        }
    }
    $scope.deleteInternational = function (id) {
        $http({ url: '/AReQCC/TeamRegistration/DeleteInterNationalConvetionsUpdateICQCC', method: "GET", params: { strIds: id } }).then(function (response) {
            // Request completed successfully
            $http({ url: '/AReQCC/TeamRegistration/InternationalDeleteAfterSubmit', method: "GET", params: { Id: id } }).then(function (response) {
                $timeout(function () {
                    angular.element('.Inter_National_conventions').trigger('click');
                }, 1000);
            });
        });

    }
    $scope.getProductDetails = function (id, rowid) {
        // alert(rowid)
        var object_by_id = $filter('filter')($scope.InternalConventionsAwardsResponse, { Id: id })[0];
        for (var i = 0; i < $scope.InternalConventionsResponse.length; i++) {
            if (rowid == i) {
                Object.assign($scope.InternalConventionsResponse[i], { "Awards": id });
            }
        }
    }

    $scope.getProductDetails1 = function (id, rowid) {
        // alert(id);
        var object_by_id = $filter('filter')(
            $scope.ChapterConventionsAwardsResponse, { Id: id })[0];
        // alert(id); alert(rowid)
        for (var i = 0; i < $scope.ChapterConventionsResponse.length; i++) {
            if (rowid == i) {
                Object.assign($scope.ChapterConventionsResponse[i], { "Awards": id });
            }
            console.log($scope.ChapterConventionsResponse[i]);
        }
    }
    $scope.getProductDetails2 = function (id, rowid) {
        //  alert(id)
        var object_by_id = $filter('filter')($scope.NationalConventionsAwardsResponse, { Id: id })[0];
        for (var i = 0; i < $scope.NationalConventionsResponse.length; i++) {
            if (rowid == i) {
                Object.assign($scope.NationalConventionsResponse[i], { "Awards": id });
            }
        }
    }
    $scope.getProductDetails3 = function (id, rowid) {
        var object_by_id = $filter('filter')($scope.ICQCCConventionsAwardsResponse, { Id: id })[0];
        for (var i = 0; i < $scope.ICQCCConventionsResponse.length; i++) {
            if (rowid == i) {
                Object.assign($scope.ICQCCConventionsResponse[i], { "Awards": id });
            }
        }

    }
    $scope.getProductDetails4 = function (InternalId, rowid) {
        var object_by_id = $filter('filter')($scope.InterNationalConventionsAwardsResponse, { Id: InternalId })[0];
        for (var i = 0; i < $scope.InterNationalConventionsResponse.length; i++) {
            if (rowid == i) {
                Object.assign($scope.InterNationalConventionsResponse[i], { "Awards": InternalId });
            }
        }
    }

    function LoadInternalConventions() {
        if ($scope.RoleID == 5) {
            $http({ url: '/AReQCC/TeamRegistration/InternalConventionsFetch', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                $scope.InternalConventionsResponse = [];
                for (property in response.data.internalConventionsResponses) {
                    if (response.data.internalConventionsResponses[property].Id != response.data.internalConventionsResponses[property].InternalId) {
                        $scope.InternalConventionsResponse.push(response.data.internalConventionsResponses[property]);
                    } else {
                        $scope.InternalConventionsResponse.push(response.data.internalConventionsResponses[property]);
                    }
                }
                console.log($scope.InternalConventionsResponse);

                for (var i = 0; i < $scope.InternalConventionsResponse.length; i++) {
                    $scope.InternalConventionsResponse[i].Id = $scope.InternalConventionsResponse[i].Awards
                }
                $scope.totalCount = response.data.totalCount;
                $("#Internal_conventions").show();
                $http({ url: '/AReQCC/TeamRegistration/GetChapterConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                    // Request completed successfully
                    LoadChapterConventionsAwards();
                    for (var i = 0; i < response.data.chapterConventionResponse.length; i++) {
                        //$(".internalconventions_" + response.data.chapterConventionResponse[i].id).hide();
                        //$(".internal_" + response.data.chapterConventionResponse[i].id).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                        //$(".internal_" + response.data.chapterConventionResponse[i].id).attr("disabled", "disabled");
                        var title = response.data.chapterConventionResponse[i].ProjectTitle.replace(/ /g, "-");
                        // alert(title);
                        // $(".overconventions_" + response.data.internalConventionsResponses[i]['Id']).hide();
                        //$(".overal_" + response.data.internalConventionsResponses[i]['Id']).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                        $("." + title).hide();
                        $(".internal_" + title).parent('tr').css({ "background": "#8080804a", "opacity": "0.5" });
                    }
                });
                for (property in response.data.internalConventionsResponses) {
                    checkEmployees(response.data.internalConventionsResponses[property].ProjectTitle.replace(/ /g, "-"), response.data.internalConventionsResponses[property].QCName, (response.data.internalConventionsResponses.length - 1) - property);
                }
                LoadInternalAwards();
            }, function (x) {// Request error 
            });
        } else {
            $http({ url: '/AReQCC/TeamRegistration/InternalConventionsFetchLevel', method: "GET", params: { EmpCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully
                $scope.InternalConventionsResponse = response.data.internalConventionsResponses;
                for (var i = 0; i < $scope.InternalConventionsResponse.length; i++) {
                    $scope.InternalConventionsResponse[i].Id = $scope.InternalConventionsResponse[i].Awards
                }
                $scope.totalCount = response.data.totalCount;
                $("#Internal_conventions").show();
                LoadInternalAwards();
                for (property in response.data.internalConventionsResponses) {
                    checkEmployees(response.data.internalConventionsResponses[property].ProjectTitle.replace(/ /g, "-"), response.data.internalConventionsResponses[property].QCName, (response.data.internalConventionsResponses.length - 1) - property);
                }
            }, function (x) {// Request error 
            });
        }

    }
    $scope.InternalView = function () {
        //    alert($scope.fromDate);
        //   alert($scope.ToDate);
        //LoadInternalConventions();
        this.myfunction('internal', $scope.fromDate, $scope.ToDate);
    }
    $scope.ChapterView = function () {
        //LoadChapterConventions();
        this.myfunction('chapter', $scope.fromDate, $scope.ToDate);
    }
    $scope.NationalView = function () {
        //LoadNationalConventions();

        this.myfunction('nation', $scope.fromDate, $scope.ToDate);
    }
    $scope.ICQCCView = function () {
        //LoadICQCCConventions();
        this.myfunction('icqcc', $scope.fromDate, $scope.ToDate);
    }
    $scope.InterNational = function () {
        //LoadInterNationalConventions();
        this.myfunction('international', $scope.fromDate, $scope.ToDate);
    }
    $scope.overalView = function () {
        //LoadInterNationalConventions();
        this.myfunction('overall', $scope.fromDate, $scope.ToDate);
    }
    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        //var exportHref = Excel.tableToExcel(tableId, 'WireWorkbenchDataExport');
        var exportHref = Excel.tableToExcel(tableId, 'Projects');
        $timeout(function () { location.href = exportHref; }, 100); // trigger download
    }
    $scope.export = function () {
        html2canvas(document.getElementById('overallProjects'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("Projects.pdf");
            }
        });
    }
    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        //var exportHref = Excel.tableToExcel(tableId, 'WireWorkbenchDataExport');
        var exportHref = Excel.tableToExcel(tableId, 'Projects');
        $timeout(function () { location.href = exportHref; }, 100); // trigger download
    }
    $scope.export = function () {
        html2canvas(document.getElementById('internal'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("Internal Convention Projects.pdf");
            }
        });
    }

    $scope.export = function () {
        html2canvas(document.getElementById('chapter'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("Chapter Convention Projects.pdf");
            }
        });
    }
    $scope.export = function () {
        html2canvas(document.getElementById('national'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("National Convention Projects.pdf");
            }
        });
    }
    $scope.export = function () {
        html2canvas(document.getElementById('icqcc'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("ICQCC Internal Screening.pdf");
            }
        });
    }

    $scope.export = function () {
        html2canvas(document.getElementById('international'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("International Convention Projects.pdf");
            }
        });
    }
    $scope.pageChanged = function () {
        ($scope.number_of_change)++;
    };

    $scope.setPage = function () {
        $scope.current_page = 3;
    };
    function checkEmployees(projectTitle, QCName, index) {


        $http({ url: '/AReQCC/TeamRegistration/FetchCircleDetailsByNameConventionName', method: "GET", params: { CircleName: QCName } }).then(function (response) {
            $scope.CircleResponse = response.data;
            console.log($scope.CircleResponse);
            var EmpList = [];
            for (var i = 0; i < $scope.CircleResponse.length - 1; i++) {
                var emp = "<li>" + $scope.CircleResponse[i].EmpCode + " :- " + $scope.CircleResponse[i].EmpName + "</li>";
                EmpList.push(emp);
            }
            console.log(EmpList);
            for (var i = 0; i < $scope.CircleResponse.length; i++) {
                console.log("#InternalTeamMebers_" + QCName + "_" + (QCName - 1));
                //$("#InternalTeamMebers_"+id+'_'+index).html('<ul style="margin-left: 0px;padding-left: 0px;text-align: left;list-style-type: none;width: 200px;">' + EmpList.join("") + '</ul>');
                $("#InternalTeamMebers_" + QCName + "_" + (QCName-1)).html('<ul style="margin-left: 0px;padding-left: 0px;text-align: left;list-style-type: none;width: 200px;">' + EmpList.join("") + '</ul>');
            }
        }, function (x) {
            // Request error
        });
    }

});
//app.filter('imgThumb', function () {
//    return function (images, start) {
//        return images.slice(start);
//    };
//});
app.filter('removeSpaces', [function () {
    return function (string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '-');
    };
}])
app.directive("limitToMax", function () {
    return {
        link: function (scope, element, attributes) {
            element.on("keydown keyup", function (e) {
                if (Number(element.val()) > Number(attributes.max) &&
                    e.keyCode != 46 // delete
                    &&
                    e.keyCode != 8 // backspace
                ) {
                    e.preventDefault();
                    element.val(attributes.max);
                }

            });
        }
    };
});

app.directive("limitToMaxNational", function () {
    return {
        link: function (scope, element, attributes) {
            selectPage(num)
            element.on("keydown keyup", function (e) {
                if (Number(element.val()) > Number(attributes.max) &&
                    e.keyCode != 46 // delete
                    &&
                    e.keyCode != 8 // backspace
                ) {
                    e.preventDefault();
                    element.val(attributes.max);
                }
            });
        }
    };
});