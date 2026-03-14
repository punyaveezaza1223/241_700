const BASE_URL = 'http://localhost:3000';

let mode = 'create';
let selectdId = '';

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id', id);
    if (id) {
        mode = 'EDIT';
        selectdId = id;

        try{
            const response = await axios.get(`${BASE_URL}/users/${id}`);
            //console.log('response', response.data);
            const user = response.data[0];
            let firstNameDOM = document.querySelector('input[name=firstname]');
            let lastNameDOM = document.querySelector('input[name=lastname]');
            let ageDOM = document.querySelector('input[name=age]');
            let descriptionDOM = document.querySelector('textarea[name=description]');
            let messageDom = document.getElementById('message');

            firstNameDOM.value = user.firstName;
            lastNameDOM.value = user.lastName;
            ageDOM.value = user.age;
            descriptionDOM.value = user.description;

            let genderDOMs = document.querySelectorAll('input[name=gender]');
            let interestDOMs = document.querySelectorAll('input[name=interests]') ;
            for (let i = 0; i < genderDOMs.length; i++){
                if (genderDOMs[i].value == user.gender) {
                    genderDOMs[i].checked = true;
                }
            }

            for (let i = 0; i < interestDOMs.length; i++) {
                if (user.interests.includes(interestDOMs[i].value)) {
                    interestDOMs[i].checked = true;
                }
            }


        } catch(error){
            console.error("Error fetching user data:", error);
        }

    }
}
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
const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name=firstname]');
    let lastNameDOM = document.querySelector('input[name=lastname]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked') || {} ;
    let interestDOMs = document.querySelectorAll('input[name=interests]:checked') || {};
    let descriptionDOM = document.querySelector('textarea[name=description]');
    let messageDom = document.getElementById('message');
try{
    let interest = ''
    for (let i = 0; i < interestDOMs.length; i++) {
        interest += interestDOMs[i].value 
        if (i != interestDOMs.length - 1) {
            interest += ','
        }
    }

    let userData ={
        firstName: firstNameDOM.value,
        lastName: lastNameDOM.value,
        age: ageDOM.value,
        gender: genderDOM.value,
        description: descriptionDOM.value,
        interests: interest
    }
    console.log('submitData', userData);
    const errors = validateData(userData);
    if (errors.length > 0) {
        throw {
            message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
           errors: errors
       }
    }

    let message = "บันทึกสำเร็จ";
    if (mode == 'CREATE') {
        const response = await axios.post(`${BASE_URL}/users`, userData);
        const responseData = response.data;
    } else {
        const response = await axios.put(`${BASE_URL}/users/${selectdId}`, userData);
        message = "แก้ไขสำเร็จ";
        console.log('response', response.data);
    }

    messageDom.innerText = message;
    messageDom.className = "message success";




        const response = await axios.post(`${BASE_URL}/users`, userData);
        console.log('response', response);
        messageDom.innerText = "บันทึกสำเร็จ";
        messageDom.className = "message success";
    }catch(error){
        console.log('error message', error.message);
        console.log('error details', error.errors);

        if (error.response) {
            console.log("error response: ", error.response);
            error.message = error.response.data.message
            error.errors = error.response.data.errors
        }
        
        let htmlData = '<div>'
        htmlData += `<div>${error.message}</div>`;
        htmlData += '<ul>';
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`;
        }
        htmlData += '</ul>';
        htmlData += '</div>';

        messageDom.innerHTML = htmlData;
        messageDom.className = "message danger";
    }
     
}