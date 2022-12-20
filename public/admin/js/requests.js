const loginForm = document.querySelector('.login-form');
const logOutBtn = document.querySelectorAll('.logout-btn');
const changePasswordForm = document.querySelector('.change-password');

// lgin request 
const loginAdmin = async (e) => {
    e.preventDefault();

    console.log(11)
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    const loginBtn = loginForm.submit;
    console.log(12)

    const formData = { email, password };

    loginBtn.textContent = 'processing...';
    console.log(13)
    try {
        const url = '/admin/login'
        const response = await fetch(url, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        console.log(14)
        if(!response.ok){
            throw new Error("something went wrong")
        }

        const result = await response.json();
        loginBtn.textContent = 'Login';

        if(result.error) {
            document.querySelector('.message').textContent = result.error
            return
        }
        location.assign("/admin/dashboard")

    } catch (error) {
        // document.querySelector('.message').textContent = result.error
        loginBtn.textContent = 'Login';
    }
    
    
}
// loginForm.addEventListener('submit', loginAdmin)

// logout request 
const logout = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('/admin/logout')

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

// change password request 
const changePassword = async (e) => {
    e.preventDefault();
    const oldpassword = changePasswordForm.oldPwd.value
    const newpassword = changePasswordForm.newPwd.value
    const confirmpassword = changePasswordForm.cPwd.value

    const formData = {
        oldpassword,
        newpassword,
        confirmpassword
    }

    console.log(1)
    if(!oldpassword || !newpassword || !confirmpassword) {
        throw new Error("Fields cannot be empty")
    
    }
    console.log(2)
    if(newpassword != confirmpassword) {
        throw new Error("Password does not match")
        return
    }

    console.log(3)
    try {
        const response = await fetch('/api/admin/changepassword', {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
        })
        console.log(4)
        if(!response.ok) {
            throw new Error("could not change password")
        }
        console.log(4)
        const json = await response.json()
        
    } catch (error) {
        console.log(error.message)
    }

    
}
changePasswordForm.addEventListener('submit', changePassword)