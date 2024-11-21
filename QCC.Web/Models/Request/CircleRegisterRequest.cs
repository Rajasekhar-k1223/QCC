using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Request
{
    public class CircleRegisterRequest
    {
        public int CircleId { get; set; }
        public string CircleName { get; set; }
        public int EmpCode { get; set; }
        public string EmpName { get; set; }
        public string Department { get; set; }
        public string Grade { get; set; }
        public string BusinessUnit { get; set; }
        public string Plant { get; set; }
        public string Image { get; set; }
        
        public int CircleType { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public string TeamId { get; set; }
        public string CreatedDate { get; set; }
        public string Exist { get; set; }
    }
}