const siteInfo = async (req, res, next) => {
    res.locals.siteName = "Crestnet Logistics and Courier Services"; 
    res.locals.siteEmail = "info@crestnetlogistics.com";
    res.locals.deliveryEmail = "delivery@crestnetlogistics.com";
    res.locals.siteNumber = "+1 (315) 231-0187";
    res.locals.siteLink = "crestnetlogistics.com";
    res.locals.adminEmail = "admin@crestnetlogistics.com";
    res.locals.siteAddress = "120 Stuyvesant place, System island 10302 NY USA";  
    
    next()
}

module.exports = {siteInfo}