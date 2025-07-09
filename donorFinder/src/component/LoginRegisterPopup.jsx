import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function LoginRegisterPopup({ message }) {
  if (!message) {
    return null;
  }

  return (
      <motion.div 
      initial={{opacity:0,x:50}}
      animate={{opacity:1,x:0}}
      exit={{opacity:0,x:50}}
      transition={{duration:0.3}}
      >
        <div className="text-center z-100 fixed right-0">
        <div className="py-5 px-15 rounded-2xl mt-7 inline-block shadow-2xl">
          <p>{message}</p>
        </div>
      </div>
      </motion.div>
  );
}

export default LoginRegisterPopup;
