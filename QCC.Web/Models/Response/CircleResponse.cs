using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class CircleResponse
    {
        public int Id { get; set; }
        public string CircleName { get; set; }
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string Department { get; set; }
        public string Grade { get; set; }
        public string BusinessUnit { get; set; }
        public string Image { get; set; }
        public int CircleType { get; set; }
    }
}