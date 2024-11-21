using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class ConventionNationalResponse
    {
        public List<NationalConventionResponse>  nationalConventionResponses { get; set; }
        public string totalCount { get; set; }
    }
}