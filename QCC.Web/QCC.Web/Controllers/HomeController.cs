using QCC.Web.Models;
using QCC.Web.Models.Request;
using QCC.Web.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QCC.Web.Controllers
{
    public class HomeController : Controller
    {
       
        public ActionResult Index()

        {

            return View();

        }

        public ActionResult dashboard()

        {
           // String email = this.HttpContext.Session["empName"].ToString();
            return View();

        }
        public ActionResult TeamRegistration()
        {
            return View();
        }
        public ActionResult Inflow()
        {
            return View();
        }
        public ActionResult Approved()
        {
            return View();
        }
        public ActionResult Rejected()
        {
            return View();
        }

        public ActionResult BusinessGaols()
        {
            return View();
        }
        
    }
}