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
        private IDatabaseServiceBase<IDatabaseItemBase> mockServiceObj;
        private string testId = "asdfgasdfgasdfgasdfgasdf";

        [SetUp]
        public void Setup()
        {
            List<IDatabaseItemBase> mockCollection = new List<IDatabaseItemBase>();
            mockCollection.Add(new DatabaseItemBase()
            {
                Id = testId
            });

            var mockService = new Mock<IDatabaseServiceBase<IDatabaseItemBase>>();

            mockService.Setup(x => x.Get()).Returns(mockCollection);
            mockService.Setup(x => x.Get(It.IsAny<string>())).Returns(mockCollection.Find(item => item.Id == testId));
            mockService.Setup(x => x.Create(It.IsAny<IDatabaseItemBase>())).Returns<IDatabaseItemBase>(x => x);

            /*
            mockService.Setup(x => x.Update(It.IsAny<string>(), It.IsAny<IDatabaseItemBase>())).Returns(true);
            mockService.Setup(x => x.Remove(It.IsAny<IDatabaseItemBase>())).Returns(true);
            mockService.Setup(x => x.Remove(It.IsAny<string>())).Returns(true);
            */          

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
            Assert.IsTrue(databaseItemList.Count() == 1);    
        }

        [Test]
        public void TestGetById()
        {
            var databaseItem = mockServiceObj.Get(testId);
            Assert.IsTrue(databaseItem.Id == testId);
        }

        [Test]
        public void TestCreate()
        {
            var newId = "qwertqwertqwertqwertqwer";
            var newDatabaseItem = new DatabaseItemBase();
            newDatabaseItem.Id = newId;

            Assert.IsTrue(mockServiceObj.Create(newDatabaseItem).Id == newId);
        }
    }
}