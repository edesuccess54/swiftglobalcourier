const hamburger = document.querySelector('.openNav')
const closeNav = document.querySelector('.closeNav')
const overlay = document.querySelector('.overlay')
const destopTabs = document.querySelector('.tabs')
const mobileTabs = document.querySelector('.mobile-tabs')
const profileTabContent = document.querySelector('.single-content')
const securityTabContent = document.querySelector('.security')
const navProfile = document.querySelector('.nav-profile')
const navSecurity = document.querySelector('.nav-security')
const editProfileBtn = document.querySelector('.edit-profile');
const closeModalBtn = document.querySelector('.close-modal')


// function to open side nav 
const openSideNav = (e) => {
    sidebar.classList.add('active')
    overlay.classList.add('active')
}
hamburger.addEventListener('click', openSideNav)

// function top close side nav 
const closeSideNav = (e) => {
    sidebar.classList.remove('active')
    overlay.classList.remove('active')
}
overlay.addEventListener('click', closeSideNav)
closeNav.addEventListener('click', closeSideNav)

// function to switch tabs 
const switchTabs = (e) => {
    if(e.target.textContent === 'Profile') {
        securityTabContent.classList.remove('active')
        profileTabContent.classList.add('active')
        navSecurity.classList.remove('active')
        e.target.classList.add('active')
    }

    if(e.target.textContent === 'Security') {
        profileTabContent.classList.remove('active')
        securityTabContent.classList.add('active')
        navProfile.classList.remove('active')
        e.target.classList.add('active')
    }
}
mobileTabs.addEventListener('click', switchTabs)
destopTabs.addEventListener('click', switchTabs)

// function to open modal 
const openModal = (e) => {
    if(e.target.classList.contains('edit')) {    
    const profileModel = document.querySelector('.profile-modal')
    const modalOverlay = document.querySelector('.modal-overlay')
    
    modalOverlay.classList.add('active')
    profileModel.classList.add('show')
    }

    if(e.target.classList.contains('pwd')) {    
        const profileModel = document.querySelector('.profile-modal')
        const modalOverlay = document.querySelector('.modal-overlay')
        
        modalOverlay.classList.add('active')
        profileModel.classList.add('show')
        }
}
editProfileBtn.addEventListener('click', openModal)

// function to close edit profile modal 
const closeModal = (e) => {
    const profileModel = document.querySelector('.profile-modal')
    document.querySelector('.modal-overlay').classList.remove('active')
    profileModel.classList.remove('show')
}
closeModalBtn.addEventListener('click', closeModal)



