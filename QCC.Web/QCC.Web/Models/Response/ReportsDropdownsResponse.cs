using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class ReportsDropdownsResponse
    {
        public List<dynamic> Company { get; set; }
        public List<dynamic> Plant { get; set; }
        public List<dynamic> Department { get; set; }
        public List<dynamic> BusinessUnit { get; set; }
    }
}