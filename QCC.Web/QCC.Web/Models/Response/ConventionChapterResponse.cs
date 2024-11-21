using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class ConventionChapterResponse
    {
        public List<ChapterConventionResponse> chapterConventionResponse { get; set; }
        public string totalCount { get; set; }
    }
}