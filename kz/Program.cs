using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

string connection = "workstation id=TasksDB.mssql.somee.com;packet size=4096;user id=samuelmoore_SQLLogin_1;pwd=qv4m4l8qse;data source=TasksDB.mssql.somee.com;persist security info=False;initial catalog=TasksDB;TrustServerCertificate=True;";
builder.Services.AddDbContext<kz.Models.ApplicationContext>(options => options.UseSqlServer(connection));

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
