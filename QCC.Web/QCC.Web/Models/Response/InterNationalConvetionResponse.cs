using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class InterNationalConvetionResponse
    {
        public List<InterNationalConvetionsResponse> interNationalConvetionsResponses { get; set; }
        public string totalCount { get; set; }
    }
}