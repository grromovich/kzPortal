using System.Data;
using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Azure;
using System.Net;

namespace kz.Controllers
{
    public class JsonData
    {
        public string? TabelCode { get; set; }
        public string? Password { get; set; }
    }


    [ApiController]
    [Route("[controller]")]
    public class LoginController : Controller
    {
        public static string ToSHA256(string s)
        {
            string key = "banana"; // Не менять. Пароли не будут подходить
            using var sha256 = SHA256.Create();
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(s + key));
            var sb = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                sb.Append(bytes[i].ToString("x2"));
            }
            return sb.ToString();
        }

        public int GetNumberBadLogins(List<BadLogin> listBadLogins, DateTime LastLoginDate = default(DateTime)) {
            int number = 0;

            int n = 3;

            if(listBadLogins.Count < 3)
            {
                n = listBadLogins.Count;
            }

            for(int i = listBadLogins.Count - 1; i > listBadLogins.Count - n - 1; i--) 
            {
                var minutes = (DateTime.Now - listBadLogins[i].BadLoginDate).Duration();
                if(minutes.Minutes < 7)
                {
                    Debug.WriteLine(LastLoginDate > default(DateTime));
                    Debug.WriteLine((LastLoginDate - listBadLogins[i].BadLoginDate).Duration().Minutes);
                    if (LastLoginDate > default(DateTime) && LastLoginDate > listBadLogins[i].BadLoginDate)
                    {
                        break;
                    }
                    number++;
                }
                else
                {
                    break;
                }
            }
            
            return number;
        }

        // Функция для конвертации ipv4 в ipv6
        public string GetIPaddress(IPAddress addr)
        {
            string result = "";
            if (addr != null)
            {
                // Сравниваем адреса систем
                // Получение адреса ломается, когда сервер и браузер запущен на одной и то же машине
                if (addr.AddressFamily == System.Net.Sockets.AddressFamily.InterNetworkV6)
                {
                    addr = System.Net.Dns.GetHostEntry(addr).AddressList
            .First(x => x.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork);
                }
                result = addr.ToString();

                return result;
            }
               
            return addr.ToString();
        }

        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            // получаем табельный код и пароль
            // возвращаем токен
            JsonData data;
            using (var reader = new StreamReader(Request.Body))
            {
                var body = await reader.ReadToEndAsync();
                data = JsonSerializer.Deserialize<JsonData>(body);
            }

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

                if (user.Password == ToSHA256(data.Password))
                {
                    string APIkey = ToSHA256(new Random().Next().ToString());
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
                    var ip = GetIPaddress(Request.HttpContext.Connection.RemoteIpAddress);
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
                        NumberBadLogins = GetNumberBadLogins(db.BadLogins.AsNoTracking().ToList(), LastLoginDate.LastLoginDate);
                    }
                    else
                    {
                        NumberBadLogins = GetNumberBadLogins(db.BadLogins.AsNoTracking().ToList());
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