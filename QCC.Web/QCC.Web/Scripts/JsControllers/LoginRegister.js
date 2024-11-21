var app = angular.module('QCC', ['ui.bootstrap']);
app.controller("LoginController", function ($scope, $http, $filter) {
    $scope.EmpCode1 = $('#myHiddenempCode').val();
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/QCC.Web/Home/Index';
    }
    $scope.logout = function () {
        $http({ url: '/QCC.Web/Login/Logout', method: "GET" }).then(function (response) {
            // Request completed successfully
            window.location.href = '/QCC.Web/Home/Index';
        }, function (x) {
            // Request error
        });
    }
    $scope.maxSize = 5;     // Limit number for pagination display number.
    $scope.totalCount = 0;  // Total number of items in all pages. initialize as a zero
    $scope.pageIndex = 1;   // Current page number. First page is 1.-->
    $scope.pageSizeSelected = 25; // Maximum number of items per page.
    InIt();
    function InIt() {
        $scope.btnText = "Submit";
        $http({ url: '/QCC.Web/Login/GetUsersList', method: "GET", params: { pageIndex: $scope.pageIndex, pageSize: $scope.pageSizeSelected } }).then(function (response) {
            // Request completed successfully
            //alert("hello");
            $scope.UserResponse = response.data.userResponse;
            $scope.totalCount = response.data.totalCount;
        }, function (x) {
            // Request error

        });
        $http({ url: '/QCC.Web/Login/GetLevels', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.Roles = response.data;
        }, function (x) {// Request error 
        });
       
    }
   
    $scope.Save = function () {
        
        if ($scope.selectedItemvalue == 1) {
          //  alert($scope.selectedItemvalue);
            $scope.UserRegister = { EmpCode: $scope.EmpCode, EmpName: $scope.EmpName, Grade: $scope.Grade, Department: $scope.Department, EmpMailId: $scope.EmpMailId, Company: $scope.Company, BusinessUnit: $scope.BusinessUnit, Plant: $scope.Plant, RoleId: $scope.selectedItemvalue };
            $http.post('/QCC.Web/Login/UserSaveUpdateLevel1', $scope.UserRegister).then(function (d) {
                //alert(d);
                $scope.StatusMessage = "Successfully Updated";
                $scope.UserRegister = [];
                $scope.EmpCode = $scope.EmpName = $scope.Grade = $scope.Department = $scope.EmpMailId = $scope.Company = $scope.BusinessUnit = $scope.Plant = null;
                $scope.Roles = [];
                InIt();
            }, function (error) {

            });
        } else {
            $scope.UserRegister = { EmpCode: $scope.EmpCode, EmpName: $scope.EmpName, Grade: $scope.Grade, Department: $scope.Department, EmpMailId: $scope.EmpMailId, Company: $scope.Company, BusinessUnit: $scope.BusinessUnit, Plant: $scope.Plant, RoleId: $scope.selectedItemvalue };
            $http.post('/QCC.Web/Login/UserSaveUpdate', $scope.UserRegister).then(function (d) {
                //alert(d);
                $scope.StatusMessage = "Successfully Updated";
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
        $http.post('/QCC.Web/Login/UserUpdate', $scope.UserRegister).then(function (d) {
            $scope.StatusMessage = "Successfully Updated";
            $scope.UserRegister = [];
            $scope.EmpCode = $scope.EmpName = $scope.Grade = $scope.Department = $scope.EmpMailId = $scope.Company = $scope.BusinessUnit = $scope.Plant = null;
            $scope.Roles = [];
            InIt();
        }, function (error) {

        });
    }
    $scope.EmpCodeCheck = function () {
        $http({ url: '/QCC.Web/TeamRegistration/FetchEmployeeDetailsByLevel', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
            console.log(response)
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
            }
            else {
                $scope.EmpCode = $scope.EmpName = $scope.Grade = $scope.Department = $scope.EmpMailId = $scope.Company = $scope.Plant = $scope.BusinessUnit = null;
                InIt();
            }
        }, function (x) {
            // Request error
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
            $http.post('/QCC.Web/TeamRegistration/DeleteUsersByEmpCode', { Id: user.EmpCode, Plant: user.Plant }).then(function (d) {
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