import { useEffect, useState } from "react"
import "./Promocodes.css"
import axios from "axios";
import Cookies from "universal-cookie";
import { FaSortAlphaUpAlt } from "react-icons/fa";
import { number } from "prop-types";
import { useNavigate } from "react-router-dom";
import Addpromocode from "../AddPromocod/Addpromocode";
export default function Promocodes() {
    const nav = useNavigate();
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [promocodes, setpromocodes] = useState([]);
    const [cuurentpage, setcurrentpage] = useState(1)
    const Numofcodes = 3;
    const totalPages = Math.ceil(promocodes.length / Numofcodes);
    console.log(totalPages)
    const indexOfLastTip = cuurentpage * Numofcodes;
    const indexOfFirstTip = indexOfLastTip - Numofcodes;
    const currentcodes = promocodes.slice(indexOfFirstTip, indexOfLastTip);
    const paginate = (pageNumber) => setcurrentpage(pageNumber);
    const [add, setadd] = useState(false)
    console.log(add)
    async function getpromocodes() {
        try {
            let res = await axios.get(`https://carenest-serverside.vercel.app/dashboard/promocodes`, {
                headers: {
                    Authorization: `${gettoken}`
                }
            })
            console.log(res.data.data)
            setpromocodes(res.data.data)
            
        }
        catch (error) {
            console.log(error)
            
        }
        
    }
    useEffect(() => {
        getpromocodes();
    
    }, [gettoken]);

    const codesrows = currentcodes.map((e, index) => { 
        return (
            <tr key={index}>
                <td>{e.code}</td>
                <td>{e.startDate}</td>
                <td>{e.endDate}</td>
                
                <td>{e.doctorName}</td>
                <td>{e.discount}</td>
       
        
                <td>{ e.usageCount}</td>
                
        </tr>
    )
})
    return (
        <div className="Promocodes">
            <div className="header">
                <h2>Promocode List</h2>
               <button  onClick={()=>setadd(true)}> add new promocode</button>
            </div>
            <div style={{padding:"0px 30px 0px 20px"}}>

      
            <table className="showcodes styled-table">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Discount amount</th>
                        <th>Doctors</th>
                        <th> times used
                            <FaSortAlphaUpAlt/>
                        </th>   
                    </tr>
                </thead>
                <tbody>
                    {codesrows }
                </tbody>

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
            {add && (
                <Addpromocode close={add} />
            )}
        
        </div>
    )
}