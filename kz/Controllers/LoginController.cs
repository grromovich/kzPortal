using System.Data;
using kz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using kz.Controllers.other.HttpClasses;
using kz.Controllers.other.HelpFunctions;

namespace kz.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            var data = await ReadJsonClass.ReadJson(Request.Body, new LoginRequest());

            User? user = await db.Users.FirstOrDefaultAsync(u => u.TabelCode == data.TabelCode);
            if (user != null)
            {
                // Проверка пользователя на наличие бана
                // Если он есть - возварщается ошибка о бане
                Ban? UserBan = await db.Bans.OrderBy(e => e.BanDate).LastOrDefaultAsync(u => u.TabelCode == data.TabelCode);

                if (UserBan != null)
                {
                    TimeSpan minutes = (DateTime.Now - UserBan.BanDate).Duration();
                    if (minutes.Minutes < 6)
                    {
                        await Response.WriteAsJsonAsync(new { Error = "Попробуйте через " + (7 - minutes.Minutes) + " минут" });
                        return;
                    }
                }

                if (user.Password == HelpFunctions.ToSHA256(data.Password))
                {
                    string APIkey = HelpFunctions.ToSHA256(new Random().Next().ToString());
                    var UserSettings = db.Settings.AsNoTracking().FirstOrDefault(s => s.TabelCode ==  user.TabelCode);
                    if (UserSettings != null)
                    {
                        UserSettings.APIkey = APIkey;
                        UserSettings.APIkeyDate = DateTime.Now;
                        UserSettings.LastLoginDate = DateTime.Now;
                        db.Settings.Update(UserSettings);
                        db.SaveChanges();
                    }
                    else
                    {
                        Setting newAPIkey = new Setting
                        {
                            TabelCode = user.TabelCode,
                            APIkey = APIkey,
                            APIkeyDate = DateTime.Now,
                            LastLoginDate = DateTime.Now,
                        };
                        db.Settings.Add(newAPIkey);
                        db.SaveChanges();
                    }
                    db.SaveChanges();
                    await Response.WriteAsync("{\"APIkey\":\"" + APIkey + "\"}");
                }
                else
                {
                    var ip = HelpFunctions.GetIPaddress(Request.HttpContext.Connection.RemoteIpAddress);
                    BadLogin login = new BadLogin
                    {
                        TabelCode = user.TabelCode,
                        BadLoginDate = DateTime.Now,
                        IPaddress = ip
                    };
                
                    db.BadLogins.Add(login);
                    db.SaveChanges();

                    Setting? LastLoginDate = db.Settings.AsNoTracking().FirstOrDefault(u => u.TabelCode == user.TabelCode);
                    int NumberBadLogins;

                    if (LastLoginDate != null)
                    {
                        NumberBadLogins = HelpFunctions.GetNumberBadLogins(db.BadLogins.AsNoTracking().ToList(), LastLoginDate.LastLoginDate);
                    }
                    else
                    {
                        NumberBadLogins = HelpFunctions.GetNumberBadLogins(db.BadLogins.AsNoTracking().ToList());
                    }

                    if (NumberBadLogins > 2)
                    {
                        Ban ban = new Ban
                        {
                            TabelCode = user.TabelCode,
                            BanDate = DateTime.Now,
                            IPaddress = ip
                        };
                        db.Bans.Add(ban);
                        db.SaveChanges();

                        await Response.WriteAsJsonAsync(new { Error = "Попробуйте через " + 7 + " минут" });
                    }
                    else
                    {
                        await Response.WriteAsJsonAsync(new { Error= "Неверный пароль. Осталось попыток: " + (3 - NumberBadLogins) });
                    }
                }
            }
            else
            {
                await Response.WriteAsJsonAsync(new { Error = "Ошибка авторизации" });
            }
        }
        
    }
}