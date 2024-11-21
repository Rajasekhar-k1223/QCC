using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Request
{
    public class ReportsRequest
    {
        public string Company { get; set; }
        public string Plant { get; set; }
        public string BusinessUnit { get; set; }
        public string Department { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }

    }
}