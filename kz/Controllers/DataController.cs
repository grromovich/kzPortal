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
            public string? TabelCode { get; set; }
        }
        public class JsonObj
        {
            public string? TabelCode { get; set; }
            public string? Name { get; set; }
            public List<Article>? Articles { get; set; }
        }
        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            Tabel code;
            using (var reader = new StreamReader(Request.Body))
            {
                var body = await reader.ReadToEndAsync();
                code = JsonSerializer.Deserialize<Tabel>(body);
            }

            User? user = await db.Users.FirstOrDefaultAsync(u => u.TabelCode == code.TabelCode);

            if (user != null)
            {
                List <Article> articles = db.Articles.AsNoTracking().Where(u => u.TabelCode == code.TabelCode).ToList();
                JsonObj obj = new JsonObj();
                obj.TabelCode = user.TabelCode;
                obj.Name = user.Name;
                obj.Articles = articles;
                string JsonArticles = JsonSerializer.Serialize(obj, typeof(JsonObj));
                await Response.WriteAsync(JsonArticles);
            }
        }
    }
}
