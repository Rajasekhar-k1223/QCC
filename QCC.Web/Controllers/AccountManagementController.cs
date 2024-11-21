using QCC.Web.Models.Request;
using System;
using System.Web.Mvc;



namespace QCC.Web.Controllers
{
    public class AccountManagementController : Controller
    {
        BusinessLogic.BusinessLogic dblayer = new BusinessLogic.BusinessLogic();
        // GET: AccountManagement
        [HttpGet]
        public ActionResult ChangePassword()
        {
            return View();
        }
        
        [HttpPost]
        public ActionResult UpdatePassword(ChangePassword changePassword) {
            try
            {
                string result = dblayer.PasswordUpdate(changePassword);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
    }
}