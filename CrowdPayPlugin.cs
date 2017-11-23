using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Routing;
using Nop.Core;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Common;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Messages;
using Nop.Core.Plugins;
using Nop.Services.Catalog;
using Nop.Services.Common;
using Nop.Services.Configuration;
using Nop.Services.Customers;
using Nop.Services.Localization;
using Nop.Services.Messages;
using ShopFast.Plugin.BD.CrowdPay.Common;
using ShopFast.Plugin.BD.CrowdPay.Data;
using Nop.Web.Framework.Menu;
using Nop.Core.Infrastructure;

namespace ShopFast.Plugin.BD.CrowdPay
{
    /// <summary>
    /// PLugin
    /// </summary>
    public class CrowdPayPlugin : BasePlugin, IMiscPlugin, IAdminMenuPlugin
    {
        private const string ProductTemplateName = "Omnisoft crowd";
        private const string ProductTemplateViewPath =
            "~/Plugins/BD.CrowdPay/Views/CrowdPay/ProductTemplate/ProductTemplate.CrowdPay.cshtml";

        private readonly ISettingService _settingService;
        private readonly IProductTemplateService _productTemplateService;
        private readonly ICustomerAttributeService _customerAttributeService;
        private readonly IAddressAttributeService _addressAttributeService;
        private readonly ISpecificationAttributeService _specificationAttributeService;
        private readonly IMessageTemplateService _messageTemplateService;
        private readonly IStoreContext _storeContext;

        private readonly IList<string> _customerAttributeList = new List<string> { ClientConstants.CustomAttributes.InvestorType, ClientConstants.CustomAttributes.AccreditedQualify, ClientConstants.CustomAttributes.AnnualIncome, ClientConstants.CustomAttributes.BackUpWithholding, ClientConstants.CustomAttributes.NetWorth, ClientConstants.CustomAttributes.PersonalInfoType, ClientConstants.CustomAttributes.TaxId };
        private readonly IList<string> _addressAttributeList = new List<string> { ClientConstants.CustomAttributes.CompanyAddress, ClientConstants.CustomAttributes.ContactName, ClientConstants.CustomAttributes.RegionFormedIn, ClientConstants.CustomAttributes.VestingName };

        private readonly BDObjectContext _objectContext;
        public CrowdPayPlugin(ISettingService settingService, IProductTemplateService productTemplateService,
            ICustomerAttributeService customerAttributeService, IAddressAttributeService addressAttributeService,
            ISpecificationAttributeService specificationAttributeService, IMessageTemplateService messageTemplateService, IStoreContext storeContext,
            BDObjectContext objectContext)
        {
            _settingService = settingService;
            _productTemplateService = productTemplateService;
            _customerAttributeService = customerAttributeService;
            _addressAttributeService = addressAttributeService;
            _specificationAttributeService = specificationAttributeService;
            _messageTemplateService = messageTemplateService;
            _storeContext = storeContext;
            this._objectContext = objectContext;
        }

        /// <summary>
        /// Gets a route for provider configuration
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>
        /// <param name="routeValues">Route values</param>
        public void GetConfigurationRoute(out string actionName, out string controllerName, out RouteValueDictionary routeValues)
        {
            actionName = "Configure";
            controllerName = "CrowdPayCheckOut";
            routeValues = new RouteValueDictionary { { "Namespaces", "DevPartner.Plugin.BD.CrowdPay.Controllers" }, { "area", null } };
        }

        /// <summary>
        /// Install plugin
        /// </summary>
        public override void Install()
        {
            //database objects
            _objectContext.Install();

            //creating product template
            var existsTemplate = _productTemplateService.GetAllProductTemplates()
                .Any(x => x.Name == ProductTemplateName);
            if (!existsTemplate)
            {
                var newProductTemplate = new ProductTemplate()
                {
                    Name = ProductTemplateName,
                    ViewPath = ProductTemplateViewPath
                };
                _productTemplateService.InsertProductTemplate(newProductTemplate);
            }

            //creating all attibutes

            //customer attributes
            var personalInfoAttribute =
                _customerAttributeService.GetAllCustomerAttributes()
                    .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.PersonalInfoType);

            if (personalInfoAttribute == null)
            {
                personalInfoAttribute = new CustomerAttribute()
                {
                    AttributeControlType = AttributeControlType.RadioList,
                    Name = ClientConstants.CustomAttributes.PersonalInfoType
                };
                _customerAttributeService.InsertCustomerAttribute(personalInfoAttribute);

                _customerAttributeService.InsertCustomerAttributeValue(new CustomerAttributeValue()
                {
                    IsPreSelected = true,
                    CustomerAttributeId = personalInfoAttribute.Id,
                    Name = ClientConstants.PersonalInfoType.Individual
                });
                _customerAttributeService.InsertCustomerAttributeValue(new CustomerAttributeValue()
                {
                    IsPreSelected = false,
                    CustomerAttributeId = personalInfoAttribute.Id,
                    Name = ClientConstants.PersonalInfoType.Company
                });
                _customerAttributeService.InsertCustomerAttributeValue(new CustomerAttributeValue()
                {
                    IsPreSelected = false,
                    CustomerAttributeId = personalInfoAttribute.Id,
                    Name = ClientConstants.PersonalInfoType.Trust
                });
                _customerAttributeService.InsertCustomerAttributeValue(new CustomerAttributeValue()
                {
                    IsPreSelected = false,
                    CustomerAttributeId = personalInfoAttribute.Id,
                    Name = ClientConstants.PersonalInfoType.SelfDirectedIRA
                });
            }

            var taxIdAttribute = _customerAttributeService.GetAllCustomerAttributes()
                    .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.TaxId);

            if (taxIdAttribute == null)
            {
                taxIdAttribute = new CustomerAttribute()
                {
                    AttributeControlType = AttributeControlType.TextBox,
                    Name = ClientConstants.CustomAttributes.TaxId
                };

                _customerAttributeService.InsertCustomerAttribute(taxIdAttribute);
            }

            #region All Other customer attributes for "Individual" (PDF)
            //       var Address_Years = _customerAttributeService.GetAllCustomerAttributes()
            //             .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Address_Years);

            //       if (Address_Years == null)
            //       {
            //           Address_Years = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Address_Years
            //           };

            //           _customerAttributeService.InsertCustomerAttribute(Address_Years);
            //       }
            //       var Home_City = _customerAttributeService.GetAllCustomerAttributes()
            //            .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Home_City);

            //       if (Home_City == null)
            //       {
            //           Home_City = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Home_City
            //           };

