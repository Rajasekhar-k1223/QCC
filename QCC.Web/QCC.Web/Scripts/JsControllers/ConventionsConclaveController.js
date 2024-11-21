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

app.controller("ConventionsConclaveController", function ($scope, $http, $filter) {
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/QCC.Web/Home/Index';
    }
    $scope.EmpCode = $('#myHiddenempCode').val();
    $scope.maxSize = 5;     // Limit number for pagination display number.
    $scope.totalCount = 0;  // Total number of items in all pages. initialize as a zero
    $scope.pageIndex = 1;   // Current page number. First page is 1.-->
    $scope.pageSizeSelected = 25; // Maximum number of items per page.
    InIt();
    function InIt() {
        $http({ url: '/QCC.Web/TeamRegistration/OveralConventionsFetch', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
            // Request completed successfully
            $scope.OveralConventionsResponse = response.data.reportsResponses;
            $scope.totalCount = response.data.totalCount;
            LoadInternalAwards();
        }, function (x) {// Request error 
        });
    }
    function LoadInternalAwards() {
        $http({ url: '/QCC.Web/TeamRegistration/InternalConventionsAwardsFetch', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.InternalConventionsAwardsResponse = response.data;
        }, function (x) {// Request error 
        });
    }
    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        var exportHref = Excel.tableToExcel(tableId, 'WireWorkbenchDataExport');
        $timeout(function () { location.href = exportHref; }, 100); // trigger download
    }
    $scope.export = function () {
        html2canvas(document.getElementById('tblCustomers'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("Reports.pdf");
            }
        });
    }
    $scope.SubmitToInternalConvention = function () {
        $scope.OveralConventions = [];
        for (var i = 0; i < $scope.OveralConventionsResponse.length; i++) {
            if ($scope.OveralConventionsResponse[i].Selected) {
                $scope.OveralConventions.push($scope.OveralConventionsResponse[i]);
            }
        }
        if ($scope.OveralConventions.length > 0) {
            $http.post('/QCC.Web/TeamRegistration/SaveInternalConventions', $scope.OveralConventions).then(function (d) {
                $scope.OveralConventions = [];
                $("#Overal_conventions").hide();
                LoadInternalConventions();
            }, function (error) {

            });
        }
    }

    $scope.SubmitToChapterConvention = function () {
        $scope.InternalConventions = [];
        for (var i = 0; i < $scope.InternalConventionsResponse.length; i++) {
            if ($scope.InternalConventionsResponse[i].Selected) {
                $scope.InternalConventions.push($scope.InternalConventionsResponse[i]);
            }
        }
        if ($scope.InternalConventions.length > 0) {
            $http.post('/QCC.Web/TeamRegistration/SaveInternalConventions', $scope.InternalConventions).then(function (d) {
                for (var i = 0; i < $scope.InternalConventions.length; i++) {
                    Object.assign($scope.InternalConventions[i], { "Awards": null, "Score": null });
                }
                $http.post('/QCC.Web/TeamRegistration/SaveChapterConventions', $scope.InternalConventions).then(function (d) {
                    $scope.InternalConventions = [];
                    $("#Internal_conventions").hide();
                    LoadChapterConventions();
                }, function (error) {

                });
            }, function (error) {

            });
        }

    }
    function LoadChapterConventions() {
        $http({ url: '/QCC.Web/TeamRegistration/GetChapterConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
            // Request completed successfully
            $scope.ChapterConventionsResponse = response.data.chapterConventionResponse;
            $scope.totalCount = response.data.totalCount;
            LoadChapterConventionsAwards();
            $("#Chapter_conventions").show();

        }, function (x) {// Request error 
        });
    }
    function LoadChapterConventionsAwards() {
        $http({ url: '/QCC.Web/TeamRegistration/ChapterConventionsAwardsFetch', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.ChapterConventionsAwardsResponse = response.data;
        }, function (x) {// Request error 
        });
    }
    $scope.pageChanged = function () {
        LoadChapterConventions();
    };
    $scope.logout = function () {
        $http({ url: '/QCC.Web/Login/Logout', method: "GET" }).then(function (response) {
            // Request completed successfully
            window.location.href = '/QCC.Web/Home/Index';
        }, function (x) {
            // Request error
        });
    }

    $scope.SubmitToNationalConvention = function () {
        $scope.ChapterConventions = [];
        for (var i = 0; i < $scope.ChapterConventionsResponse.length; i++) {
            if ($scope.ChapterConventionsResponse[i].Selected) {
                $scope.ChapterConventions.push($scope.ChapterConventionsResponse[i]);
            }
        }
        if ($scope.ChapterConventions.length > 0) {
            $http.post('/QCC.Web/TeamRegistration/SaveChapterConventions', $scope.ChapterConventions).then(function (d) {
                for (var i = 0; i < $scope.ChapterConventions.length; i++) {
                    Object.assign($scope.ChapterConventions[i], { "Awards": null, "Score": null });
                }
                $http.post('/QCC.Web/TeamRegistration/SaveNationalConventions', $scope.ChapterConventions).then(function (d) {
                    $scope.ChapterConventions = [];
                    $("#Internal_conventions").hide();
                    $("#Chapter_conventions").hide();
                    LoadNationalConventions();
                }, function (error) {

                });
            }, function (error) {

            });

        }
    }
    function LoadNationalConventions() {
        $http({ url: '/QCC.Web/TeamRegistration/GetNationalConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
            // Request completed successfully
            $scope.NationalConventionsResponse = response.data.nationalConventionResponses;
            $scope.totalCount = response.data.totalCount;
            $("#National_conventions").show();
            LoadNationalConventionsAwards();
        }, function (x) {// Request error 
        });
    }
    function LoadNationalConventionsAwards() {
        $http({ url: '/QCC.Web/TeamRegistration/NationalConventionsAwardsFetch', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.NationalConventionsAwardsResponse = response.data;
        }, function (x) {// Request error 
        });
    }

    $scope.SubmitToInterNationalConvention = function () {
        $scope.NationalConventions = [];
        for (var i = 0; i < $scope.NationalConventionsResponse.length; i++) {
            if ($scope.NationalConventionsResponse[i].Selected) {
                $scope.NationalConventions.push($scope.NationalConventionsResponse[i]);
            }
        }
        if ($scope.NationalConventions.length > 0) {
            $http.post('/QCC.Web/TeamRegistration/SaveNationalConventions', $scope.NationalConventions).then(function (d) {
                for (var i = 0; i < $scope.NationalConventions.length; i++) {
                    Object.assign($scope.NationalConventions[i], { "Awards": null, "Score": null });
                }
                $http.post('/QCC.Web/TeamRegistration/SaveInterNationalConventions', $scope.NationalConventions).then(function (d) {
                    $("#Internal_conventions").hide();
                    $("#Chapter_conventions").hide();
                    $("#National_conventions").hide();
                    $scope.NationalConventions = [];
                    LoadInterNationalConventions();
                }, function (error) {

                });
            }, function (error) {

            });
        }
    }
    function LoadInterNationalConventions() {
        $http({ url: '/QCC.Web/TeamRegistration/GetInterNationalConventions', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
            // Request completed successfully
            $scope.InterNationalConventionsResponse = response.data.interNationalConvetionsResponses;
            $scope.totalCount = response.data.totalCount;
            LoadInterNationalConventionsAwards();
            $("#National_conventions").hide();
            $("#Inter_National_conventions").show();

        }, function (x) {// Request error 
        });
    }
    function LoadInterNationalConventionsAwards() {
        $http({ url: '/QCC.Web/TeamRegistration/InternationalConventionsAwardsFetch', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.InterNationalConventionsAwardsResponse = response.data;
        }, function (x) {// Request error 
        });
    }
    $scope.SubmitInterNationalConvention = function () {
        $scope.InterNationalConventions = [];
        for (var i = 0; i < $scope.InterNationalConventionsResponse.length; i++) {
            if ($scope.InterNationalConventionsResponse[i].Selected) {
                $scope.InterNationalConventions.push($scope.InterNationalConventionsResponse[i]);
            }
        }
        if ($scope.InterNationalConventions.length > 0) {
            $http.post('/QCC.Web/TeamRegistration/SaveInterNationalConventions', $scope.InterNationalConventions).then(function (d) {
                $scope.InterNationalConventions = [];
            }, function (error) {

            });
        }
    }
    $scope.DeleteChapterConvention = function () {
        var strUserIds;
        for (var i = 0; i < $scope.ChapterConventionsResponse.length; i++) {
            if ($scope.ChapterConventionsResponse[i].Selected) {
                if (strUserIds == undefined) {
                    strUserIds = $scope.ChapterConventionsResponse[i].Id;
                }
                else {
                    strUserIds = strUserIds + "," + $scope.ChapterConventionsResponse[i].Id;
                }
            }
        }
        if (strUserIds != undefined) {

            $http.post('/QCC.Web/TeamRegistration/DeleteChapterConventions', { strIds: strUserIds }).then(function (d) {
                LoadChapterConventions();
            }, function (error) {

            });
        }
    }
    $scope.DeleteNationalConvention = function () {
        var strUserIds;
        for (var i = 0; i < $scope.NationalConventionsResponse.length; i++) {
            if ($scope.NationalConventionsResponse[i].Selected) {
                if (strUserIds == undefined) {
                    strUserIds = $scope.NationalConventionsResponse[i].Id;
                }
                else {
                    strUserIds = strUserIds + "," + $scope.NationalConventionsResponse[i].Id;
                }
            }
        }
        if (strUserIds != undefined) {
            $http.post('/QCC.Web/TeamRegistration/DeleteNationalConventions', { strIds: strUserIds }).then(function (d) {
                LoadNationalConventions();
            }, function (error) {

            });
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
            $http.post('/QCC.Web/TeamRegistration/DeleteInterNationalConvetions', { strIds: strUserIds }).then(function (d) {
                LoadInterNationalConventions();
            }, function (error) {

            });
        }
    }

    $scope.DeleteInternalConvention = function () {
        var strUserIds;
        for (var i = 0; i < $scope.InternalConventionsResponse.length; i++) {
           
            if ($scope.InternalConventionsResponse[i].Selected) {
                if (strUserIds == undefined) {
                    strUserIds = $scope.InternalConventionsResponse[i].Id;
                }
                else {
                    strUserIds = strUserIds + "," + $scope.InternalConventionsResponse[i].Id;
                }
            }
        }
        if (strUserIds != undefined) {
            $http.post('/QCC.Web/TeamRegistration/DeleteInternalConventions', { strIds: strUserIds }).then(function (d) {
                LoadInternalConventions();
            }, function (error) {

            });
        }
    }

    $scope.getProductDetails = function (id, rowid) {
        var object_by_id = $filter('filter')($scope.InternalConventionsAwardsResponse, { Id: id })[0];
        for (var i = 0; i < $scope.InternalConventionsResponse.length; i++) {
            if (rowid == i) {
                Object.assign($scope.InternalConventionsResponse[i], { "Awards": id });
            }
        }
    }

    $scope.getProductDetails1 = function (id, rowid) {
        var object_by_id = $filter('filter')($scope.ChapterConventionsAwardsResponse, { Id: id })[0];
        for (var i = 0; i < $scope.ChapterConventionsResponse.length; i++) {
            if (rowid == i) {
                Object.assign($scope.ChapterConventionsResponse[i], { "Awards": id });
            }
        }
    }
    $scope.getProductDetails2 = function (id, rowid) {
        var object_by_id = $filter('filter')($scope.NationalConventionsAwardsResponse, { Id: id })[0];
        for (var i = 0; i < $scope.NationalConventionsResponse.length; i++) {
            if (rowid == i) {
                Object.assign($scope.NationalConventionsResponse[i], { "Awards": id });
            }
        }
    }
    $scope.getProductDetails3 = function (id, rowid) {
        var object_by_id = $filter('filter')($scope.InterNationalConventionsAwardsResponse, { Id: id })[0];
        for (var i = 0; i < $scope.InterNationalConventionsResponse.length; i++) {
            if (rowid == i) {
                Object.assign($scope.InterNationalConventionsResponse[i], { "Awards": id });
            }
        }
    }

    function LoadInternalConventions() {
        $http({ url: '/QCC.Web/TeamRegistration/InternalConventionsFetch', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
            // Request completed successfully
            $scope.InternalConventionsResponse = response.data.internalConventionsResponses;
            $scope.totalCount = response.data.totalCount;
            $("#Internal_conventions").show();
            LoadInternalAwards();
        }, function (x) {// Request error 
        });
    }
    $scope.InternalView = function () {
        LoadInternalConventions();
    }
    $scope.ChapterView = function () {
        LoadChapterConventions();
    }
    $scope.NationalView = function () {
        LoadNationalConventions();

    }
    $scope.InterNational = function () {
        LoadInterNationalConventions();
    }

});