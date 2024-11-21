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
        public ActionResult CircleExistOrNot(string circleName,string plant,string createdDate)
        {
            try
            {
                string Response = dblayer.CircleExistOrNot(circleName,plant,createdDate);
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
        public ActionResult FetchEmployeeDetailsByEmpCode(string empCode, string functionCode,string company)
        {
            try
            {
                var employeeInfoResponse = new EmployeeInfoResponse();
                if (!string.IsNullOrEmpty(empCode))
                {
                    employeeInfoResponse = dblayer.FetchEmployeeDetailsByEmpCode(empCode, functionCode,company);
                }
                return Json(employeeInfoResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult FetchL2FunctionCode(string Plant, string Company)
        {
            try
            {
                var employeeInfoResponse = new EmployeeInfoResponse();
                if (!string.IsNullOrEmpty(Company))
                {
                    employeeInfoResponse = dblayer.FetchL2FunctionCode(Plant,Company);
                }
                return Json(employeeInfoResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult FetchL3FunctionCode(string Plant, string Company)
        {
            try
            {
                var employeeInfoResponse = new EmployeeInfoResponse();
                if (!string.IsNullOrEmpty(Company))
                {
                    employeeInfoResponse = dblayer.FetchL3FunctionCode(Plant, Company);
                }
                return Json(employeeInfoResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult FaclitatorFetchEmployeeDetailsByEmpCode(string empCode, string functionCode,string company)
        {
            try
            {
                var employeeInfoResponse = new EmployeeInfoResponse();
                if (!string.IsNullOrEmpty(empCode))
                {
                    employeeInfoResponse = dblayer.FaclitatorFetchEmployeeDetailsByEmpCode(empCode, functionCode,company);
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
        [HttpGet]
        public ActionResult DeleteTeamMember(string CircleId) {
            try
            {
                string response = dblayer.TemaMeberDelete(CircleId);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult InternationalDeleteAfterSubmit(string Id)
        {
            try
            {
                string response = dblayer.InternationalDeleteAfterSubmit(Id);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult ApprovedTeamStatus(string TeamId,string Status)
        {
            try
            {
                string response = dblayer.ApprovedTeamStatus(TeamId,Status);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }


        [HttpPost]
        public ActionResult TeamMemberUpdate(CircleRegisterRequest circleRegisterRequest)
        {
            try
            {
                string response = dblayer.TeamMemberUpdate(circleRegisterRequest);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpPost]
        public ActionResult TeamUpdateToFlow(CircleRegisterRequest circleRegisterRequest)
        {
            try
            {
                string response = dblayer.TeamUpdateToFlow(circleRegisterRequest);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpPost]
        public ActionResult TeamMemberInsert(CircleRegisterRequest circleRegisterRequest)
        {
            try
            {
                string response = dblayer.TeamMemberInsert(circleRegisterRequest);
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
        public ActionResult FetchCircleDetailsByName(string TeamId, string EmpCode, string Plant, string Businessunit)
        {
            try
            {
                var circleRegistrationResponse = new List<CircleRegistrationResponse>();
                circleRegistrationResponse = dblayer.FetchCircleDetailsByName(TeamId, EmpCode, Plant, Businessunit);
                return Json(circleRegistrationResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult DeleteCircleDetailsByName(string Id,string empCode)
        {
            try
            {
           
                int circleRegistrationResponse = dblayer.DeleteCircleDetailsByName(Id, empCode);
                return Json(circleRegistrationResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult FetchCircleDetailsByNameConventions(string CircleName,string TeamId)
        {
            try
            {
                var circleRegistrationResponse = new List<CircleRegistrationResponse>();
                circleRegistrationResponse = dblayer.FetchCircleDetailsByNameConventions(CircleName,TeamId);
                return Json(circleRegistrationResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult FetchCircleDetailsByNameConventionName(string CircleName)
        {
            try
            {
                var circleRegistrationResponse = new List<CircleRegistrationResponse>();
                circleRegistrationResponse = dblayer.FetchCircleDetailsByNameConventionName(CircleName);
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
        public ActionResult TeamMemberExistOrNotInCircle(string empCode,String StartDate,String EndDate )
        {
            try
            {
                var circleType = new CircleResponse();
                circleType = dblayer.TeamMemberExistOrNot(empCode,StartDate,EndDate);
                return Json(circleType, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult BusinessGoalsAutoFetch(string empCode,string startDate, string endDate)
        {
            try
            {
                var circleType = new BusinessGoalsAutofetch();
                circleType = dblayer.BusinessGoalsAutoFetch(empCode, startDate,endDate);
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
        public ActionResult ReportsFetchLevel(ReportsRequest reportsRequest)
        {
            try
            {
                var reportsResponse = new List<ReportsResponse>();
                reportsResponse = dblayer.ReportsFetchLevel(reportsRequest);
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
        [HttpGet]
        public ActionResult ReportsDroppDownResponseLevel(string empCode)
        {
            try
            {
                var reportsDropdownsResponse = new ReportsDropdownsResponse();
                reportsDropdownsResponse = dblayer.ReportsDroppDownResponseLevel(empCode);
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
        public ActionResult SaveInternalConventionsDraft(InternalConventionDraftRequest[] internalConventionDraftRequests)
        {
            try
            {
                string response = null;
                if (internalConventionDraftRequests != null)
                    response = dblayer.SaveInternalConventionsDraft(internalConventionDraftRequests);
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
        [HttpPost]
        public ActionResult SaveICQCCConventions(ICQCCConventionsRequest[] iCQCCConventionsRequests)
        {
            try
            {
                string response = null;
                if (iCQCCConventionsRequests != null)
                    response = dblayer.SaveICQCCConventions(iCQCCConventionsRequests);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        
        [HttpGet]
        public ActionResult GettotalInternalProject()
        {
            try
            {
                var businessGoalResponse = new GraphList();
                    businessGoalResponse = dblayer.GettotalInternalProject();
                return Json(businessGoalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult GettotalChapterProject()
        {
            try
            {
                var businessGoalResponse = new GraphList();
                businessGoalResponse = dblayer.GettotalChapterProject();
                return Json(businessGoalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult GettotalNationalProject()
        {
            try
            {
                var businessGoalResponse = new GraphList();
                businessGoalResponse = dblayer.GettotalNationalProject();
                return Json(businessGoalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult GettotalICQCCProject()
        {
            try
            {
                var businessGoalResponse = new GraphList();
                businessGoalResponse = dblayer.GettotalICQCCProject();
                return Json(businessGoalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult GettotalInterNationalProject()
        {
            try
            {
                var businessGoalResponse = new GraphList();
                businessGoalResponse = dblayer.GettotalInterNationalProject();
                return Json(businessGoalResponse, JsonRequestBehavior.AllowGet);
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
        public ActionResult GetChapterConventionsLevel(string Empcode)
        {
            try
            {
                var conventionChapterResponse = new ConventionChapterResponse();
                conventionChapterResponse = dblayer.GetChapterConventionsLevel(Empcode);
                return Json(conventionChapterResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult GetChapterConventionsByDate(string from, string to)
        {
            try
            {
                var conventionChapterResponse = new ConventionChapterResponse();
                conventionChapterResponse = dblayer.GetChapterConventionsByDate(from, to);
                return Json(conventionChapterResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult GetChapterConventionsByDateLevel(string EmpCode,string from, string to)
        {
            try
            {
                var conventionChapterResponse = new ConventionChapterResponse();
                conventionChapterResponse = dblayer.GetChapterConventionsByDateLevel(EmpCode,from, to);
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
        public ActionResult GetNationalConventionsLevel(string EmpCode)
        {
            try
            {
                var conventionNationalResponse = new ConventionNationalResponse();
                conventionNationalResponse = dblayer.GetNationalConventionsLevel(EmpCode);
                return Json(conventionNationalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult GetNationalConventionsByDate(string from, string to)
        {
            try
            {
                var conventionNationalResponse = new ConventionNationalResponse();
                conventionNationalResponse = dblayer.GetNationalConventionsByDate(from, to);
                return Json(conventionNationalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult GetNationalConventionsByDateLevel(string EmpCode,string from, string to)
        {
            try
            {
                var conventionNationalResponse = new ConventionNationalResponse();
                conventionNationalResponse = dblayer.GetNationalConventionsByDateLevel(EmpCode,from, to);
                return Json(conventionNationalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult GetICQCCConventions(int pageIndex, int pageSize)
        {
            try
            {
                var conventionICQCCResponse = new ConventionICQCCResponse();
                conventionICQCCResponse = dblayer.GetICQCCConventions(pageIndex, pageSize);
                return Json(conventionICQCCResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult GetICQCCConventionsLevel(string EmpCode)
        {
            try
            {
                var conventionICQCCResponse = new ConventionICQCCResponse();
                conventionICQCCResponse = dblayer.GetICQCCConventionsLevel(EmpCode);
                return Json(conventionICQCCResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult GetICQCCConventionsByDate(string from, string to)
        {
            try
            {
                var conventionICQCCResponse = new ConventionICQCCResponse();
                conventionICQCCResponse = dblayer.GetICQCCConventionsByDate(from, to);
                return Json(conventionICQCCResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult GetICQCCConventionsByDateLevel(string EmpCode,string from, string to)
        {
            try
            {
                var conventionICQCCResponse = new ConventionICQCCResponse();
                conventionICQCCResponse = dblayer.GetICQCCConventionsByDateLevel(EmpCode,from, to);
                return Json(conventionICQCCResponse, JsonRequestBehavior.AllowGet);
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
        [HttpGet]
        public ActionResult GetInterNationalConventionsLevel(string EmpCode)
        {
            try
            {
                var conventionInternationalResponse = new ConventionInternationalResponse();
                conventionInternationalResponse = dblayer.GetInterNationalConventionsLevel(EmpCode);
                return Json(conventionInternationalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult GetInterNationalConventionsByDate(string from, string to)
        {
            try
            {
                var conventionInternationalResponse = new ConventionInternationalResponse();
                conventionInternationalResponse = dblayer.GetInterNationalConventionsByDate(from, to);
                return Json(conventionInternationalResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult GetInterNationalConventionsByDateLevel(string EmpCode,string from, string to)
        {
            try
            {
                var conventionInternationalResponse = new ConventionInternationalResponse();
                conventionInternationalResponse = dblayer.GetInterNationalConventionsByDateLevel(EmpCode,from, to);
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
        [HttpGet]
        public ActionResult DeleteChapterConventionsUpdateInternal(string strIds)
        {
            try
            {

                int result = dblayer.DeleteChapterConventionsUpdateInternal(strIds);
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
        [HttpGet]
        public ActionResult DeleteNationalConventionsUpdateChapter(string strIds)
        {
            try
            {

                int result = dblayer.DeleteNationalConventionsUpdateChapter(strIds);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpPost]
        public ActionResult DeleteICQCCConventions(string strIds)
        {
            try
            {

                int result = dblayer.DeleteICQCCConventions(strIds);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult DeleteICQCCConventionsUpdateNation(string strIds)
        {
            try
            {

                int result = dblayer.DeleteICQCCConventionsUpdateNation(strIds);
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
        public ActionResult DeleteInterNationalConvetionsUpdateICQCC(string strIds)
        {
            try
            {

                int result = dblayer.DeleteInterNationalConvetionsUpdateICQCC(strIds);
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
        public ActionResult InternalConventionsFetchLevel(string EmpCode)
        {
            try
            {
                var internalConventionResponse = new InternalConventionResponse();
                internalConventionResponse = dblayer.GetInternalConventionsLevel(EmpCode);
                return Json(internalConventionResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult InternalConventionsFetchByDate(string from, string to)
        {
            try
            {
                var internalConventionResponse = new InternalConventionResponse();
                internalConventionResponse = dblayer.GetInternalConventionsByDate(from, to);
                return Json(internalConventionResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult InternalConventionsFetchByDateLevel(string EmpCode,string from, string to)
        {
            try
            {
                var internalConventionResponse = new InternalConventionResponse();
                internalConventionResponse = dblayer.GetInternalConventionsByDateLevel(EmpCode,from, to);
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
        public ActionResult OveralConventionsFetchLevel(string EmpCode,int pageIndex, int pageSize)
        {
            try
            {
                var conventionOveralResponse = new ConventionOveralResponse();
                conventionOveralResponse = dblayer.OverallConventionsFetchLevel(EmpCode,pageIndex, pageSize);
                return Json(conventionOveralResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult OveralConventionsFetchByDate(string from, string to)
        {
            try
            {
                var conventionOveralResponse = new ConventionOveralResponse();
                conventionOveralResponse = dblayer.OverallConventionsFetchDate(from,to);
                return Json(conventionOveralResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpGet]
        public ActionResult OveralConventionsFetchByDateLevel(string EmpCode,string from, string to)
        {
            try
            {
                var conventionOveralResponse = new ConventionOveralResponse();
                conventionOveralResponse = dblayer.OverallConventionsFetchDateLevel(EmpCode,from, to);
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
        public ActionResult ICQCCConventionsAwardsFetch()
        {
            try
            {
                var awardsResponse = new List<AwardsResponse>();
                awardsResponse = dblayer.ICQCCConventionsAwardResponse();
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
        public ActionResult checkTeamRegistrationName(string EmpCode,string CircleName, string Plant, string StartDate, string EndDate)
        {
            try
            {
                var circleRegister = new CircleRegisterRequest();
                circleRegister = dblayer.checkTeamRegistrationName(EmpCode,CircleName, Plant, StartDate, EndDate);
                return Json(circleRegister, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;

            }
        }
        [HttpGet]
        public ActionResult GetCircleRegistrationDetailsByCircle(string CircleName,string Plant,string StartDate,string EndDate)
        {
            try
            {
                var teamRegistrationResponse = new List<CircleRegisterRequest>();
                teamRegistrationResponse = dblayer.GetCircleRegistrationDetailsByCircle(CircleName,Plant,StartDate,EndDate);
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
        [HttpPost]
        public ActionResult FetchEmployeeDetailsByLevelCheckRole(string plant,string role)
        {
            try
            {
                var employeeInfoResponse = new EmployeeInfoResponse();
                
                    employeeInfoResponse = dblayer.FetchEmployeeDetailsByLevelCheckRole(plant,role);
               
                return Json(employeeInfoResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpPost]
        public ActionResult SearchCompany(String Company)
        {
            try
            {
                var reportsDropdownsResponse = new ReportsDropdownsResponse();
                reportsDropdownsResponse = dblayer.SearchCompany(Company);
                return Json(reportsDropdownsResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpPost]
        public ActionResult SearchBU(String BU)
        {
            try
            {
                var reportsDropdownsResponse = new ReportsDropdownsResponse();
                reportsDropdownsResponse = dblayer.SearchBU(BU);
                return Json(reportsDropdownsResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpPost]
        public ActionResult SearchPL(String PL)
        {
            try
            {
                var reportsDropdownsResponse = new ReportsDropdownsResponse();
                reportsDropdownsResponse = dblayer.SearchPL(PL);
                return Json(reportsDropdownsResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

    }
}