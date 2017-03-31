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
    public class SuggestionsController : Controller
    {
        // GET: Suggestions
        public ActionResult Suggestions()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Suggestions(FormCollection ff)
        {
            return View();
        }


        public ActionResult HollandSuggest()
        {
            return View();
        }

        public ActionResult stopTender(string numTender)
        {

            try
            {
                using (DbtenderEntities1 DB = new DbtenderEntities1())
                {
                    var tender = DB.Tenders.Find(Convert.ToInt32(numTender));
                    tender.status = "סגור";
                    DB.SaveChanges();
                }
            }
            catch (Exception) { }
            return View();
        }
        public ActionResult updateTender(Tenders t)
        {

            try
            {
                using (DbtenderEntities1 DB = new DbtenderEntities1())
                {
                    var tender = DB.Tenders.Find(Convert.ToInt32(t.numTender));
                    tender.status = "סגור";
                    tender.winner = t.winner;
                    tender.till = t.till;
                    DB.SaveChanges();
                }
            }
            catch (Exception) { }
            return View();
        }
        public ActionResult ChangePrice(int numtender)
        {
            DateTime dt = DateTime.Now;
            List<ProducToTender> products = new List<ProducToTender>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                products = DB.ProducToTender.Where(a => a.numTender.Equals(numtender)).OrderBy(a => a.numTender).ToList();
            }
            //  return Json(ProducToTender, JsonRequestBehavior.AllowGet);
            if (products != null)
            {
                try


                {
                    foreach (var item in products)
                    {

                        using (DbtenderEntities1 DB = new DbtenderEntities1())
                        {
                            var tender = DB.ProducToTender.Find((item.TenderDetailsID));

                            tender.PriceUpdate = item.PriceUpdate - (float)item.sizeRoomy;
                            tender.DateUpdate = dt;
                            DB.SaveChanges();
                        }
                    }
                }


                catch (Exception) { }
            }
            return View();
        }
        public ActionResult getSuggestionDetail(int numTender)
        {

            DbtenderEntities1 DB = new DbtenderEntities1();


            var status = from t in DB.Tenders
                         where t.numTender == numTender
                         select t.status;
            if (status.ToList()[0].ToString().Contains("סגור"))
            {
                return Json("close", JsonRequestBehavior.AllowGet);

            }

            //return View();
            var result = from p in DB.ProducToTender
                         join t in DB.Tenders on p.numTender equals t.numTender
                         where p.numTender == numTender
                         orderby p.NameProduct
                         select new { p.numProduct, p.NameProduct, p.Amount, p.PriceUpdate, p.sizeRoomy };


            //return View();

            return Json(result.Distinct().ToList(), JsonRequestBehavior.AllowGet);

        }
        public JsonResult save(string str)
        {
            return Json("success:saved", JsonRequestBehavior.AllowGet);
        }



        //[HttpPost]
        //public JsonResult save(Suggestions s1)
        //{
        //    bool status = false;
        //    TimeSpan dateOrgF;
        //    var isValidDateFrom = DateTime.TryParseExact(s1.timeSuggestion.ToString(), "mm-dd-yyyy", null, System.Globalization.DateTimeStyles.None, out dateOrgF);
        //    if (isValidDateFrom)
        //    {
        //        s1.timeSuggestion = dateOrgF;
        //    }


        //    var isValidModel = TryUpdateModel(s1);
        //    if (isValidModel)
        //    {
        //        using (DbtenderEntities DB = new DbtenderEntities())
        //        {
        //            //foreach (var item in Tenders.ProducToTender)
        //            //{
        //            //    DB.ProducToTender.Add(item) ;
        //            //}
        //            //DB.SaveChanges();

        //            DB.Suggestions .Add(s1);
        //            DB.SaveChanges();
        //            status = true;

        //        }
        //    }
        //    return new JsonResult { Data = new { status = status } };
        //}

        public ActionResult getTender(int numTender)
        {

            List<Tenders> Tender = new List<Tenders>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                Tender = DB.Tenders.Where(a => a.numTender.Equals(numTender)).OrderBy(a => a.numTender).ToList();
            }
            foreach (var item in Tender)
            {
                if((item.status).Contains(("סגור")))
                 return Json("close", JsonRequestBehavior.AllowGet);

            }
            
             
            return Json(Tender, JsonRequestBehavior.AllowGet);

        }
        public ActionResult getProduct(int numTender)
        {
            int max = getSuggestionsMax(numTender);
            DbtenderEntities1 DB = new DbtenderEntities1();


            var result = from s in DB.SuggestionDetail
                         join p in DB.ProducToTender on s.numproduct equals p.numProduct
                         join s1 in DB.Suggestions on s.numsuggest equals s1.numSuggestion

                         join t in DB.Tenders on p.numTender equals t.numTender
                         where p.numTender == numTender
                         where s.numsuggest == max
                         where p.numProduct == s.numproduct
                         select new { s.priceToProduct, s.numproduct, p.sizeRoomy,p.Amount,p.NameProduct,p.weight,t.hourFinish ,t.till,s1.timeSuggestion,s1.dataSuggestion};

            return Json(result.Distinct().ToList(), JsonRequestBehavior.AllowGet);

        }
        public ActionResult getType(int numType)
        {
            List<TypeTender> type = new List<TypeTender>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                type = DB.TypeTender.Where(a => a.numType.Equals(numType)).OrderBy(a => a.nameType).ToList();
            }

            return Json(type, JsonRequestBehavior.AllowGet);
        }

        public ActionResult getSuggestion(int numTender)
        {

            List<Suggestions> products = new List<Suggestions>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                products = DB.Suggestions.Where(a => a.numTender.Equals(numTender)).OrderBy(a => a.numSuggestion).ToList();
            }
            return Json(products, JsonRequestBehavior.AllowGet);

        }

        public ActionResult allSuggestion(int numTender)
        {

            //if (Request.QueryString["id"] == null)
            //    return View();
            //int id = Convert.ToInt32(Request.QueryString["id"]);
            DbtenderEntities1 DB = new DbtenderEntities1();

            var result = from t in DB.Tenders
                         join s in DB.Suggestions on t.numTender equals s.numTender
                         join s1 in DB.SuggestionDetail on s.numSuggestion equals s1.numsuggest
                         join p in DB.ProducToTender on t.numTender equals p.numTender

                         where t.numTender == numTender
                         orderby s1.numproduct
                         select new { t.numTender, s1.numproduct, p.PriceUpdate, p.sizeRoomy };





            //return View();

            return Json(result.ToList(), JsonRequestBehavior.AllowGet);

        }

        public ActionResult getPrice(int numSuggestion)
        {

            List<SuggestionDetail> products = new List<SuggestionDetail>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                products = DB.SuggestionDetail.Where(a => a.numsuggest.Equals(numSuggestion)).OrderBy(a => a.priceToProduct).ToList();
            }
            return Json(products, JsonRequestBehavior.AllowGet);

        }

        public JsonResult getAllSuggestions(int numtender)
        {
            List<Suggestions> suggestion = new List<Suggestions>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                suggestion = DB.Suggestions.Where(a => a.numTender.Equals(numtender)).OrderBy(a => a.numSuggestion).ToList();
            }
            return new JsonResult { Data = suggestion, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult getSuggestionDetails1(int numsuggestion)
        {
            List<SuggestionDetail> suggestionDetail = new List<SuggestionDetail>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                suggestionDetail = DB.SuggestionDetail.Where(a => a.numDetailSuggestion.Equals(numsuggestion)).OrderBy(a => a.numDetailSuggestion).ToList();
            }
            return new JsonResult { Data = suggestionDetail, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public ActionResult getSizeRoomy(int numTender)
        {
            DbtenderEntities1 DB = new DbtenderEntities1();

            var result = from p in DB.ProducToTender
                         where p.numTender == numTender
                         orderby p.numProduct
                         select new { p.numProduct, p.sizeRoomy };

            return Json(result.ToList(), JsonRequestBehavior.AllowGet);

        }

        public ActionResult Loadtime(int numtender)
        {
            DbtenderEntities1 DB = new DbtenderEntities1();

            var result = from p in DB.ProducToTender
                         join t in DB.Tenders on p.numTender equals t.numTender
                         where p.numTender == numtender
                         select new { p.DateUpdate, t.time_update };

            //   var t=(Convert.ToDateTime(result));
            //  var tender = DB.Tenders.Find(Convert.ToInt32(numTender));

            // var s =t.ToString.conver
            //return View();
            //   DateTime dt = result.ToList.;
            return Json(result.Distinct().ToList(), JsonRequestBehavior.AllowGet);
        }
        public int getSuggestionsMax(int numTender)
        {
            int max = 0;
            int convertMax;
            List<Suggestions> suggestion = new List<Suggestions>();
            DbtenderEntities1 DB1 = new DbtenderEntities1();

          

            //return View();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                suggestion = DB.Suggestions.Where(a => a.numTender.Equals(numTender)).OrderBy(a => a.numTender).ToList();
            }
            if (suggestion != null)
            {
                try

                {
                    foreach (var item in suggestion)
                    {

                        using (DbtenderEntities1 DB = new DbtenderEntities1())
                        {
                            var numSuggestion = DB.Suggestions.Find((item.numSuggestion));
                            //   var tender = DB.Suggestions.Find((item.numTender));
                            convertMax = Convert.ToInt32(numSuggestion.numSuggestion);
                            if (convertMax > max)
                                max = convertMax;
                        }
                    }
                }
                catch (Exception) { }

            }
            //using (DbtenderEntities1 DB = new DbtenderEntities1())
            //{
            //    suggestionDetail = DB.SuggestionDetail.Where(a => a.numsuggest.Equals(max)).OrderBy(a => a.numDetailSuggestion).ToList();
            //}
            ////  retu
            return max;
        }
        public ActionResult findLastDetail()
        {
     
            int num = 0;
            DbtenderEntities1 DB = new DbtenderEntities1();

            List<SuggestionDetail> result = DB.SuggestionDetail.ToList();
            num = result.Count + 1;

            return Json(num, JsonRequestBehavior.AllowGet);

        }



        [HttpPost]
        public JsonResult saveDetail(SuggestionDetail s2)
        {

            bool status = false;
            var isValidModel = TryUpdateModel(s2);
            if (isValidModel)
            {
                using (DbtenderEntities1 DB = new DbtenderEntities1())
                {


                    DB.SuggestionDetail.Add(s2);
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

        [HttpPost]
        public JsonResult saving(Suggestions s1)
        {
            bool status = false;
            var isValidModel = TryUpdateModel(s1);
            if (isValidModel)
            {
                using (DbtenderEntities1 DB = new DbtenderEntities1())
                {


                    DB.Suggestions.Add(s1);
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

        [HttpPost]
        public JsonResult save(Suggestions s1)
        {
            //  List<Suggestions> s2 = new List<Suggestions>();
           Suggestions s2;
            s2 = s1;
            //s2.numSuggestion = 0;
            //s2.numTender = 0;
            //s2.numCont = 0;
            //s2.numSuggestion = s1.numSuggestion;
            //s2.numTender = s1.numTender;
            //s2.numCont = s1.numCont;
            //s2.priceToproduct = s1.priceToproduct;
            bool status = false;
            //var isValidModel = TryUpdateModel(s2);
            //if (isValidModel)
            //{
                using (DbtenderEntities1 DB = new DbtenderEntities1())
                {


                    DB.Suggestions.Add(s2);
                    try
                    {
                        DB.SaveChanges();
                    }
                    catch (Exception)
                    {
                    }

                    status = true;
                }
        //    }
            return new JsonResult { Data = new { status = status } };
        }

        public ActionResult findLastSuggest()
        {
            int num = 0;
            DbtenderEntities1 DB = new DbtenderEntities1();

            List<Suggestions> result = DB.Suggestions.ToList();
            num = result.Count + 1;

            return Json(num, JsonRequestBehavior.AllowGet);

        }



        public JsonResult getSuggestionMax(int numTender)
        {
 
            int max = 0;
            int convertMax;
            List<Suggestions> suggestion = new List<Suggestions>();
            DbtenderEntities1 DB1 = new DbtenderEntities1();

            var status = from t in DB1.Tenders
                         where t.numTender == numTender
                         select t.status;
            if (status.ToList()[0].ToString().Contains("סגור"))
            {
                return Json("close", JsonRequestBehavior.AllowGet);

            }

            //return View();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                suggestion = DB.Suggestions.Where(a => a.numTender.Equals(numTender)).OrderBy(a => a.numTender).ToList();
            }
             if (suggestion != null)
            {
                try

                {
                    foreach (var item in suggestion)
                    {

                        using (DbtenderEntities1 DB = new DbtenderEntities1())
                        {
                            var numSuggestion = DB.Suggestions.Find((item.numSuggestion));
                            //   var tender = DB.Suggestions.Find((item.numTender));
                            convertMax = Convert.ToInt32(numSuggestion.numSuggestion);
                            if (convertMax > max)
                                max = convertMax;
                        }
                    }
                }
                catch (Exception) { }

            }

         
            var result = from s in DB1.SuggestionDetail
                         join p in DB1.ProducToTender on s.numproduct equals p.numProduct
                         where p.numTender==numTender
                          where  s.numsuggest == max 
                          where p.numProduct==s.numproduct
                         select new {  s.priceToProduct, s.numproduct, p.sizeRoomy ,p.weight};

            return Json(result.Distinct().ToList(), JsonRequestBehavior.AllowGet);

        }

 







    



    }
}
