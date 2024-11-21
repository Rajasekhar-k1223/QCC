using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Request
{
    public class UserRequest
    {
        public int Id { get; set; }
        public string EmpCode { get; set; }
        public string Password { get; set; }
        public string EmpName { get; set; }
        public string Grade { get; set; }
        public string Department { get; set; }
        public string Company { get; set; }
        public string EmpMailId { get; set; }
        public string BusinessUnit { get; set; }
        public string Plant { get; set; }
        public int RoleId { get; set; }
    }
}