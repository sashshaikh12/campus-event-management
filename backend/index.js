import express, { json } from 'express'
import mysql from  'mysql2/promise'
import cors from 'cors'
import { sql_password, database_name } from './password.js';
import e from 'express';



const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: sql_password,
  database: database_name,
});

const app = express()

app.use(express.json());
app.use(cors());


app.post("/faculty-register",async(req,res)=>{
  const {name,email,password,department,phone , role} = req.body;
  try{
    const connection = await pool.getConnection();
    if (role === 'faculty'){
      await connection.execute(
        'INSERT INTO Faculty (Name, Email , Department , Phone_number,Password) VALUES (?, ?,?,?,?)',
        [name,email,department,phone,password]
      );
      // Retrieve the last inserted faculty_id
      const [rows] = await connection.execute('SELECT LAST_INSERT_ID() AS faculty_id');
      const faculty_id = rows[0].faculty_id;

      connection.release();
      res.send({
        name,
        email,
        department,
        phone,
        role,
        faculty_id
      });
    }else if (role=='hod'){
      await connection.execute(
        'INSERT INTO HOD (Name, Email , Department , Phone_number,Password) VALUES (?, ?,?,?,?)',
        [name,email,department,phone,password]
      );
      connection.release();
      res.send({
        name,
        email,
        department,
        phone,
        role
      })
    }else if(role=='room'){
      await connection.execute(
        'INSERT INTO Room_Manager (Name, Email , Phone_number,Password) VALUES (?, ?,?,?)',
        [name,email,phone,password]
      );
      connection.release();
      res.send({
        name,
        email,
        phone,
        role
      })
    }
    else{
      console.error("error");
    }
    
  

  }catch(error){
    console.error(error);
  }
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const tables = ["Student", "Faculty", "Room_Manager", "HOD"];
  
  try {
    const connection = await pool.getConnection();
    
    for (const table of tables) {
      const [rows] = await connection.execute(
        `SELECT * FROM ${table} WHERE Email = ? AND Password = ?`,
        [email, password]
      );
      
      if (rows.length > 0) {
        connection.release();
        return res.send(rows[0]);
      }
    }
    
    connection.release();
    res.status(401).send("Invalid Credentials");
  } catch (error) {
    console.error(error);
    res.status(500).send("Can't sign in");
  }
});


app.post("/register", async(req, res) => {
    const { name, email, password, department,phone , address , year } = req.body;
    try{
        const connection = await pool.getConnection();
        await connection.execute(
            'INSERT INTO Student (Name, Email , Department ,Year, Phone_number,Address,Password) VALUES (?, ?,?,?,?,?,?)',
            [name,email,department,year,phone,address,password]
        );


         // Retrieve the details of the newly inserted student
         const [rows] = await connection.execute(
             'SELECT * FROM Student WHERE Email = ?',
             [email]
         );
 

        connection.release();
        if (rows.length > 0) {
          res.send(rows[0]);
      } else {
          res.status(404).send("Student not found");
      }

    }catch(error){
        console.error(error);
        res.status(500).send("Error registering user");
    }
});

app.post("/eventReq", async (req, res) => {
  const { studentid } = req.body;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      `SELECT * FROM Club WHERE Club_Head_ID = ?`,
      [studentid]
    );
    connection.release();
    if (rows.length > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/EventRegCheck", async (req, res) => {

  const { studentid } = req.body;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      `SELECT * from student where student_id = ? AND Blacklist_status = 'NO'`,
      [studentid]
    );
    connection.release();
    if (rows.length > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }

});

app.get("/eventReq", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT * FROM Room WHERE Availability_status = 'Available'");
    connection.release();
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get("/studentDash", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM Event WHERE TRIM(url) IS NOT NULL AND TRIM(url) != "" AND Approved = "YES"');
    connection.release();
    res.send(rows);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send("Server error");
  }
});

app.get("/studentinfo",async(req,res)=>{
  try{
    const connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT Student_ID,Name,Department,Email,Blacklist_status,Absent_count,Year,Phone_number,Address from Student");
    connection.release();
    res.send(rows);
  }catch(e){
    console.error(e);
    res.status(500).send("Could not retrieve student from sqldb");
  }
});


