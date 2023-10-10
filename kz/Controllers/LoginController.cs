using System.Data;
using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Security.Cryptography;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(s+key));
            var sb = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                sb.Append(bytes[i].ToString("x2"));
            }
            return sb.ToString();
        }

        public int GetNumberBadLogins(ApplicationContext db, string TabelCode)
        {
            int NumberMinutes = 7;

            List<BadLogin> logins = db.BadLogins.AsNoTracking().Where(u => u.TabelCode == TabelCode).ToList();
            logins = logins.Where(u => (DateTime.Now - u.Data).Duration().Minutes < 7).ToList();
            return logins.Count;
        }

        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            System.Console.WriteLine(DateTime.MinValue);
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
                    if (minutes1.Minutes > 7)
                    {
                        user.Ban = DateTime.MinValue;
                        db.Users.Update(user);
                        db.BadLogins.Where(u => u.TabelCode == data.TabelCode).ExecuteDeleteAsync();
                        db.SaveChanges();
                    }
                    else
                    {
                        await Response.WriteAsync("{\"DateBan\":\"" + (7 - minutes1.Minutes) + "\"}");
                        return;
                    }
                }
                if (user.Password == ToSHA256(data.Password))
                {
                    await Response.WriteAsync("{\"APIkey\":\"" + ToSHA256(data.Password) + "\"}");
                    db.BadLogins.Where(u => u.TabelCode == data.TabelCode).ExecuteDelete();
                }
                else
                {
                    BadLogin login = new BadLogin
                    {
                        TabelCode = user.TabelCode,
                        Data = DateTime.Now
                    };
                    db.BadLogins.Add(login);
                    db.SaveChanges();

                    int number = GetNumberBadLogins(db, data.TabelCode);
                    if (number >=3)
                    {
                        user.Ban = DateTime.Now;
                        db.Users.Update(user);
                        db.SaveChanges();
                        await Response.WriteAsync("{\"DateBan\":\"" + 7 + "\"}");
                    }
                    else
                    {
                        await Response.WriteAsync("{\"NumberBadLogins\":\"" + (3 - number) + "\"}");
                    }
                }
            }
            else
            {
                await Response.WriteAsync("false");
            }
        }
    }
}
