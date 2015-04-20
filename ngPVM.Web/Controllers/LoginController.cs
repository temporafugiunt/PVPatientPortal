using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ngPVM.Web.Controllers.Base;

namespace ngPVM.Web.Controllers
{
    public class LoginController : PvmControllerBase
    {
        public LoginController()
        {
            PageNgApp = "pvLogin";
            PageTitle = "Login to PV Patient Portal";
        }
        //
        // GET: /Login/
        public ActionResult Index()
        {
            return View();
        }
    }
}
