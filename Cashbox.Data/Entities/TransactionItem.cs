using System;

namespace Cashbox.Data.Entities
{
    public class TransactionItem : BaseEntity
    {
        public TransactionItem(Guid id)
            : base(id)
        {

        }

        public TransactionItem()
            : base(Guid.NewGuid())
        {

        }

        public string Title { get; set; }

        public double Quantity { get; set; }

        public decimal Price { get; set; }

        public Guid TransactionId { get; set; }

        public Transaction Transaction { get; protected set; }
    }
}
