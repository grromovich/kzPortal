using kz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace kz.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AdminDataController : Controller
    {
        private class AdminDataRequest
        {
            public string APIkey { get; set; } = "";
        }

        public class AdminDataResponseTable
        {
            public string Name { get; set; } = "";
            public string TabelCode { get; set; } = "";
            public string NumberBans { get; set; } = "";
        }

        public class ResponseJsonObj
        {
            public List<AdminDataResponseTable> Users { get; set; } = new List<AdminDataResponseTable>();
        }


        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            var data = await HttpContext.Request.ReadFromJsonAsync<AdminDataRequest>();

            Setting? u = await db.Settings.FirstOrDefaultAsync(a => a.APIkey == data.APIkey);
            if(u != null)
            {
                User? admin = await db.Users.FirstOrDefaultAsync(a => a.TabelCode == u.TabelCode && a.Role == 1);
                if (admin != null)
                {
                    var logins = db.Bans.GroupBy(u => u.TabelCode).Select(g => new
                    {
                        g.Key,
                        Count = g.Count()
                    }).ToList();

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

                    var dataUsers = new ResponseJsonObj();
                    dataUsers.Users = dataList;
                    string JsonArticles = JsonSerializer.Serialize(dataUsers, typeof(ResponseJsonObj));
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
