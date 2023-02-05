 function uploadImg(files) {
    let images
    for (let i = 0; i < files.length; i++) { 
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error)
        });
    }
}


module.exports = uploadImg
