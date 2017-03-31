using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using tender.Models;

namespace tender.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult AskAccount()
        {
            return View();
        }
        //public int CheckPassword(Login login)
        //{
        //    string user = login.User;
        //    string pass = login.Password;
        //    List<Login> log = new List<Login>();
        //    //var user = login[0];
        //    //var pass = login[1];

        //    using (DbtenderEntities1 DB = new DbtenderEntities1())
        //    {
        //        log = DB.Login.Where(a => a.User.Equals(user)).OrderBy(a => a.User).ToList();
        //    }
        //    if (log != null)
        //    {
        //        try

        //        {
        //            foreach (var item in log)
        //            {

        //                using (DbtenderEntities1 DB = new DbtenderEntities1())
        //                {
        //                    string check =item.Password;
        //                    //   var tender = DB.Suggestions.Find((item.numTender));
        //                    string rmWhite = check.Replace(" ", "");
        //                    //if(String.Equals(pass,check,StringComparison.OrdinalIgnoreCase))
        //                    if ((pass).Equals(rmWhite))
        //                        return 1;
        //                }
        //            }
        //            return 0;
        //        }
        //        catch (Exception) { }
        //        return 0;
        //    }
        //    return 0;

        //}
        public JsonResult CheckPassword(Contestants e)
        {
            DbtenderEntities1 DB = new DbtenderEntities1();
            List<Contestants> le = DB.Contestants.ToList();
            Contestants s;
            foreach (var item in le)
            {
                if (item.userNameCont.TrimEnd() == e.userNameCont && item.passCont == e.passCont)
                {
                    s = item;
                    return new JsonResult { Data = s.numCon, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                }

            }
            return new JsonResult { Data = -1, JsonRequestBehavior = JsonRequestBehavior.AllowGet }; ;

        }
    }
}
