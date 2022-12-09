////import { TextField, ColorPicker } from "@shopify/polaris";
////import React, { useCallback, useState, useEffect } from "react";
////import Button from '@mui/material/Button';
////import html2canvas from "html2canvas";


////const HSBToRGB = (h, s, b, a) => {

////    s /= 100;
////    b /= 100;
////    const k = (n) => (n + h / 60) % 6;
////    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
////    let temp = [255 * f(5), 255 * f(3), 255 * f(1)]
////    return "rgba(" + temp[0] + "," + temp[1] + "," + temp[2] + "," + a + ")";
////};

////export default function ColorQuote() {
////    const [img, setImg] = useState(null);
////    const [value, setValue] = useState("your quote");
////    const [textColor, setTextColor] = useState({
////        hue: 160,
////        brightness: 0.8,
////        saturation: 0.6
////    });
////    const [bcgColor, setBcgColor] = useState({
////        hue: 120,
////        brightness: 0.8,
////        saturation: 0.6
////    });
////    const handleChange = useCallback((newValue) => setValue(newValue), []);
////    useEffect(() => {
////        function toImg() {
////            html2canvas(document.getElementById("gg")).then(function (canvas) {
////                const dd = canvas.toDataURL("image/png");
////                setImg(dd);
////            });
////        }
////        toImg();
////    }, [value, textColor, bcgColor]);
////    const handleDebounce = (fn, delay) => {
////        let timer;
////        return function (...args) { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
////    }
////    const downloadQuote = () => {
////        var a = document.createElement("a"); 
////        a.href = img; 
////        a.download = "Quote.png"; 
////        a.click(); 
////    }
////    return (
////        <div className="App" style={{ paddingLeft: 20 }}>
////            <div>
////                <TextField
////                    label="Your quote"
////                    value={value}
////                    onChange={handleChange}
////                    autoComplete="off"
////                    placeholder="your quote"
////                    maxLength={100}
////                />
////            </div>
////            <div style={{ marginTop: 20, marginBottom: 20, display: "flex", justifyContent: "space-around" }}>
////                <ColorPicker onChange={setTextColor} color={textColor} />
////                <ColorPicker onChange={setBcgColor} color={bcgColor} />
////                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}> <Button variant="contained" disableRipple sx={{ textTransform: "none",height:40 }} onClick={handleDebounce(downloadQuote, 200)}><i className="fa fa-download" aria-hidden="true" style={{ fontSize: 10, marginRight: 8 }} />Export Quote</Button></div>

////            </div>
////            <div>
////                <div
////                    id="gg"
////                    className="center"
////                    style={{
////                        width: "1000px",
////                        height: "500px",
////                        backgroundColor: HSBToRGB(bcgColor.hue, bcgColor.saturation * 100, bcgColor.brightness * 100, bcgColor.alpha ? bcgColor.alpha : 0.0),
////                        textAlign: "center",
////                        color: HSBToRGB(textColor.hue, textColor.saturation * 100, textColor.brightness * 100, textColor.alpha ? textColor.alpha : 0.0),

////                        fontSize: 30,
////                        display: "",
////                        zIndex: 1000,
////                        position: "absolute",
////                        fontFamily: 'Lato Bold Italic'
////                    }}
////                >
////                    <p>{value} </p>
////                </div>

////                <img
////                    src={img}
////                    style={{
////                        width: "1000px",
////                        height: "500px",
////                        position: "relative",
////                        zIndex: 1100
////                    }}
////                    alt=""
////                />
////            </div>
////            <div style={{ marginTop: 20 }}>
////                <a href='https://github.com/rahul-vyavahare/heroku-test' >Click To Git hub repository</a></div>
////        </div>
////    );
////}