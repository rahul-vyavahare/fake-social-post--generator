import avatar from "./images/avatar.jpg";
import { useState, useEffect } from "react";
//import Box from '@/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import html2canvas from "html2canvas";
import * as fs from "file-saver";
const reUrl = /(((https?:\/\/)|(www\.))[^\s]+)/g;
///\b(http|https):\/\/[a-z-@#$%]*.[a-z/-=?$%&#@!]*[^,\S]/g;
///(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
const reMention = /\B@[a-z][a-z0-9._-]*\b/gi;
// /(?:\s|^)?@[A-Za-z0-9\-\.\_]+(?:\s|$)/g;
const reHash = /\B#[a-z][a-z0-9._-]*\b/gi;
// /(?:\s|^)?#[A-Za-z0-9\-\.\_]+(?:\s|$)/g;
export const Tweeter = () => {
    const [name, setName] = useState("Jhon Doe");
    const [username, setUsername] = useState("jhondoe");
    const [text, setText] = useState("This is a sample tweet. @mentions, #hashtags are all automatically converted.");
    const [reply, setReply] = useState(0);
    const [logdate, setLogDate] = useState(new Date());
    const [rtime, setRtime] = useState("1s");
    const [cdate, setCdate] = useState(new Date().toISOString().slice(0, 11) + new Date().getHours() + ":" + new Date().getMinutes());
    const [retweet, setRetweet] = useState(0);
    const [like, setLike] = useState(0);
    const [profile, setProfile] = useState(null);
    const [img, setImg] = useState([]);
    const [autoText, setAutotext] = useState(null);
    const [verify, setVerify] = useState(false);
    const [tretweet, setTRetweet] = useState(0);
    const [tlike, setTLike] = useState(0);
    const [treply, setTReply] = useState(0);

    useEffect(() => {
        setAutotext(text.replace(reUrl, url => `<span class="highlight">${url}</a>`).replace(
            reHash,
            hash => `<span class="highlight">${hash}</span>`
        ).replace(
            reMention,
            mention => `<span class="highlight">${mention}</span>`
        ));
    }, [text]);
    useEffect(() => {
        const currentTime = new Date();
        let difference = currentTime.getTime() - logdate.getTime();
        let seconds = Math.round(difference / 1000) + 1;
        let resultInMinutes = Math.round(difference / 60000);
        resultInMinutes < 1 ? setRtime(seconds + "s") : setRtime(resultInMinutes + "m");
    }, [name, username, text, reply, retweet, like, profile]);
    const handleChange = (e) => {
        const { name, value } = e.target; debugger
        //e.target.value < 1 ? setReply(0) : setReply(e.target.value)
        if (name === "retweet") {
            if (Number(value) < 0) {
                setRetweet(0);
                setTRetweet(null);
            }
            else if (value < 1000) {
                setRetweet(value);
                setTRetweet(Number(value));
            } else if (value >= 1000 && value <= 10000) {
                setRetweet(value);
                let cal = value / 1000;
                setTRetweet(`${cal.toFixed(1).includes(".0") ? cal.toFixed(0) : cal.toFixed(1)}K`);
            }
            else if (value > 10000 && value < 100000) {
                setRetweet(value);
                let cal = value / 1000;
                setTRetweet(`${Math.round(cal.toFixed(1))}K`);
            }
            else if (value > 99999 && value < 999999999) {
                setRetweet(value);
                let cal = value / 1000000;
                setTRetweet(`${Math.round(cal.toFixed(0))}M`);
            }
            else if (value >= 999999999 && value <= 99999999999) {
                setRetweet(value);
                let cal = value / 1000000000;
                setTRetweet(`${Math.round(cal.toFixed(0))}B`);
            }
            else if (value > 99999999999 && value < 99999999999999999) {
                setRetweet(value);
                let cal = value / 1000000000000;
                setTRetweet(`${Math.round(cal.toFixed(0))}T`);
            }

        } else if (name === "reply") {
            if (Number(value) < 0) {
                setReply(0);
                setTReply(null);
            }
            else if (value < 1000) {
                setReply(value);
                setTReply(Number(value));
            } else if (value >= 1000 && value <= 10000) {
                setReply(value);
                let cal = value / 1000;
                setTReply(`${cal.toFixed(1).includes(".0") ? cal.toFixed(0) : cal.toFixed(1)}K`);
            }
            else if (value > 10000 && value < 100000) {
                setReply(value);
                let cal = value / 1000;
                setTReply(`${Math.round(cal.toFixed(1))}K`);
            }
            else if (value > 99999 && value < 999999999) {
                setReply(value);
                let cal = value / 1000000;
                setTReply(`${Math.round(cal.toFixed(0))}M`);
            }
            else if (value >= 999999999 && value <= 99999999999) {
                setReply(value);
                let cal = value / 1000000000;
                setTReply(`${Math.round(cal.toFixed(0))}B`);
            }
            else if (value > 99999999999 && value < 99999999999999999) {
                setReply(value);
                let cal = value / 1000000000000;
                setTReply(`${Math.round(cal.toFixed(0))}T`);
            }
        }
        else if (name === "like") {
            if (Number(value) < 0) {
                setLike(0);
                setTLike(null);
            }
            else if (value < 1000) {
                setLike(value);
                setTLike(Number(value));
            } else if (value >= 1000 && value <= 10000) {
                setLike(value);
                let cal = value / 1000;
                setTLike(`${cal.toFixed(1).includes(".0") ? cal.toFixed(0) : cal.toFixed(1)}K`);
            }
            else if (value > 10000 && value < 100000) {
                setLike(value);
                let cal = value / 1000;
                setTLike(`${Math.round(cal.toFixed(1))}K`);
            }
            else if (value > 99999 && value < 999999999) {
                setLike(value);
                let cal = value / 1000000;
                setTLike(`${Math.round(cal.toFixed(0))}M`);
            }
            else if (value >= 999999999 && value <= 99999999999) {
                setLike(value);
                let cal = value / 1000000000;
                setTLike(`${Math.round(cal.toFixed(0))}B`);
            }
            else if (value > 99999999999 && value < 99999999999999999) {
                setLike(value);
                let cal = value / 1000000000000;
                setTLike(`${Math.round(cal.toFixed(0))}T`);
            }

        }
    }
    const handleUploadClick = (e) => {
        e.preventDefault();
        let id = e.target.id;
        if (id === "profile") {
            let tag = document.getElementById("profileI");
            tag.click();
        } else {
            let tag = document.getElementById("tweetImageI");
            tag.click();
        }


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
    const handleDate = (e) => {
        e.preventDefault();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let tp = new Date(e.target.value);
        if (tp.getDate() !== logdate.getDate()) {

            let day = tp.getDate();
            let month = months[tp.getMonth()];
            let year = tp.getFullYear();
            setRtime(`${month} ${day}, ${year}`);
        }
        else if (tp.getDate() === logdate.getDate()) {

            let resulth = Math.abs(tp.getHours() - logdate.getHours());
            if (resulth) {
                setRtime(`${resulth}h`);
            }
            else {
                let resultm = Math.abs(tp.getMinutes() - logdate.getMinutes());
                let results = Math.abs(tp.getSeconds() - logdate.getSeconds());
                resultm ? setRtime(`${results}s`) : setRtime(`${resultm}m`);
            }

        }
        console.log(tp.getDate() === logdate.getDate());
        setCdate(e.target.value);
    }
    const handleTweetImages = async (e) => {
        e.preventDefault();
        let last = 4 - img.length;
        let len = e.target.files.length < last ? e.target.files.length : last;
        let images = [...img];
        for (let i = 0; i < len; i++) {
            const base64 = await convertBase64(e.target.files[i]);
            images.push(base64);

        }
        setImg(images);
    }
    const downloadTweet = () => {
        html2canvas(document.getElementById("tweet-inner")).then(function (canvas) {

            canvas.toBlob(function (blob) {
                fs.saveAs(blob, 'dummyTweet.jpg');
            });
        });
    }
    const handleImageRemove = (idx) => {
        let im = [...img];
        im.splice(idx, 1);
        setImg(im);
    }
    const handleDebounce = (fn, delay) => {
        let timer;
        return function (...args) { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
    }

    return (<>
        <div style={{ width: '80vw', height: "100%" }}><h1 style={{}}><i className="fa fa-twitter-square" aria-hidden="true" style={{ marginRight: "10px" }} />Tweet Generator</h1>
            <div style={{ width: "60vw", height: "auto", minHeight: "200px", backgroundColor: "white", border: "1px solid #e1e1ef", borderRadius: 8, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "10%" }}>
                <div id="tweet-inner" style={{ width: "600px", height: "auto", backgroundColor: "white", border: "1px solid #e1e1ef", marginTop: 15, marginBottom: 15 }}>
                    <div style={{ display: "flex", padding: 10, width: "100%" }}>
                        <div style={{}}>
                            <div style={{}}>
                                <img src={profile ? profile : avatar} alt="f" style={{ width: 48, height: 48, borderRadius: "50%" }} />
                            </div>
                        </div>
                        <div style={{ display: "grid", paddingLeft: 10, width: "100%" }}>
                            <div style={{ display: "flex", justifyContent: "", width: "95%", alignItems: "center" }}>

                                <div style={{ display: "flex", maxWidth: "95%", width: "530px" }}>
                                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", display: "", alignItems: "center", gap: 3, whiteSpace: "nowrap", color: "#0f1419", fontWeight: 700, width: "auto", maxWidth: "45%" }}>{name}

                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>{verify ? <svg width="18.75" height="18.75" viewBox="0 0 24 24" aria-label="Verified account" fill="#1da1f2"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg> : null}</div>
                                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#5b7083", width: "auto", maxWidth: "35%" }}>&nbsp;@{username}
                                    </div>
                                    <div style={{ color: "#5b7083", width: "2%", textAlign: "center" }}>&middot;
                                    </div>
                                    <div style={{ color: "#5b7083", width: "28%" }}>{rtime}
                                    </div>
                                </div>
                                <div style={{ width: "5%" }}>
                                    <i className="fa fa-ellipsis-h" aria-hidden="true" style={{ position: "relative", float: "right" }} />                                </div>
                            </div>
                            <div style={{ width: "90%", overflowWrap: "anywhere", color: "#0f1419" }} dangerouslySetInnerHTML={{ __html: autoText }}>

                            </div>
                            <div style={img && img.length > 1 ? { width: 504, height: 286, backgroundColor: "", marginTop: 10 } : {}}>
                                {img && img.length === 1 ? <div style={{ width: "95%", height: "100%", gap: 2, display: "flex" }}><img src={img[0]} alt="f" style={{ width: "100%", height: "100%", borderRadius: 20 }} /></div> : null}
                                {img && img.length === 2 ? <div style={{ width: "100%", height: "100%", gap: 2, display: "flex" }}><img src={img[0]} alt="f" style={{ width: "50%", height: "100%", objectFit: "cover", borderRadius: "20px 0px 0px 20px" }} /> <img src={img[1]} alt="f" style={{ width: "50%", height: "100%", objectFit: "cover", borderRadius: "0px 20px 20px 0px" }} /></div> : null}
                                {img && img.length === 3 ? <div style={{ width: "100%", height: "100%", gap: 2, display: "flex" }}><img src={img[0]} alt="f" style={{ width: "50%", height: "100%", objectFit: "cover", borderRadius: "20px 0px 0px 20px" }} /> <div style={{ width: "50%", height: "100%", display: "grid", gap: 2 }}><img src={img[1]} alt="f" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "0px 20px 0px 0px" }} /><img src={img[2]} alt="f" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "0px 0px 20px 0px" }} /></div></div> : null}
                                {img && img.length === 4 ? <div style={{ width: "100%", height: "100%", gap: 2, display: "" }}>
                                    <img src={img[0]} key="0" alt="f" style={{ width: "49%", height: "50%", objectFit: "cover", borderRadius: "20px 0px 0px 0px", marginRight: "1px", marginBottom: "1px" }} />
                                    <img src={img[2]} key="1" alt="f" style={{ width: "49%", height: "50%", objectFit: "cover", borderRadius: "0px 20px 0px 0px", marginLeft: "1px", marginBottom: "1px" }} />
                                    <img src={img[2]} key="2" alt="f" style={{ width: "49%", height: "50%", objectFit: "cover", borderRadius: "0px 0px 0px 20px", marginRight: "1px", marginTop: "1px" }} />
                                    <img src={img[3]} key="3" alt="f" style={{ width: "49%", height: "50%", objectFit: "cover", borderRadius: "0px 0px 20px 0px", marginLeft: "1px", marginTop: "1px" }} />                                </div> : null}

                            </div>
                            <div style={{ display: "flex", width: "90%", gap: "20px", color: "#5b7083", marginTop: "12px", height: 18 }}>
                                <div style={{ color: "#5b7083", display: "flex", justifyContent: "", alignItems: "center", gap: "", width: "20%" }}>
                                    <svg width="18.75" height="18.75" viewBox="0 0 24 24" fill="#5b7083"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>{treply ? <span style={{ marginLeft: 8, fontSize: 13 }}>{treply}</span> : null}
                                </div>
                                <div style={{ color: "#5b7083", display: "flex", justifyContent: "", alignItems: "center", gap: "", width: "20%" }}>
                                    <svg width="18.75" height="18.75" viewBox="0 0 24 24" fill="#5b7083"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>{tretweet === 0 ? null : <span style={{ marginLeft: 8, fontSize: 13 }}>{tretweet}</span>}
                                </div>
                                <div style={{ color: "#5b7083", display: "flex", justifyContent: "", alignItems: "center", gap: "", width: "20%" }}>
                                    <svg width="18.75" height="18.75" viewBox="0 0 24 24" fill="#5b7083"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>{tlike === 0 ? null : <span style={{ marginLeft: 8, fontSize: 13 }}>{tlike}</span>}
                                </div>
                                <div style={{ color: "#5b7083", display: "flex", justifyContent: "", alignItems: "center", gap: "", width: "20%" }}>
                                    <svg width="18.75" height="18.75" viewBox="0 0 24 24" fill="#5b7083"><g><path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path><path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path></g></svg>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div style={{ width: "100%" }}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 20, gap: "4vw" }}>
                    <div className="field-hover" style={{ display: "flex" }}>
                        <div style={{ width: "88%", cursor: profile ? "not-allowed" : "pointer" }}>
                            <label style={{ fontSize: 12, color: "#5b7083", cursor: profile ? "not-allowed" : "pointer", pointerEvents: profile ? "none" : "" }}>Avatar</label>
                            <div style={{ marginTop: 3 }} onClick={handleDebounce(handleUploadClick, 200)} style={{ cursor: profile ? "not-allowed" : "pointer" }} id="profile"><i className="fa fa-folder-open-o" aria-hidden="true" style={{ marginRight: 10, fontWeight: 400 }} />
                                Click to upload</div>
                        </div>
                        <div style={{ display: "block", zIndex: 100 }}>{profile ? <><img src={profile} alt="f" style={{ width: 32, height: 32, borderRadius: 8, objectFit: "cover", zIndex: 100, position: "absolute", marginTop: 10 }} /> <i className="fa fa-times" aria-hidden="true" style={{ borderRadius: "50%", backgroundColor: "#DDDDDD", fontSize: 13, color: "black", zIndex: 110, right: "-32px", position: "relative" }} onClick={() => setProfile(null)} /></> : null}</div>
                        <input type="file" accept="image/*" id="profileI" style={{ display: "none" }} onChange={handleAvatarUpload} />
                    </div>
                    <div className="field-hover" style={{ display: "flex" }}>
                        <div style={{ width: "50%", cursor: img.length === 4 ? "not-allowed" : "pointer" }}>

                            <label style={{ fontSize: 12, color: "#5b7083", cursor: img.length === 4 ? "not-allowed" : "pointer" }}>Tweet Images (Up to 4)</label>
                            <div style={{ marginTop: 3 }} onClick={handleDebounce(handleUploadClick, 200)} id="tweetImages"><i className="fa fa-folder-open-o" aria-hidden="true" style={{ marginRight: 10, fontWeight: 400 }} />Click to upload
                            </div></div>
                        <div style={{ display: "flex", zIndex: 100, gap: 45, width: "40%", justifyContent: "end", transition: "0.2s" }}>
                            {img.length > 0 ? img.map((item, idx) => <div><img src={item} alt="f" key={idx} style={{ width: 32, height: 32, borderRadius: 8, objectFit: "cover", zIndex: 100, position: "absolute", marginTop: 10 }} /> <i className="fa fa-times" aria-hidden="true" style={{ borderRadius: "50%", backgroundColor: "#DDDDDD", fontSize: 13, color: "black", zIndex: 110, right: "-32px", position: "relative" }} onClick={() => handleImageRemove(idx)} /></div>) : null}
                        </div>
                        <input type="file" accept="image/*" id="tweetImageI" name="tweetImageI" style={{ display: "none" }} onChange={handleTweetImages} multiple />                        </div>

                </div>
                <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: "2vw" }}>
                    <TextField label="Name" id="name" name="name" value={name} onChange={(e) => { e.preventDefault(); setName(e.target.value) }} sx={{ width: "22vw", backgroundColor: "#FFFFFF" }} fullWidth autoComplete="off" />
                    <TextField label="Username" id="username" name="username" value={username} onChange={(e) => { e.preventDefault(); setUsername(e.target.value) }} sx={{ width: "22vw", backgroundColor: "#FFFFFF" }} fullWidth autoComplete="off"
                        InputProps={{
                            endAdornment: <button className="verify-btn" style={{ backgroundColor: verify ? "#1da1f2" : "#ffffff", fontSize: 15, color: verify ? "white" : "black" }} onClick={() => setVerify(!verify)}> Verified</button>
                        }}
                    />
                    <TextField label="Tweet Date" id="tweet-date" name="date" sx={{ width: "22vw", backgroundColor: "#FFFFFF" }} fullWidth type="datetime-local" value={cdate} InputLabelProps={{
                        shrink: true,
                    }} autoComplete="off" onChange={handleDate} />
                </div>
                <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}><TextField
                    id="tweet-text"
                    label="Tweet text"
                    type="text"
                    multiline
                    rows={4} spellCheck={false}
                    name="text"
                    fullWidth value={text} onChange={e => e.target.value.length <= 280 ? setText(e.target.value) : setText(e.target.value.substring(0, 280))}
                    sx={{ width: "70vw", backgroundColor: "#FFFFFF" }} autoComplete="off" InputProps={{
                        endAdornment: <InputAdornment position="end">{text.length}/280</InputAdornment>
                    }}
                /></div>
                <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: "2vw" }}>
                    <TextField label="Reply Count" id="reply" name="reply" value={reply} onChange={handleChange} sx={{ width: "22vw", backgroundColor: "#FFFFFF" }} fullWidth type="number" autoComplete="off" />
                    <TextField label="Retweet Count" id="retweet" name="retweet" value={retweet} onChange={handleChange} sx={{ width: "22vw", backgroundColor: "#FFFFFF" }} fullWidth type="number" autoComplete="off" />
                    <TextField label="Like Count" id="tweet-like" name="like" value={like} onChange={handleChange} sx={{ width: "22vw", backgroundColor: "#FFFFFF" }} fullWidth type="number" autoComplete="off" />
                </div>
                <div style={{ marginTop: 20, display: "flex", justifyContent: "center", marginBottom: 50 }}><Button variant="contained" disableRipple sx={{ textTransform: "none" }} onClick={handleDebounce(downloadTweet, 200)}><i className="fa fa-download" aria-hidden="true" style={{ fontSize: 10, marginRight: 8 }} />Export Tweet</Button></div>
            </div>

        </div>
    </>
    );
}


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

