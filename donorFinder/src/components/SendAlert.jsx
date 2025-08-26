import React, { useContext, useEffect, useRef } from 'react'
import AppContext from '@/context/AppContext'
import { AnimatePresence, motion } from "framer-motion";

function SendAlert() {

    const {alertToggle , bloodGroup, setBloodGroup, closeAlert , setAlertToggle} = useContext(AppContext)

    const sendDonorAlert = useRef()
    console.log(sendDonorAlert)

    useEffect(() => {
  if (alertToggle) {
    sendDonorAlert.current?.showModal();
  } else {
    sendDonorAlert.current?.close();
  }
}, [alertToggle]);

const submitAlert = (e) => {

    e.preventDefault()
    
    let data = {
        "name":e.target.name.value,
        "hospital":e.target.hospital.value,
        "bloodType":e.target.blood.value
    }

    console.log(data);
    
}

  return (
    <>
        <dialog ref={sendDonorAlert} className='p-5 my-auto mx-auto bg-white rounded-2xl  shadow-2xl' open>

        <button onClick={()=>{closeAlert()}}  className='absolute right-2 top-2  text-white bg-red-700 px-3 rounded-full'>X</button>

            <form onSubmit={(e)=>{submitAlert(e)}} className='flex flex-col gap-5 mt-7'>
            <div>
                <label className='block' htmlFor="name">Name :</label>
                <input name='name' id='name' placeholder='Name...' />
            </div>
                <div>
                <label className='block' htmlFor="hospital">Hospital :</label>
                    <input name='hospital' id='hospital' placeholder='Hospital...' />
                </div>
                <div>
                <label className='block' htmlFor="blood">Blood type :</label>
                    <input id='blood' readOnly  value={bloodGroup}/>
                </div>

                <button  className='bg-red-700 rounded-md text-white m-5'>Send</button>
            </form>
        </dialog>
    </>
  )
}

export default SendAlert