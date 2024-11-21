using QCC.Web.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Request
{
    public class TeamRegistrationRequest
    {
        public CircleRegisterRequest Facilitator { get; set; }
        public CircleRegisterRequest TL { get; set; }
        public CircleRegisterRequest TM1 { get; set; }
        public CircleRegisterRequest TM2 { get; set; }
        public CircleRegisterRequest TM3 { get; set; }
        public CircleRegisterRequest TM4 { get; set; }
        public CircleRegisterRequest Level1 { get; set; }
    }
}