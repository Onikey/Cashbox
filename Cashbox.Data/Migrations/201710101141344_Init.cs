namespace Cashbox.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "products.Products",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Title = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "transactions.Transactions",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        TransactionDateUtc = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "transactions.TransactionItem",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Title = c.String(),
                        Quantity = c.Double(nullable: false),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        TransactionId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("transactions.Transactions", t => t.TransactionId, cascadeDelete: true)
                .Index(t => t.TransactionId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("transactions.TransactionItem", "TransactionId", "transactions.Transactions");
            DropIndex("transactions.TransactionItem", new[] { "TransactionId" });
            DropTable("transactions.TransactionItem");
            DropTable("transactions.Transactions");
            DropTable("products.Products");
        }
    }
}
