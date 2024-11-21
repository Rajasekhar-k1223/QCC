using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class LoginInfo
    {
        public LoginResponse  loginResponse { get; set; }
        public string RoleId { get; set; }
    }
}