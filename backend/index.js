import express, { json } from 'express'
import mysql from  'mysql2/promise'
import cors from 'cors'



const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Passme123',
  database: 'CEMS'
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
            password
        });
    }catch(error){
        console.error(error);
        res.status(500).send("Error registering user");
    }
})

app.listen(5000,()=>{
    console.log("Everybody")
})