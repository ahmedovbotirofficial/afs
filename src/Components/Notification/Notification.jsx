import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import "./Notification.scss";

function Notification({ message, type}) {

    const [open, setOpen] = useState(true);
    const [vertical, setVertical] = useState('bottom');
    const [horizontal, setHorizontal] = useState('left');
    const [duration, setDuration] = useState(5000);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        
        let notification = document.querySelectorAll('.notification');
        if (notification) {
            if (notification.length == 2) {
                setHorizontal('right');
            } else if (notification.length == 3) {
                setVertical('top');
            } else if (notification.length == 4) {
                setVertical('top');
                setHorizontal('right');
            }
        } 
    }, [])

    // useEffect(() => {
    //     setOpen(true);
    // }, [message, type])
    
    return (
        <Snackbar
            anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
            open={open}
            autoHideDuration={duration}
            onClose={handleClose}
            className="notification"
        >
            <Alert
                onClose={handleClose}
                severity={type}
                sx={{ width: "100%" }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
export default Notification;
