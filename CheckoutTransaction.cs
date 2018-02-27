using System.Runtime.Serialization;

namespace ShopFast.Api.Models
{
    /// <summary>
    /// The Checkout Transaction DataContract class.
    /// </summary>
    [DataContract(Name = "CheckoutTransaction", Namespace = "http://shopfast.com/api")]
    public class CheckoutTransaction
    {
        /// <summary>
        /// Gets or sets order products.
        /// </summary>
        [DataMember(Name = "Products", Order = 1)]
        public string Products { get; set; }

        /// <summary>
        /// Gets or sets order product quantities.
        /// </summary>
        [DataMember(Name = "Quantities", Order = 2)]
        public string Quantities { get; set; }

        /// <summary>
        /// Gets or sets order product attributes.
        /// </summary>
        [DataMember(Name = "Attributes", Order = 3)]
        public string Attributes { get; set; }

        /// <summary>
        /// Gets or sets order total price.
        /// </summary>
        [DataMember(Name = "TotalAmount", Order = 4)]
        public double Amount { get; set; }

        /// <summary>
        /// Gets or sets customer email address.
        /// </summary>
        [DataMember(Name = "Email", Order = 5)]
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets credit card type.
        /// </summary>
        [DataMember(Name = "CardType", Order = 6)]
        public string CardType { get; set; }

        /// <summary>
        /// Gets or sets credit card name.
        /// </summary>
        [DataMember(Name = "CardName", Order = 7)]
        public string CardName { get; set; }
        /// <summary>
        /// Gets or sets credit card number.
        /// </summary>
        [DataMember(Name = "CardNumber", Order = 8)]
        public string CardNumber { get; set; }

        /// <summary>
        /// Gets or sets credit card expiry month.
        /// </summary>
        [DataMember(Name = "ExpiryMonth", Order = 9)]
        public string ExpiryMonth { get; set; }

        /// <summary>
        /// Gets or sets credit card expiry year.
        /// </summary>
        [DataMember(Name = "ExpiryYear", Order = 10)]
        public string ExpiryYear { get; set; }

        /// <summary>
        /// Gets or sets card verification value.
        /// </summary>
        [DataMember(Name = "VerifyCode", Order = 11)]
        public string VerificationCode { get; set; }

        /// <summary>
        /// Gets or sets checkout transaction type (swipe|check|cash|card|terminal|payment-data).
        /// </summary>
        [DataMember(Name = "TransactionType", Order = 12)]
        public string TransactionType { get; set; }

        /// <summary>
        /// Gets or sets Base64 String signature image.
        /// </summary>
        [DataMember(Name = "Signature", Order = 13)]
        public string Signature { get; set; }

        /// <summary>
        /// Gets or sets status which indicates whether use customer's balance reward point for the order.
        /// </summary>
        [DataMember(Name = "UseRewardPoints", Order = 14)]
        public bool UseRewardPoints { get; set; }

        /// <summary>
        /// Gets or sets temporary order number.
        /// </summary>
        [DataMember(Name = "TempOrderNumber", Order = 15)]
        public string TempOrderNumber { get; set; }

        /// <summary>
        /// Gets or sets credit card track data information captured from card reader.
        /// </summary>
        [DataMember(Name = "CardTrackData", Order = 16)]
        public string CardTrackData { get; set; }

        /// <summary>
        /// Gets or sets card reader device model.
        /// </summary>
        [DataMember(Name = "CardReaderDeviceModel", Order = 17)]
        public string CardReaderDeviceModel { get; set; }

        /// <summary>
        /// Gets or sets card reader device number.
        /// </summary>
        [DataMember(Name = "CardReaderDeviceNumber", Order = 18)]
        public string CardReaderDeviceNumber { get; set; }

        /// <summary>
        /// Gets or sets encrypted payment data.
        /// </summary>
        [DataMember(Name = "PaymentData", Order = 19)]
        public string PaymentData { get; set; }
    }

    [DataContract(Name = "CheckoutTransactionPaymentData", Namespace = "http://shopfast.com/api")]
    public class CheckoutTransactionPaymentData
    {
        [DataMember(Name = "TransactionId", Order = 1)]
        public string TransactionId { get; set; }

        [DataMember(Name = "TransactionResult", Order = 2)]
        public string TransactionResult { get; set; }

        [DataMember(Name = "AuthCode", Order = 3)]
        public string AuthCode { get; set; }

        [DataMember(Name = "CardType", Order = 4)]
        public string CardType { get; set; }

        [DataMember(Name = "CardNumber", Order = 5)]
        public string CardNumber { get; set; }

        [DataMember(Name = "CashTendered", Order = 6)]
        public decimal CashTendered { get; set; }

        [DataMember(Name = "ChangeCash", Order = 7)]
        public decimal ChangeCash { get; set; }
    }
}
