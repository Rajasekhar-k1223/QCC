using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Request
{
   
        public class ICQCCConventionsRequest
        {
            public int Id { get; set; }
            public string Company { get; set; }
            public string BusinessUnit { get; set; }
            public string Plant { get; set; }
            public string Department { get; set; }
            public string QCName { get; set; }
            public string ProjectTitle { get; set; }
            public string FacilitatorName { get; set; }
            public string TeamCount { get; set; }
            public string NoOfProjects { get; set; }
            public string CostSaving { get; set; }
            public string TeamStatus { get; set; }
            public string Awards { get; set; }
            public string Yearly { get; set; }
            public string Score { get; set; }
            public string TeamId { get; set; }
            public string ActiveStatus { get; set; }
    }
}
