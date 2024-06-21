using Microsoft.EntityFrameworkCore;
using EmployeeManagementAPI.Models;

namespace EmployeeManagementAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Salary> Salaries { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Salary>()
                .Property(s => s.BaseSalary)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Salary>()
                .Property(s => s.Bonus)
                .HasColumnType("decimal(18,2)");
        }
    }
}
