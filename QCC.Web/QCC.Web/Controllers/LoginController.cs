using QCC.Web.Models.Request;
using QCC.Web.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QCC.Web.Controllers
{
    public class LoginController : Controller
    {
        BusinessLogic.BusinessLogic dblayer = new BusinessLogic.BusinessLogic();
        /// <summary>
        /// API For UserLogin
        /// </summary>
        /// <param name="loginRequest"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult UserLogin(LoginRequest loginRequest)
        {
            try
            {
                var loginInfo = new LoginInfo();
                loginInfo = dblayer.userLogin(loginRequest);
                if (!string.IsNullOrEmpty(loginInfo.loginResponse.empCode))
                {
                    Session["empCode"] = loginInfo.loginResponse.empCode;
                    Session["empMailId"] = loginInfo.loginResponse.empMailId;
                    Session["empName"] = loginInfo.loginResponse.empName;
                    Session["roleId"] = loginInfo.RoleId;
                    Session["functionCode"] = loginInfo.loginResponse.FunctionCode;
                }
                else
                {
                    //result = "Email or Password is wrong";
                }
                return Json(loginInfo, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }

        }

        public ActionResult LoginRegister()
        {
            return View();
        }
        //public ActionResult ApprovalRegister()
        //{
        //    return View();
        //}

        /// <summary>
        /// API For UserSaveUpdate
        /// </summary>
        /// <param name="userRequest"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult UserSaveUpdate(UserRequest userRequest)
        {
            try
            {
                string result = dblayer.UserRegisterSaveUpdate(userRequest);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        /// <summary>
        /// API For UserSaveUpdateLevel1
        /// </summary>
        /// <param name="userRequest"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult UserSaveUpdateLevel1(UserRequest userRequest)
        {
            try
            {
                string result = dblayer.UserRegisterSaveUpdateLevel1(userRequest);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        /// <summary>
        /// API For FetchLoginRegisterByEmpCode
        /// </summary>
        /// <param name="EmpCode"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult FetchLoginRegisterByEmpCode(string EmpCode)
        {
            try
            {
                var userResponse = new UserResponse();
                if(!string.IsNullOrEmpty(EmpCode))
                userResponse = dblayer.FetchLoginRegisterByEmpCode(EmpCode);
                return Json(userResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        /// <summary>
        /// API For GetUsersList
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult GetUsersList(int pageIndex, int pageSize)
        {
            try
            {
                var employeeList = new EmployeeList();
                employeeList = dblayer.GetUsersList(pageIndex, pageSize);
                return Json(employeeList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        /// <summary>
        /// API For GetRoles
        /// </summary>
        [HttpGet]
        public ActionResult GetLevels()
        {
            try
            {
                var rolesResponse = new List<RolesResponse>();
                rolesResponse = dblayer.FetchRoles();
                return Json(rolesResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        /// <summary>
        /// API For FetchPlants
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult FetchPlants()
        {
            try
            {
                var plantDropdownResponseolesResponse = new List<PlantDropdownResponse>();
                plantDropdownResponseolesResponse = dblayer.FetchPlants();
                return Json(plantDropdownResponseolesResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public void Logout()
        {
            Session.Abandon();
        }
        [HttpPost]
        public ActionResult UserUpdate(UserRequest userRequest)
        {
            try
            {
                string result = dblayer.UserRegisterUpdate(userRequest);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
    }
}