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

                // Выбирем по артиклю 
                List <Article> articles = db.Articles.AsNoTracking().Where(u => u.TabelCode == user.TabelCode).ToList();

                // Складываем данные в объект и оправляем
                var obj = new DataResponse
                {
                    TabelCode = user.TabelCode,
                    Name = user.Name,
                    Articles = articles,
                    BeforeDolg = user.BeforeDolg,
                    AfterDolg = user.AfterDolg,
                    TotalDohod = user.TotalDohod,
                    Role = user.Role,
                };
                string JsonArticles = JsonSerializer.Serialize(obj, typeof(DataResponse));
                await Response.WriteAsync(JsonArticles);
            }
        }
    }
}