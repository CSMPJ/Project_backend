const express = require("express");
const mysql = require("mysql2");
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors());

const client = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "chansithjob",
    database: "new_schema",
    port: "3306"
});

client.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

// console.log(client);
app.post("/member/Register", (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    // console.log(res);
    // console.log(req);
    // `SELECT COUNT(id) FROM public."users"`
    client.query(`SELECT * FROM new_schema.client WHERE username ='${username}'`,
    (err, result) =>{
        console.log(err);
        // console.log(result);
        if (result.length == 0) {          
            client.query(`INSERT INTO client (username, password) VALUES('${username}','${password}')`,
            [username, password],
                (err, result) =>{
                    console.log(err);
                    console.log(result);
                    res.send({message:"Register success!!"});
                }
                );
            
            ; 
        }
        else{
            res.send({message:"user already register"});
            console.log(err)
        }
    }
    );
    
   
    
}
);

app.post('/member/login',(req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    client.query(
        `SELECT * FROM new_schema.client WHERE username = '${username}' AND password = '${password}'`,
        [username, password],
        (err, result) =>{
            if (err) {
                res.send({ err: err });
            } 
            // console.log(result.length);
           
                if(result.length == 0){
                    res.send({message:"Wrong username or password combination"});
                }else{
                    console.log(result);
                    res.send(result);
                }
            
            }
        
    );
});



app.post('/products', async (req, res)=>{
    const products = req.body.products;
    console.log(products)
    function manage (p){
        let list = "";
        let list_ID = "";
        for(var i = 0; i<p.length; i++){
            list = list+`WHEN ${p[i].Product_ID} THEN Product_quantity - ${p[i].quantity_buy} \n`
            list_ID = list_ID+( i == p.length-1  ? `${p[i].Product_ID}` : `${p[i].Product_ID},`)
            if(i==p.length-1){
                return `update new_schema.product set Product_quantity = CASE Product_ID \n ${list} END where Product_ID IN (${list_ID})`
            }
        }
    }
    
    client.query(
        await manage(products),
        async(err, result) =>{
            if (err) {
                console.log({ err: err });
            } 
            // console.log(result.length);
            
                    console.log(result); 

                }
            
            
        
        );
    ///ใส่?ที่109,105เช็คค่าว่ามีอะเป่า
});

app.get('/products',(req, res)=>{
    const products = req.body.products;
    console.log(products)
    client.query(
        `SELECT * FROM new_schema.product`,
        (err, result) =>{
            if (err) {
                res.send({ err: err });
            } 
            // console.log(result.length);
           
                if(result.length == 0){
                    res.send({message:"Wrong username or password combination"});
                }else{
                    console.log(result);
                    res.send(result);
                }
            
            }
        
    );
});

app.listen(3001, ()=>{
    console.log("Sever is now listening at port 3001")
})


// client.query("SELECT * FROM client WHERE username = ?",
// [username],
// (err, result) =>{
//     if (result.rows.length == 0) {          
//         client.query("INSERT INTO client (username, password) VALUES(?.?)",
//         [username, password],
//             (err, result) =>{
//                 console.log(err);
//             }
//             );
        
//         ; 
//     }
//     else{
//         res.send({message:"user already register"});
//     }
// }
// );





// client.query(`SELECT * FROM public."users" WHERE username = '${username}'`,
// (err, result) =>{
//     if (result.rows.length == 0) {
//         client.query(`SELECT COUNT(id) FROM public."users"`,
//         (err, result) =>{
//             console.log(result.rows[0].count); 
//             client.query(`INSERT INTO public."users" (id, username, password) VALUES(${result.rows[0].count}, '${username}','${password}')`,
//             (err, result) =>{
//                 console.log(err);
//             }
//             );
//         }
//         ); 
//     }
//     else{
//         res.send({message:"user already register"});
//     }
// }
// );



// }
// );

// app.post('/login',(req, res)=>{
// const username = req.body.username;
// const password = req.body.password;


// client.query(
//     `SELECT * FROM public."users" WHERE username = '${username}' AND password = '${password}'`,
    
//     (err, result) =>{
//         if (err) {
//             res.send({ err: err });
//         } 
//         console.log(result.rows.length);
       
//             if(result.rows.length == 0){
//                 res.send({message:"Wrong username or password combination"});
//             }else{
//                 res.send(result);
//             }
        
//         }
    
// );
// });







// (err, result) =>{
//     if (err) {
//         res.send({ err: err });
//     } 
//     console.log(result.rows.length);
//     bcrypt.conpare(password,result[0].password,(error, response) => {
//         if(result.rows.length == 0){
//             res.send({message:"Wrong username or password combination"});
//         }else{
//             res.send(result);
//         }
//     });
//     }

// app.get('/users', (req, res)=>{
    
//     client.query(`Select * from users`, (err, result)=>{
//         console.log(result)
//         if(!err){
//             res.send(result.rows);
//         }
//     });
//     client.end;
// })

// app.get('/users/:id', (req, res)=>{
//     client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
//         if(!err){
//             res.send(result.rows);
//         }
//     });
//     client.end;
// })



