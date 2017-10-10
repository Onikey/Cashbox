using Cashbox.Data.Entities;
using Cashbox.Data.Repository;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Cashbox.Web.Controllers.Api
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/products")]
    public class ProductsController : ApiController
    {
        private IGenericRepository<Product> ProductRepository
        {
            get
            {
                return new GenericRepository<Product>(new Data.CashboxContext());
            }
        }

        [HttpGet]
        [Route("")]
        public HttpResponseMessage GetAllProducts()
        {
            try
            {
                using (var repository = this.ProductRepository)
                {

                    var result = repository.GetAll().ToList();
                    
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        [HttpGet]
        [Route("{id}")]
        public HttpResponseMessage GetProductById(Guid id)
        {
            if (id == default(Guid))
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Id is wrong.");
            try
            {
                using (var repository = this.ProductRepository)
                {
                    var result = repository.GetById(id);

                    if (result == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.NoContent);
                    }

                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("add")]
        public HttpResponseMessage AddProduct([FromBody] Product item)
        {
            try
            {
                using (var repository = this.ProductRepository)
                {
                    var newItem = Product.Create(item.Title, item.Price);
                    repository.Add(newItem);
                }

                return Request.CreateResponse(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpPut]
        [Route("update")]
        public HttpResponseMessage UpdateProduct([FromBody] Product item)
        {
            try
            {
                using (var repository = this.ProductRepository)
                {
                    var newItem = repository.GetById(item.Id);

                    if (newItem == null) return Request.CreateResponse(HttpStatusCode.NoContent);

                    if (!string.IsNullOrEmpty(item.Title)) newItem.Title = item.Title;

                    if (item.Price != decimal.Zero) newItem.Price = item.Price;

                    repository.Update(newItem);
                }                

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public HttpResponseMessage DeleteProduct([FromUri] Guid id)
        {
            try
            {
                using (var repository = this.ProductRepository)
                {
                    var item = repository.GetById(id);

                    if (item == null) return Request.CreateResponse(HttpStatusCode.NoContent);

                    repository.Delete(item);
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

    }
}