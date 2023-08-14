using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace kz.Controllers
{
    public class JsonData
    {
        public string? TabelCode { get; set; }
        public string? PhoneCode { get; set; }
    }

    [ApiController]
    [Route("[controller]")]
    public class PhoneCodeController : Controller
    {
        private bool _sendToSmsServer(string PhoneCode)
        {
            return true;
        }
        private string _generatePhoneCode()
        {
            return "000000";
        }
      

        public bool CreatePhoneCode(User user)
        {
            string generatedCode = _generatePhoneCode();
            _sendToSmsServer(generatedCode);
            user.PhoneCode = generatedCode;
            return true;
        }

        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            // получаем табельный код и введеный смс код
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
                if (user.PhoneCode == data.PhoneCode)
                {
                    // ДОДЕЛАТЬ
                    // генерируем токен
                    // посылаем в бд
                    string token = "123123";
                    await Response.WriteAsync("{\"Token\":\"" + token + "\"}");
                    user.PhoneCode = "";
                    db.Users.Update(user);
                    await db.SaveChangesAsync();
                }
                else
                {
                    await Response.WriteAsync("false");
                }
            }
            else
            {
                await Response.WriteAsync("false");
            }
        }
    }
}
