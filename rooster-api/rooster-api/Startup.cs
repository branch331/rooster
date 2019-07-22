using System;
using System.IO;
using System.Threading;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using roosterapi.Models;
using roosterapi.Services;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;

namespace rooster_api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        readonly string AllowedOrigins = "_AllowedOrigins";
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(AllowedOrigins, builder =>
                {
                    builder.WithOrigins("*")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            ConfigureGoogleCalendarCredentials();

            services.Configure<DashboardDatabaseSettings>(Configuration.GetSection(nameof(DashboardDatabaseSettings)));
            services.AddSingleton<IDashboardDatabaseSettings>(sp => sp.GetRequiredService<IOptions<DashboardDatabaseSettings>>().Value);
            services.AddSingleton<DashboardService>();

            services.Configure<WeatherDatabaseSettings>(Configuration.GetSection(nameof(WeatherDatabaseSettings)));
            services.AddSingleton<IWeatherDatabaseSettings>(sp => sp.GetRequiredService<IOptions<WeatherDatabaseSettings>>().Value);
            services.AddSingleton<WeatherService>();

            var dummy1 = Configuration.GetSection(nameof(CommuteDatabaseSettings));

            services.Configure<CommuteDatabaseSettings>(Configuration.GetSection(nameof(CommuteDatabaseSettings)));
            services.AddSingleton<ICommuteDatabaseSettings>(sp => sp.GetRequiredService<IOptions<CommuteDatabaseSettings>>().Value);
            services.AddSingleton<CommuteService>();

            var dummy = Configuration.GetSection(nameof(CalendarDatabaseSettings));

            services.Configure<CalendarDatabaseSettings>(Configuration.GetSection(nameof(CalendarDatabaseSettings)));
            services.AddSingleton<ICalendarDatabaseSettings>(sp => sp.GetRequiredService<IOptions<CalendarDatabaseSettings>>().Value);
            services.AddSingleton<CalendarItemService>();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors(AllowedOrigins);
            app.UseHttpsRedirection();
            app.UseMvc();
        }

        public void ConfigureGoogleCalendarCredentials()
        {
            string[] Scopes = { CalendarService.Scope.CalendarReadonly };
            string ApplicationName = "Rooster API";
            UserCredential credential;

            using (var stream =
                new FileStream("credentials.json", FileMode.Open, FileAccess.Read))
            {
                // The file token.json stores the user's access and refresh tokens, and is created
                // automatically when the authorization flow completes for the first time.
                string credPath = "token.json";
                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(credPath, true)).Result;
                Console.WriteLine("Credential file saved to: " + credPath);
            }

                        // Create Google Calendar API service.
            var service = new CalendarService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });

            // Define parameters of request.
            EventsResource.ListRequest request = service.Events.List("primary");
            request.TimeMin = DateTime.Now;
            request.TimeMax = DateTime.Now.AddDays(3);
            request.ShowDeleted = false;
            request.SingleEvents = true;
            request.MaxResults = 10;
            request.OrderBy = EventsResource.ListRequest.OrderByEnum.StartTime;

            // List events.
            Events events = request.Execute();
            Console.WriteLine("Upcoming events:");
            if (events.Items != null && events.Items.Count > 0)
            {
                foreach (var eventItem in events.Items)
                {
                    string when = eventItem.Start.DateTime.ToString();
                    if (String.IsNullOrEmpty(when))
                    {
                        when = eventItem.Start.Date;
                    }
                    Console.WriteLine("{0} ({1})", eventItem.Summary, when);
                }
            }
            else
            {
                Console.WriteLine("No upcoming events found.");
            }
        }
    }
}
