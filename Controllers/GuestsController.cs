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

        [HttpGet("{rsvpCode}")]
        public IEnumerable<Guest> GetGuestsByCode(string rsvpCode)
        {
            using (SqlConnection connection = new SqlConnection(_configuration["SqlConnectionString"]))
            {
                List<Guest> guests = new List<Guest>();
                Guest guest;
                string sqlQuery = "SELECT *"
                    + " FROM [dbo].[Guest]"
                    + $" WHERE [RsvpCode] = '{rsvpCode}'";

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
                        guest.WillAttend = reader["WillAttend"] == DBNull.Value ? null : (bool?)reader["WillAttend"];
                        guest.Email = reader["Email"].ToString();
                        guest.EOrK = reader["EorK"].ToString();
                        guest.RsvpCode = reader["RsvpCode"].ToString();
                        guest.FullName = reader["FullName"].ToString();

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


        [HttpGet("all")]
        public IEnumerable<Guest> GetGuests()
        {
            using (SqlConnection connection = new SqlConnection(_configuration["SqlConnectionString"]))
            {
                List<Guest> guests = new List<Guest>();
                Guest guest;
                string sqlQuery = "SELECT *"
                    + " FROM [dbo].[Guest]";

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
                        guest.WillAttend = reader["WillAttend"] == DBNull.Value ? null : (bool?)reader["WillAttend"];
                        guest.Email = reader["Email"].ToString();
                        guest.EOrK = reader["EorK"].ToString();
                        guest.RsvpCode = reader["RsvpCode"].ToString();
                        guest.FullName = reader["FullName"].ToString();

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
            public int ID { get; internal set; }
            public string LastName { get; set; }
            public string FirstName { get; set; }
            public bool? WillAttend { get; set; }
            public string Email { get; set; }
            public string EOrK { get; set; }
            public string RsvpCode { get; set; }
            public string FullName { get; set; }
        }
    }
}
