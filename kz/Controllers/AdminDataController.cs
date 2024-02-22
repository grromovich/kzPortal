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
    public class AdminDataController : Controller
    {
        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            var data = await ReadJsonClass.ReadJson(Request.Body, new AdminDataRequest());

            Setting? u = await db.Settings.FirstOrDefaultAsync(a => a.APIkey == data.APIkey);
            
            if(u != null)
            {
                User? admin = await db.Users.FirstOrDefaultAsync(a => a.TabelCode == u.TabelCode && a.Role == 1);
                if (admin != null)
                {
                    // Выбираем все записи банов ( юзер - кол-во банов )
                    var logins = db.Bans.GroupBy(u => u.TabelCode).Select(g => new
                    {
                        g.Key,
                        Count = g.Count()
                    }).ToList();


                    // Выбирем всех пользователей и пробегаемся по ним
                    // Считаем кол-во записей по ним
                    var usersCodeName = db.Users.AsNoTracking().Select(u => new { u.Name, u.TabelCode }).ToList();
                    var dataList = new List<AdminDataResponseTable>();

                    foreach (var user in usersCodeName)
                    {
                        int userBan = 0;
                        for (var i = 0; i < logins.Count; i++)
                        {
                            if (user.TabelCode == logins[i].Key)
                            {
                                userBan = logins[i].Count;
                            }
                        }
                        dataList.Add(new AdminDataResponseTable { Name = user.Name, TabelCode = user.TabelCode, NumberBans = userBan.ToString() });
                    }

                    // Возварщаем список юзеров
                    var dataUsers = new AdminDataResponseObj
                    {
                        Users = dataList
                    };
                    string JsonArticles = JsonSerializer.Serialize(dataUsers, typeof(AdminDataResponseObj));
                    await Response.WriteAsync(JsonArticles);
                }
                else
                {
                    await Response.WriteAsync("Ошибка с аккаунтом админа");
                }
            }
            
        }
    }
}
