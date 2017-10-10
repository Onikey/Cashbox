using Cashbox.Data.Entities;
using Cashbox.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cashbox.Web.Services
{
    public static class TransactionService
    {
        private static GenericRepository<Transaction> TransactionRepository
        {
            get
            {
                return new GenericRepository<Transaction>(new Data.CashboxContext());
            }
        }

        public static int GetDailyTransactionsCount()
        {
            var todayUtc = DateTime.Today.ToUniversalTime();
            var tommorowUtc = DateTime.Today.AddDays(1).ToUniversalTime();

            var result = TransactionRepository.GetAll() // get all transactions
                .Where(x => x.TransactionDateUtc >= todayUtc && x.TransactionDateUtc < tommorowUtc) // get transactions where day is today
                .Count();

            return result;
        }

        public static ICollection<object> GetDailyTransactions()
        {
            var todayUtc = DateTime.Today.ToUniversalTime();
            var tommorowUtc = DateTime.Today.AddDays(1).ToUniversalTime();

            var result = TransactionRepository.GetAll() // get all transactions
                .Where(x => x.TransactionDateUtc >= todayUtc && x.TransactionDateUtc < tommorowUtc) // get transactions where day is today
                .SelectMany(x => x.TransactionItems) // select all transactionItems from transactions
                .GroupBy(x => x.Title) // group transactionItems by title
                .Select(r => new
                {
                    Title = r.Key,
                    TotalTransactions = r.Count(),
                    TotalAmount = r.Sum(a => ((double)a.Price * a.Quantity)),
                    TotalQuantity = r.Sum(a => a.Quantity)
                }).ToArray(); // create new object with item title, count of transactions for this item, total amount for item, total qouantity for this item

            return result;
        }

        public static Transaction CreateTransaction(ICollection<TransactionItem> items)
        {
            var transaction = Transaction.Create(items);

            TransactionRepository.Add(transaction);

            return transaction;
        }
    }    
}