using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class EmployeeLevelResponse
    {
        public int Id { get; set; }
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string BusinessUnit { get; set; }
        public string Plant { get; set; }
    }
}