var app = angular.module('QCC', ['ui.bootstrap']);

app.controller("ProfileController", function ($scope, $http) {
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/AReQCC';
    }
    $scope.EmpCode = $('#myHiddenempCode').val();
    $scope.EmailId = $('#myHiddenempMailId').val();
    this.currentPage = 1;
    this.numPerPage = 15;
    this.maxSize = 4;
    $scope.maxSize = 5;     // Limit number for pagination display number.
    $scope.totalCount = 0;  // Total number of items in all pages. initialize as a zero
    $scope.pageIndex = 1;   // Current page number. First page is 1.-->
    $scope.pageSizeSelected = 1000000000; // Maximum number of items per page.
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
        //CreatedBy: $scope.EmpCode,
        $http({ url: '/AReQCC/TeamDetails/FetchTeamDetailsByAdminStatus', method: "GET", params: { Status: '3', pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
            // Request completed successfully
            $scope.ApprovedResponse = response.data.temaDetailsResponse;
            $scope.totalCount = response.data.totalCount;
        }, function (x) {
            // Request error
        });
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
        $http({ url: '/AReQCC/TeamRegistration/FetchCircleDetailsByName', method: "GET", params: { CircleName: Approved.TeamName, EmpCode: $scope.EmpCode, Plant: Approved.Plant, BusinessUnit: Approved.BusinessUnit } }).then(function (response) {
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
        $http({ url: '/AReQCC/ProjectDetails/FetchProjectsByTeamId', method: "GET", params: { TeamId: Approved.Id } }).then(function (response) {
            // Request completed successfully
            $scope.ProjectDetailsResponse = response.data;
        }, function (x) {
            // Request error
        });
        $http({ url: '/AReQCC/TeamRegistration/conventionsConClaveScoreAward', method: "GET", params: { TeamName: Approved.TeamName } }).then(function (response) {
            // Request completed 
            $scope.internalConventionScoreAndAwards = response.data.internalConventionScoreAndAwards;
            $scope.chapterConventionsScoreAndAwards = response.data.chapterConventionsScoreAndAwards;
            $scope.nationalConventionScoreAndAwards = response.data.nationalConventionScoreAndAwards;
            $scope.internationalConventionScoreAndAwards = response.data.internationalConventionScoreAndAwards;
        }, function (x) {
            // Request error
        });
    }
    $scope.Close = function () {
        $(".showtableList,.body_blur").hide();
        $("#ProjectSelectionSheetView").hide();
        $("#ApprovedView").hide();
         location.reload(); 
    }

    $scope.export = function () {
        getPDF();

    }
    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        var exportHref = Excel.tableToExcel(tableId, 'WireWorkbenchDataExport');
        $timeout(function () { location.href = exportHref; }, 100); // trigger download
    }
    // Server Paging
    $scope.pageChanged = function () {
        InIt();
    };
});

function getPDF() {
    var HTML_Width = $(".canvas_div_pdf").width();
    var HTML_Height = $(".canvas_div_pdf").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
    html2canvas($(".canvas_div_pdf")[0][-1], { allowTaint: true }).then(function (canvas) {
        canvas.getContext('2d');
        console.log(canvas.height + "  " + canvas.width);
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
        }
        pdf.save("HTML-Document.pdf");
    });
};

app.filter('imgThumb', function () {
    return function (images, start) {
        return images.slice(start);
    };
});