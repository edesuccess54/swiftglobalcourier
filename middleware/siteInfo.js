const siteInfo = async (req, res, next) => {
    res.locals.siteName = "apextech"; 
    res.locals.siteEmail = "edesuccess54@gmail.com";
    res.locals.siteNumber = "911";
    res.locals.siteLink = "apextech.com";
    res.locals.adminEmail = "admin@google.com";
    res.locals.siteAddress = "my backyard";   
    next()
}

module.exports = siteInfo