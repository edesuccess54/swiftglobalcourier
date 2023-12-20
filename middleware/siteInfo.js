const siteInfo = async (req, res, next) => {
    res.locals.siteName = "Zegnet Logistics and Courier Services"; 
    res.locals.siteEmail = "info@zegnetlogistics.com";
    res.locals.deliveryEmail = "delivery@zegnetlogistics.com";
    res.locals.siteNumber = "+1 (315) 231-0187";
    res.locals.siteLink = "zegnetlogistics.com";
    res.locals.adminEmail = "admin@zegnetlogistics.com";
    res.locals.siteAddress = "120 Stuyvesant place, System island 10302 NY USA";  
    
    next()
}

module.exports = {siteInfo}