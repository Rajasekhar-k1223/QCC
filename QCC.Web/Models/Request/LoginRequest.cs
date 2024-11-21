using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Request
{
    public class LoginRequest
    {
        public string empCode { get; set; }
        public string password { get; set; }
    }
}