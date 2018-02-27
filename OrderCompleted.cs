using System.Collections.Generic;
using System.Runtime.Serialization;

namespace ShopFast.Api.Models
{
    /// <summary>
    /// Represents an order completed or placed status data contract.
    /// </summary>
    [DataContract(Name = "OrderCompleted", Namespace = "http://shopfast.com/api")]
    public class OrderCompleted
    {
        /// <summary>
        /// Gets or sets a placed order unique identifier.
        /// </summary>
        [DataMember(Name = "OrderId", Order = 1)]
        public int Id { get; set; }

        [DataMember(Name = "ProductStock", Order = 2)]
        public List<ProductStock> ProductStock { get; set; }

        /// <summary>
        /// Gets or sets a placed order payment transact mode.
        /// </summary>
        [DataMember(Name = "TransactMode", Order = 3)]
        public string TransactMode { get; set; }

        /// <summary>
        /// Gets or sets a placed order payment method (Card Type).
        /// </summary>
        [DataMember(Name = "PaymentMethod", Order = 4)]
        public string PaymentMethod { get; set; }

        /// <summary>
        /// Gets or sets a placed order payment authorization code.
        /// </summary>
        [DataMember(Name = "AuthorizationCode", Order = 5)]
        public string AuthorizationCode { get; set; }

        /// <summary>
        /// Gets or sets a placed order payment transaction identifier.
        /// </summary>
        [DataMember(Name = "TransactionId", Order = 6)]
        public string TransactionId { get; set; }

        /// <summary>
        /// Gets or sets a true if order has been placed, otherwise false.
        /// </summary>
        [DataMember(Name = "Status", Order = 7)]
        public bool Status { get; set; }

        /// <summary>
        /// Gets or sets an order transaction message.
        /// </summary>
        [DataMember(Name = "Message", Order = 8)]
        public string Message { get; set; }
    }

    [DataContract(Name = "ProductStock", Namespace = "http://shopfast.com/api")]
    public class ProductStock
    {
        [DataMember(Name = "ProductId", Order = 1)]
        public int ProductId { get; set; }

        [DataMember(Name = "ManageInventory", Order = 2)]
        public bool ManageInventory { get; set; }

        [DataMember(Name = "StockQuantity", Order = 3)]
        public int StockQuantity { get; set; }
    }
}
