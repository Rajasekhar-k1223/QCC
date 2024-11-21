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
app.controller("ReportsController", function ($scope, $http, Excel, $timeout) {
    $scope.RoleId = $('#myHiddenroleId').val();
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/AReQCC';
    }
    $scope.EmpCode = $('#myHiddenempCode').val();
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
    InIt();
    //ReportsSearchList();
    function InIt() {
      
        if ($scope.RoleId == 5) {
        $http({ url: '/AReQCC/TeamRegistration/ReportsDroppDownResponse', method: "GET" }).then(function (response) {
            // Request completed successfully
            if (response.data.Company != null) {
                $scope.Company = [];
                for (var i = 0; i < response.data.Company.length; i++) {
                    var company = { "Id": i, "Name": response.data.Company[i] };
                    $scope.Company.push(company);
                }
            }
            //if (response.data.BusinessUnit != null) {
            //    $scope.BusinessUnit = [];
            //    for (var i = 0; i < response.data.BusinessUnit.length; i++) {
            //        var business = { "Id": i, "Name": response.data.BusinessUnit[i] };
            //        $scope.BusinessUnit.push(business);
            //    }
            //}

            //if (response.data.Department != null) {
            //    $scope.Department = [];
            //    for (var i = 0; i < response.data.Department.length; i++) {
            //        var department = { "Id": i, "Name": response.data.Department[i] };
            //        $scope.Department.push(department);
            //    }
            //}

            //if (response.data.Plant != null) {
            //    $scope.Plant = [];
            //    for (var i = 0; i < response.data.Plant.length; i++) {
            //        var plant = { "Id": i, "Name": response.data.Plant[i] };
            //        $scope.Plant.push(plant);
            //    }
            //}

        }, function (x) {// Request error 
        });
        }
        if ($scope.RoleId == 2 || $scope.RoleId == 4 || $scope.RoleId == 3 || $scope.RoleId == 1) {
            //alert($scope.EmpCode)
            $http({ url: '/AReQCC/TeamRegistration/ReportsDroppDownResponseLevel', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully
               // alert(response.data.CompanyLevel);
                console.log(response);
                $scope.companyselected = response.data.CompanyLevel;
                $scope.BusinessUnitselected = response.data.BusinessUnitLevel;
                $scope.Plantselected = response.data.PlantLevel;
                //if (response.data.Company != null) {
                //    $scope.Company = [];
                //    for (var i = 0; i < response.data.Company.length; i++) {
                //        var company = { "Id": i, "Name": response.data.Company[i] };
                //        $scope.Company.push(company);
                //    }
                //}
                //if (response.data.BusinessUnit != null) {
                //    $scope.BusinessUnit = [];
                //    for (var i = 0; i < response.data.BusinessUnit.length; i++) {
                //        var business = { "Id": i, "Name": response.data.BusinessUnit[i] };
                //        $scope.BusinessUnit.push(business);
                //    }
                //}
                $(".role2").show();
                if (response.data.Department != null) {
                    $scope.Department = [];
                    $scope.Department.push({ "Id": 0, "Name": "All"})
                    for (var i = 0; i < response.data.Department.length; i++) {
                        var department = { "Id": i+1, "Name": response.data.Department[i] };
                        $scope.Department.push(department);
                    }
                }

                //if (response.data.Plant != null) {
                //    $scope.Plant = [];
                //    for (var i = 0; i < response.data.Plant.length; i++) {
                //        var plant = { "Id": i, "Name": response.data.Plant[i] };
                //        $scope.Plant.push(plant);
                //    }
                //}

            }, function (x) {// Request error 
            });
        }
    }
    $scope.checkCopmany = function () {
       // alert($scope.selectedcompanyvalue);
        $http.post('/AReQCC/TeamRegistration/SearchCompany', { Company: $scope.selectedcompanyvalue }).then(function (d) {
            console.log(d.data)
            if (d.data.BusinessUnit != null) {
                $scope.BusinessUnit = [];
                for (var i = 0; i < d.data.BusinessUnit.length; i++) {
                    var business = { "Id": i, "Name": d.data.BusinessUnit[i] };
                    $scope.BusinessUnit.push(business);
                }
            }
        }, function (error) {

        });

    }
    $scope.checkBU = function () {
        // alert($scope.selectedcompanyvalue);
       // alert($scope.selectedbusinessvalue)
        $http.post('/AReQCC/TeamRegistration/SearchBU', { BU: $scope.selectedbusinessvalue }).then(function (d) {
            if (d.data.Plant != null) {
                $scope.Plant = [];
                for (var i = 0; i < d.data.Plant.length; i++) {
                    var plant = { "Id": i, "Name": d.data.Plant[i] };
                    $scope.Plant.push(plant);
                }
            }
        }, function (error) {

        });

    }
    $scope.checkPL = function () {
        // alert($scope.selectedcompanyvalue);
       // alert($scope.selectedbusinessvalue)
        $http.post('/AReQCC/TeamRegistration/SearchPL', { PL: $scope.selectedplantvalue }).then(function (d) {
            if (d.data.Department != null) {
                $scope.Department = [];
                for (var i = 0; i < d.data.Department.length; i++) {
                    var department = { "Id": i, "Name": d.data.Department[i] };
                    $scope.Department.push(department);
                }
            }
        }, function (error) {

        });

    }
    $scope.ReportsSearch = function () {
        if ($('#datepicker-range-start1').val() == '' && $('#datepicker-range-end1').val() == '') {
            $("#alert").show();
            setTimeout(function () {
                $("#alert").hide();
            }, 3000);
            return false;
        }
        if ($scope.RoleId == 5) {
            var ReportsFetch = { Company: $scope.selectedcompanyvalue, Plant: $scope.selectedplantvalue, BusinessUnit: $scope.selectedbusinessvalue, Department: $scope.selecteddepartmentvalue, StartDate: $('#datepicker-range-start1').val(), EndDate: $('#datepicker-range-end1').val() };
            $http.post('/AReQCC/TeamRegistration/ReportsFetch', ReportsFetch).then(function (d) {
                $scope.ReportsResponse = d.data;
                if (d.data.length > 200) {
                    //  alert(parseInt((response.data.totalCount / 50) * 10))
                    $scope.pageSize = parseInt((d.data.length / 50) * 10);
                }
                $scope.totalCount = d.data.length;
            }, function (error) {

            });
        }else{
            
            //if ($scope.selecteddepartmentvalue != '') {
                var ReportsFetch = { Company: $scope.selectedcompanyvalue, Plant: $("#selectedplantvalue").text(), BusinessUnit: $scope.selectedbusinessvalue, Department: $scope.selecteddepartmentvalue, StartDate: $('#datepicker-range-start1').val(), EndDate: $('#datepicker-range-end1').val() };
                $http.post('/AReQCC/TeamRegistration/ReportsFetchLevel', ReportsFetch).then(function (d) {
                    $scope.ReportsResponse = d.data;
                }, function (error) {

                });
        } 

            
        
       
    }
    
    $scope.logout = function () {
        $http({ url: '/AReQCC/Login/Logout', method: "GET" }).then(function (response) {
            // Request completed successfully
            window.location.href = '/AReQCC';
        }, function (x) {
            // Request error
        });
    }
    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        var exportHref = Excel.tableToExcel(tableId, 'Reports');
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

})