
using CarRentalFullstack.Server.Data.Repositories;
using CarRentalFullstack.Server.Data.Repositories.IRepositories;
using CarRentalFullstack.Services;
using CarRentalFullstack.Services.IServices;
using CarRentalFullstack.Server.Data.Repositories.IRepositories;
using CarRentalFullstack.Server.Data.Repositories;
using Serilog;
using Serilog.AspNetCore;
using CarRentalFullstack.Server.Data;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;

namespace CarRentalFullstack
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            Env.Load();

            builder.Services.AddDbContext<CarRentalContext>(options =>
            options.UseSqlServer(Environment.GetEnvironmentVariable("DefaultConnection")));

            builder.Configuration.AddEnvironmentVariables();

            // Setup serilog
            var logger = new LoggerConfiguration()
                .ReadFrom.Configuration(builder.Configuration)
                .CreateLogger();

            builder
                .Logging
                .ClearProviders()
                .AddSerilog(logger);

            // Configure Serilog
            builder.Host.UseSerilog((ctx, lc) => lc

                .ReadFrom.Configuration(ctx.Configuration));

            // Services
            builder.Services.AddScoped<ICarService, CarService>();
            builder.Services.AddScoped<IRentalService, RentalService>();

            // Repos
            builder.Services.AddScoped<ICarRepository, CarRepository>();
            builder.Services.AddScoped<IRentalRepository, RentalRepository>();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
