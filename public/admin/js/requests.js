
const logOutBtn = document.querySelectorAll('.logout-btn');
const changePasswordForm = document.querySelector('.change-password');
const changeDisplayForm = document.querySelector('.change-disPlayName');

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
    const message = document.querySelector('.message')

    const formData = {
        oldpassword,
        newpassword,
        confirmpassword
    }

    console.log(1)
    if(!oldpassword || !newpassword || !confirmpassword) {
        message.textContent = "Fields cannot be empty"
        return
    }
    console.log(2)
    if(newpassword != confirmpassword) {
        message.textContent = "Password does not match"
        return
    }

    console.log(3)
    try {
        const response = await fetch('/admin/changepassword', {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
        })
        console.log(4)
        if(!response.ok) {
            message.textContent = "Password failed to change"
            return
        }
        console.log(4)
        const json = await response.json()
        message.textContent = json.message
        
    } catch (error) {
        // message.textContent = error.message
        console.log(error.message)
    }

    
}
changePasswordForm.addEventListener('submit', changePassword)

// change display name 
const changeDisplayName = async (e) => {
    e.preventDefault()
    const adminName = changeDisplayForm.dname.value
    const message = document.querySelector('.message')
    
    if(!adminName) {
        message.textContent = "Please enter a display name";
        return
    }

    try {
        const response = await fetch('/admin/displayName', {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({adminName})
        })

        if(!response.ok) {
            message.textContent = "Display name failed to change"
            return
        }

        const json = await response.json()

        message.textContent = json.message

    } catch (error) {
        console.log(error.message)
    }
}
changeDisplayForm.addEventListener('submit', changeDisplayName)