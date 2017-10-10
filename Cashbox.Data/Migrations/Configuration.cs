namespace Cashbox.Data.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Cashbox.Data.CashboxContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Cashbox.Data.CashboxContext context)
        {
            using (var repo = new Repository.GenericRepository<Entities.Product>(new CashboxContext()))
            {
                var item = Entities.Product.Create("Potato", 8);
                repo.Add(item);
            }
        }
    }
}
