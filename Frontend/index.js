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
    //if (errors.length > 0) {
    //    throw {
     //       message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
     //       errors: errors
    //    }
    //}
        const responese = await axios.post('http://localhost:3000/users', userData);
        console.log('response', responese);
        messageDom.innerText = "บันทึกสำเร็จ";
        messageDom.className = "message success";
    }catch(error){
        console.log('error message', error.message);
        console.log('error details', error.errors);

        if (error.response) {
            console.log("error response: ", error.responese);
            error.message = error.responese.data.message
            error.errors = error.responese.data.errors
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