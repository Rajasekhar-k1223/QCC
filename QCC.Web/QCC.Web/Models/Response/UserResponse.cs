using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class UserResponse
    {
        public int Id { get; set; }
        public int EmpCode { get; set; }
        public string Password { get; set; }
        public string EmpName { get; set; }
        public string Grade { get; set; }
        public string Department { get; set; }
        public string Company { get; set; }
        public string EmpMailId { get; set; }
        public string BusinessUnit { get; set; }
        public string Plant { get; set; }
        public int RoleId { get; set; }
        //public string Level1 { get; set; }
        //public string Level2 { get; set; }
        //public string Level3 { get; set; }
    }
}