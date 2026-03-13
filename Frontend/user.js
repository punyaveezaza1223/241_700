// 1. โหลด user ทั้งหมดจากเส้นapi http://localhost:3000/users

// 2. นำ user ที่ได้มาแสดงผลที่หน้าเว็ปhtml
const BASE_URL = 'http://localhost:3000'
window.onload = async () => {
    await loadData();
}

const loadData = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    console.log(response.data);
    const userDOM = document.getElementById("user");
    let htmlData = '<div>';
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i];
        htmlData += ` <div>
        ${user.firstName} ${user.lastName}
        <button>Edit</button>
        <button class='delete' data-id='${user.id}'>Delete</button>
        </div>`
    }
    htmlData += '</div>';
    userDOM.innerHTML = htmlData;

    const deleteDOMs = document.getElementsByClassName("delete");
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener("click", async (event) => {
            const id = event.target.dataset.id;
            try{
                await axios.delete(`${BASE_URL}/users/${id}`);
                loadData(); 
            }catch(error){
                console.error("Error deleting user:", error);
            }    
        });
    }
}