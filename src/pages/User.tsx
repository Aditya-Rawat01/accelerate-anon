import { ActivityTab } from "../components/activityTab";
import { Dashboard } from "../components/dashboard";

export function User() {
    return (
    <div className="w-screen h-screen">
    <Dashboard/>
    <ActivityTab/>
    </div>)
}