window.addEventListener("DOMContentLoaded",async function(e){
    e.preventDefault();
    const token=localStorage.getItem('token');
    const response= await axios.get('http://localhost:8030/api/users/profile',{headers:{"Authorization":token}});
    const user=response.data;
    document.getElementById("name").textContent = user.name;
    document.getElementById("email").textContent = user.email;
    document.getElementById("phone").textContent = user.phonenumber ||"Please provide valid number";
    document.getElementById("gender").textContent = user.gender ||"Please provide valid gender";
    document.getElementById("address").textContent = user.address ||"Please provide valid address";
    document.getElementById("profession").textContent = user.profession ||"Please provide valid profession";
});

function updateUser() {
    const userDetails = document.getElementById("user-details");

    // Check if the form already exists to prevent duplication
    if (document.getElementById("update-form")) {
        return;
    }

    // Get existing user data
    const name = document.getElementById("name").innerText;
    const email = document.getElementById("email").innerText;
    const phone = document.getElementById("phone").innerText;
    const gender = document.getElementById("gender").innerText;
    const address = document.getElementById("address").innerText;
    const profession = document.getElementById("profession").innerText;

    // Create form
    const formHTML = `
          <form onsubmit="update(event)">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" value="${name}" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="${email}" required>
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" value="${phone}" required>
            <label>Gender:</label>
            <label><input type="radio" name="gender" value="Male" required> Male</label>
            <label><input type="radio" name="gender" value="Female" required> Female</label>
            <label><input type="radio" name="gender" value="Others" required> Others</label>
            <label for="address">Address:</label>
            <textarea id="address" name="address" rows="3" placeholder="${address}" required></textarea>
            <label for="profession">Profession:</label>
            <input type="text" id="profession" name="profession" value="${profession}" required>
        <button type="submit">Submit</button>
    </form>
    `;
    // Append form to the page
    userDetails.insertAdjacentHTML("beforeend", formHTML);
}

 function update(e) {
    e.preventDefault();
    const userDetails={
        name:e.target.name.value,
        email:e.target.email.value,
        phone:e.target.phone.value,
        gender:e.target.gender.value,
        address:e.target.address.value,
        profession:e.target.profession.value,
    }
    const token=localStorage.getItem('token');
    axios.put("http://localhost:8030/api/users/update",userDetails,{headers:{"Authorization":token}})
    .then((response)=>{
        
        alert(response.data.message);
   
    window.location.reload();
        
    }).catch(err=>console.log(err)); 

   
}
