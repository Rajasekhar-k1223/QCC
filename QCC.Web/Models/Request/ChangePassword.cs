using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Request
{
    public class ChangePassword
    {
        public string EmpCode { get; set; }
        public string Password { get; set; }
     
    }
}