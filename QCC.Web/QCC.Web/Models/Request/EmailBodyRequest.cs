using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Request
{
    public class EmailBodyRequest
    {
        public string email { get; set; }
        public string subject { get; set; }
        public string emailBody { get; set; }
    }
}