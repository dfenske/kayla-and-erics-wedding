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

        [HttpPost("update")]
        public Boolean UpdateGuests([FromBody]Data data)
        {
            using (SqlConnection connection = new SqlConnection(_configuration["SqlConnectionString"]))
            {
                try
                {
                    connection.Open();

                    if (!string.IsNullOrEmpty(data.Diet) || !string.IsNullOrEmpty(data.SongRequest) || !string.IsNullOrEmpty(data.Message))
                    {
                        // Write the notes to the Notes table
                        var query = data.Diet != null ? $"Dietary = '{data.Diet}'" : "";
                        if (!string.IsNullOrEmpty(data.SongRequest))
                        {
                            if (!string.IsNullOrEmpty(data.Diet))
                            {
                                query += ", ";
                            }
                            query += $"Songs = '{data.SongRequest}'";
                        }
                        if (!string.IsNullOrEmpty(data.Message))
                        {
                            if (!string.IsNullOrEmpty(data.Diet) || !string.IsNullOrEmpty(data.SongRequest))
                            {
                                query += ", ";
                            }
                            query += $"Notes = '{data.Message}'";
                        }
                        var sqlQuery = ("UPDATE Notes"
                        + $" SET {query}"
                        + $" WHERE RsvpCode = '{data.Cookie}';");

                        var command = new SqlCommand(sqlQuery, connection);
                        var numRows = command.ExecuteNonQuery();

                        if (numRows == 0)
                        {
                            query = "";
                            var values = "";
                            if (!string.IsNullOrEmpty(data.Diet))
                            {
                                query += "Dietary";
                                values += $"'{data.Diet}'";
                            }
                            if (!string.IsNullOrEmpty(data.SongRequest))
                            {
                                if (!string.IsNullOrEmpty(data.Diet))
                                {
                                    query += ", ";
                                    values += ", ";
                                }
                                query += "Songs";
                                values += $"'{data.SongRequest}'";
                            }
                            if (!string.IsNullOrEmpty(data.Message))
                            {
                                if (!string.IsNullOrEmpty(data.Diet) || !string.IsNullOrEmpty(data.SongRequest))
                                {
                                    query += ", ";
                                    values += ", ";
                                }
                                query += "Notes";
                                values += $"'{data.Message}'";
                            }
                            query += $", RsvpCode";
                            values += $", '{data.Cookie}'";

                            sqlQuery = $"INSERT INTO Notes({query}) VALUES ({values})";

                            command = new SqlCommand(sqlQuery, connection);
                            numRows = command.ExecuteNonQuery();
                        }


                    }
                    // Write the guests to guest table
                    foreach (var d in data.GuestData)
                    {
                        var query = d.Response != null ? $"WillAttend = '{(d.Response.Equals("no") ? 0 : 1)}'" : "";
                        if (d.Email != null)
                        {
                            if (d.Response != null)
                            {
                                query += ", ";
                            }
                            query += $"Email = '{d.Email}'";
                        };

                        var sqlQuery = ("UPDATE Guest"
                        + $" SET {query}"
                        + $" WHERE ID = {d.GuestId};");

                        var command = new SqlCommand(sqlQuery, connection);
                        var numRows = command.ExecuteNonQuery();
                    }
                    return true;
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
            }
            return true;
        }

        public class Data
        {
            public string Diet { get; set; }
            public string SongRequest { get; set; }
            public string Message { get; set; }
            public List<ResponseData> GuestData { get; set; }
            public string Cookie { get; set; }
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

        public class ResponseData
        {
            public int GuestId { get; set; }
            public string Email { get; set; }
            public string Response { get; set; }
        }
    }
}
