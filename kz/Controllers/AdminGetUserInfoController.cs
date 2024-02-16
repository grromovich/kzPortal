using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using static System.Net.Mime.MediaTypeNames;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using static kz.Controllers.AdminDataController;

namespace kz.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AdminGetUserInfoController : Controller
    {
        private class AdminGetUserInfoRequest
        {
            public string APIkey { get; set; } = "";
            public string UserTabelCode { get; set; } = "";

        }

        public class AdminGetUserInfoResponseTable
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
            var data = await HttpContext.Request.ReadFromJsonAsync<AdminGetUserInfoRequest>();

            Setting? u = await db.Settings.FirstOrDefaultAsync(a => a.APIkey == data.APIkey);
            if (u != null)
            {
                User? admin = await db.Users.FirstOrDefaultAsync(a => a.TabelCode == u.TabelCode && a.Role == 1);
                if (admin != null)
                {
                    var userInfo = db.Users.AsNoTracking().FirstOrDefault(u => u.TabelCode == data.UserTabelCode);
                    var numberBans = db.Bans.Count(u => u.TabelCode == data.UserTabelCode).ToString();
                    var loginDate = db.Settings.AsNoTracking().FirstOrDefault(u => u.TabelCode == data.UserTabelCode);
                    var login = "Не был авторизирован";
                    if (loginDate != null)
                    {
                        login = loginDate.LastLoginDate.ToString();
                    }

                    var bans = db.Bans.AsNoTracking().Where(u => u.TabelCode == data.UserTabelCode).ToList();
                    var banuser = new List<BanUser>();
                    foreach (var UserBan in bans)
                    {
                        banuser.Add(new BanUser { IP = UserBan.IPaddress, Date = UserBan.BanDate.ToString() });
                    }

                    var User = new AdminGetUserInfoResponseTable();
                    User.Name = userInfo.Name;
                    User.TabelCode = userInfo.TabelCode;
                    User.NumberBans = numberBans;
                    User.LastLoginDate = login;
                    User.Bans = banuser;
                    string JsonArticles = JsonSerializer.Serialize(User, typeof(AdminGetUserInfoResponseTable));
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
