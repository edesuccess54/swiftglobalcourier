const siteInfo = async (req, res, next) => {
    res.locals.siteName = "Swift Global Courier & Delivery Services"; 
    res.locals.siteEmail = "info@sgcservice.com";
    res.locals.deliveryEmail = "delivery@sgcservice.com";
    res.locals.siteNumber = "+1(862)3970-612";
    res.locals.siteLink = "https://sgcservice.com";
    res.locals.adminEmail = "admin@sgcservice.com";
    res.locals.siteAddress = "120 Stuyvesant place, System island 10302 NY USA";  
    
    next()
}

module.exports = {siteInfo}