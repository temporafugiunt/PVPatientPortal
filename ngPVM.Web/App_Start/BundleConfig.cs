using System;
using System.IO;
using System.Web;
using System.Web.Optimization;

namespace ngPVM.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);

            bundles.Add(
                new ScriptBundle("~/scripts/modernizr")
                    .Include("~/scripts/modernizr-{version}.js"));

            bundles.Add(
                new ScriptBundle("~/scripts/angular")
                    .Include("~/scripts/angular/angular.js")
                    .Include("~/scripts/angular/angular-resource.js")
                    .Include("~/scripts/angular/angular-cookies.js"));

            AddAngularJsBundles(bundles, "~/js");

            bundles.Add(
                new ScriptBundle("~/scripts/vendor")
                    .Include("~/scripts/jquery-{version}.js")
                    .Include("~/scripts/bootstrap.min.js")
                    .Include("~/scripts/moment.min.js")
                    .Include("~/scripts/ace/ace-extra.min.js")
                    .Include("~/scripts/ace/ace-element.min.js")
                    .Include("~/scripts/ace/ace.min.js")
                );

            bundles.Add(
                new StyleBundle("~/Content/css")
                    .Include("~/Content/ie10mobile.css") // Must be first. IE10 mobile viewport fix
                    .Include("~/Content/bootstrap/bootstrap.min.css")
                    .Include("~/Content/font-awesome.min.css")
                    .Include("~/Content/ace/ace-fonts.css")
                    .Include("~/Content/ace/ace.css")
                    .Include("~/Content/ace/ace-rtl.css")
                    .Include("~/Content/ace/ace-skins.css")
                    .Include("~/Content/Styles.min.css")
             );

            // IE7 / 8 only javascript.
            // HTML5 shim and Respond.js - IE8 support of HTML5 elements and media queries.
            bundles.Add(
                new StyleBundle("~/Scripts/ie8")
                    .Include("~/Scripts/html5shiv.min.js")
                    .Include("~/Scripts/respond.min.js")
                );

            // IE7 only styles
            bundles.Add(
                new StyleBundle("~/Content/ie7-css")
                    .Include("~/Content/font-awesome-ie7.min.css")
                    .Include("~/Content/ace/ace-ie.min.css")
                );
        }

        #region AngularJS Bundling

        private static void AddAngularJsBundles(BundleCollection bundles, string baseJsBundleHttpPath)
        {
            var baseJsBundleFileSysPath = HttpContext.Current.Server.MapPath(baseJsBundleHttpPath);
            if (Directory.Exists(baseJsBundleFileSysPath))
            {
                var baseJsBundleDirectory = new DirectoryInfo(baseJsBundleFileSysPath);
                foreach (var directory in baseJsBundleDirectory.EnumerateDirectories())
                {
                    CreateAndAddScriptBundle(baseJsBundleHttpPath + "/" + directory.Name, directory.FullName, bundles);
                }
            }
        }

        private static void CreateAndAddScriptBundle(string bundleHttpPath, string bundleServerPath, BundleCollection bundles)
        {
            const string appJsName = "app.js";
            var bundle = new ScriptBundle(bundleHttpPath);

            // Always place app first.
            if (File.Exists(Path.Combine(bundleServerPath, appJsName)))
            {
                bundle.Include(bundleHttpPath + "/" + appJsName);
            }
            // Now add everything else.
            RecursivelyAddDirectoryToBundle(bundleHttpPath, bundleServerPath, bundle);
            bundles.Add(bundle);
        }

        private static void RecursivelyAddDirectoryToBundle(string bundleHttpPath, string bundleServerPath, ScriptBundle bundle)
        {
            var bundleServerDirectory = new DirectoryInfo(bundleServerPath);
            // Add js files in this directory.
            foreach (var file in bundleServerDirectory.EnumerateFiles("*.js"))
            {
                bundle.Include(bundleHttpPath + "/" + file.Name);
            }
            // Add js files in subdirectories.
            foreach (var directory in bundleServerDirectory.EnumerateDirectories())
            {
                RecursivelyAddDirectoryToBundle(string.Format("{0}/{1}", bundleHttpPath, directory.Name), Path.Combine(bundleServerPath, directory.Name), bundle);
            }
        }

        #endregion

        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            if (ignoreList == null)
            {
                throw new ArgumentNullException("ignoreList");
            }

            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");
            //ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
            //ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
            //ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
        }
    }
}