﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ngPVM.Web.Controllers.Base;

namespace ngPVM.Web.Controllers
{
    public class PatientServicesController : PvmControllerBase
    {
        public PatientServicesController()
        {
            PageNgApp = "pvPatientServices";
            PageTitle = "Patient Services";
        }
        //
        // GET: /Login/
        public ActionResult Index()
        {
            return View();
        }
    }
}
