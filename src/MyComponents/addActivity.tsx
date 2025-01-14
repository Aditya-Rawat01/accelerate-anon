import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { WeekSelector } from "./WeekSelector"
  


export function AddActivity({value}:{value:string}) {
    return (
        <Dialog>
  <DialogTrigger>{value}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Activity</DialogTitle>
      <DialogDescription>
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Activity:
            </label>
            <input id="name" className="col-span-3 p-2 border border-1 border-black rounded-md" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="days" className="text-right">
              Total Days:
            </label>
            <input id="days" type="number" className="col-span-3 p-2 border border-1 border-black rounded-md " />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="days" className="text-right">
              Working Days:
            </label>
            <div className="col-span-3"><WeekSelector/></div>
          </div>
        </div>

  </DialogContent>
</Dialog>

    )
}