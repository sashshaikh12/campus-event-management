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
        connection.release();
        res.send({
            name,
            email,
            department,
            phone,
        });
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
      `SELECT * FROM Club_Heads WHERE Club_Head_ID = ?`,
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
  const { id, blacklist} = req.body;
  try {
    const connection = await pool.getConnection();
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
    
    connection.release();
    res.send({ success: true, message: "Student blacklisted successfully" });
     
  } catch (e) {
    console.error(e);
    res.status(500).send("Couldn't update sqldb");
  }
});

app.listen(5000,()=>{
    console.log("Everybody")
})