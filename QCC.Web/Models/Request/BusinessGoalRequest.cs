using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Request
{
    public class BusinessGoalRequest
    {
        public string BusinessUnit { get; set; }
        public string Plant { get; set; }
        public string NoofqcTarget { get; set; }
        public string CirclesYTD { get; set; }
        public string TEITarget { get; set; }
        public string EmployeeHeadCount { get; set; }
        public string EligibleHeadCount { get; set; }
        public string NoofNewCircles { get; set; }
        public string ProjectsTarget { get; set; }
        public string TEIYTD { get; set; }
        public string NoofFacilitators { get; set; }
        public string CirclesperFacilitator { get; set; }
        public string NoOfOldCircles { get; set; }
        public string ProjectsYTD { get; set; }
        public string TEIGAP { get; set; }
        public string Emp_Code { get; set; }
        public string Executed_Year_Date { get; set; }
        public string Executed_Year { get; set; }
        public string Executed_Month { get; set; }
        public string Yearly { get; set; }
        public string Company { get; set; }
        public string InvolvedHeadCount { get; set; }
    }
}