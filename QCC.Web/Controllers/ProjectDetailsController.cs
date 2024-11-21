﻿using QCC.Web.Models.Request;
using QCC.Web.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QCC.Web.Controllers
{
    public class ProjectDetailsController : Controller
    {
        BusinessLogic.BusinessLogic dblayer = new BusinessLogic.BusinessLogic();
        public ActionResult ProjectSelectionSheet()
        {
            return View();
        }

        public ActionResult PendingForApproval()
        {
            return View();
        }
        public ActionResult RejectedProjects()
        {
            return View();
        }
        [HttpGet]
        public ActionResult FetchProjectByStatusLevel(string Status, string CreatedBy, int pageIndex, int pageSize)
        {
            try
            {
                var projectDetails = new ProjectDetailsResponse();
                if (!string.IsNullOrEmpty(CreatedBy))
                    projectDetails = dblayer.FetchProjectByStatusLevel(Status, CreatedBy, pageIndex, pageSize);
                return Json(projectDetails, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        public ActionResult ProjectClosure()
        {
            return View();
        }


        /// <summary>
        /// API For SaveOrUpdate ProjectSelection
        /// </summary>
        /// <param name="projectSelectionSheetRequest"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult ProjectSelectionSaveOrUpdate(ProjectSelectionSheetRequest projectSelectionSheetRequest)
        {
            try
            {

                string result = dblayer.ProjectSelectionSaveOrUpdate(projectSelectionSheetRequest);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        /// <summary>
        /// API For Fetching Project Details By TeamId
        /// </summary>
        /// <param name="TeamId"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult FetchProjectsByTeamId(int TeamId)
        {
            try
            {
                var projectSelectionSheetResponse = new List<ProjectSelectionSheetResponse>();
                projectSelectionSheetResponse = dblayer.FetchProjectsByTeamId(TeamId);
                return Json(projectSelectionSheetResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult FetchProjectsByLevelAndStatus(int TeamId, string Level)
        {
            try
            {
                var projectSelectionSheetResponse = new List<ProjectSelectionSheetResponse>();
                if (!string.IsNullOrEmpty(Level))
                    projectSelectionSheetResponse = dblayer.FetchProjectsByLevelAndStatus(TeamId, Level);
                return Json(projectSelectionSheetResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult FetchTeamDetailsByProjectSelectionLevel(string Level, int pageIndex, int pageSize)
        {
            try
            {
                var teamDetails = new TeamDetails();
                if (!string.IsNullOrEmpty(Level))
                    teamDetails = dblayer.FetchTeamDetailsByProjectSelectionLevel(Level, pageIndex, pageSize);
                return Json(teamDetails, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult FetchProjectsByProjectColuserLevel(int TeamId, string Level)
        {
            try
            {
                var projectSelectionSheetResponse = new List<ProjectSelectionSheetResponse>();
                if (!string.IsNullOrEmpty(Level))
                    projectSelectionSheetResponse = dblayer.FetchProjectsByProjectColuserLevel(TeamId, Level);
                return Json(projectSelectionSheetResponse, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }

        [HttpPost]
        public void SendingBulkEmails(EmailBodyRequest[] Sendmail)
        {
            try
            {
                if (Sendmail.Length > 0)
                    dblayer.Sendmail(Sendmail);
                //return new EmptyResult();
            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch (Exception ex)
#pragma warning restore CS0168 // The variable 'ex' is declared but never used
            {

                //  throw ex.InnerException;
            }
        }

        [HttpGet]
        public ActionResult ProjectDelete(int ProjectId)
        {
            try
            {

                string response = dblayer.ProjectDelete(ProjectId);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }


        [HttpGet]
        public ActionResult FetchTeamDetailsByAdminProjectSelectionLevel(int pageIndex, int pageSize)
        {
            try
            {
                var teamDetails = new TeamDetails();
                teamDetails = dblayer.FetchTeamDetailsByAdminProjectSelectionLevel(pageIndex, pageSize);
                return Json(teamDetails, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        //[HttpGet]
        //public ActionResult ProjectListCount(string TeamId)
        //{
        //    try
        //    {
        //        var projectDetails = new ProjectDetailsResponse();
        //        if (!string.IsNullOrEmpty(TeamId))
        //            projectDetails = dblayer.ProjectListCount(TeamId);
        //        return Json(projectDetails, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex.InnerException;
        //    }
        //}
    }
   
}