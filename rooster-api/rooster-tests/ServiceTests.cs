using NUnit.Framework;
using roosterapi.Models;
using roosterapi.Services;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using Moq;

namespace ServiceTests
{
    [TestFixture]
    public class DatabaseServiceTests
    {
        private DatabaseServiceBase<DatabaseItemBase> mockServiceObj;

        [SetUp]
        public void Setup()
        {
            List<DatabaseItemBase> mockCollection = new List<DatabaseItemBase>();
            mockCollection.Add(new DatabaseItemBase()
            {
                Id = "asdfgasdfgasdfgasdfgasdf"
            });

            var mockService = new Mock<DatabaseServiceBase<DatabaseItemBase>>();
            mockService.Setup(x => x.Get()).Returns(mockCollection);

            mockServiceObj = mockService.Object;      
        }

        [Test]
        public void TestPass()
        {
            var x = 5;
            Assert.IsTrue(x > 2);
        }

        [Test]
        public void TestGet()
        {
            var databaseItemList = mockServiceObj.Get();
            Assert.IsTrue(databaseItemList.GetType() == typeof(List));
            Assert.IsTrue(databaseItemList.Count() == 1);        
        }
    }
}