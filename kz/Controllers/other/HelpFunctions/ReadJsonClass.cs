using System.Text.Json;
using kz.Controllers.other.HttpClasses;
using System;

namespace kz.Controllers.other.HelpFunctions
{
    public class ReadJsonClass
    {
        public static async Task<AdminPasswordChangeRequest> ReadJson(Stream stream ,AdminPasswordChangeRequest data)
        {
            using (var reader = new StreamReader(stream))
            {
                var body = await reader.ReadToEndAsync();
                data = JsonSerializer.Deserialize<AdminPasswordChangeRequest>(body);
            }
            return data;
        }
        public static async Task<AdminDataRequest> ReadJson(Stream stream, AdminDataRequest data)
        {
            using (var reader = new StreamReader(stream))
            {
                var body = await reader.ReadToEndAsync();
                data = JsonSerializer.Deserialize<AdminDataRequest>(body);
            }
            return data;
        }
        public static async Task<AdminGetUserInfoRequest> ReadJson(Stream stream, AdminGetUserInfoRequest data)
        {
            using (var reader = new StreamReader(stream))
            {
                var body = await reader.ReadToEndAsync();
                data = JsonSerializer.Deserialize<AdminGetUserInfoRequest>(body);
            }
            return data;
        }
        public static async Task<DataRequest> ReadJson(Stream stream, DataRequest data)
        {
            using (var reader = new StreamReader(stream))
            {
                var body = await reader.ReadToEndAsync();
                data = JsonSerializer.Deserialize<DataRequest>(body);
            }
            return data;
        }
        public static async Task<FileToPrintRequest> ReadJson(Stream stream, FileToPrintRequest data)
        {
            using (var reader = new StreamReader(stream))
            {
                var body = await reader.ReadToEndAsync();
                data = JsonSerializer.Deserialize<FileToPrintRequest>(body);
            }
            return data;
        }
        public static async Task<LoginRequest> ReadJson(Stream stream, LoginRequest data)
        {
            using (var reader = new StreamReader(stream))
            {
                var body = await reader.ReadToEndAsync();
                data = JsonSerializer.Deserialize<LoginRequest>(body);
            }
            return data;
        }
        public static async Task<PasswordChangeRequest> ReadJson(Stream stream, PasswordChangeRequest data)
        {
            using (var reader = new StreamReader(stream))
            {
                var body = await reader.ReadToEndAsync();
                data = JsonSerializer.Deserialize<PasswordChangeRequest>(body);
            }
            return data;
        }
    }
}
