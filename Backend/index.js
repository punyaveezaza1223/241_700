const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const port = 3000;



let users =[];
let counter = 1;

let conn = null;
const initMysql = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8700
    });
    console.log('Connected to MySQL database');
}

app.get('/testdb-new', async (req, res) => { 

    try{
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8700
        });
        const result = await conn.execute('SELECT * FROM users');
        res.json(result[0]);
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(500).json({ error: 'Database connection failed' });
    }
});



//path: = GET /users
app.get('/users', async (req,res) => {
    const result = await conn.query('SELECT * FROM users');
    res.json(result[0]);
});

const validateData = (userData) => {
    let erroes = [];
    if (!userData.firstName) {
        erroes.push('กรุณากรอกชื่อ');
    }
    if (!userData.lastName) {
        erroes.push('กรุณากรอกนามสกุล');
    }
    if (!userData.age) {
        erroes.push('กรุณากรอกอายุ');
    }
    if (!userData.gender) {
        erroes.push('กรุณากรอกเพศ');
    }
    if (!userData.interests) {
        erroes.push('กรุณากรอกความสนใจ');
    }
    if (!userData.description) {
        erroes.push('กรุณากรอกคำอธิบาย');
    }
    return erroes;
}

//path: = POST /user
app.post('/users', async (req,res) => {
    try{
        let user = req.body;
        const errors = validateData(user);
        if (errors.length > 0 ) {
            throw {
                message:"กรุณากรอกให้ครบ",
                errors: errors
            }
        }
            const result = await conn.query('INSERT INTO users SET ?', user);
            res.json({
                message: 'User created successfully',
                data: result[0]
            });
    } catch (error) { 
        const errorMessage = error.message || "Error adding user" ;
        const errors = error.errors || [];
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});


app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const result = await conn.query('SELECT * FROM users WHERE id = ?', id);
        if (result[0].length === 0) {
            throw { statusCode:404 , message: 'User not found' };
        }
        res.json(result[0]);
    } catch (error) {
        const errorMessage = error.message || 'error adding user';
        const errors = error.errors || [];
        console.error('Error fetching user:', error);
        let statusCode = error.statusCode || 500;
        res.status(500).json({ 
            message: error.message ,
            errors: errors
         });
    }

})


app.put('/users/:id', async (req, res) => { 
    try {
            let id = req.params.id;
            let updateUser = req.body;
            const result = await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser, id]);
            res.json({
                message: 'User updated successfully',
                data: result[0]
            });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
 });

app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const result = await conn.query('DELETE FROM users WHERE id = ?', id);
        res.json({
            message: 'User deleted successfully',
            data: result[0]
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});


// path: = PUT /user/:id
app.patch('/user/:id', (req, res) => {
    let id = req.params.id;
    let updateUser = req.body;
    
    // หา user ที่จาก id ที่ส่งมา
    let selectedIndex = users.findIndex(user => user.id == id);

    if (selectedIndex === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (updateUser.firstname) {
        users[selectedIndex].firstname = updateUser.firstname;
    }

    if (updateUser.lastname) {
        users[selectedIndex].lastname = updateUser.lastname;
    }

    res.json({
        message: 'User updated successfully',
        user: users[selectedIndex]
    });
    // ส่ง users ที่อัพเดตแล้วกลับไป
});

app.delete('/user/:id',(req,res) => {
    let id = req.params.id;
    // หา index จาก id  ที่ต้องการลบ
    let selectedIndex = users.findIndex(user => user.id == id);
    

   //ลบuser ออกจาก users
   users.splice(selectedIndex, 1);
   res.json({
            message:'user deleted successfully',
            indexDelete: selectedIndex
   });
})

app.listen(port, async () => {
    await initMysql();
    console.log(`Server is running on http://localhost:${port}`);
});


