using System.Web.Mvc;

namespace ngPVM.Web.Controllers.Base
{
    public class PvmControllerBase : Controller
    {
        public string PageNgApp
        {
            get { return (ViewBag.NgApp); }
            set { ViewBag.NgApp = value; }
        }

        public string PageTitle
        {
            get { return (ViewBag.PageTitle); }
            set { ViewBag.PageTitle = value; }
        }

        public string PageBodyCssClass
        {
            get { return (ViewBag.BodyCssClass); }
            set { ViewBag.BodyCssClass = value; }
        }
    }
}
