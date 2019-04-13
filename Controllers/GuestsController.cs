using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

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
                        var sqlQuery = ($"INSERT INTO Notes (Dietary, Notes, Songs, RsvpCode) Values ('{data.Diet}', '{data.Message}', '{data.SongRequest}', '{data.Cookie}')");
                        var command = new SqlCommand(sqlQuery, connection);
                        var numRows = command.ExecuteNonQuery();
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
        [HttpGet("notes")]
        public IEnumerable<Note> GetNotes()
        {
            using (SqlConnection connection = new SqlConnection(_configuration["SqlConnectionString"]))
            {
                List<Note> notes = new List<Note>();
                Note note;
                string sqlQuery = "SELECT *"
                    + " FROM [dbo].[Notes]";

                SqlCommand command = new SqlCommand(sqlQuery, connection);

                try
                {
                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        note = new Note();
                        note.ID = int.Parse(reader["ID"].ToString());
                        note.Dietary = reader["Dietary"].ToString();
                        note.Notes = reader["Notes"].ToString();
                        note.Songs = reader["Songs"].ToString();
                        note.RsvpCode = reader["RsvpCode"].ToString();

                        notes.Add(note); //Place the dictionary into the list
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
                return notes;
            }
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

    public class Note
    {
        public Note()
        {
        }

        public int ID { get; set; }
        public string Dietary { get; set; }
        public string Notes { get; set; }
        public string Songs { get; set; }
        public string RsvpCode { get; set; }
    }
}
