using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class PlantDropdownResponse
    {
        public int Id { get; set; }
        public string Plant { get; set; }
        public string BusinessUnit { get; set; }
        public string Company { get; set; }
    }
}