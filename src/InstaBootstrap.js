import avatar from "./images/insta.png";
import instablank from "./images/insta-blank.jpg";
import instaArrow from "./images/instaArrow.png";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import story from "./images/story.png";
import Button from '@mui/material/Button';
import html2canvas from "html2canvas";
import * as fs from "file-saver";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const reUrl = /(((https?:\/\/)|(www\.))[^\s]+)/g;
const reMention = /\B@[a-z][a-z0-9._-]*\b/gi;
const reHash = /\B#[a-z][a-z0-9._-]*\b/gi;

const InstaBootstrap = () => {
    const [username, setUsername] = useState("jhondoe");
    const [description, setDescription] = useState("New york, USA");

    const [text, setText] = useState("This is a sample post. @mentions, #hashtags are all automatically converted.");
    const [icount, setIcount] = useState(1);
    const [logdate, setLogDate] = useState(new Date());
    const [rtime, setRtime] = useState("1s");
    const [cdate, setCdate] = useState(new Date());
    const [comment, setComment] = useState(1234);
    const [like, setLike] = useState(1234);
    const [profile, setProfile] = useState(null);
    const [img, setImg] = useState(null);
    const [autoText, setAutotext] = useState(null);
    const [verify, setVerify] = useState(false);
    const [ilike, setIlike] = useState("1,234");
    const [icomment, setIcomment] = useState("1,234");
    const [postLike, setPostlike] = useState(false);
    const [tagged, setTagged] = useState(false);
    const [hasStory, setHasStory] = useState(false);
    const [firstUser, setFirstuser] = useState("janedoe");
    const [firstUserText, setFirstusertext] = useState("I liked the post John. Thanks for sharing.");
    const [refirstUserText, setReFirstusertext] = useState(null);
    const [secondUser, setSeconduser] = useState("johnniedoe");
    const [secondUserText, setSecondusertext] = useState("🔥🔥🔥");
    const [resecondUserText, setReSecondusertext] = useState(null);


    useEffect(() => {
        setAutotext(`<strong style="margin-right:3px;">${username}</strong>` + text.replace(reUrl, url => `<span class="highlight">${url}</a>`).replace(
            reHash,
            hash => `<span class="highlight">${hash}</span>`
        ).replace(
            reMention,
            mention => `<span class="highlight">${mention}</span>`
        ));
    }, [text]);
    useEffect(() => {
        setReFirstusertext(`<strong style="margin-right:3px;">${firstUser}</strong>` + firstUserText.replace(reUrl, url => `<span class="highlight">${url}</a>`).replace(
            reHash,
            hash => `<span class="highlight">${hash}</span>`
        ).replace(
            reMention,
            mention => `<span class="highlight">${mention}</span>`
        ));
    }, [firstUser, firstUserText]);
    useEffect(() => {
        setReSecondusertext(`<strong style="margin-right:3px;">${secondUser}</strong>` + secondUserText.replace(reUrl, url => `<span class="highlight">${url}</a>`).replace(
            reHash,
            hash => `<span class="highlight">${hash}</span>`
        ).replace(
            reMention,
            mention => `<span class="highlight">${mention}</span>`
        ));
    }, [secondUser, secondUserText]);
    useEffect(() => {
        const currentTime = new Date();
        let difference = currentTime.getTime() - logdate.getTime();
        let seconds = Math.round(difference / 1000) + 1;
        let resultInMinutes = Math.round(difference / 60000);
        resultInMinutes < 1 ? setRtime(seconds + " SECONDS AGO") : setRtime(resultInMinutes + " MINUTES AGO");
    }, [username, text, verify, comment, like, profile, icount, description]);
    const downloadPost = () => {
        html2canvas(document.getElementById("instapost")).then(function (canvas) {

            canvas.toBlob(function (blob) {
                fs.saveAs(blob, 'InstaPost.jpg');
            });
        });
    }
    const handleImageRemove = (idx) => {
        //let im = [...img];
        //im.splice(idx, 1);
        //setImg(im);
    }
    const handleDebounce = (fn, delay) => {
        let timer;
        return function (...args) { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
    }
    const handleUploadClick = (e) => {
        e.preventDefault();
        let id = e.target.id;
        if (id === "profile") {
            let tag = document.getElementById("profileInsta");
            tag.click();
        } else {
            let tag = document.getElementById("instaPost");
            tag.click();
        }


    }
    const handleDate = (e) => {
        // e.preventDefault();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let tp = new Date(e);
        if (tp.getDate() !== logdate.getDate()) {

            let day = tp.getDate();
            let month = months[tp.getMonth()];
            let year = tp.getFullYear();
            setRtime(`${month} ${day}, ${year}`);
        }
        else if (tp.getDate() === logdate.getDate()) {

            let resulth = Math.abs(tp.getHours() - logdate.getHours());
            if (resulth) {
                setRtime(`${resulth}HOURS AGO`);
            }
            else {
                let resultm = Math.abs(tp.getMinutes() - logdate.getMinutes());
                let results = Math.abs(tp.getSeconds() - logdate.getSeconds());
                resultm ? setRtime(`${results}SECONDS AGO`) : setRtime(`${resultm}MINUTES AGO`);
            }

        }
        console.log(tp.getDate() === logdate.getDate());
        setCdate(e);
    }
    const handleAvatarUpload = async (e) => {
        e.preventDefault();
        const base64 = await convertBase64(e.target.files[0]);
        setProfile(base64);

    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleInstaImages = async (e) => {
        e.preventDefault();
        const base64 = await convertBase64(e.target.files[0]);
        setImg(base64);
    }
    const handleChange = (e) => {
        const { name, value } = e.target; debugger
        if (name === "like") {
            if (Number(value) < 0) {
                setLike(0);

            }
            else if (value < 1000) {
                setLike(value);
                setIlike(Number(value));
            } else if (value >= 1000 && value <= 10000) {
                setLike(value);
                setIlike(`${value[0]},${value.substring(1)}`);
            }
            else if (value >= 10000 && value < 100000) {
                setLike(value);
                setIlike(`${value.substring(0, 2)},${value.substring(2)}`);
            }
            else if (value > 99999 && value <= 999999) {
                setLike(value);
                setIlike(`${value.substring(1, 0)},${value.substring(1, 3)},${value.substring(3)}`);
            }
            else if (value >= 9999999 && value < 99999999) {
                setLike(value);
                setIlike(`${value.substring(0, 2)},${value.substring(2, 4)},${value.substring(4)}`);
            }


        } else if (name === "comment") {
            if (Number(value) < 0) {
                setComment(0);

            }
            else if (value < 1000) {
                setComment(value);
                setIcomment(Number(value));
            } else if (value >= 1000 && value <= 10000) {
                setComment(value);
                setIcomment(`${value[0]},${value.substring(1)}`);
            }
            else if (value >= 10000 && value < 100000) {
                setComment(value);
                setIcomment(`${value.substring(0, 2)},${value.substring(2)}`);
            }
            else if (value > 99999 && value <= 999999) {
                setComment(value);
                setIcomment(`${value.substring(1, 0)},${value.substring(1, 3)},${value.substring(3)}`);
            }
            else if (value >= 9999999 && value < 99999999) {
                setComment(value);
                setIcomment(`${value.substring(0, 2)},${value.substring(2, 4)},${value.substring(4)}`);
            }
        }

    }
    return (<div className="container-fluid m-md-3 m-sm-0">
       
        <div className="row justify-content-center">
            <div className="col col-md-10 col-lg-9 col-xl-9">
                <h1 className="text-center text-lg-start" >Instagram post generator </h1>
                <div className="row d-sm-grid d-md-flex d-lg-flex justify-content-center">
            <div className="col-md col-lg-5 col-xl-4 col-xxl-2  d-flex justify-self-center align-items-center justify-content-center  " style={{ minWidth: 412, maxWidth: 412, justifySelf: "center", padding: 10, backgroundColor: "white", border: "1px solid #e1e1ef", borderRadius:8 }}>
                {/* <div className="" style={{ width: 402, border: "1px solid black", height: 600, maxWidth: 402 }}></div>*/}
                <div id="instapost" style={{ width: 402, height: "auto", backgroundColor: "white", border: "1px solid #e1e1ef", maxHeight: 740, margin: 10 }}>
                    <div style={{ display: "flex", width: "100%", padding: 10 }}>
                        <div style={{ position: "relative", width: 42, height: 42, display: "flex", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                            <div style={{ width: "32px", height: 32, position: "absolute" }}>
                                <img src={profile ? profile : avatar} alt="f" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />

                            </div>
                            {hasStory ? <div style={{ position: "relative", width: 42, height: 42 }}>
                                <img src={story} alt="f" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />

                            </div> : null}
                        </div>
                        <div style={{ display: "flex", width: "85%", justifyContent: "space-between" }}>
                            <div style={{ display: "grid" }}>
                                <div style={{ fontSize: 14, textOverflow: "ellipsis", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", display: "flex", gap: 3, alignItems: "center" }}>{username}{verify ? <svg width="14" height="14" viewBox="0 0 24 24" aria-label="Verified account" fill="#1da1f2" marginLeft="3px"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg> : null}</div>
                                <div style={{ fontSize: 12, textOverflow: "ellipsis", fontWeight: 400, whiteSpace: "nowrap", overflow: "hidden" }}>{description}</div>
                            </div>
                            <div style={{ transform: "rotate(90deg)" }}><svg aria-label="More options" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24" transform="" transform-origin="center center"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6.5" cy="12" r="1.5"></circle><circle cx="17.5" cy="12" r="1.5"></circle></svg></div>
                        </div>
                    </div>
                    <div style={{ height: 400, position: "relative" }}>
                        <img src={img ? img : instablank} style={{ width: "100%", height: "100%" }} />
                        {tagged ? <div style={{ position: "absolute", bottom: 12, left: 12, width: 28, height: 28, backgroundColor: "black", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><svg aria-label="Tags" color="#ffffff" fill="#ffffff" height="12" role="img" viewBox="0 0 48 48" width="12"><path d="M24 26.7c-7.4 0-13.4-6-13.4-13.4S16.6 0 24 0s13.4 6 13.4 13.4-6 13.3-13.4 13.3zM45 48H3c-.8 0-1.5-.7-1.5-1.5v-3c0-7.4 6-13.4 13.4-13.4h18.3c7.4 0 13.4 6 13.4 13.4v3c-.1.8-.8 1.5-1.6 1.5z"></path></svg></div> : null}
                        {icount > 1 ? <div style={{ position: "absolute", top: "50%", right: 12, width: 28, height: 28, backgroundColor: "black", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><img src={instaArrow} style={{ width: "100%", height: "100%" }} /></div> : null}

                    </div>
                    <div style={{ display: "flex", height: 15, gap: 3, justifyContent: "center", alignItems: 'center' }}>{icount > 1 ? [...Array(icount)].map((el, idx) => <div style={{ borderRadius: "50%", backgroundColor: idx === 0 ? "#1da1f2" : "#8e8e8e", width: 6, height: 6 }}></div>) : null}</div>

                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between", paddingTop: "" }}>
                        <div style={{ display: "flex", width: "28%", alignItems: "center", justifyContent: "space-between", paddingLeft: "3%" }}>
                            <div style={{}}>{postLike ? <svg aria-label="Like" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg> : <svg aria-label="Like" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>}</div>
                            <div style={{}}><svg aria-label="Comment" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fillRule="evenodd"></path></svg></div>
                            <div style={{}}><svg aria-label="Share Post" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg></div>
                        </div>
                        <div style={{ width: "10%" }}><svg aria-label="Save" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg></div>
                    </div>
                    <div style={{ display: "grid", fontSize: 14, gap: 3, paddingLeft: "3%", marginTop: 10, marginBottom: 8 }}>
                        <div style={{ fontWeight: 600 }}>{ilike} likes</div>
                        <div style={{ width: "100%", overflowWrap: "anywhere", color: "#0f1419" }} dangerouslySetInnerHTML={{ __html: text.length >= 120 ? (autoText + "..." + `<span style="color:#8e8e8e;">more</span>`) : autoText }}></div>

                        <div style={{ color: "#8e8e8e" }}>View all {icomment} comments</div>
                        {firstUser ? <div style={{ display: "flex", gap: 10 }}>< div style={{ width: "90%", overflowWrap: "anywhere", color: "#0f1419" }} dangerouslySetInnerHTML={{ __html: firstUser && firstUserText.length >= 120 ? (refirstUserText + "..." + `<span style="color:#8e8e8e;">more</span>`) : refirstUserText }}></div><div style={{ width: "5%" }}><svg aria-label="Like" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 48 48" width="12"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg></div></div> : null}
                        {secondUser ? <div style={{ display: "flex", gap: 10 }}> < div style={{ width: "90%", overflowWrap: "anywhere", color: "#0f1419" }} dangerouslySetInnerHTML={{ __html: secondUser && secondUserText.length >= 120 ? (resecondUserText + "..." + `<span style="color:#8e8e8e;">more</span>`) : resecondUserText }}></div><div style={{ width: "5%" }}><svg aria-label="Like" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 48 48" width="12"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg></div></div> : null}

                        {/*<div style={{}}><strong>johnniedoe</strong>*/}
                        {/*    tp*/}
                        {/*    </div>*/}
                        <div style={{ textTransform: "uppercase", fontSize: 10, color: "#8e8e8e", marginTop: 5 }}>{rtime}
                        </div></div>
                </div>
            </div>
            <div className="col-md col-lg col-xl col-xxl">
                <div className="row">
                    <h3>Post Data</h3>

                </div>

                <div className="row d-md-block d-lg-flex my-3">
                    <div className="col-md-12 col-lg col-xl col-xxl my-3"><div className="insta-input-image-div" style={{ cursor: profile ? "not-allowed" : "pointer", width: "inherit" }}>
                        <div className="col" style={{ width: "", pointerEvents: profile ? "none" : "" }}>
                            <label style={{ fontSize: 12, color: "#5b7083", cursor: profile ? "not-allowed" : "pointer" }}>Avatar</label>
                            <div style={{ marginTop: 3 }} onClick={handleDebounce(handleUploadClick, 200)} style={{ cursor: profile ? "not-allowed" : "pointer" }} id="profile"><i className="fa fa-folder-open-o" aria-hidden="true" style={{ marginRight: 10, fontWeight: 400 }} />
                                Click to upload</div>
                        </div>
                        <div className="col-2" style={{ display: "block", zIndex: 100,maxWidth:50 }}>{profile ? <><img src={profile} alt="f" style={{ width: 32, height: 32, borderRadius: 8, objectFit: "cover", zIndex: 100, position: "absolute", marginTop: 10 }} /> <i className="fa fa-times" aria-hidden="true" style={{ borderRadius: "50%", backgroundColor: "#DDDDDD", fontSize: 13, color: "black", zIndex: 110, right: "-32px", position: "relative", cursor: "pointer" }} onClick={() => setProfile(null)} /></> : null}</div>
                        <input type="file" accept="image/*" id="profileInsta" style={{ display: "none" }} onChange={handleAvatarUpload} />
                    </div></div>
                    <div className="col-md-12 col-lg col-xl col-xxl my-3"><div className="insta-input-image-div" style={{ cursor: img ? "not-allowed" : "pointer", width: "inherit" }}>
                        <div className="col" style={{ width: "", cursor: img ? "not-allowed" : "pointer", pointerEvents: img ? "none" : "" }}>

                            <label style={{ fontSize: 12, color: "#5b7083", cursor: "pointer" }}>Post Image</label>
                            <div style={{ marginTop: 3 }} onClick={handleDebounce(handleUploadClick, 200)} id="instaImages"><i className="fa fa-folder-open-o" aria-hidden="true" style={{ marginRight: 10, fontWeight: 400 }} />Click to upload
                            </div></div>
                        <div className="col-2" style={{ display: "block", zIndex: 100, maxWidth: 50 }}>{img ? <><img src={img} alt="f" style={{ width: 32, height: 32, borderRadius: 8, objectFit: "cover", zIndex: 100, position: "absolute", marginTop: 10 }} /> <i className="fa fa-times" aria-hidden="true" style={{ borderRadius: "50%", backgroundColor: "#DDDDDD", fontSize: 13, color: "black", zIndex: 110, right: "-32px", position: "relative", cursor: "pointer" }} onClick={() => setImg(null)} /></> : null}</div>

                        <input type="file" accept="image/*" id="instaPost" name="instaPost" style={{ display: "none" }} onChange={handleInstaImages} multiple={false} />                        </div>
</div>

                </div>
                <div className="row d-md-block d-lg-flex my-3">
                    <div className="col-md-12 col-lg col-xl col-xxl  "><TextField label="Username" id="username" name="username" value={username} onChange={(e) => e.target.value.length <= 30 ? setUsername(e.target.value) : setUsername(e.target.value.substring(0, 30))} sx={{ width: "inherit", backgroundColor: "#FFFFFF", height: 55 }} fullWidth autoComplete="off"
                        InputProps={{
                            endAdornment: <button className="verify-btn" style={{ backgroundColor: verify ? "#1da1f2" : "#ffffff", fontSize: 15, color: verify ? "white" : "black" }} onClick={() => setVerify(!verify)}> Verified</button>
                        }}
                    /></div>


                </div>
                <div className="row d-md-block d-lg-flex my-3">
                    <div className="col-md-12 col-lg col-xl col-xxl my-md-3 my-3"><TextField label="Description" id="description" name="description" value={description} onChange={(e) => e.target.value.length <= 40 ? setDescription(e.target.value) : setDescription(e.target.value.substring(0, 40))} sx={{ width: "inherit !important", backgroundColor: "#FFFFFF", height: 55, minWidth: 200 }} fullWidth autoComplete="off" /></div>
                    <div className="col-md-12 col-lg col-xl col-xxl my-md-3 my-3"> <DatePicker
                        customInput={
                            <TextField label="Post Date" id="tweet-date" name="date" sx={{ width: "inherit !important", backgroundColor: "#FFFFFF", height: 55, minWidth: 200 }} type="text" value={cdate} fullWidth InputLabelProps={{

                            }} autoComplete="off" onChange={handleDate}
                                InputProps={{
                                    endAdornment: (
                                        <i className="fa fa-calendar" aria-hidden="true" style={{ color: "#479AEA" }} />
                                    )
                                }} />
                        }
                        selected={cdate}
                        onChange={handleDate}
                        showTimeSelect
                        maxDate={new Date()}
                        dateFormat="MMMM d, yyyy h:mm aa"
                    /></div>

                </div>
                <div className="row d-md-block d-lg-flex my-3">
                    <div className="col-md-12 col-lg col-xl col-xxl "><TextField
                        id="tweet-text"
                        label="Post Text(max. 120 character will be seen)"
                        type="text"
                        multiline
                        rows={4} spellCheck={false}
                        name="text"
                        value={text} onChange={e => e.target.value.length <= 120 ? setText(e.target.value) : setText(e.target.value.substring(0, 120))}
                        sx={{ width: "inherit", backgroundColor: "#FFFFFF", height: 122 }} autoComplete="off" InputProps={{
                            endAdornment: <InputAdornment position="end">{text.length}/120</InputAdornment>
                        }}
                    /></div>

                </div>
                <div className="row my-2">
                    <h3>Stats & Status</h3>

                </div>
                <div className="row d-md-block d-lg-flex my-3">
                    <div className="col-md-12 col-lg col-xl col-xxl my-md-3 my-3"><Box sx={{ width: "inherit" }}>
                        <FormControl fullWidth>
                            <InputLabel id="image-label">Image Count</InputLabel>
                            <Select
                                labelId="image-label"
                                id="image-count"
                                value={icount}
                                label="Image Count"
                                onChange={(e) => setIcount(e.target.value)} sx={{ width: "inherit", backgroundColor: "#FFFFFF", height: 55 }}
                            >
                                <MenuItem value={1} sx={{ width: "inherit" }}>1</MenuItem>
                                <MenuItem value={2} sx={{ width: "inherit" }}>2</MenuItem>
                                <MenuItem value={3} sx={{ width: "inherit" }}>3</MenuItem>
                                <MenuItem value={4} sx={{ width: "inherit" }}>4</MenuItem>
                                <MenuItem value={5} sx={{ width: "inherit" }}>5</MenuItem>
                                <MenuItem value={6} sx={{ width: "inherit" }}>6</MenuItem>
                                <MenuItem value={7} sx={{ width: "inherit" }}>7</MenuItem>
                                <MenuItem value={8} sx={{ width: "inherit" }}>8</MenuItem>
                                <MenuItem value={9} sx={{ width: "inherit" }}>9</MenuItem>
                                <MenuItem value={10} sx={{ width: "inherit" }}>10</MenuItem>
                            </Select>
                        </FormControl>
                    </Box></div>
                    <div className="col-md-12 col-lg col-xl col-xxl my-md-3 my-3"><TextField label="Like Count" id="like" name="like" value={like} onChange={handleChange} sx={{ width: "inherit", backgroundColor: "#FFFFFF", height: 55 }} type="number" autoComplete="off" /></div>
                    <div className="col-md-12 col-lg col-xl col-xxl my-md-3 my-3"><TextField label="Comment Count" id="comment" name="comment" value={comment} onChange={handleChange} sx={{ width: "inherit", backgroundColor: "#FFFFFF", height: 55 }} type="number" autoComplete="off" /></div>

                </div>
                <div className="row mb-3">
                    <div style={{ color: "#26274b", fontSize: 17, display: "grid", gap: 15, paddingLeft: "3%" }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="checkbox" name="userLike" checked={postLike} onChange={e => setPostlike(!postLike)} /><span>Is post liked by viewer?
                        </span></div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="checkbox" name="userLike" checked={tagged} onChange={e => setTagged(!tagged)} /><span>Is someone tagged?
                        </span></div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="checkbox" name="userLike" checked={hasStory} onChange={e => setHasStory(!hasStory)} /><span>Has an Instagram story?
                        </span></div>

                    </div>
                </div>
            </div>

        </div>
        <div className="row">
            <h3>Comments</h3>
        </div>
       
        <div className="row ">
            <div className="col-sm-12 col-md col-lg-auto col-xl-auto col-xxl-auto my-3"><TextField label="First Comment Username" id="first-username" name="first-username" value={firstUser} onChange={(e) => setFirstuser(e.target.value)} sx={{ width: "inherit", backgroundColor: "#FFFFFF", height: 55 }} autoComplete="off" /></div>
            <div className="col-sm-12 col-md col-lg col-xl col-xxl my-3"><TextField label="First Comment Text"  name="first-text" value={firstUserText} onChange={(e) => e.target.value.length <= 120 ? setFirstusertext(e.target.value) : setFirstusertext(e.target.value.substring(0, 120))} sx={{ width: "inherit", backgroundColor: "#FFFFFF", height: 55 }} autoComplete="off" /></div>
        </div>
        <div className="row ">
            <div className="col-sm-12 col-md col-lg-auto col-xl-auto col-xxl-auto  my-3"><TextField label="Second Comment Username"  name="second-username" value={secondUser} onChange={(e) => setSeconduser(e.target.value)} sx={{ width: "inherit !important", backgroundColor: "#FFFFFF", height: 55 }} autoComplete="off" /></div>
            <div className="col-sm-12 col-md col-lg col-xl col-xxl my-3 "><TextField label="Second Comment Text"name="second-text" value={secondUserText} onChange={(e) => e.target.value.length <= 120 ? setSecondusertext(e.target.value) : setSecondusertext(e.target.value.substring(0, 120))} sx={{ width: "inherit", backgroundColor: "#FFFFFF", height: 55 }} autoComplete="off" /></div>
            </div>
        <div className="row d-flex justify-content-center">
            <Button variant="contained" disableRipple sx={{ textTransform: "none",width:200 }} onClick={handleDebounce(downloadPost, 200)}><i className="fa fa-download" aria-hidden="true" style={{ fontSize: 10, marginRight: 8 }} />Export Instagram Post</Button>
                </div>
            </div>
        </div>
    </div>
    );
}
export default InstaBootstrap;