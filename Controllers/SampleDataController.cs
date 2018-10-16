using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace kayla_and_erics_wedding.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly IConfiguration _configuration;

        public SampleDataController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<Guest> WeatherForecasts()
        {
            using (SqlConnection connection = new SqlConnection(_configuration["SqlConnectionString"]))
            {
                List<Guest> guests = new List<Guest>();
                Guest guest;
                string sqlQuery = "SELECT TOP (5) [PersonID]"
                    + ",[LastName]"
                    + ",[FirstName]"
                    + ",[Address]"
                    + ",[City]"
                    + ",[Email]"
                    + ",[Response]"
                    + ",[NumInParty]"
                    + ",[State]"
                    + " FROM[master].[dbo].[Persons]";

                SqlCommand command = new SqlCommand(sqlQuery, connection);

                try
                {
                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        guest = new Guest();   
                        guest.LastName = reader["LastName"].ToString();
                        guest.FirstName = reader["FirstName"].ToString();
                        guest.Address = reader["Address"].ToString();

                        guests.Add(guest); //Place the dictionary into the list
                    }
                    reader.Close();
                }
                catch (Exception ex)
                {
                    //If an exception occurs, write it to the console
                    Console.WriteLine(ex.ToString());
                }
                finally
                {
                    connection.Close();
                }
                return guests;
            }
        }

        public class Guest
        {
            public string FirstName { get; set; }
            public int NumInParty { get; set; }
            public string LastName { get; set; }
            public string Address { get; set; }
        }
    }
}
