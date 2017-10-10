namespace Cashbox.Data
{
    using Cashbox.Data.Entities;
    using System.Configuration;
    using System.Data.Entity;

    public class CashboxContext : DbContext
    {
        public CashboxContext()
            : base(nameOrConnectionString: ConnectionStringName)
        {
        }

        public static string ConnectionStringName
        {
            get
            {
                if (ConfigurationManager.ConnectionStrings["CashboxDb"] != null)
                {
                    return ConfigurationManager.ConnectionStrings["CashboxDb"].ToString();
                }

                return "DefaultConnection";
            }
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .ToTable("Products", "products")
                .HasKey(x => x.Id);

            modelBuilder.Entity<Transaction>()
                .ToTable("Transactions", "transactions")
                .HasKey(x => x.Id);

            modelBuilder.Entity<TransactionItem>()
                .ToTable("TransactionItem", "transactions")
                .HasKey(x => x.Id);
        }
    }
}