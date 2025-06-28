import useStore from "../store/store";
import { useEffect } from "react";

function Profile() {
    const { setTitle } = useStore();

    useEffect(() => {
        setTitle('Profile');
    }, [setTitle]);

    return (
        <></>
    )
}

export default Profile;