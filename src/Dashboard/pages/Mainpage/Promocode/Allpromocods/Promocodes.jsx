import { useEffect, useState } from "react";
import "./Promocodes.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { FaSortAlphaUpAlt } from "react-icons/fa";
import { FaSquareMinus } from "react-icons/fa6";
import Addpromocode from "../AddPromocod/Addpromocode";
import Updatepromocode from "../UpdatePromocode/Updatepromocode";

export default function Promocodes() {
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [promocodes, setpromocodes] = useState([]);
    const [cuurentpage, setcurrentpage] = useState(1);
    const Numofcodes = 3;
    const totalPages = Math.ceil(promocodes.length / Numofcodes);
    const indexOfLastTip = cuurentpage * Numofcodes;
    const indexOfFirstTip = indexOfLastTip - Numofcodes;
    const currentcodes = promocodes.slice(indexOfFirstTip, indexOfLastTip);
    const paginate = (pageNumber) => setcurrentpage(pageNumber);
    const [add, setadd] = useState(false);
    const [deleteicon, setdeleteicon] = useState(false);
    const [idarr, setidarr] = useState([]);
    const [codeid, setcodeid] = useState("");
    const[isupdate,setisupdate]=useState(false)
 
    async function getpromocodes() {
        try {
            let res = await axios.get(`https://carenest-serverside.vercel.app/dashboard/promocodes`, {
                headers: {
                    Authorization: `${gettoken}`,
                },
            });
            setpromocodes(res.data.data);
            console.log(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getpromocodes();
    }, [gettoken]);

    function handleCheckbox(e, id) {
        if (!e || !e.target) return;

        const row = e.target.closest("tr");
        if (row) {
            row.classList.toggle("active");
        }

        const anyChecked = document.querySelectorAll('input[type="checkbox"]:checked').length > 0;

        setidarr((prevIdArr) => {
            if (prevIdArr.includes(id)) {
                return prevIdArr.filter((item) => item !== id);
            } else {
                return [...prevIdArr, id];
            }
        });

        setdeleteicon(anyChecked); // تحديث حالة الأيقونة بناءً على وجود عناصر محددة
    }

    async function handledelete() {
        try {
            const deleteRequests = idarr.map((id) =>
                axios.delete(`https://carenest-serverside.vercel.app/tips/${id}`, {
                    headers: {
                        Authorization: `${gettoken}`,
                    },
                })
            );

            const results = await Promise.all(deleteRequests);
            console.log("All deleted:", results.map((res) => res.data));
            setidarr([]);
            document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
                checkbox.checked = false;
            });
        } catch (error) {
            console.log("Error deleting items:", error);
        }
    }

    const codesrows = currentcodes.map((e, index) => {
        return (
            <tr key={index} onClick={() => {
                setcodeid(e.doctorId); 
                setisupdate(true)
            }}>
          <td>
                    <input type="checkbox" onClick={(e) => handleCheckbox(e, e._id)} />
                   
    </td>
                <td>{e.code}</td>
                <td>{e.startDate}</td>
                <td>{e.endDate}</td>
                <td>{e.doctorName}</td>
                <td>{e.discount}</td>
                <td>{e.usageCount}</td>
            </tr>
        );
    });

    return (
        <div className="Promocodes">
            <div className="header">
                <h2>Promocode List</h2>
                <button onClick={() => setadd(true)}>Add new promocode</button>
            </div>
            <div style={{ padding: "0px 30px 0px 20px" }}>
                <table className="showcodes styled-table">
                    <thead>
                        <tr>
                            <th>
                                {deleteicon ? (
                                    <FaSquareMinus className="deleteicon" onClick={handledelete} />
                                ) : (
                                    <span style={{ width: "15px", height: "23px", display: "inline-block" }}></span>
                                )}
                            </th>
                            <th>Code</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Discount amount</th>
                            <th>Doctors</th>
                            <th>
                                Times used
                                <FaSortAlphaUpAlt />
                            </th>
                        </tr>
                    </thead>
                    <tbody>{codesrows}</tbody>
                </table>
                {totalPages > 1 && (
                    <div className="pagination">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={cuurentpage === index + 1 ? "active" : ""}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {add && <Addpromocode onClose={() => setadd(false)}  />}
            {isupdate && 
                <Updatepromocode onClose={() => setisupdate(false)} codeid={ codeid} />
            }
        </div>
    );
}
