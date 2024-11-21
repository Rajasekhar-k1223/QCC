using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Request
{
    public class EmployeeByLevelRequest
    {
        public string BusinessUnit { get; set; }
        public string Plant { get; set; }
        public int RoleId { get; set; }
    }
}