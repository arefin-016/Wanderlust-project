'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { Loader2, Trash2 } from "lucide-react"
import type { Destination } from "@/components/EditForm"

interface DeleteDestinationDialogProps {
  item: Destination | null;
  id: string;
}

export default function DeleteDestinationDialog({ item, id }: DeleteDestinationDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteDestination = async () => {
    if (!id || isDeleting) return

    setIsDeleting(true)
    try {
      const res = await fetch(`http://localhost:8000/all-destinations/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`)
      }

      toast.add({
        type: "success",
        title: "Destination deleted",
        description: `${item?.destinationName ?? "The destination"} has been deleted successfully.`,
      })

      setOpen(false)
      router.push("/all-destinations")
      router.refresh()
    } catch (err) {
      console.error(err)
      toast.add({
        type: "error",
        title: "Could not delete destination",
        description:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        priority: "high",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            className="gap-2 border-red-200 text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Travel Package</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {item?.destinationName ?? "this destination"}?
            This action cannot be undone. This will permanently delete the
            travel package from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteDestination}
            disabled={isDeleting}
            className="gap-2 border-red-200 bg-red-50 text-red-500 hover:border-red-300 hover:bg-red-100 hover:text-red-600"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
