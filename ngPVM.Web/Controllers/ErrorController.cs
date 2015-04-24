using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ngPVM.Web.Controllers.Base;

namespace ngPVM.Web.Controllers
{
    public class ErrorController : PvmControllerBase
    {
        public ErrorController()
        {
            PageNgApp = "pvError";
            PageTitle = "An Error Has Occurred";
        }
        //
        // GET: /Login/
        public ActionResult Index()
        {
            return View();
        }
    }
}
