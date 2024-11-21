using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCC.Web.Models.Response
{
    public class ProjectSelectionSheetResponse
    {
        public int ProjectId { get; set; }
        public int TeamId { get; set; }
        public string Title { get; set; }
        public string Objective { get; set; }
        public int Goal { get; set; }
        public string ProjectStartDate { get; set; }
        public string ProjectEndDate { get; set; }
        public string ExpectedCostSaving { get; set; }
        public int Status { get; set; }
        public string Level1 { get; set; }
        public string Level2 { get; set; }
        public string Level3 { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public string StatusName { get; set; }
        public string ActualGoal { get; set; }
        public string ActualProjectStartDate { get; set; }
        public string ActualProjectEndDate { get; set; }
        public string ActualExpectedCostSaving { get; set; }
        public string Remarks { get; set; }
        public int GoalTo { get; set; }
        public string GoalToUOM { get; set; }
        public string GoalUOM { get; set; }
    }
}