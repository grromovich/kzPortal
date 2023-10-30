using System.Data;
using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Security.Cryptography;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Azure;

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
                if (user.Ban != DateTime.MinValue)
                {
                    TimeSpan minutes1 = (DateTime.Now - user.Ban).Duration();
                    if (minutes1.Minutes > 6)
                    {
                        user.Ban = DateTime.MinValue;
                        user.NumberBadLogins = 0;
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
                    await Response.WriteAsync("{\"APIkey\":\"" + ToSHA256(data.Password) + "\"}");
                    user.NumberBadLogins = 0;
                    db.Users.Update(user);
                    db.SaveChanges();
                }
                else
                {
                    BadLogin login = new BadLogin
                    {
                        TabelCode = user.TabelCode,
                        Data = DateTime.Now
                    };
                    db.BadLogins.Add(login);
                    user.NumberBadLogins += 1;
                    db.Users.Update(user);
                    db.SaveChanges();


                    if (user.NumberBadLogins >=3)
                    {
                        user.Ban = DateTime.Now;
                        db.Users.Update(user);
                        db.SaveChanges();
                        await Response.WriteAsJsonAsync(new { Error = "Попробуйте через " + 7 + " минут" });
                        }
                    else
                    {
                        await Response.WriteAsJsonAsync(new { Error= "Неверный пароль. Осталось попыток: " + (3 - user.NumberBadLogins)});
                        //"{\"Error\": \"Попыток для входа осталось: " + (3 - user.NumberBadLogins) + "\"}"
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
