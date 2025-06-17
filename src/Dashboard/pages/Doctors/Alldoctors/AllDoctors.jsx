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
import AddDoctor from "../AddDoctors/AddDoctor";
import { RiDeleteBin2Line } from "react-icons/ri";
import "./AllDoctors.css"
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
    const [open, setopen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isupdate, setisupdate] = useState(false);
  const [loading, setloading] = useState(false)
    const [loadafter, setloadafter] = useState(false)
    const [dropdownClosing, setDropdownClosing] = useState(false);
   
    async function getDoctors() {
            setloading(true)
            try {
                const response = await axios.get(`https://carenest-serverside.vercel.app/doctor `, {
                    headers: {
                        "Authorization": `${gettoken}`
                    }
                });
                setloading(false)
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
                setloading(false)
                console.log("Error fetching babies:", error);
        
            }
        }
   // first get all the doctors
    useEffect(() => {
      
        if (gettoken) {
            getDoctors();
        }
        
    }, [gettoken , target , loadafter])


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
           setloading(true)
           try {
             const deleteRequests = idarr.map((id) =>
               axios.delete(`https://carenest-serverside.vercel.app/doctor/${id}`, {
                 headers: {
                   Authorization: `${gettoken}`
                 }
               })
             );
         
             const results = await Promise.all(deleteRequests);
               console.log("All deleted:", results.map(res => res.data));
             
               document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
                   checkbox.checked = false;
               });
               document.querySelectorAll("tr.active").forEach((row) => {
                   row.classList.remove("active");
                 });
                 
             setloading(false)
             setIsDeleting(false);
             setloadafter(true)
             getDoctors();
             setidarr([])
             
           
               
           } catch (error) {
               setloading(false)
             console.log("Error deleting items:", error);
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


           
        
        </tr>
    ));
    
      
 
    
    
    
    function handleDropdownToggle() {
        if (categroyactive) {
            setDropdownClosing(true);
            setTimeout(() => {
                setcategoryactive(false);
                setDropdownClosing(false);
            }, 400); // نفس مدة الأنيميشن في CSS
        } else {
            setcategoryactive(true);
        }
    }

    return (
        <div className="tips-bashboard alldoctorsdash">
                  {(open || isDeleting || isupdate) && (
    <div className="overlay"></div>
)}
            
            <div className="header">
                <h2> Doctors</h2>
                <div className="search">
                                <input type="text" placeholder="Search for doctor" value={searchvalue} onChange={(e)=> setsearchvalue(e.target.value)} />
                                <div className="searchicon"  >
                                <CiSearch className="icon" />
                                </div>
                            
            
                            </div>
       <div className="addtip">
                        <button className="newtip" onClick={()=> setopen(prev=> !prev)}>
 < TiPlus style={{fontWeight:"bold", fontSize:"17px"}} />
                       
<p>     add new Doctor </p>
                        </button>
                    </div>
         
            

               
            </div>
                   <div className="tips-header">
                               <div className="numbers-tips">
                <p>All Doctors <span>({allnum})</span></p> 
                    <p>Pediatrician<span> ({Pediatriciansnum})</span></p>
                    <p>Gynecologists <span>({Gynecologists})</span></p>

                    </div>
                    
                <div className="table-header">
                    <div style={{display:"flex " , gap :"10px"}}>
                   
                    
                    <div className="filters">
                        <div className="cat">

                        
                        
                        <button onClick={handleDropdownToggle}>
                                    { target ?target :"doctors's Specialty"}
                               <MdOutlineKeyboardArrowUp className={`${categroyactive ?'active':"" } arrow-list`} />
                            </button>
                            {(categroyactive || dropdownClosing) && (
  <div className={`cat-dropdown doc-cat ${categroyactive && !dropdownClosing ? "show" : "hide"}`}>
    <p onClick={() => {
      settarget("Gynecologists");
      handleDropdownToggle();
    }}> Gynecologists </p>

    <p onClick={() => { 
      settarget("Pediatricians");
      handleDropdownToggle();
    }}>Pediatricians</p>

    <p onClick={() => { 
      settarget("all");
      handleDropdownToggle();
    }}> All Doctors</p>
  </div>
)}

                       
                            </div>
                    
                    </div>
                    </div>
             
                  
                </div>

                </div>
             {/* Responsive Table Wrapper */}
             <div className="table-responsive">
                 <table className="styled-table">
                     <thead>
                         <tr className="doctorsdtr">
                             <th >
                                 {deleteicon && idarr.length ==!0 ? (
                                     <FaSquareMinus className="deleteicon" onClick={()=>setIsDeleting(true)}  />
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
                     ) : tisprow.length === 0 ? (
                         <tbody>
                             <tr>
                                 <td colSpan="10" style={{ textAlign: "center", padding: "40px", fontSize: "18px", color: "#777" }}>
                                     no doctors  In System
                                 </td>
                             </tr>
                         </tbody>
                     ) : (
                         <tbody>{tisprow}</tbody>
                     )}
                 </table>
             </div>
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
         {open && (
                <div className="createdocotor">
                    <AddDoctor onClose={() => setopen(false)}  />
                    </div>
            
            )}
              {
                            isDeleting &&
                            <div className="ConfirmDelete">
                            
                                    <div className="deletebox">
                                        {!loading ? (
                                           <div className="iconbox">
                              
                                           < RiDeleteBin2Line className="icon" />
                                                 
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
                                    delete
            
                                </button>
                            </div>
                        </div>
                        }

        </div>
    )
}
