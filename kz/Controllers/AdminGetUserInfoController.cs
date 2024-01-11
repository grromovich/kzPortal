using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using static System.Net.Mime.MediaTypeNames;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace kz.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AdminGetUserInfoController : Controller
    {
        private class JsonObj
        {
            public string? APIkey { get; set; }
            public string? UserTabelCode { get; set; }

        }

        public class UserTable
        {
            public string? Name { get; set; }
            public string? TabelCode { get; set; }
            public string? NumberBans {  get; set; }
            public string? LastLoginDate { get; set; }
            public List<BanUser> Bans { get; set; }
        }

        public class BanUser
        {
            public string? IP { get; set; }
            public string? Date { get; set; }
        }


        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            JsonObj data;
            using (var reader = new StreamReader(Request.Body))
            {
                var body = await reader.ReadToEndAsync();
                data = JsonSerializer.Deserialize<JsonObj>(body);
            }

            Admin? admin = await db.Admins.FirstOrDefaultAsync(a => a.APIkey == data.APIkey);

            if (admin != null)
            {
                var logins = db.BadLogins.GroupBy(u => u.TabelCode).Select(g => new
                {
                    g.Key,
                    Count = g.Count()
                }).ToList();

                var usersCodeName = db.Users.AsNoTracking().Select(u => new {u.Name, u.TabelCode}).ToList();
                var dataList = new List<UserTable>();
                
                foreach (var user in usersCodeName)
                {
                    int userBan = 0;
                    for(var i = 0; i < logins.Count; i++) 
                    {
                        if (user.TabelCode == logins[i].Key)
                        {
                            userBan = logins[i].Count;
                        }
                    }
                    dataList.Add(new UserTable {  Name = user.Name, TabelCode = user.TabelCode, NumberBans = userBan.ToString()});
                }
            }
            else
            {
                await Response.WriteAsync("Ошибка с аккаунтом админа");
            }
        }
    }
}
