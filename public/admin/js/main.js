
const hamburger = document.querySelector('.openNav')
const closeNav = document.querySelector('.closeNav')
const sidebar = document.querySelector('.mobileMenu')
const overlay = document.querySelector('.overlay')


// function to open side nav 
const openSideNav = (e) => {
    sidebar.classList.add('active')
    overlay.classList.add('active')
}

// function top close side nav 
const closeSideNav = (e) => {
    sidebar.classList.remove('active')
    overlay.classList.remove('active')
}


hamburger.addEventListener('click', openSideNav)
overlay.addEventListener('click', closeSideNav)
closeNav.addEventListener('click', closeSideNav)