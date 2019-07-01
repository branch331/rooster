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
        private Mock<IDatabaseServiceBase<DatabaseItemBase>> mockService;
        private string testId = "asdfgasdfgasdfgasdfgasdf";

        [SetUp]
        public void Setup()
        {
            var mockCollection = new List<DatabaseItemBase>();

            mockCollection.Add(new DatabaseItemBase()
            {
                Id = testId
            });

            mockService = new Mock<IDatabaseServiceBase<DatabaseItemBase>>();

            mockService.Setup(x => x.Get()).Returns(mockCollection);
            mockService.Setup(x => x.Get(It.IsAny<string>())).Returns(mockCollection.Find(item => item.Id == testId));
            mockService.Setup(x => x.Create(It.IsAny<DatabaseItemBase>())).Returns<DatabaseItemBase>(x => x);       
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
            var databaseItemList = mockService.Object.Get();
            Assert.IsTrue(databaseItemList.Count() == 1);    
        }

        [Test]
        public void TestGetById()
        {
            var databaseItem = mockService.Object.Get(testId);
            Assert.IsTrue(databaseItem.Id == testId);
        }

        [Test]
        public void TestCreate()
        {
            var newId = "qwertqwertqwertqwertqwer";
            var newDatabaseItem = new DatabaseItemBase();
            newDatabaseItem.Id = newId;

            Assert.IsTrue(mockService.Object.Create(newDatabaseItem).Id == newId);
        }
    }
}