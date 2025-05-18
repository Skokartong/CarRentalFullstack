
using CarRentalFullstack.Server.Data.Repositories;
using CarRentalFullstack.Server.Data.Repositories.IRepositories;
using CarRentalFullstack.Services;
using CarRentalFullstack.Services.IServices;
using Serilog;
using Serilog.AspNetCore;
using CarRentalFullstack.Server.Data;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using CarRentalFullstack.Server.Models;
using Microsoft.AspNetCore.Identity;
using CarRentalFullstack.Server.Services;
using CarRentalFullstack.Server.Services.IServices;

namespace CarRentalFullstack
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder => builder.AllowAnyOrigin()
                                      .AllowAnyMethod()
                                      .AllowAnyHeader());
            });

            Env.Load();

            // Load environment variables needed for Azure AD authentication
            string tenantId = Environment.GetEnvironmentVariable("AZURE_TENANT_ID") ?? throw new ArgumentNullException("TenantId missing");
            string clientId = Environment.GetEnvironmentVariable("AZURE_CLIENT_ID") ?? throw new ArgumentNullException("ClientId missing");
            string clientSecret = Environment.GetEnvironmentVariable("AZURE_CLIENT_SECRET") ?? throw new ArgumentNullException("ClientSecret missing");
            string authority = Environment.GetEnvironmentVariable("AZURE_AUTHORITY") ?? throw new ArgumentNullException("Authority missing");
            string audience = Environment.GetEnvironmentVariable("AZURE_AUDIENCE") ?? throw new ArgumentNullException("Audience missing");

            // Configure Entity Framework Core with SQL Server
            builder.Services.AddDbContext<CarRentalContext>(options =>
            options.UseSqlServer(Environment.GetEnvironmentVariable("DefaultConnection")));


            // Configure Azure AD authentication
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                   .AddJwtBearer(options =>
              {
                  options.Authority = authority;
                  options.Audience = audience;
                  options.TokenValidationParameters = new TokenValidationParameters
                  {
                      ValidateIssuer = true,
                      ValidateAudience = true,
                      ValidateLifetime = true,
                      ValidIssuer = authority,
                      ValidAudience = audience
                  };
              });

            // Configure Identity
            builder.Services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<CarRentalContext>()
                .AddDefaultTokenProviders();

            // Configure authorization policies
            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("Customer", policy =>
                    policy.RequireRole("customer"));
                options.AddPolicy("Admin", policy =>
                    policy.RequireRole("admin"));
            });

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
            builder.Services.AddScoped<IAuthService, AuthService>();

            // Repositories
            builder.Services.AddScoped<ICarRepository, CarRepository>();
            builder.Services.AddScoped<IRentalRepository, RentalRepository>();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            using (var scope = app.Services.CreateScope())
            {
                var authService = scope.ServiceProvider.GetRequiredService<IAuthService>();
                authService.SeedRolesAsync();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors("AllowAll");

            app.MapControllers();

            app.Run();
        }
    }
}
