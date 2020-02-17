using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Repository.EntityFramework
{
    public class Repository<T> : IRepository<T> where T: Entity
    {
        private readonly DbContext _context;
        private readonly Microsoft.EntityFrameworkCore.DbSet<T> _typeSet;
        
        public Repository(Microsoft.EntityFrameworkCore.DbContext context)
        {
            this._context = context;
            this._typeSet = context.Set<T>();
        }


        public T Create(T item)
        {
            return _typeSet.Add(item).Entity;
        }

        public bool Delete(T item)
        {
            return _typeSet.Remove(item).State == EntityState.Deleted;
        }

        public bool DeleteById(Guid? id)
        {
            T entity = GetById(id.GetValueOrDefault(Guid.Empty));
            if (entity != null)
                return Delete(entity);
            return false;
        }

        public IQueryable<T> GetAll()
        {
            return _typeSet;
        }

        public T GetById(Guid? id)
        {
            return _typeSet.Find(id.GetValueOrDefault(Guid.Empty));
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public void Update(T item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }

        #region Dispose pattern

        private bool disposedValue = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _context.Dispose();
                }

                disposedValue = true;
            }
        }

        ~Repository()
        {
          Dispose(false);
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        #endregion

    }
}