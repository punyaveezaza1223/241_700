/*
//string - ตัวอักษร
let fname  = 'john';
const idcard = 123;

//number - ตัวเลข
let age    = 30;
let height = 175.5;

//boolean - ค่าความจริง
let isThai = false;

fname = 'tom'
idcard = 456 
console.log('ID Card: ' + idcard); // จะ error เพราะ const ไม่สามารถเปลี่ยนค่าได้
console.log('Name: ' + fname);
console.log('Age: ' + age);
console.log('Height: ' + height , ' cm');
console.log('Is Thai:' + isThai); */

/*
+ บวก
- ลบ
* คูณ
/ หาร
% หารเอาเศษ(mod)
** ยกกำลัง
*/

/* ตัวอย่างการใช้ตัวดำเนินการทางคณิตศาสตร์
let number1 = 5;
let number2 = 10;

let condition1 = number1 + ' ' + number2

console.log('Number 3:', number3)


/* (if else switch) เงื่อนไข
  == เท่ากับ
  != ไม่เท่ากับ
  > มากกว่า
  >= มากกว่าหรือเท่ากับ
  < น้อยกว่า
  <= น้อยกว่าหรือเท่ากับ
  && และ
*/ 

/*
let number1 = 5;
let number2 = 10;

let condition1 = number1 < number2 //boolean(true,false)

console.log('5 มากกว่า 10 Condition1 = ', condition1) */

// ตัวอย่างการใช้เงื่อนไข if else
/*
let number1 = 5;
let number2 = 5;

if (number1 != number2) {
    console.log('!!!ไม่เท่ากับ!!!');
} else if (number1 == number2) {
    console.log('===เท่ากับ===');
} else {
    console.log('---CONDITION FALSE---');
}
*/

/*
Grade Score
>= 80 A
>= 70 B
>= 60 C
>= 50 D
< 50 F

let score = prompt('...Enter your score: ');
if (score >= 80) {
    console.log('Grade A');
} else if (score >= 70) {
    console.log('Grade B');
} else if (score >= 60) {
    console.log('Grade C');    
} else if (score >= 50) {
    console.log('Grade D');    
} else {
    console.log('Grade F');    
}
*/

/*
&& (และ)  ทั้งสองเงื่อนไขต้องเป็นจริง
|| (หรือ)  อย่างน้อยหนึ่งเงื่อนไขต้องเป็นจริง
! (ไม่)  เปลี่ยนค่าความจริง
*/

/*
let number1 = 5;
let number2 = 10;

// True && True = True 
let condition = !(number1 >= 3 && number2 >=5)
console.log('Condition =', condition);
*/

// แยกเลขคู่เลขคี่
/*
let number = prompt('...Enter a Number:');
if (number % 2 == 0){
    console.log(number + ' เป็นเลขคู่');
} else {
    console.log(number + ' เป็นเลขคี่');
}
*/

/*
for (loop)  การทำซ้ำ
*/
/*
let counter = 0;
while (counter <=9) {
    console.log('Hello')
     //1.counter = counter + 1;
     //2.counter += 1;
     //3.counter++;
}


for (let counter=0; counter < 10; counter++) {
    console.log('Hello')
}
*/
/*
// Array
let age = [25,30,35,40,45]; 

age = [200] //เเทนที่

console.log('array',age)
console.log('index'.age)

//ต่อ array (ตัวสุดท้าย)
age.push(25)
console.log('array',age)

//ลบ array (ตัวสุดท้าย)
age.pop()
console.log('array',age)
*/
/*
let age = [30,25,40,45,50];

if (age.includes(25)){
    console.log('เจอเลข 22 ในอาเรย์')
} else {
    console.log('ไม่เจอเลข 22 ในอาเรย์')
}

age.sort()
console.log('อาเรย์หลังเรียงค่า',age)

//array string
let name_list = ['john','mary','tom','jane']
name_list.push('dd')
console.log('อาเรย์ชื่อ',name_list)
name_list.pop()
console.log('อาเรย์ชื่อ',name_list)
console.log('name_list',name_list.length)
for (let index = 0; index <name_list; index++) {
    console.log('ชื่อที่',index + 1,':',name_list[index])
}
*/

/*
object
 */

/*
let student = [{
    name: 'Sky Walker',
    age: 30,
    grade: 'A'
},{
    name: 'John Doe',
    age: 25,
    grade: 'B'
},{
    name: 'Jane Smith',
    age: 28,
    grade: 'A'
}]
student.push({
    name: 'Mary Jane',
    age: 22,
    grade: 'C'
})

student.pop()

for (let index = 0; index < student.length; index++) {
    console.log('--------- No.', (index + 1) ,'----------------------------')
    console.log('ชื่อนักเรียน:', student[index].name)
    console.log('อายุนักเรียน:', student[index].age)
    console.log('เกรดนักเรียน:', student[index].grade)
} */
/*
// ฟังก์ชัน (function)
let score1 = 55
let score = 65

function calculat_grade(parameter){
    if (score >= 80) {
        grade = 'A'
    } else if (score >= 70) {
        grade = 'B'
    } else if (score >= 60) {
        grade = 'C'    
    } else if (score >= 50) {
        grade = 'D'   
    } else {
        grade ='F'    
    }
return grade
}

//เรียกใช้ function
let grade1 = calculat_grade(score1)
console.log('Grade',grade1)
*/

// array
/*
let score = [20,30,40,50]


for (let index = 0; index < score.length; index++) {
    console.log('score', score[index])
}


let newScore = score.filter((s)=>{
    return s >=30
})  

newScore.forEach((s) => {
    console.log('forEach Score',s)
})
    */

// object function

let students = [
    {
        name: 'Sky Walker',
        age: 30,
        grade: 'A'
    },{
        name: 'John Doe',
        age: 25,
        grade: 'B'
    },{
        name: 'Jane Smith',
        age: 28,
        grade: 'A'

}
]

let student =students.find((s)=>{
    if (s.name == 'John Doe'){
        return true
    }
})

let double_score = students.map((s)=>{
    s.score =s.score * 2
    return s
})

let highScore = students.filter((s)=>{
    if(s.score >=120){
        return true
    }
}) 

console.log(student)
console.log('double',double_score)
console.log('highScore',highScore)