app.get("/facultyinfo",async(req,res)=>{
  try{
    const connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT Faculty_ID,Name,Department,Email,Phone_number from Faculty");
    connection.release();
    res.send(rows);
  }catch(e){
    console.error(e);
    res.status(500).send("Could not retrieve student from sqldb");
  }
});



app.get("/notification", async(req,res)=>{
  try{
    const connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT Appeals.Appeal_ID, Appeals.Student_ID, Appeals.Appeal, Student.Name FROM Appeals JOIN Student ON Appeals.Student_ID = Student.Student_ID;");
    connection.release();
    res.send(rows);
  }catch(e){
    console.error(e);
    res.status(500).send("Could not retrieve notifications")
  }
});

app.post("/blacklist", async (req, res) => {
  const { id, blacklist,decision} = req.body;
  try {
    const connection = await pool.getConnection();
    if(decision){
      if(decision=='accept'){
        await connection.execute(
          "UPDATE Student SET Blacklist_status = 'NO' WHERE Student_ID = ?",
          [id]
        )
        await connection.execute(
          "DELETE FROM Appeals WHERE Student_ID = ?",
          [id]
        )
      }else{
        await connection.execute(
          "DELETE FROM Appeals WHERE Student_ID = ?",
          [id]
        )
      }
    }else{
      if(blacklist=='YES'){
        await connection.execute(
          "UPDATE Student SET Blacklist_status = 'NO' WHERE Student_ID = ?",
          [id]
        );
      }else{
        await connection.execute(
          "UPDATE Student SET Blacklist_status = 'YES' WHERE Student_ID = ?",
          [id]
        );
      }
    }

    
    
    connection.release();
    res.send({ success: true, message: "Student blacklisted successfully" });
     
  } catch (e) {
    console.error(e);
    res.status(500).send("Couldn't update sqldb");
  }
});

app.post("/eventReq/reqSubmit", async (req, res) => {
  const { name, clubName, eventName, eventDate, eventStartTime, eventEndTime, eventVenue, eventDesc, eventBudget, urls} = req.body;
  try {
    const connection = await pool.getConnection();

    const [clubRows] = await connection.execute(
      'SELECT Club_ID FROM club WHERE Club_head = ? AND Club_name = ?',
      [name, clubName]
    );

    if (clubRows.length === 0) {
      connection.release();
      return res.status(404).send("Club head not found");
    }

    const club_id = clubRows[0].Club_ID;

    const [newclubrows] = await connection.execute(
      'SELECT Club_Head_ID FROM club WHERE Club_head = ? AND Club_ID = ?',
      [name , club_id]
    );

    if (newclubrows.length === 0) {
      connection.release();
      return res.status(404).send("Club head id not found");
    }

    const club_head_id = newclubrows[0].Club_Head_ID;

    const [roomRows] = await connection.execute(
      'SELECT Room_ID FROM room WHERE Room_name = ?',
      [eventVenue]
    );
    

    if (roomRows.length === 0) {
      connection.release();
      return res.status(404).send("Room not found");
    }


    const room_id = roomRows[0].Room_ID;

    await connection.execute(

      'INSERT INTO event (Event_name, Event_date, Event_time, Event_description,Club_Head_id, Event_End_Time,Room_ID, Approved, Budget, URL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [eventName,eventDate,eventStartTime,eventDesc,club_head_id, eventEndTime, room_id, "waiting", eventBudget, urls]
    );  
    connection.release();
    res.send({
      eventName,
      eventDate,
      eventStartTime,
      eventEndTime,
      eventVenue,
      eventDesc,
      eventBudget,
      urls
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering event");
  }
});

app.post("/yourEvents", async (req, res) => {

  const { studentid } = req.body;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      `SELECT e.*, r.Room_name, r.Location
       FROM Event e
       JOIN Room r ON e.Room_ID = r.room_id
       WHERE e.Club_Head_ID = ?`,
      [studentid]
    );
    connection.release();
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }

});

app.put("/eventReq/removeEvent", async (req, res) => {

  const { event_Id} = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'DELETE from event WHERE Event_ID = ?',
      [event_Id]
    );
    connection.release();
    res.send({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }

});

