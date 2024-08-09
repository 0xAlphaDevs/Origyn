import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';

const ViewProductAttestation = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='font-bold text-xl'>View Product Attestations</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Product Attestations</DialogTitle>
          <DialogDescription> This is the description of the dialog content </DialogDescription>
        </DialogHeader>
        <div>Product attestaion will be displayed here</div>
      </DialogContent>

    </Dialog>
  )
}

export default ViewProductAttestation