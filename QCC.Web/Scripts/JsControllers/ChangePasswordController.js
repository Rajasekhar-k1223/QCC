var app = angular.module('QCC', ['ui.bootstrap']);
app.controller("ChangePasswordController", function ($scope, $http, $filter, $timeout) {
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/AReQCC';
    }
    $scope.EmpCode = $('#myHiddenempCode').val();
    $scope.maxSize = 5;     // Limit number for pagination display number.
    $scope.totalCount = 0;  // Total number of items in all pages. initialize as a zero
    $scope.pageIndex = 1;   // Current page number. First page is 1.-->
    $scope.pageSizeSelected = 100; // Maximum number of items per page.
    //InIt();
    $scope.logout = function () {
        $http({ url: '/AReQCC/Login/Logout', method: "GET" }).then(function (response) {
            // Request completed successfully
            window.location.href = '/AReQCC';
        }, function (x) {
            // Request error
        });
    }
    $scope.savePassword = function () {
        let newpwd = $scope.NewPassword;
        let Cnewpwd = $scope.CNewPassword;
        if (newpwd != Cnewpwd) {
            $("#changepasswordError").text("Password Doesn't Match");
            $("#newpwd,CNewpwd").css({ "border": "1px solid red" });
            return false;
        } else {
            $scope.UserRegister = { EmpCode: $scope.EmpCode, CurrentPassword: $scope.CurrentPassword, Password: $scope.NewPassword };
            $http.post('/AReQCC/AccountManagement/UpdatePassword', $scope.UserRegister).then(function (d) {
                var backgroundblur = '<div class="backgroundblur" style="width: 100%;height: 100%;background: #00000075;z-index: 4;position: fixed;top: 0px;"></div>';
                var alertshow = '<div class="alert alert-info hidealertclass" style="position:absolute;z-index:4;top:40vh;left:35vw;padding:1vw;font-size: 1vw;font-weight: bold;border-radius: 1vw;color:black;"><strong>Password Update Completed Please Login with New Password</strong></div >';
                $("body").append(backgroundblur).append(alertshow);

                setTimeout(function () {
                    $scope.logout();
                }, 3000);
                $scope.StatusMessage = "Successfully Register";
                $("#status").text($scope.StatusMessage);
                
            }, function (error) {

            });
        }
       
    }

})