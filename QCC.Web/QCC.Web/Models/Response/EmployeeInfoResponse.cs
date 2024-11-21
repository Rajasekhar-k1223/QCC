using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class EmployeeInfoResponse
    {
        public string empCode { get; set; }
        public string empName { get; set; }
        public string department { get; set; }
        public string grade { get; set; }
        public string company { get; set; }
        public string businessUnit { get; set; }
        public string Plant { get; set; }
        public string emailId { get; set; }
        public string l1 { get; set; }
        public string DepartmentCar { get; set; }
        public string FunctionCode { get; set; }
    }
}