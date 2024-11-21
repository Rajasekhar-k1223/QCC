using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class LoginResponse
    {
        public string empMailId { get; set; }
        public string empCode { get; set; }
        public string empName { get; set; }
        public string FunctionCode { get; set; }
        public string Company { get; set; }
        public string FunctionDesc { get; set; }
    }
}