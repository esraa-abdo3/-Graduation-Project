import { useEffect, useState } from "react";
import "./Promocodes.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { FaSortAlphaUpAlt } from "react-icons/fa";
import { FaSquareMinus } from "react-icons/fa6";
import Addpromocode from "../AddPromocod/Addpromocode";
import Updatepromocode from "../UpdatePromocode/Updatepromocode";

import { RiDeleteBack2Fill } from "react-icons/ri";

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
    const [isupdate, setisupdate] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loading, setloading] = useState(false);
  const [deleteload, setdeleteload] = useState(false);

 
    async function getpromocodes() {
        setloading(true);
        try {
            let res = await axios.get(`https://carenest-serverside.vercel.app/dashboard/promocodes`, {
                headers: {
                    Authorization: `${gettoken}`,
                },
            });
            console.log(res)
            setpromocodes(res.data.data);
            setloading(false)
        } catch (error) {
            console.log(error);
            setloading(false)
        }
    }

    useEffect(() => {
        getpromocodes();
    }, [gettoken ]);

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
        console.log(idarr)
        setdeleteload(true)
        try {
            const deleteRequests = idarr.map((id) =>
                axios.delete(`https://carenest-serverside.vercel.app/doctor/${id}/promocode`, {
                    headers: {
                        Authorization: `${gettoken}`,
                    },
                })
            );
            setdeleteload(false)
            const results = await Promise.all(deleteRequests);
            console.log("All deleted:", results.map((res) => res.data));
            setidarr([]);
            // Remove active class from all rows
            document.querySelectorAll('tr.active').forEach(row => {
                row.classList.remove('active');
            });
            document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
                checkbox.checked = false;
            });
            setIsDeleting(false)
            getpromocodes();
        } catch (error) {
            console.log("Error deleting items:", error);
            setdeleteload(false)
        }
    }

    const codesrows = currentcodes.map((e, index) => {
        return (
            <tr key={index} onClick={() => {
               setcodeid(e.doctorId); 
                setisupdate(true)
            }}>
          <td>
                    <input type="checkbox" onClick={(event) => {
                         event.stopPropagation(); 
                          handleCheckbox(event, e.doctorId);
   
  
  }} />
                   
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
                  {( isDeleting || isupdate) && (
    <div className="overlay"></div>
)}
            <div className="header">
                <h2>Promocode List</h2>
                <button onClick={() => setadd(true)}>Add new promocode</button>
            </div>
            <div style={{ padding: "0px 30px 0px 20px" }}>
                <table className="showcodes styled-table">
                    <thead>
                        <tr>
                            <th>
                                {deleteicon  && idarr.length ==!0?  (
                                    <FaSquareMinus className="deleteicon" onClick={()=>setIsDeleting(true)} />
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
                                       {loading ? (
  <tbody>
    {[...Array(6)].map((_, i) => (
      <tr key={i}>
        <td colSpan="10">
          <div className="tr-loader"></div>
        </td>
      </tr>
    ))}
  </tbody>
) : codesrows.length === 0 ? (
  <tbody>
    <tr>
      <td colSpan="10" style={{ textAlign: "center", padding: "40px", fontSize: "18px", color: "#777" }}>
  nN Babies Added Yet In System
      </td>
    </tr>
  </tbody>
) : (
  <tbody>{codesrows}</tbody>
)}

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
            {add &&
                <div >
                   
                    <Addpromocode onClose={() => setadd(false)} getpromocodes={getpromocodes} />
                       </div>
                        }
              
            {isupdate && 
                <Updatepromocode onClose={() => setisupdate(false)} codeid={ codeid} getpromocodes={getpromocodes} />
            }
              {
                            isDeleting &&
                            <div className="ConfirmDelete">
                            
                                    <div className="deletebox">
                                        {!loading ? (
                                           <div className="iconbox">
                              
                                           < RiDeleteBack2Fill className="icon" />
                                                 
                                       </div>
                                        ) :
                                            (
                                                <>
                                                
            <button className="bin-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 39 7"
                className="bin-top"
              >
                <line strokeWidth="4" stroke="white" y2="5" x2="39" y1="5"></line>
                <line
                  strokeWidth="3"
                  stroke="white"
                  y2="1.5"
                  x2="26.0357"
                  y1="1.5"
                  x1="12"
                ></line>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 33 39"
                className="bin-bottom"
              >
                <mask fill="white" id="path-1-inside-1_8_19">
                  <path
                    d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                  ></path>
                </mask>
                <path
                  mask="url(#path-1-inside-1_8_19)"
                  fill="white"
                  d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                ></path>
                <path strokeWidth="4" stroke="white" d="M12 6L12 29"></path>
                <path strokeWidth="4" stroke="white" d="M21 6V29"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 89 80"
                className="garbage"
              >
                <path
                  fill="white"
                  d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                ></path>
              </svg>
            </button>
            
                                                </>
                                        )}
                             
                                <p>Delete</p>
                            </div>
                            <p className="p"> are you sure you want to delete </p>
                            <div className="buttons">
                                <button className="cancel" onClick={()=> setIsDeleting(false)}>
                                    cancel
            
                                </button>
                           
                              <button className="delete" onClick={handledelete}>
  {deleteload ? (
    <div className="spinner-small"></div> 
  ) : (
    "Delete"
  )}
</button>
                            </div>
                        </div>
                        }
        </div>
    );
}
