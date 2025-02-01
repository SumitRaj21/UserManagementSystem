form.addEventListener('submit', function(event){
    event.preventDefault();
        let email=document.querySelector('#email').value;
        let password=document.querySelector('#password').value;
        let myobj={
            email:email,
            password:password
        }
axios.post('http://localhost:8030/api/users/login',myobj)
    .then((response) => {
            alert(response.data.message);
            localStorage.setItem('token',response.data.token);
            window.location.href="../user/user_info.html";
    })
    .catch((error) =>{
        console.log(error);
        document.body.innerHTML+=`<div style="color:red">${error.message}</div>`
    });
});

function forgetpassword(){
        window.location.href='./forget.html';
}