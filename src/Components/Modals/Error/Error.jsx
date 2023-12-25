//Import React and RRD
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

//Import MUI
import { Box, Modal } from '@mui/material'

//Import Components
import Error from '../../../Assets/Img/error.svg';

//Import Style
import style from './Error.module.scss'

// Import useContext => Localization
import { Context } from "../../../Context/LangContext";
import content from "../../../Localization/Content";

function Succecc({ err, setErr }) {
    const { lang, setLang } = useContext(Context);
    const handleClose = () => setErr(false);//Close Error Modal    
    return (
        <div>
            <Modal
                open={err}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={style.style}>
                    <img src={Error} alt="alt" style={{ width: '165px', height: '200px' }} />
                    <p className={style.title}>{content[lang].err}</p>
                    <button className={style.button} onClick={() => handleClose()}>
                        {content[lang].back}
                    </button>
                </Box>
            </Modal>
        </div>
    )
}

export default Succecc