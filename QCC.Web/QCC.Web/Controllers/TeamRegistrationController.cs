using QCC.Web.Models.Request;
using QCC.Web.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QCC.Web.Controllers
{
    public class TeamRegistrationController : Controller
    {
        BusinessLogic.BusinessLogic dblayer = new BusinessLogic.BusinessLogic();

        /// <summary>
        /// API For CircleExistOrNot
        /// </summary>
        /// <param name="circleName"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult CircleExistOrNot(string circleName)
        {
            try
            {
                string Response = dblayer.CircleExistOrNot(circleName);
                return Json(Response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        /// <summary>
        /// API For FetchEmployeeDetailsByEmpCode
        /// </summary>
        /// <param name="empCode"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult FetchEmployeeDetailsByEmpCode(string empCode, string functionCode)
        {
            try
            {
                var employeeInfoResponse = new EmployeeInfoResponse();
                if (!string.IsNullOrEmpty(empCode))
                {
                    employeeInfoResponse = dblayer.FetchEmployeeDetailsByEmpCode(empCode, functionCode);
                }
                return Json(employeeInfoResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult FaclitatorFetchEmployeeDetailsByEmpCode(string empCode, string functionCode)
        {
            try
            {
                var employeeInfoResponse = new EmployeeInfoResponse();
                if (!string.IsNullOrEmpty(empCode))
                {
                    employeeInfoResponse = dblayer.FaclitatorFetchEmployeeDetailsByEmpCode(empCode, functionCode);
                }
                return Json(employeeInfoResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        /// <summary>
        /// API For CirclRegistrationInsert
        /// </summary>
        /// <param name="teamRegistrationRequest"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult CirclRegistrationInsert(TeamRegistrationRequest teamRegistrationRequest)
        {
            try
            {
                string response = dblayer.CirclRegistrationInsert(teamRegistrationRequest);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        /// <summary>
        /// API For FetchCircleDetails By Circle Name
        /// </summary>
        /// <param name="CircleName"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult FetchCircleDetailsByName(string CircleName, string EmpCode, string Plant, string Businessunit)
        {
            try
            {
                var circleRegistrationResponse = new List<CircleRegistrationResponse>();
                circleRegistrationResponse = dblayer.FetchCircleDetailsByName(CircleName, EmpCode, Plant, Businessunit);
                return Json(circleRegistrationResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult FetchEmployeeByLevel(string BusinessUnit, string Plant, int RoleId)
        {
            try
            {
                var employeeLevelResponse = new List<EmployeeLevelResponse>();
                employeeLevelResponse = dblayer.FetchEmployeeByLevel(BusinessUnit, Plant, RoleId);
                return Json(employeeLevelResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        /// <summary>
        /// New APIs 01/05/2020
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult FetchCircleType()
        {
            try
            {
                var circleType = new List<CircleType>();
                circleType = dblayer.FetchCircleType();
                return Json(circleType, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult TeamMemberExistOrNotInCircle(string empCode)
        {
            try
            {
                var circleType = new CircleResponse();
                circleType = dblayer.TeamMemberExistOrNot(empCode);
                return Json(circleType, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult BusinessGoalsAutoFetch(string empCode)
        {
            try
            {
                var circleType = new BusinessGoalsAutofetch();
                circleType = dblayer.BusinessGoalsAutoFetch(empCode);
                return Json(circleType, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpPost]
        public ActionResult ReportsFetch(ReportsRequest reportsRequest)
        {
            try
            {
                var reportsResponse = new List<ReportsResponse>();
                reportsResponse = dblayer.ReportsFetch(reportsRequest);
                return Json(reportsResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpPost]
        public ActionResult ReportsFetchList(ReportsRequest reportsRequest)
        {
            try
            {
                var reportsResponse = new List<ReportsResponse>();
                reportsResponse = dblayer.ReportsFetchList(reportsRequest);
                return Json(reportsResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult ReportsDroppDownResponse()
        {
            try
            {
                var reportsDropdownsResponse = new ReportsDropdownsResponse();
                reportsDropdownsResponse = dblayer.ReportsDroppDownResponse();
                return Json(reportsDropdownsResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpPost]
        public ActionResult SaveInternalConventions(InternalConventionRequest[] internalConventionRequests)
        {
            try
            {
                string response = null;
                if (internalConventionRequests != null)
                    response = dblayer.SaveInternalConventions(internalConventionRequests);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpPost]
        public ActionResult SaveChapterConventions(ChapterConventionRequest[] chapterConventionRequests)
        {
            try
            {
                string response = null;
                if (chapterConventionRequests != null)
                    response = dblayer.SaveChapterConventions(chapterConventionRequests);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpPost]
        public ActionResult SaveNationalConventions(NationalConventionRequest[] nationalConventionRequests)
        {
            try
            {
                string response = null;
                if (nationalConventionRequests != null)
                    response = dblayer.SaveNationalConventions(nationalConventionRequests);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpPost]
        public ActionResult SaveInterNationalConventions(InterNationalConvetionsRequest[] interNationalConvetionsRequests)
        {
            try
            {
                string response = null;
                if (interNationalConvetionsRequests != null)
                    response = dblayer.SaveInterNationalConventions(interNationalConvetionsRequests);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult GetChapterConventions(int pageIndex, int pageSize)
        {
            try
            {
                var conventionChapterResponse = new ConventionChapterResponse();
                conventionChapterResponse = dblayer.GetChapterConventions(pageIndex, pageSize);
                return Json(conventionChapterResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult GetNationalConventions(int pageIndex, int pageSize)
        {
            try
            {
                var conventionNationalResponse = new ConventionNationalResponse();
                conventionNationalResponse = dblayer.GetNationalConventions(pageIndex, pageSize);
                return Json(conventionNationalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult GetInterNationalConventions(int pageIndex, int pageSize)
        {
            try
            {
                var conventionInternationalResponse = new ConventionInternationalResponse();
                conventionInternationalResponse = dblayer.GetInterNationalConventions(pageIndex, pageSize);
                return Json(conventionInternationalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }


        [HttpPost]
        public ActionResult DeleteChapterConventions(string strIds)
        {
            try
            {

                int result = dblayer.DeleteChapterConventions(strIds);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpPost]
        public ActionResult DeleteNationalConventions(string strIds)
        {
            try
            {

                int result = dblayer.DeleteNationalConventions(strIds);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpPost]
        public ActionResult DeleteInterNationalConvetions(string strIds)
        {
            try
            {

                int result = dblayer.DeleteInterNationalConvetions(strIds);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }


        [HttpGet]
        public ActionResult InternalConventionsFetch(int pageIndex, int pageSize)
        {
            try
            {
                var internalConventionResponse = new InternalConventionResponse();
                internalConventionResponse = dblayer.GetInternalConventions(pageIndex, pageSize);
                return Json(internalConventionResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult OveralConventionsFetch(int pageIndex, int pageSize)
        {
            try
            {
                var conventionOveralResponse = new ConventionOveralResponse();
                conventionOveralResponse = dblayer.OverallConventionsFetch(pageIndex, pageSize);
                return Json(conventionOveralResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult InternalConventionsAwardsFetch()
        {
            try
            {
                var awardsResponse = new List<AwardsResponse>();
                awardsResponse = dblayer.InternalConventionsAwardResponse();
                return Json(awardsResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult ChapterConventionsAwardsFetch()
        {
            try
            {
                var awardsResponse = new List<AwardsResponse>();
                awardsResponse = dblayer.ChapterConventionsAwardResponse();
                return Json(awardsResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult NationalConventionsAwardsFetch()
        {
            try
            {
                var awardsResponse = new List<AwardsResponse>();
                awardsResponse = dblayer.NationalConventionsAwardResponse();
                return Json(awardsResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }


        }
        [HttpGet]
        public ActionResult InternationalConventionsAwardsFetch()
        {
            try
            {
                var awardsResponse = new List<AwardsResponse>();
                awardsResponse = dblayer.InternationalConventionsAwardResponse();
                return Json(awardsResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult GetCircleRegistrationDetailsByCircle(string CircleName)
        {
            try
            {
                var teamRegistrationResponse = new List<CircleRegisterRequest>();
                teamRegistrationResponse = dblayer.GetCircleRegistrationDetailsByCircle(CircleName);
                return Json(teamRegistrationResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpPost]
        public ActionResult DeleteInternalConventions(string strIds)
        {
            try
            {

                int result = dblayer.DeleteInternalConventions(strIds);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult NotificationAlert(string empCode)
        {
            try
            {
                var notificationAlertResponse = new NotificationAlertResponse();
                if (!string.IsNullOrEmpty(empCode))
                    notificationAlertResponse = dblayer.NotificationAlert(empCode);
                return Json(notificationAlertResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult NotificationAlertAdmin(string empCode)
        {
            try
            {
                var notificationAlertResponse = new NotificationAlertResponse();
                if (!string.IsNullOrEmpty(empCode))
                    notificationAlertResponse = dblayer.NotificationAlertAdmin(empCode);
                return Json(notificationAlertResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult conventionsConClaveScoreAward(string TeamName)
        {
            try
            {
                var conventionsScoreAndAwards = dblayer.conventionsConClaveScoreAward(TeamName);
                return Json(conventionsScoreAndAwards, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpPost]
        public ActionResult DeleteUsersByEmpCode(string Id,string Plant)
        {
            try
            {

                int result = dblayer.DeleteUsersByEmpCode(Id,Plant);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

      
        [HttpGet]
        public ActionResult FetchEmployeeDetailsByLevel(string empCode)
        {
            try
            {
                var employeeInfoResponse = new EmployeeInfoResponse();
                if (!string.IsNullOrEmpty(empCode))
                {
                    employeeInfoResponse = dblayer.FetchEmployeeDetailsByLevel(empCode);
                }
                return Json(employeeInfoResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

    }
}