const reUrl = /(((https?:\/\/)|(www\.))[^\s]+)/g;
const reMention = /\B@[a-z][a-z0-9._-]*\b/gi;
const reHash = /\B#[a-z][a-z0-9._-]*\b/gi;

export const Instagram = () => {
    const [username, setUsername] = useState("jhondoe");
    const [description, setDescription] = useState("New york, USA");

    const [text, setText] = useState("This is a sample post. @mentions, #hashtags are all automatically converted.");
    const [icount, setIcount] = useState(1);
    const [logdate, setLogDate] = useState(new Date());
    const [rtime, setRtime] = useState("1s");
    const [cdate, setCdate] = useState(new Date().toISOString().slice(0, 11) + new Date().getHours() + ":" + new Date().getMinutes());
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
        e.preventDefault();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let tp = new Date(e.target.value);
        if (tp.getDate() !== logdate.getDate()) {

            let day = tp.getDate();
            let month = months[tp.getMonth()];
            let year = tp.getFullYear();
            setRtime(`${month} ${day}, ${year}`);
        }
        else if (tp.getDate() === logdate.getDate()) {

            let resulth = Math.abs(tp.getHours() - logdate.getHours());
            if (resulth) {
                setRtime(`${resulth}h`);
            }
            else {
                let resultm = Math.abs(tp.getMinutes() - logdate.getMinutes());
                let results = Math.abs(tp.getSeconds() - logdate.getSeconds());
                resultm ? setRtime(`${results}s`) : setRtime(`${resultm}m`);
            }

        }
        console.log(tp.getDate() === logdate.getDate());
        setCdate(e.target.value);
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
    return (<>
        <div style={{ display: "grid", marginBottom: 50 }}>
            <h1> Instagram Post Generator</h1>
            <div style={{ width: 1000, display: "flex" }}>
                <div style={{ width: 436, height: "auto", paddingBottom: 10, paddingTop: 10, backgroundColor: "white", border: "1px solid #e1e1ef", borderRadius: 8, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div id="instapost" style={{ width: 402, height: "auto", backgroundColor: "white", border: "1px solid #e1e1ef", maxHeight: 740 }}>
                        <div style={{ display: "flex", width: "100%", padding: 10 }}>
                            <div style={{ position: "relative", width: 42, height: 42, display: "flex", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                                <div style={{ width: "32px", height: 32, position: "absolute" }}>
                                    <img src={profile ? profile : avatar} alt="f" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />

                                </div>
                                {hasStory ? <div style={{ position: "relative", width: 42, height: 42 }}>
                                    <img src={story} alt="f" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />

                                </div> : null}
                            </div>
                            <div style={{ display: "flex", width: "80%", justifyContent: "space-between" }}>
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
                <div style={{ width: "55%", display: "grid", gap: 10, justifyContent: "center" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="field-hover" style={{ display: "flex", width: "43%", cursor: profile ? "not-allowed" : "pointer" }}>
                            <div style={{ width: "75%", pointerEvents: profile ? "none" : "" }}>
                                <label style={{ fontSize: 12, color: "#5b7083", cursor: profile ? "not-allowed" : "pointer" }}>Avatar</label>
                                <div style={{ marginTop: 3 }} onClick={handleDebounce(handleUploadClick, 200)} style={{ cursor: profile ? "not-allowed" : "pointer" }} id="profile"><i className="fa fa-folder-open-o" aria-hidden="true" style={{ marginRight: 10, fontWeight: 400 }} />
                                    Click to upload</div>
                            </div>
                            <div style={{ display: "block", zIndex: 100 }}>{profile ? <><img src={profile} alt="f" style={{ width: 32, height: 32, borderRadius: 8, objectFit: "cover", zIndex: 100, position: "absolute", marginTop: 10 }} /> <i className="fa fa-times" aria-hidden="true" style={{ borderRadius: "50%", backgroundColor: "#DDDDDD", fontSize: 13, color: "black", zIndex: 110, right: "-32px", position: "relative", cursor: "pointer" }} onClick={() => setProfile(null)} /></> : null}</div>
                            <input type="file" accept="image/*" id="profileInsta" style={{ display: "none" }} onChange={handleAvatarUpload} />
                        </div>
                        <div className="field-hover" style={{ display: "flex", width: "43%", cursor: img ? "not-allowed" : "pointer" }}>
                            <div style={{ width: "75%", cursor: img ? "not-allowed" : "pointer", pointerEvents: img ? "none" : "" }}>

                                <label style={{ fontSize: 12, color: "#5b7083", cursor: "pointer" }}>Post Image</label>
                                <div style={{ marginTop: 3 }} onClick={handleDebounce(handleUploadClick, 200)} id="instaImages"><i className="fa fa-folder-open-o" aria-hidden="true" style={{ marginRight: 10, fontWeight: 400 }} />Click to upload
                                </div></div>
                            <div style={{ display: "block", zIndex: 100 }}>{img ? <><img src={img} alt="f" style={{ width: 32, height: 32, borderRadius: 8, objectFit: "cover", zIndex: 100, position: "absolute", marginTop: 10 }} /> <i className="fa fa-times" aria-hidden="true" style={{ borderRadius: "50%", backgroundColor: "#DDDDDD", fontSize: 13, color: "black", zIndex: 110, right: "-32px", position: "relative", cursor: "pointer" }} onClick={() => setImg(null)} /></> : null}</div>

                            <input type="file" accept="image/*" id="instaPost" name="instaPost" style={{ display: "none" }} onChange={handleInstaImages} multiple={false} />                        </div>



                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}><TextField label="Username" id="username" name="username" value={username} onChange={(e) => e.target.value.length <= 30 ? setUsername(e.target.value) : setUsername(e.target.value.substring(0, 30))} sx={{ width: "32vw", backgroundColor: "#FFFFFF", height: 55 }} fullWidth autoComplete="off"
                        InputProps={{
                            endAdornment: <button className="verify-btn" style={{ backgroundColor: verify ? "#1da1f2" : "#ffffff", fontSize: 15, color: verify ? "white" : "black" }} onClick={() => setVerify(!verify)}> Verified</button>
                        }}
                    /></div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <TextField label="Description" id="description" name="description" value={description} onChange={(e) => e.target.value.length <= 40 ? setDescription(e.target.value) : setDescription(e.target.value.substring(0, 40))} sx={{ width: "15vw", backgroundColor: "#FFFFFF", height: 55 }} fullWidth autoComplete="off" />
                        <TextField label="Post Date" id="tweet-date" name="date" sx={{ width: "15vw", backgroundColor: "#FFFFFF", height: 55 }} fullWidth type="datetime-local" value={cdate} InputLabelProps={{
                            shrink: true,
                        }} autoComplete="off" onChange={handleDate} />

                    </div>
                    <div style={{ display: "flex", justifyContent: "space-evenly" }}><TextField
                        id="tweet-text"
                        label="Post Text(max. 120 character will be seen)"
                        type="text"
                        multiline
                        rows={4} spellCheck={false}
                        name="text"
                        fullWidth value={text} onChange={e => e.target.value.length <= 120 ? setText(e.target.value) : setText(e.target.value.substring(0, 120))}
                        sx={{ width: "32vw", backgroundColor: "#FFFFFF", height: 122 }} autoComplete="off" InputProps={{
                            endAdornment: <InputAdornment position="end">{text.length}/120</InputAdornment>
                        }}
                    /></div>
                    <div style={{}}><h3>Stats & States</h3></div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ width: "10vw" }}>
                            <FormControl fullWidth>
                                <InputLabel id="image-label">Image Count</InputLabel>
                                <Select
                                    labelId="image-label"
                                    id="image-count"
                                    value={icount}
                                    label="Image Count"
                                    onChange={(e) => setIcount(e.target.value)} sx={{ width: "10vw", backgroundColor: "#FFFFFF", height: 55 }}
                                >
                                    <MenuItem value={1} sx={{ width: "10vw" }}>1</MenuItem>
                                    <MenuItem value={2} sx={{ width: "10vw" }}>2</MenuItem>
                                    <MenuItem value={3} sx={{ width: "10vw" }}>3</MenuItem>
                                    <MenuItem value={4} sx={{ width: "10vw" }}>4</MenuItem>
                                    <MenuItem value={5} sx={{ width: "10vw" }}>5</MenuItem>
                                    <MenuItem value={6} sx={{ width: "10vw" }}>6</MenuItem>
                                    <MenuItem value={7} sx={{ width: "10vw" }}>7</MenuItem>
                                    <MenuItem value={8} sx={{ width: "10vw" }}>8</MenuItem>
                                    <MenuItem value={9} sx={{ width: "10vw" }}>9</MenuItem>
                                    <MenuItem value={10} sx={{ width: "10vw" }}>10</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {/*<TextField label="Reply Count" id="reply" name="reply" value={reply} onChange={handleChange} sx={{ width: "10vw", backgroundColor: "#FFFFFF", height:50 }} fullWidth type="number" autoComplete="off" />*/}
                        <TextField label="Like Count" id="like" name="like" value={like} onChange={handleChange} sx={{ width: "10vw", backgroundColor: "#FFFFFF", height: 55 }} type="number" autoComplete="off" />
                        <TextField label="Comment Count" id="comment" name="comment" value={comment} onChange={handleChange} sx={{ width: "10vw", backgroundColor: "#FFFFFF", height: 55 }} type="number" autoComplete="off" />
                    </div>
                    <div style={{ color: "#26274b", fontSize: 17, display: "grid", gap: 15 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="checkbox" name="userLike" checked={postLike} onChange={e => setPostlike(!postLike)} /><span>Is post liked by viewer?
                        </span></div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="checkbox" name="userLike" checked={tagged} onChange={e => setTagged(!tagged)} /><span>Is someone tagged?
                        </span></div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="checkbox" name="userLike" checked={hasStory} onChange={e => setHasStory(!hasStory)} /><span>Has an Instagram story?
                        </span></div>

                    </div>
                </div>
            </div>
            <div style={{ display: "grid", gap: 30, marginTop: 20 }}>
                <div style={{}}>
                    <h3> Comments</h3>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <TextField label="First Comment Username" id="first-username" name="first-username" value={firstUser} onChange={(e) => setFirstuser(e.target.value)} sx={{ width: "25vw", backgroundColor: "#FFFFFF", height: 55 }} fullWidth autoComplete="off" />
                    <TextField label="First Comment Text" id="first-text" name="first-text" value={firstUserText} onChange={(e) => e.target.value.length <= 120 ? setFirstusertext(e.target.value) : setFirstusertext(e.target.value.substring(0, 120))} sx={{ width: "40vw", backgroundColor: "#FFFFFF", height: 55 }} fullWidth autoComplete="off" />

                </div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <TextField label="Second Comment Username" id="second-username" name="second-username" value={secondUser} onChange={(e) => setSeconduser(e.target.value)} sx={{ width: "25vw", backgroundColor: "#FFFFFF", height: 55 }} fullWidth autoComplete="off" />
                    <TextField label="Second Comment Text" id="second-text" name="second-text" value={secondUserText} onChange={(e) => e.target.value.length <= 120 ? setSecondusertext(e.target.value) : setSecondusertext(e.target.value.substring(0, 120))} sx={{ width: "40vw", backgroundColor: "#FFFFFF", height: 55 }} fullWidth autoComplete="off" />

                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" disableRipple sx={{ textTransform: "none" }} onClick={handleDebounce(downloadPost, 200)}><i className="fa fa-download" aria-hidden="true" style={{ fontSize: 10, marginRight: 8 }} />Export Instagram Post</Button>
                </div>
            </div>
        </div>
    </>);
}