﻿using System.Data;
using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
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
            if (listBadLogins.Count < 3)
            {
                n = listBadLogins.Count;
            }
            for (int i = listBadLogins.Count - 1; i > listBadLogins.Count - n; i--)
            {
                if((DateTime.Now - listBadLogins[i].BadLoginDate).Duration().Minutes < 7)
                {
                    if(LastLoginDate != default(DateTime))
                    {
                        if((LastLoginDate - listBadLogins[i].BadLoginDate).Duration().Minutes > 0)
                        {
                            number++;
                        }
                    }
                    else
                    {
                        number++;
                    }
                }
            }
            return number;
        }

        public string GetIPaddress(IPAddress addr)
        {
            string result = "";
            if (addr != null)
            {
                // If we got an IPV6 address, then we need to ask the network for the IPV4 address 
                // This usually only happens when the browser is on the same machine as the server.
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
                if (user.BanDate != DateTime.MinValue)
                {
                    TimeSpan minutes1 = (DateTime.Now - user.BanDate).Duration();
                    if (minutes1.Minutes > 6)
                    {
                        user.BanDate = DateTime.MinValue;
                        db.Users.Update(user);
                        db.SaveChanges();
                    }
                    else
                    {
                        await Response.WriteAsJsonAsync(new { Error = "Попробуйте через " + (7 - minutes1.Minutes) + " минут" });
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
                    IPAddress remoteIpAddress = Request.HttpContext.Connection.RemoteIpAddress;
                    string result = "";
                    if (remoteIpAddress != null)
                    {
                        // If we got an IPV6 address, then we need to ask the network for the IPV4 address 
                        // This usually only happens when the browser is on the same machine as the server.
                        if (remoteIpAddress.AddressFamily == System.Net.Sockets.AddressFamily.InterNetworkV6)
                        {
                            remoteIpAddress = System.Net.Dns.GetHostEntry(remoteIpAddress).AddressList
                    .First(x => x.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork);
                        }
                        result = remoteIpAddress.ToString();
                    }

                    BadLogin login = new BadLogin
                    {
                        TabelCode = user.TabelCode,
                        BadLoginDate = DateTime.Now,
                        IPaddress = GetIPaddress(Request.HttpContext.Connection.RemoteIpAddress)
                    };
                    db.BadLogins.Add(login);
                    db.Users.Update(user);
                    db.SaveChanges();

                    Setting? LastLoginDate = db.Settings.FirstOrDefault(u => u.TabelCode == user.TabelCode);
                    int NumberBadLogins = 0;
                    if (LastLoginDate != null)
                    {
                        NumberBadLogins = GetNumberBadLogins(db.BadLogins.ToList(), LastLoginDate.LastLoginDate);
                    }
                    else
                    {
                        NumberBadLogins = GetNumberBadLogins(db.BadLogins.ToList());
                    }

                    if (NumberBadLogins >=3)
                    {
                        user.BanDate = DateTime.Now;
                        db.Users.Update(user);
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
