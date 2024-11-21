using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Request
{
    public class TeamDetailsRequest
    {
        public string Company { get; set; }
        public string BusinessUnit { get; set; }
        public string Plant { get; set; }
        public string TeamName { get; set; }
        public string Status { get; set; }
        public string Level1 { get; set; }
        public string Level2 { get; set; }
        public string Level3 { get; set; }
        public string Remarks { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}