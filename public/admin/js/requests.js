const loginForm = document.querySelector('.login-form');
const logOutBtn = document.querySelectorAll('.logout-btn');


const loginAdmin = async (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;
    const loginBtn = loginForm.submit;

    const formData = { email, password };

    loginBtn.textContent = 'processing...';

    try {
        const url =`http://localhost:3000/api/admin/login`
        const response = await fetch(url,{
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })

        if(!response.ok){
            throw new Error("something went wrong")
        }

        const result = await response.json();
        loginBtn.textContent = 'Login';

        console.log(result)
        document.querySelector('.message').textContent = result.error
        // location.assign("/admin/dashboard")

    } catch (error) {
        // console.log(error.message)
        document.querySelector('.message').textContent = result.error
        loginBtn.textContent = 'Login';
    }
    
    
}

const logout = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('http://localhost:3000/api/admin/logout')

        if(!response.ok) {
            throw new Error("something went wrong")
        }
        const json = await response.json()

        if(json.message == 'Successfully Logged out') {
            location.assign("/admin/login")
        }
        console.log(json)
    } catch (error) {
        console.log(error.message)
    }
    
}
logOutBtn.forEach(btn => btn.addEventListener('click', logout))
loginForm.addEventListener('submit', loginAdmin)