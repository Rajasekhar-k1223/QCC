using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class BusinessGoalResponse
    {
        public string BusinessUnit { get; set; }
        public string Plant { get; set; }
        public int NoofqcTarget { get; set; }
        public int CirclesYTD { get; set; }
        public int TEITarget { get; set; }
        public int EmployeeHeadCount { get; set; }
        public int EligibleHeadCount { get; set; }
        public int NoofNewCircles { get; set; }
        public int ProjectsTarget { get; set; }
        public int TEIYTD { get; set; }
        public int NoofFacilitators { get; set; }
        public int CirclesperFacilitator { get; set; }
        public int NoOfOldCircles { get; set; }
        public int ProjectsYTD { get; set; }
        //public string TEIGAP { get; set; }
        public string Emp_Code { get; set; }
        public string Executed_Year_Date { get; set; }
        public string Executed_Year { get; set; }
        public string Executed_Month { get; set; }
        public string Yearly { get; set; }
        public string Company { get; set; }


    }
}