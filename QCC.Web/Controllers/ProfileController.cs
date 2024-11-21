using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QCC.Web.Controllers
{
    public class ProfileController : Controller
    {
        // GET: Profile
#pragma warning disable CS0108 // 'ProfileController.Profile()' hides inherited member 'Controller.Profile'. Use the new keyword if hiding was intended.
        public ActionResult Profile()
#pragma warning restore CS0108 // 'ProfileController.Profile()' hides inherited member 'Controller.Profile'. Use the new keyword if hiding was intended.
        {
            return View();
        }
    }
}