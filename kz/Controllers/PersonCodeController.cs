﻿using Azure;
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
                await Response.WriteAsync("true");
            }
            else
            {
                await Response.WriteAsync("false");
            }
        }
    }
}