app.get("/eventinfo",async(req,res) =>{
  try{
    const connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT *FROM Room JOIN Event ON Room.Room_ID = Event.Room_ID");
    connection.release();
    res.send(rows);
  }catch(e){
    console.error(e);
    res.status(500).send("Could Not retrieve events from db")
  }
})

app.post("/approveEvent",async(req,res)=>{
  const {id,approval} = req.body;
  try{
    const connection = await pool.getConnection();
    const [rows] = await connection.execute("UPDATE Event SET Approved = ? WHERE Event_ID = ?"
      ,[approval,id]
    );
    connection.release();
    res.send(rows);
  }catch(e){
    console.error(e);
    res.status(500).send("Couldn't approve/reject event")
  }
});


app.post("/getLocation", async (req, res) => {
  const { roomid } = req.body;
  try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(
          'SELECT * FROM room WHERE Room_ID = ?',
          [roomid]
      );
      connection.release();
      if (rows.length > 0) {
          res.json(rows[0]);
      } else {
          res.status(404).send("Location not found");
      }
  } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
  }
});

app.get("/StudentEventRegPics", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM Event WHERE TRIM(url) IS NOT NULL AND TRIM(url) != "" AND Approved = "YES"'
    );
    connection.release();
    res.send(rows);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send("Server error");
  }
});

app.post("/StudentEventRegForm", async (req, res) => {

  const { name, email, department, year, phone, eventID, studentID} = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'INSERT INTO registration (name, email, department, year, phone_number, event_id, student_id, attendance_marked) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, department, year, phone, eventID, studentID, "NO"]
    );
    connection.release();
    res.send({
      name,
      email,
      department,
      year,
      phone,
      eventID,
      studentID
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering student");
  }

});

app.post("/eventReq/sendService", async (req, res) => {

  const { event_Id, service } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'insert into room_service (service_desc, event_id) values (?, ?)',
      [service, event_Id]
    );
    connection.release();
    res.send({ success: true, message: "Service description updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
})

app.post("/roomService", async (req, res) => {
  const { studentID } = req.body; // Extract studentID from the request body

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the query
    const [rows] = await connection.execute(
      `SELECT DISTINCT rs.service_id, rs.service_desc, e.Event_ID, e.Event_name, e.Event_date, e.Event_description, e.Event_time, e.Event_End_Time
       FROM room_service rs
       JOIN event e ON rs.event_id = e.Event_ID
       WHERE e.Club_Head_ID = ?`,
      [studentID]
    );

    // Release the connection back to the pool
    connection.release();

    // Send the fetched rows as the response
    res.status(200).send(rows);
  } catch (error) {
    console.error("Error fetching room services:", error);
    res.status(500).send("Server error");
  }
});

app.post("/FacultyClubEvents", async (req, res) => {
  const { faculty_id } = req.body;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      `SELECT DISTINCT E.* 
       FROM Event E
       INNER JOIN Club C ON E.Club_Head_ID = C.Club_Head_ID
       WHERE C.Faculty_ID = ? AND E.Approved = "YES"`,
      [faculty_id]
    );
    connection.release();
    res.send(rows);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Server error");
  }
});

