using Nop.Admin.Controllers;
using Nop.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Nop.Admin.Extensions;
using Shopfast.Plugin.Custom.Services;
using Nop.Core;
using MultiSite.Data;
using Nop.Web.Framework.Controllers;
using System.Net.Http;
using Nop.Core.Domain.Catalog;
using System.Web.Script.Serialization;
using Shopfast.Plugin.Custom.Models.NopAdmin.Catalog;
using MultiSite.Models;
using Nop.Services.Directory;
using Nop.Services.Customers;
using Nop.Core.Domain.Customers;
using System.Text;
using Newtonsoft.Json;
using Nop.Services.Localization;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using Shopfast.Plugin.Custom.Models.NopAdmin.MerchantAdmin;
using System.Net;
using System.Collections.Specialized;
using System.Security.Cryptography;
using Nop.Core.Infrastructure;
using Nop.Web.Framework.Themes;
using Nop.Services.Stores;
using Nop.Core.Domain;
using Nop.Services.Configuration;
using Nop.Web.Models.Order;
using Shopfast.Plugin.Custom.Models.NopAdmin.Orders;

namespace Shopfast.Plugin.Custom.Controllers
{
    public class MerchantAdminController : BaseAdminController
    {
        #region Fields
        private readonly IStoreContext _storeContext;
        private readonly IWorkContext _workContext;
        private readonly ICountryService _countryService;
        private readonly IStateProvinceService _stateProvinceService;
        private readonly ICustomerRegistrationService _customerRegistrationService;
        private readonly CustomerSettings _customerSettings;
        private readonly ILocalizationService _localizationService;
        private readonly IStoreService _storeService;
        private readonly ISettingService _settingService;
        #endregion

        #region Ctor

        public MerchantAdminController(IStoreContext storeContext,
            IWorkContext workContext,
            ICountryService countryService,
            IStateProvinceService stateProvinceService,
            ICustomerRegistrationService customerRegistrationService,
            CustomerSettings customerSettings,
            ILocalizationService localizationService,
            IStoreService storeService,
            ISettingService settingService)
        {
            this._settingService = settingService;
            this._storeContext = storeContext;
            this._workContext = workContext;
            this._countryService = countryService;
            this._stateProvinceService = stateProvinceService;
            this._customerRegistrationService = customerRegistrationService;
            this._customerSettings = customerSettings;
            this._localizationService = localizationService;
            this._storeService = storeService;
        }
        #endregion

