using CarRentalFullstack.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using CarRentalFullstack.Server.Models;

namespace CarRentalFullstack.Server.Data
{
    public class CarRentalContext : IdentityDbContext<User>
    {
        public CarRentalContext(DbContextOptions<CarRentalContext> options) : base(options) { }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Rental> Rentals { get; set; }
    }
}
