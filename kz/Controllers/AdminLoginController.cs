using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using static System.Net.Mime.MediaTypeNames;
using System;
using System.Collections.Generic;

namespace kz.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AdminLoginController : Controller
    {
        public class JsonObj
        {
            public string? Password { get; set; }
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
            if(data.Password == "000000")
            {
                await Response.WriteAsync("{\"APIkey\":\"" + LoginController.ToSHA256("banana") + "\"}");
            }
            else
            {
                await Response.WriteAsJsonAsync(new { Error = "Ошибка авторизации" });
            }
        }
    }
}
