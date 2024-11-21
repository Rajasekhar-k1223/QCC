using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class EmployeeList
    {
        public List<UserResponse> userResponse { get; set; }
        public string totalCount { get; set; }
    }
}