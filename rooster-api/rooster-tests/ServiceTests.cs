using NUnit.Framework;
using roosterapi.Models;
using roosterapi.Services;
using roostertests;
using Newtonsoft.Json;
using Moq;

namespace ServiceTests
{
    [TestFixture]
    public class DashboardServiceTests
    {
        private MockService mockService;

        [SetUp]
        public void Setup()
        {
            IDatabaseSettingsBase mockDatabaseSettings = new DatabaseSettingsBase()
            {
                ConnectionString = "mongodb://localhost:27017",
                DatabaseName = "mockDb"
            };

            mockService = new MockService(mockDatabaseSettings);
        }

        [Test]
        public void TestCreateAndGet()
        {
            mockService.Create(new MockItem()
            {
                MockItemName = "Mock Name",
                MockItemDescription = "Mock Description"
            });

            Assert.IsTrue(mockService.Get().ToArray()[0].MockItemName == "Mock Name");
        }

        [Test]
        public void TestUpdateAndRemove()
        {
            var mockItem = mockService.Get().ToArray()[0];
            mockItem.MockItemName = "Updated Name";

            mockService.Update(mockItem.Id, mockItem);

            Assert.IsTrue(mockService.Get().ToArray()[0].MockItemName == "Updated Name");

            mockService.Remove(mockItem.Id);

            Assert.IsTrue(mockService.Get().ToArray().Length == 0);
        }
    }
}