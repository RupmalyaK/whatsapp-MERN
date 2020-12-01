import React, { useEffect } from "react";
import {motion,useAnimation} from "framer-motion";
import { useTheme } from "@material-ui/core";
import {useDispatch} from "react-redux";
import {signOut} from "../../store/actions/userAction"; 
import {useHistory} from "react-router-dom";
import "./style.scss";

const SidebarDropdown = props => {
    const {isOpen, ...otherProps} = props;
    const theme = useTheme();
    const { background, icon } = theme.palette;
    const dropDownController = useAnimation(); 
    const dispatch = useDispatch();
    const history = useHistory();

    const logOut = () => {
        dispatch(signOut());
        history.push("/signinsignup");
    }

    useEffect(() => {
        if(isOpen)
            {
                dropDownOpenAnm();
                return;
            }
            dropDownCloseAnm();
    },[isOpen]);


    const dropDownOpenAnm = async () => {
        await dropDownController.start({opacity:1,scale:1});
    }

    const dropDownCloseAnm = async () => {
        await dropDownController.start({opacity:0,scale:0});
    }
    return (
    <motion.div initial={{scale:0,opacity:0}} animate={dropDownController} className="SidebarDropdown__container" style={{background:background.siderBarChatListBackground}} {...otherProps}>
        <span className="SidebarDropdown__container__item">Settings</span>
        <span className="SidebarDropdown__container__item" onClick={logOut}>Log out</span>
    </motion.div>);
}

export default SidebarDropdown;