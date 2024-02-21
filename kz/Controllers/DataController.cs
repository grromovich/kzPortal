using kz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using kz.Controllers.other.HttpClasses;
using kz.Controllers.other.HelpFunctions;

namespace kz.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            var data = await ReadJsonClass.ReadJson(Request.Body, new DataRequest());

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
