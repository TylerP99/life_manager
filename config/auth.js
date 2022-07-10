module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated())
        {
            // User is authenticated already, do next
            return next();
        }
        else
        {
            // User is not authenticated, tell them to login
            //res.flash("error_msg", "Please sign in to view that resource.");
            res.redirect("/user/signin");
        }
    },
    forwardAuthenticated: (req, res, next) => {
        if(!req.isAuthenticated())
        {
            // User is not authenticated, we are ok to continue
            return next();
        }
        else
        {
            // User is authenticated, skip to dashboard
            res.redirect("/dashboard");
        }
    }
}