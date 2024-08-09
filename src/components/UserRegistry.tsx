"use client";

import React, { useState, useEffect } from 'react'
import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit"
import type { ISuccessResult } from "@worldcoin/idkit"
import { verify } from "@/app/actions/verify"
import { useSetRecoilState } from 'recoil'
import { creatorSessionAtom } from '@/atoms/creatorSessionAtom'
import { Button } from './ui/button';

interface UserData {
  type: 'user' | 'creator';
  verified?: boolean;
}

const UserRegistry: React.FC = () => {
  const { address, isConnected } = useAccount()
  const router = useRouter()
  const [userType, setUserType] = useState<'user' | 'creator' | ''>('')
  const [isLoading, setIsLoading] = useState(false)
  const setCreatorSession = useSetRecoilState(creatorSessionAtom)
  const { setOpen } = useIDKit()

  useEffect(() => {
    if (isConnected && address) {
      const storedData = localStorage.getItem(address)
      if (storedData) {
        try {
          const userData: UserData = JSON.parse(storedData)
          console.log(`User data loaded from localStorage:`, userData)
          if (userData.type === 'user') {
            router.push('/marketplace')
          } else if (userData.type === 'creator' && userData.verified) {
            router.push('/creator/dashboard')
          }
        } catch (error) {
          console.error("Error parsing localStorage data:", error)
        }
      }
    }
  }, [isConnected, address, router])

  const handleUserTypeSelection = (type: 'user' | 'creator') => {
    setUserType(type)
    setIsLoading(true)
    if (address) {
      const userData: UserData = { type }
      const data = JSON.stringify(userData)
      localStorage.setItem(address, data)
      console.log(`Data saved to localStorage:`, userData)
      setTimeout(() => {
        if (type === 'user') {
          router.push('/marketplace')
        } else {
          setIsLoading(false) // Only set loading to false for creator, as they need to verify
        }
      }, 2000)
    }
  }

  const onSuccess = async (result: ISuccessResult) => {
    try {
      setIsLoading(true)
      const verificationResult = await verify(result)
      if (verificationResult.success) {
        setCreatorSession({ proof: result, verified: true })
        if (address) {
          const userData: UserData = { type: 'creator', verified: true }
          const data = JSON.stringify(userData)
          localStorage.setItem(address, data)
          console.log(`Creator data saved to localStorage after verification:`, userData)
        }
        setTimeout(() => {
          router.push('/creator/dashboard')
        }, 2000)
      }
    } catch (error) {
      console.error("Verification failed:", error)
      setIsLoading(false)
    }
  }

  const handleProof = async (result: ISuccessResult) => {
    console.log("Proof received from IDKit:", JSON.stringify(result))
    try {
      const data = await verify(result)
      console.log("Response from backend:", JSON.stringify(data))
      if (data.success) {
        console.log("Successful verification")
        onSuccess(result)
      } else {
        throw new Error(`Verification failed: ${data.detail}`)
      }
    } catch (error) {
      console.error("Error during verification:", error)
      setIsLoading(false)
    }
  }

  return (
    <div>
      {!isConnected && (
        <ConnectKitButton />
      )}
      {isConnected && !userType && !isLoading && (
        <div className='flex gap-8'>
          <div onClick={() => handleUserTypeSelection('user')} className='bg-white border-2 rounded-lg z-10 shadow-sm hover:shadow-lg p-4'>I am a User</div>
          <div onClick={() => handleUserTypeSelection('creator')} className='bg-white border-2 rounded-lg z-10 shadow-sm hover:shadow-lg p-4'>I am a Creator</div>
        </div>
      )}
      {userType === 'creator' && !isLoading && (
        <div>
          <IDKitWidget
            action={process.env.NEXT_PUBLIC_WLD_ACTION!}
            app_id={process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`}
            onSuccess={onSuccess}
            handleVerify={handleProof}
            verification_level={VerificationLevel.Orb}
          >
            {({ open }) => <Button onClick={open}>Verify with World ID</Button>}
          </IDKitWidget>
        </div>
      )}
      {isLoading && (
        <div>
          <p>Loading {userType === 'user' ? 'marketplace' : "creator's dashboard"}...</p>
        </div>
      )}
    </div>
  )
}

export default UserRegistry