using NUnit.Framework;
using roosterapi.Models;
using roosterapi.Services;
using roosterapi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using Moq;

namespace ControllerTests
{
    [TestFixture]
    public class DashboardControllerTests
    {
        private Mock<DashboardService> mockDashboardItemService;
        DashboardController dashboardController;
        DashboardItem fakeDashboardItem;
        string fakeId = "asdfasdfasdfasdfasdfasdf";
        string fakeReferenceId = "qwerqwerqwerqwerqwerqwer";

        [SetUp]
        public void Setup()
        {
            fakeDashboardItem = new DashboardItem
            {
                Id = fakeId,
                DashboardItemName = "Fake Item",
                DashboardItemType = "Weather",
                DashboardItemReferenceId = fakeReferenceId
            };

            dashboardController = new DashboardController(mockDashboardItemService.Object);
        }

        [Test]
        public void TestGetById()
        {
            dashboardController.Get(fakeId);
        }
    }
}