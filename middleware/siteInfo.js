const checkUser = async (req, res, next) => {

    res.locals.siteName = "peter obi 4 president"; 
    res.locals.siteEmail = "peterobi@gmail.com";
    res.locals.siteNumber = "911";
    res.locals.siteLink = "peterobi.com";
    res.locals.adminEmail = "admin@google.com";
    res.locals.siteAddress = "my backyard";   
    next()
}

module.exports = checkUser