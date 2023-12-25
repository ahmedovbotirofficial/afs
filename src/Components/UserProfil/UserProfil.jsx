// Import => React
import React, { useContext, useEffect, useState } from "react";

// Import => Components
import Container from "../../Components/Container/Container";
import UserProfilList from "../UserProfilList/UserProfilList";

import { UserContext } from "../../Context/UserContext";

import { Context } from "../../Context/LangContext";
import content from "../../Localization/Content";

// import Edit from ''
import Compressor from "compressorjs";


// Import => Style Component
import "../../Components/UserProfil/UserProfil.scss";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

let url = process.env.REACT_APP_URL;

function UserProfil() {
    const { lang, setLang } = useContext(Context);
    const { user } = useContext(UserContext);
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [region, setRegion] = useState('')
    const [type, setType] = useState('')
    const [uniq, setUniq] = useState('')
    const [pic, setPic] = useState('')
    const [regions, setRegions] = useState([]);
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (user.hasOwnProperty('data')) {
            setPic(user.data.image)
            setName(user.data.name);
            setLastName(user.data.lastname);
            setPhone(user.data.phone);
            setEmail(user.data.email);
            setType(user.data.user_type);
            setRegion(user.data.region_id.id);
            setUniq(user.data.id);
        }
    }, [user]);

    let picture = new FormData();

    const setPicture = (e) => {
        new Compressor(e[0], {
            quality: 0.2,
            success(result) {
                picture.append('file', result)
                picture.append('key', 'Service For C Group')
                axios.post(`${url}service`, picture)
                    .then(function (response) {
                        setPic(response.data.data);
                    })
                    .catch(function (error) {
                        console.error(error);
                    })
            }
        })
    }

    let token = localStorage.getItem('Token')
    let all = new URLSearchParams();
    all.append('name', name)
    all.append('lastname', lastname)
    all.append('phone', phone)
    all.append('email', email)
    all.append('user_type', type)
    all.append('region_id', region)
    all.append('image', pic)

    let headersList = {
        "Accept": "*/*",
        'Authorization': `Bearer ${token}`
    }
    const Put = (e) => {
        fetch(`${url}user/${user.data.id}?paremeter=PUT`, {
            method: "PUT",
            headers: headersList,
            body: all
        }).then(function (response) {
            return response.text();
        }).then(function (data) {
            window.location.reload()
        })
    }

    function Show() {
        setShow(true);
    }


    useEffect(() => {
        const regions = async () => {
            try {
                const res = await axios.get(`${url}regions`);
                if (res) {
                    let data = res.data.data
                    setRegions(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        regions();
    }, [])

    return (
        <>
            <Container>
                <div className="user-profil-wrap">
                    <UserProfilList />
                    <div className="personal">
                        <div className="pic">
                            <img className="profile" src={pic ? pic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI7M4Z0v1HP2Z9tZmfQaZFCuspezuoxter_A&usqp=CAU"} alt="profile" />
                            <div className="edit">
                                <label htmlFor="img" className="editBtn"></label>
                                <input className="ppn" accept="image/*" type="file" id="img" onChange={e => { setPicture(e.target.files); Show() }} />
                            </div>
                        </div>
                        <div className="title">
                            <p>ID//{uniq}</p>
                            <button style={{ display: show ? 'block' : 'none' }} type="submit" onClick={(e) => Put(e)}>{content[lang].saveBtn}</button>
                        </div>

                        <div className="inpG">
                            <TextField
                                fullWidth
                                className="us-input"
                                label={content[lang].userProfilName}
                                id="outlined-basic"
                                variant="outlined"
                                value={name}
                                onChange={(e) => { setName(e.target.value); Show() }}
                            />
                            <TextField
                                className="us-input"
                                label={content[lang].userProfilLastName}
                                id="outlined-basic"
                                variant="outlined"
                                value={lastname}
                                onChange={(e) => { setLastName(e.target.value); Show() }}
                            />
                            <TextField
                                className="us-input"
                                label={content[lang].userProfilPhone}
                                id="outlined-basic"
                                variant="outlined" x
                                value={phone}
                                onChange={(e) => { setPhone(e.target.value); Show() }}
                            />
                            <TextField
                                className="us-input"
                                label='Email'
                                id="outlined-basic"
                                variant="outlined"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); Show() }}
                            />
                            <FormControl className="form__controler-input2">
                                <InputLabel id="viloyat">{content[lang].form_select_vil}</InputLabel>
                                <Select
                                    fullWidth
                                    className="us-input"
                                    labelId="viloyat"
                                    id="viloyat" n
                                    label={content[lang].form_select_vil}
                                    value={region}
                                    onChange={(e) => { setRegion(e.target.value); Show() }}
                                >
                                    {regions.map((region) => (
                                        <MenuItem
                                            key={region.id}
                                            value={region.id}
                                        >
                                            {lang == "uz" ? region.name_uz : lang !== "ru" ? region.name_en : region.name_ru}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl className="form__controler-input1">
                                <InputLabel id="demo-simple-select-label">{content[lang].form_select_jis}</InputLabel>
                                <Select
                                    className="us-input"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    label={content[lang].form_select_jis}
                                    onChange={(e) => { setType(e.target.value); Show() }}
                                >
                                    <MenuItem value={'personal'}>{content[lang].form_select_type_sh}</MenuItem>
                                    <MenuItem value={'bussines'}>{content[lang].form_select_type_b}</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default UserProfil;