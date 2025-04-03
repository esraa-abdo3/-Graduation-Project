import axios from "axios";
import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

import { TiPlus } from "react-icons/ti";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSquareMinus } from "react-icons/fa6";
import doctorimg from "../../../../assets/doctorprofile.jpeg"
export default function AllDoctors() {
    const [Doctors, setDoctors] = useState([]);
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [categroyactive, setcategoryactive] = useState(false);
    const [target, settarget] = useState("");
    const [sortOrder, setSortOrder] = useState(null);
    const [sortedmonths, setsortmonths] = useState(null);
    const [searchvalue, setsearchvalue] = useState("");
    const [originalDoctors, setOriginalDoctors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const tipsPerPage = 6
    const nav = useNavigate();
    const [deleteicon, setdeleteicon] = useState(false);
    const [idarr, setidarr] = useState([])
    const[allnum,setallnum]=useState("")
    const [Pediatriciansnum, setPediatriciansnum] = useState("");
    const [Gynecologists, setGynecologistsnum] = useState("");
    console.log(idarr)
   // first get all the doctors
    useEffect(() => {
        async function getDoctors() {
            try {
                const response = await axios.get(`https://carenest-serverside.vercel.app/doctor `, {
                    headers: {
                        "Authorization": `${gettoken}`
                    }
                });
                setallnum(response.data.data.length)
                setPediatriciansnum(response.data.data.filter((e) => e.Specialty === "Pediatricians").length)
                setGynecologistsnum(response.data.data.filter((e) => e.Specialty === "Gynecologists").length)
                if (target == "all") {
                    
              
                    setDoctors(response.data.data)
                    setOriginalDoctors(response.data.data)
                }
                else if (target === "Pediatricians") {
                    setDoctors(response.data.data.filter((e) => e.Specialty === "Pediatricians"));

                    setOriginalDoctors(response.data.data.filter((e)=>e.Specialty==="Pediatricians"))
                    
                }
                else if (target === "Gynecologists") {
                    setDoctors(response.data.data.filter((e) => e.Specialty === "Gynecologists"));

                    setOriginalDoctors(response.data.data.filter((e)=>e.Specialty==="Gynecologists"))
                    
                }
                else {
                    setDoctors(response.data.data)
                    setOriginalDoctors(response.data.data)
                    
                }
                console.log(response.data.data)
             
 
            } catch (error) {
                console.log("Error fetching babies:", error);
        
            }
        }
        if (gettoken) {
            getDoctors();
        }
        
    }, [gettoken , target])

    const handleSort = () => {
        if (sortOrder === "asc") {
            
            const sorted = [...Doctors].sort((a, b) => new Date(b.ratingsQuantity) - new Date(a.ratingsQuantity));
            setDoctors(sorted);
            setSortOrder("desc");
        } else {
            
            const sorted = [...Doctors].sort((a, b) => new Date(a.ratingsQuantity) - new Date(b.ratingsQuantity));
            setDoctors(sorted);
            setSortOrder("asc");
        }
    };
    const handlesort = () => {
        if (sortedmonths === "asc") {
            
            const sorted = [...Doctors].sort((a, b) => new Date(b.bookingPrice) - new Date(a.bookingPrice));
            setDoctors(sorted);
            setsortmonths("desc");
        } else {
            
            const sorted = [...Doctors].sort((a, b) => new Date(a.bookingPrice) - new Date(b.bookingPrice));
            setDoctors(sorted);
            setsortmonths("asc");
        }
    };
    function capitalizeWords(str) {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }
    // search
   
    useEffect(() => {
        if (searchvalue.trim() !== "") {
            const searcheddata = originalDoctors.filter((e) =>
                capitalizeWords(e.user.firstName).includes(capitalizeWords(searchvalue.trim()))
            );
            setDoctors(searcheddata);
        } else {
            setDoctors(originalDoctors);
        }
    }, [searchvalue, originalDoctors, idarr]);


    function handleCheckbox(e, id) {
        if (!e || !e.target) return;
      
        const row = e.target.closest("tr");
        if (row) {
          row.classList.toggle("active");
        }
      
        setidarr((prevIdArr) => {
          const updatedIds = prevIdArr.includes(id)
            ? prevIdArr.filter((item) => item !== id) 
            : [...prevIdArr, id]; 
      
          console.log("✅ Updated Selected IDs:", updatedIds); // ✅ هنا هيطبع القيمة الجديدة فورًا
          return updatedIds;
        });
      
        const anyChecked = document.querySelectorAll('input[type="checkbox"]:checked').length > 0;
        setdeleteicon(anyChecked);
      }
      
      async function handledelete() {
        console.log("🚀 Current IDs in state:", idarr); 
    
        if (!idarr || idarr.length === 0) {
            console.log("❌ No IDs selected for deletion.");
            return;
        }
    
        // 🔥 تحويل كل ID إلى رقم إذا كان رقميًا
        const formattedIds = idarr.map(id => isNaN(id) ? id : Number(id));
    
        console.log("🚀 Deleting IDs (Formatted):", formattedIds);
    
        try {
            const deleteRequests = formattedIds.map((id) =>
                axios.delete(`https://carenest-serverside.vercel.app/doctor/${id}`, {
                    headers: {
                        Authorization: `${gettoken}`
                    }
                })
            );
    
            const results = await Promise.all(deleteRequests);
            console.log("✅ All deleted:", results.map(res => res.data));
    
            setidarr([]); // 🧹 مسح القائمة بعد الحذف
    
            document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
                checkbox.checked = false;
            });
    
        } catch (error) {
            console.log("❌ Error deleting items:", error);
        }
    }
    
    
    
    const totalPages = Math.ceil(Doctors.length / tipsPerPage);
    const indexOfLastTip = currentPage * tipsPerPage;
    const indexOfFirstTip = indexOfLastTip - tipsPerPage;
    const currentTips = Doctors.slice(indexOfFirstTip, indexOfLastTip);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const tisprow = currentTips.map((doc, index) => (
        <tr key={index} >
          <td>
                <input type="checkbox" onClick={(e)=>handleCheckbox( e ,doc._id)} />
    </td>
          <td className="title">
            <img src={doc.image !==null ? doc.image :doctorimg} alt={doc.target} className="tip-img" />
           <p> <NavLink to={`/Dashboard/AllDoctors/${doc._id}`} style={{ color: "black" }}>
  <span>{doc?.user?.firstName || "bbbbb"}</span> {doc?.user?.lastName || "bbbb"}
                </NavLink>
                </p>

            </td>
            <td>{doc.Specialty}</td>
            <td>{doc.masterOf ? doc.masterOf:"N/A"}</td>
            <td>{doc.Location.mainPlace}</td>
            <td>{doc.phones?.length >= 2 ? doc.phones[0] + "..." : doc.phones?.[0] || "N/A"}</td>

            <td>{doc.bookingPrice ? doc.bookingPrice.toString().trim() : "N/A"}</td>


            <td>{doc.ratingsQuantity}</td>
        
        </tr>
    ));
    
      
 
    
    
    
    return (
        <div className="tips-bashboard">
            <div className="tips-header">
                <h2>CareNest Doctors</h2>
                <div className="numbers-tips">
                <p>All Doctors <span>({allnum})</span></p> 
                    <p>Pediatrician<span> ({Pediatriciansnum})</span></p>
                    <p>Gynecologists <span>({Gynecologists})</span></p>

                </div>
                <div className="table-header">
                    <div style={{display:"flex " , gap :"10px"}}>
                        <form>
                            <div style={{position:"relative" , display:"flex", alignItems:"center"}}>
                                <CiSearch style={{
                                    position: "absolute",
                                    left:"4%"

                                }} />
                            
                                <input type="search" placeholder="Search" value={searchvalue} onChange={(e) => { setsearchvalue(e.target.value);}}></input>
                                </div>
                    </form>
                    
                    <div className="filters">
                        <div className="cat">

                        
                        
                        <button>
                                    { target ?target :"doctors's Specialty"}
                               <MdOutlineKeyboardArrowUp   className={`${categroyactive?'active':"" } arrow-list`}onClick={()=>setcategoryactive(prev=>!prev)}/>
                            </button>
                            {categroyactive && (
  <div className={`cat-dropdown doc-cat ${categroyactive ? "show" : "hide"}`}>
    <p onClick={() => {
      settarget("Gynecologists");
      setcategoryactive(prev => !prev);
    }}> Gynecologists </p>

    <p onClick={() => { 
      settarget("Pediatricians");
      setcategoryactive(prev => !prev);
    }}>Pediatricians</p>

    <p onClick={() => { 
      settarget("all");
      setcategoryactive(prev => !prev);
    }}> All Doctors</p>
  </div>
)}

                       
                            </div>
                    
                    </div>
                    </div>
             
                    <div className="addtip">
                        <button className="newtip" onClick={()=>nav("/Dashboard/AddDoctor")}>
 < TiPlus style={{fontWeight:"bold", fontSize:"17px"}} />
                       
<p>     add new Doctor </p>
                        </button>
                    </div>
                </div>
               
            </div>
             <table className="styled-table">
             <thead>
                    <tr>
                    <th >
  {deleteicon ? (
    <FaSquareMinus className="deleteicon" onClick={()=>handledelete()}  />
  ) : (
    <span style={{ width: "15px" , height:"23px", display:"inline-block"}}></span>
  )}
</th>
                <th>Doctor' Name</th>
                 <th>Specialty</th>    
                     
              <th  style={{ cursor: "pointer" }}>
              MasterOf
             
                        </th>
                        <th> mainPlace</th>
                        <th>phones</th>
                        <th onClick={handlesort}>booking price <span style={{ paddingLeft: "5px" }}>
                 {sortedmonths === "asc" ? <FaSortAmountUpAlt /> : <FaSortAmountDownAlt />}
                            </span></th>
                        <th onClick={handleSort}> rating  <span style={{ paddingLeft: "5px" }}>
                {sortOrder === "asc" ? <FaSortAmountUpAlt /> : <FaSortAmountDownAlt />}
                            </span></th>
                        </tr>
                       </thead>

                {tisprow}
                <tbody>
                    
                </tbody>
            </table>
            {totalPages > 1 && (
    <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
            <button 
                key={index} 
                onClick={() => paginate(index + 1)} 
                className={currentPage === index + 1 ? "active" : ""}
            >
                {index + 1}
            </button>
        ))}
    </div>
)}


        </div>
    )
}
