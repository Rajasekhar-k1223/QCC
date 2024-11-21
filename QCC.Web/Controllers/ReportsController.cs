using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QCC.Web.Controllers
{
    public class ReportsController : Controller
    {
        public ActionResult Reports()
        {
            return View();
        }
        public ActionResult Graphs()
        {
            return View();
        }
        public ActionResult TotalReports()
        {
            return View();
        }
    }
}