using System;
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
                    builder.WithOrigins("*");
                });
            });

            services.Configure<DashboardDatabaseSettings>(Configuration.GetSection(nameof(DashboardDatabaseSettings)));
            services.AddSingleton<IDashboardDatabaseSettings>(sp => sp.GetRequiredService<IOptions<DashboardDatabaseSettings>>().Value);
            services.AddSingleton<DashboardService>();

            services.Configure<WeatherDatabaseSettings>(Configuration.GetSection(nameof(WeatherDatabaseSettings)));
            services.AddSingleton<IWeatherDatabaseSettings>(sp => sp.GetRequiredService<IOptions<WeatherDatabaseSettings>>().Value);
            services.AddSingleton<WeatherService>();

            services.Configure<CommuteDatabaseSettings>(Configuration.GetSection(nameof(CommuteDatabaseSettings)));
            services.AddSingleton<ICommuteDatabaseSettings>(sp => sp.GetRequiredService<IOptions<CommuteDatabaseSettings>>().Value);
            services.AddSingleton<CommuteService>();

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
    }
}
