var app = angular.module('QCC', []);

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
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/QCC.Web/Home/Index';
    }
    $scope.EmpCode = $('#myHiddenempCode').val();
    InIt();
    //ReportsSearchList();
    function InIt() {
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
    }

    $scope.ReportsSearch = function () {
        var ReportsFetch = { Company: $scope.selectedcompanyvalue, Plant: $scope.selectedplantvalue, BusinessUnit: $scope.selectedbusinessvalue, Department: $scope.selecteddepartmentvalue, StartDate: $('#datepicker-range-start1').val(), EndDate: $('#datepicker-range-end1').val() };
        $http.post('/QCC.Web/TeamRegistration/ReportsFetch', ReportsFetch).then(function (d) {
            $scope.ReportsResponse = d.data;
        }, function (error) {

        });
    }
    
    $scope.logout = function () {
        $http({ url: '/QCC.Web/Login/Logout', method: "GET" }).then(function (response) {
            // Request completed successfully
            window.location.href = '/QCC.Web/Home/Index';
        }, function (x) {
            // Request error
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

})