using kz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace kz.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        private class DataRequest
        {
            public string APIkey { get; set; } = "";
        }
        public class DataResponse
        {
            public string TabelCode { get; set; } = "";
            public int Role { get; set; }
            public string Name { get; set; } = "";
            public List<Article> Articles { get; set; } = new List<Article>();
            public double BeforeDolg { get; set; }
            public double AfterDolg { get; set; }
            public double TotalDohod { get; set; }
        }
        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            var data = await HttpContext.Request.ReadFromJsonAsync<DataRequest>();

            Setting? userSetting = await db.Settings.AsNoTracking().FirstOrDefaultAsync(u => u.APIkey == data.APIkey);
            
            if (userSetting != null)
            {
                User? user = await db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.TabelCode == userSetting.TabelCode);

                List <Article> articles = db.Articles.AsNoTracking().Where(u => u.TabelCode == user.TabelCode).ToList();
                var obj = new DataResponse();
                obj.TabelCode = user.TabelCode;
                obj.Name = user.Name;
                obj.Articles = articles;
                obj.BeforeDolg = user.BeforeDolg;
                obj.AfterDolg = user.AfterDolg;
                obj.TotalDohod = user.TotalDohod;
                obj.Role = user.Role;
                string JsonArticles = JsonSerializer.Serialize(obj, typeof(DataResponse));
                await Response.WriteAsync(JsonArticles);
            }
        }
    }
}
