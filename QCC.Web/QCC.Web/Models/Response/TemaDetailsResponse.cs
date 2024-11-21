using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class TemaDetailsResponse
    {
        public int Id { get; set; }
        public string Company { get; set; }
        public string BusinessUnit { get; set; }
        public string Plant { get; set; }
        public string TeamName { get; set; }
        public string Status { get; set; }
        public string Level1 { get; set; }
        public string Level2 { get; set; }
        public string Level3 { get; set; }
        public string StatusName { get; set; }
        public string Remarks { get; set; }
        public string PlLoginMailId { get; set; }
        public string L1MailId { get; set; }
        public string L2MailId { get; set; }
        public string L3MailId { get; set; }
        public string TeamStrength { get; set; }

    }
}