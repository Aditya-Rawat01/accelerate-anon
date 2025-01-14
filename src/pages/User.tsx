import { ActivityTab } from "../MyComponents/activityTab";
import { Dashboard } from "../MyComponents/dashboard";

export function User() {
    return (
    <div className="w-screen h-screen">
    <Dashboard/>
    <ActivityTab/>
    </div>)
}