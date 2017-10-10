using System;
using System.Collections.Generic;

namespace Cashbox.Data.Entities
{
    public class Transaction : BaseEntity
    {
        public Transaction(Guid id)
            : base(id)
        {

        }

        public Transaction()
            : base(Guid.NewGuid())
        {

        }

        public DateTime TransactionDateUtc { get; protected set; }

        public ICollection<TransactionItem> TransactionItems { get; set; }

        public static Transaction Create(ICollection<TransactionItem> items)
        {
            var result = new Transaction
            {
                TransactionItems = items
            };

            result.TransactionDateUtc = DateTime.UtcNow;

            return result;
        }
    }
}
