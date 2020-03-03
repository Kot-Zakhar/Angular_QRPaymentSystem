using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Evolve;

namespace QRPaymentSystem.DB
{
    class Program
    {
        static int Main(string[] args)
        {
            try
            {
                var configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                    .AddJsonFile($"appsettings.{Environment.MachineName.ToLower()}.json", optional: true)
                    .Build();
                
                var connectionString = configuration.GetConnectionString("DefaultConnection");

                var connection = new MySqlConnection(connectionString);

                var evolve = new Evolve.Evolve(connection, msg => Console.WriteLine(msg)) {

                    Locations = new [] { "Scripts" },
                    IsEraseDisabled = false
                };

                evolve.Migrate();

            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine(ex.Message);
                Console.ResetColor();

                return -1;
            }
            // var upgrader =
            //     DeployChanges.To
            //         .MySqlDatabase(connectionString)
            //         .WithScriptsFromFileSystem("./Scripts")
            //         .LogToConsole()
            //         .Build();

            // var result = upgrader.PerformUpgrade();

            // if (!result.Successful)
            // {

            //     #if DEBUG
            //     Console.ReadLine();
            //     #endif                
                
            //     return -1;
            // }

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("Success!");
            Console.ResetColor();
            return 0;
        }
    }
}
