
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class NotificationAlertResponse
    {
        public int ApproveCount { get; set; }
        public int RejectCount { get; set; }
        public int InflowCount { get; set; }
        public int ProjectDetails { get; set; }
    }
}