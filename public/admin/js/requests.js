
const logOutBtn = document.querySelectorAll('.logout-btn');

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

    } catch (error) {
        console.log(error.message)
    }
    
}
logOutBtn.forEach(btn => btn.addEventListener('click', logout))


