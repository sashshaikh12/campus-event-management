import express, { json } from 'express'
import mysql from  'mysql2/promise'
import cors from 'cors'
import { sql_password, database_name } from './password.js';



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
      connection.release();
    res.send({
      name,
      email,
      department,
      phone,
      role
    })
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
    const [rows] = await connection.execute('SELECT * FROM Event WHERE TRIM(url) IS NOT NULL AND TRIM(url) != ""');
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
  const { name, clubName, eventName, eventDate, eventStartTime, eventEndTime, eventVenue, eventDesc, eventBudget } = req.body;
  try {
    const connection = await pool.getConnection();

    const [clubRows] = await connection.execute(
      'SELECT Club_ID FROM Club WHERE Club_head = ? AND Club_name = ?',
      [name, clubName]
    );

    if (clubRows.length === 0) {
      connection.release();
      return res.status(404).send("Club head not found");
    }

    const club_id = clubRows[0].Club_ID;

    const [newclubrows] = await connection.execute(
      'SELECT Club_Head_ID FROM Club WHERE Club_head = ? AND Club_ID = ?',
      [name , club_id]
    );

    if (newclubrows.length === 0) {
      connection.release();
      return res.status(404).send("Club head id not found");
    }

    const club_head_id = newclubrows[0].Club_Head_ID;

    const [roomRows] = await connection.execute(
      'SELECT Room_ID FROM Room WHERE Room_name = ?',
      [eventVenue]
    );
    

    if (roomRows.length === 0) {
      connection.release();
      return res.status(404).send("Room not found");
    }


    const room_id = roomRows[0].Room_ID;

    await connection.execute(

      'INSERT INTO Event (Event_name, Event_date, Event_time, Event_description,Club_Head_id, Event_End_Time,Room_ID, Approved, Budget) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [eventName,eventDate,eventStartTime,eventDesc,club_head_id, eventEndTime, room_id, "waiting", eventBudget]
    );  
    connection.release();
    res.send({
      eventName,
      eventDate,
      eventStartTime,
      eventEndTime,
      eventVenue,
      eventDesc,
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

app.post("/eventReq/addURL", async (req, res) => {

  const { event_Id, url } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'UPDATE Event SET url = ? WHERE Event_ID = ?',
      [url, event_Id]
    );
    connection.release();
    res.send({ success: true, message: "URL added successfully" });
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
  console.log(id);
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


app.listen(5000,()=>{
    console.log("Everybody")
})