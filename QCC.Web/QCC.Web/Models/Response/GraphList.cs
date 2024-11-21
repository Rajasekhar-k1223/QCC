using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class GraphList
    {
        public List<BusinessGoalResponse> businessGoalResponse { get; set; }
        public string totalCount { get; set; }
        public string Years { get; set; }
    }
    
}
