using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using static System.Net.Mime.MediaTypeNames;
using System;
using System.Collections.Generic;
using System.Net;

namespace kz.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AdminLoginController : Controller
    {
        public class JsonObj
        {
            public string? Password { get; set; }
            public string? APIkey { get; set; }
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

            Admin? admin = await db.Admins.FirstOrDefaultAsync(a => a.Password == kz.Controllers.LoginController.ToSHA256(data.Password));

            if (admin != null)
            {
                string apikey = LoginController.ToSHA256(new Random().Next().ToString());
                admin.APIkey = apikey;
                db.Admins.Update(admin);
                db.SaveChanges();
                await Response.WriteAsync("{\"APIkey\":\"" + apikey + "\"}");
            }
            else
            {
                await Response.WriteAsJsonAsync(new { Error = "Ошибка авторизации" });
            }
        }
    }
}
