const loginForm = document.querySelector('.login-form');


const loginAdmin = async (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;
    const loginBtn = loginForm.submit;


    // if (!email || !password) {
    //     if (!email) {
    //         loginForm.email.style='border: 1px solid red'
    //     }
    
    //     if (!password) {
    //         loginForm.password.style='border: 1px solid red'
    //     }

    //     return
    // }

    const formData = { email, password };

    loginBtn.textContent = 'processing...';

    try {
        const url =`/api/user/admin/login`
        const response = await fetch(url,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })

        if(!response.ok){
            throw new Error('Login failed')
        }

        const result = await response.json();
        loginBtn.textContent = 'Login';

        console.log(result)

    } catch (error) {
        loginBtn.textContent = 'Login';
        console.error(error.message)
    }
    
    
}

loginForm.addEventListener('submit', loginAdmin)