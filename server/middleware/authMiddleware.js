import express from 'express'
import jwt from 'jsonwebtoken'


export function protect(req, res, next){
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(403).redirect('/login')
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(e){
        res.status(403).redirect('/login')
    }
}

// export function verifyRole(req, res, next, role){
//     try{
//         if(role !== req.user.role){
//             return res.status(403).json({message:"Access denied"})
//         }
//         if(role === req.user.role){
            
//             next()
//         }
//     }catch(e){
//         console.error(e)
//         res.status(500).json({message:`server error in verifying role ${role}`})
//     }
// }

// Role-based middleware generator
export function verifyRole(requiredRole) {
  return (req, res, next) => {
    try {
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: "Access denied: insufficient role" });
      }
      next();
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: `Server error in verifying role: ${requiredRole}` });
    }
  };
}
