const loginForm = document.querySelector('.login-form');


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
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })

        if(!response.ok){
            throw new Error(response.text)
        }

        const result = await response.json();
        loginBtn.textContent = 'Login';

        console.log(result)
        
        // location.assign("/admin/dashboard")

    } catch (error) {
        console.log(error.message)
        document.querySelector('.message').textContent = result.message
        loginBtn.textContent = 'Login';
    }
    
    
}

loginForm.addEventListener('submit', loginAdmin)