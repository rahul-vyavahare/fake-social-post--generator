//import logo from './logo.svg';
import './App.css';
import ExcelJS from "exceljs";
import { useState } from "react";

function App() {
    const [header, setHeader] = useState([]);
    const [row, setRow] = useState([]);
    const [combo, setCombo] = useState([]);

    const handler = (e) => {
        e.preventDefault();
        // console.log("here", e);

        const wb = new ExcelJS.Workbook();
        wb.xlsx.load(e.target.files[0]).then((workbook) => {
            //console.log(workbook, "workbook instance");
            workbook.eachSheet((sheet, id) => {
                //console.log("sheet",sheet.getImages());

                let final = [];
                let head = null;
                sheet.eachRow((row, rowIndex) => {
                    if (rowIndex === 1) {
                        head = row.values;
                        setHeader(row.values);
                    } else {

                        let tt = {};
                        [...head].forEach((el, i) => {
                            // let trimmer = el.replace(/\s+/g, '');
                            let temp = el !== undefined ? { [el.split(" ").join("")]: row.values[i] } : { [el]: row.values[i] };

                            tt = { ...tt, ...temp };
                        });

                        final.push(tt);


                        setRow(prev => [...prev, row.values]);
                    }

                });
                // console.log(final);
                // setCombo(final);
                for (const image of sheet.getImages()) {
                    //console.log(
                    //    "processing image row",
                    //    image.range.tl.nativeRow,
                    //    "col",
                    //    image.range.tl.nativeCol,
                    //    "imageId",
                    //    image.imageId
                    //);
                    const img = workbook.model.media.find(
                        (m) => m.index === image.imageId
                    );
                    final[image.range.tl.nativeRow - 1].imgSrc = "data:image/" + img.extension + ";base64," + img.buffer.toString('base64');
                    // console.log(img);
                    // console.log(img.buffer.toString('base64'));
                }
                setCombo(final);
            });
        });

    };
    return (
        <div className="App">
            <h1>Read .xlsx file with image and show preview</h1>
            <input type="file" id="input" onChange={handler} />
            <div>
                <table>
                    <thead>
                        <tr>
                            {header.map(el => <th key={el}>{el}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {combo.map(el => <tr key={el.imgSrc}>

                            <td><img key={el.imgSrc} src={el.imgSrc} style={{ height: "200px", width: "200px" }} alt="f" /></td>
                            <td>{el.LaboratoryData}</td>
                            <td>{el.Expertrulebasedsystem}</td>
                            <td>{el.Statisticalbasedsystem}</td>
                            <td>{el.M7Classassessment}</td>
                            <td>{el.M7Classconfidence}</td>
                            <td>{el.Additionalsupportiveevidenceandcomments}</td>
                            <td>{el.Origin}</td>
                            <td>{el.TypicalLevel}</td>
                            <td>{el.Fate}</td>
                            <td>{el.DetectabilityandControl}</td></tr>)}
                    </tbody>

                </table>

                {/*{combo.map(el => <img key={el.imgSrc }src={el.imgSrc} style={{ height: "200px", width: "200px" }} alt="f"/>)}*/}
            </div>
        </div>
    );
}

export default App;
