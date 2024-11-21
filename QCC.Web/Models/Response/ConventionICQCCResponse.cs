using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class ConventionICQCCResponse
    {
        public List<ICQCCConventionsResponse> iCQCCConventionResponse { get; set; }
        public string totalCount { get; set; }
    }
}