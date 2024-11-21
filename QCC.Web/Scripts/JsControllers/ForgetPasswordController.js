var app = angular.module('QCC', []);
app.controller("ForgetPasswordController", function ($scope, $http) {
    $scope.ResetPassword = function () {
        $http({ url: '/AReQCC/Login/FetchLoginRegisterByEmpCode', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {


            if (response.data.Password != null) {
                MailTemplate = [{
                    email: response.data.EmpMailId, subject: "UserId:" + $scope.EmpCode + " " + "Password Details", emailBody: "UserId: " + $scope.EmpCode + " " + "Password: " + response.data.Password
                }];
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: 'POST',
                    url: '/AReQCC/ProjectDetails/SendingBulkEmails',
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
   
})