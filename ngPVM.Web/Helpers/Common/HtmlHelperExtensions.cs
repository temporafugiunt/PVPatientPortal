using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;

namespace ngPVM.Web.Helpers.Common
{
    public class HtmlHelpers
    {
        #region General Helper Methods

        /// <summary>
        /// This method simulates the #if DEBUG preprocessor directive, 
        /// which razor views can't use.
        /// </summary>
        /// <returns></returns>
        public static bool DEBUG()
        {
            var value = false;
#if DEBUG
            value = true;
#endif
            return value;
        }

        public static string PvApiBaseURL()
        {
            return (ConfigHelper.GetAppSetting("PvApiBaseURL"));
        }

        /// <summary>
        /// Utility function which will return the website's base path, keeping virtual directories and application paths in mind.
        /// </summary>
        /// <returns></returns>
        public static string WebsiteBasePath()
        {
            return (VirtualPathUtility.ToAbsolute("~/"));
        }

        #endregion

        #region Angular Application Helper Methods

        public static IHtmlString RenderStylesIe(string ieVersionParam, string styleBundle)
        {
            var tag = string.Format("<!--[if {0}]>{1}<![endif]-->", ieVersionParam, Styles.Render(styleBundle));
            return new MvcHtmlString(tag);
        }

        public static IHtmlString RenderScriptsIe(string ieVersionParam, string scriptBundle)
        {
            var tag = string.Format("<!--[if {0}]>{1}<![endif]-->", ieVersionParam, Scripts.Render(scriptBundle));
            return new MvcHtmlString(tag);
        }

        public static MvcHtmlString AddNgAppDirectiveIfNgApp(string ngAppName)
        {
            if (!ngAppName.IsNullOrEmpty())
            {
                return (new MvcHtmlString(string.Format("ng-app='{0}'", ngAppName)));
            }
            return new MvcHtmlString("");
        }

        public static MvcHtmlString AddBodyCssClassIfExists(string bodyCssClass)
        {
            if (!bodyCssClass.IsNullOrEmpty())
            {
                return (new MvcHtmlString(string.Format("class='{0}'", bodyCssClass)));
            }
            return new MvcHtmlString("");
        }

        #endregion

    }
}