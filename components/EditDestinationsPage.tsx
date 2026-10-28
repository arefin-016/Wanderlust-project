import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SquarePen } from "lucide-react"
import AddingForm from "./AddingForm"
import EditForm from "./EditForm"

export default function EditDestinationsPage() {
  return (
    <Dialog>
      <form>
        <DialogTrigger render={<Button
              variant="outline"
              className="gap-2 border-gray-300 text-black"

            >
              <SquarePen className="h-4 w-4" />
              Edit
            </Button>} />
        <DialogContent className="sm:max-w-sm min-w-xl ">


            <EditForm></EditForm>


        </DialogContent>
      </form>
    </Dialog>
  )
}
