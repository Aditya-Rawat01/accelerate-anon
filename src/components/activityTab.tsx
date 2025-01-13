import { useFetchActivity } from "../datafetchinghooks/useFetchActivity"

interface activityArr {
    id: number;
    activity: string;
    userId: number;
    progress: number;
    totalDays: number;
    currentDay: number;
    workingDays: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    createdAt: Date;
    lastUpdatedAt: Date;
}
export function ActivityTab() {
    const {data, isFetching, isLoading, error, isError}=useFetchActivity()

    if (isLoading) {
        return <>Fetching Data</>
    }
    if (isError) {
        return <>{error?.message}</>
    }
    return (
    <div className="w-full h-4/5 flex flex-col gap-2">
        {isFetching && <div>Re-configuring details</div>}
        {data.map((index:activityArr)=>{
            return <div className="w-full h-24 bg-red-300 text-white rounded-full flex gap-3">
                <p>Activity:{index.activity}</p>
                <p>createdAt:{index.createdAt.toString()}</p>
                <p>last updated at:{index.lastUpdatedAt.toString()}</p>
                <p>progress:{index.progress}</p>
                <p>currentDay:{index.currentDay}</p>
                <p>Total Days:{index.currentDay}</p>
                <p>Working Days:{index.workingDays.map((index)=>index)}</p>
            </div>
        })}
    </div>)
}