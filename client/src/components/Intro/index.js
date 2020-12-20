import "./style.scss";
import React from "react"; 
import {motion, useAnimation} from "framer-motion";
import {useTheme} from "@material-ui/core"; 
import LaptopWindowsIcon from '@material-ui/icons/LaptopWindows';


const Intro = props => {
    const theme = useTheme();
    const {borderStronger,borderIntro} = theme.palette.border;
    return (<div className="Intro">
        <div className="Intro__body">
              <motion.img style={{marginBottom:"20px"}} src="./images/intro-background.jpg"/>
              <h2 style={{marginBottom:"20px"}}>Keep your phone connected</h2>
              <div className="Intro__body__text">
                    <p>WhatsApp connects to your phone to sync messages. To reduce data </p>
                    <span style={{marginTop:"-15px"}}>usage, connect your phone to Wi-Fi</span>
              </div>
              <div className="Intro__body__border" style={{background:borderStronger}}/>
              <span className="Intro__body__extra">
                      <LaptopWindowsIcon style={{marginRight:"5px"}}/>
                      WhatsApp available for Windows.<span style={{marginLeft:"10px"}}>Get it here.</span>  
              </span>
        </div>
        <div className="Intro__footer" style={{borderTopColor:borderIntro}} />
    </div>)
}

export default Intro; 