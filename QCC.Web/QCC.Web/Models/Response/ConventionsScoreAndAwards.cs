using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class ConventionsScoreAndAwards
    {
        public List<InternalConventionScoreAndAwards> internalConventionScoreAndAwards { get; set; }
        public List<ChapterConventionsScoreAndAwards> chapterConventionsScoreAndAwards { get; set; }
        public List<NationalConventionScoreAndAward> nationalConventionScoreAndAwards { get; set; }
        public List<InternationalConventionScoreAndAward> internationalConventionScoreAndAwards { get; set; }
    }
}