var app = angular.module('QCC', []);

app.controller("HomeController", function ($scope, $http) {
    if ($('#myHiddenempCode').val() == "") {
        window.location.href = '/QCC.Web/Home/Index';
    }
    $scope.EmpCode = $('#myHiddenempCode').val();
    $scope.RoleId = $('#myHiddenroleId').val();
    var teamDetails = [];
    $scope.Level1 = [];
    InIt();
    function InIt() {
        //$http({ url: '/Login/FetchLoginRegisterByEmpCode', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
        //    //Request completed successfully
        //    if (response.data.EmpCode != null) {
        //        //$http({ url: '/TeamRegistration/FetchEmployeeByLevel', method: "GET", params: { BusinessUnit: response.data.BusinessUnit, Plant: response.data.Plant, RoleId: 1 } }).then(function (d) {
        //        //    $scope.Level1 = d.data;
        //        //}, function (error) {
        //        //});
        //    }
        //    else {
        //    }
        //}, function (x) {
        //    // Request error
        //});
        if ($scope.RoleId == 5) {
            $http({ url: '/QCC.Web/TeamRegistration/NotificationAlertAdmin', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully
                $scope.InflowCount = response.data.InflowCount;
                $scope.ApproveCount = response.data.ApproveCount;
                $scope.RejectCount = response.data.RejectCount;

            }, function (x) {
                // Request error
            });
        }
        else {

            $http({ url: '/QCC.Web/TeamRegistration/NotificationAlert', method: "GET", params: { empCode: $scope.EmpCode } }).then(function (response) {
                // Request completed successfully
                $scope.InflowCount = response.data.InflowCount;
                $scope.ApproveCount = response.data.ApproveCount;
                $scope.RejectCount = response.data.RejectCount;

            }, function (x) {
                // Request error
            });
        }

        $http({ url: '/QCC.Web/TeamRegistration/FetchCircleType', method: "GET" }).then(function (response) {
            // Request completed successfully
            $scope.CircleType = response.data;
        }, function (x) {
            // Request error
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
    $scope.submitCircle = function () {
        var circlename = $("#circlename").val();
        var circleType = $("#circleType").val();
        var error = document.getElementById("error");
        if (circlename == '') {
            var data = "Please Enter Circle Name";
            error.style.color = "red";
            error.innerHTML = data;
            return false;

        } if (circleType == '') {
            var data = "Please Enter Circle Type";
            error.style.color = "red";
            error.innerHTML = data;
            return false;

        } else {

            $http({
                url: '/QCC.Web/TeamRegistration/GetCircleRegistrationDetailsByCircle', method: "GET", params: { CircleName: circlename }
            }).then(function (response) {
                // Request completed successfully
                if (response.data == "") {
                    var data = "Available you can register";
                    error.style.color = "green";
                    error.innerHTML = data;
                    $("#createteamtable").show();
                    $scope.btnSubmit = false;
                    $scope.TM4empCode = $scope.TM4department = $scope.TM4empName = $scope.TM4grade = $scope.TM4businessUnit = $scope.TM3empCode = $scope.TM3department = $scope.TM3empName = $scope.TM3grade = $scope.TM3businessUnit = $scope.TM2empCode = $scope.TM2department = $scope.TM2empName = $scope.TM2grade = $scope.TM2businessUnit = $scope.TM1empCode = $scope.TM1department = $scope.TM1empName = $scope.TM1grade = $scope.TM1businessUnit = $scope.TLempCode = $scope.TLdepartment = $scope.TLempName = $scope.TLgrade = $scope.TLbusinessUnit = null;
                }
                else {

                    if (response.data[6] != response.data.length-1) {
                        $scope.L1CircleId = response.data[response.data.length - 1].CircleId;
                        $scope.selectedItemvalue = response.data[response.data.length - 1].EmpCode;
                        $scope.L1empCode = response.data[response.data.length - 1].EmpCode;
                        $scope.L1department = response.data[response.data.length - 1].Department;
                        $scope.L1empName = response.data[response.data.length - 1].EmpName;
                        $scope.L1grade = response.data[response.data.length - 1].Grade;
                        $scope.L1businessUnit = response.data[response.data.length - 1].BusinessUnit;
                        $scope.L1image = response.data[response.data.length - 1].Image;
                        $("#image_upload_preview_6").attr("src", $scope.L1image);
                        $("#sucessalert_6").show();
                        response.data.splice(response.data.length - 1, 1);
                    }
                    if (response.data.length > 0)
                        for (var i = 0; i < response.data.length; i++) {
                          

                                if (response.data[0] != response.data.length[i]) {
                                    $scope.FacilitatorCircleId = response.data[0].CircleId;
                                    $scope.FacilitatorempCode = response.data[0].EmpCode;
                                    $scope.Facilitatordepartment = response.data[0].Department;
                                    $scope.FacilitatorempName = response.data[0].EmpName;
                                    $scope.Facilitatorgrade = response.data[0].Grade;
                                    $scope.FacilitatorbusinessUnit = response.data[0].BusinessUnit;
                                    $scope.Facilitatorimage = response.data[0].Image;
                                    $("#image_upload_preview").attr("src", $scope.Facilitatorimage);
                                    $("#sucessalert").show();
                                }
                                if (response.data[1] != response.data.length[i]) {
                                $scope.TLCircleId = response.data[1].CircleId;
                                $scope.TLempCode = response.data[1].EmpCode;
                                    $http({ url: '/QCC.Web/TeamRegistration/FetchEmployeeDetailsByEmpCode', method: "GET", params: { empCode: response.data[1].EmpCode } }).then(function (response) {
                                        // Request completed successfully
                                        console.log(response+"hello")
                                        if (response.data.empCode != null) {
                                            $scope.TLempCode = response.data.empCode;
                                            $scope.TLdepartment = response.data.department;
                                            $scope.TLempName = response.data.empName;
                                            $scope.TLgrade = response.data.grade;
                                            $scope.TLbusinessUnit = response.data.businessUnit;

                                            $http({ url: '/QCC.Web/TeamRegistration/FetchEmployeeDetailsByLevel', method: "GET", params: { EmpCode: response.data.l1 } }).then(function (response1) {
                                                // Request completed successfully
                                                if (response1.data.empCode != null) {
                                                    $scope.L1empCode = response1.data.empCode;
                                                    $scope.L1department = response1.data.department;
                                                    $scope.L1empName = response1.data.empName;
                                                    $scope.L1grade = response1.data.grade;
                                                    $scope.L1businessUnit = response1.data.businessUnit;
                                                    teamDetails = { Company: response1.data.company, BusinessUnit: $scope.L1businessUnit, Plant: response1.data.Plant, Status: 1, Level1: $scope.L1empCode, CreatedBy: $scope.EmpCode };
                                                    $scope.UserRegister = { EmpCode: $scope.L1empCode, EmpName: $scope.L1empName, Grade: $scope.L1grade, Department: $scope.L1department, EmpMailId: response.data.emailId, Company: response.data.company, BusinessUnit: response.data.businessUnit, Plant: response.data.Plant, RoleId: '1' };
                                                }
                                                else {
                                                    $scope.L1department = $scope.L1empName = $scope.L1grade = $scope.L1businessUnit = null;
                                                }
                                            }, function (x) {
                                                // Request error
                                            });

                                        }
                                        else {
                                            $scope.TLdepartment = $scope.TLempName = $scope.TLgrade = $scope.TLbusinessUnit = null;
                                        }
                                    }, function (x) {
                                        // Request error
                                    });
                                $scope.TLimage = response.data[1].Image;
                                $("#image_upload_preview_1").attr("src", $scope.TLimage);
                                $("#sucessalert_1").show();
                            }
                            if (response.data[2]  != response.data.length[i]++) {
                                $scope.TM1CircleId = response.data[2].CircleId;
                                $scope.TM1empCode = response.data[2].EmpCode;
                                $http({ url: '/QCC.Web/TeamRegistration/FetchEmployeeDetailsByEmpCode', method: "GET", params: { empCode: response.data[2].EmpCode } }).then(function (response) {
                                    // Request completed successfully
                                    if (response.data.empCode != null) {
                                        $scope.testmsg1 = "";
                                        $scope.TM1empCode = response.data.empCode;
                                        $scope.TM1department = response.data.department;
                                        $scope.TM1empName = response.data.empName;
                                        $scope.TM1grade = response.data.grade;
                                        $scope.TM1businessUnit = response.data.businessUnit;
                                        $scope.TM1DepartmentCar = response.data.DepartmentCar;
                                      
                                    }
                                    else {
                                        $scope.testmsg1 = "";
                                        $scope.TM1department = $scope.TM1empName = $scope.TM1grade = $scope.TM1businessUnit = null;
                                    }
                                }, function (x) {
                                    // Request error
                                });
                                $scope.TM1image = response.data[2].Image;
                                $("#image_upload_preview_2").attr("src", $scope.TM1image);
                                $("#sucessalert_2").show();

                            }
                            if (response.data[3] != response.data.length[i]) {
                                $scope.TM2CircleId = response.data[3].CircleId;
                                $scope.TM2empCode = response.data[3].EmpCode;
                                $http({ url: '/QCC.Web/TeamRegistration/FetchEmployeeDetailsByEmpCode', method: "GET", params: { empCode: response.data[3].EmpCode } }).then(function (response) {
                                    // Request completed successfully
                                    if (response.data.empCode != null) {
                                        $scope.testmsg2 = "";
                                        $scope.TM2empCode = response.data.empCode;
                                        $scope.TM2department = response.data.department;
                                        $scope.TM2empName = response.data.empName;
                                        $scope.TM2grade = response.data.grade;
                                        $scope.TM2businessUnit = response.data.businessUnit;
                                        $scope.TM2DepartmentCar = response.data.DepartmentCar;
                                       
                                    }
                                    else {
                                        $scope.testmsg2 = "";
                                        $scope.TM2department = $scope.TM2empName = $scope.TM2grade = $scope.TM2businessUnit = null;
                                    }
                                }, function (x) {
                                    // Request error
                                });
                                $scope.TM2image = response.data[3].Image;
                                $("#image_upload_preview_3").attr("src", $scope.TM2image);
                                $("#sucessalert_3").show();
                            }
                            if (response.data[4] != response.data.length[i]) {
                                $scope.TM3CircleId = response.data[4].CircleId;
                                $scope.TM3empCode = response.data[4].EmpCode;
                                $http({ url: '/QCC.Web/TeamRegistration/FetchEmployeeDetailsByEmpCode', method: "GET", params: { empCode: response.data[4].EmpCode } }).then(function (response) {
                                    // Request completed successfully
                                    if (response.data.empCode != null) {
                                        $scope.testmsg3 = "";
                                        $scope.TM3empCode = response.data.empCode;
                                        $scope.TM3department = response.data.department;
                                        $scope.TM3empName = response.data.empName;
                                        $scope.TM3grade = response.data.grade;
                                        $scope.TM3businessUnit = response.data.businessUnit;
                                        $scope.TM3DepartmentCar = response.data.DepartmentCar;
                                    }
                                    else {
                                        $scope.testmsg3 = "";
                                        $scope.TM3department = $scope.TM3empName = $scope.TM3grade = $scope.TM3businessUnit = null;
                                    }
                                }, function (x) {
                                    // Request error
                                });
                                $scope.TM3image = response.data[4].Image;
                                $("#image_upload_preview_4").attr("src", $scope.TM3image);
                                $("#sucessalert_4").show();
                            }
                          
                            if (response.data[5] != response.data.length[i]) {
                                $scope.TM4CircleId = response.data[5].CircleId;
                                $scope.TM4empCode = response.data[5].EmpCode;
                                $http({ url: '/QCC.Web/TeamRegistration/FetchEmployeeDetailsByEmpCode', method: "GET", params: { EmpCode: response.data[5].EmpCode } }).then(function (response) {
                                    // Request completed successfully
                                    if (response.data.empCode != null) {
                                        $scope.testmsg4 = "";
                                        $scope.TM4empCode = response.data.empCode;
                                        $scope.TM4department = response.data.department;
                                        $scope.TM4empName = response.data.empName;
                                        $scope.TM4grade = response.data.grade;
                                        $scope.TM4businessUnit = response.data.businessUnit;
                                        $scope.TM4DepartmentCar = response.data.DepartmentCar;
                                       
                                    }
                                    else {
                                        $scope.testmsg4 = "";
                                        $scope.TM4department = $scope.TM4empName = $scope.TM4grade = $scope.TM4businessUnit = null;
                                    }
                                }, function (x) {
                                    // Request error
                                });
                                $scope.TM4image = response.data[5].Image;
                                $("#image_upload_preview_5").attr("src", $scope.TM4image);
                                $("#sucessalert_5").show();
                            }
                          
                        }
                  
                    var data = "Circle name is registered,please try with other name";
                    $scope.StatusMessage = "";
                    error.style.color = "red";
                    error.innerHTML = data;
                    $("#createteamtable").show();
                    $("#sucessalert").hide();
                    $("#sucessalert_1").hide(); $("#sucessalert_2").hide(); $("#sucessalert_3").hide(); $("#sucessalert_4").hide(); $("#sucessalert_4").hide(); $("#sucessalert_5").hide(); $("#sucessalert_6").hide();
                    //document.getElementById('image_upload_preview').setAttribute('src', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBdRXhpZgAASUkqAAgAAAABAA4BAgA7AAAAGgAAAAAAAABCdXNpbmVzc21hbiBzaWxob3VldHRlIGFzIGF2YXRhciBvciBkZWZhdWx0IHByb2ZpbGUgcGljdHVyZf/hAx1odHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvAAk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6SXB0YzR4bXBDb3JlPSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wQ29yZS8xLjAveG1sbnMvIiB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIiBwaG90b3Nob3A6Q3JlZGl0PSJHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG8iIEdldHR5SW1hZ2VzR0lGVDpBc3NldElEPSI0NzYwODUxOTgiID4KPGRjOmNyZWF0b3I+PHJkZjpTZXE+PHJkZjpsaT5Lcml0Y2hhbnV0PC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5CdXNpbmVzc21hbiBzaWxob3VldHRlIGFzIGF2YXRhciBvciBkZWZhdWx0IHByb2ZpbGUgcGljdHVyZTwvcmRmOmxpPjwvcmRmOkFsdD48L2RjOmRlc2NyaXB0aW9uPgoJCTwvcmRmOkRlc2NyaXB0aW9uPgoJPC9yZGY6UkRGPgr/7QCIUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAGwcAlAACktyaXRjaGFudXQcAngAO0J1c2luZXNzbWFuIHNpbGhvdWV0dGUgYXMgYXZhdGFyIG9yIGRlZmF1bHQgcHJvZmlsZSBwaWN0dXJlHAJuABhHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG//2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/wgALCAJkAmQBAREA/8QAGwABAAIDAQEAAAAAAAAAAAAAAAUGAwQHAgH/2gAIAQEAAAABuYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADx7AAAAAAAAAAAAPNe1ZD399Z932AAAAAAAAAAB8gYaNwA35uwZwAAAAAAAAAGtWILGAHu0WX6AAAAAAAAAEZRsQABK3bMAAAAAAAAAeOcYAAAkOgfQAAAAAAAAFep4AAF7lgAAAAAAAANSh6oAAC32IAAAAAAAAMHPdcAAA99JygAAAAAAACn14AAALpOgAAAAAAADmmEAAALLbAAAAAAAADFzL6AAAFguIAAAAAAAB85d9AAACy2wAAAAAAAAc0wgAABbbIAAAAAAAAOeaIAAAXSdAAAAAAAAFDigAAAvkqAAAAAAAAKXBAAAB0TdAAAAAAAAFSrYAAA89PyAAAAAAAACtVMAAAeungAAAAAAACPouAAAAepy5gAAAAAAAFep4AAANjpIAAAAAAABB0oAAAG50UAAAAAAAAjufgAAAl70AAAAAAAAeeY/AAAAtFpAAAAAAAAFBjAAAAvcsAAAAAAAAKxVQAAB76Z6AAAAAAAAGvzvEAAA+WW2gAAAAAAAA80SLAAAu80AAAAAAAAAq1XAAB96ZkAAAAAAAAAR/PgAAS17AAAAAAAAAHO9IAALnPAAAAAAAAACt1IAAZukewAAAAAAAABj5xhAALTaAAAAAAAAAAUOKAAL5KgAAAAAAAAA57oAAF1nAAAAAAAAAAc21wAC3WMAAAAAAAAAHL/gABZ7UAAAAAAAAAGPmHoAAsFxAAAAAAAAADS52AAJq7gAAAAAAAABF0IAASd+AAAAAAAAAI35u85xAAFmtddn/AGAAAAAAAAPNXrN8lNGia4AFht/2j6VzkgAAAAAAAI+FgtV0TdatE0wAtNoKZApmamMwAAAAAAPMVDw2sHRtswUWPALfYhT68PsnMzO2AAAAADFDw0RjA+dI2hjo8UD1dJsKhXQPm/MzMh9AAAADUhoaM+AB0bbDzS4Qe7xLAp9eADPMzEt7AAAGKDj4vS+gAOi7gPlRrrNepECmwAAD1KSExJgAAh6XiAAB0LfAwc7w2W2AKVBgAAmLplAAIyhfAAAL9Jgx0KPLlPgUeGAAAlL59AAc80QAAF5mA80aJH27zIKFFgAALnPAARtAAAALnPBVquD10nMHPdAAABJ34ACpVsAAAtNoDDQtELbZA+czxgAAHSdgAHOdQAAAlL6DDRI8t9iBHc/AAAFwsIAafOfoAAB96VmD5zzSLjYAVWsAAACYvIAVupAAABcLCEBTRsdH9BznUAAAHvpnoAUSJAAACTvw+c61At9iEbQAAAAXuWAPPMvIAAAOibpE0QG/0IU2AAAABZrWARdCAAAAsduK9TwZOmmLm3gAAAEj0AArFVAAAAy9J9qtVweeo+lcqIAAAH3pvsBRYgAAABcbAp9eB86RtOdaYAAAC+SoDmmEAAABvdDUiFAv8lEUUAAAAtdmA1eb/QAAAC9y1BjALxM0SJAAAAJq7gQtIAAAAEveuc6gFwk+eAAAADb6MBV6sAAAAHQ6DiAtOpAgAAAD51D0ClwQAAAATsB6Amob4AAAAPnRN4GOCr8d9AAAAffgD78AAAAPc3YZIAaMDB6wAAAAAAAAA+ys5N5AACOhYbR+gAAAAAAAHqWmZrMAAAakRExWMAAAAAAB835WWlfYAAAB80IuNjtT6AAAAAH2QkpOUzgAAAAAwR2ho6Wnj+gAAB82d3e3pDf+gAAAAAADX09XW19fDiw+PHj5695PebNm2NnZ29z2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/xAAuEAABBAECBQMEAgMBAQAAAAADAQIEBQAgQBESEzBQEBQxISIkNBUjMzVgcID/2gAIAQEAAQUC/wDPEcjv+M4ouWASieK5cmJbxlz+WiZ/KxM/lIeNnRXY1zXp/wAGq8ElHhOxLOQNSkQjtPwo50oWBuEwRhnb54xxR2HtyOwhHlXtsc4botsi58+cmzGxBkI8z+/Dnvi4MrDM8y9yMYczpBtjDlrEL8p5i3Nyg2daZpIfl5EkcYcg7pJtn8LWzlL5YxWgEc75Bdq17hvG9Cj8pbn5i7eoJzQ/KFJ1TbelX7/JkXgNPjb0/wCz5RPom3pU+/yhk5ZG3pk/p8pNbyztvUJwheUs04T9vWJwr/KW6fmbeGnCF5S6T+zbL8Mbys8pdN/r2zW8zvKTTrGivOYqbZFVrq+aX3Xk7n9XcR/2vJ27eMLcRG80zyc9nPB3FWzmn+TVEcitVi7emZ5WxH0523rB9OD5S5F9u2YxSkREanlDiQ4SjfHJtOOVMVVf5ZURcsmck/Z1wG+x8xcj2aNVysajGeYnC60PZVgupN81LD0JWxqQ8kbzVwDmFsBCUxmtRjfNPYhGFE4Be/Tx/p5yzXjP79YvGv8AOTl5p3fqF4wvOSF4ye/TL+P5zjzL36VfOEdyjT479Mv5Hm5i8IewqV4TvN2K8IGwrf8AYeZlTRRUgFIeOUaFEQTwk79TGdzY6xWPNa5r2+UVUaku2xfqtcnLAyVFHKGcBI5O7Arup62qcJ0eUWK6LOFKTyJZ0YOFucPJNJX0h/peh445I5MYkUnbgVui4T8v0DaSB4K3A7BlGVPFKqIhbOKPC3BFwsgxtUX9T1KJhxy4b4j+zArulpuf8+hPoorKULBXI1wUkB/CvIwSFto7MLbSH497yr2I36uh7GkZNguirqRFc6BXpH1XP+bsCmyQ4K5XBT4xt+WUAGEuRphbKUXF4uXtxf1NKojknV6x9LGOI+FBbFbquf8AP2xHMHBXBm4K0ikxrmvTbPIwTS3AW464MuElyDbCH+lrn13T9RCeckSGyIzXcftd5rnMUdnKHjbpcBYRzrsps9sXClId+yhfWDrKVgBlehS5UyRs7Nv+7soliSPjCNKzvzpftQqquXZ1y8YGp72jZMlulk9a6d1k12y8Z2zgTFil78yR7mTtKv8A1+lVREnTVlP0fVFgTvcs1WS8bDaVMjqA7s8vRh7WnXjD03BCpra5zHiV7haZy8Z20ri9Kb3bkvF+1pX/AE0lEww5UV8Qmmur+nrI/qF2oSdYHcll60va1pOnO1FEww5kR0QnrArulrnl6ULbU5eaP25ZejF23FWqIiFFqlyPdSPWqk9QOq5Lt6snJN7dyTgLb05eaPptpHTBoAZY52uRzdMo3XlbZr1G9FRydqzJ1J23rzdGZplH9zI01B+YWiwN0Ie4rSdSD2VVERz+o/cRDe4jetmRRwdUEiim6Lc3PI3FMT7uzYk6cHc05uD/AFuV/G1DXlL6kegxuepH7ivJ053ZuX/buRkUJWuR7fS6XWvwi8U9Lg/KLc8VarXI9vYtH887dVB+cHpcr/frirzRfSWf3EndVr+eD2Cv6h91DP7eV6Wy8Z2uvXmgZZH6MTd0r/s1yX9KMnxu64/XiZYrxsNdUvGBlkfrS93Uv5Zuu2fywd5WH6MvJa80zXTL+LMP7aNvIj+SZrunfTewz+5jEXmNrpV+lsfqH3nHhjV5m6rhfy97VSOkZPjXXHSOiqrl3sJeMLU9jSNNUCdhoMkG8+PCsa4jg1Bn4CBHj9s0OOfC0zkwsY4PNp9yirJJcDUAZjGNG3vlgRjYWmXCw5IfKta4iiq5JMFUAbgxDEm1LGAfCU4lwlVKZjxkF44cKSXB0xFwdXFHjWtYm8JBilx9MNcfUyW4+NIHnHwjUV6sr5ZMZTEXGVMVuDCMXhXhEXH1cR2PpW46okpjoMpmOa5mcdxxTGxzvxtZLdjKYi4ynAmMgRR4icE8c4ASY6tiOx1PGXHUqY6mLi1MpMWtmJiwZaZ7aQmdEyZyuT14LnTIudA+JEkrn8fMXEq5a4lPIxKV2JTCxtVETGwYrca1rU/+Af/EAEEQAAECAgUHCAkCBQUAAAAAAAECAwAREiExQFEgIjBBUGFxECMyUmJygbEEEzNCgpGSocFDcxQ0YNHwY3CAorL/2gAIAQEABj8C/wBvDIzlV/Rlsfxfoyik/qS8451oK3piumPhjpK+mOmfpMe1/wChj26PEyiaVAjd/QkzE/X0XBYtq37RJLgdGK0SikGktnXRsypioxU8TuVXEn25dpMUm1hQ3bfpOqoiJMJoDFVsTcWpfE6SmhRSrEQEek5p6+rbuK1dERTcVSVcKJzmurhwgLbVSSdtFaqgkTMKdVrsGAuU/wBM9IRMbZDQtcNfC6ITSFJAkRtim4eA1mC6qrAYC6TFRGuPUPHP91WO1lOLsTBcX4DC7BaekkzEJcTYoT2qlgWIrPG8UeoqW1VudZU7w8ngdqKItleV9zasrw8eH52q6MFnzvDqu3Larw7V4n1lHaq98jeG/Hz2qk4o/JvDPcG1WTiDdzCU4CW1WldqV3SnEy2qpY6VgiTjilCc67uFCoisQltxwrSurO1bUR+5+DeWf3E+e1J9VQN5ZHbntR0dmfyvIPVST+PztQg2GCg2pMrw65wTtVeCs68IxVnbVbeGo0Td0ti1RlAAsG1VNKsUILbokR97t/EqFQ6H99r1icL7UlXRumgGedWNstO/CbmEi1RkICBYkSG2XEC2UxcwdTYpbbWjVanhci4bXD9ttpfFqKjwuKWk2qMBKRICobbKFWKEjCmlWpNwV6QrXmp26vcALg34+e3XjvuEsFHbrx/1FedwcHb/ABt0qxM7g+O7+duKVgLi4nFO3Hu4bjxQduO8Li14+W2q85epIj1rnvKMpaoU2bFCUFtwSULgfSFCQlJHI4y9W3OpWEBSSCDrG1ZqMgNZih6N9f8AaJkzJ1mGuE+Siqojoqwj1bgr1HHTB58Znupx5eKAYm2ataTYYkDRX1TtLOdE8BXHMteK451cx1dXKx+2OWg4PHCKK6x7qsdIHvSB3Uf3yEnsfnlkqTg32xzgU2fmIm2tKhuOy5kyEdOmexXHNNhO9Vcc46pW7VlM/tjyyChwTBivObNitDKA6+Jr1J6uS33cmYMjiI6dMduOdbUjeK45t1Kt2vYs3FpSN5jMpOHcIzAlsfMxNxal8ToWu4MkoWJpOqKSc5rHDLCUiZNgj1jlbv8A5ymu6dDmumWCq455nxRFToBwVVf+cdSN2uOabUreao6dAdiKSiScTpGe4PLKkRMGC41W1h1ckIQKSjqiZznDarLb7uk5p1Sd2qOcQlfCqK1Fs9oRSSoKGIu9JagkYmOaQpz7CM1tCeNcZ7ypYCq4Mftp8tAXmBm+8jDlDbYmfKKq1m1WgR3NPNCik4pMorUF94RnsfSqJBdFXVVVc6Cc53DCKbqqRubPcGgLizICFLCAgKNg5PUKSEqUaldbQp/bHmbnRXNxv7iAtBmk2G4THTVUkQVKMybTdGuGWVrMki0xOxsdFOR6l084LD1tBwQLpJR5pXS3b7gpfuipPC6o4nzypkyAiin2SbN+TMGRFhigup1Nu/Lc3S8rr6pXSb8tMs6zmi7EYLOUhuxo68ThlhaDJQslCC4misisZTx33VGC806ZtnDON2db3hWUW1iaTFFVaT0VZQfeGf7qcMtbnWUTdarYQ4PeE9K4vVOQuyMF5uWUOCYMSnSSronIDz0ivUMMtxWuUhd1NdQ/Y6RxzWBVxu4Um0ViEuCxQnllz3bE8Mj1KjnN2cMttn4jdwnU4JaRtrrGd4U0bWz9sr1Kek55ZKXRqt3iApJmDZlOOapyHC7pcFqTOARYdGodQUbwjBeacpTuqxPDKLBtRZwyVkdI5ovKMUZuimbBClm1RneUOayK+OQuVqs3LaI1mifHJSyLGxXxvLrXxD/PlonO0KPzvS2D72cMhA7f4OWhWCgchS1WJEzClqtUZ3lvBWadE03iaV6S6m1JnAUmsETHKynidBPlSwLV1nhegoWisQFCwiehI6gAvZZNrflytpwToGjigcq3NVieF7b7OboXHOsom9oWejYrhy8EDQNcJchA6S80Xx1vAz/z5aBxeCTfRPpIzTyO7peWgSMCfPkIHRbzR+b5R66dAR1yBfQk9Fyrx1cjx7Z0Cxg5+BCnNdieN9ZV2pfjQMoxJP8AnzvyXNdiuMOKxUToHk8DAZFjdvG+zFogEa8tI1UL8WldFdnHQ+kLOpAMFSqyazfmZ9QZdFaQoYGJsqLZwtEZzdIYor/oGihJUdwibqg2MLTE0omrrKrOjz2xPEVGJsuz3LjnGlAY6tt0QJnARWkNjtRNwlw/IRRQkJGAFwzmgDimqOZd8FxnsqliK9qyQkqPZE4zgGx2jHOKU59hEm0JSNwu3ONJVv1xzbikfcRm0XOBjnEKRxGzs1lXxVRzroTuTXFaKZ7cSSABgL7nMp8Ko5t1SeNcZtBfjKM9lY8J7FkhJUeyJx7GXeqjnHkjuicZwUvvGObbSngNi842lXER0CnumObfUO8JxmqbV4yithXhXGehSe8JXrNZcPwx7MJ7yoz3kjgJxnLWrxiphPjXEhs/PaQrimPYgcCRFSnE8DGa+RxTOM15J4iUfpn4o9jPgoR7BUfy7v0GK2XPoMdBXy5bD8oqbX9Mewd+gx7Bz5R7A/MR0EjiqK1tjxMV+kD6IznXDwlFaVK4qiphHiJxJIA4f8Av/8QALRAAAQICCAcBAQEBAQEAAAAAAQARITFAQVFhcYGRoSAwULHB0fDhEPFgcID/2gAIAQEAAT8h/wDPIUnHNUf+MDgAC0C1ShSVgrgSZWhQF8bHQ+0Kguz6L/Qr7bwgasPmxScf0mr0JE//AAgCEAAmSjbmhiCRuepcUW1FuWxTmAkMuyq4gKgKxAqWX84xRTE50af6sSpJY2dfbFqLTgE7g41okN05mYzcwNCVYyMsJACbGz6SBAOC4NfXAiH2SbkenErNVwoBMP11b4qQikgR1oujoSwKaz4gKFEskv7i9AgBHBkR1l/3YH61EAokRIhoDbrEDOwmXIfMUNkogcBjIAWIReIAPYbDf1YtTCc33IjcTgDZRjDsgS7EGfVXsws9LbvSIlmbJPz1WN7vBhVtSMUAW/51QkmDI0UvCkPu/bqhDhigLiYhSMBgeqmRqe6kY82APfVcyGofzSHS0vHjqrvs7DeKQzTW7Uj1VqyNHKkxftuqsWE6N7o8JrldZdVYHLUPyj3G+o9VbHkdtKqjUHX8aOcFyCWFAkVzHdV1TYqSfGsdU+KkvNJwtaI+OqXXeV4/42qQZTgYqYSDxEKRPxWA7nuOqsdmZHOe4NIikTTzls3VXBHaDLtvR5YrfY6GWwGAs6rU+B7DUVtgMFouorBMpyICZ1bz+W9Xg4sQV3BBo3cGiAvEZmJmGzdZhhEie8OxochuYhQVWEwB1kog+siKBcPQn7EYWMh7y6214Z+c+bKhNanskB5OfW2AxM1+96DVaJ7BWdExcYBYOtgscwFyqjU9oqNAYBeDWfGXXWf/AJD+aA5TUzQuu5adABQMEbz567eJ3FAwm/Z666b4VARsV1xeRlQjhQGbInQ/vXHP9shKgQixbg+OuGKFgakUEiGq27utNs3RFRzsCf8Ah2AIAINspz7I2Laygi0XUB9aaK3mf4B1gGhESAYisRUduwI4PVT8SMJGATj55js8oiQ6IJHJTatLUSf4y+pEzRGyqEhtHNkiwnMXebrviAwYfx/P0EeFGpP5FakRMZ+VvUnwHhftlNGbeB7UUAJBAMv6LfTD+mL0VBMrQp7mSIfu7lksmZnMtV/pwYmEbv5IggkERBFSDhn4dSYxeIbgV4YnulkQQJkpxAuwd0t1Bw9o5O7QbTaBBAAS4DJCw7Oy4BxVp+E/mb+SASQAJJLACZQSCTar9cIR7/fhIjOHIjEJiDRVA+80wg5at9qeRe7J9Fv7E0oMOCBqVA7pDcMNk/EYzcgyK+/ZwjwisSUXxTCtdPvjPhPYEygYYMMrg98X2LeQQDMKYfAd0EwcvPB9qDYwO9PfnkWn0CKhB21b7TkG2QNvNGSQ5kcnlmSJyfbOIhGAYgiBR8I10x/PCTvIgoOgsK4Xccne78tnUhEVD2STABtsVMgsg1vJDJRkRxRzEf1jJwBC33R2W/cPoteBZsgAJDn/AALHHNFiOcG8XXKf8f5ugWlNS3MRPocg4NnkefjOcFDg/wBRDJ7CIrPgIQc+L16NDDMAwhVvFOA1byGAqoZ5E25Oab5wAqv4WLgnZG+z5+RKUICAZouD2EnR9IV8VwUAEMOcrcAiEDnJMmiPK8NCeMSEVyVKe3+0N/A3QFEqe+RkA70RxB2C0gLhxzyDS+lq850U3DZ3fERjAOSZBPNINBbtPCCAUQ4JgoTwAILNo42jc7PdFIczwRfV9ac5tyw80w/ckICi3ITsfPE1AIbkNR3/AM4zqD3OZ0MoBIqjxYeRoAKLFx8lLducwhgHiHmjYLAzgew4mBdiF3yI/eGSxBibzf24/wDSJNFciJMEQbCh1C2Wc1gy');
                    //document.getElementById("image_upload_preview").src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBdRXhpZgAASUkqAAgAAAABAA4BAgA7AAAAGgAAAAAAAABCdXNpbmVzc21hbiBzaWxob3VldHRlIGFzIGF2YXRhciBvciBkZWZhdWx0IHByb2ZpbGUgcGljdHVyZf/hAx1odHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvAAk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6SXB0YzR4bXBDb3JlPSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wQ29yZS8xLjAveG1sbnMvIiB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIiBwaG90b3Nob3A6Q3JlZGl0PSJHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG8iIEdldHR5SW1hZ2VzR0lGVDpBc3NldElEPSI0NzYwODUxOTgiID4KPGRjOmNyZWF0b3I+PHJkZjpTZXE+PHJkZjpsaT5Lcml0Y2hhbnV0PC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5CdXNpbmVzc21hbiBzaWxob3VldHRlIGFzIGF2YXRhciBvciBkZWZhdWx0IHByb2ZpbGUgcGljdHVyZTwvcmRmOmxpPjwvcmRmOkFsdD48L2RjOmRlc2NyaXB0aW9uPgoJCTwvcmRmOkRlc2NyaXB0aW9u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';
                    //document.getElementById("image_upload_preview_1").src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBdRXhpZgAASUkqAAgAAAABAA4BAgA7AAAAGgAAAAAAAABCdXNpbmVzc21hbiBzaWxob3VldHRlIGFzIGF2YXRhciBvciBkZWZhdWx0IHByb2ZpbGUgcGljdHVyZf/hAx1odHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvAAk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6SXB0YzR4bXBDb3JlPSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wQ29yZS8xLjAveG1sbnMvIiB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIiBwaG90b3Nob3A6Q3JlZGl0PSJHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG8iIEdldHR5SW1hZ2VzR0lGVDpBc3NldElEPSI0NzYwODUxOTgiID4KPGRjOmNyZWF0b3I+PHJkZjpTZXE+PHJkZjpsaT5Lcml0Y2hhbnV0PC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5CdXNpbmVzc21hbiBzaWxob3VldHRlIGFzIGF2YXRhciBvciBkZWZhdWx0IHByb2ZpbGUgcGljdHVyZTwvcmRmOmxpPjwvcmRmOkFsdD48L2RjOmRlc2NyaXB0aW9uPgoJCTwvcmRmOkRlc2NyaXB0aW9uPgoJPC9yZGY6UkRGPgr/7QCIUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAGwcAlAACktyaXRjaGFudXQcAngAO0J1c2luZXNzbWFuIHNpbGhvdWV0dGUgYXMgYXZhdGFyIG9yIGRlZmF1bHQgcHJvZmlsZSBwaWN0dXJlHAJuABhHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG//2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/wgALCAJkAmQBAREA/8QAGwABAAIDAQEAAAAAAAAAAAAAAAUGAwQHAgH/2gAIAQEAAAABuYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADx7AAAAAAAAAAAAPNe1ZD399Z932AAAAAAAAAAB8gYaNwA35uwZwAAAAAAAAAGtWILGAHu0WX6AAAAAAAAAEZRsQABK3bMAAAAAAAAAeOcYAAAkOgfQAAAAAAAAFep4AAF7lgAAAAAAAANSh6oAAC32IAAAAAAAAMHPdcAAA99JygAAAAAAACn14AAALpOgAAAAAAADmmEAAALLbAAAAAAAADFzL6AAAFguIAAAAAAAB85d9AAACy2wAAAAAAAAc0wgAABbbIAAAAAAAAOeaIAAAXSdAAAAAAAAFDigAAAvkqAAAAAAAAKXBAAAB0TdAAAAAAAAFSrYAAA89PyAAAAAAAACtVMAAAeungAAAAAAACPouAAAAepy5gAAAAAAAFep4AAANjpIAAAAAAABB0oAAAG50UAAAAAAAAjufgAAAl70AAAAAAAAeeY/AAAAtFpAAAAAAAAFBjAAAAvcsAAAAAAAAKxVQAAB76Z6AAAAAAAAGvzvEAAA+WW2gAAAAAAAA80SLAAAu80AAAAAAAAAq1XAAB96ZkAAAAAAAAAR/PgAAS17AAAAAAAAAHO9IAALnPAAAAAAAAACt1IAAZukewAAAAAAAABj5xhAALTaAAAAAAAAAAUOKAAL5KgAAAAAAAAA57oAAF1nAAAAAAAAAAc21wAC3WMAAAAAAAAAHL/gABZ7UAAAAAAAAAGPmHoAAsFxAAAAAAAAADS52AAJq7gAAAAAAAABF0IAASd+AAAAAAAAAI35u85xAAFmtddn/AGAAAAAAAAPNXrN8lNGia4AFht/2j6VzkgAAAAAAAI+FgtV0TdatE0wAtNoKZApmamMwAAAAAAPMVDw2sHRtswUWPALfYhT68PsnMzO2AAAAADFDw0RjA+dI2hjo8UD1dJsKhXQPm/MzMh9AAAADUhoaM+AB0bbDzS4Qe7xLAp9eADPMzEt7AAAGKDj4vS+gAOi7gPlRrrNepECmwAAD1KSExJgAAh6XiAAB0LfAwc7w2W2AKVBgAAmLplAAIyhfAAAL9Jgx0KPLlPgUeGAAAlL59AAc80QAAF5mA80aJH27zIKFFgAALnPAARtAAAALnPBVquD10nMHPdAAABJ34ACpVsAAAtNoDDQtELbZA+czxgAAHSdgAHOdQAAAlL6DDRI8t9iBHc/AAAFwsIAafOfoAAB96VmD5zzSLjYAVWsAAACYvIAVupAAABcLCEBTRsdH9BznUAAAHvpnoAUSJAAACTvw+c61At9iEbQAAAAXuWAPPMvIAAAOibpE0QG/0IU2AAAABZrWARdCAAAAsduK9TwZOmmLm3gAAAEj0AArFVAAAAy9J9qtVweeo+lcqIAAAH3pvsBRYgAAABcbAp9eB86RtOdaYAAAC+SoDmmEAAABvdDUiFAv8lEUUAAAAtdmA1eb/QAAAC9y1BjALxM0SJAAAAJq7gQtIAAAAEveuc6gFwk+eAAAADb6MBV6sAAAAHQ6DiAtOpAgAAAD51D0ClwQAAAATsB6Amob4AAAAPnRN4GOCr8d9AAAAffgD78AAAAPc3YZIAaMDB6wAAAAAAAAA+ys5N5AACOhYbR+gAAAAAAAHqWmZrMAAAakRExWMAAAAAAB835WWlfYAAAB80IuNjtT6AAAAAH2QkpOUzgAAAAAwR2ho6Wnj+gAAB82d3e3pDf+gAAAAAADX09XW19fDiw+PHj5695PebNm2NnZ29z2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/xAAuEAABBAECBQMEAgMBAQAAAAADAQIEBQAgQBESEzBQEBQxISIkNBUjMzVgcID/2gAIAQEAAQUC/wDPEcjv+M4ouWASieK5cmJbxlz+WiZ/KxM/lIeNnRXY1zXp/wAGq8ElHhOxLOQNSkQjtPwo50oWBuEwRhnb54xxR2HtyOwhHlXtsc4botsi58+cmzGxBkI8z+/Dnvi4MrDM8y9yMYczpBtjDlrEL8p5i3Nyg2daZpIfl5EkcYcg7pJtn8LWzlL5YxWgEc75Bdq17hvG9Cj8pbn5i7eoJzQ/KFJ1TbelX7/JkXgNPjb0/wCz5RPom3pU+/yhk5ZG3pk/p8pNbyztvUJwheUs04T9vWJwr/KW6fmbeGnCF5S6T+zbL8Mbys8pdN/r2zW8zvKTTrGivOYqbZFVrq+aX3Xk7n9XcR/2vJ27eMLcRG80zyc9nPB3FWzmn+TVEcitVi7emZ5WxH0523rB9OD5S5F9u2YxSkREanlDiQ4SjfHJtOOVMVVf5ZURcsmck/Z1wG+x8xcj2aNVysajGeYnC60PZVgupN81LD0JWxqQ8kbzVwDmFsBCUxmtRjfNPYhGFE4Be/Tx/p5yzXjP79YvGv8AOTl5p3fqF4wvOSF4ye/TL+P5zjzL36VfOEdyjT479Mv5Hm5i8IewqV4TvN2K8IGwrf8AYeZlTRRUgFIeOUaFEQTwk79TGdzY6xWPNa5r2+UVUaku2xfqtcnLAyVFHKGcBI5O7Arup62qcJ0eUWK6LOFKTyJZ0YOFucPJNJX0h/peh445I5MYkUnbgVui4T8v0DaSB4K3A7BlGVPFKqIhbOKPC3BFwsgxtUX9T1KJhxy4b4j+zArulpuf8+hPoorKULBXI1wUkB/CvIwSFto7MLbSH497yr2I36uh7GkZNguirqRFc6BXpH1XP+bsCmyQ4K5XBT4xt+WUAGEuRphbKUXF4uXtxf1NKojknV6x9LGOI+FBbFbquf8AP2xHMHBXBm4K0ikxrmvTbPIwTS3AW464MuElyDbCH+lrn13T9RCeckSGyIzXcftd5rnMUdnKHjbpcBYRzrsps9sXClId+yhfWDrKVgBlehS5UyRs7Nv+7soliSPjCNKzvzpftQqquXZ1y8YGp72jZMlulk9a6d1k12y8Z2zgTFil78yR7mTtKv8A1+lVREnTVlP0fVFgTvcs1WS8bDaVMjqA7s8vRh7WnXjD03BCpra5zHiV7haZy8Z20ri9Kb3bkvF+1pX/AE0lEww5UV8Qmmur+nrI/qF2oSdYHcll60va1pOnO1FEww5kR0QnrArulrnl6ULbU5eaP25ZejF23FWqIiFFqlyPdSPWqk9QOq5Lt6snJN7dyTgLb05eaPptpHTBoAZY52uRzdMo3XlbZr1G9FRydqzJ1J23rzdGZplH9zI01B+YWiwN0Ie4rSdSD2VVERz+o/cRDe4jetmRRwdUEiim6Lc3PI3FMT7uzYk6cHc05uD/AFuV/G1DXlL6kegxuepH7ivJ053ZuX/buRkUJWuR7fS6XWvwi8U9Lg/KLc8VarXI9vYtH887dVB+cHpcr/frirzRfSWf3EndVr+eD2Cv6h91DP7eV6Wy8Z2uvXmgZZH6MTd0r/s1yX9KMnxu64/XiZYrxsNdUvGBlkfrS93Uv5Zuu2fywd5WH6MvJa80zXTL+LMP7aNvIj+SZrunfTewz+5jEXmNrpV+lsfqH3nHhjV5m6rhfy97VSOkZPjXXHSOiqrl3sJeMLU9jSNNUCdhoMkG8+PCsa4jg1Bn4CBHj9s0OOfC0zkwsY4PNp9yirJJcDUAZjGNG3vlgRjYWmXCw5IfKta4iiq5JMFUAbgxDEm1LGAfCU4lwlVKZjxkF44cKSXB0xFwdXFHjWtYm8JBilx9MNcfUyW4+NIHnHwjUV6sr5ZMZTEXGVMVuDCMXhXhEXH1cR2PpW46okpjoMpmOa5mcdxxTGxzvxtZLdjKYi4ynAmMgRR4icE8c4ASY6tiOx1PGXHUqY6mLi1MpMWtmJiwZaZ7aQmdEyZyuT14LnTIudA+JEkrn8fMXEq5a4lPIxKV2JTCxtVETGwYrca1rU/+Af/EAEEQAAECAgUHCAkCBQUAAAAAAAECAwAREiExQFEgIjBBUGFxECMyUmJygbEEEzNCgpGSocFDcxQ0YNHwY3CAorL/2gAIAQEABj8C/wBvDIzlV/Rlsfxfoyik/qS8451oK3piumPhjpK+mOmfpMe1/wChj26PEyiaVAjd/QkzE/X0XBYtq37RJLgdGK0SikGktnXRsypioxU8TuVXEn25dpMUm1hQ3bfpOqoiJMJoDFVsTcWpfE6SmhRSrEQEek5p6+rbuK1dERTcVSVcKJzmurhwgLbVSSdtFaqgkTMKdVrsGAuU/wBM9IRMbZDQtcNfC6ITSFJAkRtim4eA1mC6qrAYC6TFRGuPUPHP91WO1lOLsTBcX4DC7BaekkzEJcTYoT2qlgWIrPG8UeoqW1VudZU7w8ngdqKItleV9zasrw8eH52q6MFnzvDqu3Larw7V4n1lHaq98jeG/Hz2qk4o/JvDPcG1WTiDdzCU4CW1WldqV3SnEy2qpY6VgiTjilCc67uFCoisQltxwrSurO1bUR+5+DeWf3E+e1J9VQN5ZHbntR0dmfyvIPVST+PztQg2GCg2pMrw65wTtVeCs68IxVnbVbeGo0Td0ti1RlAAsG1VNKsUILbokR97t/EqFQ6H99r1icL7UlXRumgGedWNstO/CbmEi1RkICBYkSG2XEC2UxcwdTYpbbWjVanhci4bXD9ttpfFqKjwuKWk2qMBKRICobbKFWKEjCmlWpNwV6QrXmp26vcALg34+e3XjvuEsFHbrx/1FedwcHb/ABt0qxM7g+O7+duKVgLi4nFO3Hu4bjxQduO8Li14+W2q85epIj1rnvKMpaoU2bFCUFtwSULgfSFCQlJHI4y9W3OpWEBSSCDrG1ZqMgNZih6N9f8AaJkzJ1mGuE+Siqojoqwj1bgr1HHTB58Znupx5eKAYm2ataTYYkDRX1TtLOdE8BXHMteK451cx1dXKx+2OWg4PHCKK6x7qsdIHvSB3Uf3yEnsfnlkqTg32xzgU2fmIm2tKhuOy5kyEdOmexXHNNhO9Vcc46pW7VlM/tjyyChwTBivObNitDKA6+Jr1J6uS33cmYMjiI6dMduOdbUjeK45t1Kt2vYs3FpSN5jMpOHcIzAlsfMxNxal8ToWu4MkoWJpOqKSc5rHDLCUiZNgj1jlbv8A5ymu6dDmumWCq455nxRFToBwVVf+cdSN2uOabUreao6dAdiKSiScTpGe4PLKkRMGC41W1h1ckIQKSjqiZznDarLb7uk5p1Sd2qOcQlfCqK1Fs9oRSSoKGIu9JagkYmOaQpz7CM1tCeNcZ7ypYCq4Mftp8tAXmBm+8jDlDbYmfKKq1m1WgR3NPNCik4pMorUF94RnsfSqJBdFXVVVc6Cc53DCKbqqRubPcGgLizICFLCAgKNg5PUKSEqUaldbQp/bHmbnRXNxv7iAtBmk2G4THTVUkQVKMybTdGuGWVrMki0xOxsdFOR6l084LD1tBwQLpJR5pXS3b7gpfuipPC6o4nzypkyAiin2SbN+TMGRFhigup1Nu/Lc3S8rr6pXSb8tMs6zmi7EYLOUhuxo68ThlhaDJQslCC4misisZTx33VGC806ZtnDON2db3hWUW1iaTFFVaT0VZQfeGf7qcMtbnWUTdarYQ4PeE9K4vVOQuyMF5uWUOCYMSnSSronIDz0ivUMMtxWuUhd1NdQ/Y6RxzWBVxu4Um0ViEuCxQnllz3bE8Mj1KjnN2cMttn4jdwnU4JaRtrrGd4U0bWz9sr1Kek55ZKXRqt3iApJmDZlOOapyHC7pcFqTOARYdGodQUbwjBeacpTuqxPDKLBtRZwyVkdI5ovKMUZuimbBClm1RneUOayK+OQuVqs3LaI1mifHJSyLGxXxvLrXxD/PlonO0KPzvS2D72cMhA7f4OWhWCgchS1WJEzClqtUZ3lvBWadE03iaV6S6m1JnAUmsETHKynidBPlSwLV1nhegoWisQFCwiehI6gAvZZNrflytpwToGjigcq3NVieF7b7OboXHOsom9oWejYrhy8EDQNcJchA6S80Xx1vAz/z5aBxeCTfRPpIzTyO7peWgSMCfPkIHRbzR+b5R66dAR1yBfQk9Fyrx1cjx7Z0Cxg5+BCnNdieN9ZV2pfjQMoxJP8AnzvyXNdiuMOKxUToHk8DAZFjdvG+zFogEa8tI1UL8WldFdnHQ+kLOpAMFSqyazfmZ9QZdFaQoYGJsqLZwtEZzdIYor/oGihJUdwibqg2MLTE0omrrKrOjz2xPEVGJsuz3LjnGlAY6tt0QJnARWkNjtRNwlw/IRRQkJGAFwzmgDimqOZd8FxnsqliK9qyQkqPZE4zgGx2jHOKU59hEm0JSNwu3ONJVv1xzbikfcRm0XOBjnEKRxGzs1lXxVRzroTuTXFaKZ7cSSABgL7nMp8Ko5t1SeNcZtBfjKM9lY8J7FkhJUeyJx7GXeqjnHkjuicZwUvvGObbSngNi842lXER0CnumObfUO8JxmqbV4yithXhXGehSe8JXrNZcPwx7MJ7yoz3kjgJxnLWrxiphPjXEhs/PaQrimPYgcCRFSnE8DGa+RxTOM15J4iUfpn4o9jPgoR7BUfy7v0GK2XPoMdBXy5bD8oqbX9Mewd+gx7Bz5R7A/MR0EjiqK1tjxMV+kD6IznXDwlFaVK4qiphHiJxJIA4f8Av/8QALRAAAQICCAcBAQEBAQEAAAAAAQARITFAQVFhcYGRoSAwULHB0fDhEPFgcID/2gAIAQEAAT8h/wDPIUnHNUf+MDgAC0C1ShSVgrgSZWhQF8bHQ+0Kguz6L/Qr7bwgasPmxScf0mr0JE//AAgCEAAmSjbmhiCRuepcUW1FuWxTmAkMuyq4gKgKxAqWX84xRTE50af6sSpJY2dfbFqLTgE7g41okN05mYzcwNCVYyMsJACbGz6SBAOC4NfXAiH2SbkenErNVwoBMP11b4qQikgR1oujoSwKaz4gKFEskv7i9AgBHBkR1l/3YH61EAokRIhoDbrEDOwmXIfMUNkogcBjIAWIReIAPYbDf1YtTCc33IjcTgDZRjDsgS7EGfVXsws9LbvSIlmbJPz1WN7vBhVtSMUAW/51QkmDI0UvCkPu/bqhDhigLiYhSMBgeqmRqe6kY82APfVcyGofzSHS0vHjqrvs7DeKQzTW7Uj1VqyNHKkxftuqsWE6N7o8JrldZdVYHLUPyj3G+o9VbHkdtKqjUHX8aOcFyCWFAkVzHdV1TYqSfGsdU+KkvNJwtaI+OqXXeV4/42qQZTgYqYSDxEKRPxWA7nuOqsdmZHOe4NIikTTzls3VXBHaDLtvR5YrfY6GWwGAs6rU+B7DUVtgMFouorBMpyICZ1bz+W9Xg4sQV3BBo3cGiAvEZmJmGzdZhhEie8OxochuYhQVWEwB1kog+siKBcPQn7EYWMh7y6214Z+c+bKhNanskB5OfW2AxM1+96DVaJ7BWdExcYBYOtgscwFyqjU9oqNAYBeDWfGXXWf/AJD+aA5TUzQuu5adABQMEbz567eJ3FAwm/Z666b4VARsV1xeRlQjhQGbInQ/vXHP9shKgQixbg+OuGKFgakUEiGq27utNs3RFRzsCf8Ah2AIAINspz7I2Laygi0XUB9aaK3mf4B1gGhESAYisRUduwI4PVT8SMJGATj55js8oiQ6IJHJTatLUSf4y+pEzRGyqEhtHNkiwnMXebrviAwYfx/P0EeFGpP5FakRMZ+VvUnwHhftlNGbeB7UUAJBAMv6LfTD+mL0VBMrQp7mSIfu7lksmZnMtV/pwYmEbv5IggkERBFSDhn4dSYxeIbgV4YnulkQQJkpxAuwd0t1Bw9o5O7QbTaBBAAS4DJCw7Oy4BxVp+E/mb+SASQAJJLACZQSCTar9cIR7/fhIjOHIjEJiDRVA+80wg5at9qeRe7J9Fv7E0oMOCBqVA7pDcMNk/EYzcgyK+/ZwjwisSUXxTCtdPvjPhPYEygYYMMrg98X2LeQQDMKYfAd0EwcvPB9qDYwO9PfnkWn0CKhB21b7TkG2QNvNGSQ5kcnlmSJyfbOIhGAYgiBR8I10x/PCTvIgoOgsK4Xccne78tnUhEVD2STABtsVMgsg1vJDJRkRxRzEf1jJwBC33R2W/cPoteBZsgAJDn/AALHHNFiOcG8XXKf8f5ugWlNS3MRPocg4NnkefjOcFDg/wBRDJ7CIrPgIQc+L16NDDMAwhVvFOA1byGAqoZ5E25Oab5wAqv4WLgnZG+z5+RKUICAZouD2EnR9IV8VwUAEMOcrcAiEDnJMmiPK8NCeMSEVyVKe3+0N/A3QFEqe+RkA70RxB2C0gLhxzyDS+lq850U3DZ3fERjAOSZBPNINBbtPCCAUQ4JgoTwAILNo42jc7PdFIczwRfV9ac5tyw80w/ckICi3ITsfPE1AIbkNR3/AM4zqD3OZ0MoBIqjxYeRoAKLFx8lLducwhgHiHmjYLAzgew4mBdiF3yI/eGSxBibzf24/wDSJNFciJMEQbCh1C2Wc1gy';
                    //document.getElementById("image_upload_preview_2").src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBdRXhpZgAASUkqAAgAAAABAA4BAgA7AAAAGgAAAAAAAABCdXNpbmVzc21hbiBzaWxob3VldHRlIGFzIGF2YXRhciBvciBkZWZhdWx0IHByb2ZpbGUgcGljdHVyZf/hAx1odHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvAAk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6SXB0YzR4bXBDb3JlPSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wQ29yZS8xLjAveG1sbnMvIiB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIiBwaG90b3Nob3A6Q3JlZGl0PSJHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG8iIEdldHR5SW1hZ2VzR0lGVDpBc3NldElEPSI0NzYwODUxOTgiID4KPGRjOmNyZWF0b3I+PHJkZjpTZXE+PHJkZjpsaT5Lcml0Y2hhbnV0PC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5CdXNpbmVzc21hbiBzaWxob3VldHRlIGFzIGF2YXRhciBvciBkZWZhdWx0IHByb2ZpbGUgcGljdHVyZTwvcmRmOmxpPjwvcmRmOkFsdD48L2RjOmRlc2NyaXB0aW9uPgoJCTwvcmRmOkRlc2NyaXB0aW9uPgoJPC9yZGY6UkRGPgr/7QCIUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAGwcAlAACktyaXRjaGFudXQcAngAO0J1c2luZXNzbWFuIHNpbGhvdWV0dGUgYXMgYXZhdGFyIG9yIGRlZmF1bHQgcHJvZmlsZSBwaWN0dXJlHAJuABhHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG//2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/wgALCAJkAmQBAREA/8QAGwABAAIDAQEAAAAAAAAAAAAAAAUGAwQHAgH/2gAIAQEAAAABuYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADx7AAAAAAAAAAAAPNe1ZD399Z932AAAAAAAAAAB8gYaNwA35uwZwAAAAAAAAAGtWILGAHu0WX6AAAAAAAAAEZRsQABK3bMAAAAAAAAAeOcYAAAkOgfQAAAAAAAAFep4AAF7lgAAAAAAAANSh6oAAC32IAAAAAAAAMHPdcAAA99JygAAAAAAACn14AAALpOgAAAAAAADmmEAAALLbAAAAAAAADFzL6AAAFguIAAAAAAAB85d9AAACy2wAAAAAAAAc0wgAABbbIAAAAAAAAOeaIAAAXSdAAAAAAAAFDigAAAvkqAAAAAAAAKXBAAAB0TdAAAAAAAAFSrYAAA89PyAAAAAAAACtVMAAAeungAAAAAAACPouAAAAepy5gAAAAAAAFep4AAANjpIAAAAAAABB0oAAAG50UAAAAAAAAjufgAAAl70AAAAAAAAeeY/AAAAtFpAAAAAAAAFBjAAAAvcsAAAAAAAAKxVQAAB76Z6AAAAAAAAGvzvEAAA+WW2gAAAAAAAA80SLAAAu80AAAAAAAAAq1XAAB96ZkAAAAAAAAAR/PgAAS17AAAAAAAAAHO9IAALnPAAAAAAAAACt1IAAZukewAAAAAAAABj5xhAALTaAAAAAAAAAAUOKAAL5KgAAAAAAAAA57oAAF1nAAAAAAAAAAc21wAC3WMAAAAAAAAAHL/gABZ7UAAAAAAAAAGPmHoAAsFxAAAAAAAAADS52AAJq7gAAAAAAAABF0IAASd+AAAAAAAAAI35u85xAAFmtddn/AGAAAAAAAAPNXrN8lNGia4AFht/2j6VzkgAAAAAAAI+FgtV0TdatE0wAtNoKZApmamMwAAAAAAPMVDw2sHRtswUWPALfYhT68PsnMzO2AAAAADFDw0RjA+dI2hjo8UD1dJsKhXQPm/MzMh9AAAADUhoaM+AB0bbDzS4Qe7xLAp9eADPMzEt7AAAGKDj4vS+gAOi7gPlRrrNepECmwAAD1KSExJgAAh6XiAAB0LfAwc7w2W2AKVBgAAmLplAAIyhfAAAL9Jgx0KPLlPgUeGAAAlL59AAc80QAAF5mA80aJH27zIKFFgAALnPAARtAAAALnPBVquD10nMHPdAAABJ34ACpVsAAAtNoDDQtELbZA+czxgAAHSdgAHOdQAAAlL6DDRI8t9iBHc/AAAFwsIAafOfoAAB96VmD5zzSLjYAVWsAAACYvIAVupAAABcLCEBTRsdH9BznUAAAHvpnoAUSJAAACTvw+c61At9iEbQAAAAXuWAPPMvIAAAOibpE0QG/0IU2AAAABZrWARdCAAAAsduK9TwZOmmLm3gAAAEj0AArFVAAAAy9J9qtVweeo+lcqIAAAH3pvsBRYgAAABcbAp9eB86RtOdaYAAAC+SoDmmEAAABvdDUiFAv8lEUUAAAAtdmA1eb/QAAAC9y1BjALxM0SJAAAAJq7gQtIAAAAEveuc6gFwk+eAAAADb6MBV6sAAAAHQ6DiAtOpAgAAAD51D0ClwQAAAATsB6Amob4AAAAPnRN4GOCr8d9AAAAffgD78AAAAPc3YZIAaMDB6wAAAAAAAAA+ys5N5AACOhYbR+gAAAAAAAHqWmZrMAAAakRExWMAAAAAAB835WWlfYAAAB80IuNjtT6AAAAAH2QkpOUzgAAAAAwR2ho6Wnj+gAAB82d3e3pDf+gAAAAAADX09XW19fDiw+PHj5695PebNm2NnZ29z2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/xAAuEAABBAECBQMEAgMBAQAAAAADAQIEBQAgQBESEzBQEBQxISIkNBUjMzVgcID/2gAIAQEAAQUC/wDPEcjv+M4ouWASieK5cmJbxlz+WiZ/KxM/lIeNnRXY1zXp/wAGq8ElHhOxLOQNSkQjtPwo50oWBuEwRhnb54xxR2HtyOwhHlXtsc4botsi58+cmzGxBkI8z+/Dnvi4MrDM8y9yMYczpBtjDlrEL8p5i3Nyg2daZpIfl5EkcYcg7pJtn8LWzlL5YxWgEc75Bdq17hvG9Cj8pbn5i7eoJzQ/KFJ1TbelX7/JkXgNPjb0/wCz5RPom3pU+/yhk5ZG3pk/p8pNbyztvUJwheUs04T9vWJwr/KW6fmbeGnCF5S6T+zbL8Mbys8pdN/r2zW8zvKTTrGivOYqbZFVrq+aX3Xk7n9XcR/2vJ27eMLcRG80zyc9nPB3FWzmn+TVEcitVi7emZ5WxH0523rB9OD5S5F9u2YxSkREanlDiQ4SjfHJtOOVMVVf5ZURcsmck/Z1wG+x8xcj2aNVysajGeYnC60PZVgupN81LD0JWxqQ8kbzVwDmFsBCUxmtRjfNPYhGFE4Be/Tx/p5yzXjP79YvGv8AOTl5p3fqF4wvOSF4ye/TL+P5zjzL36VfOEdyjT479Mv5Hm5i8IewqV4TvN2K8IGwrf8AYeZlTRRUgFIeOUaFEQTwk79TGdzY6xWPNa5r2+UVUaku2xfqtcnLAyVFHKGcBI5O7Arup62qcJ0eUWK6LOFKTyJZ0YOFucPJNJX0h/peh445I5MYkUnbgVui4T8v0DaSB4K3A7BlGVPFKqIhbOKPC3BFwsgxtUX9T1KJhxy4b4j+zArulpuf8+hPoorKULBXI1wUkB/CvIwSFto7MLbSH497yr2I36uh7GkZNguirqRFc6BXpH1XP+bsCmyQ4K5XBT4xt+WUAGEuRphbKUXF4uXtxf1NKojknV6x9LGOI+FBbFbquf8AP2xHMHBXBm4K0ikxrmvTbPIwTS3AW464MuElyDbCH+lrn13T9RCeckSGyIzXcftd5rnMUdnKHjbpcBYRzrsps9sXClId+yhfWDrKVgBlehS5UyRs7Nv+7soliSPjCNKzvzpftQqquXZ1y8YGp72jZMlulk9a6d1k12y8Z2zgTFil78yR7mTtKv8A1+lVREnTVlP0fVFgTvcs1WS8bDaVMjqA7s8vRh7WnXjD03BCpra5zHiV7haZy8Z20ri9Kb3bkvF+1pX/AE0lEww5UV8Qmmur+nrI/qF2oSdYHcll60va1pOnO1FEww5kR0QnrArulrnl6ULbU5eaP25ZejF23FWqIiFFqlyPdSPWqk9QOq5Lt6snJN7dyTgLb05eaPptpHTBoAZY52uRzdMo3XlbZr1G9FRydqzJ1J23rzdGZplH9zI01B+YWiwN0Ie4rSdSD2VVERz+o/cRDe4jetmRRwdUEiim6Lc3PI3FMT7uzYk6cHc05uD/AFuV/G1DXlL6kegxuepH7ivJ053ZuX/buRkUJWuR7fS6XWvwi8U9Lg/KLc8VarXI9vYtH887dVB+cHpcr/frirzRfSWf3EndVr+eD2Cv6h91DP7eV6Wy8Z2uvXmgZZH6MTd0r/s1yX9KMnxu64/XiZYrxsNdUvGBlkfrS93Uv5Zuu2fywd5WH6MvJa80zXTL+LMP7aNvIj+SZrunfTewz+5jEXmNrpV+lsfqH3nHhjV5m6rhfy97VSOkZPjXXHSOiqrl3sJeMLU9jSNNUCdhoMkG8+PCsa4jg1Bn4CBHj9s0OOfC0zkwsY4PNp9yirJJcDUAZjGNG3vlgRjYWmXCw5IfKta4iiq5JMFUAbgxDEm1LGAfCU4lwlVKZjxkF44cKSXB0xFwdXFHjWtYm8JBilx9MNcfUyW4+NIHnHwjUV6sr5ZMZTEXGVMVuDCMXhXhEXH1cR2PpW46okpjoMpmOa5mcdxxTGxzvxtZLdjKYi4ynAmMgRR4icE8c4ASY6tiOx1PGXHUqY6mLi1MpMWtmJiwZaZ7aQmdEyZyuT14LnTIudA+JEkrn8fMXEq5a4lPIxKV2JTCxtVETGwYrca1rU/+Af/EAEEQAAECAgUHCAkCBQUAAAAAAAECAwAREiExQFEgIjBBUGFxECMyUmJygbEEEzNCgpGSocFDcxQ0YNHwY3CAorL/2gAIAQEABj8C/wBvDIzlV/Rlsfxfoyik/qS8451oK3piumPhjpK+mOmfpMe1/wChj26PEyiaVAjd/QkzE/X0XBYtq37RJLgdGK0SikGktnXRsypioxU8TuVXEn25dpMUm1hQ3bfpOqoiJMJoDFVsTcWpfE6SmhRSrEQEek5p6+rbuK1dERTcVSVcKJzmurhwgLbVSSdtFaqgkTMKdVrsGAuU/wBM9IRMbZDQtcNfC6ITSFJAkRtim4eA1mC6qrAYC6TFRGuPUPHP91WO1lOLsTBcX4DC7BaekkzEJcTYoT2qlgWIrPG8UeoqW1VudZU7w8ngdqKItleV9zasrw8eH52q6MFnzvDqu3Larw7V4n1lHaq98jeG/Hz2qk4o/JvDPcG1WTiDdzCU4CW1WldqV3SnEy2qpY6VgiTjilCc67uFCoisQltxwrSurO1bUR+5+DeWf3E+e1J9VQN5ZHbntR0dmfyvIPVST+PztQg2GCg2pMrw65wTtVeCs68IxVnbVbeGo0Td0ti1RlAAsG1VNKsUILbokR97t/EqFQ6H99r1icL7UlXRumgGedWNstO/CbmEi1RkICBYkSG2XEC2UxcwdTYpbbWjVanhci4bXD9ttpfFqKjwuKWk2qMBKRICobbKFWKEjCmlWpNwV6QrXmp26vcALg34+e3XjvuEsFHbrx/1FedwcHb/ABt0qxM7g+O7+duKVgLi4nFO3Hu4bjxQduO8Li14+W2q85epIj1rnvKMpaoU2bFCUFtwSULgfSFCQlJHI4y9W3OpWEBSSCDrG1ZqMgNZih6N9f8AaJkzJ1mGuE+Siqojoqwj1bgr1HHTB58Znupx5eKAYm2ataTYYkDRX1TtLOdE8BXHMteK451cx1dXKx+2OWg4PHCKK6x7qsdIHvSB3Uf3yEnsfnlkqTg32xzgU2fmIm2tKhuOy5kyEdOmexXHNNhO9Vcc46pW7VlM/tjyyChwTBivObNitDKA6+Jr1J6uS33cmYMjiI6dMduOdbUjeK45t1Kt2vYs3FpSN5jMpOHcIzAlsfMxNxal8ToWu4MkoWJpOqKSc5rHDLCUiZNgj1jlbv8A5ymu6dDmumWCq455nxRFToBwVVf+cdSN2uOabUreao6dAdiKSiScTpGe4PLKkRMGC41W1h1ckIQKSjqiZznDarLb7uk5p1Sd2qOcQlfCqK1Fs9oRSSoKGIu9JagkYmOaQpz7CM1tCeNcZ7ypYCq4Mftp8tAXmBm+8jDlDbYmfKKq1m1WgR3NPNCik4pMorUF94RnsfSqJBdFXVVVc6Cc53DCKbqqRubPcGgLizICFLCAgKNg5PUKSEqUaldbQp/bHmbnRXNxv7iAtBmk2G4THTVUkQVKMybTdGuGWVrMki0xOxsdFOR6l084LD1tBwQLpJR5pXS3b7gpfuipPC6o4nzypkyAiin2SbN+TMGRFhigup1Nu/Lc3S8rr6pXSb8tMs6zmi7EYLOUhuxo68ThlhaDJQslCC4misisZTx33VGC806ZtnDON2db3hWUW1iaTFFVaT0VZQfeGf7qcMtbnWUTdarYQ4PeE9K4vVOQuyMF5uWUOCYMSnSSronIDz0ivUMMtxWuUhd1NdQ/Y6RxzWBVxu4Um0ViEuCxQnllz3bE8Mj1KjnN2cMttn4jdwnU4JaRtrrGd4U0bWz9sr1Kek55ZKXRqt3iApJmDZlOOapyHC7pcFqTOARYdGodQUbwjBeacpTuqxPDKLBtRZwyVkdI5ovKMUZuimbBClm1RneUOayK+OQuVqs3LaI1mifHJSyLGxXxvLrXxD/PlonO0KPzvS2D72cMhA7f4OWhWCgchS1WJEzClqtUZ3lvBWadE03iaV6S6m1JnAUmsETHKynidBPlSwLV1nhegoWisQFCwiehI6gAvZZNrflytpwToGjigcq3NVieF7b7OboXHOsom9oWejYrhy8EDQNcJchA6S80Xx1vAz/z5aBxeCTfRPpIzTyO7peWgSMCfPkIHRbzR+b5R66dAR1yBfQk9Fyrx1cjx7Z0Cxg5+BCnNdieN9ZV2pfjQMoxJP8AnzvyXNdiuMOKxUToHk8DAZFjdvG+zFogEa8tI1UL8WldFdnHQ+kLOpAMFSqyazfmZ9QZdFaQoYGJsqLZwtEZzdIYor/oGihJUdwibqg2MLTE0omrrKrOjz2xPEVGJsuz3LjnGlAY6tt0QJnARWkNjtRNwlw/IRRQkJGAFwzmgDimqOZd8FxnsqliK9qyQkqPZE4zgGx2jHOKU59hEm0JSNwu3ONJVv1xzbikfcRm0XOBjnEKRxGzs1lXxVRzroTuTXFaKZ7cSSABgL7nMp8Ko5t1SeNcZtBfjKM9lY8J7FkhJUeyJx7GXeqjnHkjuicZwUvvGObbSngNi842lXER0CnumObfUO8JxmqbV4yithXhXGehSe8JXrNZcPwx7MJ7yoz3kjgJxnLWrxiphPjXEhs/PaQrimPYgcCRFSnE8DGa+RxTOM15J4iUfpn4o9jPgoR7BUfy7v0GK2XPoMdBXy5bD8oqbX9Mewd+gx7Bz5R7A/MR0EjiqK1tjxMV+kD6IznXDwlFaVK4qiphHiJxJIA4f8Av/8QALRAAAQICCAcBAQEBAQEAAAAAAQARITFAQVFhcYGRoSAwULHB0fDhEPFgcID/2gAIAQEAAT8h/wDPIUnHNUf+MDgAC0C1ShSVgrgSZWhQF8bHQ+0Kguz6L/Qr7bwgasPmxScf0mr0JE//AAgCEAAmSjbmhiCRuepcUW1FuWxTmAkMuyq4gKgKxAqWX84xRTE50af6sSpJY2dfbFqLTgE7g41okN05mYzcwNCVYyMsJACbGz6SBAOC4NfXAiH2SbkenErNVwoBMP11b4qQikgR1oujoSwKaz4gKFEskv7i9AgBHBkR1l/3YH61EAokRIhoDbrEDOwmXIfMUNkogcBjIAWIReIAPYbDf1YtTCc33IjcTgDZRjDsgS7EGfVXsws9LbvSIlmbJPz1WN7vBhVtSMUAW/51QkmDI0UvCkPu/bqhDhigLiYhSMBgeqmRqe6kY82APfVcyGofzSHS0vHjqrvs7DeKQzTW7Uj1VqyNHKkxftuqsWE6N7o8JrldZdVYHLUPyj3G+o9VbHkdtKqjUHX8aOcFyCWFAkVzHdV1TYqSfGsdU+KkvNJwtaI+OqXXeV4/42qQZTgYqYSDxEKRPxWA7nuOqsdmZHOe4NIikTTzls3VXBHaDLtvR5YrfY6GWwGAs6rU+B7DUVtgMFouorBMpyICZ1bz+W9Xg4sQV3BBo3cGiAvEZmJmGzdZhhEie8OxochuYhQVWEwB1kog+siKBcPQn7EYWMh7y6214Z+c+bKhNanskB5OfW2AxM1+96DVaJ7BWdExcYBYOtgscwFyqjU9oqNAYBeDWfGXXWf/AJD+aA5TUzQuu5adABQMEbz567eJ3FAwm/Z666b4VARsV1xeRlQjhQGbInQ/vXHP9shKgQixbg+OuGKFgakUEiGq27utNs3RFRzsCf8Ah2AIAINspz7I2Laygi0XUB9aaK3mf4B1gGhESAYisRUduwI4PVT8SMJGATj55js8oiQ6IJHJTatLUSf4y+pEzRGyqEhtHNkiwnMXebrviAwYfx/P0EeFGpP5FakRMZ+VvUnwHhftlNGbeB7UUAJBAMv6LfTD+mL0VBMrQp7mSIfu7lksmZnMtV/pwYmEbv5IggkERBFSDhn4dSYxeIbgV4YnulkQQJkpxAuwd0t1Bw9o5O7QbTaBBAAS4DJCw7Oy4BxVp+E/mb+SASQAJJLACZQSCTar9cIR7/fhIjOHIjEJiDRVA+80wg5at9qeRe7J9Fv7E0oMOCBqVA7pDcMNk/EYzcgyK+/ZwjwisSUXxTCtdPvjPhPYEygYYMMrg98X2LeQQDMKYfAd0EwcvPB9qDYwO9PfnkWn0CKhB21b7TkG2QNvNGSQ5kcnlmSJyfbOIhGAYgiBR8I10x/PCTvIgoOgsK4Xccne78tnUhEVD2STABtsVMgsg1vJDJRkRxRzEf1jJwBC33R2W/cPoteBZsgAJDn/AALHHNFiOcG8XXKf8f5ugWlNS3MRPocg4NnkefjOcFDg/wBRDJ7CIrPgIQc+L16NDDMAwhVvFOA1byGAqoZ5E25Oab5wAqv4WLgnZG+z5+RKUICAZouD2EnR9IV8VwUAEMOcrcAiEDnJMmiPK8NCeMSEVyVKe3+0N/A3QFEqe+RkA70RxB2C0gLhxzyDS+lq850U3DZ3fERjAOSZBPNINBbtPCCAUQ4JgoTwAILNo42jc7PdFIczwRfV9ac5tyw80w/ckICi3ITsfPE1AIbkNR3/AM4zqD3OZ0MoBIqjxYeRoAKLFx8lLducwhgHiHmjYLAzgew4mBdiF3yI/eGSxBibzf24/wDSJNFciJMEQbCh1C2Wc1gy';
                    //document.getElementById("image_upload_preview_3").src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBdRXhpZgAASUkqAAgAAAABAA4BAgA7AAAAGgAAAAAAAABCdXNpbmVzc21hbiBzaWxob3VldHRlIGFzIGF2YXRhciBvciBkZWZhdWx0IHByb2ZpbGUgcGljdHVyZf/hAx1odHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvAAk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6SXB0YzR4bXBDb3JlPSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wQ29yZS8xLjAveG1sbnMvIiB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIiBwaG90b3Nob3A6Q3JlZGl0PSJHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG8iIEdldHR5SW1hZ2VzR0lGVDpBc3NldElEPSI0NzYwODUxOTgiID4KPGRjOmNyZWF0b3I+PHJkZjpTZXE+PHJkZjpsaT5Lcml0Y2hhbnV0PC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5CdXNpbmVzc21hbiBzaWxob3VldHRlIGFzIGF2YXRhciBvciBkZWZhdWx0IHByb2ZpbGUgcGljdHVyZTwvcmRmOmxpPjwvcmRmOkFsdD48L2RjOmRlc2NyaXB0aW9uPgoJCTwvcmRmOkRlc2NyaXB0aW9u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';
                    //document.getElementById("image_upload_preview_4").src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBdRXhpZgAASUkqAAgAAAABAA4BAgA7AAAAGgAAAAAAAABCdXNpbmVzc21hbiBzaWxob3VldHRlIGFzIGF2YXRhciBvciBkZWZhdWx0IHByb2ZpbGUgcGljdHVyZf/hAx1odHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvAAk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6SXB0YzR4bXBDb3JlPSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wQ29yZS8xLjAveG1sbnMvIiB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIiBwaG90b3Nob3A6Q3JlZGl0PSJHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG8iIEdldHR5SW1hZ2VzR0lGVDpBc3NldElEPSI0NzYwODUxOTgiID4KPGRjOmNyZWF0b3I+PHJkZjpTZXE+PHJkZjpsaT5Lcml0Y2hhbnV0PC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5CdXNpbmVzc21hbiBzaWxob3VldHRlIGFzIGF2YXRhciBvciBkZWZhdWx0IHByb2ZpbGUgcGljdHVyZTwvcmRmOmxpPjwvcmRmOkFsdD48L2RjOmRlc2NyaXB0aW9uPgoJCTwvcmRmOkRlc2NyaXB0aW9u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';
                    //document.getElementById("image_upload_preview_5").src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBdRXhpZgAASUkqAAgAAAABAA4BAgA7AAAAGgAAAAAAAABCdXNpbmVzc21hbiBzaWxob3VldHRlIGFzIGF2YXRhciBvciBkZWZhdWx0IHByb2ZpbGUgcGljdHVyZf/hAx1odHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvAAk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6SXB0YzR4bXBDb3JlPSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wQ29yZS8xLjAveG1sbnMvIiB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIiBwaG90b3Nob3A6Q3JlZGl0PSJHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG8iIEdldHR5SW1hZ2VzR0lGVDpBc3NldElEPSI0NzYwODUxOTgiID4KPGRjOmNyZWF0b3I+PHJkZjpTZXE+PHJkZjpsaT5Lcml0Y2hhbnV0PC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5CdXNpbmVzc21hbiBzaWxob3VldHRlIGFzIGF2YXRhciBvciBkZWZhdWx0IHByb2ZpbGUgcGljdHVyZTwvcmRmOmxpPjwvcmRmOkFsdD48L2RjOmRlc2NyaXB0aW9uPgoJCTwvcmRmOkRlc2NyaXB0aW9uPgoJPC9yZGY6UkRGPgr/7QCIUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAGwcAlAACktyaXRjaGFudXQcAngAO0J1c2luZXNzbWFuIHNpbGhvdWV0dGUgYXMgYXZhdGFyIG9yIGRlZmF1bHQgcHJvZmlsZSBwaWN0dXJlHAJuABhHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG//2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/wgALCAJkAmQBAREA/8QAGwABAAIDAQEAAAAAAAAAAAAAAAUGAwQHAgH/2gAIAQEAAAABuYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADx7AAAAAAAAAAAAPNe1ZD399Z932AAAAAAAAAAB8gYaNwA35uwZwAAAAAAAAAGtWILGAHu0WX6AAAAAAAAAEZRsQABK3bMAAAAAAAAAeOcYAAAkOgfQAAAAAAAAFep4AAF7lgAAAAAAAANSh6oAAC32IAAAAAAAAMHPdcAAA99JygAAAAAAACn14AAALpOgAAAAAAADmmEAAALLbAAAAAAAADFzL6AAAFguIAAAAAAAB85d9AAACy2wAAAAAAAAc0wgAABbbIAAAAAAAAOeaIAAAXSdAAAAAAAAFDigAAAvkqAAAAAAAAKXBAAAB0TdAAAAAAAAFSrYAAA89PyAAAAAAAACtVMAAAeungAAAAAAACPouAAAAepy5gAAAAAAAFep4AAANjpIAAAAAAABB0oAAAG50UAAAAAAAAjufgAAAl70AAAAAAAAeeY/AAAAtFpAAAAAAAAFBjAAAAvcsAAAAAAAAKxVQAAB76Z6AAAAAAAAGvzvEAAA+WW2gAAAAAAAA80SLAAAu80AAAAAAAAAq1XAAB96ZkAAAAAAAAAR/PgAAS17AAAAAAAAAHO9IAALnPAAAAAAAAACt1IAAZukewAAAAAAAABj5xhAALTaAAAAAAAAAAUOKAAL5KgAAAAAAAAA57oAAF1nAAAAAAAAAAc21wAC3WMAAAAAAAAAHL/gABZ7UAAAAAAAAAGPmHoAAsFxAAAAAAAAADS52AAJq7gAAAAAAAABF0IAASd+AAAAAAAAAI35u85xAAFmtddn/AGAAAAAAAAPNXrN8lNGia4AFht/2j6VzkgAAAAAAAI+FgtV0TdatE0wAtNoKZApmamMwAAAAAAPMVDw2sHRtswUWPALfYhT68PsnMzO2AAAAADFDw0RjA+dI2hjo8UD1dJsKhXQPm/MzMh9AAAADUhoaM+AB0bbDzS4Qe7xLAp9eADPMzEt7AAAGKDj4vS+gAOi7gPlRrrNepECmwAAD1KSExJgAAh6XiAAB0LfAwc7w2W2AKVBgAAmLplAAIyhfAAAL9Jgx0KPLlPgUeGAAAlL59AAc80QAAF5mA80aJH27zIKFFgAALnPAARtAAAALnPBVquD10nMHPdAAABJ34ACpVsAAAtNoDDQtELbZA+czxgAAHSdgAHOdQAAAlL6DDRI8t9iBHc/AAAFwsIAafOfoAAB96VmD5zzSLjYAVWsAAACYvIAVupAAABcLCEBTRsdH9BznUAAAHvpnoAUSJAAACTvw+c61At9iEbQAAAAXuWAPPMvIAAAOibpE0QG/0IU2AAAABZrWARdCAAAAsduK9TwZOmmLm3gAAAEj0AArFVAAAAy9J9qtVweeo+lcqIAAAH3pvsBRYgAAABcbAp9eB86RtOdaYAAAC+SoDmmEAAABvdDUiFAv8lEUUAAAAtdmA1eb/QAAAC9y1BjALxM0SJAAAAJq7gQtIAAAAEveuc6gFwk+eAAAADb6MBV6sAAAAHQ6DiAtOpAgAAAD51D0ClwQAAAATsB6Amob4AAAAPnRN4GOCr8d9AAAAffgD78AAAAPc3YZIAaMDB6wAAAAAAAAA+ys5N5AACOhYbR+gAAAAAAAHqWmZrMAAAakRExWMAAAAAAB835WWlfYAAAB80IuNjtT6AAAAAH2QkpOUzgAAAAAwR2ho6Wnj+gAAB82d3e3pDf+gAAAAAADX09XW19fDiw+PHj5695PebNm2NnZ29z2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/xAAuEAABBAECBQMEAgMBAQAAAAADAQIEBQAgQBESEzBQEBQxISIkNBUjMzVgcID/2gAIAQEAAQUC/wDPEcjv+M4ouWASieK5cmJbxlz+WiZ/KxM/lIeNnRXY1zXp/wAGq8ElHhOxLOQNSkQjtPwo50oWBuEwRhnb54xxR2HtyOwhHlXtsc4botsi58+cmzGxBkI8z+/Dnvi4MrDM8y9yMYczpBtjDlrEL8p5i3Nyg2daZpIfl5EkcYcg7pJtn8LWzlL5YxWgEc75Bdq17hvG9Cj8pbn5i7eoJzQ/KFJ1TbelX7/JkXgNPjb0/wCz5RPom3pU+/yhk5ZG3pk/p8pNbyztvUJwheUs04T9vWJwr/KW6fmbeGnCF5S6T+zbL8Mbys8pdN/r2zW8zvKTTrGivOYqbZFVrq+aX3Xk7n9XcR/2vJ27eMLcRG80zyc9nPB3FWzmn+TVEcitVi7emZ5WxH0523rB9OD5S5F9u2YxSkREanlDiQ4SjfHJtOOVMVVf5ZURcsmck/Z1wG+x8xcj2aNVysajGeYnC60PZVgupN81LD0JWxqQ8kbzVwDmFsBCUxmtRjfNPYhGFE4Be/Tx/p5yzXjP79YvGv8AOTl5p3fqF4wvOSF4ye/TL+P5zjzL36VfOEdyjT479Mv5Hm5i8IewqV4TvN2K8IGwrf8AYeZlTRRUgFIeOUaFEQTwk79TGdzY6xWPNa5r2+UVUaku2xfqtcnLAyVFHKGcBI5O7Arup62qcJ0eUWK6LOFKTyJZ0YOFucPJNJX0h/peh445I5MYkUnbgVui4T8v0DaSB4K3A7BlGVPFKqIhbOKPC3BFwsgxtUX9T1KJhxy4b4j+zArulpuf8+hPoorKULBXI1wUkB/CvIwSFto7MLbSH497yr2I36uh7GkZNguirqRFc6BXpH1XP+bsCmyQ4K5XBT4xt+WUAGEuRphbKUXF4uXtxf1NKojknV6x9LGOI+FBbFbquf8AP2xHMHBXBm4K0ikxrmvTbPIwTS3AW464MuElyDbCH+lrn13T9RCeckSGyIzXcftd5rnMUdnKHjbpcBYRzrsps9sXClId+yhfWDrKVgBlehS5UyRs7Nv+7soliSPjCNKzvzpftQqquXZ1y8YGp72jZMlulk9a6d1k12y8Z2zgTFil78yR7mTtKv8A1+lVREnTVlP0fVFgTvcs1WS8bDaVMjqA7s8vRh7WnXjD03BCpra5zHiV7haZy8Z20ri9Kb3bkvF+1pX/AE0lEww5UV8Qmmur+nrI/qF2oSdYHcll60va1pOnO1FEww5kR0QnrArulrnl6ULbU5eaP25ZejF23FWqIiFFqlyPdSPWqk9QOq5Lt6snJN7dyTgLb05eaPptpHTBoAZY52uRzdMo3XlbZr1G9FRydqzJ1J23rzdGZplH9zI01B+YWiwN0Ie4rSdSD2VVERz+o/cRDe4jetmRRwdUEiim6Lc3PI3FMT7uzYk6cHc05uD/AFuV/G1DXlL6kegxuepH7ivJ053ZuX/buRkUJWuR7fS6XWvwi8U9Lg/KLc8VarXI9vYtH887dVB+cHpcr/frirzRfSWf3EndVr+eD2Cv6h91DP7eV6Wy8Z2uvXmgZZH6MTd0r/s1yX9KMnxu64/XiZYrxsNdUvGBlkfrS93Uv5Zuu2fywd5WH6MvJa80zXTL+LMP7aNvIj+SZrunfTewz+5jEXmNrpV+lsfqH3nHhjV5m6rhfy97VSOkZPjXXHSOiqrl3sJeMLU9jSNNUCdhoMkG8+PCsa4jg1Bn4CBHj9s0OOfC0zkwsY4PNp9yirJJcDUAZjGNG3vlgRjYWmXCw5IfKta4iiq5JMFUAbgxDEm1LGAfCU4lwlVKZjxkF44cKSXB0xFwdXFHjWtYm8JBilx9MNcfUyW4+NIHnHwjUV6sr5ZMZTEXGVMVuDCMXhXhEXH1cR2PpW46okpjoMpmOa5mcdxxTGxzvxtZLdjKYi4ynAmMgRR4icE8c4ASY6tiOx1PGXHUqY6mLi1MpMWtmJiwZaZ7aQmdEyZyuT14LnTIudA+JEkrn8fMXEq5a4lPIxKV2JTCxtVETGwYrca1rU/+Af/EAEEQAAECAgUHCAkCBQUAAAAAAAECAwAREiExQFEgIjBBUGFxECMyUmJygbEEEzNCgpGSocFDcxQ0YNHwY3CAorL/2gAIAQEABj8C/wBvDIzlV/Rlsfxfoyik/qS8451oK3piumPhjpK+mOmfpMe1/wChj26PEyiaVAjd/QkzE/X0XBYtq37RJLgdGK0SikGktnXRsypioxU8TuVXEn25dpMUm1hQ3bfpOqoiJMJoDFVsTcWpfE6SmhRSrEQEek5p6+rbuK1dERTcVSVcKJzmurhwgLbVSSdtFaqgkTMKdVrsGAuU/wBM9IRMbZDQtcNfC6ITSFJAkRtim4eA1mC6qrAYC6TFRGuPUPHP91WO1lOLsTBcX4DC7BaekkzEJcTYoT2qlgWIrPG8UeoqW1VudZU7w8ngdqKItleV9zasrw8eH52q6MFnzvDqu3Larw7V4n1lHaq98jeG/Hz2qk4o/JvDPcG1WTiDdzCU4CW1WldqV3SnEy2qpY6VgiTjilCc67uFCoisQltxwrSurO1bUR+5+DeWf3E+e1J9VQN5ZHbntR0dmfyvIPVST+PztQg2GCg2pMrw65wTtVeCs68IxVnbVbeGo0Td0ti1RlAAsG1VNKsUILbokR97t/EqFQ6H99r1icL7UlXRumgGedWNstO/CbmEi1RkICBYkSG2XEC2UxcwdTYpbbWjVanhci4bXD9ttpfFqKjwuKWk2qMBKRICobbKFWKEjCmlWpNwV6QrXmp26vcALg34+e3XjvuEsFHbrx/1FedwcHb/ABt0qxM7g+O7+duKVgLi4nFO3Hu4bjxQduO8Li14+W2q85epIj1rnvKMpaoU2bFCUFtwSULgfSFCQlJHI4y9W3OpWEBSSCDrG1ZqMgNZih6N9f8AaJkzJ1mGuE+Siqojoqwj1bgr1HHTB58Znupx5eKAYm2ataTYYkDRX1TtLOdE8BXHMteK451cx1dXKx+2OWg4PHCKK6x7qsdIHvSB3Uf3yEnsfnlkqTg32xzgU2fmIm2tKhuOy5kyEdOmexXHNNhO9Vcc46pW7VlM/tjyyChwTBivObNitDKA6+Jr1J6uS33cmYMjiI6dMduOdbUjeK45t1Kt2vYs3FpSN5jMpOHcIzAlsfMxNxal8ToWu4MkoWJpOqKSc5rHDLCUiZNgj1jlbv8A5ymu6dDmumWCq455nxRFToBwVVf+cdSN2uOabUreao6dAdiKSiScTpGe4PLKkRMGC41W1h1ckIQKSjqiZznDarLb7uk5p1Sd2qOcQlfCqK1Fs9oRSSoKGIu9JagkYmOaQpz7CM1tCeNcZ7ypYCq4Mftp8tAXmBm+8jDlDbYmfKKq1m1WgR3NPNCik4pMorUF94RnsfSqJBdFXVVVc6Cc53DCKbqqRubPcGgLizICFLCAgKNg5PUKSEqUaldbQp/bHmbnRXNxv7iAtBmk2G4THTVUkQVKMybTdGuGWVrMki0xOxsdFOR6l084LD1tBwQLpJR5pXS3b7gpfuipPC6o4nzypkyAiin2SbN+TMGRFhigup1Nu/Lc3S8rr6pXSb8tMs6zmi7EYLOUhuxo68ThlhaDJQslCC4misisZTx33VGC806ZtnDON2db3hWUW1iaTFFVaT0VZQfeGf7qcMtbnWUTdarYQ4PeE9K4vVOQuyMF5uWUOCYMSnSSronIDz0ivUMMtxWuUhd1NdQ/Y6RxzWBVxu4Um0ViEuCxQnllz3bE8Mj1KjnN2cMttn4jdwnU4JaRtrrGd4U0bWz9sr1Kek55ZKXRqt3iApJmDZlOOapyHC7pcFqTOARYdGodQUbwjBeacpTuqxPDKLBtRZwyVkdI5ovKMUZuimbBClm1RneUOayK+OQuVqs3LaI1mifHJSyLGxXxvLrXxD/PlonO0KPzvS2D72cMhA7f4OWhWCgchS1WJEzClqtUZ3lvBWadE03iaV6S6m1JnAUmsETHKynidBPlSwLV1nhegoWisQFCwiehI6gAvZZNrflytpwToGjigcq3NVieF7b7OboXHOsom9oWejYrhy8EDQNcJchA6S80Xx1vAz/z5aBxeCTfRPpIzTyO7peWgSMCfPkIHRbzR+b5R66dAR1yBfQk9Fyrx1cjx7Z0Cxg5+BCnNdieN9ZV2pfjQMoxJP8AnzvyXNdiuMOKxUToHk8DAZFjdvG+zFogEa8tI1UL8WldFdnHQ+kLOpAMFSqyazfmZ9QZdFaQoYGJsqLZwtEZzdIYor/oGihJUdwibqg2MLTE0omrrKrOjz2xPEVGJsuz3LjnGlAY6tt0QJnARWkNjtRNwlw/IRRQkJGAFwzmgDimqOZd8FxnsqliK9qyQkqPZE4zgGx2jHOKU59hEm0JSNwu3ONJVv1xzbikfcRm0XOBjnEKRxGzs1lXxVRzroTuTXFaKZ7cSSABgL7nMp8Ko5t1SeNcZtBfjKM9lY8J7FkhJUeyJx7GXeqjnHkjuicZwUvvGObbSngNi842lXER0CnumObfUO8JxmqbV4yithXhXGehSe8JXrNZcPwx7MJ7yoz3kjgJxnLWrxiphPjXEhs/PaQrimPYgcCRFSnE8DGa+RxTOM15J4iUfpn4o9jPgoR7BUfy7v0GK2XPoMdBXy5bD8oqbX9Mewd+gx7Bz5R7A/MR0EjiqK1tjxMV+kD6IznXDwlFaVK4qiphHiJxJIA4f8Av/8QALRAAAQICCAcBAQEBAQEAAAAAAQARITFAQVFhcYGRoSAwULHB0fDhEPFgcID/2gAIAQEAAT8h/wDPIUnHNUf+MDgAC0C1ShSVgrgSZWhQF8bHQ+0Kguz6L/Qr7bwgasPmxScf0mr0JE//AAgCEAAmSjbmhiCRuepcUW1FuWxTmAkMuyq4gKgKxAqWX84xRTE50af6sSpJY2dfbFqLTgE7g41okN05mYzcwNCVYyMsJACbGz6SBAOC4NfXAiH2SbkenErNVwoBMP11b4qQikgR1oujoSwKaz4gKFEskv7i9AgBHBkR1l/3YH61EAokRIhoDbrEDOwmXIfMUNkogcBjIAWIReIAPYbDf1YtTCc33IjcTgDZRjDsgS7EGfVXsws9LbvSIlmbJPz1WN7vBhVtSMUAW/51QkmDI0UvCkPu/bqhDhigLiYhSMBgeqmRqe6kY82APfVcyGofzSHS0vHjqrvs7DeKQzTW7Uj1VqyNHKkxftuqsWE6N7o8JrldZdVYHLUPyj3G+o9VbHkdtKqjUHX8aOcFyCWFAkVzHdV1TYqSfGsdU+KkvNJwtaI+OqXXeV4/42qQZTgYqYSDxEKRPxWA7nuOqsdmZHOe4NIikTTzls3VXBHaDLtvR5YrfY6GWwGAs6rU+B7DUVtgMFouorBMpyICZ1bz+W9Xg4sQV3BBo3cGiAvEZmJmGzdZhhEie8OxochuYhQVWEwB1kog+siKBcPQn7EYWMh7y6214Z+c+bKhNanskB5OfW2AxM1+96DVaJ7BWdExcYBYOtgscwFyqjU9oqNAYBeDWfGXXWf/AJD+aA5TUzQuu5adABQMEbz567eJ3FAwm/Z666b4VARsV1xeRlQjhQGbInQ/vXHP9shKgQixbg+OuGKFgakUEiGq27utNs3RFRzsCf8Ah2AIAINspz7I2Laygi0XUB9aaK3mf4B1gGhESAYisRUduwI4PVT8SMJGATj55js8oiQ6IJHJTatLUSf4y+pEzRGyqEhtHNkiwnMXebrviAwYfx/P0EeFGpP5FakRMZ+VvUnwHhftlNGbeB7UUAJBAMv6LfTD+mL0VBMrQp7mSIfu7lksmZnMtV/pwYmEbv5IggkERBFSDhn4dSYxeIbgV4YnulkQQJkpxAuwd0t1Bw9o5O7QbTaBBAAS4DJCw7Oy4BxVp+E/mb+SASQAJJLACZQSCTar9cIR7/fhIjOHIjEJiDRVA+80wg5at9qeRe7J9Fv7E0oMOCBqVA7pDcMNk/EYzcgyK+/ZwjwisSUXxTCtdPvjPhPYEygYYMMrg98X2LeQQDMKYfAd0EwcvPB9qDYwO9PfnkWn0CKhB21b7TkG2QNvNGSQ5kcnlmSJyfbOIhGAYgiBR8I10x/PCTvIgoOgsK4Xccne78tnUhEVD2STABtsVMgsg1vJDJRkRxRzEf1jJwBC33R2W/cPoteBZsgAJDn/AALHHNFiOcG8XXKf8f5ugWlNS3MRPocg4NnkefjOcFDg/wBRDJ7CIrPgIQc+L16NDDMAwhVvFOA1byGAqoZ5E25Oab5wAqv4WLgnZG+z5+RKUICAZouD2EnR9IV8VwUAEMOcrcAiEDnJMmiPK8NCeMSEVyVKe3+0N/A3QFEqe+RkA70RxB2C0gLhxzyDS+lq850U3DZ3fERjAOSZBPNINBbtPCCAUQ4JgoTwAILNo42jc7PdFIczwRfV9ac5tyw80w/ckICi3ITsfPE1AIbkNR3/AM4zqD3OZ0MoBIqjxYeRoAKLFx8lLducwhgHiHmjYLAzgew4mBdiF3yI/eGSxBibzf24/wDSJNFciJMEQbCh1C2Wc1gy';
                }

            }, function (x) {
                // Request error
            });
        }
    }
    $scope.Facilitator = function () {
       // alert($scope.FacilitatorempCode);
        var FunctionCode = $("#functionCode").val();
        $http({ url: '/QCC.Web/TeamRegistration/FaclitatorFetchEmployeeDetailsByEmpCode', method: "GET", params: { empCode: $scope.FacilitatorempCode, functionCode: FunctionCode  } }).then(function (response) {
           // alert(respoonse);
            // Request completed successfully
            console.log(response);
            if (response.data.empCode != null) {
                $scope.FacilitatorempCode = response.data.empCode;
                $scope.Facilitatordepartment = response.data.department;
                $scope.FacilitatorempName = response.data.empName;
                $scope.Facilitatorgrade = response.data.grade;
                $scope.FacilitatorbusinessUnit = response.data.businessUnit;
                $scope.FacilitatorPlant = response.data.Plant;
                $scope.FacilitatorFunctionCode = response.data.FunctionCode;
               
                $http({ url: '/QCC.Web/TeamRegistration/FetchEmployeeDetailsByLevel', method: "GET", params: { EmpCode: response.data.l1, functionCode: FunctionCode } }).then(function (response) {
                    // Request completed successfully
                    if (response.data.empCode != null) {
                        $scope.L1empCode = response.data.empCode;
                        $scope.L1department = response.data.department;
                        $scope.L1empName = response.data.empName;
                        $scope.L1grade = response.data.grade;
                        $scope.L1businessUnit = response.data.businessUnit;
                        teamDetails = { Company: response.data.company, BusinessUnit: response.data.businessUnit, Plant: response.data.Plant, Status: 1, Level1: $scope.L1empCode, CreatedBy: $scope.EmpCode };
                        $scope.UserRegister = { EmpCode: $scope.L1empCode, EmpName: $scope.L1empName, Grade: $scope.L1grade, Department: $scope.L1department, EmpMailId: response.data.emailId, Company: response.data.company, BusinessUnit: response.data.businessUnit, Plant: response.data.Plant, RoleId: '1' };
                    }
                    else {
                        $scope.L1department = $scope.L1empName = $scope.L1grade = $scope.L1businessUnit = null;
                    }
                }, function (x) {
                    // Request error
                });
            }
            else {
                $scope.Facilitatordepartment = $scope.FacilitatorempName = $scope.Facilitatorgrade = $scope.FacilitatorbusinessUnit = null;
            }

        }, function (x) {
            // Request error

        });
    }
    $scope.TL = function () {
        var FunctionCode = $("#functionCode").val();
        //alert(facilitatorFunctionCode);
        $http({ url: '/QCC.Web/TeamRegistration/FetchEmployeeDetailsByEmpCode', method: "GET", params: { empCode: $scope.TLempCode, functionCode: FunctionCode } }).then(function (response) {
            // Request completed successfully
            //alert("hello");
            console.log(response);
            if (response.data.empCode != null) {
                $scope.TLempCode = response.data.empCode;
                $scope.TLdepartment = response.data.department;
                $scope.TLempName = response.data.empName;
                $scope.TLgrade = response.data.grade;
                $scope.TLbusinessUnit = response.data.businessUnit;
                $scope.FacilitatorPlant = response.data.Plant;
               


                //$http({ url: '/QCC.Web/TeamRegistration/FetchEmployeeDetailsByLevel', method: "GET", params: { EmpCode: response.data.l1 } }).then(function (response) {
                //    // Request completed successfully
                //    if (response.data.empCode != null) {
                //        $scope.L1empCode = response.data.empCode;
                //        $scope.L1department = response.data.department;
                //        $scope.L1empName = response.data.empName;
                //        $scope.L1grade = response.data.grade;
                //        $scope.L1businessUnit = response.data.businessUnit;
                //        teamDetails = { Company: response.data.company, BusinessUnit: response.data.businessUnit, Plant: response.data.Plant, Status: 1, Level1: $scope.L1empCode, CreatedBy: $scope.EmpCode };
                //        $scope.UserRegister = { EmpCode: $scope.L1empCode, EmpName: $scope.L1empName, Grade: $scope.L1grade, Department: $scope.L1department, EmpMailId: response.data.emailId, Company: response.data.company, BusinessUnit: response.data.businessUnit, Plant: response.data.Plant,RoleId:'1' };
                //    }
                //    else {
                //       $scope.L1department = $scope.L1empName = $scope.L1grade = $scope.L1businessUnit = null;
                //    }
                //}, function (x) {
                //    // Request error
                //});

            }
            else {
                $scope.TLdepartment = $scope.TLempName = $scope.TLgrade = $scope.TLbusinessUnit = null;
            }
        }, function (x) {
            // Request error
        });
    }
    $scope.TM1 = function () {
        var FunctionCode = $("#functionCode").val();
        $http({ url: '/QCC.Web/TeamRegistration/FetchEmployeeDetailsByEmpCode', method: "GET", params: { empCode: $scope.TM1empCode, functionCode: FunctionCode } }).then(function (response) {
            // Request completed successfully
            console.log(response);
            if (response.data.empCode != null) {
                $scope.testmsg1 = "";
                $scope.TM1empCode = response.data.empCode;
                $scope.TM1department = response.data.department;
                $scope.TM1empName = response.data.empName;
                $scope.TM1grade = response.data.grade;
                $scope.TM1businessUnit = response.data.businessUnit;
                $scope.TM1DepartmentCar = response.data.DepartmentCar;
                $scope.FacilitatorPlant = response.data.Plant;
                $scope.FacilitatorFunctionCode = response.data.FunctionCode;
                $http({ url: '/QCC.Web/TeamRegistration/TeamMemberExistOrNotInCircle', method: "GET", params: { empCode: $scope.TM1empCode } }).then(function (response) {
                    //Request completed successfully
                    if (response.data.Id != 0) {
                        $scope.testmsg1 = "Already exists in " + response.data.CircleName + " team";
                    }
                }, function (x) {
                    // Request error
                });
            }
            else {
                $scope.testmsg1 = "";
                $scope.TM1department = $scope.TM1empName = $scope.TM1grade = $scope.TM1businessUnit = null;
            }
        }, function (x) {
            // Request error
        });
    }
    $scope.TM2 = function () {
      
        var FunctionCode = $("#functionCode").val();
        $http({ url: '/QCC.Web/TeamRegistration/FetchEmployeeDetailsByEmpCode', method: "GET", params: { empCode: $scope.TM2empCode, functionCode: FunctionCode } }).then(function (response) {
            // Request completed successfully
            console.log(response);
            if (response.data.empCode != null) {
                $scope.testmsg2 = "";
                $scope.TM2empCode = response.data.empCode;
                $scope.TM2department = response.data.department;
                $scope.TM2empName = response.data.empName;
                $scope.TM2grade = response.data.grade;
                $scope.TM2businessUnit = response.data.businessUnit;
                $scope.TM2DepartmentCar = response.data.DepartmentCar;
                $scope.FacilitatorPlant = response.data.Plant;
                $scope.FacilitatorFunctionCode = response.data.FunctionCode;
                $http({ url: '/QCC.Web/TeamRegistration/TeamMemberExistOrNotInCircle', method: "GET", params: { empCode: $scope.TM2empCode } }).then(function (response) {
                    //Request completed successfully
                    if (response.data.Id != 0) {
                        $scope.testmsg2 = "Already exists in " + response.data.CircleName + " team";
                    }
                }, function (x) {
                    // Request error
                });
            }
            else {
                $scope.testmsg2 = "";
                $scope.TM2department = $scope.TM2empName = $scope.TM2grade = $scope.TM2businessUnit = null;
            }
        }, function (x) {
            // Request error
        });
    }
    $scope.TM3 = function () {
        var FunctionCode = $("#functionCode").val();
        $http({ url: '/QCC.Web/TeamRegistration/FetchEmployeeDetailsByEmpCode', method: "GET", params: { empCode: $scope.TM3empCode, functionCode: FunctionCode } }).then(function (response) {
            // Request completed successfully
            if (response.data.empCode != null) {
                $scope.testmsg3 = "";
                $scope.TM3empCode = response.data.empCode;
                $scope.TM3department = response.data.department;
                $scope.TM3empName = response.data.empName;
                $scope.TM3grade = response.data.grade;
                $scope.TM3businessUnit = response.data.businessUnit;
                $scope.TM3DepartmentCar = response.data.DepartmentCar;
                $scope.FacilitatorPlant = response.data.Plant;
                $scope.FacilitatorFunctionCode = response.data.FunctionCode;
                $http({ url: '/QCC.Web/TeamRegistration/TeamMemberExistOrNotInCircle', method: "GET", params: { empCode: $scope.TM3empCode } }).then(function (response) {
                    //Request completed successfully
                    if (response.data.Id != 0) {
                        $scope.testmsg3 = "Already exists in " + response.data.CircleName + " team";
                    }
                }, function (x) {
                    // Request error
                });
            }
            else {
                $scope.testmsg3 = "";
                $scope.TM3department = $scope.TM3empName = $scope.TM3grade = $scope.TM3businessUnit = null;
            }
        }, function (x) {
            // Request error
        });
    }
    $scope.TM4 = function () {
        var FunctionCode = $("#functionCode").val();
        $http({ url: '/QCC.Web/TeamRegistration/FetchEmployeeDetailsByEmpCode', method: "GET", params: { EmpCode: $scope.TM4empCode, functionCode: FunctionCode } }).then(function (response) {
            // Request completed successfully
            if (response.data.empCode != null) {
                $scope.testmsg4 = "";
                $scope.TM4empCode = response.data.empCode;
                $scope.TM4department = response.data.department;
                $scope.TM4empName = response.data.empName;
                $scope.TM4grade = response.data.grade;
                $scope.TM4businessUnit = response.data.businessUnit;
                $scope.TM4DepartmentCar = response.data.DepartmentCar;
                $scope.FacilitatorPlant = response.data.Plant;
                $scope.FacilitatorFunctionCode = response.data.FunctionCode;
                $http({ url: '/QCC.Web/TeamRegistration/TeamMemberExistOrNotInCircle', method: "GET", params: { empCode: $scope.TM4empCode } }).then(function (response) {
                    //Request completed successfully
                    if (response.data.Id != 0) {
                        $scope.testmsg4 = "Already exists in " + response.data.CircleName + " team";
                    }

                }, function (x) {
                    // Request error
                });
            }
            else {
                $scope.testmsg4 = "";
                $scope.TM4department = $scope.TM4empName = $scope.TM4grade = $scope.TM4businessUnit = null;
            }
        }, function (x) {
            // Request error
        });
    }
    $scope.encodeImageFileAsURL = function () {
        var filesSelected = document.getElementById("Facilitatorfile").files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                $scope.Facilitatorimage = fileLoadedEvent.target.result; // <--- data: base64
                fileLoadedEvent.target.result = null;
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    }
    $scope.TLencodeImageFileAsURL = function () {
        var filesSelected = document.getElementById("TLfile").files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                $scope.TLimage = fileLoadedEvent.target.result; // <--- data: base64
                fileLoadedEvent.target.result = null;
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    }
    $scope.TM1encodeImageFileAsURL = function () {
        var filesSelected = document.getElementById("TM1file").files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                $scope.TM1image = fileLoadedEvent.target.result; // <--- data: base64
                fileLoadedEvent.target.result = null;
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    }
    $scope.TM2encodeImageFileAsURL = function () {
        var filesSelected = document.getElementById("TM2file").files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                $scope.TM2image = fileLoadedEvent.target.result; // <--- data: base64
                fileLoadedEvent.target.result = null;
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    }
    $scope.TM3encodeImageFileAsURL = function () {
        var filesSelected = document.getElementById("TM3file").files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                $scope.TM3image = fileLoadedEvent.target.result; // <--- data: base64
                fileLoadedEvent.target.result = null;
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    }
    $scope.TM4encodeImageFileAsURL = function () {
        var filesSelected = document.getElementById("TM4file").files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                $scope.TM4image = fileLoadedEvent.target.result; // <--- data: base64
                fileLoadedEvent.target.result = null;
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    }
    $scope.L1encodeImageFileAsURL = function () {
        var filesSelected = document.getElementById("L1file").files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                $scope.L1image = fileLoadedEvent.target.result; // <--- data: base64
                fileLoadedEvent.target.result = null;
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    }


    $scope.Submit = function () {
        var data = {
            Facilitator: { CircleId: $scope.FacilitatorCircleId, CircleName: $("#circlename").val(), EmpCode: $scope.FacilitatorempCode, EmpName: $scope.FacilitatorempName, Department: $scope.Facilitatordepartment, Grade: $scope.Facilitatorgrade, BusinessUnit: $scope.FacilitatorbusinessUnit, Image: $scope.Facilitatorimage, CircleType: $scope.selectedcircleypevalue, CreatedBy: $scope.EmpCode, UpdatedBy: $scope.EmpCode },
            TL: { CircleId: $scope.TLCircleId, CircleName: $("#circlename").val(), EmpCode: $scope.TLempCode, EmpName: $scope.TLempName, Department: $scope.TLdepartment, Grade: $scope.TLgrade, BusinessUnit: $scope.TLbusinessUnit, Image: $scope.TLimage, CircleType: $scope.selectedcircleypevalue, CreatedBy: $scope.EmpCode, UpdatedBy: $scope.EmpCode },
            TM1: { CircleId: $scope.TM1CircleId, CircleName: $("#circlename").val(), EmpCode: $scope.TM1empCode, EmpName: $scope.TM1empName, Department: $scope.TM1department, Grade: $scope.TM1grade, BusinessUnit: $scope.TM1businessUnit, Image: $scope.TM1image, CircleType: $scope.selectedcircleypevalue, CreatedBy: $scope.EmpCode, UpdatedBy: $scope.EmpCode },
            TM2: { CircleId: $scope.TM2CircleId, CircleName: $("#circlename").val(), EmpCode: $scope.TM2empCode, EmpName: $scope.TM2empName, Department: $scope.TM2department, Grade: $scope.TM2grade, BusinessUnit: $scope.TM2businessUnit, Image: $scope.TM2image, CircleType: $scope.selectedcircleypevalue, CreatedBy: $scope.EmpCode, UpdatedBy: $scope.EmpCode },
            TM3: { CircleId: $scope.TM3CircleId, CircleName: $("#circlename").val(), EmpCode: $scope.TM3empCode, EmpName: $scope.TM3empName, Department: $scope.TM3department, Grade: $scope.TM3grade, BusinessUnit: $scope.TM3businessUnit, Image: $scope.TM3image, CircleType: $scope.selectedcircleypevalue, CreatedBy: $scope.EmpCode, UpdatedBy: $scope.EmpCode },
            TM4: { CircleId: $scope.TM4CircleId, CircleName: $("#circlename").val(), EmpCode: $scope.TM4empCode, EmpName: $scope.TM4empName, Department: $scope.TM4department, Grade: $scope.TM4grade, BusinessUnit: $scope.TM4businessUnit, Image: $scope.TM4image, CircleType: $scope.selectedcircleypevalue, CreatedBy: $scope.EmpCode, UpdatedBy: $scope.EmpCode },
            Level1: { CircleId: $scope.L1CircleId, CircleName: $("#circlename").val(), EmpCode: $scope.L1empCode, EmpName: $scope.L1empName, Department: $scope.L1department, Grade: $scope.L1grade, BusinessUnit: $scope.L1businessUnit, Image: $scope.L1image, CircleType: $scope.selectedcircleypevalue, CreatedBy: $scope.EmpCode, UpdatedBy: $scope.EmpCode }
        };
        if (($scope.testmsg1 == undefined || $scope.testmsg1 == "")) {
            if (($scope.testmsg2 == undefined || $scope.testmsg2 == "")) {
                if (($scope.testmsg3 == undefined || $scope.testmsg3 == "")) {
                    if (($scope.testmsg4 == undefined || $scope.testmsg4 == "")) {
                        if ((($scope.TM1empCode != $scope.TM2empCode) && ($scope.TM1empCode != $scope.TM3empCode) && ($scope.TM1empCode != $scope.TM4empCode))) {
                            $scope.testmsg1 = "";
                            if ((($scope.TM2empCode != $scope.TM1empCode) && ($scope.TM2empCode != $scope.TM3empCode) && ($scope.TM2empCode != $scope.TM4empCode))) {
                                $scope.testmsg2 = "";
                                if ((($scope.TM3empCode != $scope.TM1empCode) && ($scope.TM3empCode != $scope.TM2empCode) && ($scope.TM3empCode != $scope.TM4empCode)) || ($scope.TM3empCode == undefined) || ($scope.TM3empCode == "")) {
                                    $scope.testmsg3 = "";
                                    if ((($scope.TM4empCode != $scope.TM1empCode) && ($scope.TM4empCode != $scope.TM2empCode) && ($scope.TM4empCode != $scope.TM3empCode)) || ($scope.TM4empCode == undefined) || ($scope.TM4empCode == "")) {
                                        $scope.testmsg4 = "";
                                        if ((($scope.testmsg1 == "" || $scope.testmsg1 == undefined) && ($scope.testmsg2 == "" || $scope.testmsg2 == undefined) && ($scope.testmsg3 == "" || $scope.testmsg3 == undefined) && ($scope.testmsg4 == "" || $scope.testmsg4 == undefined))) {
                                            var productionCount = 0
                                            var otherCount = 0;
                                            var mixedCount = 0;
                                            for (var i = 0; i < 4; i++) {
                                                if (i == 0) {
                                                    if ($scope.TM1empCode != "") {
                                                        if ($scope.TM1DepartmentCar == "Production") {
                                                            productionCount++;
                                                        }
                                                        else {
                                                            if (($scope.TM1DepartmentCar != $scope.TM2DepartmentCar) || ($scope.TM1DepartmentCar != $scope.TM3DepartmentCar) || ($scope.TM1DepartmentCar != $scope.TM4DepartmentCar)) {
                                                                mixedCount++;
                                                            }
                                                            else {
                                                                otherCount++;
                                                            }

                                                        }

                                                    }
                                                }
                                                if (i == 1) {
                                                    if ($scope.TM2empCode != "") {
                                                        if ($scope.TM2DepartmentCar == "Production") {
                                                            productionCount++;
                                                        }
                                                        else {
                                                            if (($scope.TM2DepartmentCar != $scope.TM1DepartmentCar) || ($scope.TM2DepartmentCar != $scope.TM3DepartmentCar) || ($scope.TM2DepartmentCar != $scope.TM4DepartmentCar)) {
                                                                mixedCount++;
                                                            }
                                                            else {
                                                                otherCount++;
                                                            }
                                                        }
                                                    }
                                                }

                                                if (i == 2) {
                                                    if ($scope.TM3empCode != undefined) {
                                                        if ($scope.TM3DepartmentCar == "Production") {
                                                            productionCount++;
                                                        }
                                                        else {
                                                            if (($scope.TM3DepartmentCar != $scope.TM1DepartmentCar) || ($scope.TM3DepartmentCar != $scope.TM2DepartmentCar) || ($scope.TM3DepartmentCar != $scope.TM4DepartmentCar)) {
                                                                mixedCount++;
                                                            }
                                                            else {
                                                                otherCount++;
                                                            }
                                                        }
                                                    }
                                                }

                                                if (i == 3) {
                                                    if ($scope.TM4empCode != undefined) {
                                                        if ($scope.TM4DepartmentCar == "Production") {
                                                            productionCount++;
                                                        }
                                                        else {
                                                            if (($scope.TM4DepartmentCar != $scope.TM1DepartmentCar) || ($scope.TM4DepartmentCar != $scope.TM2DepartmentCar) || ($scope.TM4DepartmentCar != $scope.TM3DepartmentCar)) {
                                                                mixedCount++;
                                                            }
                                                            else {
                                                                otherCount++;
                                                            }
                                                        }
                                                    }
                                                }

                                            }
                                            teamDetails.TeamName = $("#circlename").val();
                                            if (productionCount >= 2 || mixedCount >= 2) {
                                                //alert('All From Production');
                                                $http.post('/QCC.Web/TeamRegistration/CirclRegistrationInsert', data).then(function (d) {
                                                    $http.post('/QCC.Web/TeamDetails/SaveOrUpdateTeamDetails', teamDetails).then(function (d) {
                                                        $http.post('/QCC.Web/Login/UserSaveUpdate', $scope.UserRegister).then(function (d) {
                                                         
                                                        }, function (error) {
                                                        });
                                                       
                                                        $scope.StatusMessage = "Thanks You Have Completed Circle Registration Successfully.";
                                                        $scope.btnSubmit = true;
                                                    }, function (error) {

                                                    });
                                                }, function (error) {

                                                });

                                            }
                                            else {
                                                alert("Minimum 2 different departments required or else need 2 Production required");
                                            }
                                        }
                                    }
                                    else {
                                        $scope.testmsg4 = "Team Member Should Not Be Repeated";
                                    }
                                }
                                else {
                                    $scope.testmsg3 = "Team Member Should Not Be Repeated";
                                }
                            }
                            else {
                                $scope.testmsg2 = "Team Member Should Not Be Repeated";
                            }
                        }
                        else {
                            $scope.testmsg1 = "Team Member Should Not Be Repeated";
                        }
                    }
                }
            }
        }
    }
})