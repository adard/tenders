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



        public ActionResult getSuggestion2(int numTender)
        {

            //if (Request.QueryString["id"] == null)
            //    return View();
            //int id = Convert.ToInt32(Request.QueryString["id"]);
            DbtenderEntities1 DB = new DbtenderEntities1();

            var result = from t in DB.Tenders
                         join c in DB.Categories on t.codCategory equals c.codeCategory
                         join s in DB.Suggestions on t.numTender equals s.numTender
                         join co in DB.Contestants on s.numCont equals co.numCon
                         where t.numTender == numTender
                         orderby s.numSuggestion
                         select new { t.name, t.numEditor, c.nameCategory, s.dataSuggestion, co.nameCompanyCont, co.phoneCont, s.priceToproduct, s.numSuggestion };


            //return View();

            return Json(result.ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult log(Editors e)
        {
            DbtenderEntities1 DB = new DbtenderEntities1();
            List<Editors> le = DB.Editors.ToList();
            Editors s;
            foreach (var item in le)
            {
                if (item.nameEditor.TrimEnd() == e.nameEditor && item.passEditor == e.passEditor)
                {
                    s = item;
                    return new JsonResult { Data = s.numEditor, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                }

            }
            return new JsonResult { Data = -1, JsonRequestBehavior = JsonRequestBehavior.AllowGet }; ;

        }
        public ActionResult homeView()
        {
            return View();
        }
        public ActionResult Tenders()
        {

            return View();

        }

        public ActionResult MyTenders()
        {


            return View();

        }

        public ActionResult winner()
        {


            return View();

        }

        public ActionResult MyClients()
        {
            DbtenderEntities1 DB = new DbtenderEntities1();
            List<Contestants> TypeTender = DB.Contestants.ToList();

            return View(TypeTender);

        }
        public ActionResult getWinner()
        {

            //if (Request.QueryString["id"] == null)
            //    return View();
            //int id = Convert.ToInt32(Request.QueryString["id"]);
            DbtenderEntities1 DB = new DbtenderEntities1();

            var result = from c in DB.Categories
                         join t in DB.Tenders on c.codeCategory equals t.codCategory
                         join s in DB.Suggestions on t.numTender equals s.numTender
                         join co in DB.Contestants on s.numCont equals co.numCon
                         join ty in DB.TypeTender on t.numType equals ty.numType
                         where t.winner==co.numCon
                        where t.status.Contains("סגור")
                         orderby t.name
                         select new {ty.nameType,t.winner, t.name, c.nameCategory, s.dataSuggestion, s.priceToproduct, co.nameCompanyCont, co.nameCont,co.familyCont,t.numTender};


            //return View();

            return Json(result.Distinct().ToList(), JsonRequestBehavior.AllowGet);

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
                         select new { t.name, t.numEditor, c.nameCategory, s.timeSuggestion, p.NameProduct, co.nameCompanyCont, co.phoneCont, s1.priceToProduct };


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

                         select new { t.numTender, t.name, t.typeAcquire, co.nameEditor, c.nameCategory, t.@from, t.@till, s.nameType, t.status };
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


        public int findTenderDetail()
        {

            int num = 0;
            DbtenderEntities1 DB = new DbtenderEntities1();

            List<ProducToTender> result = DB.ProducToTender.ToList();
            num = result.Count + 1;

            return num;
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
            DbtenderEntities1 db = new DbtenderEntities1();
            List<Tenders> t1 = db.Tenders.ToList();
            foreach (var item in t1)
            {
                if (item.numTender == t.numTender)
                {
                    Tenders t2 = item;
                    t2.name = t.name;
                    t2.numEditor = t.numEditor;
                    t2.numType = t.numType;
                    t2.status = t.status;
                    t2.typeAcquire = t.typeAcquire;
                    t2.codCategory = t.codCategory;
                    t2.from = t.from;
                    t2.till = t.till;
                    t2.hourStart = t.hourStart;
                    t2.hourFinish = t.hourFinish;

                    try
                    {
                        db.SaveChanges();
                    }
                    catch (Exception)
                    {


                    }

                    break;
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
        public JsonResult getTenders()
        {
            DbtenderEntities1 DB = new DbtenderEntities1();
            List<Tenders> tenders = DB.Tenders.ToList();


            return new JsonResult { Data = tenders, JsonRequestBehavior = JsonRequestBehavior.AllowGet };


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
        public JsonResult saveProductTender(List<ProducToTender> pt)
        {
            bool status = false;

            DbtenderEntities1 db = new DbtenderEntities1();
            List<ProducToTender> ptlist = db.ProducToTender.ToList();
            bool flag;
            foreach (var item in pt)
            {
                flag = false;
                foreach (var item2 in ptlist)
                {
                    if (item2.numTender == item.numTender && item2.numProduct == item.numProduct)
                    {
                        flag = true;
                        ProducToTender p = item2;
                        p.NameProduct = item.NameProduct;
                        p.numProduct = item.numProduct;
                        p.PriceLimit = item.PriceLimit;
                        p.sizeRoomy = item.sizeRoomy;
                        p.Amount = item.Amount;
                        try
                        {
                            db.SaveChanges();
                            status = true;

                        }
                        catch (Exception)
                        {


                        }
                    }
                }
                if (!flag)
                {
                    ProducToTender p = item;
                    var a = TryUpdateModel(p);
                    db.ProducToTender.Add(p);

                    try
                    {

                        db.SaveChanges();
                        status = true;

                    }
                    catch (Exception)
                    {
                        throw;

                    }
                }

            }




            return new JsonResult { Data = new { status = status } };

        }
        public JsonResult saveP(List<ProducToTender> pt)
        {
           int TenderDetail = findTenderDetail();
             bool status = false;
            var isValidModel = true;
            if (isValidModel)
            {
                using (DbtenderEntities1 DB = new DbtenderEntities1())
                {
                    foreach (var item in pt)
                    {
                        item.TenderDetailsID = TenderDetail;
                        DB.ProducToTender.Add(item);
                        TenderDetail = TenderDetail + 1;
                    }


                    try
                    {
                        DB.SaveChanges();
                        status = true;
                    }
                    catch (Exception)
                    {
                    }


                }
            }
            return new JsonResult { Data = new { status = status } };
        }

    }
}
