const express = require("express");
const cors = require('cors');
const data = require('mysql');
const bodyparser=require("body-parser"); 

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(express.static('public'));

let con = data.createConnection({
    host : "localhost",
    user : "root",
    password : "Priya9700@" ,
    database : "employee"
})

con.connect(function(error){
    if(error)
    {
        console.log(error);
    }else{
        console.log("Success");
    }
})


app.post('/add',(request,response)=>{
  try{
      console.log(JSON.stringify(request.body));
      let  {name,job,gender,hire_date,salary}=request.body;
      if(name !=null && job !=null && gender !=null && hire_date !=null && salary!=null ){
      let sql='insert into employee_detail(name,job,gender,hire_date,salary) values(?,?,?,?,?)';
      con.query(sql,[name,job,gender,hire_date,salary],(error,result)=>{
          if(error){
              let s={"status":"error"};
              response.send(s);
              console.log(error);
          }else{
              let s={"status":"success"};
              response.send(s);
          }
      })}else{
          let s={"status":"InvalidData"};
          response.send(s);
      }
  }catch(e){
      response.send(e);
  }
})

app.get('/get',(req,res)=> {
    const sql = "select * from  employee_detail";
    con.query(sql,(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data)
        
    })
})

app.delete("/delete/:id", (req, res) => {
  let sql = "DELETE FROM  employee_detail  WHERE id= ?" ;
   const id=req.params.id;
      con.query(sql, [id], (err, data)=>{
        if (err)return res.json("Error");
        return res.json(data);
      })
    })


//     app.get('/edits/:id', (request, response) => {
//       let { id } = request.params;
//       let sql = "select * from employee_detail where id=?";
//       con.query(sql, [id], (error, result) => {
//           if (error) {
//               response.send(error);
//           }
//           else {
//               response.send(result);
//           }
//       })
//   })
  // put call for updates details ;
  app.put('/updateuser/:id', (request, response) => {
      let id = request.params.id;
      let { name, job,gender,hire_date,salary} = request.body;
      let sql = 'update employee_detail set name=?,job=?,gender=?,hire_date=?,salary=? where id=?'
      con.query(sql, [name, job,gender,hire_date,salary, id], (error, result) => {
          if (error) {
              let a = { "status": "error" };
              response.send(a);
          }
          else {
              let a = { "status": "success" };
              response.send(a);
          }
      })
  })



  app.get('/singledata/:id', (req, res) => {
    const { id } = req.params;
    const sqlGet = "select * from employee_detail where id=?";
    con.query(sqlGet, id, (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
            res.send(result);
        }
    });

});




app.listen(3305, () => {
     console.log("Server Running on port no 3304") 
    });