            //           _customerAttributeService.InsertCustomerAttribute(Home_City);
            //       }           
            //       var Home_State = _customerAttributeService.GetAllCustomerAttributes()
            //          .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Home_State);

            //       if (Home_State == null)
            //       {
            //           Home_State = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Home_State
            //           };

            //           _customerAttributeService.InsertCustomerAttribute(Home_State);
            //       }
            //       var Home_Zip = _customerAttributeService.GetAllCustomerAttributes()
            //          .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Home_Zip);
            //       if (Home_Zip == null)
            //       {
            //           Home_Zip = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Home_Zip
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Home_Zip);
            //       }
            //       var SSNAttribute = _customerAttributeService.GetAllCustomerAttributes()
            //            .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.SSN);
            //       if (SSNAttribute == null)
            //       {
            //           SSNAttribute = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.SSN
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(SSNAttribute);
            //       }
            //       var Driver_License = _customerAttributeService.GetAllCustomerAttributes()
            //          .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Driver_License);
            //       if (Driver_License == null)
            //       {
            //           Driver_License = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Driver_License
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Driver_License);
            //       }
            //       var Driver_State = _customerAttributeService.GetAllCustomerAttributes()
            //      .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Driver_State);
            //       if (Driver_State == null)
            //       {
            //           Driver_State = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Driver_State
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Driver_State);
            //       }
            //       var USA_Citizen = _customerAttributeService.GetAllCustomerAttributes()
            //    .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.USA_Citizen);
            //       if (USA_Citizen == null)
            //       {
            //           USA_Citizen = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.USA_Citizen
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(USA_Citizen);
            //       }
            //       var Cell_Phone = _customerAttributeService.GetAllCustomerAttributes()
            //    .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Cell_Phone);
            //       if (Cell_Phone == null)
            //       {
            //           Cell_Phone = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Cell_Phone
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Cell_Phone);
            //       }
            //       var Employer_Name = _customerAttributeService.GetAllCustomerAttributes()
            //  .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Employer_Name);
            //       if (Employer_Name == null)
            //       {
            //           Employer_Name = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Employer_Name
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Employer_Name);
            //       }
            //       var Employer_Street = _customerAttributeService.GetAllCustomerAttributes()
            //.SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Employer_Street);
            //       if (Employer_Street == null)
            //       {
            //           Employer_Street = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Employer_Street
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Employer_Street);
            //       }
            //       var Employer_City = _customerAttributeService.GetAllCustomerAttributes()
            // .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Employer_City);
            //       if (Employer_City == null)
            //       {
            //           Employer_City = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Employer_City
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Employer_City);
            //       }           
            //       var Employer_State = _customerAttributeService.GetAllCustomerAttributes()
            // .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Employer_State);
            //       if (Employer_State == null)
            //       {
            //           Employer_State = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Employer_State
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Employer_State);
            //       }
            //       var Employer_Zip = _customerAttributeService.GetAllCustomerAttributes()
            // .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Employer_Zip);
            //       if (Employer_Zip == null)
            //       {
            //           Employer_Zip = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Employer_Zip
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Employer_Zip);
            //       }
            //       var Employer_Business_Type = _customerAttributeService.GetAllCustomerAttributes()
            // .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Employer_Business_Type);
            //       if (Employer_Business_Type == null)
            //       {
            //           Employer_Business_Type = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Employer_Business_Type
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Employer_Business_Type);
            //       }
            //       var Employer_Position = _customerAttributeService.GetAllCustomerAttributes()
            // .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Employer_Position);
            //       if (Employer_Position == null)
            //       {
            //           Employer_Position = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Employer_Position
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Employer_Position);
            //       }
            //       var Employer_YRS = _customerAttributeService.GetAllCustomerAttributes()
            // .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Employer_YRS);
            //       if (Employer_YRS == null)
            //       {
            //           Employer_YRS = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Employer_YRS
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Employer_YRS);
            //       }
            //       var Employer_Phone = _customerAttributeService.GetAllCustomerAttributes()
            // .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Employer_Phone);
            //       if (Employer_Phone == null)
            //       {
            //           Employer_Phone = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Employer_Phone
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Employer_Phone);
            //       }
            //       var Employer_Email = _customerAttributeService.GetAllCustomerAttributes()
            // .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Employer_Email);
            //       if (Employer_Email == null)
            //       {
            //           Employer_Email = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.TextBox,
            //               Name = ClientConstants.CustomAttributes.Employer_Email
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Employer_Email);
            //       }
            //       var Income1 = _customerAttributeService.GetAllCustomerAttributes()
            // .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Income1);
            //       if (Income1 == null)
            //       {
            //           Income1 = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.Checkboxes,
            //               Name = ClientConstants.CustomAttributes.Income1
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Income1);
            //       }
            //       var Income2 = _customerAttributeService.GetAllCustomerAttributes()
            //.SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Income2);
            //       if (Income2 == null)
            //       {
            //           Income2 = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.Checkboxes,
            //               Name = ClientConstants.CustomAttributes.Income2
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Income2);
            //       }
            //       var Income3 = _customerAttributeService.GetAllCustomerAttributes()
            //.SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Income3);
            //       if (Income3 == null)
            //       {
            //           Income3 = new CustomerAttribute()
            //           {
            //               AttributeControlType = AttributeControlType.Checkboxes,
            //               Name = ClientConstants.CustomAttributes.Income3
            //           };
            //           _customerAttributeService.InsertCustomerAttribute(Income3);
            //       }
            #endregion

            var investorType = _customerAttributeService.GetAllCustomerAttributes()
                   .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.InvestorType);

            if (investorType == null)
            {
                investorType = new CustomerAttribute()
                {
                    AttributeControlType = AttributeControlType.RadioList,
                    Name = ClientConstants.CustomAttributes.InvestorType
                };

                _customerAttributeService.InsertCustomerAttribute(investorType);

                _customerAttributeService.InsertCustomerAttributeValue(new CustomerAttributeValue()
                {
                    IsPreSelected = true,
                    CustomerAttributeId = investorType.Id,
                    Name = ClientConstants.InvestorType.NonAccreditted
                });
                _customerAttributeService.InsertCustomerAttributeValue(new CustomerAttributeValue()
                {
                    IsPreSelected = false,
                    CustomerAttributeId = investorType.Id,
                    Name = ClientConstants.InvestorType.Accreddited
                });
            }

            var accreditedQualify = _customerAttributeService.GetAllCustomerAttributes()
                   .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.AccreditedQualify);

            if (accreditedQualify == null)
            {
                accreditedQualify = new CustomerAttribute()
                {
                    AttributeControlType = AttributeControlType.RadioList,
                    Name = ClientConstants.CustomAttributes.AccreditedQualify
                };

                _customerAttributeService.InsertCustomerAttribute(accreditedQualify);

                _customerAttributeService.InsertCustomerAttributeValue(new CustomerAttributeValue()
                {
                    IsPreSelected = true,
                    CustomerAttributeId = accreditedQualify.Id,
                    Name = ClientConstants.QualiflyOptions.IndividualNetworth
                });
                _customerAttributeService.InsertCustomerAttributeValue(new CustomerAttributeValue()
                {
                    IsPreSelected = false,
                    CustomerAttributeId = accreditedQualify.Id,
                    Name = ClientConstants.QualiflyOptions.IndividualWithIncome
                });

                _customerAttributeService.InsertCustomerAttributeValue(new CustomerAttributeValue()
                {
                    IsPreSelected = false,
                    CustomerAttributeId = accreditedQualify.Id,
                    Name = ClientConstants.QualiflyOptions.Business
                });

                _customerAttributeService.InsertCustomerAttributeValue(new CustomerAttributeValue()
                {
                    IsPreSelected = false,
                    CustomerAttributeId = accreditedQualify.Id,
                    Name = ClientConstants.QualiflyOptions.Bank
                });

                _customerAttributeService.InsertCustomerAttributeValue(new CustomerAttributeValue()
                {
                    IsPreSelected = false,
                    CustomerAttributeId = accreditedQualify.Id,
                    Name = ClientConstants.QualiflyOptions.Corporation
                });

                _customerAttributeService.InsertCustomerAttributeValue(new CustomerAttributeValue()
                {
                    IsPreSelected = false,
                    CustomerAttributeId = accreditedQualify.Id,
                    Name = ClientConstants.QualiflyOptions.Employee
                });

                _customerAttributeService.InsertCustomerAttributeValue(new CustomerAttributeValue()
                {
                    IsPreSelected = false,
                    CustomerAttributeId = accreditedQualify.Id,
                    Name = ClientConstants.QualiflyOptions.TrustWithAsset
                });
            }

            var backupWithHolding = _customerAttributeService.GetAllCustomerAttributes()
                 .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.BackUpWithholding);

            if (backupWithHolding == null)
            {
                backupWithHolding = new CustomerAttribute()
                {
                    AttributeControlType = AttributeControlType.RadioList,
                    Name = ClientConstants.CustomAttributes.BackUpWithholding
                };

                _customerAttributeService.InsertCustomerAttribute(backupWithHolding);

                _customerAttributeService.InsertCustomerAttributeValue(new CustomerAttributeValue()
                {
                    IsPreSelected = true,
                    CustomerAttributeId = backupWithHolding.Id,
                    Name = ClientConstants.BackupWithholdingOptions.Exempt
                });
                _customerAttributeService.InsertCustomerAttributeValue(new CustomerAttributeValue()
                {
                    IsPreSelected = false,
                    CustomerAttributeId = backupWithHolding.Id,
                    Name = ClientConstants.BackupWithholdingOptions.NotExempt
                });
            }


            var annualIncome = _customerAttributeService.GetAllCustomerAttributes()
                   .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.AnnualIncome);

            if (annualIncome == null)
            {
                annualIncome = new CustomerAttribute()
                {
                    AttributeControlType = AttributeControlType.TextBox,
                    Name = ClientConstants.CustomAttributes.AnnualIncome
                };

                _customerAttributeService.InsertCustomerAttribute(annualIncome);
            }

            var netWorth = _customerAttributeService.GetAllCustomerAttributes()
                 .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.NetWorth);

            if (netWorth == null)
            {
                netWorth = new CustomerAttribute()
                {
                    AttributeControlType = AttributeControlType.TextBox,
                    Name = ClientConstants.CustomAttributes.NetWorth
                };

                _customerAttributeService.InsertCustomerAttribute(netWorth);
            }

            #region All Other address attributes for "Company" (PDF 2)
            //var Business_City = _addressAttributeService.GetAllAddressAttributes()
            //      .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Business_City);
            //if (Business_City == null)
            //{
            //    Business_City = new AddressAttribute()
            //    {
            //        AttributeControlType = AttributeControlType.TextBox,
            //        Name = ClientConstants.CustomAttributes.Business_City
            //    };
            //    _addressAttributeService.InsertAddressAttribute(Business_City);
            //}
            //var Business_Country = _addressAttributeService.GetAllAddressAttributes()
            //    .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Business_Country);
            //if (Business_Country == null)
            //{
            //    Business_Country = new AddressAttribute()
            //    {
            //        AttributeControlType = AttributeControlType.TextBox,
            //        Name = ClientConstants.CustomAttributes.Business_Country
            //    };
            //    _addressAttributeService.InsertAddressAttribute(Business_Country);
            //}
            //var Business_State = _addressAttributeService.GetAllAddressAttributes()
            //     .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Business_State);
            //if (Business_State == null)
            //{
            //    Business_State = new AddressAttribute()
            //    {
            //        AttributeControlType = AttributeControlType.TextBox,
            //        Name = ClientConstants.CustomAttributes.Business_State
            //    };
            //    _addressAttributeService.InsertAddressAttribute(Business_State);
            //}
            //var Business_Zip = _addressAttributeService.GetAllAddressAttributes()
            //     .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Business_Zip);
            //if (Business_Zip == null)
            //{
            //    Business_Zip = new AddressAttribute()
            //    {
            //        AttributeControlType = AttributeControlType.TextBox,
            //        Name = ClientConstants.CustomAttributes.Business_Zip
            //    };
            //    _addressAttributeService.InsertAddressAttribute(Business_Zip);
            //}
            //var Business_Website = _addressAttributeService.GetAllAddressAttributes()
            //     .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.Business_Website);
            //if (Business_Website == null)
            //{
            //    Business_Website = new AddressAttribute()
            //    {
            //        AttributeControlType = AttributeControlType.TextBox,
            //        Name = ClientConstants.CustomAttributes.Business_Website
            //    };
            //    _addressAttributeService.InsertAddressAttribute(Business_Website);
            //}

            var vestingName = _addressAttributeService.GetAllAddressAttributes()
                    .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.VestingName);

            if (vestingName == null)
            {
                vestingName = new AddressAttribute()
                {
                    AttributeControlType = AttributeControlType.TextBox,
                    Name = ClientConstants.CustomAttributes.VestingName
                };

                _addressAttributeService.InsertAddressAttribute(vestingName);
            }

            //var EIN = _addressAttributeService.GetAllAddressAttributes()
            //       .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.EIN);

            //if (EIN == null)
            //{
            //    EIN = new AddressAttribute()
            //    {
            //        AttributeControlType = AttributeControlType.TextBox,
            //        Name = ClientConstants.CustomAttributes.EIN
            //    };

            //    _addressAttributeService.InsertAddressAttribute(EIN);
            //}

            var contactName = _addressAttributeService.GetAllAddressAttributes()
                    .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.ContactName);

            if (contactName == null)
            {
                contactName = new AddressAttribute()
                {
                    AttributeControlType = AttributeControlType.TextBox,
                    Name = ClientConstants.CustomAttributes.ContactName
                };

                _addressAttributeService.InsertAddressAttribute(contactName);
            }

            var regionFormedAttribute =
                _addressAttributeService.GetAllAddressAttributes()
                    .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.RegionFormedIn);

            if (regionFormedAttribute == null)
            {
                regionFormedAttribute = new AddressAttribute()
                {
                    AttributeControlType = AttributeControlType.TextBox,
                    Name = ClientConstants.CustomAttributes.RegionFormedIn
                };

                _addressAttributeService.InsertAddressAttribute(regionFormedAttribute);
            }

            var companyAdressAttribute =
                _addressAttributeService.GetAllAddressAttributes()
                    .SingleOrDefault(x => x.Name == ClientConstants.CustomAttributes.CompanyAddress);
            if (companyAdressAttribute == null)
            {
                companyAdressAttribute = new AddressAttribute()
                {
                    Name = ClientConstants.CustomAttributes.CompanyAddress,
                    AttributeControlType = AttributeControlType.Checkboxes,
                };

                _addressAttributeService.InsertAddressAttribute(companyAdressAttribute);

                _addressAttributeService.InsertAddressAttributeValue(new AddressAttributeValue()
                {
                    AddressAttributeId = companyAdressAttribute.Id,
                    Name = "True"
                });
            }
            #endregion

            this.AddOrUpdatePluginLocaleResource("ShopFast.Admin.Settings.DocuSignUserName", "DocuSign User Name");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Admin.Settings.DocuSignPassword", "DocuSign Password");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Admin.Settings.DocuSignIntegratorKey", "DocuSign Integrator Key");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Admin.Settings.PdfFileLink", "Pdf file link");
            this.AddOrUpdatePluginLocaleResource("Shopfast.CrowdPay.PluginTitle", "Omnisoft crowd wizard");

            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.BlockTitle", "Crowd fondue block");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Goal", "Goal");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Shares", "Shares");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Investors", "Investors");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Committed", "Committed amount");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Reserve", "Reserve shares");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Follow", "Follow");
            this.AddOrUpdatePluginLocaleResource("Shopfast.CrowdPay.Wizardstep.investorinfo", "Investor Information");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.WizardStep.Personal", "Personal");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.WizardStep.PersonalInfoType", "Investor Type");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.WizardStep.InfoGathering", "Information Gathering");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.WizardStep.Purchase", "Purchase");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.WizardStep.Agreement", "Subscription Agreement");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.WizardStep.Finish", "Finish");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Email", "E-mail");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.FirstName", "First name");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.LastName", "Last name");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Address", "Address");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.City", "City");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.StateofResidence", "State of residence");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.ZipCode", "Zip Code");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Contry", "Country");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.DateofBirth", "Date of birth");
            //this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.TaxIdNumber", "SSN or Tax ID Number");            
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Phone", "Phone");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.VestingName", "Vesting Name");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.EIN", "Employer Identification Number (EIN)");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Business_City", "City");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Business_State", "State");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Business_Zip", "Zip code");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Business_Website", "Website");

            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.company", "Company");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.companyname", "Company Name");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.trustname", "Trust Name");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.self-directediraname", "Custodian Name");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.tip", "Pro-Tip");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.tiptext", "This is the first step in becoming an investor. Make sure you have all of your information handy to make the process easier.");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.signature", "Sign your name in the field below by typing your full legal name.");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.ContactName", "Contact Name");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.RegionFormed", "Region formed in");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Fax", "Fax");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.individualsinfo", "Individual(s)");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.individualsinfo", "Individual Info");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.company", "Company");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.companyinfo", "Company Info");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.trust", "Trust");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.trust", "Trust Info");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.self-directedira", "Self-Directed IRA");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.self-directedirainfo", "Self-Directed IRA Info");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.investortype", "I want to invest as");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.terms", "I confirm that I read the offering circular and the disclaimer above.");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.signaturelabel", "Signature");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.individuals", "Individual(s)");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Country", "Country");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.trustinfo", "Trust Info");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.pagetitle", "Crowd pay wizard");
            this.AddOrUpdatePluginLocaleResource("shopfast.errors.termscheckbox", "Please, check Terms and Conditions");
            this.AddOrUpdatePluginLocaleResource("BD.ConfirmationOption.Required", "Please confirm");
            this.AddOrUpdatePluginLocaleResource("BD.ConfirmationSignature.Required", "Signature is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.errors.customersignature", "Customer signature field is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.pagetitle", "Omnisoft crowd wizard");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.selfdirectedira", "Self-Directed IRA");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.personalinfotypequestion", "What type of investor are you?");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.nonaccredited.fulltext", "I am a non-accredited investor.");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.nonaccredited.fulltext.tooltip", @"This is the most common type of investor.Non-Accredited investors earn under $200,000 annually and have under $1 Million in net worth. This applies to individuals, institutions and entities.");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.accredited.fulltext", "I am an accredited investor as defined by federal law");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.accredited.fulltext.tooltip", "This is a small percentage of investors. Accredited investors earn over $200,000 annually, a combined $300,000 with a spouse, have a net worth of over $1 Million, or are institutional investors. This applies to individuals, institutions and entities.");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.investortype.tip", "Pro-Tip");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.investortype.tiptext", "Anyone can invest! By selecting your investor type, you are helping us identify the maximum you can invest for each deal. The vast majority of the US population is NOT accredited. You do not need to be accredited to invest.");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.investortype.bottomtiptext", "Edit this text...");
            this.AddOrUpdatePluginLocaleResource("shopfast.titles.accreditedinvestortitle", "I qualify as an accredited investor as follows:");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.individual.text", "I have an individual net worth, or joint net worth with my spouse, that exceeds $1 million including any IRA's, 401K's and other retirement accounts, but excluding the net value of my primary residence.");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.individualwithincome.text", "I am an individual with income of over $200,000 in each of the last two years, or joint income with my spouse exceeding $300,000 in those years, and I reasonably expect at least the same this year.");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.business.text", "We are a business, trust or other non-individual entity in which all the equity owners or grantors/settlors are accredited investors.");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.bank.text", "We are a bank, insurance company, pension fund, or other registered investment company with assets exceeding $5 million.");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.corporation.text", "We are a corporation, partnership, or charitable organization with at least $5 million in assets.");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.employeebenefitplan.text", "We are an employee benefit plan, within the meaning of the Employee Retirement Income Security Act, if a bank, insurance company, or registered investment adviser makes the investment decisions, or if the plan has total assets in excess of $5 million.");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.trustwithassets.text", "We are a trust with assets in excess of $5 million, not specifically formed to acquire the securities offered, whose purchases a sophisticated investor makes.");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.AnnualIncome", "Annual Income");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.NetWorth", "Net Worth");
            this.AddOrUpdatePluginLocaleResource("shopfast.titles.backupwithholdingtitle", "Are you exempt from backup withholding?");
            this.AddOrUpdatePluginLocaleResource("shopfast.titles.backupwithholdingdescription", "The majority of people are exempt from backup withholding. All individuals subject to backup withholding must be notified by the IRS.");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.exemptfrombackupwithholding.text", "I am exempt from backup withholding.");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.subjecttobackupwithholding.text", "I am subject to backup withholding. (Only check this option if you've been notified by the IRS that you are subject to backup withholding.)");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.WizardStep.PaymentInfo", "Payment Info");

            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.pagetitle", "Omnisoft crowd wizard");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.selfdirectedira", "Self-Directed IRA");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.DaysLeft", "Days left to close deal");

            #region All Other customer attributes label message for "Individual" (PDF 1)
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.SSN", "SSN");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Address_Years", "Years in current address");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Home_City", "City");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Home_State", "State");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Home_Zip", "Zip code");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Driver_License", "Driver license");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Driver_Country", "Driver country");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Driver_State", "Driver state");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Citizen_Country", "Citizen country");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.USA_Citizen", "USA citizen");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Cell_Phone", "Cell phone");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Employer_Name", "Name");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Employer_Street", "Address");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Employer_City", "City");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Employer_State", "State");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Employer_Zip", "Zip code");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Employer_Business_Type", "Business type");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Employer_Position", "Position");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Employer_YRS", "Years in current address");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Employer_Phone", "Phone");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Employer_Email", "Email");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Income1", "INDIVIDUAL WITH NET WORTH IN EXCESS OF $1 MILLION");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Income2", "INDIVIDUAL WITH $200,000 INDIVIDUAL INCOME");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Income3", "INDIVIDUAL WITH $300,000 JOINT ANNUAL INCOME");
            #endregion

            //validation
            this.AddOrUpdatePluginLocaleResource("shopfast.errors.termscheckbox", "Please, check terms and conditions");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.customersignature.required", "Customer signature is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.SSN.required", "SSN is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.regionformed.required", "Region formed is required");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.Company.Required", "Organization name is required");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.ContactName.Required", "Contact name is required");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.VestingName.Required", "Vesting name is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.NetWorth.greaterthan", "Net worth must be greater than zero");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.AnnualIncome.greaterthan", "Annual income must be greater than zero");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.EIN.Required", "Employer Identification Number (EIN) is required");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.Business_City.Required", "City is required");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.Business_State.Required", "State is required");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.Business_Zip.Required", "Zip code is required");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.Business_Website.Required", "Website is required");
            #region All Other customer attributes validation message for "Individual" (PDF 1)
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Address_Years.required", "Years in current address is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Home_City.required", "City is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Home_State.required", "State is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Home_Zip.required", "Zip code is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Driver_License.required", "Driver license is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Driver_State.required", "Driver state is required");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Driver_Country.required", "Driver country is required");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.Fields.Citizen_Country.required", "Citizen country is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.USA_Citizen.required", "USA citizen is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Cell_Phone.required", "Cell phone is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Employer_Name.required", "Name is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Employer_Street.required", "Address is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Employer_City.required", "City is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Employer_State.required", "State is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Employer_Zip.required", "Zip code is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Employer_Business_Type.required", "Business type is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Employer_Position.required", "Position is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Employer_YRS.required", "Years in current address is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Employer_Phone.required", "Phone is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.Employer_Email.required", "Email is required");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.income1.required", "At least one Income is required");

            #endregion

            #region investor form
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.LookingToInvest", "Looking To Invest");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.LookingToInvest.Required", "Looking To Invest is required");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.PreferedContacts", "Prefered Contacts");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.PreferedContacts.Required", "Prefered Contacts is required");
            this.AddOrUpdatePluginLocaleResource("Admin.Catalog.Products.InvestorForm", "Potential Investors");
            this.AddOrUpdatePluginLocaleResource("InvestorForm.LookingToInvest", "How much amount you want to invest?");
            this.AddOrUpdatePluginLocaleResource("InvestorForm.Title", "Investor Detail");
            this.AddOrUpdatePluginLocaleResource("InvestorForm.SubmitMessage", "Inquiry submitted successfully. We will get back to you shortly.");
            //this.AddOrUpdatePluginLocaleResource("InvestorForm.LookingToInvest.100-1000", "$100 - $1,000");
            this.AddOrUpdatePluginLocaleResource("InvestorForm.LookingToInvest.1001-5000", "$1,001 - $5,000");
            this.AddOrUpdatePluginLocaleResource("InvestorForm.LookingToInvest.5001-25000", "$5,001 - $25,000");
            this.AddOrUpdatePluginLocaleResource("InvestorForm.LookingToInvest.25001-50000", "$25,001 - $50,000");
            this.AddOrUpdatePluginLocaleResource("InvestorForm.LookingToInvest.50001-100000", "$50,001 - $1,00,000");
            this.AddOrUpdatePluginLocaleResource("InvestorForm.LookingToInvest.100001-and up", "$1,00,001 - and up");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.TimeToCall", "Time to call");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.TimeToCall.Required", "Time to call is required");
            this.AddOrUpdatePluginLocaleResource("InvestorForm.FormType", "Type");
            this.AddOrUpdatePluginLocaleResource("InvestorForm.Language", "Language");
            this.AddOrUpdatePluginLocaleResource("InvestorForm.Language.Required", "Language is required");
            #endregion

            #region subscription template
            this.AddOrUpdatePluginLocaleResource("Admin.Catalog.Products.Fields.TokenList", "Available Tokens");
            this.AddOrUpdatePluginLocaleResource("Admin.Catalog.Products.Fields.HTMLTemplate", "Template");
            this.AddOrUpdatePluginLocaleResource("Admin.Catalog.Products.SubscriptionTemplate", "Offering Type");
            this.AddOrUpdatePluginLocaleResource("Admin.Catalog.Products.Fields.PDFUploadId", "Upload PDF");
            this.AddOrUpdatePluginLocaleResource("Admin.Catalog.Products.Fields.IsDocusign", "Enable Docusign");
            this.AddOrUpdatePluginLocaleResource("Admin.Orders.Subscription", "Subscription");
            this.AddOrUpdatePluginLocaleResource("Admin.Orders.BD.SubscriptionAgreementPdf", "Subscription Agreement");
            this.AddOrUpdatePluginLocaleResource("Admin.Catalog.Products.Fields.HTMLTemplateForProductAgreement", "Template of Product Agreement");
            this.AddOrUpdatePluginLocaleResource("Admin.Catalog.Products.Fields.PDFUploadIdForProductAgreement", "Upload PDF of Product Agreement");
            #endregion

            #region verification template
            this.AddOrUpdatePluginLocaleResource("Admin.Catalog.Products.Fields.TokenListIndividual", "Available Tokens - Individual");
            this.AddOrUpdatePluginLocaleResource("Admin.Catalog.Products.Fields.TokenListCompany", "Available Tokens - Company");
            this.AddOrUpdatePluginLocaleResource("Admin.Catalog.Products.Fields.HTMLTemplateIndividual", "Individual Template");
            this.AddOrUpdatePluginLocaleResource("Admin.Catalog.Products.Fields.HTMLTemplateCompany", "Company Template");
            this.AddOrUpdatePluginLocaleResource("Admin.Catalog.Products.Fields.PDFIndividualUploadId", "Upload PDF - Individual");
            this.AddOrUpdatePluginLocaleResource("Admin.Catalog.Products.Fields.PDFCompanyUploadId", "Upload PDF - Company");
            this.AddOrUpdatePluginLocaleResource("ShopFast.CrowdPay.WizardStep.InvidualCompanyVerification", "Verification");
            this.AddOrUpdatePluginLocaleResource("Admin.Customers.Customers.PdfVerification", "Verification Template");
            #endregion

            #region Uploaded Documents
            this.AddOrUpdatePluginLocaleResource("Admin.Customers.Customers.UploadedDocuments", "Uploaded Documents");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.UploadDocuments.Filename", "Document");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.UploadDocuments.Description", "Description");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.UploadDocuments.IsApproved", "Is Approved");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.UploadDocuments.ApprovedByName", "Approved By");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.UploadDocuments.ApprovedByEmail", "Approved By Email");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.UploadDocuments.ApproveDate", "Approved Date");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.UploadDocuments.Comment", "Comment");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Fields.UploadDocuments.InvestorComment", "Investor Comment");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.SampleDocument.Title", "Download the sample document send it to your accountant to sign and upload it back below");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.SampleDocument.Navigation.Title", "Accreditation Sample Letter");
            #endregion

            #region Offering Type - Rules
            this.AddOrUpdatePluginLocaleResource("ShopFast.Admin.Settings.OfferingType", "Offering Type");
            this.AddOrUpdatePluginLocaleResource("OfferingTypeMessage.InvestorsNotPermitted", "You are not allow to because investors type of Accreditted or Non-Accreditted is not permitted");
            this.AddOrUpdatePluginLocaleResource("OfferingTypeMessage.InvestorsAccredittedNotPermitted", "You are not allow to because investors type of Accreditted is not permitted");
            this.AddOrUpdatePluginLocaleResource("OfferingTypeMessage.InvestorsNonAccredittedNotPermitted", "You are not allow to because investors type of Non-Accreditted is not permitted");
            this.AddOrUpdatePluginLocaleResource("OfferingTypeMessage.MaximumStockOrAmountLimit", "Stock quantity or price is not valid based on selected offering type");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.NotAllowToInvest", "You are not allow to invest because you already reached to investment limit");
            this.AddOrUpdatePluginLocaleResource("OfferingType.type_506b", "506(B)");
            this.AddOrUpdatePluginLocaleResource("OfferingType.type_506c", "506(C)");
            this.AddOrUpdatePluginLocaleResource("OfferingType.type_title3", "TITLE III");
            this.AddOrUpdatePluginLocaleResource("OfferingType.type_rega_tier1", "REG A+ TIER 1");
            this.AddOrUpdatePluginLocaleResource("OfferingType.type_rega_tier2", "REG A+ TIER 2");
            this.AddOrUpdatePluginLocaleResource("OfferingType.type_S_1_IPO", "S-1 (IPO - Initial Public Offering)");

            #endregion

            #region Network 1 Financial Security
            this.AddOrUpdatePluginLocaleResource("BD.Network1Security.Network1SecurityTitle", "Do you have account with Network 1 Financial Securities, Inc.");
            this.AddOrUpdatePluginLocaleResource("BD.Network1Security.IsNetwork1Security", "Network 1 Financial Securities");
            this.AddOrUpdatePluginLocaleResource("BD.Network1Security.AccountNumber", "Account Number");
            this.AddOrUpdatePluginLocaleResource("BD.Network1Security.AssociatedBroker", "Associated Broker");
            this.AddOrUpdatePluginLocaleResource("BD.Network1Security.AccountNumber.Required", "Account Number is required");
            this.AddOrUpdatePluginLocaleResource("BD.Network1Security.AssociatedBroker.Required", "Associated Broker is required");

            this.AddOrUpdatePluginLocaleResource("BD.Network1Security.Net1CRM.Settings.CRMFieldsTitle", "Net1 CRM Settings");
            this.AddOrUpdatePluginLocaleResource("BD.Network1Security.Net1CRM.Settings.Net1CrmApiUrl", "Net1 CRM Api Url");
            this.AddOrUpdatePluginLocaleResource("BD.Network1Security.Net1CRM.Settings.Net1CrmUsername", "Net1 CRM Username");
            this.AddOrUpdatePluginLocaleResource("BD.Network1Security.Net1CRM.Settings.Net1AccessKey", "Net1 AccessKey");
            this.AddOrUpdatePluginLocaleResource("BD.Network1Security.Net1CRM.Settings.Net1AssignedUserId", "Net1 Assigned User Id");
            #endregion

            #region NDA
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.NDA.NDAHTMLTemplate.EmptyMessage", "NDA HTML Template is not uploaded");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.NDA.PPM-PDF-Filename", "PPM Business Plan");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.NDA.Signed-NDA-Filename", "Signed NDA");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.NDA.Admin.Settings.AllowNDA", "Allow NDA");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.NDA.Admin.Settings.NDAHTMLTemplate", "NDA HTML Template");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.NDA.Admin.Settings.NDAPDFUploadId", "NDA Upload PDF");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.NDA.Admin.Settings.PPMPDFUploadId", "PPM Upload PDF");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.NDA.NDA-PDF-title", "NDA");
            #endregion

            this.AddOrUpdatePluginLocaleResource("shopfast.fields.pershare", "Per Share");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.shares", "Shares");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.minimuminvest", "Minimum Investment");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.maximuminvest", "Maximum Investment");
            this.AddOrUpdatePluginLocaleResource("shopfast.howmanyshares", "How many shares would you like to purchase?");
            this.AddOrUpdatePluginLocaleResource("shopfast.paymentmethods", "Payment method");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.paymentterms", "I confirm that this purchase price is not more than the greater of 10% of my annual income or net worth (or no more than the greater of 10% of revenue or net assets for a business), unless I am an accredited investor.");
            this.AddOrUpdatePluginLocaleResource("shopfast.fields.shares", "Shares");

            this.AddOrUpdatePluginLocaleResource("shopfast.shoppingcart.product", "Invest project");
            this.AddOrUpdatePluginLocaleResource("shopfast.shoppingcart.shareprice", "1 share price");
            this.AddOrUpdatePluginLocaleResource("shopfast.shoppingcart.sharequantity", "Delivered share quantity");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.wizardstep.investortype", "Investor Type");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.personalinfotype", "I want invest as:");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.exempt.text", "I am exempt from backup withholding.");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.notexempt.text", "I am subject to backup withholding. (Only check this option if you've been notified by the IRS that you are subject to backup withholding.)");

            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.individualnetworth.text", "I have an individual net worth, or joint net worth with my spouse, that exceeds $1 million including any IRA's, 401K's and other retirement accounts, but excluding the net value of my primary residence.");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.employee.text", "We are an employee benefit plan, within the meaning of the Employee Retirement Income Security Act, if a bank, insurance company, or registered investment adviser makes the investment decisions, or if the plan has total assets in excess of $5 million.");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.fields.trustwithasset.text", "We are a trust with assets in excess of $5 million, not specifically formed to acquire the securities offered, whose purchases a sophisticated investor makes.");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Checkout.YourOrderHasBeenSuccessfullyProcessed", "Thank you for your investment!");
            this.AddOrUpdatePluginLocaleResource("shopfast.crowdpay.wizardstep.subscriptionagreement", "Subscription Agreement");
            this.AddOrUpdatePluginLocaleResource("shopfast.titles.subscriptionagreement", "Please review the Subscription Agreement below and provide your signature to complete your investment.");
            this.AddOrUpdatePluginLocaleResource("shopfast.titles.docusignemailnotification", "Please, review and sign the document");

            //blockscore
            this.AddOrUpdatePluginLocaleResource("Shopfast.Admin.BlockScoreValidation", "BlockScore Validation");
            this.AddOrUpdatePluginLocaleResource("Shopfast.Admin.BlockScore.Invalid", "Invalid");
            this.AddOrUpdatePluginLocaleResource("Shopfast.Admin.BlockScore.Valid", "Valid");
            this.AddOrUpdatePluginLocaleResource("SHOPFAST.ADMIN.BLOCKSCORE.RESULTS", "Result");
            this.AddOrUpdatePluginLocaleResource("shopfast.admin.blockscore.customerstatus", "Customer status");
            this.AddOrUpdatePluginLocaleResource("shopfast.admin.blockscore.blockscore_objectid", "ID");
            this.AddOrUpdatePluginLocaleResource("shopfast.admin.blockscore.blockscore_addressmatch", "Address");
            this.AddOrUpdatePluginLocaleResource("shopfast.admin.blockscore.blockscore_addressrisk", "Address risk");
            this.AddOrUpdatePluginLocaleResource("shopfast.admin.blockscore.blockscore_customerpassportmatch", "Document");
            this.AddOrUpdatePluginLocaleResource("shopfast.admin.blockscore.blockscore_customerbirthmatch", "Date of birth");
            this.AddOrUpdatePluginLocaleResource("shopfast.admin.blockscore.blockscore_ofacmatch", "OFAC");
            this.AddOrUpdatePluginLocaleResource("shopfast.admin.blockscore.blockscore_pepmatch", "PEP");
            this.AddOrUpdatePluginLocaleResource("hopfast.admin.blockscore.companystatus", "Company status");
            this.AddOrUpdatePluginLocaleResource("shopfast.admin.blockscore.blockscore_companynamematch", "Legal name");
            this.AddOrUpdatePluginLocaleResource("shopfast.admin.blockscore.blockscore_companystatematch", "State");
            this.AddOrUpdatePluginLocaleResource("shopfast.admin.blockscore.blockscore_companytaxidmatch", "Tax id");
            this.AddOrUpdatePluginLocaleResource("shopfast.admin.blockscore.blockscore_companycountrycodematch", "Country");
            this.AddOrUpdatePluginLocaleResource("shopfast.admin.blockscorevalidation", "BlockScore API Validation");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Admin.Settings.BlockScoreKey", "BlockScore API Key");
            this.AddOrUpdatePluginLocaleResource("shopfast.docusign.signingresult.ttl_expired", "Your session url is expired. Please reload the page.");
            this.AddOrUpdatePluginLocaleResource("shopfast.docusign.signingresult.decline", "You declined the signing. If you want to try again, please reload the page to start the Singing Ceremony");
            this.AddOrUpdatePluginLocaleResource("shopfast.docusign.signingresult.session_timeout", "Your session has timed out. Please reload the page.");
            this.AddOrUpdatePluginLocaleResource("shopfast.docusign.signingresult.signing_complete", "Thank you. Loading next step...");
            this.AddOrUpdatePluginLocaleResource("shopfast.docusign.signingresult.cancel", "If you want to try again, please reload the page to start the Singing Ceremony");

            //Verify investor api
            this.AddOrUpdatePluginLocaleResource("shopfast.admin.verifyinvestorvalidation", "Verify investor API Validation");
            this.AddOrUpdatePluginLocaleResource("Shopfast.Admin.VerifyInvestor.InvestorId", "Investor Id");
            this.AddOrUpdatePluginLocaleResource("Shopfast.Admin.VerifyInvestor.FirstName", "Investor first name");
            this.AddOrUpdatePluginLocaleResource("Shopfast.Admin.VerifyInvestor.LastName", "Investor last name");
            this.AddOrUpdatePluginLocaleResource("Shopfast.Admin.VerifyInvestor.Email", "Investor email");
            this.AddOrUpdatePluginLocaleResource("Shopfast.Admin.VerifyInvestor.Company", "Investor");
            this.AddOrUpdatePluginLocaleResource("Shopfast.Admin.VerifyInvestor.Status", "Verification status");
            this.AddOrUpdatePluginLocaleResource("Shopfast.Admin.VerifyInvestor.VerifiedOn", "Verified on");
            this.AddOrUpdatePluginLocaleResource("Shopfast.Admin.VerifyInvestor.DocumentUrl", "Document url");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Admin.Settings.ViSettingsEnabled", "Verify investor validation enabled");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Admin.Settings.SelfAccredited", "Self accredited");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Admin.Settings.InternalAccreditation", "Broker Dealer Internal Accreditation");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Admin.Settings.ViAPiKey", "Verify investor API key");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Admin.Settings.ViUserKey", "Verify investor User key");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Admin.Settings.ViModeValues", "Verify investor mode");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Admin.VerifyInvestor.ViNotExists", "Verification request does not exist");
            this.AddOrUpdatePluginLocaleResource("ShopFast.Admin.Settings.SingleOfferProductId", "Single Offering ProductId");

            // today code
            #region InvestmentAttributes
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.Admin.Settings.ShowInSummaryPage", "Summary Page");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.Admin.Settings.ShowInDeatilPage", "Detail Page");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.Admin.Settings.ShowInCheckoutPage", "Checkout Page");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.InvestmentAttributes.ShowTotalInvestment", "Total Investment");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.InvestmentAttributes.ShowMaxInvestment", "Maximum Investment");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.InvestmentAttributes.ShowMinInvestment", "Minimum Investment");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.InvestmentAttributes.ShowPrice", "Price");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.InvestmentAttributes.ShowDaysLeft", "Days Left");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.InvestmentAttributes.ShowInvestors", "Investors");
            this.AddOrUpdatePluginLocaleResource("ShopFast.BD.InvestmentAttributes.ShowRaised", "Raised");
            #endregion

            //docusign spec attributes
            var investorInfoTemplateId =
                _specificationAttributeService.GetSpecificationAttributes()
                    .SingleOrDefault(x => x.Name == ClientConstants.SpecificationAttributeName.InvestorInfoTemplateId);
            if (investorInfoTemplateId == null)
            {
                investorInfoTemplateId = new SpecificationAttribute()
                {
                    Name = ClientConstants.SpecificationAttributeName.InvestorInfoTemplateId
                };
                _specificationAttributeService.InsertSpecificationAttribute(investorInfoTemplateId);

                var investorInfoTemplateAttrValue = new SpecificationAttributeOption()
                {
                    SpecificationAttributeId = investorInfoTemplateId.Id,
                    Name = "True"
                };

                _specificationAttributeService.InsertSpecificationAttributeOption(investorInfoTemplateAttrValue);
            }

            var subscriptionAgreementTemplateId =
             _specificationAttributeService.GetSpecificationAttributes()
                 .SingleOrDefault(x => x.Name == ClientConstants.SpecificationAttributeName.SubscriptionAgreementTemplateId);
            if (subscriptionAgreementTemplateId == null)
            {
                subscriptionAgreementTemplateId = new SpecificationAttribute()
                {
                    Name = ClientConstants.SpecificationAttributeName.SubscriptionAgreementTemplateId
                };
                _specificationAttributeService.InsertSpecificationAttribute(subscriptionAgreementTemplateId);

                var subscriptionAgreementTemplateAttrValue = new SpecificationAttributeOption()
                {
                    SpecificationAttributeId = subscriptionAgreementTemplateId.Id,
                    Name = "True"
                };

                _specificationAttributeService.InsertSpecificationAttributeOption(subscriptionAgreementTemplateAttrValue);
            }

            var existingMessageTemplate =
                _messageTemplateService.GetMessageTemplateByName(ClientConstants.MessageTemplates.BlockScoreTemplate.TemplateName, _storeContext.CurrentStore.Id);

            if (existingMessageTemplate == null)
            {
                existingMessageTemplate = new MessageTemplate()
                {
                    Name = ClientConstants.MessageTemplates.BlockScoreTemplate.TemplateName,
                    Subject = ClientConstants.MessageTemplates.BlockScoreTemplate.TemplateSubject,
                    IsActive = true,
                    Body = ClientConstants.MessageTemplates.BlockScoreTemplate.TemplateBody
                };

                _messageTemplateService.InsertMessageTemplate(existingMessageTemplate);
            }

            base.Install();
        }

        /// <summary>
        /// Uninstall plugin
        /// </summary>
        public override void Uninstall()
        {
            //database objects
            _objectContext.Uninstall();

            //settings
            _settingService.DeleteSetting<CrowdPaySettings>();

            var customerAttributesForDelete =
                _customerAttributeService.GetAllCustomerAttributes()
                    .Where(x => _customerAttributeList.Contains(x.Name))
                    .ToList();

            //remove all customer and address attributes
            foreach (var customerAttribute in customerAttributesForDelete)
            {
                _customerAttributeService.DeleteCustomerAttribute(customerAttribute);
            }

            var addressAttributesForDelete =
                _addressAttributeService.GetAllAddressAttributes()
                    .Where(x => _addressAttributeList.Contains(x.Name))
                    .ToList();

            foreach (var addressAttribute in addressAttributesForDelete)
            {
                _addressAttributeService.DeleteAddressAttribute(addressAttribute);
            }

            base.Uninstall();
        }

        public void ManageSiteMap(SiteMapNode rootNode)
        {
            var menuItem = new SiteMapNode()
            {
                SystemName = "InvestorForms",
                Title = EngineContext.Current.Resolve<ILocalizationService>().GetResource("Admin.Catalog.Products.InvestorForm"),
                Url = "/Plugin/InvestorForms",
                Visible = true,
                IconClass = "fa-dot-circle-o"
            };
            var firstNode = rootNode.ChildNodes.FirstOrDefault(x => x.SystemName == "Customers");
            if (firstNode != null)
            {
                firstNode.ChildNodes.Insert(1, menuItem);
            }
            else
            {
                rootNode.ChildNodes.Add(menuItem);
            }
        }
    }
}
