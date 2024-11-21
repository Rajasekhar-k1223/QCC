using QCC.Web.Models.Request;
using QCC.Web.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QCC.Web.Controllers
{
    public class TeamDetailsController : Controller
    {
        BusinessLogic.BusinessLogic dblayer = new BusinessLogic.BusinessLogic();
        BusinessLogic.SendEmail sendEmail = new BusinessLogic.SendEmail();
        // GET: TeamDetails
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// API For SaveOrUpdate TeamDetails
        /// </summary>
        /// <param name="teamDetailsRequest"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult SaveOrUpdateTeamDetails(TeamDetailsRequest teamDetailsRequest)
        {
            try
            {
                string response = null;
                if (!string.IsNullOrEmpty(teamDetailsRequest.BusinessUnit))
                {
                    response = dblayer.SaveOrUpdateTeamDetails(teamDetailsRequest);

                }
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpPost]
        public ActionResult SaveOrUpdateTeamDetailsPlantChanged(TeamDetailsRequest teamDetailsRequest)
        {
            try
            {
                string response = null;
                if (!string.IsNullOrEmpty(teamDetailsRequest.BusinessUnit))
                {
                    response = dblayer.SaveOrUpdateTeamDetailsPlantChanged(teamDetailsRequest);

                }
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult SaveOrUpdateTeamDetailsTeamId(string empCode, string Plant, string TeamName, string StartDate,string EndDate)
        {
            try
            { 
                var teamDetails = new TeamDetailsRequest();
                if (!string.IsNullOrEmpty(TeamName))
                    teamDetails = dblayer.SaveOrUpdateTeamDetailsTeamId(empCode,Plant,TeamName,StartDate,EndDate);
                return Json(teamDetails, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }


        /// <summary>
        /// API For Fetch TeamDetails By Levels
        /// </summary>
        /// <param name="Level"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult FetchTeamDetailsByLevels(string Level, int pageIndex, int pageSize)
        {
            try
            {
                var teamDetails = new TeamDetails();
                if (!string.IsNullOrEmpty(Level))
                    teamDetails = dblayer.FetchTeamDetailsByLevels(Level, pageIndex, pageSize);
                return Json(teamDetails, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        
            [HttpGet]
        public ActionResult changeteamdetails(string TeamName,string Plant)
        {
            try
            {
                
                string teamDetails = dblayer.ChangeTeamDetails(TeamName,Plant);
                return Json(teamDetails, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        /// <summary>
        /// API For Fetch TeamDetails By Status
        /// </summary>
        /// <param name="Status"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult FetchTeamDetailsByStatusProjects(string Status, string CreatedBy, int pageIndex, int pageSize)
        {
            try
            {
                var teamDetails = new TeamDetails();
                if (!string.IsNullOrEmpty(CreatedBy))
                    teamDetails = dblayer.FetchTeamDetailsByStatusProjects(Status, CreatedBy, pageIndex, pageSize);
                return Json(teamDetails, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        /// <summary>
        /// API For Fetch TeamDetails By Status
        /// </summary>
        /// <param name="Status"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult FetchTeamDetailsByStatus(string Status, string CreatedBy, int pageIndex, int pageSize)
        {
            try
            {
                var teamDetails = new TeamDetails();
                if (!string.IsNullOrEmpty(CreatedBy))
                    teamDetails = dblayer.FetchTeamDetailsByStatus(Status, CreatedBy, pageIndex, pageSize);
                return Json(teamDetails, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult FetchEditTeamDetailsByStatus(string Status, string CreatedBy, int pageIndex, int pageSize)
        {
            try
            {
                var teamDetails = new TeamDetails();
                if (!string.IsNullOrEmpty(CreatedBy))
                    teamDetails = dblayer.FetchEditTeamDetailsByStatus(Status, CreatedBy, pageIndex, pageSize);
                return Json(teamDetails, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }


        [HttpGet]
        public ActionResult FetchTeamDetailsByAdminStatus(string Status, int pageIndex, int pageSize)
        {
            try
            {
                var teamDetails = new TeamDetails();
                if (!string.IsNullOrEmpty(Status))
                    teamDetails = dblayer.FetchTeamDetailsByAdminStatus(Status, pageIndex, pageSize);
                return Json(teamDetails, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult FetchTeamDetailsByAdminStatusPSPC( int pageIndex, int pageSize)
        {
            try
            {
                var teamDetails = new TeamDetails();
                teamDetails = dblayer.FetchTeamDetailsByAdminStatusPSPC(pageIndex, pageSize);
                return Json(teamDetails, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult FetchTeamDetailsByAdminStatusPending(int pageIndex, int pageSize)
        {
            try
            {
                var teamDetails = new TeamDetails();
                teamDetails = dblayer.FetchTeamDetailsByAdminStatusPending(pageIndex, pageSize);
                return Json(teamDetails, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult FetchTeamDetailsByAdminLevels(int pageIndex, int pageSize)
        {
            try
            {
                var teamDetails = new TeamDetails();
                teamDetails = dblayer.FetchTeamDetailsByAdminLevels(pageIndex, pageSize);
                return Json(teamDetails, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
    }
}