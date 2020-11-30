import React from "react";
import {useSelector} from "react-redux";
import "../style.scss";
import {motion} from "framer-motion";

const Notification = props => {
    const {updatingDisplayName,updatingUser,updatingPhoto} = useSelector(state => state.user); 

    return (<motion.div>

    </motion.div>);
}

export default Notification; 

