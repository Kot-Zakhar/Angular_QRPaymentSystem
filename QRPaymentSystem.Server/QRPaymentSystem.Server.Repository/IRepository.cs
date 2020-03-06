using System;
using System.Linq;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Repository
{    public interface IRepository<T> : IDisposable where T : Entity
    {
        IQueryable<T> GetAll();
        T GetById(Guid id);
        T Create(T item);
        void Update(T item);
        bool DeleteById(Guid id);
        bool Delete(T item);
        void Save();
    }
}