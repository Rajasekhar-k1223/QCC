using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class ConventionsConClaveResponse
    {
        public string InternalScore { get; set; }
        public string InternalAward { get; set; }
        public string ChapterScore { get; set; }
        public string ChapterAward { get; set; }
        public string NationalScore { get; set; }
        public string NationalAward { get; set; }
        public string InterNationalScore { get; set; }
        public string InterNationalAward { get; set; }
    }
}