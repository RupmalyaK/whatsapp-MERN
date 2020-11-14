import React,{useState} from "react";
import {useTheme} from "@material-ui/core";
import ImageFromBuffer from "../ImageFromBuffer";
import "./style.css";

const ChatSnippet = props => {
    const {name,profileImage,lastMessage,timeStamp,isSelected,style,...otherProps} = props;
    const [isHovering,setIsHovering] = useState(false);
    const theme = useTheme();
    const {background} = theme.palette;
    return (
        <div className="chatSnippet" style={isHovering ? {background:background.chatListBackgroundHover, ...style}: {...style}} {...otherProps} onMouseEnter={e => setIsHovering(true)} onMouseLeave={e => setIsHovering(false)}>
            <ImageFromBuffer className="chatSnippet__image" contentType={profileImage.contentType} arrayBuffer={profileImage.data.data} />
            <div className="chatSnippet__body">
                    <span className="chatSnippet__body__name">{name}</span>
                    <span className="chatSnippet__body__lm">{lastMessage}</span>
            </div>
        </div>
    )
}

export default ChatSnippet;
