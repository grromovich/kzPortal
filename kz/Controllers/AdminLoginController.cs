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
                await Response.WriteAsync("{\"APIkey\":\"" + LoginController.ToSHA256(new Random().Next().ToString()) + "\"}");
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
                await Response.WriteAsJsonAsync(new { Error = result });
            }
        }
    }
}
