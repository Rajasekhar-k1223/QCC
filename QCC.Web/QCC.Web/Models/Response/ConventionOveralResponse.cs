using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class ConventionOveralResponse
    {
        public List<ReportsResponse>   reportsResponses { get; set; }
        public string totalCount { get; set; }
    }
}