        #region Utilities
        private string CalculateMD5Hash(string input)
        {
            // step 1, calculate MD5 hash from input
            MD5 md5 = System.Security.Cryptography.MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
            byte[] hash = md5.ComputeHash(inputBytes);
            // step 2, convert byte array to hex string
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("X2"));
            }
            return sb.ToString().ToLower();
        }
        public void ShopfastCRM(JObject element)
        {
            string VtigerCrmApiUrl = "http://crm.shopfast.com/webservice.php";
            string CrmUsername = "bhavik";
            string accessKey = "OegHQRq5X1gPoqHs";
            if (!string.IsNullOrEmpty(VtigerCrmApiUrl) && !string.IsNullOrEmpty(CrmUsername) && !string.IsNullOrEmpty(accessKey))
            {
                // Get Token
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(VtigerCrmApiUrl);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    var tokenResponse = client.GetAsync("?operation=getchallenge&username=" + CrmUsername).Result;
                    if (tokenResponse.IsSuccessStatusCode)
                    {
                        var tokenResult = tokenResponse.Content.ReadAsAsync<VtigerCrmResponse>().Result;
                        if (tokenResult.success)
                        {
                            using (var webclient = new WebClient())
                            {
                                webclient.UseDefaultCredentials = true;
                                webclient.Headers.Add("Content-Type:application/x-www-form-urlencoded");
                                webclient.Headers.Add("Accept:application/json");
                                var uri = new Uri(VtigerCrmApiUrl);

                                NameValueCollection loginParams = new NameValueCollection();
                                loginParams.Add("operation", "login");
                                loginParams.Add("username", CrmUsername);
                                loginParams.Add("accessKey", CalculateMD5Hash(tokenResult.result.token + accessKey));
                                var response = webclient.UploadValues(uri, "POST", loginParams);
                                string jsonResponse = string.Empty;
                                jsonResponse = Encoding.ASCII.GetString(response);
                                var loginResult = JsonConvert.DeserializeObject<VtigerCrmResponse>(jsonResponse);
                                if (loginResult.success)
                                {
                                    //// Retrive entry for already creted entry with id 31x9                                
                                    //var getResponse = client.GetAsync("?operation=retrieve&sessionName=" + loginResult.result.sessionName + "&id=31x9").Result;
                                    //if (getResponse.IsSuccessStatusCode)
                                    //{
                                    //    var getResult = getResponse.Content.ReadAsStringAsync().Result;                                      
                                    //    JObject code = JObject.Parse(getResult);
                                    //    var innerResult = code["result"];
                                    //    innerResult["cf_1092"] = "shopfast test field";
                                    //    string result = code.ToString();

                                    //    // Create project update
                                    //    //NameValueCollection projParams = new NameValueCollection();
                                    //    //projParams.Add("operation", "update");
                                    //    //projParams.Add("sessionName", loginResult.result.sessionName);
                                    //    //projParams.Add("elementType", "Project");
                                    //    //projParams.Add("element", result);
                                    //    //var responseProj = webclient.UploadValues(uri, "POST", projParams); // Here Access denied error is coming
                                    //    //jsonResponse = Encoding.ASCII.GetString(responseProj);
                                    //    //var projResult = JsonConvert.DeserializeObject<VtigerCrmResponse>(jsonResponse);
                                    //}                                                              
                                    element.Add("assigned_user_id", loginResult.result.userId);

                                    NameValueCollection projParams = new NameValueCollection();
                                    projParams.Add("operation", "create");
                                    projParams.Add("sessionName", loginResult.result.sessionName);
                                    projParams.Add("elementType", "Project");
                                    projParams.Add("element", element.ToString());
                                    var responseProj = webclient.UploadValues(uri, "POST", projParams);
                                    jsonResponse = Encoding.ASCII.GetString(responseProj);
                                    var projResult = JsonConvert.DeserializeObject<VtigerCrmResponse>(jsonResponse);
                                }
                            }
                        }
                    }
                }
            }
        }
        #endregion

        public ActionResult MerchantDashboard()
        {
            using (var dbContext = new Sites4Entities())
            {
                var subdomain = MultisiteHelper.SubDomain;
                var site = dbContext.Sites.FirstOrDefault(s => s.StoreName.ToLower() == subdomain.ToLower());
                if (site != null)
                {
                    var owner = dbContext.Owners.FirstOrDefault(o => o.Id == site.Owner_Id);
                    if (owner != null)
                    {
                        ViewBag.firstName = owner.firstName;
                        ViewBag.enail = owner.email;
                        ViewBag.storeName = site.StoreName;
                    }
                    if (Convert.ToBoolean(site.IsOrder))
                    {
                        var siteOrders = dbContext.SiteOrders.Where(so => so.StoreName.ToLower() == subdomain.ToLower());
                        if (siteOrders != null && siteOrders.Any())
                        {
                            // get active order
                            var activeOrder = siteOrders.FirstOrDefault(so => so.IsActive == true);
                            if (activeOrder != null)
                            {
                                ViewBag.PlanDaysLeft = MultisiteHelper.GetStorePlanDaysLeft(activeOrder.PlanExpirationDate);
                                ViewBag.PlanName = activeOrder.PackageName;
                                return View();
                            }
                        }
                    }
                    else
                    {
                        ViewBag.TrialDaysLeft = MultisiteHelper.GetStoreTrialDaysLeft(site.CreationDate);
                    }
                }
            }
            ViewBag.PlanDaysLeft = -1;
            return View();
        }
        [AdminAuthorize]
        public ActionResult StorePlans()
        {
            ProductRespose productRespose = new ProductRespose();
            var client = new HttpClient();
            //HttpResponseMessage response = client.GetAsync("https://shopfast.net/sf_api/service.svc/json/getproducts").Result;
            HttpResponseMessage response = client.GetAsync("http://shopfast.net/api/v1/catalog/products/app-products").Result;
            if (response.IsSuccessStatusCode)
            {
                var productsString = response.Content.ReadAsStringAsync().Result;
                JavaScriptSerializer js = new JavaScriptSerializer();
                var products = js.Deserialize<List<AppProductListModel>>(productsString);

                if (products != null && products.Any())
                {
                    products = products.Where(p => p.ProductSpecificationAttributes != null
                        && p.ProductSpecificationAttributes.Any(ps => ps.AttributeName.ToLower() == "ispackage" && ps.ValueRaw.ToLower() == "yes")
                        ).ToList();
                    foreach (var product in products)
                    {
                        if (product.ProductSpecificationAttributes.Any(ps => ps.AttributeName.ToLower() == "pricing" && ps.ValueRaw.ToLower() == "monthly"))
                        {
                            if (product.ProductSpecificationAttributes.Any(ps => ps.AttributeName.ToLower() == "most_popular" && ps.ValueRaw.ToLower() == "yes"))
                            {
                                product.IsMostPopular = true;
                            }
                            productRespose.MonthlyPackageList.Add(product);
                        }
                        else if (product.ProductSpecificationAttributes.Any(ps => ps.AttributeName.ToLower() == "pricing" && ps.ValueRaw.ToLower() == "yearly"))
                        {
                            if (product.ProductSpecificationAttributes.Any(ps => ps.AttributeName.ToLower() == "most_popular" && ps.ValueRaw.ToLower() == "yes"))
                            {
                                product.IsMostPopular = true;
                            }
                            productRespose.YearlyPackageList.Add(product);
                        }
                    }
                }

                // Temparary code to filter packages. Here need to filter "IsPackage".
                //List<int> ids = new List<int>();
                //ids.Add(112); // BASIC
                //ids.Add(113); // STANDARD
                //ids.Add(114); // PROFESSIONAL
                //ids.Add(115); // PREMIUM
                //productRespose.GetProductsResult = products.Where(p => ids.Contains(p.Id)).OrderBy(p => p.Id).ToList();
            }

            return View(productRespose);
        }

        [AdminAuthorize]
        public ActionResult StoreCheckout(int productId,string planType = "monthly")
        {
            StoreCheckoutModel checkoutModel = new StoreCheckoutModel();
            checkoutModel.PlanType = planType;
            var client = new HttpClient();
            // Here Need to call GetProductById API, Need from Sanjay
            HttpResponseMessage response = client.GetAsync("http://shopfast.net/api/v1/catalog/products/app-products").Result;
            if (response.IsSuccessStatusCode)
            {
                var productsString = response.Content.ReadAsStringAsync().Result;
                JavaScriptSerializer js = new JavaScriptSerializer();
                var products = js.Deserialize<List<AppProductListModel>>(productsString);

                if (products != null && products.Any())
                {
                    checkoutModel.product = products.SingleOrDefault(p => p.Id == productId);
                    if (checkoutModel.product != null && checkoutModel.product.ProductAttributes != null
                        && checkoutModel.product.ProductAttributes.Any(pa => pa.Name.ToLower() == "subscription" && pa.AttributeControlType.ToLower() == "radiolist" && pa.Values != null && pa.Values.Any()))
                    {
                        checkoutModel.ProductAttributes = checkoutModel.product.ProductAttributes.ToList();
                    }
                }

                var subdomain = MultisiteHelper.SubDomain;
                if (!string.IsNullOrEmpty(subdomain))
                {
                    using (var dbContext = new Sites4Entities())
                    {
                        var site = dbContext.Sites.FirstOrDefault(s => s.StoreName.ToLower() == subdomain.ToLower());
                        if (site != null)
                        {
                            var owner = dbContext.Owners.FirstOrDefault(o => o.Id == site.Owner_Id);
                            if (owner != null)
                            {
                                checkoutModel.ownerModel.firstName = owner.firstName;
                                checkoutModel.ownerModel.lastName = owner.LastName;
                                checkoutModel.ownerModel.StreetAddress = owner.StreetAddress;
                                checkoutModel.ownerModel.City = owner.City;
                                checkoutModel.ownerModel.ZipPostalCode = owner.ZipPostalCode;
                                checkoutModel.ownerModel.Country = _countryService.GetAllCountries().FirstOrDefault(c => c.Name == owner.Country).Name;
                                checkoutModel.ownerModel.State = _stateProvinceService.GetStateProvinces().FirstOrDefault(c => c.Name == owner.State).Name;
                                checkoutModel.ownerModel.email = owner.email;
                                checkoutModel.ownerModel.siteId = site.Id;
                            }
                        }
                    }
                }
            }
            return View(checkoutModel);
        }

        [HttpPost]
        public ActionResult StoreCheckout(StoreCheckoutModel model, string subscriptionRadio)
        {
            #region Verify Password - currently we do need
            //var loginResult =
            //        _customerRegistrationService.ValidateCustomer(
            //            _customerSettings.UsernamesEnabled ? _workContext.CurrentCustomer.Username : _workContext.CurrentCustomer.Username, model.password);
            #endregion

            //if (loginResult == CustomerLoginResults.Successful)
            //{
            #region Checkout Transaction by API
            CheckoutTransaction request = new CheckoutTransaction();
            // POST API
            string month = "";
            string year = "";
            if (!string.IsNullOrEmpty(model.Expires))
            {
                string[] expires = model.Expires.Split('/');
                if (expires != null && expires.Any())
                    month = expires[0].Trim();
                if (expires.Count() > 1)
                    year = expires[1].Trim();
            }
            if (!string.IsNullOrEmpty(model.cardNumber))
            {
                model.cardNumber = model.cardNumber.Replace(" ", "");
            }

            string[] subscription = subscriptionRadio.Split('~');
            string subscriptionId = string.Empty;
            double subscriptionPrice = 0;
            if (subscription != null && subscription.Any())
            {
                subscriptionId = subscription[0];
                if (subscription.Count() > 1)
                {
                    subscriptionPrice = Convert.ToDouble(subscription[1]);
                }
            }

            request.Products = model.product.Id.ToString();
            request.Quantities = "1";
            request.TotalAmount = Convert.ToDouble(model.product.Price) + subscriptionPrice;
            request.Email = model.ownerModel.email;
            request.CardType = "Visa";
            request.CardName = "test";
            request.CardNumber = model.cardNumber;
            request.ExpiryMonth = month;
            request.ExpiryYear = year;
            request.VerifyCode = model.CVV;
            request.TransactionType = "card";
            request.UseRewardPoints = false;
            request.Attributes = subscriptionId;
            request.IsWebOrder = true;

            var jsonString = JsonConvert.SerializeObject(request);
            var element = new JObject();
            element["Data"] = jsonString;
            byte[] byteData = Encoding.UTF8.GetBytes("{body}");
            byteData = Encoding.UTF8.GetBytes(element.ToString());

            using (var contentPayment = new ByteArrayContent(byteData))
            {
                contentPayment.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                var client = new HttpClient();
                var responsePayment = client.PostAsync("http://shopfast.net/sf_API/Service.svc/Json/CheckoutTransaction", contentPayment).Result;
                if (responsePayment.IsSuccessStatusCode)
                {
                    var checkoutResponse = responsePayment.Content.ReadAsAsync<CheckoutResponse>().Result;
                    if (checkoutResponse.CheckoutTransactionResult.Status)
                    {
                        // If success then change store creted date based on selected package
                        // Make store "Purchased" from "Trial" based on "IsOrder" field                        
                        using (var dbContext = new Sites4Entities())
                        {
                            var site = dbContext.Sites.FirstOrDefault(s => s.Id == model.ownerModel.siteId);
                            var siteupdate = site;
                            if (site != null)
                            {
                                var owner = dbContext.Owners.FirstOrDefault(o => o.Id == site.Owner_Id);
                                //site.CreationDate = DateTime.UtcNow.AddDays(days); // no need to update creation date for purchased store
                                site.IsOrder = true;
                                site.Owner = owner;
                                dbContext.Entry(site).CurrentValues.SetValues(siteupdate);

                                //Add this order to SiteOrders and make other orders IsActive to false for this store.
                                var existingSiteOrders = dbContext.SiteOrders.Where(so => so.StoreName.ToLower() == site.StoreName.ToLower());
                                if (existingSiteOrders != null && existingSiteOrders.Any())
                                {
                                    foreach (var order in existingSiteOrders)
                                    {
                                        var orderUpdate = order;
                                        order.IsActive = false;
                                        dbContext.Entry(order).CurrentValues.SetValues(orderUpdate);
                                    }
                                }
                                SiteOrders siteOrder = new SiteOrders()
                                {
                                    StoreName = site.StoreName,
                                    PackageId = model.product.Id,
                                    PackageName = model.product.Name,
                                    OrderId = checkoutResponse.CheckoutTransactionResult.OrderId,
                                    IsActive = true,
                                    CreationDate = DateTime.UtcNow,
                                    PlanExpirationDate = (model.PlanType == "monthly") ? DateTime.UtcNow.AddDays(30) : DateTime.UtcNow.AddDays(365) // this for yearly
                                };
                                dbContext.SiteOrders.Add(siteOrder);
                                dbContext.SaveChanges();
                            }
                        }
                        SuccessNotification(_localizationService.GetResource("Admin.Store.Merchant.Checkout.Completed"));
                        return Redirect("/Admin");
                    }
                    else
                    {
                        ErrorNotification(_localizationService.GetResource("Admin.Store.Merchant.Checkout.InCompleted") + ". " + checkoutResponse.CheckoutTransactionResult.Message);
                    }
                }
            }
            #endregion
            //}
            //else
            //{
            //    ErrorNotification("Invalid password");
            //    // Wrong password error notification
            //}
            return Redirect("/Admin/store-checkout/" + model.product.Id);
        }

        [AdminAuthorize]
        public ActionResult StoreTheme()
        {
            return View();
        }

        [AdminAuthorize]
        public ActionResult StoreDomains()
        {
            return View();
        }

        [AdminAuthorize]
        public ActionResult StoreBuyDomain()
        {
            return View();
        }

        [AdminAuthorize]
        public ActionResult StoreHireExpert()
        {
            return View();
        }

        [AdminAuthorize]
        public ActionResult StoreHireExpertForm(int group = 1, int steps = 4) // dont include confirm step (last step) in "steps"
        {
            CRMModel model = new CRMModel();
            model.ControlFieldList = model.ControlFieldList.Where(c => c.Group == group).ToList();
            model.CurrentGroup = group;
            model.Steps = steps;
            return View(model);
        }

        [HttpPost]
        public ActionResult StoreHireExpertForm(CRMModel model, string btnSummary, string btnSubmit)
        {
            //https://stackoverflow.com/questions/19743718/how-to-create-dynamic-radio-buttons-in-mvc-razor  
            //http://www.tutorialsteacher.com/mvc/htmlhelper-radiobutton-radiobuttonfor  
            //http://www.c-sharpcorner.com/UploadFile/4d9083/binding-radiobutton-and-radiobuttonlist-in-various-way-in-mv201/ 
            if (!string.IsNullOrEmpty(btnSummary))
            {
                List<SummaryReport> summaryList = new List<SummaryReport>();
                if (model != null)
                {
                    if (model.ControlFieldList != null && model.ControlFieldList.Any())
                    {
                        foreach (var control in model.ControlFieldList)
                        {
                            switch (control.Type)
                            {
                                case ControlType.Textbox:
                                case ControlType.Textarea:
                                case ControlType.Dropdown:
                                case ControlType.Radio:
                                    if (!string.IsNullOrEmpty(control.FieldValue))
                                        summaryList.Add(new SummaryReport() { question = control.Label, answer = control.FieldValue });
                                    break;
                                case ControlType.Checkbox:
                                    List<string> itemList = new List<string>();
                                    foreach (var item in control.ControlOptionList)
                                    {
                                        if (item.OptionValue)
                                        {
                                            itemList.Add(item.Label);
                                        }
                                    }
                                    if (itemList.Any())
                                    {
                                        summaryList.Add(new SummaryReport() { question = control.Label, answer = string.Join(" , ", itemList) });
                                    }
                                    break;
                                default:
                                    if (!string.IsNullOrEmpty(control.FieldValue))
                                        summaryList.Add(new SummaryReport() { question = control.Label, answer = control.FieldValue });
                                    break;
                            }
                        }
                    }
                }
                return Json(new { html = RenderPartialViewToString("HireExpertSummary", summaryList) });
            }
            else
            {
                if (model != null)
                {
                    if (model.ControlFieldList != null && model.ControlFieldList.Any())
                    {
                        dynamic element = new JObject();
                        element.Add("projectname", MultisiteHelper.SubDomain);
                        element.Add("cf_1096", "Brand and visual content"); // Category
                        element.Add("cf_1098", "Develop a brand strategy"); // Goal
                        element.Add("description", "Brand and visual content. <br> Develop a brand strategy. <br> {Goal description} <br> Competitive analysis, brand story, brand personality."); // {Category} -> {Goal} -> {Goal description}
                        element.Add("projectstatus", "in progress");
                        foreach (var control in model.ControlFieldList)
                        {
                            switch (control.Type)
                            {
                                case ControlType.Textbox:
                                case ControlType.Textarea:
                                case ControlType.Dropdown:
                                case ControlType.Radio:
                                    if (!string.IsNullOrEmpty(control.FieldValue))
                                        element.Add(control.CRMField, control.FieldValue);
                                    break;
                                case ControlType.Checkbox:
                                    List<string> itemList = new List<string>();
                                    foreach (var item in control.ControlOptionList)
                                    {
                                        if (item.OptionValue)
                                        {
                                            itemList.Add(item.Label);
                                        }
                                    }
                                    if (itemList.Any())
                                    {
                                        element.Add(control.CRMField, string.Join(" |##| ", itemList));
                                    }
                                    break;
                                default:
                                    if (!string.IsNullOrEmpty(control.FieldValue))
                                        element.Add(control.CRMField, control.FieldValue);
                                    break;
                            }
                        }
                        ShopfastCRM(element);
                    }
                }
                return Json(new { url = "/Admin/store-hireexpert" });
            }
        }

        #region Theme Related Methods
        public ActionResult AvailableThemes()
        {
            var AvailableStoreThemesForDesktops = EngineContext.Current.Resolve<IThemeProvider>()
                            .GetThemeConfigurations();

            List<Theme> AvailableThemeList = new List<Theme>();
            if (AvailableStoreThemesForDesktops.Count() > 0)
            {
                using (var dbContext = new Sites4Entities())
                {
                    string storeName = MultisiteHelper.SubDomain;
                    var AvailableStoreTheme = dbContext.SitesThemes
                                .Where(st => st.StoreName == storeName && st.IsMobileTheme == false).ToList();
                    AvailableStoreThemesForDesktops = AvailableStoreThemesForDesktops.Where(at => !AvailableStoreTheme.Any(ast => ast.ThemeName == at.ThemeName)).ToList();
                }
                AvailableThemeList = AvailableStoreThemesForDesktops.Select(t => new Theme
                {
                    Name = t.ThemeTitle,
                    Value = t.ThemeName,
                    PreviewImageUrl = t.PreviewImageUrl,
                    PreviewText = t.PreviewText,
                }).ToList();
            }
            return PartialView(AvailableThemeList);
        }

        private List<Theme> GetStoreThemes()
        {
            string storeName = MultisiteHelper.SubDomain;
            List<Theme> AvailableThemeList = new List<Theme>();
            using (var dbContext = new Sites4Entities())
            {
                var AvailableStoreTheme = dbContext.SitesThemes
                            .Where(st => st.StoreName == storeName && st.IsMobileTheme == false).ToList();
                if (AvailableStoreTheme != null && AvailableStoreTheme.Any())
                {
                    var AvailableStoreThemesForDesktops = EngineContext.Current.Resolve<IThemeProvider>()
                               .GetThemeConfigurations();
                    if (AvailableStoreThemesForDesktops.Count() > 0)
                    {
                        AvailableStoreThemesForDesktops = AvailableStoreThemesForDesktops.Where(at => AvailableStoreTheme.Any(ast => ast.ThemeName == at.ThemeName)).ToList();
                        if (AvailableStoreThemesForDesktops.Any())
                        {
                            AvailableThemeList = AvailableStoreThemesForDesktops.Select(t => new Theme
                            {
                                Name = t.ThemeTitle,
                                Value = t.ThemeName,
                                PreviewImageUrl = t.PreviewImageUrl,
                                PreviewText = t.PreviewText,
                            }).ToList();
                        }
                    }
                }
            }
            return AvailableThemeList;
        }
        public ActionResult AvailableStoreThemes()
        {
            return PartialView(GetStoreThemes());
        }

        [HttpPost]
        public ActionResult AddStoreTheme(List<string> chkThemes)
        {
            if (chkThemes != null && chkThemes.Any())
            {
                using (var dbContext = new Sites4Entities())
                {
                    if (chkThemes == null) chkThemes = new List<string>();
                    string storeName = MultisiteHelper.SubDomain;
                    var AvailableStoreTheme = dbContext.SitesThemes
                            .Where(st => st.StoreName == storeName && st.IsMobileTheme == false).ToList();
                    //foreach (var item in AvailableStoreTheme)
                    //{
                    //    if (item != null)
                    //    {
                    //        if (!chkThemes.Contains(item.ThemeName))
                    //        {
                    //            dbContext.Entry(item).State = System.Data.Entity.EntityState.Deleted;
                    //            dbContext.SaveChanges();
                    //        }
                    //    }
                    //}
                    for (int i = 0; i < chkThemes.Count(); i++)
                    {
                        if (!AvailableStoreTheme.Exists(t => t.ThemeName == chkThemes[i]))
                        {
                            SitesTheme sitetheme = new SitesTheme
                            {
                                StoreName = storeName,
                                TemplateName = "Template",
                                ThemeName = chkThemes[i],
                                IsMobileTheme = false,
                                CreationDate = DateTime.Now
                            };
                            dbContext.SitesThemes.Add(sitetheme);
                            dbContext.SaveChanges();
                        }
                    }
                    // AvailableStoreThemes will be a partial view to show store theme
                    // it gets all theme list from SitesTheme table for this store
                    return Json(new { success = true, message = "Theme is added successfully", html = RenderPartialViewToString("/Plugins/Shopfast.Plugin.Custom/Views/MerchantAdmin/AvailableStoreThemes.cshtml", GetStoreThemes()) });
                }
            }
            else
            {
                return Json(new { success = false, message = "Please select a theme." });
            }
        }

        [AdminAuthorize]
        [HttpPost]
        public ActionResult StoreThemeAction(string action, string themeValue)
        {
            if (!string.IsNullOrEmpty(themeValue))
            {
                if (action == "default")
                {
                    //load settings for a chosen store scope
                    var storeScope = this.GetActiveStoreScopeConfiguration(_storeService, _workContext);
                    //store information settings
                    var storeInformationSettings = _settingService.LoadSetting<StoreInformationSettings>(storeScope);
                    storeInformationSettings.DefaultStoreTheme = themeValue;
                    _settingService.SaveSetting(storeInformationSettings, x => x.DefaultStoreTheme, storeScope, true);
                    return Json(new { success = true, message = "Theme is set as default successfully", html = RenderPartialViewToString("/Plugins/Shopfast.Plugin.Custom/Views/MerchantAdmin/AvailableStoreThemes.cshtml", GetStoreThemes()) });
                }
                else if (action == "remove")
                {
                    using (var dbContext = new Sites4Entities())
                    {
                        string storeName = MultisiteHelper.SubDomain;
                        var siteTheme = dbContext.SitesThemes
                           .FirstOrDefault(st => st.StoreName == storeName && st.ThemeName == themeValue);
                        if (siteTheme != null)
                        {
                            dbContext.Entry(siteTheme).State = System.Data.Entity.EntityState.Deleted;
                            dbContext.SaveChanges();
                            return Json(new { success = true, message = "Theme is removed from the store successfully", html = RenderPartialViewToString("/Plugins/Shopfast.Plugin.Custom/Views/MerchantAdmin/AvailableStoreThemes.cshtml", GetStoreThemes()) });
                        }
                    }
                }
            }
            return Json(new { success = false, message = "Theme action failed." });
        }

        #endregion

        #region Package Order
        [AdminAuthorize]
        public ActionResult PackageOrders()
        {
            CustomerOrderListModelCustom model = new CustomerOrderListModelCustom();
            var subdomain = MultisiteHelper.SubDomain;
            if (!string.IsNullOrEmpty(subdomain))
            {
                using (var dbContext = new Sites4Entities())
                {
                    var siteOrder = dbContext.SiteOrders.Where(s => s.StoreName.ToLower() == subdomain.ToLower());
                    if (siteOrder != null)
                    {
                        var client = new HttpClient();
                        HttpResponseMessage response = client.GetAsync("http://shopfast.net/api/v1/sales/online-orders/").Result;
                        if (response.IsSuccessStatusCode)
                        {
                            var orderString = response.Content.ReadAsStringAsync().Result;
                            JavaScriptSerializer js = new JavaScriptSerializer();
                            var order = js.Deserialize<List<CustomerOrderListModelCustom.OrderDetailsModel>>(orderString);
                            order = order.Where(o => siteOrder.Any(so => so.OrderId == o.Id)).OrderByDescending(o => o.CreatedOn).ToList();
                            order.ForEach(o =>
                            {
                                o.IsActive = siteOrder.FirstOrDefault(so => so.OrderId == o.Id).IsActive;
                            });
                            model.Orders = order;
                        }
                    }
                }
            }
            return View(model);
        }

        public ActionResult PackageOrderDetail(int orderId)
        {
            OrderDetailsModel model = new OrderDetailsModel();
            //var subdomain = MultisiteHelper.SubDomain;
            //if (!string.IsNullOrEmpty(subdomain))
            //{
            using (var dbContext = new Sites4Entities())
            {
                //var siteOrder = dbContext.SiteOrders.FirstOrDefault(s => s.StoreName.ToLower() == subdomain.ToLower() && s.IsActive == true);
                //if (siteOrder != null)
                //{
                var client = new HttpClient();
                HttpResponseMessage response = client.GetAsync("http://shopfast.net/api/v1/sales/online-orders/" + orderId).Result;
                if (response.IsSuccessStatusCode)
                {
                    var orderString = response.Content.ReadAsStringAsync().Result;
                    JavaScriptSerializer js = new JavaScriptSerializer();
                    model = js.Deserialize<OrderDetailsModel>(orderString);
                }
                //}
            }
            //}
            return View(model);
        }
        #endregion
    }
}