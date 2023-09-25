using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;


namespace kz.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class PasswordChangeController : Controller
    {
        public class JsonData
        {
            public string? APIkey { get; set; }
            public string? TabelCode { get; set; }
            public string? Password { get; set; }
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
                await Response.WriteAsync("true");
            }
            else
            {
                await Response.WriteAsync("false");
            }
        }

    }
}
