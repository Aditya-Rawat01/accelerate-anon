import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function WeekSelector() {
  return (
    <ToggleGroup type="multiple" variant={"outline"}>
      <ToggleGroupItem value="mon" aria-label="black" className="">
        <div className="h-6 w-6 flex items-center justify-center" >Mon</div>
      </ToggleGroupItem>
      <ToggleGroupItem value="tue" aria-label="Toggle tue">
      <div className="h-6 w-6 flex items-center justify-center" >Tue</div>
      </ToggleGroupItem>
      <ToggleGroupItem value="wed" aria-label="Toggle wed">
      <div className="h-6 w-6 flex items-center justify-center" >Wed</div>
      </ToggleGroupItem>
      <ToggleGroupItem value="thu" aria-label="Toggle thu">
      <div className="h-6 w-6 flex items-center justify-center" >Thu</div>
      </ToggleGroupItem>
      <ToggleGroupItem value="fri" aria-label="Toggle fri">
      <div className="h-6 w-6 flex items-center justify-center" >Fri</div>
      </ToggleGroupItem>
      <ToggleGroupItem value="sat" aria-label="Toggle sat">
      <div className="h-6 w-6 flex items-center justify-center" >Sat</div>
      </ToggleGroupItem>
      <ToggleGroupItem value="sun" aria-label="Toggle sun">
      <div className="h-6 w-6 flex items-center justify-center" >Sun</div>
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
