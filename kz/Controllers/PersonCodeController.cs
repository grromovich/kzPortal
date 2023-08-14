using Azure;
using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace kz.Controllers
{
    public class Tabel
    {
        public string? TabelCode { get; set; }
    }

    [ApiController]
    [Route("[controller]")]
    public class PersonCode : Controller
    {
        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            Tabel code;
            using (var reader = new StreamReader(Request.Body))
            {
                var body = await reader.ReadToEndAsync();
                code = JsonSerializer.Deserialize<Tabel>(body);
            }
            User? user = await db.Users.FirstOrDefaultAsync(u => u.TabelCode == code.TabelCode);
            if (user != null)
            {
                bool PhoneCodeCreated = new PhoneCodeController().CreatePhoneCode(user);
                
                if (PhoneCodeCreated)
                {
                    db.Users.Update(user);
                    await db.SaveChangesAsync();
                    // Берём номер юзера, сокращаем до 2-х последних цифр и отправляем обратно
                    // в любом другом случае возрващаем false
                    await Response.WriteAsync(user.PhoneNumber.Substring(user.PhoneNumber.Length-2));
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
