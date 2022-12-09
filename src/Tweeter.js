import avatar from "./images/avatar.jpg";
import { useState,useEffect } from "react";
//import Box from '@/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import html2canvas from "html2canvas";
import * as fs from "file-saver";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    const [cdate, setCdate] = useState(new Date());
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
        let seconds = Math.round(difference / 1000)+1;
        let resultInMinutes = Math.round(difference / 60000);
        resultInMinutes<1? setRtime(seconds+"s"):setRtime(resultInMinutes+"m");
    }, [name, username, text, reply, retweet, like, profile]);
    const handleChange = (e)  => {
        const { name, value } = e.target;
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
        //e.preventDefault();
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
                setRtime(`${resulth}h`);
            }
            else {
                let resultm = Math.abs(tp.getMinutes() - logdate.getMinutes());
                let results = Math.abs(tp.getSeconds() - logdate.getSeconds());
                resultm ? setRtime(`${results}s`):setRtime(`${resultm}m`);
            }
           
        }
        console.log(tp.getDate() === logdate.getDate());
        setCdate(e);
    }
    const handleTweetImages = async(e) => {
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
        return function(...args) { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
    }
    
    return (<>
        <div style={{ width: '', height: "", display: "grid", alignItems: "center", justifyContent:"center" }}><h1 style={{}}><i className="fa fa-twitter-square" aria-hidden="true" style={{ marginRight: "10px" }} />Tweet Generator</h1>
            <div className="tweet-container" style={{}}>
                <div className="tweet-overflow-div"style={{}}>
                <div id="tweet-inner"style={{width:600 }}>
                    <div style={{ display: "flex", padding: 10, width: "100%" }}>
                        <div style={{}}>
                            <div style={{}}>
                                <img src={profile ? profile :avatar} alt="f" style={{ width: 48, height: 48, borderRadius: "50%" }} />
                            </div>
                        </div>
                        <div style={{ display: "grid", paddingLeft: 10, width: "100%" }}>
                            <div style={{ display: "flex", justifyContent: "", width: "95%", alignItems: "center" }}>

                                <div style={{ display: "flex", maxWidth: "95%", width: "530px" }}>
                                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", display: "", alignItems: "center", gap: 3, whiteSpace: "nowrap", color: "#0f1419", fontWeight: 700, width: "auto",maxWidth:"45%" }}>{name}
                                        
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>{verify ? <svg width="18.75" height="18.75" viewBox="0 0 24 24" aria-label="Verified account" fill="#1da1f2"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg> : null}</div>
                                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#5b7083", width: "auto", maxWidth:"35%"}}>&nbsp;@{username}
                                    </div>
                                    <div style={{ color: "#5b7083", width: "2%", textAlign:"center" }}>&middot;
                                    </div>
                                    <div style={{ color: "#5b7083", width: "28%" }}>{ rtime}
                                    </div>
                                </div>
                                <div style={{ width: "5%" }}>
                                    <i className="fa fa-ellipsis-h" aria-hidden="true" style={{ position: "relative", float: "right" }} />                                </div>
                            </div>
                            <div style={{ width: "90%", overflowWrap: "anywhere", color: "#0f1419" }} dangerouslySetInnerHTML={{ __html: autoText }}>
                                
                            </div>
                            <div style={img && img.length > 1 ? { width: 504, height: 286, backgroundColor: "", marginTop: 10 } : {}}>
                                {img && img.length === 1 ? <div key= "imgdiv1" style={{ width: "95%", height: "100%", gap: 2,display:"flex" }}><img src={img[0]} alt="f" style={{ width: "100%", height: "100%", borderRadius: 20}}/></div>:null}
                                    {img && img.length === 2 ? <div key="imgdiv2" style={{ width: "100%", height: "100%", gap: 2, display: "flex" }}><img src={img[0]} key="img1" alt="f" style={{ width: "50%", height: "100%", objectFit: "cover", borderRadius: "20px 0px 0px 20px" }} /> <img src={img[1]} key="img2" alt="f" style={{ width: "50%", height: "100%", objectFit: "cover", borderRadius: "0px 20px 20px 0px" }} /></div> : null}
                                    {img && img.length === 3 ? <div key="imgdiv3" style={{ width: "100%", height: "100%", gap: 2, display: "flex" }}><img src={img[0]} key="img1" alt="f" style={{ width: "50%", height: "100%", objectFit: "cover", borderRadius: "20px 0px 0px 20px" }} /> <div key="imgdiv32" style={{ width: "50%", height: "100%", display: "block", gap: 2 }}><img src={img[1]} key="img2" alt="f" style={{ width: "100%", height: "50%", objectFit: "cover", borderRadius: "0px 20px 0px 0px" }} /><img src={img[2]} key="img3" alt="f" style={{ width: "100%", height: "50%", objectFit: "cover", borderRadius: "0px 0px 20px 0px" }} /></div></div> : null}
                                    {img && img.length === 4 ? <div key="imgdiv4" style={{ width: "100%", height: "100%", gap: 2, display: "" }}>
                                    <img src={img[0]} key="0" alt="f" style={{ width: "49%", height: "50%", objectFit: "cover", borderRadius: "20px 0px 0px 0px", marginRight: "1px", marginBottom:"1px" }} />
                                    <img src={img[2]} key="1"alt="f" style={{ width: "49%", height: "50%", objectFit: "cover", borderRadius: "0px 20px 0px 0px", marginLeft: "1px", marginBottom: "1px" }} />
                                    <img src={img[2]} key="2" alt="f" style={{ width: "49%", height: "50%", objectFit: "cover", borderRadius: "0px 0px 0px 20px", marginRight: "1px", marginTop: "1px" }} />
                                    <img src={img[3]} key="3"alt="f" style={{ width: "49%", height: "50%", objectFit: "cover", borderRadius: "0px 0px 20px 0px", marginLeft: "1px", marginTop: "1px" }} />                                </div> : null}

</div>
                            <div style={{ display: "flex", width: "90%", gap: "20px", color: "#5b7083", marginTop: "12px",height:18 }}>
                                <div style={{ color: "#5b7083", display: "flex", justifyContent: "", alignItems: "center", gap: "", width: "20%" }}>
                                    <svg width="18.75" height="18.75" viewBox="0 0 24 24" fill="#5b7083"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>{treply ? <span style={{ marginLeft: 8, fontSize:13 }}>{treply}</span> : null}
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
            </div>


            <div style={{ width: "100%" }}>
                <div className="tweet-input-image-container" style={{ }}>
                    <div className="input-image-div-1" style={{}}>
                        <div className="tweet-click-div-1" style={{  minWidth:145, cursor: profile ? "not-allowed" : "pointer" }}>
                            <label style={{ fontSize: 12, color: "#5b7083", cursor: profile ? "not-allowed" : "pointer", pointerEvents: profile ? "none" : "" }}>Avatar</label>
                            <div style={{ marginTop: 3 }} onClick={handleDebounce(handleUploadClick,200)} style={{  cursor: profile ? "not-allowed" : "pointer" }} id="profile"><i className="fa fa-folder-open-o" aria-hidden="true" style={{ marginRight: 10, fontWeight: 400 }} />
                                Click to upload</div>
                        </div>
                        <div style={{ display: "block", zIndex: 100, minWidth: 50 }}>{profile ? <><img src={profile} alt="f" style={{ width: 32, height: 32, borderRadius: 8, objectFit: "cover", zIndex: 100, position: "absolute", marginTop: 10 }} /> <i className="fa fa-times" aria-hidden="true" style={{ borderRadius: "50%", backgroundColor: "#DDDDDD", fontSize: 13, color: "black", zIndex: 110, right: "-32px", position: "relative" }} onClick={() => setProfile(null)} /></> : null}</div>
                        <input type="file" accept="image/*" id="profileI" style={{ display: "none" }}  onChange={ handleAvatarUpload}/>
                    </div>
                    <div className="input-image-div-2" style={{ }}>
                        <div className="tweet-click-div-2" style={{   cursor: img.length===4 ? "not-allowed" : "pointer" }}>

                            <label style={{ fontSize: 12, color: "#5b7083", cursor: img.length === 4 ? "not-allowed" : "pointer" }}>Tweet Images (Up to 4)</label>
                            <div style={{ marginTop: 3 }} onClick={handleDebounce(handleUploadClick,200)} id="tweetImages"><i className="fa fa-folder-open-o" aria-hidden="true" style={{ marginRight: 10, fontWeight: 400 }} />Click to upload
                            </div></div>
                        <div className="tweet-imagelist" style={{ display: "flex", zIndex: 100, gap: 45, justifyContent: "end", transition:"0.2s" }}>
                            {img.length > 0 ? img.map((item, idx) => <div><img src={item} alt="f" key={idx} style={{ width: 32, height: 32, borderRadius: 8, objectFit: "cover", zIndex: 100, position: "absolute", marginTop: 10 }} /> <i className="fa fa-times" aria-hidden="true" style={{ borderRadius: "50%", backgroundColor: "#DDDDDD", fontSize: 13, color: "black", zIndex: 110, right: "-32px", position: "relative" }} onClick={() => handleImageRemove(idx)} /></div>) : null}
                        </div>
                        <input type="file" accept="image/*" id="tweetImageI" name="tweetImageI" style={{ display: "none" }} onChange={handleTweetImages} multiple />                        </div>

                </div>
                <div className="tweet-name-container" style={{}}>
                    <div className="tweet-name-div"><TextField label="Name" id="name" name="name" value={name} onChange={(e) => { e.preventDefault(); setName(e.target.value) }} sx={{ width: "inherit", backgroundColor: "#FFFFFF", minWidth:200 }} fullWidth autoComplete="off" /></div>
                    <div className="tweet-name-div"><TextField label="Username" id="username" name="username" value={username} onChange={(e) => { e.preventDefault(); setUsername(e.target.value) }} sx={{ width: "inherit", backgroundColor: "#FFFFFF", minWidth: 200 }} fullWidth autoComplete="off"
                        InputProps={{
                            endAdornment: <button className="verify-btn" style={{ backgroundColor: verify ? "#1da1f2" : "#ffffff", fontSize:15,color: verify ? "white":"black" }} onClick={() => setVerify(!verify)}> Verified</button>
                        }}
                    /></div>
                    <div className="tweet-name-div">{/*<TextField label="Tweet Date" id="tweet-date" name="date" sx={{ width: "inherit", backgroundColor: "#FFFFFF", minWidth: 200}} fullWidth type="datetime-local" value={cdate} InputLabelProps={{
                        shrink: true,
                    }} autoComplete="off" onChange={handleDate} />*/}
                        <DatePicker
                            customInput={
                                <TextField label="Tweet Date" id="tweet-date" name="date" sx={{ width: "inherit", backgroundColor: "#FFFFFF", minWidth: 200 }} fullWidth type="text" value={cdate} InputLabelProps={{
                                    shrink: true,
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
                            maxDate={new Date() }
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                    </div>
                </div>
                <div className="tweet-text-div" style={{ }}><TextField
                    id="tweet-text"
                    label="Tweet text"
                    type="text"
                    multiline
                    rows={4} spellCheck={false}
                    name="text" 
                    fullWidth value={text} onChange={e => e.target.value.length <= 280 ? setText(e.target.value) : setText(e.target.value.substring(0,280))}
                    sx={{ width: "inherit", backgroundColor: "#FFFFFF" }} autoComplete="off" InputProps={{
                        endAdornment: <InputAdornment position="end">{text.length}/280</InputAdornment>
 }}
                /></div>
                <div className="tweet-count-container" style={{}} >
                    <div className="tweet-count-div"><TextField label="Reply Count" id="reply" name="reply" value={reply} onChange={handleChange} sx={{ width: "inherit", backgroundColor: "#FFFFFF", minWidth: 200 }} fullWidth type="number" autoComplete="off" /></div>
                    <div className="tweet-count-div"><TextField label="Retweet Count" id="retweet" name="retweet" value={retweet} onChange={handleChange} sx={{ width: "inherit", backgroundColor: "#FFFFFF", minWidth: 200 }} fullWidth type="number" autoComplete="off" /></div>
                    <div className="tweet-count-div"><TextField label="Like Count" id="tweet-like" name="like" value={like} onChange={handleChange} sx={{ width: "inherit", backgroundColor: "#FFFFFF", minWidth: 200 }} fullWidth type="number" autoComplete="off" /></div>
                </div>
                <div style={{ marginTop: 20, display: "flex", justifyContent: "center", marginBottom: 50 }}><Button variant="contained" disableRipple sx={{ textTransform: "none" }} onClick={handleDebounce(downloadTweet,200)}><i className="fa fa-download" aria-hidden="true" style={{ fontSize: 10, marginRight: 8 }} />Export Tweet</Button></div>
            </div>

        </div>
    </>
    );
}
