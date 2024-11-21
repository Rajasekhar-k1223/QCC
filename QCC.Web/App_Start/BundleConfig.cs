using System.Web;
using System.Web.Optimization;

namespace QCC.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            //bundles.Add(new ScriptBundle("~/bundles/angular").Include(
            //   "~/Scripts/angular.js",
            //   "~/Scripts/angular-route.js"));

            bundles.Add(new ScriptBundle("~/bundles/ui-bootstrap").Include(
              "~/Scripts/ui-bootstrap.js",
              "~/Scripts/ui-bootstrap-tpls.js"));

            bundles.Add(new ScriptBundle("~/bundles/popper").Include(
                       "~/Scripts/popper.min.js"));
            bundles.Add(new ScriptBundle("~/bundles/RolesList").Include(
                      "~/Scripts/RolesList.js"));
            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.min.js",
                "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                       "~/Content/QCCCustomized.css",
                        "~/Content/bostrap/bootstrap.min.css",
                      "~/Content/site.css"));
        }
    }
}
