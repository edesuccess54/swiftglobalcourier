export class toastNotification {
    constructor(message) {
        this.message = message
    }
     success(message, toast, toastIcon, toastMessage, closeNotification) {
        toast.classList.add('show')
        toast.style.backgroundColor = "green"
        toastMessage.style.color = '#fff'
        toastIcon.style.color = '#fff'
        toastMessage.textContent = message
        toastIcon.innerHTML = '<i class="fa-regular fa-circle-check"></i>'

        setTimeout(() => closeNotification(toast), 3000)
    }

    error(message, toast, toastIcon, toastMessage, closeNotification) {
        toast.classList.add('show')
        toast.style.backgroundColor = "red"
        toastMessage.style.color = '#fff'
        toastIcon.style.color = '#fff'
        toastMessage.textContent = message
        toastIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>'

        setTimeout(() => closeNotification(toast), 3000)
    }
}

export const notification = new toastNotification()


// show spinner function 
export function showSpinner(button) {
    button.disabled = true
    button.innerHTML = ' <span style=""></span> <span> </span> <img src="/images/loading.jpeg" width="10%" alt="">'
}

// hide spinner function 
export function hideSpinner(button, textContent) {
    button.disabled = false
    button.innerHTML = textContent
}

export function closeNotification(toast) {
    toast.classList.remove('show')
}