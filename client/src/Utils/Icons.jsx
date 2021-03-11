import React from "react";
import AlarmIcon from "@material-ui/icons/Alarm";
import Assessment from "@material-ui/icons/Assessment";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Book from "@material-ui/icons/Book";
import EmojiEvents from "@material-ui/icons/EmojiEvents";
import Event from "@material-ui/icons/Event";
import FitnessCenter from "@material-ui/icons/FitnessCenter";
import GitHub from "@material-ui/icons/GitHub";
import Star from "@material-ui/icons/Star";

export const GetIcon = (icon) => {
    switch (icon) {
        case 1:
            return <AlarmIcon/>
        case 2:
            return <Assessment/>
        case 3:
            return <AttachMoney/>
        case 4:
            return <Book/>
        case 5:
            return <EmojiEvents/>
        case 6:
            return <Event/>
        case 7:
            return <FitnessCenter/>
        case 8:
            return <GitHub/>
        case 9:
            return <Star/>
        default:
            return <AlarmIcon/>

    }
}