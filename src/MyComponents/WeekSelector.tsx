import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { MutableRefObject } from "react"

export function WeekSelector({workingDays}:{workingDays:MutableRefObject<string[]>}) {
    const originalOrder = ["Mon", "Tue", "Wed", "Thu","Fri","Sat","Sun"]
    function handleSubmit(e:string[]) {
        workingDays.current=e.sort((a,b)=>originalOrder.indexOf(a)-originalOrder.indexOf(b))
    }
  return (
    <ToggleGroup type="multiple" variant={"outline"} className="flex flex-wrap gap-2" onValueChange={e=>handleSubmit(e)}>
      <ToggleGroupItem value="Mon" aria-label="black">
        <div className="h-4 w-4 sm:h-6 sm:w-6 flex items-center justify-center" >Mon</div>
      </ToggleGroupItem>
      <ToggleGroupItem value="Tue" aria-label="Toggle tue">
      <div className="h-4 w-4 sm:h-6 sm:w-6 flex items-center justify-center" >Tue</div>
      </ToggleGroupItem>
      <ToggleGroupItem value="Wed" aria-label="Toggle wed">
      <div className="h-4 w-4 sm:h-6 sm:w-6 flex items-center justify-center" >Wed</div>
      </ToggleGroupItem>
      <ToggleGroupItem value="Thu" aria-label="Toggle thu">
      <div className="h-4 w-4 sm:h-6 sm:w-6 flex items-center justify-center" >Thu</div>
      </ToggleGroupItem>
      <ToggleGroupItem value="Fri" aria-label="Toggle fri">
      <div className="h-4 w-4 sm:h-6 sm:w-6 flex items-center justify-center" >Fri</div>
      </ToggleGroupItem>
      <ToggleGroupItem value="Sat" aria-label="Toggle sat">
      <div className="h-4 w-4 sm:h-6 sm:w-6 flex items-center justify-center" >Sat</div>
      </ToggleGroupItem>
      <ToggleGroupItem value="Sun" aria-label="Toggle sun">
      <div className="h-4 w-4 sm:h-6 sm:w-6 flex items-center justify-center" >Sun</div>
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
