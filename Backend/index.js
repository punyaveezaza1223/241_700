const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const port = 8000;

let users =[];
let counter = 1;

/*
GET /users - ดึงข้อมูลผู้ใช้ทั้งหมด
POST /users - เพิ่มผู้ใช้ใหม่
GET /users/:id - ดึงข้อมูลผู้ใช้ตาม ID
PUT /user/:id - แก้ไขข้อมูลผู้ใช้ตาม ID ที่บันทึก
DELETE /users/id: - ลบผุ้ใช้ตาม ID ที่บันทึก
 */



//path: = GET /users
app.get('/users', (req, res) => {
    res.json(users);
});

//path: = POST /user
app.post('/user',(req,res) => {
    let user = req.body;
    user.id = counter
    counter += 1;

    users.push(user);
    res.json({
    message: 'user added successfully',
    user: user
    });
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});