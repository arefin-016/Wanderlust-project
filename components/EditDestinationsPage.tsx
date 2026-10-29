"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SquarePen } from "lucide-react"
import EditForm, { type Destination } from "./EditForm"

interface EditDestinationsPageProps {
  item: Destination;
  onSaved?: (updated: Destination) => void;
}

export default function EditDestinationsPage({ item, onSaved }: EditDestinationsPageProps) {
  const [open, setOpen] = useState(false)

  const handleSaved = (updated: Destination) => {
    onSaved?.(updated)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button
          variant="outline"
          className="gap-2 border-gray-300 text-black"
        >
          <SquarePen className="h-4 w-4" />
          Edit
        </Button>
      } />
      <DialogContent className="sm:max-w-sm min-w-xl ">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update the details of this travel package.
          </DialogDescription>
        </DialogHeader>
        <EditForm item={item} onSaved={handleSaved} />
      </DialogContent>
    </Dialog>
  )
}
