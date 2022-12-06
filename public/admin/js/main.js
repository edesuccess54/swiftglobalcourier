const sidebar = document.querySelector('.mobileMenu')
const hamburger = document.querySelector('.openNav')
const closeNav = document.querySelector('.closeNav')
const overlay = document.querySelector('.overlay')
const destopTabs = document.querySelector('.tabs ul')
const mobileTabs = document.querySelector('.mobile-tabs ul')
const profileTabContent = document.querySelector('.single-content')
const securityTabContent = document.querySelector('.security')
const navProfile = document.querySelector('.nav-profile')
const navSecurity = document.querySelector('.nav-security')
const editProfileBtn = document.querySelector('.edit-profile');
const closeModalBtn = document.querySelector('.close-modal')
const changePasswordBtn = document.querySelector('.pwd-btn')
const topNavToggle = document.querySelector('greeting span.destop-greet')


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

// function to switch tabs on destop 
const switchDesktopTabs = (e) => {
    if(e.target.textContent === 'Profile') {
        securityTabContent.classList.remove('active')
        profileTabContent.classList.add('active')
        document.querySelector('.nav-security2').classList.remove('active')
        e.target.classList.add('active')
    }

    if(e.target.textContent === 'Security') {
        profileTabContent.classList.remove('active')
        securityTabContent.classList.add('active')
        document.querySelector('.nav-profile2').classList.remove('active')
        e.target.classList.add('active')
    }
}
destopTabs.addEventListener('click', switchDesktopTabs)

// function to switch tabs on mobile 
const switchMobileTabs = (e) => {
    if(e.target.textContent === 'Profile') {
        securityTabContent.classList.remove('active')
        profileTabContent.classList.add('active')
        document.querySelector('.nav-security').classList.remove('active')
        e.target.classList.add('active')
    }

    if(e.target.textContent === 'Security') {
        profileTabContent.classList.remove('active')
        securityTabContent.classList.add('active')
        document.querySelector('.nav-profile').classList.remove('active')
        e.target.classList.add('active')
    }
}
mobileTabs.addEventListener('click', switchMobileTabs)

// function to open modal 
const openModal = (e) => {
    if(e.target.classList.contains('edit')) {    
        const profileModel = document.querySelector('.profile-modal')
        const modalOverlay = document.querySelector('.modal-overlay')
        
        modalOverlay.classList.add('active')
        profileModel.classList.add('show')
    }

    if(e.target.classList.contains('pwd-btn')) {    
        const passwordModal = document.querySelector('.password-modal')
        const modalOverlay = document.querySelector('.modal-overlay')
        
        modalOverlay.classList.add('active')
        passwordModal.classList.add('show')
    }
}
editProfileBtn.addEventListener('click', openModal)
changePasswordBtn.addEventListener('click', openModal)

// function to close edit profile modal 
const closeModal = (e) => {
    if(e.target.classList.contains('m1')) {
        const profileModel = document.querySelector('.profile-modal')
        document.querySelector('.modal-overlay').classList.remove('active')
        profileModel.classList.remove('show')
    }

    if(e.target.classList.contains('m2')) {
        const passwordModal = document.querySelector('.password-modal')
        document.querySelector('.modal-overlay').classList.remove('active')
        passwordModal.classList.remove('show')
    }
    
}
closeModalBtn.addEventListener('click', closeModal)
document.querySelector('.close-modal2').addEventListener('click', closeModal)

// function to togle topnav modal 
const topNavModal = () => {
    console.log('yeah')
    const topnavModal = document.querySelector('.topnav-modal')
    topnavModal.classList.toggle('active')
}
topNavToggle.addEventListener('click', topNavModal)



