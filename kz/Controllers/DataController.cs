using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using static System.Net.Mime.MediaTypeNames;
using System;
using System.Collections.Generic;

namespace kz.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class DataController : Controller
    {
        private class Tabel
        {
            public string? APIkey { get; set; }
        }
        public class JsonObj
        {
            public string? TabelCode { get; set; }
            public int Role { get; set; }
            public string? Name { get; set; }
            public List<Article>? Articles { get; set; }
            public double BeforeDolg { get; set; }
            public double AfterDolg { get; set; }
            public double TotalDohod { get; set; }
        }
        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            Tabel data;
            using (var reader = new StreamReader(Request.Body))
            {
                var body = await reader.ReadToEndAsync();
                data = JsonSerializer.Deserialize<Tabel>(body);
            }

            Setting? userSetting = await db.Settings.AsNoTracking().FirstOrDefaultAsync(u => u.APIkey == data.APIkey);
            
            if (userSetting != null)
            {
                User? user = await db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.TabelCode == userSetting.TabelCode);

                List <Article> articles = db.Articles.AsNoTracking().Where(u => u.TabelCode == user.TabelCode).ToList();
                JsonObj obj = new JsonObj();
                obj.TabelCode = user.TabelCode;
                obj.Name = user.Name;
                obj.Articles = articles;
                obj.BeforeDolg = user.BeforeDolg;
                obj.AfterDolg = user.AfterDolg;
                obj.TotalDohod = user.TotalDohod;
                obj.Role = user.Role;
                string JsonArticles = JsonSerializer.Serialize(obj, typeof(JsonObj));
                await Response.WriteAsync(JsonArticles);
            }
        }
    }
}
