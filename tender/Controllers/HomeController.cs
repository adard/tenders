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
    public class HomeController : Controller
    {
        [DataType(DataType.Date)]
        public DateTime ReleaseDate { get; set; }


        public ActionResult Index()
        {
            ViewBag.Message = "hello";

            return View();

        }
        public JsonResult GetSiteMenu()
        {
            using (DbtenderEntities1 dc = new DbtenderEntities1())
            {
                var menu = dc.SiteMenu.ToList();
                return new JsonResult { Data = menu, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        public ActionResult Tenders()
        {


            DbtenderEntities1 DB = new DbtenderEntities1();
            List<Tenders> TypeTender = DB.Tenders.ToList();

            return View(TypeTender);

        }

        public ActionResult MyTenders()
        {
            DbtenderEntities1 DB = new DbtenderEntities1();
            List<Tenders> TypeTender = DB.Tenders.ToList();

            return View(TypeTender);

        }

        public ActionResult MyClients()
        {
            DbtenderEntities1 DB = new DbtenderEntities1();
            List<Contestants> TypeTender = DB.Contestants.ToList();

            return View(TypeTender);

        }

        public ActionResult getSuggestion(int numTender)
        {

            //if (Request.QueryString["id"] == null)
            //    return View();
            //int id = Convert.ToInt32(Request.QueryString["id"]);
            DbtenderEntities1 DB = new DbtenderEntities1();

            var result = from c in DB.Categories
                         join t in DB.Tenders on c.codeCategory equals t.codCategory
                         join s in DB.Suggestions on t.numTender equals s.numTender
                         join co in DB.Contestants on s.numCont equals co.numCon
                         join p in DB.ProducToTender on t.numTender equals p.numTender
                         join s1 in DB.SuggestionDetail on p.numProduct equals s1.numproduct
                         where t.numTender == numTender
                         orderby p.NameProduct
                         select new { t.name, t.numEditor, c.nameCategory, s.timeSuggestion, p.NameProduct, co.nameCompanyCont, co.phoneCont, s1.priceToProduct};


            //return View();

            return Json(result.Distinct().ToList(), JsonRequestBehavior.AllowGet);

        }


        public ActionResult getDetail()
        {

            //if (Request.QueryString["id"] == null)
            //    return View();
            //int id = Convert.ToInt32(Request.QueryString["id"]);
            DbtenderEntities1 DB = new DbtenderEntities1();

            var result = from c in DB.Categories
                         join t in DB.Tenders on c.codeCategory equals t.codCategory
                         join s in DB.TypeTender on t.numType equals s.numType
                         join co in DB.Editors on t.numEditor equals co.numEditor
  
                         select new { t.numTender, t.name, t.typeAcquire, co.nameEditor, c.nameCategory,t.@from, t.@till,s.nameType,t.status};
            return Json(result.ToList(), JsonRequestBehavior.AllowGet);

        }


        public ActionResult Suggestions()
        {
            return View();


            //            SELECT t.name,t.numEditor,c.nameCategory,s.timeSuggestion,p.NameProduct,c1.nameCompanyCont,c1.phoneCont,s1.priceToProduct
            //    FROM[Tenders] as t join[Categories]  c
            //on t.codCategory = c.codeCategory





            //       IEnumerable<allSug>
            //============
            //    string id= Request.QueryString["id"];
            //==========
            ////////////// DbtenderEntities1 DB = new DbtenderEntities1();
            //////////////// List<AllSugestions> TypeTender = DB.Suggestions.ToList();

            ////////////// List<Suggestions> TypeTender = DB.Suggestions.ToList();
            ////////////// List<SuggestionDetail> TypeTender2 = DB.SuggestionDetail.ToList();
            ////////////// List<Tenders> TypeTender3 = DB.Tenders.ToList();

            ////////////// return View(TypeTender2);

        }

        public ActionResult About()
        {

            ViewBag.Message = "Your application description page.";
            var users = new List<Tenders>();
            //here  MyDatabaseEntities is the dbcontext
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                users = DB.Tenders.ToList();
            }
            return View(users);

        }
        public JsonResult getProductCategories()
        {

            List<Categories> categories = new List<Categories>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                categories = DB.Categories.OrderBy(a => a.nameCategory).ToList();
            }
            return new JsonResult { Data = categories, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult getEditor()
        {

            List<Editors> Editors = new List<Editors>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                Editors = DB.Editors.OrderBy(a => a.nameEditor).ToList();
            }
            return new JsonResult { Data = Editors, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult getType()
        {

            List<TypeTender> typeTender = new List<TypeTender>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                typeTender = DB.TypeTender.OrderBy(a => a.nameType).ToList();
            }

            return new JsonResult { Data = typeTender, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult getProducts(int categoryID)
        {
            List<ProducToTender> products = new List<ProducToTender>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                products = DB.ProducToTender.Where(a => a.numProduct.Equals(categoryID)).OrderBy(a => a.NameProduct).ToList();
            }
            return new JsonResult { Data = products, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public JsonResult save(Tenders Tenders)
        {
            bool status = false;
            DateTime dateOrgF;
            DateTime dateOrgT;
            var isValidDateFrom = DateTime.TryParseExact(Tenders.from.ToString(), "mm-dd-yyyy", null, System.Globalization.DateTimeStyles.None, out dateOrgF);
            if (isValidDateFrom)
            {
                Tenders.from = dateOrgF;
            }
            var isValidDateTill = DateTime.TryParseExact(Tenders.till.ToString(), "mm-dd-yyyy", null, System.Globalization.DateTimeStyles.None, out dateOrgT);
            if (isValidDateTill)
            {
                Tenders.from = dateOrgT;
            }

            var isValidModel = TryUpdateModel(Tenders);
            if (isValidModel)
            {
                using (DbtenderEntities1 DB = new DbtenderEntities1())
                {
                    //foreach (var item in Tenders.ProducToTender)
                    //{
                    //    DB.ProducToTender.Add(item);
                    //}
                    //DB.SaveChanges();

                    DB.Tenders.Add(Tenders);
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

        public ActionResult Add_Tender()
        {
            ViewBag.Message = "";

            return View();
        }
        public ActionResult UpdateTender()
        {
            ViewBag.Message = "";

            return View();
        }
        public ActionResult saveUpdateTender(Tenders t)
        {
            ViewBag.Message = "";
           
        
            using (DbtenderEntities1 DB1 = new DbtenderEntities1())
              {
                foreach (var item in DB1.Tenders)
                {
                    if (item.numTender == t.numTender)
                    {
                      //  item.numEditor = t.numEditor;
                      //  item.codCategory = t.codCategory;
                        //item.from = t.from;
                        //item.hourFinish = t.hourFinish;
                        //item.hourStart = t.hourStart;
                        //item.numType = t.numType;
                        //item.status = t.status;
                        //item.till = t.till;
                        //item.typeAcquire = t.typeAcquire;
                        item.name = t.name;
                        if(ModelState.IsValid)
                           DB1.SaveChanges();
                      

                    }
                }
            }

            return View();
        }
        public ActionResult Add_Client()
        {
            ViewBag.Message = "";

            return View();
        }

        public JsonResult getTender(int numTender)
        {
            DbtenderEntities1 DB = new DbtenderEntities1();
            List<Tenders> tenders = DB.Tenders.ToList();
            Tenders t;
            foreach (var item in tenders)
            {
                if (item.numTender == numTender)
                {
                    t = item;
                    return new JsonResult { Data = t, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                }

            }
            return null;

        }
        public ActionResult getNumOfProd(int numTender)
        {
            int num = 1;
            DbtenderEntities1 DB = new DbtenderEntities1();

            List<ProducToTender> result = DB.ProducToTender.ToList();

            foreach (var item in result)
            {
                if (item.numTender == numTender)
                    num++;
            }

            return Json(num, JsonRequestBehavior.AllowGet);

        }

    }
}
