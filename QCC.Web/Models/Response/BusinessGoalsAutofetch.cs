using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class BusinessGoalsAutofetch
    {
        public string BusinessUnit { get; set; }
        public string Plant { get; set; }
        public int InvolvementHeadCount { get; set; }
        public int NoofOldCircles { get; set; }
        public int NoofNewCircles { get; set; }
        public int NoofCirclesYTD { get; set; }
        public int EligibleHeadCount { get; set; }
        public int EmployeeHeadCount { get; set; }
        public int NoofQcTarget { get; set; }
        public int TEIYTD { get; set; }
        public int NoofProjectsYTD { get; set; }
    }
}