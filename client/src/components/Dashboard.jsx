import useStore from "../store/store";
import { useEffect } from "react";
import StatsDisplay from "./StatsDisplay";

function Dashboard() {

    const { setTitle } = useStore();
    
    useEffect(() => {
        setTitle('Dashboard');
    }, [setTitle]);

    return (
        <>
            <StatsDisplay />
        </>
    )
}

export default Dashboard;