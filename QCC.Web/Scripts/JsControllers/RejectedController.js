var app = angular.module('QCC', ['ui.bootstrap']);

app.controller("HomeController", function ($scope, $http) {
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/AReQCC';
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
    InIt();
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
            $http({ url: '/AReQCC/TeamDetails/FetchTeamDetailsByAdminStatus', method: "GET", params: { Status: '11', pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                $scope.RejectedResponse = response.data.temaDetailsResponse;
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
            $http({ url: '/AReQCC/TeamDetails/FetchTeamDetailsByStatus', method: "GET", params: { Status: '11', CreatedBy: $scope.EmpCode, pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
                // Request completed successfully
                $scope.RejectedResponse = response.data.temaDetailsResponse;
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
    $scope.EditDetails = function (CircleId, Index, EditId, Company) {
        var functioncode = $("#functionCode").val();
        var empcode = $("#editmemeberempcode_"+Index).text().trim();
        if (Index == 1) {
        } else if (Index == 2) {
            $("#editmemeberempcode_" + Index).focus().html('<input type="text" onchange="javascript:return TM4(this.value,' + functioncode + ',\'' + Company + '\',' + Index + ');" value="' + empcode + '" id="empcodeText' + Index + '"/>');
            $("#editicon_" + Index).empty().html('<span id="save_' + Index + '" class="glyphicon"></span>');
            $("#save_" + Index).addClass('glyphicon-save btn btn-outline-success').text("Save").css({ "font-size": "14px", "padding-left": "4px" }).attr("onclick", "javascript:savedatefromemp(" + Index + "," + functioncode + "," + EditId + ")");
            $("#TMfile_" + Index).attr({ "onchange": "readURL4(this," + Index + ")", "disabled": false });
        } else if (Index == 3) {
           // $("#editmemeberempcodeReject_"+CircleId).text("hello")
            $("#editmemeberempcode_" + Index).focus().html('<input type="text" onchange="javascript:return TM4(this.value,' + functioncode + ',\'' + Company + '\',' + Index + ');" value="' + empcode + '" id="empcodeText' + Index + '" />');
            $("#editicon_" + Index).empty().html('<span id="save_' + Index + '" class="glyphicon"></span>');
            $("#save_" + Index).addClass('glyphicon-save btn btn-outline-success').text("Save").css({ "font-size": "14px", "padding-left": "4px" }).attr("onclick", "javascript:savedatefromemp(" + Index + "," + functioncode + "," + EditId + ")");
            $("#TMfile_" + Index).attr({ "onchange": "readURL4(this," + Index + ")", "disabled": false });
        } else if (Index == 4) {
            $("#editmemeberempcode_" + CircleId).focus().html('<input type="text" onchange="javascript:return TM4(this.value,' + functioncode + ',\'' + Company + '\',' + Index + ');" value="' + empcode + '" id="empcodeText' + Index + '" />');
            $("#editicon_" + Index).empty().html('<span id="save_' + Index + '" class="glyphicon"></span>');
            $("#save_" + Index).addClass('glyphicon-save btn btn-outline-success').text("Save").css({ "font-size": "14px", "padding-left": "4px" }).attr("onclick", "javascript:savedatefromemp(" + Index + "," + functioncode + "," + EditId + ")");
            $("#TMfile_" + Index).attr({ "onchange": "readURL4(this," + Index + ")", "disabled": false });
        } else if (Index == 5) {
            $("#editmemeberempcode_" + Index).focus().html('<input type="text" onchange="javascript:return TM4(this.value,' + functioncode + ',\'' + Company + '\',' + CircleId + ');" value="' + empcode + '" id="empcodeText' + Index + '" />');
            $("#editicon_" + Index).empty().html('<span id="save_' + Index + '" class="glyphicon"></span>');
            $("#save_" + Index).addClass('glyphicon-save btn btn-outline-success').text("Save").css({ "font-size": "14px", "padding-left": "4px" }).attr("onclick", "javascript:savedatefromemp(" + Index + "," + functioncode + "," + EditId + ")");
            $("#TMfile_" + Index).attr({ "onchange": "readURL4(this," + Index + ")", "disabled": false });
        } else if (Index == 6) {
            $("#editmemeberempcode_" + Index).focus().html('<input type="text" onchange="javascript:return TM4(this.value,' + functioncode + ',\'' + Company + '\',' + CircleId + ');" value="' + empcode + '" id="empcodeText' + Index + '" />');
            $("#editicon_" + Index).empty().html('<span id="save_' + Index + '" class="glyphicon"></span>');
            $("#save_" + Index).addClass('glyphicon-save btn btn-outline-success').text("Save").css({ "font-size": "14px", "padding-left": "4px" }).attr("onclick", "javascript:savedatefromemp(" + Index + "," + functioncode + "," + EditId + ")");
            $("#TMfile_" + Index).attr({ "onchange": "readURL4(this," + Index + ")", "disabled": false });
        }

    }
    $scope.toggleEdit = function (Rejected) {
        Rejected.showEdit = Rejected.showEdit ? false : true;
        teamDetails = Rejected;
        $(".body_blur").show();
        $("#RejectedView").show();
        $http({ url: '/AReQCC/TeamRegistration/FetchCircleDetailsByName', method: "GET", params: { TeamId: Rejected.Id,CircleName: Rejected.TeamName, EmpCode: $scope.EmpCode, Plant: Rejected.Plant, BusinessUnit: Rejected.BusinessUnit } }).then(function (response) {
            // Request completed successfully
            $scope.CircleResponse = response.data;
            getAddBtn(response.data.length, response.data[0].Company, Rejected.Id);
            $scope.EditId = Rejected.Id;
            $scope.Remarks = Rejected.Remarks;
            $scope.company = response.data[0].Company;
        }, function (x) {
            // Request error
        });
    }
   
    $scope.Close = function () {
        $(".showtableList,.body_blur").hide();
        $("#RejectedView").hide();
    }
    // Server Paging
    $scope.pageChanged = function () {
        InIt();
    };
    $scope.deleteTM = function (CircleId, EditId, company) {
      //  alert(CircleId);alert(EditId); //return false;


        $http({ url: "/AReQCC/TeamRegistration/DeleteTeamMember", method: "GET", params: { CircleId: CircleId } }).then(function (response) {
            console.log(response);
            // $('.EmployeeListTable tr:last').remove();
            $("#editmemeberempcode_" + CircleId).parent().remove();
            $("#errortm").text("Successful Delete").css({ "color": "green", "font-weight": "bold", "text-align": "center" });
            setTimeout(function () { angular.element('#Editfunction_' + EditId).triggerHandler('click'); }, 1000);
            if ($('.EmployeeListTable > tbody tr').length < 6) {
                var functioncode = $("#functionCode").val();

                $(".EmpAddBtn").show().removeAttr("onclick");
                setTimeout(function () { var gettoal = ($(".EmployeeListTable >tbody tr").length) + 1; $(".EmpAddBtn").attr("onclick", "javascript:return addEmployee(" + gettoal + "," + functioncode + "," + EditId + ",'" + company + "')") }, 1000)
                //for (var i = 0; i < $('.EmployeeListTable > tbody tr').length; i++) {
                //    alert($(".EmployeeListTable >tbody tr >th:first").text(i));
                //}
                $('.EmployeeListTable > tbody tr').each(function (index, tr) {
                    if (index == 0) {
                        $('.EmployeeListTable > tbody tr:first th:first').text(index + 1)
                    }
                    if (index == 1) {
                        $('.EmployeeListTable > tbody tr:nth-child(2) th:first').text(index + 1)
                    }
                    if (index == 2) {
                        $('.EmployeeListTable > tbody tr:nth-child(3) th:first').text(index + 1)
                    }
                    if (index == 3) {
                        $('.EmployeeListTable > tbody tr:nth-child(4) th:first').text(index + 1)
                    }
                    if (index == 4) {
                        $('.EmployeeListTable > tbody tr:nth-child(5) th:first').text(index + 1)
                    }

                    //console.log(index);
                    //console.log(tr);
                });

            }

        });
    }
    $scope.Delete = function (Rejected) {
        //alert(Rejected.Id);
        console.log(Rejected.Id)
        //return false;
        $http({ url: '/AReQCC/TeamRegistration/DeleteCircleDetailsByName', method: "GET", params: { Id: Rejected.Id, empCode: $scope.EmpCode } }).then(function (response) {
            // Request completed successfully
            //alert(response);
            //$scope.CircleResponse = response.data;
            //$scope.Remarks = Rejected.Remarks;
            window.location.reload();

        }, function (x) {
            // Request error
        });
}
})

app.filter('imgThumb', function () {
    return function (images, start) {
        return images.slice(start);
    };
});