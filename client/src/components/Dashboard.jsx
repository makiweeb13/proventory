import useStore from "../store/store";
import { useEffect } from "react";

function Dashboard() {

    const { setTitle } = useStore();
    
    useEffect(() => {
        setTitle('Dashboard');
    }, [setTitle]);

    return (
        <>
        </>
    )
}

export default Dashboard;