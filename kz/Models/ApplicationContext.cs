using Microsoft.EntityFrameworkCore;
namespace kz.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Article> Articles { get; set; } = null!;
        public DbSet<Setting> Settings { get; set; } = null!;
        public DbSet<BadLogin> BadLogins { get; set; } = null!;
        public DbSet<Admin> Admins { get; set; } = null!;
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Article>().HasKey(v => v.TabelCode);
            modelBuilder.Entity<User>().HasKey(v => v.TabelCode);
            modelBuilder.Entity<Setting>().HasKey(v => v.TabelCode);
            modelBuilder.Entity<BadLogin>().HasKey(v => v.TabelCode);
            modelBuilder.Entity<Admin>().HasKey(v => v.Password);
        }
    }
}
