using QCC.Web.Models;
using QCC.Web.Models.Request;
using QCC.Web.Models.Response;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;

namespace QCC.Web.BusinessLogic
{
    public class BusinessLogic
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["con"].ConnectionString);
        //SqlConnection conAMR = new SqlConnection(ConfigurationManager.ConnectionStrings["conAMR"].ConnectionString);
        SqlCommand com;
        SendEmail sendmail = new SendEmail();
        /// <summary>
        /// Business Logic For userLogin
        /// </summary>
        /// <param name="loginRequest"></param>
        /// <returns></returns>
        public LoginInfo userLogin(LoginRequest loginRequest)
        {
            var loginInfo = new LoginInfo();
            var loginResponse = new LoginResponse();
            com = new SqlCommand("Sp_User_login", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@empCode", loginRequest.empCode != null ? loginRequest.empCode : string.Empty);
            com.Parameters.AddWithValue("@password", loginRequest.password != null ? loginRequest.password : string.Empty);
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            while (dr.Read())
            {
                loginResponse.empMailId = dr["EmpMailId"].ToString();
                loginResponse.empCode = dr["EmpCode"].ToString();
                loginResponse.empName = dr["EmpName"].ToString();
                loginInfo.RoleId = dr["RoleId"].ToString();
                loginResponse.FunctionCode = dr["FunctionCode"].ToString();
            }
            loginInfo.loginResponse = loginResponse;
            con.Close();
            return loginInfo;
        }
        /// <summary>
        /// Business Logic For Business Gaols Insert and Update
        /// </summary>
        /// <param name="businessGoalRequest"></param>
        /// <returns></returns>
        public string BusinessGoalsInsertUpdate(BusinessGoalRequest businessGoalRequest)
        {
            String sDate = DateTime.Now.ToString();
            DateTime datevalue = (Convert.ToDateTime(sDate.ToString()));

            String dy = datevalue.Day.ToString();
            String mn = datevalue.Month.ToString();
            String yy = datevalue.Year.ToString();
            com = new SqlCommand("InsertUpdate_BusinessGoals", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "SaveData");
            com.Parameters.AddWithValue("@Business_Unit", businessGoalRequest.BusinessUnit);
            com.Parameters.AddWithValue("@Plant", businessGoalRequest.Plant);
            com.Parameters.AddWithValue("@No_Of_QC_Target", businessGoalRequest.NoofqcTarget);
            com.Parameters.AddWithValue("@Circles_Ytd", businessGoalRequest.CirclesYTD);
            com.Parameters.AddWithValue("@Tei_Target", businessGoalRequest.TEITarget);
            com.Parameters.AddWithValue("@Employees_Head_Count", businessGoalRequest.EmployeeHeadCount);
            com.Parameters.AddWithValue("@Eligible_Head_Count", businessGoalRequest.EligibleHeadCount);
            com.Parameters.AddWithValue("@No_Of_New_Circles", businessGoalRequest.NoofNewCircles);
            com.Parameters.AddWithValue("@Projects_Target", businessGoalRequest.ProjectsTarget);
            com.Parameters.AddWithValue("@Projects_Ytd", businessGoalRequest.ProjectsYTD);
            com.Parameters.AddWithValue("@Tei_Ytd", businessGoalRequest.TEIYTD);
            com.Parameters.AddWithValue("@No_Of_Facilitators", businessGoalRequest.NoofFacilitators);
            com.Parameters.AddWithValue("@Circles_Per_Facilitator", businessGoalRequest.CirclesperFacilitator);
            com.Parameters.AddWithValue("@No_Of_Old_Circles", businessGoalRequest.NoOfOldCircles);
            com.Parameters.AddWithValue("@Emp_Code", businessGoalRequest.Emp_Code);
            com.Parameters.AddWithValue("@Executed_Year_Date", DateTime.Today);
            com.Parameters.AddWithValue("@Executed_Year", DateTime.Now.Year);
            com.Parameters.AddWithValue("@Executed_Month", DateTime.Now.Month);
            com.Parameters.AddWithValue("@Yearly", businessGoalRequest.Yearly);
            com.Parameters.AddWithValue("@Company", businessGoalRequest.Company);
            con.Open();
            com.ExecuteNonQuery();
            string numRes = com.ExecuteNonQuery().ToString();
            con.Close();
            return numRes;
        }
        /// <summary>
        /// Business Logic For Fetching the Business Goals By EmpCode
        /// </summary>
        /// <param name="empCode"></param>
        /// <returns></returns>
        public BusinessGoalResponse FetchBusinessGoalByBusinessUnit(string empCode)
        {
            var businessGoalResponse = new BusinessGoalResponse();
            DataTable dsData;
            using (SqlCommand sqlCmd = new SqlCommand("FetchData", con))
            {
                sqlCmd.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCmd.Parameters.Add(new SqlParameter("@Emp_Code", empCode));
                SqlDataAdapter sqlAd = new SqlDataAdapter(sqlCmd);
                dsData = new DataTable();
                con.Open();
                sqlAd.Fill(dsData);
                if (dsData.Rows.Count > 0)
                {
                    businessGoalResponse = new BusinessGoalResponse();
                    businessGoalResponse.BusinessUnit = dsData.Rows[0][0].ToString();
                    businessGoalResponse.Plant = dsData.Rows[0][1].ToString();
                    businessGoalResponse.NoofqcTarget = Convert.ToInt32(dsData.Rows[0][2].ToString());
                    businessGoalResponse.CirclesYTD = Convert.ToInt32(dsData.Rows[0][3].ToString());
                    businessGoalResponse.TEITarget = Convert.ToInt32(dsData.Rows[0][4].ToString());
                    businessGoalResponse.EmployeeHeadCount = Convert.ToInt32(dsData.Rows[0][5].ToString());
                    businessGoalResponse.EligibleHeadCount = Convert.ToInt32(dsData.Rows[0][6].ToString());
                    businessGoalResponse.NoofNewCircles = Convert.ToInt32(dsData.Rows[0][7].ToString());
                    businessGoalResponse.ProjectsTarget = Convert.ToInt32(dsData.Rows[0][8].ToString());
                    businessGoalResponse.TEIYTD = Convert.ToInt32(dsData.Rows[0][9].ToString());
                    businessGoalResponse.NoofFacilitators = Convert.ToInt32(dsData.Rows[0][10].ToString());
                    businessGoalResponse.CirclesperFacilitator = Convert.ToInt32(dsData.Rows[0][11].ToString());
                    businessGoalResponse.NoOfOldCircles = Convert.ToInt32(dsData.Rows[0][12].ToString());
                    businessGoalResponse.ProjectsYTD = Convert.ToInt32(dsData.Rows[0][13].ToString());
                    businessGoalResponse.Emp_Code = dsData.Rows[0][14].ToString();
                }
            }
            return businessGoalResponse;
        }
        public BusinessGoalResponse FetchBusinessGoalByBusinessUnitYTD(string empCode, string Year)
        {
            var businessGoalResponse = new BusinessGoalResponse();
            DataTable dsData;
            using (SqlCommand sqlCmd = new SqlCommand("FetchDataByYear", con))
            {
                sqlCmd.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCmd.Parameters.Add(new SqlParameter("@Emp_Code", empCode));
                sqlCmd.Parameters.Add(new SqlParameter("@Year", Year));
                SqlDataAdapter sqlAd = new SqlDataAdapter(sqlCmd);
                dsData = new DataTable();
                con.Open();
                sqlAd.Fill(dsData);
                if (dsData.Rows.Count > 0)
                {
                    businessGoalResponse = new BusinessGoalResponse();
                    businessGoalResponse.BusinessUnit = dsData.Rows[0][0].ToString();
                    businessGoalResponse.Plant = dsData.Rows[0][1].ToString();
                    businessGoalResponse.NoofqcTarget = Convert.ToInt32(dsData.Rows[0][2].ToString());
                    businessGoalResponse.CirclesYTD = Convert.ToInt32(dsData.Rows[0][3].ToString());
                    businessGoalResponse.TEITarget = Convert.ToInt32(dsData.Rows[0][4].ToString());
                    businessGoalResponse.EmployeeHeadCount = Convert.ToInt32(dsData.Rows[0][5].ToString());
                    businessGoalResponse.EligibleHeadCount = Convert.ToInt32(dsData.Rows[0][6].ToString());
                    businessGoalResponse.NoofNewCircles = Convert.ToInt32(dsData.Rows[0][7].ToString());
                    businessGoalResponse.ProjectsTarget = Convert.ToInt32(dsData.Rows[0][8].ToString());
                    businessGoalResponse.TEIYTD = Convert.ToInt32(dsData.Rows[0][9].ToString());
                    businessGoalResponse.NoofFacilitators = Convert.ToInt32(dsData.Rows[0][10].ToString());
                    businessGoalResponse.CirclesperFacilitator = Convert.ToInt32(dsData.Rows[0][11].ToString());
                    businessGoalResponse.NoOfOldCircles = Convert.ToInt32(dsData.Rows[0][12].ToString());
                    businessGoalResponse.ProjectsYTD = Convert.ToInt32(dsData.Rows[0][13].ToString());
                    businessGoalResponse.Emp_Code = dsData.Rows[0][14].ToString();
            
                }
            }
            return businessGoalResponse;
        }
        public GraphList1 FtechBusinessGolsGetByYearCount()
        {
            var graphList = new GraphList1();
            com = new SqlCommand("FetchTotalDataByYearly", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.Add(new SqlParameter("@ActionType", "Fetch1"));
            com.Parameters.Add(new SqlParameter("@Yearly", ""));
            con.Open();
                SqlDataReader dr = com.ExecuteReader();
                var graphList1Response = new List<GraphList1Response>();
               
                while (dr.Read())
                {
                    var businessGoal = new GraphList1Response();
                    // businessGoal.Id = Convert.ToInt32(dr["Id"]);
                    businessGoal.Yearly = dr["Yearly"].ToString();
                    businessGoal.CirclesYTD = Convert.ToInt32(dr["Circles_Ytd"]);
                //user.Password = dr["Password"].ToString() != null ? dr["Password"].ToString() : string.Empty;
                //user.EmpName = dr["EmpName"].ToString() != null ? dr["EmpName"].ToString() : string.Empty;
                //user.Grade = dr["Grade"].ToString() != null ? dr["Grade"].ToString() : string.Empty;
                //user.Department = dr["Department"].ToString() != null ? dr["Department"].ToString() : string.Empty;
                //user.Company = dr["Company"].ToString() != null ? dr["Company"].ToString() : string.Empty;
                //user.EmpMailId = dr["EmpMailId"].ToString() != null ? dr["EmpMailId"].ToString() : string.Empty;
                //user.BusinessUnit = dr["BusinessUnit"].ToString() != null ? dr["BusinessUnit"].ToString() : string.Empty;
                //user.Plant = dr["Plant"].ToString() != null ? dr["Plant"].ToString() : string.Empty;
                //user.RoleId = Convert.ToInt32(dr["RoleId"]);
                graphList1Response.Add(businessGoal);
                }
                graphList.graphList1Response = graphList1Response;
                return graphList;
            
            
        }
        public GraphList1 FtechBusinessGolsGetByYearCountPlant(string Yearly)
        {
            var graphList = new GraphList1();
            com = new SqlCommand("FetchTotalDataByYearly", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.Add(new SqlParameter("@ActionType", "Fetch2"));
            com.Parameters.Add(new SqlParameter("@Yearly", Yearly));
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var graphList1Response = new List<GraphList1Response>();

            while (dr.Read())
            {
                var businessGoal = new GraphList1Response();
                // businessGoal.Id = Convert.ToInt32(dr["Id"]);
                businessGoal.Plant = dr["Plant"].ToString();
                businessGoal.CirclesYTD = Convert.ToInt32(dr["Circles_Ytd"]);
                //user.Password = dr["Password"].ToString() != null ? dr["Password"].ToString() : string.Empty;
                //user.EmpName = dr["EmpName"].ToString() != null ? dr["EmpName"].ToString() : string.Empty;
                //user.Grade = dr["Grade"].ToString() != null ? dr["Grade"].ToString() : string.Empty;
                //user.Department = dr["Department"].ToString() != null ? dr["Department"].ToString() : string.Empty;
                //user.Company = dr["Company"].ToString() != null ? dr["Company"].ToString() : string.Empty;
                //user.EmpMailId = dr["EmpMailId"].ToString() != null ? dr["EmpMailId"].ToString() : string.Empty;
                //user.BusinessUnit = dr["BusinessUnit"].ToString() != null ? dr["BusinessUnit"].ToString() : string.Empty;
                //user.Plant = dr["Plant"].ToString() != null ? dr["Plant"].ToString() : string.Empty;
                //user.RoleId = Convert.ToInt32(dr["RoleId"]);
                graphList1Response.Add(businessGoal);
            }
            graphList.graphList1Response = graphList1Response;
            return graphList;


        }
        public GraphList1 FtechBusinessGolsGetByYearCountCompany(string Company, string empCode)
        {
            var graphList = new GraphList1();
            com = new SqlCommand("FetchDatabyCompany", con);
            com.CommandType = CommandType.StoredProcedure;
            //com.Parameters.Add(new SqlParameter("@ActionType", "Fetch2"));
            com.Parameters.Add(new SqlParameter("@Company", Company));
            com.Parameters.Add(new SqlParameter("@Emp_Code", empCode));
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var graphList1Response = new List<GraphList1Response>();

            while (dr.Read())
            {
                var businessGoal = new GraphList1Response();
                // businessGoal.Id = Convert.ToInt32(dr["Id"]);
                businessGoal.Yearly = dr["Yearly"].ToString();
                businessGoal.CirclesYTD = Convert.ToInt32(dr["Circles_Ytd"]);
                //user.Password = dr["Password"].ToString() != null ? dr["Password"].ToString() : string.Empty;
                //user.EmpName = dr["EmpName"].ToString() != null ? dr["EmpName"].ToString() : string.Empty;
                //user.Grade = dr["Grade"].ToString() != null ? dr["Grade"].ToString() : string.Empty;
                //user.Department = dr["Department"].ToString() != null ? dr["Department"].ToString() : string.Empty;
                //user.Company = dr["Company"].ToString() != null ? dr["Company"].ToString() : string.Empty;
                //user.EmpMailId = dr["EmpMailId"].ToString() != null ? dr["EmpMailId"].ToString() : string.Empty;
                //user.BusinessUnit = dr["BusinessUnit"].ToString() != null ? dr["BusinessUnit"].ToString() : string.Empty;
                //user.Plant = dr["Plant"].ToString() != null ? dr["Plant"].ToString() : string.Empty;
                //user.RoleId = Convert.ToInt32(dr["RoleId"]);
                graphList1Response.Add(businessGoal);
            }
            graphList.graphList1Response = graphList1Response;
            return graphList;


        }
        /// <summary>
        /// Business Logic For Circle Exist (or) Not Checking by CircleName 
        /// </summary>
        /// <param name="circleName"></param>
        /// <returns></returns>
        public string CircleExistOrNot(string circleName)
        {
            com = new SqlCommand("Sp_CircleNameExistsOrNot", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@circleName", circleName);
            com.Parameters.Add("@circle_Name", SqlDbType.VarChar, 40);
            com.Parameters["@circle_Name"].Direction = ParameterDirection.Output;
            con.Open();
            com.ExecuteNonQuery();
            string result = Convert.ToString(com.Parameters["@circle_Name"].Value);
            con.Close();
            return result;
        }
        /// <summary>
        /// Business Logic For FetchEmployeeDetailsByEmpCode
        /// </summary>
        /// <param name="empCode"></param>
        /// <returns></returns>
        public EmployeeInfoResponse FetchEmployeeDetailsByEmpCode(string empCode, string functionCode)
        {
            var employeeInfoResponse = new EmployeeInfoResponse();
            DataTable dsData;
            com = new SqlCommand("FetchEmployeeDetailsByEmpCode", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType","TM");
            com.Parameters.AddWithValue("@empCode", empCode);
            com.Parameters.AddWithValue("@functionCode", functionCode);
            SqlDataAdapter sqlAd = new SqlDataAdapter(com);
            con.Open();
            dsData = new DataTable();
            sqlAd.Fill(dsData);
            if (dsData.Rows.Count > 0)
            {
                employeeInfoResponse.empCode = dsData.Rows[0].ItemArray[0].ToString();
                employeeInfoResponse.empName = dsData.Rows[0].ItemArray[1].ToString();
                employeeInfoResponse.grade = dsData.Rows[0].ItemArray[2].ToString();
                employeeInfoResponse.department = dsData.Rows[0].ItemArray[3].ToString();
                employeeInfoResponse.emailId = dsData.Rows[0].ItemArray[4].ToString();
                employeeInfoResponse.company = dsData.Rows[0].ItemArray[5].ToString();
                employeeInfoResponse.l1 = dsData.Rows[0].ItemArray[6].ToString();
                employeeInfoResponse.businessUnit = dsData.Rows[0].ItemArray[9].ToString();
                employeeInfoResponse.Plant = dsData.Rows[0].ItemArray[7].ToString();
                employeeInfoResponse.DepartmentCar= dsData.Rows[0].ItemArray[10].ToString();
                employeeInfoResponse.FunctionCode = dsData.Rows[0].ItemArray[8].ToString();

            }
            con.Close();
            return employeeInfoResponse;
        }

        public EmployeeInfoResponse FaclitatorFetchEmployeeDetailsByEmpCode(string empCode, string functionCode)
        {
            var employeeInfoResponse = new EmployeeInfoResponse();
            DataTable dsData;
            com = new SqlCommand("FetchEmployeeDetailsByEmpCode", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "FT");
            com.Parameters.AddWithValue("@empCode", empCode);
            com.Parameters.AddWithValue("@functionCode", functionCode);

            SqlDataAdapter sqlAd = new SqlDataAdapter(com);
            con.Open();
            dsData = new DataTable();
            sqlAd.Fill(dsData);
            if (dsData.Rows.Count > 0)
            {
                employeeInfoResponse.empCode = dsData.Rows[0].ItemArray[0].ToString();
                employeeInfoResponse.empName = dsData.Rows[0].ItemArray[1].ToString();
                employeeInfoResponse.grade = dsData.Rows[0].ItemArray[2].ToString();
                employeeInfoResponse.department = dsData.Rows[0].ItemArray[3].ToString();
                employeeInfoResponse.emailId = dsData.Rows[0].ItemArray[4].ToString();
                employeeInfoResponse.company = dsData.Rows[0].ItemArray[5].ToString();
                employeeInfoResponse.l1 = dsData.Rows[0].ItemArray[6].ToString();
                employeeInfoResponse.businessUnit = dsData.Rows[0].ItemArray[9].ToString();
                employeeInfoResponse.Plant = dsData.Rows[0].ItemArray[7].ToString();
                employeeInfoResponse.DepartmentCar = dsData.Rows[0].ItemArray[10].ToString();
                employeeInfoResponse.FunctionCode = dsData.Rows[0].ItemArray[8].ToString();

            }
            con.Close();
            return employeeInfoResponse;
        }
        public GraphList FetchBusinessGoalsListEmpCode(string empCode)
        {
            var graphList = new GraphList();
            com = new SqlCommand("GetBusinessGoalsList", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "GetLsitItesm");
            com.Parameters.AddWithValue("@Emp_Code", empCode);
            //com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            //com.Parameters.AddWithValue("@RoleId", 0);
            //com.Parameters.AddWithValue("@Plant", string.Empty);
            //com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            //com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var businessGoalResponse = new List<BusinessGoalResponse>();
            var Years = new List<BusinessGoalResponse>();
            while (dr.Read())
            {
                var businessGoal = new BusinessGoalResponse();
               // businessGoal.Id = Convert.ToInt32(dr["Id"]);
                businessGoal.Emp_Code = dr["Emp_Code"].ToString();
                //user.Password = dr["Password"].ToString() != null ? dr["Password"].ToString() : string.Empty;
                //user.EmpName = dr["EmpName"].ToString() != null ? dr["EmpName"].ToString() : string.Empty;
                //user.Grade = dr["Grade"].ToString() != null ? dr["Grade"].ToString() : string.Empty;
                //user.Department = dr["Department"].ToString() != null ? dr["Department"].ToString() : string.Empty;
                //user.Company = dr["Company"].ToString() != null ? dr["Company"].ToString() : string.Empty;
                //user.EmpMailId = dr["EmpMailId"].ToString() != null ? dr["EmpMailId"].ToString() : string.Empty;
                //user.BusinessUnit = dr["BusinessUnit"].ToString() != null ? dr["BusinessUnit"].ToString() : string.Empty;
                //user.Plant = dr["Plant"].ToString() != null ? dr["Plant"].ToString() : string.Empty;
                //user.RoleId = Convert.ToInt32(dr["RoleId"]);
                businessGoalResponse.Add(businessGoal);
            }

            dr.NextResult();

            while (dr.Read())
            {
                graphList.totalCount = dr["totalCount"].ToString();
            }
            dr.NextResult();

            while (dr.Read())
            {
                var businessGoal = new BusinessGoalResponse();
                businessGoal.Yearly = dr["Yearly"].ToString();
                Years.Add(businessGoal);
            }
            graphList.businessGoalResponse = businessGoalResponse;
            graphList.businessGoalResponse = Years;
            return graphList;
        }
        public GraphList FetchBusinessGoalsListEmpCodeYear(string empCode,string yearSelect)
        {
            var graphList = new GraphList();
            com = new SqlCommand("GetSemiListBusinessGoals", con);
            com.CommandType = CommandType.StoredProcedure;
           // com.Parameters.AddWithValue("@ActionType", "GetLsitItesm");
            com.Parameters.AddWithValue("@Emp_Code", empCode);
            com.Parameters.AddWithValue("@Yearly", yearSelect);

            com.Parameters.AddWithValue("@ActionType", "SemiCircle");
            //com.Parameters.AddWithValue("@Emp_Code", empCode);
            //com.Parameters.AddWithValue("@Year1", "2017-01-03");
            //com.Parameters.AddWithValue("@Year2", "2018-03-09");
            //com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            //com.Parameters.AddWithValue("@RoleId", 0);
            //com.Parameters.AddWithValue("@Plant", string.Empty);
            //com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            //com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            //SqlDataAdapter sda = new SqlDataAdapter(com);
            //DataSet ds = new DataSet();
            //sda.Fill(ds);
            SqlDataReader dr = com.ExecuteReader();

            //graphList.totalCount = dr["totalCount"].ToString();
            //DataSet ds = new DataSet();
            //sda.Fill(ds);
            var businessGoalResponse = new List<BusinessGoalResponse>();
            //foreach (DataRow dr in ds.Tables[0].Rows) {
            //    graphList.totalCount = dr["totalCount"].ToString();
            //    businessGoalResponse.Add(new BusinessGoalResponse
            //    {
            //        Emp_Code = Convert.ToString(dr["Emp_Code"])
            //    });
            //}
            //var Years = new List<BusinessGoalResponse>();

            while (dr.Read())
            {
                var businessGoal = new BusinessGoalResponse();
                // businessGoal.Id = Convert.ToInt32(dr["Id"]);
                businessGoal.Emp_Code = dr["Emp_Code"].ToString();
                businessGoal.CirclesYTD = Convert.ToInt32(dr["Circles_Ytd"]);
                businessGoal.ProjectsYTD = Convert.ToInt32(dr["Projects_Ytd"]);
                businessGoal.TEITarget = Convert.ToInt32(dr["Tei_Target"]);
                businessGoal.TEIYTD = Convert.ToInt32(dr["Tei_Ytd"]);
                //businessGoal.Executed_Year_Date = dr["Executed_Year_Date"].ToString();
                //user.Password = dr["Password"].ToString() != null ? dr["Password"].ToString() : string.Empty;
                //user.EmpName = dr["EmpName"].ToString() != null ? dr["EmpName"].ToString() : string.Empty;
                //user.Grade = dr["Grade"].ToString() != null ? dr["Grade"].ToString() : string.Empty;
                //user.Department = dr["Department"].ToString() != null ? dr["Department"].ToString() : string.Empty;
                //user.Company = dr["Company"].ToString() != null ? dr["Company"].ToString() : string.Empty;
                //user.EmpMailId = dr["EmpMailId"].ToString() != null ? dr["EmpMailId"].ToString() : string.Empty;
                //user.BusinessUnit = dr["BusinessUnit"].ToString() != null ? dr["BusinessUnit"].ToString() : string.Empty;
                //user.Plant = dr["Plant"].ToString() != null ? dr["Plant"].ToString() : string.Empty;
                //user.RoleId = Convert.ToInt32(dr["RoleId"]);
                businessGoalResponse.Add(businessGoal);
            }

            //dr.NextResult();

            //while (dr.Read())
            //{
            //    graphListCount.totalCount = dr["totalCount"].ToString();
            //}
            //dr.NextResult();

            //while (dr.Read())
            //{
            //    var businessGoal = new BusinessGoalResponse();
            //    businessGoal.Executed_Year = dr["Executed_Year"].ToString();
            //    Years.Add(businessGoal);
            //}

            //graphList.businessGoalResponse = businessGoalResponse;
            graphList.businessGoalResponse= businessGoalResponse;
            return graphList;
        }

        public ConventionNationalResponse FetchNationConventionByAwardsByYearGold(string BussinessUnit, string Department, string Yearly)
        {
            var graphList = new ConventionNationalResponse();
            com = new SqlCommand("ConventionGetList", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "Gold");
            com.Parameters.AddWithValue("@BussinessUnit", BussinessUnit);
            com.Parameters.AddWithValue("@Yearly", Yearly);
            com.Parameters.AddWithValue("@Department", Department);
            //com.Parameters.AddWithValue("@Emp_Code", empCode);
            //com.Parameters.AddWithValue("@Year1", "2017-01-03");
            //com.Parameters.AddWithValue("@Year2", "2018-03-09");
            //com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            //com.Parameters.AddWithValue("@RoleId", 0);
            //com.Parameters.AddWithValue("@Plant", string.Empty);
            //com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            //com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            //SqlDataAdapter sda = new SqlDataAdapter(com);
            //DataSet ds = new DataSet();
            //sda.Fill(ds);
            SqlDataReader dr = com.ExecuteReader();

            //graphList.totalCount = dr["totalCount"].ToString();
            //DataSet ds = new DataSet();
            //sda.Fill(ds);
            var businessGoalResponse = new List<NationalConventionResponse>();
            //foreach (DataRow dr in ds.Tables[0].Rows) {
            //    graphList.totalCount = dr["totalCount"].ToString();
            //    businessGoalResponse.Add(new BusinessGoalResponse
            //    {
            //        Emp_Code = Convert.ToString(dr["Emp_Code"])
            //    });
            //}
            //var Years = new List<BusinessGoalResponse>();

            while (dr.Read())
            {
                var businessGoal = new NationalConventionResponse();
                // businessGoal.Id = Convert.ToInt32(dr["Id"]);
                businessGoal.Gold = dr["Gold"].ToString();
               // businessGoal.Silver = dr["Silver"].ToString();
                //businessGoal.ProjectsYTD = Convert.ToInt32(dr["Projects_Ytd"]);
                //businessGoal.TEITarget = Convert.ToInt32(dr["Tei_Target"]);
                //businessGoal.TEIYTD = Convert.ToInt32(dr["Tei_Ytd"]);
                //businessGoal.Executed_Year_Date = dr["Executed_Year_Date"].ToString();
                //user.Password = dr["Password"].ToString() != null ? dr["Password"].ToString() : string.Empty;
                //user.EmpName = dr["EmpName"].ToString() != null ? dr["EmpName"].ToString() : string.Empty;
                //user.Grade = dr["Grade"].ToString() != null ? dr["Grade"].ToString() : string.Empty;
                //user.Department = dr["Department"].ToString() != null ? dr["Department"].ToString() : string.Empty;
                //user.Company = dr["Company"].ToString() != null ? dr["Company"].ToString() : string.Empty;
                //user.EmpMailId = dr["EmpMailId"].ToString() != null ? dr["EmpMailId"].ToString() : string.Empty;
                //user.BusinessUnit = dr["BusinessUnit"].ToString() != null ? dr["BusinessUnit"].ToString() : string.Empty;
                //user.Plant = dr["Plant"].ToString() != null ? dr["Plant"].ToString() : string.Empty;
                //user.RoleId = Convert.ToInt32(dr["RoleId"]);
                businessGoalResponse.Add(businessGoal);
            }

            //dr.NextResult();

            //while (dr.Read())
            //{
            //    graphListCount.totalCount = dr["totalCount"].ToString();
            //}
            //dr.NextResult();

            //while (dr.Read())
            //{
            //    var businessGoal = new BusinessGoalResponse();
            //    businessGoal.Executed_Year = dr["Executed_Year"].ToString();
            //    Years.Add(businessGoal);
            //}

            //graphList.businessGoalResponse = businessGoalResponse;
            graphList.nationalConventionResponses = businessGoalResponse;
            return graphList;
        }

        public ConventionNationalResponse FetchNationConventionByAwardsByYearSilver(string BussinessUnit, string Department, string Yearly)
        {
            var graphList = new ConventionNationalResponse();
            com = new SqlCommand("ConventionGetList", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "Silver");
            com.Parameters.AddWithValue("@BussinessUnit", BussinessUnit);
            com.Parameters.AddWithValue("@Yearly", Yearly);
            com.Parameters.AddWithValue("@Department", Department);
            //com.Parameters.AddWithValue("@Emp_Code", empCode);
            //com.Parameters.AddWithValue("@Year1", "2017-01-03");
            //com.Parameters.AddWithValue("@Year2", "2018-03-09");
            //com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            //com.Parameters.AddWithValue("@RoleId", 0);
            //com.Parameters.AddWithValue("@Plant", string.Empty);
            //com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            //com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            //SqlDataAdapter sda = new SqlDataAdapter(com);
            //DataSet ds = new DataSet();
            //sda.Fill(ds);
            SqlDataReader dr = com.ExecuteReader();

            //graphList.totalCount = dr["totalCount"].ToString();
            //DataSet ds = new DataSet();
            //sda.Fill(ds);
            var businessGoalResponse = new List<NationalConventionResponse>();
            //foreach (DataRow dr in ds.Tables[0].Rows) {
            //    graphList.totalCount = dr["totalCount"].ToString();
            //    businessGoalResponse.Add(new BusinessGoalResponse
            //    {
            //        Emp_Code = Convert.ToString(dr["Emp_Code"])
            //    });
            //}
            //var Years = new List<BusinessGoalResponse>();

            while (dr.Read())
            {
                var businessGoal = new NationalConventionResponse();
                // businessGoal.Id = Convert.ToInt32(dr["Id"]);
                businessGoal.Silver = dr["Silver"].ToString();
                // businessGoal.Silver = dr["Silver"].ToString();
                //businessGoal.ProjectsYTD = Convert.ToInt32(dr["Projects_Ytd"]);
                //businessGoal.TEITarget = Convert.ToInt32(dr["Tei_Target"]);
                //businessGoal.TEIYTD = Convert.ToInt32(dr["Tei_Ytd"]);
                //businessGoal.Executed_Year_Date = dr["Executed_Year_Date"].ToString();
                //user.Password = dr["Password"].ToString() != null ? dr["Password"].ToString() : string.Empty;
                //user.EmpName = dr["EmpName"].ToString() != null ? dr["EmpName"].ToString() : string.Empty;
                //user.Grade = dr["Grade"].ToString() != null ? dr["Grade"].ToString() : string.Empty;
                //user.Department = dr["Department"].ToString() != null ? dr["Department"].ToString() : string.Empty;
                //user.Company = dr["Company"].ToString() != null ? dr["Company"].ToString() : string.Empty;
                //user.EmpMailId = dr["EmpMailId"].ToString() != null ? dr["EmpMailId"].ToString() : string.Empty;
                //user.BusinessUnit = dr["BusinessUnit"].ToString() != null ? dr["BusinessUnit"].ToString() : string.Empty;
                //user.Plant = dr["Plant"].ToString() != null ? dr["Plant"].ToString() : string.Empty;
                //user.RoleId = Convert.ToInt32(dr["RoleId"]);
                businessGoalResponse.Add(businessGoal);
            }

            //dr.NextResult();

            //while (dr.Read())
            //{
            //    graphListCount.totalCount = dr["totalCount"].ToString();
            //}
            //dr.NextResult();

            //while (dr.Read())
            //{
            //    var businessGoal = new BusinessGoalResponse();
            //    businessGoal.Executed_Year = dr["Executed_Year"].ToString();
            //    Years.Add(businessGoal);
            //}

            //graphList.businessGoalResponse = businessGoalResponse;
            graphList.nationalConventionResponses = businessGoalResponse;
            return graphList;
        }
        /// <summary>
        /// Business Logic For CirclRegistration
        /// </summary>
        /// <param name="teamRegistrationRequest"></param>
        /// <returns></returns>
        public string CirclRegistrationInsert(TeamRegistrationRequest teamRegistrationRequest)
        {
            DataTable dt = new DataTable();
            dt.Columns.AddRange(new DataColumn[11] { new DataColumn("Id", typeof(int)), new DataColumn("CircleName"), new DataColumn("Name"), new DataColumn("Empcode"), new DataColumn("Department"), new DataColumn("Grade"), new DataColumn("BusinessUnit"), new DataColumn("Image", typeof(Byte[])), new DataColumn("CircleType"), new DataColumn("CreatedBy"), new DataColumn("UpdatedBy") });
            byte[] imgData1 = Encoding.ASCII.GetBytes(teamRegistrationRequest.Facilitator.Image != null ? teamRegistrationRequest.Facilitator.Image : string.Empty);
            byte[] imgData2 = Encoding.ASCII.GetBytes(teamRegistrationRequest.TL.Image != null ? teamRegistrationRequest.TL.Image : string.Empty);
            byte[] imgData3 = Encoding.ASCII.GetBytes(teamRegistrationRequest.TM1.Image != null ? teamRegistrationRequest.TM1.Image : string.Empty);
            byte[] imgData4 = Encoding.ASCII.GetBytes(teamRegistrationRequest.TM2.Image != null ? teamRegistrationRequest.TM2.Image : string.Empty);
            byte[] imgData5 = Encoding.ASCII.GetBytes(teamRegistrationRequest.TM3.Image != null ? teamRegistrationRequest.TM3.Image : string.Empty);
            byte[] imgData6 = Encoding.ASCII.GetBytes(teamRegistrationRequest.TM4.Image != null ? teamRegistrationRequest.TM4.Image : string.Empty);
            byte[] imgData7 = Encoding.ASCII.GetBytes(teamRegistrationRequest.Level1.Image != null ? teamRegistrationRequest.Level1.Image : string.Empty);

            if (!string.IsNullOrEmpty(teamRegistrationRequest.Facilitator.Department))
                dt.Rows.Add(teamRegistrationRequest.Facilitator.CircleId, teamRegistrationRequest.Facilitator.CircleName, teamRegistrationRequest.Facilitator.EmpName, teamRegistrationRequest.Facilitator.EmpCode, teamRegistrationRequest.Facilitator.Department, teamRegistrationRequest.Facilitator.Grade, teamRegistrationRequest.Facilitator.BusinessUnit, imgData1, teamRegistrationRequest.Facilitator.CircleType, teamRegistrationRequest.Facilitator.CreatedBy, teamRegistrationRequest.Facilitator.UpdatedBy);
            if (!string.IsNullOrEmpty(teamRegistrationRequest.TL.Department))
                dt.Rows.Add(teamRegistrationRequest.TL.CircleId, teamRegistrationRequest.TL.CircleName, teamRegistrationRequest.TL.EmpName, teamRegistrationRequest.TL.EmpCode, teamRegistrationRequest.TL.Department, teamRegistrationRequest.TL.Grade, teamRegistrationRequest.TL.BusinessUnit, imgData2, teamRegistrationRequest.TL.CircleType, teamRegistrationRequest.TL.CreatedBy, teamRegistrationRequest.TL.UpdatedBy);
            if (!string.IsNullOrEmpty(teamRegistrationRequest.TM1.Department))
                dt.Rows.Add(teamRegistrationRequest.TM1.CircleId, teamRegistrationRequest.TM1.CircleName, teamRegistrationRequest.TM1.EmpName, teamRegistrationRequest.TM1.EmpCode, teamRegistrationRequest.TM1.Department, teamRegistrationRequest.TM1.Grade, teamRegistrationRequest.TM1.BusinessUnit, imgData3, teamRegistrationRequest.TM1.CircleType, teamRegistrationRequest.TM1.CreatedBy, teamRegistrationRequest.TM1.UpdatedBy);
            if (!string.IsNullOrEmpty(teamRegistrationRequest.TM2.Department))
                dt.Rows.Add(teamRegistrationRequest.TM2.CircleId, teamRegistrationRequest.TM2.CircleName, teamRegistrationRequest.TM2.EmpName, teamRegistrationRequest.TM2.EmpCode, teamRegistrationRequest.TM2.Department, teamRegistrationRequest.TM2.Grade, teamRegistrationRequest.TM2.BusinessUnit, imgData4, teamRegistrationRequest.TM2.CircleType, teamRegistrationRequest.TM2.CreatedBy, teamRegistrationRequest.TM2.UpdatedBy);
            if (!string.IsNullOrEmpty(teamRegistrationRequest.TM3.Department))
                dt.Rows.Add(teamRegistrationRequest.TM3.CircleId, teamRegistrationRequest.TM3.CircleName, teamRegistrationRequest.TM3.EmpName, teamRegistrationRequest.TM3.EmpCode, teamRegistrationRequest.TM3.Department, teamRegistrationRequest.TM3.Grade, teamRegistrationRequest.TM3.BusinessUnit, imgData5, teamRegistrationRequest.TM3.CircleType, teamRegistrationRequest.TM3.CreatedBy, teamRegistrationRequest.TM3.UpdatedBy);
            if (!string.IsNullOrEmpty(teamRegistrationRequest.TM4.Department))
                dt.Rows.Add(teamRegistrationRequest.TM4.CircleId, teamRegistrationRequest.TM4.CircleName, teamRegistrationRequest.TM4.EmpName, teamRegistrationRequest.TM4.EmpCode, teamRegistrationRequest.TM4.Department, teamRegistrationRequest.TM4.Grade, teamRegistrationRequest.TM4.BusinessUnit, imgData6, teamRegistrationRequest.TM4.CircleType, teamRegistrationRequest.TM4.CreatedBy, teamRegistrationRequest.TM4.UpdatedBy);
            if (!string.IsNullOrEmpty(teamRegistrationRequest.Level1.Department))
                dt.Rows.Add(teamRegistrationRequest.Level1.CircleId, teamRegistrationRequest.Level1.CircleName, teamRegistrationRequest.Level1.EmpName, teamRegistrationRequest.Level1.EmpCode, teamRegistrationRequest.Level1.Department, teamRegistrationRequest.Level1.Grade, teamRegistrationRequest.Level1.BusinessUnit, imgData7, teamRegistrationRequest.Level1.CircleType, teamRegistrationRequest.Level1.CreatedBy, teamRegistrationRequest.Level1.UpdatedBy);

            com = new SqlCommand("SaveOrUpdateCircle2005SQL@Version", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@tblCircle", dt);
            con.Open();
            com.ExecuteNonQuery();
            string numRes = com.ExecuteNonQuery().ToString();
            con.Close();
            return numRes;
        }
       
        /// <summary>
        /// Business Logic For UserRegister
        /// </summary>
        /// <param name="userRequest"></param>
        /// <returns></returns>
        public string UserRegisterSaveUpdate(UserRequest userRequest)
        {
            com = new SqlCommand("InsertUpdate_LoginRegister", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "SaveData");
            com.Parameters.AddWithValue("@Id", userRequest.Id != 0 ? userRequest.Id : 0);
            com.Parameters.AddWithValue("@EmpCode", userRequest.EmpCode != null ? userRequest.EmpCode : string.Empty);
            com.Parameters.AddWithValue("@Password", "12345");
            com.Parameters.AddWithValue("@EmpName", userRequest.EmpName != null ? userRequest.EmpName : string.Empty);
            com.Parameters.AddWithValue("@Grade", userRequest.Grade != null ? userRequest.Grade : string.Empty);
            com.Parameters.AddWithValue("@Department", userRequest.Department != null ? userRequest.Department : string.Empty);
            com.Parameters.AddWithValue("@Company", userRequest.Company != null ? userRequest.Company : string.Empty);
            com.Parameters.AddWithValue("@EmpMailId", userRequest.EmpMailId!=null? userRequest.EmpMailId :string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", userRequest.BusinessUnit != null ? userRequest.BusinessUnit : string.Empty);
            com.Parameters.AddWithValue("@Plant", userRequest.Plant != null ? userRequest.Plant : string.Empty);
            com.Parameters.AddWithValue("@RoleId",userRequest.RoleId);
            con.Open();
            com.ExecuteNonQuery();
            string numRes = com.ExecuteNonQuery().ToString();
            con.Close();
            return numRes;
        }

        /// <summary>
        /// Business Logic For UserRegister
        /// </summary>
        /// <param name="userRequest"></param>
        /// <returns></returns>
        public string UserRegisterSaveUpdateLevel1(UserRequest userRequest)
        {
            com = new SqlCommand("InsertUpdate_LoginRegister", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "SaveDataLevel1");
            com.Parameters.AddWithValue("@Id", userRequest.Id != 0 ? userRequest.Id : 0);
            com.Parameters.AddWithValue("@EmpCode", userRequest.EmpCode != null ? userRequest.EmpCode : string.Empty);
            com.Parameters.AddWithValue("@Password", "12345");
            com.Parameters.AddWithValue("@EmpName", userRequest.EmpName != null ? userRequest.EmpName : string.Empty);
            com.Parameters.AddWithValue("@Grade", userRequest.Grade != null ? userRequest.Grade : string.Empty);
            com.Parameters.AddWithValue("@Department", userRequest.Department != null ? userRequest.Department : string.Empty);
            com.Parameters.AddWithValue("@Company", userRequest.Company != null ? userRequest.Company : string.Empty);
            com.Parameters.AddWithValue("@EmpMailId", userRequest.EmpMailId != null ? userRequest.EmpMailId : string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", userRequest.BusinessUnit != null ? userRequest.BusinessUnit : string.Empty);
            com.Parameters.AddWithValue("@Plant", userRequest.Plant != null ? userRequest.Plant : string.Empty);
            com.Parameters.AddWithValue("@RoleId", userRequest.RoleId);
            con.Open();
            com.ExecuteNonQuery();
            string numRes = com.ExecuteNonQuery().ToString();
            con.Close();
            return numRes;
        }

        /// <summary>
        /// Business Logic For FetchLoginRegisterByEmpCode
        /// </summary>
        /// <param name="EmpCode"></param>
        /// <returns></returns>
        public UserResponse FetchLoginRegisterByEmpCode(string EmpCode)
        {
            var userResponse = new UserResponse();
            DataTable dsData;
            using (SqlCommand sqlCmd = new SqlCommand("GetUsers", con))
            {
                sqlCmd.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCmd.Parameters.Add(new SqlParameter("@EmpCode", EmpCode));
                sqlCmd.Parameters.AddWithValue("@BusinessUnit", string.Empty);
                sqlCmd.Parameters.AddWithValue("@RoleId", 0);
                sqlCmd.Parameters.AddWithValue("@Plant", string.Empty);
                sqlCmd.Parameters.AddWithValue("@ActionType", "UserById");
                sqlCmd.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
                sqlCmd.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;

                SqlDataAdapter sqlAd = new SqlDataAdapter(sqlCmd);
                dsData = new DataTable();
                con.Open();
                sqlAd.Fill(dsData);
                if (dsData.Rows.Count > 0)
                {
                    userResponse.EmpCode = Convert.ToInt32(dsData.Rows[0][0].ToString());
                    userResponse.Password = dsData.Rows[0][1].ToString();
                    userResponse.EmpName = dsData.Rows[0][2].ToString();
                    userResponse.Grade = dsData.Rows[0][3].ToString();
                    userResponse.Department = dsData.Rows[0][4].ToString();
                    userResponse.Company = dsData.Rows[0][5].ToString();
                    userResponse.EmpMailId = dsData.Rows[0][6].ToString();
                    userResponse.BusinessUnit = dsData.Rows[0][7].ToString();
                    userResponse.Plant = dsData.Rows[0][8].ToString();
                    userResponse.RoleId = Convert.ToInt32(dsData.Rows[0][9].ToString());
                }
            }
            return userResponse;

        }
       
        /// <summary>
        /// Business Logic For ListOfUsers
        /// </summary>
        /// <returns></returns>
        public EmployeeList GetUsersList(int pageIndex, int pageSize)
        {
            var employeeList = new EmployeeList();
            com = new SqlCommand("GetUsers", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "Users");
            com.Parameters.AddWithValue("@EmpCode", string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            com.Parameters.AddWithValue("@RoleId", 0);
            com.Parameters.AddWithValue("@Plant", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var userResponse = new List<UserResponse>();
            while (dr.Read())
            {
                var user = new UserResponse();
                user.Id = Convert.ToInt32(dr["Id"]);
                user.EmpCode = Convert.ToInt32(dr["EmpCode"].ToString());
                user.Password = dr["Password"].ToString()!=null? dr["Password"].ToString():string.Empty;
                user.EmpName = dr["EmpName"].ToString() != null ? dr["EmpName"].ToString() : string.Empty;
                user.Grade = dr["Grade"].ToString() != null ? dr["Grade"].ToString() : string.Empty;
                user.Department = dr["Department"].ToString() != null ? dr["Department"].ToString() : string.Empty;
                user.Company = dr["Company"].ToString() != null ? dr["Company"].ToString() : string.Empty;
                user.EmpMailId = dr["EmpMailId"].ToString() != null ? dr["EmpMailId"].ToString() : string.Empty;
                user.BusinessUnit = dr["BusinessUnit"].ToString() != null ? dr["BusinessUnit"].ToString() : string.Empty;
                user.Plant = dr["Plant"].ToString() != null ? dr["Plant"].ToString() : string.Empty;
                user.RoleId = Convert.ToInt32(dr["RoleId"]);
                userResponse.Add(user);
            }

            dr.NextResult();

            while (dr.Read())
            {
                employeeList.totalCount = dr["totalCount"].ToString();
            }
            employeeList.userResponse = userResponse;
            return employeeList;
        }
        /// <summary>
        /// Business Logic For TeamDetailsSaveOrUpdate
        /// </summary>
        /// <param name="teamDetailsRequest"></param>
        /// <returns></returns>
        public string SaveOrUpdateTeamDetails(TeamDetailsRequest teamDetailsRequest)
        {

            com = new SqlCommand("SaveOrUpdateAndGet_TeamDetails", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "SaveData");
            com.Parameters.AddWithValue("@Company", teamDetailsRequest.Company);
            com.Parameters.AddWithValue("@BusinessUnit", teamDetailsRequest.BusinessUnit);
            com.Parameters.AddWithValue("@Plant", teamDetailsRequest.Plant);
            com.Parameters.AddWithValue("@TeamName", teamDetailsRequest.TeamName);
            com.Parameters.AddWithValue("@Status", teamDetailsRequest.Status);
            com.Parameters.AddWithValue("@Level1", teamDetailsRequest.Level1 != null ? teamDetailsRequest.Level1 : string.Empty);
            com.Parameters.AddWithValue("@Level2", teamDetailsRequest.Level2 != null ? teamDetailsRequest.Level2 : string.Empty);
            com.Parameters.AddWithValue("@Level3", teamDetailsRequest.Level3 != null ? teamDetailsRequest.Level3 : string.Empty);
            com.Parameters.AddWithValue("@Remarks", teamDetailsRequest.Remarks != null ? teamDetailsRequest.Remarks : string.Empty);
            com.Parameters.AddWithValue("@CreatedBy", teamDetailsRequest.CreatedBy != null ? teamDetailsRequest.CreatedBy : string.Empty);
            com.Parameters.AddWithValue("@UpdatedBY", teamDetailsRequest.UpdatedBy != null ? teamDetailsRequest.UpdatedBy : string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;
            con.Open();
            com.ExecuteNonQuery();
            string numRes = com.ExecuteNonQuery().ToString();
            con.Close();
            return numRes;
        }
        /// <summary>
        /// Business Logic For FetchTeamDetailsByLevels
        /// </summary>
        /// <param name="Level"></param>
        /// <returns></returns>
        public TeamDetails FetchTeamDetailsByLevels(string Level, int pageIndex, int pageSize)
        {
            var teamDetails = new TeamDetails();
            com = new SqlCommand("SaveOrUpdateAndGet_TeamDetails", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "Level");
            com.Parameters.AddWithValue("@Company", string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            com.Parameters.AddWithValue("@Plant", string.Empty);
            com.Parameters.AddWithValue("@TeamName", string.Empty);
            com.Parameters.AddWithValue("@Status", string.Empty);
            com.Parameters.AddWithValue("@Level1", Level);
            com.Parameters.AddWithValue("@Level2", Level);
            com.Parameters.AddWithValue("@Level3", string.Empty);
            com.Parameters.AddWithValue("@Remarks", string.Empty);
            com.Parameters.AddWithValue("@CreatedBy", string.Empty);
            com.Parameters.AddWithValue("@UpdatedBy", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var temaDetailsResponse = new List<TemaDetailsResponse>();
            while (dr.Read())
            {
                var teamdetails = new TemaDetailsResponse();
                teamdetails.Id = Convert.ToInt32(dr["Id"]);
                teamdetails.Company = dr["Company"].ToString();
                teamdetails.BusinessUnit = dr["BusinessUnit"].ToString();
                teamdetails.Plant = dr["Plant"].ToString();
                teamdetails.TeamName = dr["TeamName"].ToString();
                teamdetails.Status = dr["Status"].ToString();
                teamdetails.Company = dr["Company"].ToString();
                teamdetails.Level1 = dr["Level1"].ToString();
                teamdetails.Level2 = dr["Level2"].ToString();
                teamdetails.Level3 = dr["Level3"].ToString();
                if (teamdetails.Status == "1")
                {
                    teamdetails.StatusName = "Pending For L1 Approval";
                }
                else if (teamdetails.Status == "2")
                {
                    teamdetails.StatusName = "Pending For L2 Approval";
                }
                else if (teamdetails.Status == "3")
                {
                    teamdetails.StatusName = "Pending For Project Selection";
                }
                else if (teamdetails.Status == "4")
                {
                    teamdetails.StatusName = "Project Initiation";
                }
                else if (teamdetails.Status == "5")
                {
                    teamdetails.StatusName = "Pending For L1 Approval";
                }
                else if (teamdetails.Status == "6")
                {
                    teamdetails.StatusName = "Pending For L2 Approval";
                }
                else if (teamdetails.Status == "7")
                {
                    teamdetails.StatusName = "Pending For L3 Approval";
                }
                else if (teamdetails.Status == "8")
                {
                    teamdetails.StatusName = "Aproved";
                }
                else if (teamdetails.Status == "9")
                {
                    teamdetails.StatusName = "Rejected";
                }
                teamdetails.Remarks = dr["Remarks"].ToString();

                teamdetails.PlLoginMailId = dr["PlLoginMailId"].ToString();
                teamdetails.L1MailId = dr["L1MailId"].ToString();
                teamdetails.L2MailId = dr["L2MailId"].ToString();
                teamdetails.L3MailId = dr["L3MailId"].ToString();
                teamdetails.TeamStrength = dr["TeamStrength"].ToString();
                temaDetailsResponse.Add(teamdetails);
            }

            dr.NextResult();

            while (dr.Read())
            {
                teamDetails.totalCount = dr["totalCount"].ToString();
            }
            teamDetails.temaDetailsResponse = temaDetailsResponse;
            return teamDetails;
        }
        /// <summary>
        /// Business Logic For FetchCircleDetails By CircleName
        /// </summary>
        /// <param name="CircleName"></param>
        /// <returns></returns>
        public List<CircleRegistrationResponse> FetchCircleDetailsByName(string CircleName, string empCode, string Plant, string Businessunit)
        {
            var circleRegistrationResponse = new List<CircleRegistrationResponse>();
            com = new SqlCommand("FetchCircleDetailsByCircleName", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@circleName", CircleName);
            com.Parameters.AddWithValue("@EmpCode", empCode);
            com.Parameters.AddWithValue("@Plant", Plant);
            com.Parameters.AddWithValue("@Businessunit", Businessunit);
            var sqlAd = new SqlDataAdapter(com);
            var dsData = new DataSet();
            sqlAd.Fill(dsData);
            for (int i = 0; i < dsData.Tables[0].Rows.Count; i++)
            {
                byte[] imgData1 = (byte[])dsData.Tables[0].Rows[i]["Image"];
                var circleRegistration = new CircleRegistrationResponse();
                circleRegistration.CircleId = Convert.ToInt32(dsData.Tables[0].Rows[i]["CircleId"]);
                circleRegistration.CircleName = dsData.Tables[0].Rows[i]["CircleName"].ToString();
                circleRegistration.Department = dsData.Tables[0].Rows[i]["Department"].ToString();
                circleRegistration.Grade = dsData.Tables[0].Rows[i]["Grade"].ToString();
                circleRegistration.BusinessUnit = dsData.Tables[0].Rows[i]["BusinessUnit"].ToString();
                circleRegistration.Image = Encoding.UTF8.GetString(imgData1, 0, imgData1.Length);
                circleRegistration.EmpCode = dsData.Tables[0].Rows[i]["EmpCode"].ToString();
                circleRegistration.EmpName = dsData.Tables[0].Rows[i]["Name"].ToString();
                circleRegistration.Level2 = dsData.Tables[0].Rows[i]["Level2"].ToString();
                circleRegistration.Level3 = dsData.Tables[0].Rows[i]["Level3"].ToString();
                circleRegistration.Level1 = dsData.Tables[0].Rows[i]["Level1"].ToString();
                circleRegistration.Status = dsData.Tables[0].Rows[i]["Status"].ToString();
                if (circleRegistration.Status == "1")
                {
                    circleRegistration.StatusName = "Pending For L1 Approval";
                }
                else if (circleRegistration.Status == "2")
                {
                    circleRegistration.StatusName = "Pending For L2 Approval";
                }
                else if (circleRegistration.Status == "3")
                {
                    circleRegistration.StatusName = "Pending For Project Selection";
                }
                else if (circleRegistration.Status == "4")
                {
                    circleRegistration.StatusName = "Project Initiation";
                }
                else if (circleRegistration.Status == "5")
                {
                    circleRegistration.StatusName = "Pending For L1 Approval";
                }
                else if (circleRegistration.Status == "6")
                {
                    circleRegistration.StatusName = "Pending For L2 Approval";
                }
                else if (circleRegistration.Status == "7")
                {
                    circleRegistration.StatusName = "Pending For L3 Approval";
                }
                else if (circleRegistration.Status == "8")
                {
                    circleRegistration.StatusName = "Aproved";
                }
                else if (circleRegistration.Status == "9")
                {
                    circleRegistration.StatusName = "Rejected";
                }
                circleRegistrationResponse.Add(circleRegistration);
            }
            return circleRegistrationResponse;
        }
        /// <summary>
        /// Business Logic For Fetch TeamDetails By Status
        /// </summary>
        /// <param name="Status"></param>
        /// <returns></returns>
        public TeamDetails FetchTeamDetailsByStatus(string Status, string CreatedBy, int pageIndex, int pageSize)
        {
            var teamDetails = new TeamDetails();
            com = new SqlCommand("SaveOrUpdateAndGet_TeamDetails", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "ApprovedOrRejected");
            com.Parameters.AddWithValue("@Company", string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            com.Parameters.AddWithValue("@Plant", string.Empty);
            com.Parameters.AddWithValue("@TeamName", string.Empty);
            com.Parameters.AddWithValue("@Status", Status);
            com.Parameters.AddWithValue("@Level1", string.Empty);
            com.Parameters.AddWithValue("@Level2", string.Empty);
            com.Parameters.AddWithValue("@Level3", string.Empty);
            com.Parameters.AddWithValue("@Remarks", string.Empty);
            com.Parameters.AddWithValue("@CreatedBy", CreatedBy);
            com.Parameters.AddWithValue("@UpdatedBy", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var temaDetailsResponse = new List<TemaDetailsResponse>();
            while (dr.Read())
            {
                var teamdetails = new TemaDetailsResponse();
                teamdetails.Id = Convert.ToInt32(dr["Id"]);
                teamdetails.Company = dr["Company"].ToString();
                teamdetails.BusinessUnit = dr["BusinessUnit"].ToString();
                teamdetails.Plant = dr["Plant"].ToString();
                teamdetails.TeamName = dr["TeamName"].ToString();
                teamdetails.Status = dr["Status"].ToString();
                teamdetails.Company = dr["Company"].ToString();
                teamdetails.Level1 = dr["Level1"].ToString();
                teamdetails.Level2 = dr["Level2"].ToString();
                teamdetails.Level3 = dr["Level3"].ToString();
                if (teamdetails.Status == "1")
                {
                    teamdetails.StatusName = "Pending For L1 Approval";
                }
                else if (teamdetails.Status == "2")
                {
                    teamdetails.StatusName = "Pending For L2 Approval";
                }
                else if (teamdetails.Status == "3")
                {
                    teamdetails.StatusName = "Pending For Project Selection";
                }
                else if (teamdetails.Status == "4")
                {
                    teamdetails.StatusName = "Project Initiation";
                }
                else if (teamdetails.Status == "5")
                {
                    teamdetails.StatusName = "Pending For L1 Approval";
                }
                else if (teamdetails.Status == "6")
                {
                    teamdetails.StatusName = "Pending For L2 Approval";
                }
                else if (teamdetails.Status == "7")
                {
                    teamdetails.StatusName = "Pending For L3 Approval";
                }
                else if (teamdetails.Status == "8")
                {
                    teamdetails.StatusName = "Aproved";
                }
                else if (teamdetails.Status == "9")
                {
                    teamdetails.StatusName = "Rejected";
                }
                teamdetails.Remarks = dr["Remarks"].ToString();

                teamdetails.PlLoginMailId = dr["PlLoginMailId"].ToString();
                teamdetails.L1MailId = dr["L1MailId"].ToString();
                teamdetails.L2MailId = dr["L2MailId"].ToString();
                teamdetails.L3MailId = dr["L3MailId"].ToString();
                teamdetails.TeamStrength = dr["TeamStrength"].ToString();
                temaDetailsResponse.Add(teamdetails);
            }

            dr.NextResult();

            while (dr.Read())
            {
                teamDetails.totalCount = dr["totalCount"].ToString();
            }
            teamDetails.temaDetailsResponse = temaDetailsResponse;
            return teamDetails;
        }

        /// <summary>
        /// Business Logic For Fetch TeamDetails By Status
        /// </summary>
        /// <param name="Status"></param>
        /// <returns></returns>
        public TeamDetails FetchTeamDetailsByStatusProjects(string Status, string CreatedBy, int pageIndex, int pageSize)
        {
            var teamDetails = new TeamDetails();
            com = new SqlCommand("SaveOrUpdateAndGet_TeamDetails", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "ARProjectSelect");
            com.Parameters.AddWithValue("@Company", string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            com.Parameters.AddWithValue("@Plant", string.Empty);
            com.Parameters.AddWithValue("@TeamName", string.Empty);
            com.Parameters.AddWithValue("@Status", Status);
            com.Parameters.AddWithValue("@Level1", string.Empty);
            com.Parameters.AddWithValue("@Level2", string.Empty);
            com.Parameters.AddWithValue("@Level3", string.Empty);
            com.Parameters.AddWithValue("@Remarks", string.Empty);
            com.Parameters.AddWithValue("@CreatedBy", CreatedBy);
            com.Parameters.AddWithValue("@UpdatedBy", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var temaDetailsResponse = new List<TemaDetailsResponse>();
            while (dr.Read())
            {
                var teamdetails = new TemaDetailsResponse();
                teamdetails.Id = Convert.ToInt32(dr["Id"]);
                teamdetails.Company = dr["Company"].ToString();
                teamdetails.BusinessUnit = dr["BusinessUnit"].ToString();
                teamdetails.Plant = dr["Plant"].ToString();
                teamdetails.TeamName = dr["TeamName"].ToString();
                teamdetails.Status = dr["Status"].ToString();
                teamdetails.Company = dr["Company"].ToString();
                teamdetails.Level1 = dr["Level1"].ToString();
                teamdetails.Level2 = dr["Level2"].ToString();
                teamdetails.Level3 = dr["Level3"].ToString();
                if (teamdetails.Status == "1")
                {
                    teamdetails.StatusName = "Pending For L1 Approval";
                }
                else if (teamdetails.Status == "2")
                {
                    teamdetails.StatusName = "Pending For L2 Approval";
                }
                else if (teamdetails.Status == "3")
                {
                    teamdetails.StatusName = "Pending For Project Selection";
                }
                else if (teamdetails.Status == "4")
                {
                    teamdetails.StatusName = "Project Initiation";
                }
                else if (teamdetails.Status == "5")
                {
                    teamdetails.StatusName = "Pending For L1 Approval";
                }
                else if (teamdetails.Status == "6")
                {
                    teamdetails.StatusName = "Pending For L2 Approval";
                }
                else if (teamdetails.Status == "7")
                {
                    teamdetails.StatusName = "Pending For L3 Approval";
                }
                else if (teamdetails.Status == "8")
                {
                    teamdetails.StatusName = "Aproved";
                }
                else if (teamdetails.Status == "9")
                {
                    teamdetails.StatusName = "Rejected";
                }
                teamdetails.Remarks = dr["Remarks"].ToString();

                teamdetails.PlLoginMailId = dr["PlLoginMailId"].ToString();
                teamdetails.L1MailId = dr["L1MailId"].ToString();
                teamdetails.L2MailId = dr["L2MailId"].ToString();
                teamdetails.L3MailId = dr["L3MailId"].ToString();
                teamdetails.TeamStrength = dr["TeamStrength"].ToString();
                temaDetailsResponse.Add(teamdetails);
            }

            dr.NextResult();

            while (dr.Read())
            {
                teamDetails.totalCount = dr["totalCount"].ToString();
            }
            teamDetails.temaDetailsResponse = temaDetailsResponse;
            return teamDetails;
        }
        /// <summary>
        /// Business Logic For Fetch Levels
        /// </summary>
        /// <returns></returns>
        public List<RolesResponse> FetchRoles()
        {
            var rolesResponse = new List<RolesResponse>();
            com = new SqlCommand("GetUsers", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.Add(new SqlParameter("@EmpCode", string.Empty));
            com.Parameters.AddWithValue("@ActionType", "Levels");
            com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            com.Parameters.AddWithValue("@RoleId", 0);
            com.Parameters.AddWithValue("@Plant", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;
            var sqlAd = new SqlDataAdapter(com);
            var dsData = new DataSet();
            sqlAd.Fill(dsData);
            for (int i = 0; i < dsData.Tables[0].Rows.Count; i++)
            {
                var roles = new RolesResponse();
                roles.RoleId = Convert.ToInt32(dsData.Tables[0].Rows[i]["Role_Id"]);
                roles.RoleName = dsData.Tables[0].Rows[i]["Role"].ToString();
                rolesResponse.Add(roles);
            }
            return rolesResponse;
        }
        /// <summary>
        /// Business Logic For Plant Based businessUnit and Company
        /// </summary>
        /// <returns></returns>
        public List<PlantDropdownResponse> FetchPlants()
        {
            var plantDropdownResponse = new List<PlantDropdownResponse>();
            com = new SqlCommand("GetApprovals", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.Add(new SqlParameter("@BusinessUnit", string.Empty));
            com.Parameters.AddWithValue("@ActionType", "PlantDRWN");
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;
            var sqlAd = new SqlDataAdapter(com);
            var dsData = new DataSet();
            sqlAd.Fill(dsData);
            for (int i = 0; i < dsData.Tables[0].Rows.Count; i++)
            {
                var plant = new PlantDropdownResponse();
                plant.Id = Convert.ToInt32(dsData.Tables[0].Rows[i]["Id"]);
                plant.Plant = dsData.Tables[0].Rows[i]["Plant"].ToString();
                plant.BusinessUnit = dsData.Tables[0].Rows[i]["BusinessUnit"].ToString();
                plant.Company = dsData.Tables[0].Rows[i]["Company"].ToString();
                plantDropdownResponse.Add(plant);
            }
            return plantDropdownResponse;
        }
        /// <summary>
        /// Business Logic For Fetching Level1 Employees For A Plant
        /// </summary>
        /// <param name="employeeByLevelRequest"></param>
        /// <returns></returns>
        public List<EmployeeLevelResponse> FetchEmployeeByLevel(string BusinessUnit, string Plant, int RoleId)
        {
            var employeeLevelResponse = new List<EmployeeLevelResponse>();
            com = new SqlCommand("GetUsers", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "LevelDropDown");
            com.Parameters.AddWithValue("@EmpCode", string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", BusinessUnit);
            com.Parameters.AddWithValue("@RoleId", RoleId);
            com.Parameters.AddWithValue("@Plant", Plant);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;
            var sqlAd = new SqlDataAdapter(com);
            var dsData = new DataSet();
            sqlAd.Fill(dsData);
            for (int i = 0; i < dsData.Tables[0].Rows.Count; i++)
            {
                var employeeLevel = new EmployeeLevelResponse();
                employeeLevel.EmpCode = dsData.Tables[0].Rows[i]["EmpCode"].ToString();
                employeeLevel.EmpName = dsData.Tables[0].Rows[i]["EmpName"].ToString();
                employeeLevel.BusinessUnit = dsData.Tables[0].Rows[i]["BusinessUnit"].ToString();
                employeeLevel.Plant = dsData.Tables[0].Rows[i]["Plant"].ToString();
                employeeLevelResponse.Add(employeeLevel);
            }
            return employeeLevelResponse;
        }
        /// <summary>
        /// Business Logic For SaveOrUpdate Project Details Selection
        /// </summary>
        /// <param name="projectSelectionSheetRequest"></param>
        /// <returns></returns>
        public string ProjectSelectionSaveOrUpdate(ProjectSelectionSheetRequest projectSelectionSheetRequest)
        {
            string dateString = @projectSelectionSheetRequest.ProjectStartDate;
            string dateString1 = @projectSelectionSheetRequest.ProjectEndDate;
            DateTime date1 = DateTime.ParseExact(dateString, @"d-M-yyyy",
                System.Globalization.CultureInfo.InvariantCulture);
            DateTime date2 = DateTime.ParseExact(dateString1, @"d-M-yyyy",
               System.Globalization.CultureInfo.InvariantCulture);
            //DateTime date1 = DateTime.ParseExact(projectSelectionSheetRequest.ProjectStartDate, "dd/MM/yyyy", null);
            //DateTime date2 = DateTime.ParseExact(projectSelectionSheetRequest.ProjectEndDate, "dd/MM/yyyy", null);
            com = new SqlCommand("SaveOrUpdateAndGet_ProjectDetails_Insert", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "SaveData");
            com.Parameters.AddWithValue("@TeamId", projectSelectionSheetRequest.TeamId);
            com.Parameters.AddWithValue("@Title", projectSelectionSheetRequest.Title);
            com.Parameters.AddWithValue("@Objective", projectSelectionSheetRequest.Objective);
            com.Parameters.AddWithValue("@Goal", projectSelectionSheetRequest.Goal);
            com.Parameters.AddWithValue("@ProjectStartDate", date1);
            com.Parameters.AddWithValue("@ProjectEndDate", date2);
            com.Parameters.AddWithValue("@ExpectedCostSaving", projectSelectionSheetRequest.ExpectedCostSaving);
            com.Parameters.AddWithValue("@Status", projectSelectionSheetRequest.Status);
            com.Parameters.AddWithValue("@TeamStatus", projectSelectionSheetRequest.TeamStatus);
            com.Parameters.AddWithValue("@Level1", projectSelectionSheetRequest.Level1);
            com.Parameters.AddWithValue("@Level2", projectSelectionSheetRequest.Level2 != null ? projectSelectionSheetRequest.Level2 : string.Empty);
            com.Parameters.AddWithValue("@Level3", projectSelectionSheetRequest.Level3 != null ? projectSelectionSheetRequest.Level3 : string.Empty);
            com.Parameters.AddWithValue("@CreatedBy", projectSelectionSheetRequest.CreatedBy != null ? projectSelectionSheetRequest.CreatedBy : string.Empty);
            com.Parameters.AddWithValue("@UpdatedBy", projectSelectionSheetRequest.UpdatedBy != null ? projectSelectionSheetRequest.UpdatedBy : string.Empty);
            com.Parameters.AddWithValue("@ActualGaol", projectSelectionSheetRequest.ActualGoal != null ? projectSelectionSheetRequest.ActualGoal : string.Empty);
            com.Parameters.AddWithValue("@GoalTo", projectSelectionSheetRequest.GoalTo);
            com.Parameters.AddWithValue("@GoalUOM", projectSelectionSheetRequest.GoalUOM);
            com.Parameters.AddWithValue("@GoalToUOM", projectSelectionSheetRequest.GoalToUOM);
            if (string.IsNullOrEmpty(projectSelectionSheetRequest.ActualProjectStartDate))
            {
                com.Parameters.AddWithValue("@ActualProjectStartDate", string.Empty);
            }
            else
            {
                string dateStrin2 = @projectSelectionSheetRequest.ActualProjectStartDate;

                DateTime date3 = DateTime.ParseExact(dateStrin2, @"d-M-yyyy",
               System.Globalization.CultureInfo.InvariantCulture);

                com.Parameters.AddWithValue("@ActualProjectStartDate", date3);
            }
            if (string.IsNullOrEmpty(projectSelectionSheetRequest.ActualProjectEndDate))
            {
                com.Parameters.AddWithValue("@ActualProjectEndDate", string.Empty);
            }
            else
            {
                string dateString3 = @projectSelectionSheetRequest.ActualProjectEndDate;
                DateTime date4 = DateTime.ParseExact(dateString3, @"d-M-yyyy",
                  System.Globalization.CultureInfo.InvariantCulture);
                com.Parameters.AddWithValue("@ActualProjectEndDate", date4);
            }
            com.Parameters.AddWithValue("@ActualExpeCostSaving", projectSelectionSheetRequest.ActualExpectedCostSaving != null ? projectSelectionSheetRequest.ActualExpectedCostSaving : string.Empty);
            com.Parameters.AddWithValue("@Remarks", projectSelectionSheetRequest.Remarks != null ? projectSelectionSheetRequest.Remarks : string.Empty);
            con.Open();
            com.ExecuteNonQuery();
            string numRes = com.ExecuteNonQuery().ToString();
            con.Close();
            return numRes;
        }
        /// <summary>
        /// Business Logic For Fetch Project details By TeamId
        /// </summary>
        /// <param name="TeamId"></param>
        /// <returns></returns>
        public List<ProjectSelectionSheetResponse> FetchProjectsByTeamId(int TeamId)
        {
            var projectSelectionSheetResponse = new List<ProjectSelectionSheetResponse>();
            com = new SqlCommand("SaveOrUpdateAndGet_ProjectDetails", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "FetchProjectDetailsTeamId");
            com.Parameters.AddWithValue("@TeamId", TeamId);
            com.Parameters.AddWithValue("@Title", string.Empty);
            com.Parameters.AddWithValue("@Objective", string.Empty);
            com.Parameters.AddWithValue("@Goal", string.Empty);
            com.Parameters.AddWithValue("@ProjectStartDate", string.Empty);
            com.Parameters.AddWithValue("@ProjectEndDate", string.Empty);
            com.Parameters.AddWithValue("@ExpectedCostSaving", string.Empty);
            com.Parameters.AddWithValue("@Status", string.Empty);
            com.Parameters.AddWithValue("@Level1", string.Empty);
            com.Parameters.AddWithValue("@Level2", string.Empty);
            com.Parameters.AddWithValue("@Level3", string.Empty);
            com.Parameters.AddWithValue("@CreatedBy", string.Empty);
            com.Parameters.AddWithValue("@UpdatedBy", string.Empty);
            com.Parameters.AddWithValue("@ActualGaol", string.Empty);
            com.Parameters.AddWithValue("@ActualProjectStartDate", string.Empty);
            com.Parameters.AddWithValue("@ActualProjectEndDate", string.Empty);
            com.Parameters.AddWithValue("@ActualExpeCostSaving", string.Empty);
            com.Parameters.AddWithValue("@Remarks", string.Empty);
            com.Parameters.AddWithValue("@GoalTo", string.Empty);
            com.Parameters.AddWithValue("@GoalUOM", string.Empty);
            com.Parameters.AddWithValue("@GoalToUOM", string.Empty);
            var sqlAd = new SqlDataAdapter(com);
            var dsData = new DataSet();
            sqlAd.Fill(dsData);
            for (int i = 0; i < dsData.Tables[0].Rows.Count; i++)
            {
                var projectSelectionSheet = new ProjectSelectionSheetResponse();
                projectSelectionSheet.ProjectId = Convert.ToInt32(dsData.Tables[0].Rows[i]["ProjectId"]);
                projectSelectionSheet.TeamId = Convert.ToInt32(dsData.Tables[0].Rows[i]["TeamId"]);
                projectSelectionSheet.Title = dsData.Tables[0].Rows[i]["Title"].ToString();
                projectSelectionSheet.Objective = dsData.Tables[0].Rows[i]["Objective"].ToString();
                projectSelectionSheet.Goal = Convert.ToInt32(dsData.Tables[0].Rows[i]["Goal"].ToString());
                projectSelectionSheet.ProjectStartDate = dsData.Tables[0].Rows[i]["ProjectStartDate"].ToString();
                projectSelectionSheet.ProjectEndDate = dsData.Tables[0].Rows[i]["ProjectEndDate"].ToString();
                projectSelectionSheet.ExpectedCostSaving = dsData.Tables[0].Rows[i]["ExpectedCostSaving"].ToString();
                projectSelectionSheet.Level1 = dsData.Tables[0].Rows[i]["Level1"].ToString();
                projectSelectionSheet.Status = Convert.ToInt32(dsData.Tables[0].Rows[i]["Status"]);
                if (projectSelectionSheet.Status == 1)
                {
                    projectSelectionSheet.StatusName = "Pending For L1 Approval";
                }
                else if (projectSelectionSheet.Status == 2)
                {
                    projectSelectionSheet.StatusName = "Pending For L2 Approval";
                }
                //else if (projectSelectionSheet.Status == 3)
                //{
                //    projectSelectionSheet.StatusName = "Pending For L3 Approval";
                //}
                else if (projectSelectionSheet.Status == 3)
                {
                    projectSelectionSheet.StatusName = "Project Initiation";
                }
                else if (projectSelectionSheet.Status == 4)
                {
                    projectSelectionSheet.StatusName = "Pending For L1 Approval";
                }
                else if (projectSelectionSheet.Status == 5)
                {
                    projectSelectionSheet.StatusName = "Pending For L2 Approval";
                }
                else if (projectSelectionSheet.Status == 6)
                {
                    projectSelectionSheet.StatusName = "Pending For L3 Approval";
                }
                else if (projectSelectionSheet.Status == 7)
                {
                    projectSelectionSheet.StatusName = "Aproved";
                }
                else if (projectSelectionSheet.Status == 8)
                {
                    projectSelectionSheet.StatusName = "Rejected";
                }
                projectSelectionSheet.Level2 = dsData.Tables[0].Rows[i]["Level2"].ToString();
                projectSelectionSheet.Level3 = dsData.Tables[0].Rows[i]["Level3"].ToString();
                projectSelectionSheet.CreatedBy = dsData.Tables[0].Rows[i]["CreatedBy"].ToString();
                projectSelectionSheet.UpdatedBy = dsData.Tables[0].Rows[i]["UpdatedBy"].ToString();
                projectSelectionSheet.ActualGoal = dsData.Tables[0].Rows[i]["ActualGaol"].ToString();
                projectSelectionSheet.ActualProjectStartDate = dsData.Tables[0].Rows[i]["ActualProjectStartDate"].ToString();
                projectSelectionSheet.ActualProjectEndDate = dsData.Tables[0].Rows[i]["ActualProjectEndDate"].ToString();
                projectSelectionSheet.ActualExpectedCostSaving = dsData.Tables[0].Rows[i]["ActualExpeCostSaving"].ToString();
                projectSelectionSheet.Remarks = dsData.Tables[0].Rows[i]["Remarks"].ToString();
                projectSelectionSheet.GoalTo = Convert.ToInt32(dsData.Tables[0].Rows[i]["GoalTo"].ToString());
                projectSelectionSheet.GoalToUOM = dsData.Tables[0].Rows[i]["GoalToUOM"].ToString();
                projectSelectionSheet.GoalUOM = dsData.Tables[0].Rows[i]["GoalUOM"].ToString();
                projectSelectionSheetResponse.Add(projectSelectionSheet);
            }
            return projectSelectionSheetResponse;
        }
        public List<ProjectSelectionSheetResponse> FetchProjectsByLevelAndStatus(int TeamId, string Level)
        {
            var projectSelectionSheetResponse = new List<ProjectSelectionSheetResponse>();
            com = new SqlCommand("SaveOrUpdateAndGet_ProjectDetails", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "Level");
            com.Parameters.AddWithValue("@TeamId", TeamId);
            com.Parameters.AddWithValue("@Title", string.Empty);
            com.Parameters.AddWithValue("@Objective", string.Empty);
            com.Parameters.AddWithValue("@Goal", string.Empty);
            com.Parameters.AddWithValue("@ProjectStartDate", string.Empty);
            com.Parameters.AddWithValue("@ProjectEndDate", string.Empty);
            com.Parameters.AddWithValue("@ExpectedCostSaving", string.Empty);
            com.Parameters.AddWithValue("@Status", string.Empty);
            com.Parameters.AddWithValue("@Level1", Level);
            com.Parameters.AddWithValue("@Level2", Level);
            com.Parameters.AddWithValue("@Level3", Level);
            com.Parameters.AddWithValue("@CreatedBy", string.Empty);
            com.Parameters.AddWithValue("@UpdatedBy", string.Empty);
            com.Parameters.AddWithValue("@ActualGaol", string.Empty);
            com.Parameters.AddWithValue("@ActualProjectStartDate", string.Empty);
            com.Parameters.AddWithValue("@ActualProjectEndDate", string.Empty);
            com.Parameters.AddWithValue("@ActualExpeCostSaving", string.Empty);
            com.Parameters.AddWithValue("@Remarks", string.Empty);
            com.Parameters.AddWithValue("@GoalTo", string.Empty);
            com.Parameters.AddWithValue("@GoalUOM", string.Empty);
            com.Parameters.AddWithValue("@GoalToUOM", string.Empty);
            var sqlAd = new SqlDataAdapter(com);
            var dsData = new DataSet();
            sqlAd.Fill(dsData);
            for (int i = 0; i < dsData.Tables[0].Rows.Count; i++)
            {
                var projectSelectionSheet = new ProjectSelectionSheetResponse();
                projectSelectionSheet.ProjectId = Convert.ToInt32(dsData.Tables[0].Rows[i]["ProjectId"]);
                projectSelectionSheet.TeamId = Convert.ToInt32(dsData.Tables[0].Rows[i]["TeamId"]);
                projectSelectionSheet.Title = dsData.Tables[0].Rows[i]["Title"].ToString();
                projectSelectionSheet.Objective = dsData.Tables[0].Rows[i]["Objective"].ToString();
                projectSelectionSheet.Goal = Convert.ToInt32(dsData.Tables[0].Rows[i]["Goal"].ToString());
                projectSelectionSheet.ProjectStartDate = dsData.Tables[0].Rows[i]["ProjectStartDate"].ToString();
                projectSelectionSheet.ProjectEndDate = dsData.Tables[0].Rows[i]["ProjectEndDate"].ToString();
                projectSelectionSheet.ExpectedCostSaving = dsData.Tables[0].Rows[i]["ExpectedCostSaving"].ToString();
                projectSelectionSheet.Level1 = dsData.Tables[0].Rows[i]["Level1"].ToString();
                projectSelectionSheet.Status = Convert.ToInt32(dsData.Tables[0].Rows[i]["Status"]);
                if (projectSelectionSheet.Status == 1)
                {
                    projectSelectionSheet.StatusName = "Pending For L1 Approval";
                }
                else if (projectSelectionSheet.Status == 2)
                {
                    projectSelectionSheet.StatusName = "Pending For L2 Approval";
                }
                //else if (projectSelectionSheet.Status == 3)
                //{
                //    projectSelectionSheet.StatusName = "Pending For L3 Approval";
                //}
                else if (projectSelectionSheet.Status == 3)
                {
                    projectSelectionSheet.StatusName = "Project Initiation";
                }
                else if (projectSelectionSheet.Status == 4)
                {
                    projectSelectionSheet.StatusName = "Pending For L1 Approval";
                }
                else if (projectSelectionSheet.Status == 5)
                {
                    projectSelectionSheet.StatusName = "Pending For L2 Approval";
                }
                else if (projectSelectionSheet.Status == 6)
                {
                    projectSelectionSheet.StatusName = "Pending For L3 Approval";
                }
                else if (projectSelectionSheet.Status == 7)
                {
                    projectSelectionSheet.StatusName = "Aproved";
                }
                else if (projectSelectionSheet.Status == 8)
                {
                    projectSelectionSheet.StatusName = "Rejected";
                }
                projectSelectionSheet.Level2 = dsData.Tables[0].Rows[i]["Level2"].ToString();
                projectSelectionSheet.Level3 = dsData.Tables[0].Rows[i]["Level3"].ToString();
                projectSelectionSheet.CreatedBy = dsData.Tables[0].Rows[i]["CreatedBy"].ToString();
                projectSelectionSheet.UpdatedBy = dsData.Tables[0].Rows[i]["UpdatedBy"].ToString();
                projectSelectionSheet.ActualGoal = dsData.Tables[0].Rows[i]["ActualGaol"].ToString();
                projectSelectionSheet.ActualProjectStartDate = dsData.Tables[0].Rows[i]["ActualProjectStartDate"].ToString();
                projectSelectionSheet.ActualProjectEndDate = dsData.Tables[0].Rows[i]["ActualProjectEndDate"].ToString();
                projectSelectionSheet.ActualExpectedCostSaving = dsData.Tables[0].Rows[i]["ActualExpeCostSaving"].ToString();
                projectSelectionSheet.Remarks = dsData.Tables[0].Rows[i]["Remarks"].ToString();
                projectSelectionSheet.GoalTo = Convert.ToInt32(dsData.Tables[0].Rows[i]["GoalTo"].ToString());
                projectSelectionSheet.GoalToUOM = dsData.Tables[0].Rows[i]["GoalToUOM"].ToString();
                projectSelectionSheet.GoalUOM = dsData.Tables[0].Rows[i]["GoalUOM"].ToString();
                projectSelectionSheetResponse.Add(projectSelectionSheet);
            }
            return projectSelectionSheetResponse;
        }
        /// <summary>
        /// Business Logic For FetchTeamDetailsByLevels
        /// </summary>
        /// <param name="Level"></param>
        /// <returns></returns>
        public TeamDetails FetchTeamDetailsByProjectSelectionLevel(string Level, int pageIndex, int pageSize)
        {
            var teamDetails = new TeamDetails();
            com = new SqlCommand("SaveOrUpdateAndGet_TeamDetails", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "ProjectSelectionLevel");
            com.Parameters.AddWithValue("@Company", string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            com.Parameters.AddWithValue("@Plant", string.Empty);
            com.Parameters.AddWithValue("@TeamName", string.Empty);
            com.Parameters.AddWithValue("@Status", string.Empty);
            com.Parameters.AddWithValue("@Level1", Level);
            com.Parameters.AddWithValue("@Level2", Level);
            com.Parameters.AddWithValue("@Level3", Level);
            com.Parameters.AddWithValue("@Remarks", string.Empty);
            com.Parameters.AddWithValue("@CreatedBy", string.Empty);
            com.Parameters.AddWithValue("@UpdatedBy", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var temaDetailsResponse = new List<TemaDetailsResponse>();
            while (dr.Read())
            {
                var teamdetails = new TemaDetailsResponse();
                teamdetails.Id = Convert.ToInt32(dr["Id"]);
                teamdetails.Company = dr["Company"].ToString();
                teamdetails.BusinessUnit = dr["BusinessUnit"].ToString();
                teamdetails.Plant = dr["Plant"].ToString();
                teamdetails.TeamName = dr["TeamName"].ToString();
                teamdetails.Status = dr["Status"].ToString();
                teamdetails.Company = dr["Company"].ToString();
                teamdetails.Level1 = dr["Level1"].ToString();
                teamdetails.Level2 = dr["Level2"].ToString();
                teamdetails.Level3 = dr["Level3"].ToString();
                if (teamdetails.Status == "1")
                {
                    teamdetails.StatusName = "Pending For L1 Approval";
                }
                else if (teamdetails.Status == "2")
                {
                    teamdetails.StatusName = "Pending For L2 Approval";
                }
                else if (teamdetails.Status == "3")
                {
                    teamdetails.StatusName = "Pending For Project Selection";
                }
                else if (teamdetails.Status == "4")
                {
                    teamdetails.StatusName = "Pending For L1 Approval";
                }
                else if (teamdetails.Status == "5")
                {
                    teamdetails.StatusName = "Pending For L2 Approval";
                }
                else if (teamdetails.Status == "6")
                {
                    teamdetails.StatusName = "Project Initation";
                }
                else if (teamdetails.Status == "7")
                {
                    teamdetails.StatusName = "Pending For L3 Approval";
                }
                else if (teamdetails.Status == "8")
                {
                    teamdetails.StatusName = "Aproved";
                }
                else if (teamdetails.Status == "9")
                {
                    teamdetails.StatusName = "Rejected";
                }
                teamdetails.Remarks = dr["Remarks"].ToString();

                teamdetails.PlLoginMailId = dr["PlLoginMailId"].ToString();
                teamdetails.L1MailId = dr["L1MailId"].ToString();
                teamdetails.L2MailId = dr["L2MailId"].ToString();
                teamdetails.L3MailId = dr["L3MailId"].ToString();
                teamdetails.TeamStrength = dr["TeamStrength"].ToString();
                temaDetailsResponse.Add(teamdetails);
            }

            dr.NextResult();

            while (dr.Read())
            {
                teamDetails.totalCount = dr["totalCount"].ToString();
            }
            teamDetails.temaDetailsResponse = temaDetailsResponse;
            return teamDetails;
        }
        public List<ProjectSelectionSheetResponse> FetchProjectsByProjectColuserLevel(int TeamId, string Level)
        {
            var projectSelectionSheetResponse = new List<ProjectSelectionSheetResponse>();
            com = new SqlCommand("SaveOrUpdateAndGet_ProjectDetails", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "ProjectClosure");
            com.Parameters.AddWithValue("@TeamId", TeamId);
            com.Parameters.AddWithValue("@Title", string.Empty);
            com.Parameters.AddWithValue("@Objective", string.Empty);
            com.Parameters.AddWithValue("@Goal", string.Empty);
            com.Parameters.AddWithValue("@ProjectStartDate", string.Empty);
            com.Parameters.AddWithValue("@ProjectEndDate", string.Empty);
            com.Parameters.AddWithValue("@ExpectedCostSaving", string.Empty);
            com.Parameters.AddWithValue("@Status", string.Empty);
            com.Parameters.AddWithValue("@Level1", Level);
            com.Parameters.AddWithValue("@Level2", Level);
            com.Parameters.AddWithValue("@Level3", Level);
            com.Parameters.AddWithValue("@CreatedBy", string.Empty);
            com.Parameters.AddWithValue("@UpdatedBy", string.Empty);
            com.Parameters.AddWithValue("@ActualGaol", string.Empty);
            com.Parameters.AddWithValue("@ActualProjectStartDate", string.Empty);
            com.Parameters.AddWithValue("@ActualProjectEndDate", string.Empty);
            com.Parameters.AddWithValue("@ActualExpeCostSaving", string.Empty);
            com.Parameters.AddWithValue("@Remarks", string.Empty);
            com.Parameters.AddWithValue("@GoalTo", string.Empty);
            com.Parameters.AddWithValue("@GoalUOM", string.Empty);
            com.Parameters.AddWithValue("@GoalToUOM", string.Empty);
            var sqlAd = new SqlDataAdapter(com);
            var dsData = new DataSet();
            sqlAd.Fill(dsData);
            for (int i = 0; i < dsData.Tables[0].Rows.Count; i++)
            {
                var projectSelectionSheet = new ProjectSelectionSheetResponse();
                projectSelectionSheet.ProjectId = Convert.ToInt32(dsData.Tables[0].Rows[i]["ProjectId"]);
                projectSelectionSheet.TeamId = Convert.ToInt32(dsData.Tables[0].Rows[i]["TeamId"]);
                projectSelectionSheet.Title = dsData.Tables[0].Rows[i]["Title"].ToString();
                projectSelectionSheet.Objective = dsData.Tables[0].Rows[i]["Objective"].ToString();
                projectSelectionSheet.Goal = Convert.ToInt32(dsData.Tables[0].Rows[i]["Goal"].ToString());
                projectSelectionSheet.ProjectStartDate = dsData.Tables[0].Rows[i]["ProjectStartDate"].ToString();
                projectSelectionSheet.ProjectEndDate = dsData.Tables[0].Rows[i]["ProjectEndDate"].ToString();
                projectSelectionSheet.ExpectedCostSaving = dsData.Tables[0].Rows[i]["ExpectedCostSaving"].ToString();
                projectSelectionSheet.Level1 = dsData.Tables[0].Rows[i]["Level1"].ToString();
                projectSelectionSheet.Status = Convert.ToInt32(dsData.Tables[0].Rows[i]["Status"]);
                if (projectSelectionSheet.Status == 1)
                {
                    projectSelectionSheet.StatusName = "Pending For L1 Approval";
                }
                else if (projectSelectionSheet.Status == 2)
                {
                    projectSelectionSheet.StatusName = "Pending For L2 Approval";
                }
                else if (projectSelectionSheet.Status == 3)
                {
                    projectSelectionSheet.StatusName = "Pending For L3 Approval";
                }
                else if (projectSelectionSheet.Status == 4)
                {
                    projectSelectionSheet.StatusName = "Project Initiation";
                }
                else if (projectSelectionSheet.Status == 5)
                {
                    projectSelectionSheet.StatusName = "Pending For L1 Approval";
                }
                else if (projectSelectionSheet.Status == 6)
                {
                    projectSelectionSheet.StatusName = "Pending For L2 Approval";
                }
                else if (projectSelectionSheet.Status == 7)
                {
                    projectSelectionSheet.StatusName = "Pending For L3 Approval";
                }
                else if (projectSelectionSheet.Status == 8)
                {
                    projectSelectionSheet.StatusName = "Aproved";
                }
                else if (projectSelectionSheet.Status == 9)
                {
                    projectSelectionSheet.StatusName = "Rejected";
                }
                projectSelectionSheet.Level2 = dsData.Tables[0].Rows[i]["Level2"].ToString();
                projectSelectionSheet.Level3 = dsData.Tables[0].Rows[i]["Level3"].ToString();
                projectSelectionSheet.CreatedBy = dsData.Tables[0].Rows[i]["CreatedBy"].ToString();
                projectSelectionSheet.UpdatedBy = dsData.Tables[0].Rows[i]["UpdatedBy"].ToString();
                projectSelectionSheet.ActualGoal = dsData.Tables[0].Rows[i]["ActualGaol"].ToString();
                projectSelectionSheet.ActualProjectStartDate = dsData.Tables[0].Rows[i]["ActualProjectStartDate"].ToString();
                projectSelectionSheet.ActualProjectEndDate = dsData.Tables[0].Rows[i]["ActualProjectEndDate"].ToString();
                projectSelectionSheet.ActualExpectedCostSaving = dsData.Tables[0].Rows[i]["ActualExpeCostSaving"].ToString();
                projectSelectionSheet.Remarks = dsData.Tables[0].Rows[i]["Remarks"].ToString();
                projectSelectionSheet.GoalTo = Convert.ToInt32(dsData.Tables[0].Rows[i]["GoalTo"].ToString());
                projectSelectionSheet.GoalToUOM = dsData.Tables[0].Rows[i]["GoalToUOM"].ToString();
                projectSelectionSheet.GoalUOM = dsData.Tables[0].Rows[i]["GoalUOM"].ToString();
                projectSelectionSheetResponse.Add(projectSelectionSheet);
            }
            return projectSelectionSheetResponse;
        }

        /// <summary>
        /// Sending Bulk Emails 
        /// </summary>
        /// <param name="emailBodyRequest"></param>
        public void Sendmail(EmailBodyRequest[] emailBodyRequest)
        {
            foreach (var item in emailBodyRequest)
            {
                sendmail.SendMail(item);
            }
        }


        public List<CircleType> FetchCircleType()
        {
            var circleType = new List<CircleType>();
            com = new SqlCommand("GetCircleType", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "CircleType");
            com.Parameters.AddWithValue("@EmpCode", string.Empty);
            com.Parameters.AddWithValue("@Company", string.Empty);
            com.Parameters.AddWithValue("@Plant", string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            com.Parameters.AddWithValue("@Department", string.Empty);
            com.Parameters.AddWithValue("@StartDate", string.Empty);
            com.Parameters.AddWithValue("@EndDate", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;
            var sqlAd = new SqlDataAdapter(com);
            var dsData = new DataSet();
            sqlAd.Fill(dsData);
            for (int i = 0; i < dsData.Tables[0].Rows.Count; i++)
            {
                var circle = new CircleType();
                circle.Id = Convert.ToInt32(dsData.Tables[0].Rows[i]["Id"]);
                circle.circleType = dsData.Tables[0].Rows[i]["CircleType"].ToString();
                circleType.Add(circle);
            }
            return circleType;
        }
        public CircleResponse TeamMemberExistOrNot(string empCode)
        {
            var circleType = new CircleResponse();
            com = new SqlCommand("GetCircleType", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "TeamMemberExistOrNot");
            com.Parameters.AddWithValue("@EmpCode", empCode);
            com.Parameters.AddWithValue("@Company", string.Empty);
            com.Parameters.AddWithValue("@Plant", string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            com.Parameters.AddWithValue("@Department", string.Empty);
            com.Parameters.AddWithValue("@StartDate", string.Empty);
            com.Parameters.AddWithValue("@EndDate", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;
            var sqlAd = new SqlDataAdapter(com);
            var dsData = new DataSet();
            sqlAd.Fill(dsData);
            for (int i = 0; i < dsData.Tables[0].Rows.Count; i++)
            {

                circleType.Id = Convert.ToInt32(dsData.Tables[0].Rows[i]["CircleId"]);
                circleType.CircleName = dsData.Tables[0].Rows[i]["CircleName"].ToString();
                circleType.EmpName = dsData.Tables[0].Rows[i]["Name"].ToString();
                circleType.EmpCode = dsData.Tables[0].Rows[i]["EmpCode"].ToString();
                circleType.Department = dsData.Tables[0].Rows[i]["Department"].ToString();
                circleType.Grade = dsData.Tables[0].Rows[i]["Grade"].ToString();
                circleType.BusinessUnit = dsData.Tables[0].Rows[i]["BusinessUnit"].ToString();
                circleType.Image = dsData.Tables[0].Rows[i]["Image"].ToString();

            }
            return circleType;
        }
        public BusinessGoalsAutofetch BusinessGoalsAutoFetch(string empCode)
        {
            var businessGoalsAutofetch = new BusinessGoalsAutofetch();
            com = new SqlCommand("GetCircleType", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "BusinessGoalsAutoFetch");
            com.Parameters.AddWithValue("@EmpCode", empCode);
            com.Parameters.AddWithValue("@Company", string.Empty);
            com.Parameters.AddWithValue("@Plant", string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            com.Parameters.AddWithValue("@Department", string.Empty);
            com.Parameters.AddWithValue("@StartDate", string.Empty);
            com.Parameters.AddWithValue("@EndDate", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            while (dr.Read())
            {
                businessGoalsAutofetch.BusinessUnit = dr["BusinessUnit"].ToString();
                businessGoalsAutofetch.Plant = dr["Plant"].ToString();
            }

            dr.NextResult();
            while (dr.Read())
            {
                businessGoalsAutofetch.EligibleHeadCount = Convert.ToInt32(dr["EligibleHeadCount"].ToString());
                businessGoalsAutofetch.NoofQcTarget = Convert.ToInt32(dr["NoofQcTarget"].ToString());

            }
            dr.NextResult();
            while (dr.Read())
            {
                businessGoalsAutofetch.NoofOldCircles = Convert.ToInt32(dr["NoofOldCircles"].ToString());

            }
            dr.NextResult();
            while (dr.Read())
            {
                businessGoalsAutofetch.NoofNewCircles = Convert.ToInt32(dr["NoofNewCircles"].ToString());

            }
            
            dr.NextResult();
            while (dr.Read())
            {
               
              
                businessGoalsAutofetch.NoofCirclesYTD = Convert.ToInt32(dr["NoofCirclesYTD"].ToString())    ;
                businessGoalsAutofetch.TEIYTD = Convert.ToInt32(dr["TEIYTD"].ToString());
                businessGoalsAutofetch.NoofProjectsYTD = Convert.ToInt32(dr["NoofProjectsYTD"].ToString());

            }

            return businessGoalsAutofetch;
        }
        public List<ReportsResponse> ReportsFetch(ReportsRequest reportsRequest)
        {
            string t1 = System.DateTime.Now.ToString();
            string t2 = System.DateTime.Now.AddDays(365).ToString();
            DateTime date1= DateTime.Parse(t1);
            if (!string.IsNullOrEmpty(reportsRequest.StartDate))
            {
               date1 = DateTime.ParseExact(reportsRequest.StartDate, @"d-M-yyyy",
              System.Globalization.CultureInfo.InvariantCulture);
               
            }
            DateTime date2=DateTime.Parse(t2);
            if (!string.IsNullOrEmpty(reportsRequest.EndDate))
            {
                date2 = DateTime.ParseExact(reportsRequest.EndDate, @"d-M-yyyy", System.Globalization.CultureInfo.InvariantCulture);
            }
            
           
            var reportsResponse = new List<ReportsResponse>();
            com = new SqlCommand("GetCircleType", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "Reports");
            com.Parameters.AddWithValue("@EmpCode", string.Empty);
            com.Parameters.AddWithValue("@Company", reportsRequest.Company != null ? reportsRequest.Company : string.Empty);
            com.Parameters.AddWithValue("@Plant", reportsRequest.Plant != null ? reportsRequest.Plant : string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", reportsRequest.BusinessUnit != null ? reportsRequest.BusinessUnit : string.Empty);
            com.Parameters.AddWithValue("@Department", reportsRequest.Department != null ? reportsRequest.Department : string.Empty);
            com.Parameters.AddWithValue("@StartDate", date1);
            com.Parameters.AddWithValue("@EndDate", date2);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;
            var sqlAd = new SqlDataAdapter(com);
            var dsData = new DataSet();
            sqlAd.Fill(dsData);
            for (int i = 0; i < dsData.Tables[0].Rows.Count; i++)
            {
                var reports = new ReportsResponse();
                reports.Id = Convert.ToInt32(dsData.Tables[0].Rows[i]["Id"]);
                reports.Company = dsData.Tables[0].Rows[i]["Company"].ToString();
                reports.BusinessUnit = dsData.Tables[0].Rows[i]["BusinessUnit"].ToString();
                reports.Plant = dsData.Tables[0].Rows[i]["Plant"].ToString();
                reports.CostSaving = dsData.Tables[0].Rows[i]["ActualExpeCostSaving"].ToString();
                reports.QCName = dsData.Tables[0].Rows[i]["TeamName"].ToString();
                reports.Department = dsData.Tables[0].Rows[i]["Department"].ToString();
                reports.ProjectTitle = dsData.Tables[0].Rows[i]["ProjectTitle"].ToString();
                reports.FacilitatorName = dsData.Tables[0].Rows[i]["FacilitatorName"].ToString();
                reports.TeamCount = dsData.Tables[0].Rows[i]["TeamCount"].ToString();
                reports.NoOfProjects = dsData.Tables[0].Rows[i]["ProjectCount"].ToString();
                reports.TeamStatus = dsData.Tables[0].Rows[i]["TeamStatus"].ToString();
                if (reports.TeamStatus == "1")
                {
                    reports.StatusName = "Pending For L1 Approval";
                }
                else if (reports.TeamStatus == "2")
                {
                    reports.StatusName = "Pending For L2 Approval";
                }
                else if (reports.TeamStatus == "3")
                {
                    reports.StatusName = "Pending For Project Selection";
                }
                else if (reports.TeamStatus == "4")
                {
                    reports.StatusName = "Project Initiation";
                }
                else if (reports.TeamStatus == "5")
                {
                    reports.StatusName = "Pending For L1 Approval";
                }
                else if (reports.TeamStatus == "6")
                {
                    reports.StatusName = "Pending For L2 Approval";
                }
                else if (reports.TeamStatus == "7")
                {
                    reports.StatusName = "Pending For L3 Approval";
                }
                else if (reports.TeamStatus == "8")
                {
                    reports.StatusName = "Aproved";
                }
                else if (reports.TeamStatus == "9")
                {
                    reports.StatusName = "Rejected";
                }
                reportsResponse.Add(reports);
            }
            return reportsResponse;
        }
        public List<ReportsResponse> ReportsFetchList(ReportsRequest reportsRequest)
        {
            string t1 = System.DateTime.Now.ToString();
            string t2 = System.DateTime.Now.AddDays(365).ToString();
            DateTime date1 = DateTime.Parse(t1);
            if (!string.IsNullOrEmpty(reportsRequest.StartDate))
            {
                date1 = DateTime.ParseExact(reportsRequest.StartDate, @"d-M-yyyy",
               System.Globalization.CultureInfo.InvariantCulture);

            }
            DateTime date2 = DateTime.Parse(t2);
            if (!string.IsNullOrEmpty(reportsRequest.EndDate))
            {
                date2 = DateTime.ParseExact(reportsRequest.EndDate, @"d-M-yyyy", System.Globalization.CultureInfo.InvariantCulture);
            }


            var reportsResponse = new List<ReportsResponse>();
            com = new SqlCommand("GetCircleType", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "ReportsList");
            com.Parameters.AddWithValue("@EmpCode", string.Empty);
            com.Parameters.AddWithValue("@Company", reportsRequest.Company != null ? reportsRequest.Company : string.Empty);
            com.Parameters.AddWithValue("@Plant", reportsRequest.Plant != null ? reportsRequest.Plant : string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", reportsRequest.BusinessUnit != null ? reportsRequest.BusinessUnit : string.Empty);
            com.Parameters.AddWithValue("@Department", reportsRequest.Department != null ? reportsRequest.Department : string.Empty);
            com.Parameters.AddWithValue("@StartDate", date1);
            com.Parameters.AddWithValue("@EndDate", date2);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;
            var sqlAd = new SqlDataAdapter(com);
            var dsData = new DataSet();
            sqlAd.Fill(dsData);
            for (int i = 0; i < dsData.Tables[0].Rows.Count; i++)
            {
                var reports = new ReportsResponse();
                reports.Id = Convert.ToInt32(dsData.Tables[0].Rows[i]["Id"]);
                reports.Company = dsData.Tables[0].Rows[i]["Company"].ToString();
                reports.BusinessUnit = dsData.Tables[0].Rows[i]["BusinessUnit"].ToString();
                reports.Plant = dsData.Tables[0].Rows[i]["Plant"].ToString();
                reports.CostSaving = dsData.Tables[0].Rows[i]["ActualExpeCostSaving"].ToString();
                reports.QCName = dsData.Tables[0].Rows[i]["TeamName"].ToString();
                reports.Department = dsData.Tables[0].Rows[i]["Department"].ToString();
                reports.ProjectTitle = dsData.Tables[0].Rows[i]["ProjectTitle"].ToString();
                reports.FacilitatorName = dsData.Tables[0].Rows[i]["FacilitatorName"].ToString();
                reports.TeamCount = dsData.Tables[0].Rows[i]["TeamCount"].ToString();
                reports.NoOfProjects = dsData.Tables[0].Rows[i]["ProjectCount"].ToString();
                reports.TeamStatus = dsData.Tables[0].Rows[i]["TeamStatus"].ToString();
                if (reports.TeamStatus == "1")
                {
                    reports.StatusName = "Pending For L1 Approval";
                }
                else if (reports.TeamStatus == "2")
                {
                    reports.StatusName = "Pending For L2 Approval";
                }
                else if (reports.TeamStatus == "3")
                {
                    reports.StatusName = "Pending For Project Selection";
                }
                else if (reports.TeamStatus == "4")
                {
                    reports.StatusName = "Project Initiation";
                }
                else if (reports.TeamStatus == "5")
                {
                    reports.StatusName = "Pending For L1 Approval";
                }
                else if (reports.TeamStatus == "6")
                {
                    reports.StatusName = "Pending For L2 Approval";
                }
                else if (reports.TeamStatus == "7")
                {
                    reports.StatusName = "Pending For L3 Approval";
                }
                else if (reports.TeamStatus == "8")
                {
                    reports.StatusName = "Aproved";
                }
                else if (reports.TeamStatus == "9")
                {
                    reports.StatusName = "Rejected";
                }
                reportsResponse.Add(reports);
            }
            return reportsResponse;
        }

        public ReportsDropdownsResponse ReportsDroppDownResponse()
        {
            var company = new List<dynamic>();
            var plant = new List<dynamic>();
            var department = new List<dynamic>();
            var businessunit = new List<dynamic>();
            var reportsDropdownsResponse = new ReportsDropdownsResponse();

            com = new SqlCommand("GetUsers", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "ReportsDropDownFetch");
            com.Parameters.Add(new SqlParameter("@EmpCode", string.Empty));
            com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            com.Parameters.AddWithValue("@RoleId", 0);
            com.Parameters.AddWithValue("@Plant", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            while (dr.Read())
            {
                company.Add(dr["Company"].ToString());
            }

            dr.NextResult();
            while (dr.Read())
            {
                plant.Add(dr["Plant"].ToString());
            }
            dr.NextResult();
            while (dr.Read())
            {
                department.Add(dr["Department"].ToString());
            }
            dr.NextResult();
            while (dr.Read())
            {
                businessunit.Add(dr["BusinessUnit"].ToString());
            }
            reportsDropdownsResponse.Company = company;
            reportsDropdownsResponse.Plant = plant;
            reportsDropdownsResponse.Department = department;
            reportsDropdownsResponse.BusinessUnit = businessunit;
            con.Close();
            return reportsDropdownsResponse;
        }

        public string SaveInternalConventions(InternalConventionRequest[] internalConventionRequests)
        {
            DataTable dt = new DataTable();
            dt.Columns.AddRange(new DataColumn[14] { new DataColumn("Id"), new DataColumn("Company"), new DataColumn("BusinessUnit"),
                new DataColumn("Plant"), new DataColumn("Department"), new DataColumn("QCName"),
                new DataColumn("ProjectTitle"), new DataColumn("FacilitatorName"), new DataColumn("TeamCount"),new DataColumn("NoOfProjects"),
            new DataColumn("CostSaving"),new DataColumn("TeamStatus"),new DataColumn("Awards"),new DataColumn("Score")});
            foreach (var item in internalConventionRequests)
            {
                dt.Rows.Add(item.Id, item.Company, item.BusinessUnit, item.Plant, item.Department, item.QCName, item.ProjectTitle, item.FacilitatorName, item.TeamCount, item.NoOfProjects, item.CostSaving, item.TeamStatus, item.Awards, item.Score);
            }
            com = new SqlCommand("SaveOrUpdateInternalConvention", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@tblConvention", dt);
            con.Open();
            com.ExecuteNonQuery();
            string numRes = com.ExecuteNonQuery().ToString();
            con.Close();
            return numRes;
        }
        public string SaveChapterConventions(ChapterConventionRequest[] chapterConventionRequests)
        {
            DataTable dt = new DataTable();
            dt.Columns.AddRange(new DataColumn[14] { new DataColumn("Id"), new DataColumn("Company"), new DataColumn("BusinessUnit"),
                new DataColumn("Plant"), new DataColumn("Department"), new DataColumn("QCName"),
                new DataColumn("ProjectTitle"), new DataColumn("FacilitatorName"), new DataColumn("TeamCount"),new DataColumn("NoOfProjects"),
            new DataColumn("CostSaving"),new DataColumn("TeamStatus"),new DataColumn("Awards"),new DataColumn("Score")});
            foreach (var item in chapterConventionRequests)
            {
                dt.Rows.Add(item.Id, item.Company, item.BusinessUnit, item.Plant, item.Department, item.QCName, item.ProjectTitle, item.FacilitatorName, item.TeamCount, item.NoOfProjects, item.CostSaving, item.TeamStatus, item.Awards, item.Score);
            }
            com = new SqlCommand("SaveOrUpdateChapterConvention", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@tblConvention", dt);
            con.Open();
            com.ExecuteNonQuery();
            string numRes = com.ExecuteNonQuery().ToString();
            con.Close();
            return numRes;
        }
        public string SaveNationalConventions(NationalConventionRequest[] nationalConventionRequests)
        {
            DataTable dt = new DataTable();
            dt.Columns.AddRange(new DataColumn[14] { new DataColumn("Id"), new DataColumn("Company"), new DataColumn("BusinessUnit"),
                new DataColumn("Plant"), new DataColumn("Department"), new DataColumn("QCName"),
                new DataColumn("ProjectTitle"), new DataColumn("FacilitatorName"), new DataColumn("TeamCount"),new DataColumn("NoOfProjects"),
            new DataColumn("TeamStatus"),new DataColumn("CostSaving"),new DataColumn("Awards"),new DataColumn("Score")});
            foreach (var item in nationalConventionRequests)
            {
                dt.Rows.Add(item.Id, item.Company, item.BusinessUnit, item.Plant, item.Department, item.QCName, item.ProjectTitle, item.FacilitatorName, item.TeamCount, item.NoOfProjects, item.TeamStatus, item.CostSaving, item.Awards, item.Score);
            }
            com = new SqlCommand("SaveOrUpdateNationalConvention", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@tblConvention", dt);
            con.Open();
            com.ExecuteNonQuery();
            string numRes = com.ExecuteNonQuery().ToString();
            con.Close();
            return numRes;
        }
        public string SaveInterNationalConventions(InterNationalConvetionsRequest[] interNationalConvetionsRequests)
        {
            DataTable dt = new DataTable();
            dt.Columns.AddRange(new DataColumn[14] { new DataColumn("Id"), new DataColumn("Company"), new DataColumn("BusinessUnit"),
                new DataColumn("Plant"), new DataColumn("Department"), new DataColumn("QCName"),
                new DataColumn("ProjectTitle"), new DataColumn("FacilitatorName"), new DataColumn("TeamCount"),new DataColumn("NoOfProjects"),
            new DataColumn("CostSaving"),new DataColumn("TeamStatus"),new DataColumn("Awards"),new DataColumn("Score")});
            foreach (var item in interNationalConvetionsRequests)
            {
                dt.Rows.Add(item.Id, item.Company, item.BusinessUnit, item.Plant, item.Department, item.QCName, item.ProjectTitle, item.FacilitatorName, item.TeamCount, item.NoOfProjects, item.CostSaving, item.TeamStatus, item.Awards, item.Score);
            }
            com = new SqlCommand("SaveOrUpdateInterNationalConvetions", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@tblConvention", dt);
            con.Open();
            com.ExecuteNonQuery();
            string numRes = com.ExecuteNonQuery().ToString();
            con.Close();
            return numRes;
        }

        public InternalConventionResponse GetInternalConventions(int pageIndex, int pageSize)
        {
            var internalConventionResponse = new InternalConventionResponse();
            com = new SqlCommand("GetConventions", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "InternalConventions");
            com.Parameters.AddWithValue("@strIds", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var chapterConventionResponse = new List<InternalConventionsResponse>();
            while (dr.Read())
            {
                var Chapter = new InternalConventionsResponse();
                Chapter.Id = Convert.ToInt32(dr["Id"]);
                Chapter.Company = dr["Company"].ToString();
                Chapter.BusinessUnit = dr["BusinessUnit"].ToString();
                Chapter.Plant = dr["Plant"].ToString();
                Chapter.Department = dr["Department"].ToString();
                Chapter.QCName = dr["QCName"].ToString();
                Chapter.ProjectTitle = dr["ProjectTitle"].ToString();
                Chapter.FacilitatorName = dr["FacilitatorName"].ToString();
                Chapter.TeamCount = dr["TeamCount"].ToString();
                Chapter.NoOfProjects = dr["NoOfProjects"].ToString();
                Chapter.CostSaving = dr["CostSaving"].ToString();
                Chapter.TeamStatus = dr["TeamStatus"].ToString();
                if (Chapter.TeamStatus == "1")
                {
                    Chapter.StatusName = "Pending For L1 Approval";
                }
                else if (Chapter.TeamStatus == "2")
                {
                    Chapter.StatusName = "Pending For L2 Approval";
                }
                else if (Chapter.TeamStatus == "3")
                {
                    Chapter.StatusName = "Pending For Project Selection";
                }
                else if (Chapter.TeamStatus == "4")
                {
                    Chapter.StatusName = "Project Initiation";
                }
                else if (Chapter.TeamStatus == "5")
                {
                    Chapter.StatusName = "Pending For L1 Approval";
                }
                else if (Chapter.TeamStatus == "6")
                {
                    Chapter.StatusName = "Pending For L2 Approval";
                }
                else if (Chapter.TeamStatus == "7")
                {
                    Chapter.StatusName = "Pending For L3 Approval";
                }
                else if (Chapter.TeamStatus == "8")
                {
                    Chapter.StatusName = "Aproved";
                }
                else if (Chapter.TeamStatus == "9")
                {
                    Chapter.StatusName = "Rejected";
                }
                Chapter.Awards = dr["Awards"].ToString();
                Chapter.Score = dr["Score"].ToString();
                chapterConventionResponse.Add(Chapter);
            }
            dr.NextResult();

            while (dr.Read())
            {
                internalConventionResponse.totalCount = dr["totalCount"].ToString();
            }
            internalConventionResponse.internalConventionsResponses = chapterConventionResponse;
            return internalConventionResponse;
        }

        public ConventionChapterResponse GetChapterConventions(int pageIndex, int pageSize)
        {
            var conventionChapterResponse = new ConventionChapterResponse();

            com = new SqlCommand("GetConventions", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "ChapterConventions");
            com.Parameters.AddWithValue("@strIds", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var chapterConventionResponse = new List<ChapterConventionResponse>();
            while (dr.Read())
            {
                var Chapter = new ChapterConventionResponse();
                Chapter.Id = Convert.ToInt32(dr["Id"]);
                Chapter.Company = dr["Company"].ToString();
                Chapter.BusinessUnit = dr["BusinessUnit"].ToString();
                Chapter.Plant = dr["Plant"].ToString();
                Chapter.Department = dr["Department"].ToString();
                Chapter.QCName = dr["QCName"].ToString();
                Chapter.ProjectTitle = dr["ProjectTitle"].ToString();
                Chapter.FacilitatorName = dr["FacilitatorName"].ToString();
                Chapter.TeamCount = dr["TeamCount"].ToString();
                Chapter.NoOfProjects = dr["NoOfProjects"].ToString();
                Chapter.CostSaving = dr["CostSaving"].ToString();
                Chapter.TeamStatus = dr["TeamStatus"].ToString();
                if (Chapter.TeamStatus == "1")
                {
                    Chapter.StatusName = "Pending For L1 Approval";
                }
                else if (Chapter.TeamStatus == "2")
                {
                    Chapter.StatusName = "Pending For L2 Approval";
                }
                else if (Chapter.TeamStatus == "3")
                {
                    Chapter.StatusName = "Pending For Project Selection";
                }
                else if (Chapter.TeamStatus == "4")
                {
                    Chapter.StatusName = "Project Initiation";
                }
                else if (Chapter.TeamStatus == "5")
                {
                    Chapter.StatusName = "Pending For L1 Approval";
                }
                else if (Chapter.TeamStatus == "6")
                {
                    Chapter.StatusName = "Pending For L2 Approval";
                }
                else if (Chapter.TeamStatus == "7")
                {
                    Chapter.StatusName = "Pending For L3 Approval";
                }
                else if (Chapter.TeamStatus == "8")
                {
                    Chapter.StatusName = "Aproved";
                }
                else if (Chapter.TeamStatus == "9")
                {
                    Chapter.StatusName = "Rejected";
                }
                Chapter.Awards = dr["Awards"].ToString();
                Chapter.Score = dr["Score"].ToString();
                chapterConventionResponse.Add(Chapter);
            }

            dr.NextResult();

            while (dr.Read())
            {
                conventionChapterResponse.totalCount = dr["totalCount"].ToString();
            }
            conventionChapterResponse.chapterConventionResponse = chapterConventionResponse;
            return conventionChapterResponse;
        }
        public ConventionNationalResponse GetNationalConventions(int pageIndex, int pageSize)
        {
            var conventionNationalResponse = new ConventionNationalResponse();

            com = new SqlCommand("GetConventions", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "NationalConventions");
            com.Parameters.AddWithValue("@strIds", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var nationalConventionResponse = new List<NationalConventionResponse>();
            while (dr.Read())
            {
                var National = new NationalConventionResponse();
                National.Id = Convert.ToInt32(dr["Id"]);
                National.Company = dr["Company"].ToString();
                National.BusinessUnit = dr["BusinessUnit"].ToString();
                National.Plant = dr["Plant"].ToString();
                National.Department = dr["Department"].ToString();
                National.QCName = dr["QCName"].ToString();
                National.ProjectTitle = dr["ProjectTitle"].ToString();
                National.FacilitatorName = dr["FacilitatorName"].ToString();
                National.TeamCount = dr["TeamCount"].ToString();
                National.NoOfProjects = dr["NoOfProjects"].ToString();
                National.CostSaving = dr["CostSaving"].ToString();
                National.Awards = dr["Awards"].ToString();
                National.TeamStatus = dr["TeamStatus"].ToString();
                if (National.TeamStatus == "1")
                {
                    National.StatusName = "Pending For L1 Approval";
                }
                else if (National.TeamStatus == "2")
                {
                    National.StatusName = "Pending For L2 Approval";
                }
                else if (National.TeamStatus == "3")
                {
                    National.StatusName = "Pending For Project Selection";
                }
                else if (National.TeamStatus == "4")
                {
                    National.StatusName = "Project Initiation";
                }
                else if (National.TeamStatus == "5")
                {
                    National.StatusName = "Pending For L1 Approval";
                }
                else if (National.TeamStatus == "6")
                {
                    National.StatusName = "Pending For L2 Approval";
                }
                else if (National.TeamStatus == "7")
                {
                    National.StatusName = "Pending For L3 Approval";
                }
                else if (National.TeamStatus == "8")
                {
                    National.StatusName = "Aproved";
                }
                else if (National.TeamStatus == "9")
                {
                    National.StatusName = "Rejected";
                }
                National.Score = dr["Score"].ToString();
                nationalConventionResponse.Add(National);
            }

            dr.NextResult();

            while (dr.Read())
            {
                conventionNationalResponse.totalCount = dr["totalCount"].ToString();
            }
            conventionNationalResponse.nationalConventionResponses = nationalConventionResponse;
            return conventionNationalResponse;
        }
        public ConventionInternationalResponse GetInterNationalConventions(int pageIndex, int pageSize)
        {
            var conventionInternationalResponse = new ConventionInternationalResponse();
            com = new SqlCommand("GetConventions", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "InterNationalConvetions");
            com.Parameters.AddWithValue("@strIds", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var interNationalConvetionsResponse = new List<InterNationalConvetionsResponse>();
            while (dr.Read())
            {
                var InterNational = new InterNationalConvetionsResponse();
                InterNational.Id = Convert.ToInt32(dr["Id"]);
                InterNational.Company = dr["Company"].ToString();
                InterNational.BusinessUnit = dr["BusinessUnit"].ToString();
                InterNational.Plant = dr["Plant"].ToString();
                InterNational.Department = dr["Department"].ToString();
                InterNational.QCName = dr["QCName"].ToString();
                InterNational.ProjectTitle = dr["ProjectTitle"].ToString();
                InterNational.FacilitatorName = dr["FacilitatorName"].ToString();
                InterNational.TeamCount = dr["TeamCount"].ToString();
                InterNational.NoOfProjects = dr["NoOfProjects"].ToString();
                InterNational.CostSaving = dr["CostSaving"].ToString();
                InterNational.TeamStatus = dr["TeamStatus"].ToString();
                if (InterNational.TeamStatus == "1")
                {
                    InterNational.StatusName = "Pending For L1 Approval";
                }
                else if (InterNational.TeamStatus == "2")
                {
                    InterNational.StatusName = "Pending For L2 Approval";
                }
                else if (InterNational.TeamStatus == "3")
                {
                    InterNational.StatusName = "Pending For Project Selection";
                }
                else if (InterNational.TeamStatus == "4")
                {
                    InterNational.StatusName = "Project Initiation";
                }
                else if (InterNational.TeamStatus == "5")
                {
                    InterNational.StatusName = "Pending For L1 Approval";
                }
                else if (InterNational.TeamStatus == "6")
                {
                    InterNational.StatusName = "Pending For L2 Approval";
                }
                else if (InterNational.TeamStatus == "7")
                {
                    InterNational.StatusName = "Pending For L3 Approval";
                }
                else if (InterNational.TeamStatus == "8")
                {
                    InterNational.StatusName = "Aproved";
                }
                else if (InterNational.TeamStatus == "9")
                {
                    InterNational.StatusName = "Rejected";
                }
                InterNational.Awards = dr["Awards"].ToString();
                interNationalConvetionsResponse.Add(InterNational);
            }

            dr.NextResult();

            while (dr.Read())
            {
                conventionInternationalResponse.totalCount = dr["totalCount"].ToString();
            }
            conventionInternationalResponse.interNationalConvetionsResponses = interNationalConvetionsResponse;
            return conventionInternationalResponse;
        }

        public int DeleteChapterConventions(string strIds)
        {
            com = new SqlCommand("GetConventions", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "DeleteChapterConventions");
            com.Parameters.AddWithValue("@strIds", strIds);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;
            con.Open();
            com.ExecuteNonQuery();
            int numRes = com.ExecuteNonQuery();
            con.Close();
            return numRes;

        }
        public int DeleteNationalConventions(string strIds)
        {
            com = new SqlCommand("GetConventions", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "DeleteNationalConventions");
            com.Parameters.AddWithValue("@strIds", strIds);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;
            con.Open();
            com.ExecuteNonQuery();
            int numRes = com.ExecuteNonQuery();
            con.Close();
            return numRes;

        }
        public int DeleteInterNationalConvetions(string strIds)
        {
            com = new SqlCommand("DeleteInternationalConventions", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@strIds", strIds);
            con.Open();
            com.ExecuteNonQuery();
            int numRes = com.ExecuteNonQuery();
            con.Close();
            return numRes;

        }
        public ConventionOveralResponse OverallConventionsFetch(int pageIndex, int pageSize)
        {
            var conventionOveralResponse = new ConventionOveralResponse();
            com = new SqlCommand("GetCircleType", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "Conventions");
            com.Parameters.AddWithValue("@EmpCode", string.Empty);
            com.Parameters.AddWithValue("@Company", string.Empty);
            com.Parameters.AddWithValue("@Plant", string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            com.Parameters.AddWithValue("@Department", string.Empty);
            com.Parameters.AddWithValue("@StartDate", string.Empty);
            com.Parameters.AddWithValue("@EndDate", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var reportsResponse = new List<ReportsResponse>();
            while (dr.Read())
            {
                var reports = new ReportsResponse();
                reports.Id = Convert.ToInt32(dr["Id"]);
                reports.Company = dr["Company"].ToString();
                reports.BusinessUnit = dr["BusinessUnit"].ToString();
                reports.Plant = dr["Plant"].ToString();
                reports.Department = dr["Department"].ToString();
                reports.QCName = dr["QCName"].ToString();
                reports.ProjectTitle = dr["ProjectTitle"].ToString();
                reports.FacilitatorName = dr["FacilitatorName"].ToString();
                reports.TeamCount = dr["TeamCount"].ToString();
                reports.NoOfProjects = dr["NoOfProjects"].ToString();
                reports.CostSaving = dr["CostSaving"].ToString();
                reports.TeamStatus = dr["TeamStatus"].ToString();
                if (reports.TeamStatus == "1")
                {
                    reports.StatusName = "Pending For L1 Approval";
                }
                else if (reports.TeamStatus == "2")
                {
                    reports.StatusName = "Pending For L2 Approval";
                }
                else if (reports.TeamStatus == "3")
                {
                    reports.StatusName = "Pending For Project Selection";
                }
                else if (reports.TeamStatus == "4")
                {
                    reports.StatusName = "Project Initiation";
                }
                else if (reports.TeamStatus == "5")
                {
                    reports.StatusName = "Pending For L1 Approval";
                }
                else if (reports.TeamStatus == "6")
                {
                    reports.StatusName = "Pending For L2 Approval";
                }
                else if (reports.TeamStatus == "7")
                {
                    reports.StatusName = "Pending For L3 Approval";
                }
                else if (reports.TeamStatus == "8")
                {
                    reports.StatusName = "Aproved";
                }
                else if (reports.TeamStatus == "9")
                {
                    reports.StatusName = "Rejected";
                }
                reports.Awards = dr["Awards"].ToString();
                reportsResponse.Add(reports);
            }

            dr.NextResult();

            while (dr.Read())
            {
                conventionOveralResponse.totalCount = dr["totalCount"].ToString();
            }
            conventionOveralResponse.reportsResponses = reportsResponse;
            return conventionOveralResponse;
        }


        public List<AwardsResponse> InternalConventionsAwardResponse()
        {
            var awardsResponse = new List<AwardsResponse>();
            com = new SqlCommand("GetConventions", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "AwardsInternal");
            com.Parameters.AddWithValue("@strIds", 0);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            while (dr.Read())
            {
                var awards = new AwardsResponse();
                awards.Id = Convert.ToInt32(dr["Id"]);
                awards.Name = dr["Name"].ToString();
                awardsResponse.Add(awards);
            }
            con.Close();
            return awardsResponse;
        }

        public List<AwardsResponse> ChapterConventionsAwardResponse()
        {
            var awardsResponse = new List<AwardsResponse>();
            com = new SqlCommand("GetConventions", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "AwardsChapter");
            com.Parameters.AddWithValue("@strIds", 0);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            while (dr.Read())
            {
                var awards = new AwardsResponse();
                awards.Id = Convert.ToInt32(dr["Id"]);
                awards.Name = dr["Name"].ToString();
                awardsResponse.Add(awards);
            }
            con.Close();
            return awardsResponse;
        }

        public List<AwardsResponse> NationalConventionsAwardResponse()
        {
            var awardsResponse = new List<AwardsResponse>();
            com = new SqlCommand("GetConventions", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "AwardsNational");
            com.Parameters.AddWithValue("@strIds", 0);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            while (dr.Read())
            {
                var awards = new AwardsResponse();
                awards.Id = Convert.ToInt32(dr["Id"]);
                awards.Name = dr["Name"].ToString();
                awardsResponse.Add(awards);
            }
            con.Close();
            return awardsResponse;
        }

        public List<AwardsResponse> InternationalConventionsAwardResponse()
        {
            var awardsResponse = new List<AwardsResponse>();
            com = new SqlCommand("GetConventions", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "AwardsInternational");
            com.Parameters.AddWithValue("@strIds", 0);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = 0;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = 0;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            while (dr.Read())
            {
                var awards = new AwardsResponse();
                awards.Id = Convert.ToInt32(dr["Id"]);
                awards.Name = dr["Name"].ToString();
                awardsResponse.Add(awards);
            }
            con.Close();
            return awardsResponse;
        }

        public List<CircleRegisterRequest> GetCircleRegistrationDetailsByCircle(string CircleName)
        {
            var teamRegistrationResponse = new List<CircleRegisterRequest>();
            com = new SqlCommand("SaveOrUpdateCircleAndGet", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "CircleDetailsByCircleName");
            com.Parameters.AddWithValue("@CircleName", CircleName);
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            while (dr.Read())
            {
                byte[] imgData1 = (byte[])dr["Image"];
                var teamRegistration = new CircleRegisterRequest();
                teamRegistration.CircleId = Convert.ToInt32(dr["CircleId"]);
                teamRegistration.CircleName = dr["CircleName"].ToString();
                teamRegistration.EmpName = dr["Name"].ToString();
                teamRegistration.EmpCode = Convert.ToInt32(dr["EmpCode"].ToString());
                teamRegistration.Department = dr["Department"].ToString();
                teamRegistration.Grade = dr["Grade"].ToString();
                teamRegistration.BusinessUnit = dr["BusinessUnit"].ToString();
                teamRegistration.Image = Encoding.UTF8.GetString(imgData1, 0, imgData1.Length);
                teamRegistration.CircleType = Convert.ToInt32(dr["CircleType"]);
                teamRegistration.CreatedBy = dr["CreatedBy"].ToString();
                teamRegistration.UpdatedBy = dr["UpdatedBy"].ToString();
                teamRegistrationResponse.Add(teamRegistration);
            }
            con.Close();
            return teamRegistrationResponse;
        }

        public int DeleteInternalConventions(string strIds)
        {
            com = new SqlCommand("DeleteInternalConventions", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@strIds", strIds);
            con.Open();
            com.ExecuteNonQuery();
            int numRes = com.ExecuteNonQuery();
            con.Close();
            return numRes;
        }

        public NotificationAlertResponse NotificationAlert(string empCode)
        {
            var notificationAlertResponse = new NotificationAlertResponse();
            com = new SqlCommand("NotificationAlerts", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "Level123AndPLant");
            com.Parameters.Add(new SqlParameter("@empCode", empCode));
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            int Level1Inflow = 0;
            int Level2Inflow = 0;
            while (dr.Read())
            {
                notificationAlertResponse.ApproveCount = Convert.ToInt32(dr["Approved"].ToString());
            }
            dr.NextResult();
            while (dr.Read())
            {
                Level2Inflow = Convert.ToInt32(dr["Inflow"].ToString());
            }
            dr.NextResult();
            while (dr.Read())
            {
                Level1Inflow = Convert.ToInt32(dr["Inflow1"].ToString());
            }
            dr.NextResult();
            while (dr.Read())
            {
                notificationAlertResponse.RejectCount = Convert.ToInt32(dr["Rejected"].ToString());
            }
            dr.NextResult();
            while (dr.Read())
            {
                notificationAlertResponse.ProjectDetails = Convert.ToInt32(dr["ProjectDetails"].ToString());
            }
            notificationAlertResponse.InflowCount = (Convert.ToInt32(Level2Inflow) + Convert.ToInt32(Level1Inflow));
            con.Close();
            return notificationAlertResponse;
        }
        public NotificationAlertResponse NotificationAlertAdmin(string empCode)
        {
            var notificationAlertResponse = new NotificationAlertResponse();
            com = new SqlCommand("NotificationAlerts", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "ADMIN");
            com.Parameters.Add(new SqlParameter("@empCode", empCode));
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            int Level1Inflow = 0;
            int Level2Inflow = 0;
            while (dr.Read())
            {
                notificationAlertResponse.ApproveCount = Convert.ToInt32(dr["Approved"].ToString());
            }
            dr.NextResult();
            while (dr.Read())
            {
                Level2Inflow = Convert.ToInt32(dr["Inflow"].ToString());
            }
            dr.NextResult();
            while (dr.Read())
            {
                Level1Inflow = Convert.ToInt32(dr["Inflow1"].ToString());
            }
            dr.NextResult();
            while (dr.Read())
            {
                notificationAlertResponse.RejectCount = Convert.ToInt32(dr["Rejected"].ToString());
            }
            dr.NextResult();
            while (dr.Read())
            {
                notificationAlertResponse.ProjectDetails = Convert.ToInt32(dr["ProjectDetails"].ToString());
            }
            notificationAlertResponse.InflowCount = (Convert.ToInt32(Level2Inflow) + Convert.ToInt32(Level1Inflow));
            con.Close();
            return notificationAlertResponse;
        }


        public ConventionsScoreAndAwards conventionsConClaveScoreAward(string TeamName)
        {
            var conventions = new ConventionsScoreAndAwards();
            com = new SqlCommand("ConventionConclaveScoreAndAwards", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@TeamName", TeamName);
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var Internal = new List<InternalConventionScoreAndAwards>();
            var Chapter = new List<ChapterConventionsScoreAndAwards>();
            var National = new List<NationalConventionScoreAndAward>();
            var International = new List<InternationalConventionScoreAndAward>();
            while (dr.Read())
            {
                var InternalConventionScoreAndAwards = new InternalConventionScoreAndAwards();
                InternalConventionScoreAndAwards.InternalAward = dr["Awards"].ToString();
                InternalConventionScoreAndAwards.InternalScore = dr["Score"].ToString();
                Internal.Add(InternalConventionScoreAndAwards);
            }

            dr.NextResult();
            while (dr.Read())
            {
                var ChapterConventionsScoreAndAwards = new ChapterConventionsScoreAndAwards();
                ChapterConventionsScoreAndAwards.ChapterAward = dr["Awards"].ToString();
                ChapterConventionsScoreAndAwards.ChapterScore = dr["Score"].ToString();
                Chapter.Add(ChapterConventionsScoreAndAwards);
            }
            dr.NextResult();
            while (dr.Read())
            {
                var NationalConventionScoreAndAward = new NationalConventionScoreAndAward();
                NationalConventionScoreAndAward.NationalAward = dr["Awards"].ToString();
                NationalConventionScoreAndAward.NationalScore = dr["Score"].ToString();
                National.Add(NationalConventionScoreAndAward);
            }
            dr.NextResult();
            while (dr.Read())
            {
                var InternationalConventionScoreAndAward = new InternationalConventionScoreAndAward();
                InternationalConventionScoreAndAward.InterNationalAward = dr["Awards"].ToString();
                InternationalConventionScoreAndAward.InterNationalScore = dr["Score"].ToString();
                International.Add(InternationalConventionScoreAndAward);
            }
            conventions.internalConventionScoreAndAwards = Internal;
            conventions.chapterConventionsScoreAndAwards = Chapter;
            conventions.nationalConventionScoreAndAwards = National;
            conventions.internationalConventionScoreAndAwards = International;
            con.Close();
            return conventions;
        }



        public TeamDetails FetchTeamDetailsByAdminLevels(int pageIndex, int pageSize)
        {
            var teamDetails = new TeamDetails();
            com = new SqlCommand("SaveOrUpdateAndGet_TeamDetails", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "AdminLevel");
            com.Parameters.AddWithValue("@Company", string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            com.Parameters.AddWithValue("@Plant", string.Empty);
            com.Parameters.AddWithValue("@TeamName", string.Empty);
            com.Parameters.AddWithValue("@Status", string.Empty);
            com.Parameters.AddWithValue("@Level1", string.Empty);
            com.Parameters.AddWithValue("@Level2", string.Empty);
            com.Parameters.AddWithValue("@Level3", string.Empty);
            com.Parameters.AddWithValue("@Remarks", string.Empty);
            com.Parameters.AddWithValue("@CreatedBy", string.Empty);
            com.Parameters.AddWithValue("@UpdatedBy", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var temaDetailsResponse = new List<TemaDetailsResponse>();
            while (dr.Read())
            {
                var teamdetails = new TemaDetailsResponse();
                teamdetails.Id = Convert.ToInt32(dr["Id"]);
                teamdetails.Company = dr["Company"].ToString();
                teamdetails.BusinessUnit = dr["BusinessUnit"].ToString();
                teamdetails.Plant = dr["Plant"].ToString();
                teamdetails.TeamName = dr["TeamName"].ToString();
                teamdetails.Status = dr["Status"].ToString();
                teamdetails.Company = dr["Company"].ToString();
                teamdetails.Level1 = dr["Level1"].ToString();
                teamdetails.Level2 = dr["Level2"].ToString();
                teamdetails.Level3 = dr["Level3"].ToString();
                if (teamdetails.Status == "1")
                {
                    teamdetails.StatusName = "Pending For L1 Approval";
                }
                else if (teamdetails.Status == "2")
                {
                    teamdetails.StatusName = "Pending For L2 Approval";
                }
                else if (teamdetails.Status == "3")
                {
                    teamdetails.StatusName = "Pending For Project Selection";
                }
                else if (teamdetails.Status == "4")
                {
                    teamdetails.StatusName = "Project Initiation";
                }
                else if (teamdetails.Status == "5")
                {
                    teamdetails.StatusName = "Pending For L1 Approval";
                }
                else if (teamdetails.Status == "6")
                {
                    teamdetails.StatusName = "Pending For L2 Approval";
                }
                else if (teamdetails.Status == "7")
                {
                    teamdetails.StatusName = "Pending For L3 Approval";
                }
                else if (teamdetails.Status == "8")
                {
                    teamdetails.StatusName = "Aproved";
                }
                else if (teamdetails.Status == "9")
                {
                    teamdetails.StatusName = "Rejected";
                }
                teamdetails.Remarks = dr["Remarks"].ToString();

                teamdetails.PlLoginMailId = dr["PlLoginMailId"].ToString();
                teamdetails.L1MailId = dr["L1MailId"].ToString();
                teamdetails.L2MailId = dr["L2MailId"].ToString();
                teamdetails.L3MailId = dr["L3MailId"].ToString();
                teamdetails.TeamStrength = dr["TeamStrength"].ToString();
                temaDetailsResponse.Add(teamdetails);
            }

            dr.NextResult();

            while (dr.Read())
            {
                teamDetails.totalCount = dr["totalCount"].ToString();
            }
            teamDetails.temaDetailsResponse = temaDetailsResponse;
            return teamDetails;
        }

        public TeamDetails FetchTeamDetailsByAdminStatus(string Status, int pageIndex, int pageSize)
        {
            var teamDetails = new TeamDetails();
            com = new SqlCommand("SaveOrUpdateAndGet_TeamDetails", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "AdminApprovedOrRejectedProjectSelect");
            com.Parameters.AddWithValue("@Company", string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            com.Parameters.AddWithValue("@Plant", string.Empty);
            com.Parameters.AddWithValue("@TeamName", string.Empty);
            com.Parameters.AddWithValue("@Status", Status);
            com.Parameters.AddWithValue("@Level1", string.Empty);
            com.Parameters.AddWithValue("@Level2", string.Empty);
            com.Parameters.AddWithValue("@Level3", string.Empty);
            com.Parameters.AddWithValue("@Remarks", string.Empty);
            com.Parameters.AddWithValue("@CreatedBy", string.Empty);
            com.Parameters.AddWithValue("@UpdatedBy", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var temaDetailsResponse = new List<TemaDetailsResponse>();
            while (dr.Read())
            {
                var teamdetails = new TemaDetailsResponse();
                teamdetails.Id = Convert.ToInt32(dr["Id"]);
                teamdetails.Company = dr["Company"].ToString();
                teamdetails.BusinessUnit = dr["BusinessUnit"].ToString();
                teamdetails.Plant = dr["Plant"].ToString();
                teamdetails.TeamName = dr["TeamName"].ToString();
                teamdetails.Status = dr["Status"].ToString();
                teamdetails.Company = dr["Company"].ToString();
                teamdetails.Level1 = dr["Level1"].ToString();
                teamdetails.Level2 = dr["Level2"].ToString();
                teamdetails.Level3 = dr["Level3"].ToString();
                if (teamdetails.Status == "1")
                {
                    teamdetails.StatusName = "Pending For L1 Approval";
                }
                else if (teamdetails.Status == "2")
                {
                    teamdetails.StatusName = "Pending For L2 Approval";
                }
                else if (teamdetails.Status == "3")
                {
                    teamdetails.StatusName = "Pending For Project Selection";
                }
                else if (teamdetails.Status == "4")
                {
                    teamdetails.StatusName = "Project Initiation";
                }
                else if (teamdetails.Status == "5")
                {
                    teamdetails.StatusName = "Pending For L1 Approval";
                }
                else if (teamdetails.Status == "6")
                {
                    teamdetails.StatusName = "Pending For L2 Approval";
                }
                else if (teamdetails.Status == "7")
                {
                    teamdetails.StatusName = "Pending For L3 Approval";
                }
                else if (teamdetails.Status == "8")
                {
                    teamdetails.StatusName = "Aproved";
                }
                else if (teamdetails.Status == "9")
                {
                    teamdetails.StatusName = "Rejected";
                }
                teamdetails.Remarks = dr["Remarks"].ToString();

                teamdetails.PlLoginMailId = dr["PlLoginMailId"].ToString();
                teamdetails.L1MailId = dr["L1MailId"].ToString();
                teamdetails.L2MailId = dr["L2MailId"].ToString();
                teamdetails.L3MailId = dr["L3MailId"].ToString();
                teamdetails.TeamStrength = dr["TeamStrength"].ToString();
                temaDetailsResponse.Add(teamdetails);
            }

            dr.NextResult();

            while (dr.Read())
            {
                teamDetails.totalCount = dr["totalCount"].ToString();
            }
            teamDetails.temaDetailsResponse = temaDetailsResponse;
            return teamDetails;
        }

        public TeamDetails FetchTeamDetailsByAdminProjectSelectionLevel(int pageIndex, int pageSize)
        {
            var teamDetails = new TeamDetails();
            com = new SqlCommand("SaveOrUpdateAndGet_TeamDetails", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "AdminProjectSelectionLevel");
            com.Parameters.AddWithValue("@Company", string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", string.Empty);
            com.Parameters.AddWithValue("@Plant", string.Empty);
            com.Parameters.AddWithValue("@TeamName", string.Empty);
            com.Parameters.AddWithValue("@Status", string.Empty);
            com.Parameters.AddWithValue("@Level1", string.Empty);
            com.Parameters.AddWithValue("@Level2", string.Empty);
            com.Parameters.AddWithValue("@Level3", string.Empty);
            com.Parameters.AddWithValue("@Remarks", string.Empty);
            com.Parameters.AddWithValue("@CreatedBy", string.Empty);
            com.Parameters.AddWithValue("@UpdatedBy", string.Empty);
            com.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
            com.Parameters.Add("@pageSize", SqlDbType.Int).Value = pageSize;
            con.Open();
            SqlDataReader dr = com.ExecuteReader();
            var temaDetailsResponse = new List<TemaDetailsResponse>();
            while (dr.Read())
            {
                var teamdetails = new TemaDetailsResponse();
                teamdetails.Id = Convert.ToInt32(dr["Id"]);
                teamdetails.Company = dr["Company"].ToString();
                teamdetails.BusinessUnit = dr["BusinessUnit"].ToString();
                teamdetails.Plant = dr["Plant"].ToString();
                teamdetails.TeamName = dr["TeamName"].ToString();
                teamdetails.Status = dr["Status"].ToString();
                teamdetails.Company = dr["Company"].ToString();
                teamdetails.Level1 = dr["Level1"].ToString();
                teamdetails.Level2 = dr["Level2"].ToString();
                teamdetails.Level3 = dr["Level3"].ToString();
                if (teamdetails.Status == "1")
                {
                    teamdetails.StatusName = "Pending For L1 Approval";
                }
                else if (teamdetails.Status == "2")
                {
                    teamdetails.StatusName = "Pending For L2 Approval";
                }
                else if (teamdetails.Status == "3")
                {
                    teamdetails.StatusName = "Pending For Project Selection";
                }
                else if (teamdetails.Status == "4")
                {
                    teamdetails.StatusName = "Project Initiation";
                }
                else if (teamdetails.Status == "5")
                {
                    teamdetails.StatusName = "Pending For L1 Approval";
                }
                else if (teamdetails.Status == "6")
                {
                    teamdetails.StatusName = "Pending For L2 Approval";
                }
                else if (teamdetails.Status == "7")
                {
                    teamdetails.StatusName = "Pending For L3 Approval";
                }
                else if (teamdetails.Status == "8")
                {
                    teamdetails.StatusName = "Aproved";
                }
                else if (teamdetails.Status == "9")
                {
                    teamdetails.StatusName = "Rejected";
                }
                teamdetails.Remarks = dr["Remarks"].ToString();

                teamdetails.PlLoginMailId = dr["PlLoginMailId"].ToString();
                teamdetails.L1MailId = dr["L1MailId"].ToString();
                teamdetails.L2MailId = dr["L2MailId"].ToString();
                teamdetails.L3MailId = dr["L3MailId"].ToString();
                teamdetails.TeamStrength = dr["TeamStrength"].ToString();
                temaDetailsResponse.Add(teamdetails);
            }

            dr.NextResult();

            while (dr.Read())
            {
                teamDetails.totalCount = dr["totalCount"].ToString();
            }
            teamDetails.temaDetailsResponse = temaDetailsResponse;
            return teamDetails;
        }

        public int DeleteUsersByEmpCode(string Id, string Plant)
        {
            com = new SqlCommand("DeleteUsersByEmpCode", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Id", Id);
            com.Parameters.AddWithValue("@Plant", Plant);
            con.Open();
            com.ExecuteNonQuery();
            int numRes = com.ExecuteNonQuery();
            con.Close();
            return numRes;
        }

        /// <summary>
        /// Business Logic For FetchEmployeeDetailsByEmpCode
        /// </summary>
        /// <param name="empCode"></param>
        /// <returns></returns>
        public EmployeeInfoResponse FetchEmployeeDetailsByLevel(string empCode)
        {
            var employeeInfoResponse = new EmployeeInfoResponse();
            DataTable dsData;
            com = new SqlCommand("FectchLoginEmployeeDetails", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "Level1");
            com.Parameters.AddWithValue("@empCode", empCode);
        
            SqlDataAdapter sqlAd = new SqlDataAdapter(com);
            con.Open();
            dsData = new DataTable();
            sqlAd.Fill(dsData);
            if (dsData.Rows.Count > 0)
            {
                employeeInfoResponse.empCode = dsData.Rows[0].ItemArray[0].ToString();
                employeeInfoResponse.empName = dsData.Rows[0].ItemArray[1].ToString();
                employeeInfoResponse.grade = dsData.Rows[0].ItemArray[2].ToString();
                employeeInfoResponse.department = dsData.Rows[0].ItemArray[3].ToString();
                employeeInfoResponse.emailId = dsData.Rows[0].ItemArray[4].ToString();
                employeeInfoResponse.company = dsData.Rows[0].ItemArray[5].ToString();
                employeeInfoResponse.l1 = dsData.Rows[0].ItemArray[6].ToString();
                employeeInfoResponse.businessUnit = dsData.Rows[0].ItemArray[8].ToString();
                employeeInfoResponse.Plant = dsData.Rows[0].ItemArray[7].ToString();
                employeeInfoResponse.DepartmentCar = dsData.Rows[0].ItemArray[9].ToString();

            }
            con.Close();
            return employeeInfoResponse;
        }
        public string UserRegisterUpdate(UserRequest userRequest)
        {
            com = new SqlCommand("InsertUpdate_LoginRegister", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ActionType", "UpdateData");
            com.Parameters.AddWithValue("@EmpCode", userRequest.EmpCode != null ? userRequest.EmpCode : string.Empty);
            com.Parameters.AddWithValue("@Password", "12345");
            com.Parameters.AddWithValue("@EmpName", userRequest.EmpName != null ? userRequest.EmpName : string.Empty);
            com.Parameters.AddWithValue("@Grade", userRequest.Grade != null ? userRequest.Grade : string.Empty);
            com.Parameters.AddWithValue("@Department", userRequest.Department != null ? userRequest.Department : string.Empty);
            com.Parameters.AddWithValue("@Company", userRequest.Company != null ? userRequest.Company : string.Empty);
            com.Parameters.AddWithValue("@EmpMailId", userRequest.EmpMailId != null ? userRequest.EmpMailId : string.Empty);
            com.Parameters.AddWithValue("@BusinessUnit", userRequest.BusinessUnit != null ? userRequest.BusinessUnit : string.Empty);
            com.Parameters.AddWithValue("@Plant", userRequest.Plant != null ? userRequest.Plant : string.Empty);
            com.Parameters.AddWithValue("@RoleId", userRequest.RoleId);
            com.Parameters.AddWithValue("@Id", userRequest.Id);
            con.Open();
            com.ExecuteNonQuery();
            string numRes = com.ExecuteNonQuery().ToString();
            con.Close();
            return numRes;
        }
    }
}