app.post("/GiveAttendanceSheet", async (req, res) => {
  const { event_id } = req.body;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM registration WHERE event_id = ?',
      [event_id]
    );
    connection.release();
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/MarkAttendance", async (req, res) => {
  const { student_id, event_id } = req.body;
  try {
    const connection = await pool.getConnection();

    // Check if the student is already marked absent in the registration table
    const [rows] = await connection.execute(
      'SELECT attendance_marked FROM registration WHERE student_id = ? AND event_id = ?',
      [student_id, event_id]
    );

    if (rows.length > 0 && rows[0].attendance_marked === "YES") {
      // Student is already marked absent, do nothing
      connection.release();
      return res.send({ success: false, message: "Student is already marked absent" });
    }

    // Increment the absent_count in the student table
    await connection.execute(
      'UPDATE student SET absent_count = absent_count + 1 WHERE student_id = ?',
      [student_id]
    );

    // Check if absent_count is greater than or equal to 3
    const [absentRows] = await connection.execute(
      'SELECT absent_count FROM student WHERE student_id = ?',
      [student_id]
    );

    if (absentRows.length > 0 && absentRows[0].absent_count >= 3) {
      // Update blacklist_status to "yes"
      await connection.execute(
        'UPDATE student SET blacklist_status = "YES" WHERE student_id = ?',
        [student_id]
      );
    }

    // Update the attendance_marked status in the registration table
    await connection.execute(
      'UPDATE registration SET attendance_marked = "YES" WHERE student_id = ? AND event_id = ?',
      [student_id, event_id]
    );

    connection.release();
    res.send({ success: true, message: "Attendance marked successfully and absent count incremented" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/giveAppeal", async (req, res) => {

  const { studentid, appeal } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'INSERT INTO Appeals (Student_ID, Appeal) VALUES (?, ?)',
      [studentid, appeal]
    );
    connection.release();
    res.send({ success: true, message: "Appeal submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }

});

app.post("/getCapacityRem", async (req, res) => {

  const { eventID } = req.body;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT COUNT(*) AS count FROM registration WHERE event_id = ?',
      [eventID]
    );
    connection.release();
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }

});

app.post("/EventAttendanceSummary", async (req, res) => {
  const { event_id } = req.body; // The event ID to filter by
  try {
    const connection = await pool.getConnection();

    // Aggregate query to count attendance and return event details
    const [rows] = await connection.execute(
      `SELECT 
         e.Event_ID,
         e.Event_name,
         e.Event_date,
         e.Event_description,
         COUNT(r.student_id) AS Total_Attendees
       FROM Event e
       LEFT JOIN registration r ON e.Event_ID = r.event_id AND r.attendance_marked = "YES"
       WHERE e.Event_ID = ?
       GROUP BY e.Event_ID, e.Event_name, e.Event_date, e.Event_description`,
      [event_id]
    );

    connection.release();

    if (rows.length > 0) {
      res.send(rows[0]); // Return the aggregate result for the specific event
    } else {
      res.status(404).send("No attendance records found for this event");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


app.get("/mostBookedRooms", async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // Query with a nested subquery to find the most booked room(s)
    const [rows] = await connection.execute(
      // `SELECT Room_ID, Room_name, Bookings 
      //  FROM (
      //    SELECT 
      //      r.Room_ID, 
      //      r.Room_name, 
      //      COUNT(e.Event_ID) AS Bookings
      //    FROM Room r
      //    INNER JOIN Event e ON r.Room_ID = e.Room_ID
      //    GROUP BY r.Room_ID, r.Room_name
      //  ) AS RoomBookingCounts
      //  WHERE Bookings = (
      //    SELECT MAX(Bookings) 
      //    FROM (
      //      SELECT 
      //        COUNT(e.Event_ID) AS Bookings
      //      FROM Room r
      //      INNER JOIN Event e ON r.Room_ID = e.Room_ID
      //      GROUP BY r.Room_ID
      //    ) AS InnerBookingCounts
      //  )`

//       DELIMITER //
// mysql>
// mysql> CREATE PROCEDURE GetMostBookedRooms()
//     -> BEGIN
//     ->     SELECT Room_ID, Room_name, Bookings
//     ->     FROM (
//     ->         SELECT
//     ->             r.Room_ID,
//     ->             r.Room_name,
//     ->             COUNT(e.Event_ID) AS Bookings
//     ->         FROM Room r
//     ->         INNER JOIN Event e ON r.Room_ID = e.Room_ID
//     ->         GROUP BY r.Room_ID, r.Room_name
//     ->     ) AS RoomBookingCounts
//     ->     WHERE Bookings = (
//     ->         SELECT MAX(Bookings)
//     ->         FROM (
//     ->             SELECT
//     ->                 COUNT(e.Event_ID) AS Bookings
//     ->             FROM Room r
//     ->             INNER JOIN Event e ON r.Room_ID = e.Room_ID
//     ->             GROUP BY r.Room_ID
//     ->         ) AS InnerBookingCounts
//     ->     );
//     -> END //

      'CALL GetMostBookedRooms()' // Call the stored procedure to get the most booked room(s)
    );

    connection.release();

    if (rows.length > 0) {
      res.send(rows[0]); // Return the most booked room(s)
    } else {
      res.status(404).send("No room bookings found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});






app.listen(5000,()=>{
    console.log("Everybody")
})