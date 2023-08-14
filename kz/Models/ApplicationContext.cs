﻿using Microsoft.EntityFrameworkCore;
namespace kz.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Article> Articles { get; set; } = null!;
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Article>().HasKey(v => v.TabelCode);
            modelBuilder.Entity<User>().HasKey(v => v.TabelCode);
        }
    }
}
