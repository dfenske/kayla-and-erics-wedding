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
    public class GuestsController : Controller
    {
        private readonly IConfiguration _configuration;

        public GuestsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        
        [HttpGet("all")]
        public IEnumerable<Guest> GetGuests()
        {
            using (SqlConnection connection = new SqlConnection(_configuration["SqlConnectionString"]))
            {
                List<Guest> guests = new List<Guest>();
                Guest guest;
                string sqlQuery = "SELECT TOP (5) "
                    + "[ID]"
                    + ",[LastName]"
                    + ",[FirstName]"
                    + ",[Address]"
                    + ",[Email]"
                    + ",[Response]"
                    + ",[NumInParty]"
                    + " FROM[master].[dbo].[Guests]";

                SqlCommand command = new SqlCommand(sqlQuery, connection);

                try
                {
                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        guest = new Guest();   
                        guest.ID = int.Parse(reader["ID"].ToString());
                        guest.LastName = reader["LastName"].ToString();
                        guest.FirstName = reader["FirstName"].ToString();
                        guest.Address = reader["Address"].ToString();
                        guest.Email = reader["Email"].ToString();
                        guest.Response = reader["Response"].ToString();
                        guest.NumInParty = int.Parse(reader["NumInParty"].ToString());

                        guests.Add(guest); //Place the dictionary into the list
                    }

                    reader.Close();
                    // Create the command
                    //command = new SqlCommand("INSERT INTO Persons (PersonID, LastName, FirstName) VALUES (@id, @lastName, @firstName)", connection);
                    // Add the parameters.
                    //command.Parameters.Add(new SqlParameter("id", 3));
                    //command.Parameters.Add(new SqlParameter("lastName", "Fenske"));
                    //command.Parameters.Add(new SqlParameter("firstName", "Marla"));

                    //command.ExecuteNonQuery();
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
            public int ID { get; internal set; }
            public string LastName { get; set; }
            public string FirstName { get; set; }
            public string Address { get; set; }
            public string Email { get; set; }
            public string Response { get; set; }
            public int NumInParty { get; set; }
        }
    }
}
