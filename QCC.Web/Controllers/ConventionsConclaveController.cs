using QCC.Web.Models.Request;
using QCC.Web.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QCC.Web.Controllers
{
    public class ConventionsConclaveController : Controller
    {
        BusinessLogic.BusinessLogic dblayer = new BusinessLogic.BusinessLogic();
        public ActionResult ConventionsConclave()
        {
            return View();

        }
        public ActionResult ConventionalGraph()
        {
            return View();

        }
        [HttpGet]
        public ActionResult FetchNationConventionByAwardsYearGold(string BussinessUnit,string Department,string Yearly)
        {
            try
            {
                var businessGoalResponse = new ConventionNationalResponse();
                if (!string.IsNullOrEmpty(Yearly))
                    businessGoalResponse = dblayer.FetchNationConventionByAwardsByYearGold(BussinessUnit,Department,Yearly);
                return Json(businessGoalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult FetchNationConventionByAwardsYearSilver(string BussinessUnit, string Department, string Yearly)
        {
            try
            {
                var businessGoalResponse = new ConventionNationalResponse();
                if (!string.IsNullOrEmpty(Yearly))
                    businessGoalResponse = dblayer.FetchNationConventionByAwardsByYearSilver(BussinessUnit, Department, Yearly);
                return Json(businessGoalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
    }
}