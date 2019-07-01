using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using roosterapi.Models;

namespace roosterapi.Services
{
    public class DatabaseServiceBase<T> : IDatabaseServiceBase<T> where T : IDatabaseItemBase
    {
        public IMongoCollection<T> _databaseItems { get; set; }

        public List<T> Get() => _databaseItems.Find(databaseItems => true).ToList();

        public T Get(string id) => _databaseItems.Find<T>(databaseItem => databaseItem.Id == id).FirstOrDefault();

        public T Create(T databaseItem)
        {
            _databaseItems.InsertOne(databaseItem);
            return databaseItem;
        }

        public void Update(string id, T databaseItemIn) => _databaseItems.ReplaceOne(databaseItem => databaseItem.Id == id, databaseItemIn);

        public void Remove(T databaseItemIn) => _databaseItems.DeleteOne(databaseItem => databaseItem.Id == databaseItemIn.Id);

        public void Remove(string id) => _databaseItems.DeleteOne(databaseItem => databaseItem.Id == id);
    }

    public interface IDatabaseServiceBase<T>
    {
        List<T> Get();
        T Get(string id);
        T Create(T databaseItem);
        void Update(string id, T databaseItemIn);
        void Remove(T databaseItemIn);
        void Remove(string id);
    }
}
