'use client'

import React from 'react'
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'
import { Button } from '@/components/ui/button';

const handleVerify = async (proof: ISuccessResult) => {
  const res = await fetch("/api/test", { // route to your backend will depend on implementation
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proof),
  })
  if (!res.ok) {
    throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
  }
};

const onSuccess = () => {
  // This is where you should perform any actions after the modal is closed
  // Such as redirecting the user to a new page
  window.location.href = "/creator/dashboard";
};

const Test = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <IDKitWidget
        app_id="app_staging_c0c4d33bb22c3c08f1c22003372e8bd0"// obtained from the Developer Portal
        action="origyn-signin" // obtained from the Developer Portal
        onSuccess={onSuccess} // callback when the modal is closed
        handleVerify={handleVerify} // callback when the proof is received
        verification_level={VerificationLevel.Orb}
      >
        {({ open }) =>
          // This is the button that will open the IDKit modal
          <Button onClick={open}>Verify with World ID</Button>
        }
      </IDKitWidget>
    </div>
  )
}

export default Test