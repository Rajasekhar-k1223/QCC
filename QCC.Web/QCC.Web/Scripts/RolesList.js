(function ($) {
    'use strict';
    $(function () {
        var Role = $('#myHiddenroleId').val()
        var empCode = $('#myHiddenempCode').val()
        var empName = $('#myHiddenempName').val()
       
        var d_names = new Array("Sunday", "Monday", "Tuesday",
            "Wednesday", "Thursday", "Friday", "Saturday");

        var m_names = new Array("January", "February", "March",
            "April", "May", "June", "July", "August", "September",
            "October", "November", "December");

        var d = new Date();
        var curr_day = d.getDay();
        var curr_date = d.getDate();
        var sup = "";
        if (curr_date == 1 || curr_date == 21 || curr_date == 31) {
            sup = "st";
        }
        else if (curr_date == 2 || curr_date == 22) {
            sup = "nd";
        }
        else if (curr_date == 3 || curr_date == 23) {
            sup = "rd";
        }
        else {
            sup = "th";
        }
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
        $("#LoginDate").text(d_names[curr_day] + "," + m_names[curr_month] + " " + curr_date + " ," + curr_year);
        $("#empcode").text(empName+" - "+empCode);
        //alert(empCode);
        /*if (Role == "Admin") {
            
           // $('a').contents().unwrap();
            //Role == "Level1"
        } else*/
       
        if (Role == 1) {
            var first = $(location).attr('pathname');
            first.indexOf(1);
            first.toLowerCase();
            first = first.split("/")[3];
            if (first == "dashboard") {

                $("#teamregistration").attr("href", "/QCC.Web/Home/Inflow");
                $("#projectselect").attr("href", "/QCC.Web/ProjectDetails/PendingForApproval");
                $("#businessgoals").attr("href", "#");
                //window.location.href = "/Home/Inflow";
            }
            if (first == "TeamRegistration") {
                $("#submitbtn").hide();
            }
            //        alert(Role);
            //Show    class="New HeaderHide"
            $(".HeaderHide,.Level2Button").hide();

            //.Approved,.Rejected,.Dashboard,
            $(".Inflow,.Home,.Pending_For_Approval, .Project_Final_Approval").css("display", "block");
            //View
            // $(".Section_Wise_Data,.Dashboard").show();       
            //Role == "Level2"

        } else if (Role == 2) {
  
            //Show
            /* var first = $(location).attr('pathname');
             first.indexOf(1);
             first.toLowerCase();
             first = first.split("/")[2];
             if (first == "TeamRegistration") {
                 $("#submitbtn").hide();
             }*/
            $(".HeaderHide").hide();
            var first = $(location).attr('pathname');
            first.indexOf(1);
            first.toLowerCase();
            first = first.split("/")[3];
            if (first == "dashboard") {

                $("#teamregistration").attr("href", "/QCC.Web/Home/TeamRegistration");
                $("#projectselect").attr("href", "/QCC.Web/ProjectDetails/PendingForApproval");

                
                //window.location.href = "/Home/Inflow";
            }
            //.Approved,.Rejected,.Dashboard
            $(".Business_Goals,.Inflow,.Home,.Pending_For_Approval,.Project_Closure_Details,.Project_Final_Approval,.Section_Wise_Data,.Project_Closure").show();

            //Role == "Level3"
        } else if (Role == 3) {
            $(".HeaderHide,.Level2Button").hide();
            var first = $(location).attr('pathname');
            first.indexOf(1);
            first.toLowerCase();
            first = first.split("/")[3];
            if (first == "dashboard") {

                $("#teamregistration").attr("href", "/QCC.Web/Home/Inflow");
                $("#projectselect").attr("href", "/QCC.Web/ProjectDetails/ProjectClosure");
              
                //window.location.href = "/Home/Inflow";
            }
            //Show
            $(".Inflow,.Home,.Project_Closure").show();
            //View
            //$(".Business_Goals,.New,.Approved,.Rejected,.Dashboard,.Projects_Execution,.Section_Wise_Data").show()
        } else if (Role == 5) {

            //Show
            $(".HeaderHide").show();
        } else if (Role == 4) {

            $(".HeaderHide,.Level2Button").hide();
            var first = $(location).attr('pathname');
            first.indexOf(1);
            first.toLowerCase();
            first = first.split("/")[3];
            if (first == "dashboard") {

                $("#teamregistration").attr("href", "/QCC.Web/Home/TeamRegistration");
                $("#projectselect").attr("href", "/QCC.Web/ProjectDetails/ProjectSelectionSheet");
                $("#businessgoals").attr("href", "#");
                //window.location.href = "/Home/Inflow";
            }
            $(".New,.Home,.Profile,.Reports,.Approved,.Rejected,.Project_Selection_Sheet").show();

        }
        //else
        //{
        //    var first = $(location).attr('pathname');
        //    first.indexOf(1);
        //    first.toLowerCase();
        //    first = first.split("/")[3];
        //    if (first == "dashboard") {

        //        $("#teamregistration").attr("href", "/Home/Inflow");
        //        $("#projectselect").attr("href", "/ProjectDetails/PendingForApproval");
        //        //window.location.href = "/Home/Inflow";
        //    }
        //    if (first == "TeamRegistration") {
        //        $("#submitbtn").hide();
        //    }
        //    //        alert(Role);
        //    //Show    class="New HeaderHide"
        //    $(".HeaderHide").hide();


        //    //.Approved,.Rejected,.Dashboard,
        //    $(".Inflow,.Home,.Pending_For_Approval, .Project_Final_Approval").css("display", "block");
        //    //View
        //    // $(".Section_Wise_Data,.Dashboard").show();       
        //    //Role == "Level2"
        //}
    });

})(jQuery);