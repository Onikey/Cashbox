using System;

namespace Cashbox.Data.Entities
{
    public class Product : BaseEntity
    {
        public Product(Guid id)
            : base(id)
        {

        }

        public Product()
            : base(Guid.NewGuid())
        {

        }

        public string Title { get; set; }

        public decimal Price { get; set; }

        public static Product Create(string title, decimal price)
        {
            var result = new Product
            {
                Title = title,
                Price = price
            };

            return result;
        }
    }
}
