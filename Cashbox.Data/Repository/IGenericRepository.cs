using Cashbox.Data.Entities;
using System;
using System.Linq;

namespace Cashbox.Data.Repository
{
    public interface IGenericRepository<T> : IDisposable where T : BaseEntity
    {
        IQueryable<T> GetAll();
        T GetById(Guid Id);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
