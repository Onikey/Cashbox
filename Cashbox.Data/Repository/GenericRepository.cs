using Cashbox.Data.Entities;
using System;
using System.Data.Entity;
using System.Linq;

namespace Cashbox.Data.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly CashboxContext context;
        private DbSet<T> entities;
        private bool disposed;

        public GenericRepository(CashboxContext context)
        {
            this.context = context;
            entities = context.Set<T>();
        }

        public IQueryable<T> GetAll()
        {
            return entities.AsNoTracking();
        }

        public T GetById(Guid id)
        {
            return entities.Single(x => x.Id == id);
        }

        public IQueryable<T> ExecuteQueryResultList(string query, params object[] parameters)
        {
            return this.context.Database.SqlQuery<T>(query, parameters).AsQueryable();
        }

        public void Add(T entity)
        {
            entities.Add(entity);
            context.SaveChanges();
        }

        public void Update(T entity)
        {
            context.Entry(entity).State = EntityState.Modified;

            context.SaveChanges();
        }

        public void Delete(T entity)
        {
            this.context.Entry(entity).State = EntityState.Deleted;

            context.SaveChanges();
        }

        void IDisposable.Dispose()
        {
            if (!this.disposed)
            {
                this.context?.Dispose();
            }

            this.disposed = true;
        }
    }
}
