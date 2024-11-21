var app = angular.module('QCC', []);
app.controller("HomeController", function ($scope, $http) {
    $scope.btntext = "Login";
    function disablePrev() { window.history.forward() }
    window.onload = disablePrev();
    window.onpageshow = function (evt) { if (evt.persisted) disableBack() }
    $scope.login = function () {
        $scope.btntext = "Please wait..!";
        $http.post('/QCC.Web/Login/UserLogin', $scope.user).then(function (d) {
            if (d.data.loginResponse.empCode == undefined || d.data.loginResponse.empCode == null) {
                $scope.LoginValidationmsg = "Login Credentials Invalid";
            } else {
                window.location.href = '/QCC.Web/Home/dashboard';
            }
            $scope.user = null;
        }, function (error) {

        });
    }
    $scope.ResetPassword = function () {
        $http({ url: '/QCC.Web/Login/FetchLoginRegisterByEmpCode', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {


            if (response.data.Password != null) {
                MailTemplate = [{
                    email: response.data.EmpMailId, subject: "UserId:" + $scope.EmpCode + " " + "Password Details", emailBody: "UserId: " + $scope.EmpCode + " " + "Password: " + response.data.Password
                }];
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: 'POST',
                    url: '/QCC.Web/ProjectDetails/SendingBulkEmails',
                    data: JSON.stringify(MailTemplate)
                });
                $scope.StatusMessage = "Password Sent To Registered Mail Id " + response.data.EmpMailId;
            }
            else {
                $scope.StatusMessage = "Your UserId Is not registered";
            }

        }, function (error) {

        });
    }

});