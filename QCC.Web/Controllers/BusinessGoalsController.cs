using QCC.Web.Models.Request;
using QCC.Web.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QCC.Web.Controllers
{
    public class BusinessGoalsController : Controller
    {
        BusinessLogic.BusinessLogic dblayer = new BusinessLogic.BusinessLogic();

        /// <summary>
        /// API for BusinessGoals Insert and Update
        /// </summary>
        /// <param name="businessGoalRequest"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult BusinessGoalsInsertUpdate(BusinessGoalRequest businessGoalRequest)
        {
            try
            {
                string result = dblayer.BusinessGoalsInsertUpdate(businessGoalRequest);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult FetchBusinessGoalsByEmpCode(string empCode)
        {
            try
            {
                var businessGoalResponse = new GraphList();
                if (!string.IsNullOrEmpty(empCode))
                    businessGoalResponse = dblayer.FetchBusinessGoalsListEmpCode(empCode);
                return Json(businessGoalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult BusinessGolsGetByEmpCodeYear(string empCode, string yearSelect) {
            try
            {
                var businessGoalResponse = new GraphList();
                if (!string.IsNullOrEmpty(empCode))
                    businessGoalResponse = dblayer.FetchBusinessGoalsListEmpCodeYear(empCode, yearSelect);
                return Json(businessGoalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        /// <summary>
        /// API For BusinessGoals Fetting Records By BusinessUnit
        /// </summary>
        /// <param name="BusinessUnit"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult BusinessGolsGetByEmpCode(string empCode)
        {
            try
            {
                var businessGoalResponse = new BusinessGoalResponse();
                if(!string.IsNullOrEmpty(empCode))
                businessGoalResponse = dblayer.FetchBusinessGoalByBusinessUnit(empCode);
                return Json(businessGoalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult BusinessGolsGetByEmpCodeYTD(string empCode, string Year)
        {
            try
            {
                var businessGoalResponse = new BusinessGoalResponse();
                if (!string.IsNullOrEmpty(empCode))
                    businessGoalResponse = dblayer.FetchBusinessGoalByBusinessUnitYTD(empCode, Year);
                return Json(businessGoalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult BusinessGolsGetByYearCount()
        {
            try
            {
                var businessGoalResponse = new GraphList1();

                businessGoalResponse = dblayer.FtechBusinessGolsGetByYearCount();
                return Json(businessGoalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult BusinessGolsGetByYearCountPlant(string Yearly)
        {
            try
            {
                var businessGoalResponse = new GraphList1();

                businessGoalResponse = dblayer.FtechBusinessGolsGetByYearCountPlant(Yearly);
                return Json(businessGoalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult BusinessGolsGetByYearCountCompany(string Company,string empCode)
        {
            try
            {
                var businessGoalResponse = new GraphList1();

                businessGoalResponse = dblayer.FtechBusinessGolsGetByYearCountCompany(Company,empCode);
                return Json(businessGoalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
        }
    }
}