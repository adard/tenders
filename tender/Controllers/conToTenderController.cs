using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using tender.Models;

namespace tender.Controllers
{
    public class conToTenderController : Controller
    {
        // GET: conToTender
        public ActionResult conTo()
        {
            return View();
        }
        public JsonResult getcon()
        {

            List<Contestants> con = new List<Contestants>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                con = DB.Contestants.OrderBy(a => a.nameCont).ToList();
            }
            return new JsonResult { Data = con, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }


        public JsonResult save(List<ConToTender> ct)
        {
            bool status = false;
            

            var isValidModel = TryUpdateModel(ct);
            if (isValidModel)
            {
                using (DbtenderEntities1 DB = new DbtenderEntities1())
                {
                    foreach (var item in ct)
                    {
                        DB.ConToTender.Add(item);
                    }

                   
                    try
                    {
                        DB.SaveChanges();
                    }
                    catch (Exception)
                    {
                    }

                    status = true;
                }
            }
            return new JsonResult { Data = new { status = status } };
        }
    }
}