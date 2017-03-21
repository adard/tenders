using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Data;
using tender.Models;
namespace tender.Controllers
{
    public class suggestionController : Controller
    {
        // GET: suggestion
        //public ActionResult Index()
        //{
        //    return View();
        //}

        public ActionResult suggestion()
        {
            return View();
        }

        public ActionResult getTender(int numTender)
        {

            List<Tenders> Tender = new List<Tenders>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                Tender = DB.Tenders.Where(a => a.numTender.Equals(numTender)).OrderBy(a => a.numTender).ToList();
            }
            return Json(Tender, JsonRequestBehavior.AllowGet);

        }
        public ActionResult getProduct(int numTender)
        {

            List<ProducToTender> products = new List<ProducToTender>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                products = DB.ProducToTender.Where(a => a.numTender.Equals(numTender)).OrderBy(a => a.numTender).ToList();
            }
            return Json(products, JsonRequestBehavior.AllowGet);

        }
    }
}