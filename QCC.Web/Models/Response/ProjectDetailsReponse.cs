using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class ProjectDetailsResponse
    {
        public List<ProjectSelectionSheetResponse> projectSelectionSheetResponse { get; set; }
        public string totalCount { get; set; }
    }
}