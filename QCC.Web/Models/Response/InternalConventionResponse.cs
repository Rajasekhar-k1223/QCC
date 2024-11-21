using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class InternalConventionResponse
    {
        public List<InternalConventionsResponse> internalConventionsResponses { get; set; }
        public string totalCount { get; set; }
    }
}