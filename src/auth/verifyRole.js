const verifyRole = (req, res, next) => { 
    const allowed = req.body.admin
    if(!allowed) {
        return res.status(401).json("Vous n'êtes pas autorisé à faire ça.")
    }
    next();
}

module.exports = {verifyRole}