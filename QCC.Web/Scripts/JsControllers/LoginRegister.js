var app = angular.module('QCC', ['ui.bootstrap','ui.bootstrap.tpls', 'ui.bootstrap.pagination']);
app.controller("LoginController", function ($scope, $http, $filter) {
    $scope.EmpCode1 = $('#myHiddenempCode').val();
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/AReQCC';
    }
    $scope.logout = function () {
        $http({ url: '/AReQCC/Login/Logout', method: "GET" }).then(function (response) {
            // Request completed successfully
            window.location.href = '/AReQCC';
        }, function (x) {
            // Request error
        });
    }
    $scope.roleID = $("#myHiddenroleId").val();
//    this.currentPage = 1;
//    this.numPerPage = 3;
///*    $scope.maxSize = 5; */    // Limit number for pagination display number.
//    $scope.totalCount = 0;  // Total number of items in all pages. initialize as a zero
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
    function InIt() {
        $scope.btnText = "Submit";
        $http({ url: '/AReQCC/Login/GetUsersList', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
            // Request completed successfully
            //alert("hello");
            $scope.UserResponse = response.data.userResponse;
            if (response.data.userResponse.length > 200) {
                //  alert(parseInt((response.data.totalCount / 50) * 10))
                $scope.pageSize = parseInt((response.data.userResponse.length / 50) * 10);
            }
            $scope.totalCount = response.data.totalCount;
            console.log($scope.UserResponse);
        }, function (x) {
            // Request error

        });
        $http({ url: '/AReQCC/Login/GetLevels', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.Roles = response.data;
            setTimeout(function () {
                var roleID = $("#myHiddenroleId").val();
                if (roleID == '2') {
                    $(".selectoption_5").hide();
                }
            },2000)
           
        }, function (x) {// Request error 
        });
       
    }
   
    $scope.Save = function () {

      
        if ($scope.selectedItemvalue == 1) {
          //  alert($scope.selectedItemvalue);
        
            $scope.UserRegister = { EmpCode: $scope.EmpCode, EmpName: $scope.EmpName, Grade: $scope.Grade, Department: $scope.Department, EmpMailId: $scope.EmpMailId, Company: $scope.Company, BusinessUnit: $scope.BusinessUnit, Plant: $scope.Plant, RoleId: $scope.selectedItemvalue };
            $http.post('/AReQCC/Login/UserSaveUpdateLevel1', $scope.UserRegister).then(function (d) {
               // alert(d);
                $scope.StatusMessage = "Successfully Register";
               // alert($scope.StatusMessage)
                $("#status").text($scope.StatusMessage);
                $scope.UserRegister = [];
                $scope.EmpCode = $scope.EmpName = $scope.Grade = $scope.Department = $scope.EmpMailId = $scope.Company = $scope.BusinessUnit = $scope.Plant = null;
                $scope.Roles = [];
                InIt();
            }, function (error) {

            });
        } else {
            $scope.UserRegister = { EmpCode: $scope.EmpCode, EmpName: $scope.EmpName, Grade: $scope.Grade, Department: $scope.Department, EmpMailId: $scope.EmpMailId, Company: $scope.Company, BusinessUnit: $scope.BusinessUnit, Plant: $scope.Plant, RoleId: $scope.selectedItemvalue };
            $http.post('/AReQCC/Login/UserSaveUpdate', $scope.UserRegister).then(function (d) {
               // alert(d);
              //  alert("hello");
                $scope.StatusMessage = "Successfully Save";
              //  alert($scope.StatusMessage);
                $("#status").text("Successfully Save").show();
                $scope.UserRegister = [];
                $scope.EmpCode = $scope.EmpName = $scope.Grade = $scope.Department = $scope.EmpMailId = $scope.Company = $scope.BusinessUnit = $scope.Plant = null;
                $scope.Roles = [];
                InIt();
            }, function (error) {

            });
        }
        
    }
    $scope.Update = function () {
        $scope.UserRegister = { EmpCode: $scope.EmpCode, EmpName: $scope.EmpName, Grade: $scope.Grade, Department: $scope.Department, EmpMailId: $scope.EmpMailId, Company: $scope.Company, BusinessUnit: $scope.BusinessUnit, Plant: $scope.Plant, RoleId: $scope.selectedItemvalue,Id:$scope.Id };
        $http.post('/AReQCC/Login/UserUpdate', $scope.UserRegister).then(function (d) {
            $scope.StatusMessage = "Successfully Register";
            $("#status").text("Successfully Updated");
            $scope.UserRegister = [];
            $scope.EmpCode = $scope.EmpName = $scope.Grade = $scope.Department = $scope.EmpMailId = $scope.Company = $scope.BusinessUnit = $scope.Plant = null;
            $scope.Roles = [];
            InIt();
        }, function (error) {

        });
    }
    $scope.checkRole = function () {
        //alert($scope.selectedItemvalue);
        //alert($scope.Plant);
        let Role = $scope.selectedItemvalue;
        let Plant = $scope.Plant;
        let Data = { role: Role, plant: Plant };
        
       // alert(Role)
               if (Role == 2 || Role == 3 || Role == 4 || Role == 5) {
                   $http.post('/AReQCC/TeamRegistration/FetchEmployeeDetailsByLevelCheckRole', Data).then(function (d) {
                       console.log(d);
                //       console.log("hello role");
                //console.log(d.data.Exist);
                    //   alert(d.data.Exist);
                if (d.data.Exist == 1) {
                    $("#save").hide();
                    $("#update").show();
                    $("#status").text("Role already exist");
                    $scope.statusmessage = "Role already exist";
                    setTimeout(function () {
                      //  alert("hello");
                        $scope.statusmessage = "";
                      //  $("#status").text(" ");
                    },3000)
                }
                if (d.data.Exist == 2) {
                    $("#save").show();
                    $("#update").hide();
                    $("#status").text(" ");
                    $scope.statusmessage = "";
                }
               
            }, function (error) {
                    
            });
               } else {
                 //  alert(Role);
            $("#save").show();
                   $("#update").hide();
                   $scope.StatusMessage = "";
            //$("#status").text("Successfully Register");
        }
        
    }
    $scope.EmpCodeCheck = function () {
        $http({ url: '/AReQCC/TeamRegistration/FetchEmployeeDetailsByLevel', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
            console.log(response);
            //return false;
            //ExistEmpCheck($scope.EmpCode);
            // Request completed successfully
            if (response.data.empCode != null) {
                $scope.EmpCode = response.data.empCode;
                $scope.EmpName = response.data.empName;
                $scope.Grade = response.data.grade;
                $scope.Department = response.data.department;
                $scope.EmpMailId = response.data.emailId;
                $scope.Company = response.data.company;
                $scope.Plant = response.data.Plant;
                $scope.BusinessUnit = response.data.businessUnit;
                //$scope.roleID = response.data.RoleId;
                //$scope.selectedcircleypevalue = response.data.RoleId;
                //checkRole($scope.selectedcircleypevalue);
                var sessionRoleId = $("#myHiddenroleId").val();
                if (sessionRoleId == 5) {
                    if (response.data.RoleId == 5 || response.data.RoleId == 4 || response.data.RoleId == 3 || response.data.RoleId == 2 || response.data.RoleId == 1) {
                        var object_by_id = $filter('filter')($scope.Roles, { RoleId: response.data.RoleId })[0];
                        $scope.selectedItemvalue = object_by_id.RoleId;
                        $(".selectRole").attr("disabled", false);
                        //alert($scope.selectedItemvalue)
                    } else {
                       
                        $scope.selectedItemvalue = ''
                        $(".selectRole").attr("disabled", false);
                    }
                    //var object_by_id = $filter('filter')($scope.Roles, { RoleId: response.data.RoleId })[0];
                    //$scope.selectedItemvalue = object_by_id.RoleId;
                } else { 
                    if (response.data.RoleId == 5 || response.data.RoleId == 4 || response.data.RoleId == 3 || response.data.RoleId == 2 || response.data.RoleId == 1) {
                        var object_by_id = $filter('filter')($scope.Roles, { RoleId: response.data.RoleId })[0];
                        $scope.selectedItemvalue = object_by_id.RoleId;
                        $(".selectRole").attr("disabled", true);
                        //alert($scope.selectedItemvalue)
                    } else {
                            $scope.selectedItemvalue = ''
                            $(".selectRole").attr("disabled", false);
                    }
                }
                
            }
            else {
                $scope.EmpCode = $scope.EmpName = $scope.Grade = $scope.Department = $scope.EmpMailId = $scope.Company = $scope.Plant = $scope.BusinessUnit = null;
                InIt();
            }
        }, function (x) {
            // Request error
        });
        
    }
    function ExistEmpCheck(empcode){
      
       $http({ url: '/AReQCC/TeamRegistration/FetchEmployeeDetailsByLevelCheck', method: "get", params: { empcode: empcode } }).then(function (response) {
            console.log(response);
           
           if (response.data.Exist == 1) {
               $("#save").hide();
               $("#update").show();
               $scope.StatusMessage = "Already Exist";
           }
           if (response.data.Exist == 2) {
               $("#save").show();
               $("#update").hide();
               $scope.StatusMessage = "";
           }
            
        }, function (x) {
            // request error
        });
    }
    $scope.toggleEdit = function (user) {
        user.showEdit = user.showEdit ? false : true;
        $scope.btnText = "Update";
        $scope.StatusMessage = null;
        $scope.EmpCode = user.EmpCode;
        $scope.EmpName = user.EmpName;
        $scope.Grade = user.Grade;
        $scope.Department = user.Department;
        $scope.EmpMailId = user.EmpMailId;
        $scope.Company = user.Company;
        var object_by_id = $filter('filter')($scope.Roles, { RoleId: user.RoleId })[0];
        $scope.selectedItemvalue = object_by_id.RoleId;
        $scope.BusinessUnit = user.BusinessUnit;
        $scope.Plant = user.Plant;
        $scope.Id = user.Id;
    }
    // Server Paging
    $scope.pageChanged = function () {
        InIt();
    };
    $scope.toggleDelete = function (user) {
        var isConfirmed = confirm("Are you sure to delete this record ?");
        if (isConfirmed) {
            $http.post('/AReQCC/TeamRegistration/DeleteUsersByEmpCode', { Id: user.EmpCode, Plant: user.Plant }).then(function (d) {
                $scope.EmpCode = $scope.EmpName = $scope.Grade = $scope.Department = $scope.EmpMailId = $scope.Company = $scope.BusinessUnit = $scope.Plant = null;
                $scope.Roles = [];
                InIt();
            }, function (error) {

            });
        } else {
            return false;
        }
    }
})

app.filter('imgThumb', function () {
    return function (images, start) {
        return images.slice(start);
    };
});
