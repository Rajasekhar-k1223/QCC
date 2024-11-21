using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class TeamDetails
    {
        public List<TemaDetailsResponse> temaDetailsResponse { get; set; }
        public string totalCount { get; set; }
    }
}