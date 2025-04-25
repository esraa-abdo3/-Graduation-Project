
import Promocodes from "./Promocode/Allpromocods/Promocodes";
import Statistics from "./StatisticsOverview/Statistics ";


export default function Mainpage() {

    return (
        <div className="Mainpage">
            <div className="Statistics-mainpage">
                <Statistics />
                <Promocodes/>

            </div>

        </div>
    )
}