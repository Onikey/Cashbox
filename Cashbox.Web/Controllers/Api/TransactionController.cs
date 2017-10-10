using Cashbox.Data.Entities;
using Cashbox.Data.Repository;
using Cashbox.Web.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Cashbox.Web.Controllers.Api
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/transactions")]
    public class TransactionController : ApiController
    {
        [HttpGet]
        [Route("count")]
        public HttpResponseMessage GetDailyTransactions()
        {
            try
            {
                var result = TransactionService.GetDailyTransactionsCount();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("details")]
        public HttpResponseMessage GetDailyTransactionsWithDetails()
        {
            try
            {
                var result = TransactionService.GetDailyTransactions();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("create")]
        public HttpResponseMessage CreateTransaction([FromBody] TransactionItem[] items)
        {
            try
            {
                foreach (var item in items)
                {
                    item.Id = Guid.NewGuid(); //we get id of product but we need new id for transaction item
                }

                var transaction = TransactionService.CreateTransaction(items);

                double totalPrice = 0;

                foreach (var item in transaction.TransactionItems)
                {
                    totalPrice += (double)item.Price * item.Quantity;
                }

                var result = new {
                    Date = transaction.TransactionDateUtc.ToLocalTime(),
                    TotalPrice = totalPrice
                };
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}