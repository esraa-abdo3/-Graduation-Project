import axios from "axios";
import "../Tips/AllTips.css"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import "../../ComonetsDashboard/SideBar/Sidebar.css"
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaSquareMinus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddTip from "./AddTip/AddTip";
import UpdateTip from "./UpdateTip/UpdateTip";
export default function CarenestTips() {
    const [Tips, setTips] = useState([]);
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [categroyactive, setcategoryactive] = useState(false);
    const [dropdownClosing, setDropdownClosing] = useState(false);
    const [monthsactive, setmonthactive] = useState("");
    const [monthsDropdownActive, setMonthsDropdownActive] = useState(false);
    const [monthsDropdownClosing, setMonthsDropdownClosing] = useState(false);
    const [target, settarget] = useState("");
    const [sortOrder, setSortOrder] = useState(null);
    const [sortedmonths, setsortmonths] = useState(null);
    const [searchvalue, setsearchvalue] = useState("");
    const [originalTips, setOriginalTips] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const tipsPerPage = 6
    const [deleteicon, setdeleteicon] = useState(false);
    const [idarr, setidarr] = useState([])
    const [open, setopen] = useState(false);
    const [loading, setloading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
  const [loadafter, setloadafter] = useState(false);
  const [isupdate, setisupdate] = useState(false);
  const [tipid, settipid] = useState("")
 

   async function gettips() {
            setloading(true)
            try {
                const response = await axios.get(`https://carenest-serverside.vercel.app/tips/?${target === "Mama" ? "target=Mama&limit=6" : target === "Baby" ? "target=Baby&limit=34" : "limit=45"} `, {
                    headers: {
                        "Authorization": `${gettoken}`
                    }
                });
                setloading(false)
                setTips(response.data.data)
                setOriginalTips(response.data.data)
                console.log(response.data.data)
             
 
            } catch (error) {
                setloading(false)
                console.log("Error fetching babies:", error);
        
            }
        }
   
    useEffect(() => {
     
        if (gettoken) {
            gettips();
        }
        
    }, [gettoken, target , loadafter ])

    const handleSort = () => {
        if (sortOrder === "asc") {
            
            const sorted = [...Tips].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setTips(sorted);
            setSortOrder("desc");
        } else {
            
            const sorted = [...Tips].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            setTips(sorted);
            setSortOrder("asc");
        }
    };
    const handlesort = () => {
        if (sortedmonths === "asc") {
            
            const sorted = [...Tips].sort((a, b) => new Date(b.month) - new Date(a.month));
            setTips(sorted);
            setsortmonths("desc");
        } else {
            
            const sorted = [...Tips].sort((a, b) => new Date(a.month) - new Date(b.month));
            setTips(sorted);
            setsortmonths("asc");
        }
    };
    function capitalizeWords(str) {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }
    function search() {
        if (searchvalue.trim() !== "") {
            const searcheddata = originalTips.filter((e) =>
                capitalizeWords(e.category).includes(capitalizeWords(searchvalue.trim()))
            );
            setTips(searcheddata);
        } else {
            setTips(originalTips);
        }
     
 }
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
    
      setdeleteicon(anyChecked); 
    }
    
      
    async function handledelete() {
        setloading(true)
        try {
          const deleteRequests = idarr.map((id) =>
            axios.delete(`https://carenest-serverside.vercel.app/tips/${id}`, {
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
          gettips();
          setidarr([])
          
        
            
        } catch (error) {
            setloading(false)
          console.log("Error deleting items:", error);
        }
  }
  

 
    const totalPages = Math.ceil(Tips.length / tipsPerPage);
    const indexOfLastTip = currentPage * tipsPerPage;
    const indexOfFirstTip = indexOfLastTip - tipsPerPage;
    const currentTips = Tips.slice(indexOfFirstTip, indexOfLastTip);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const tisprow = currentTips.map((tip, index) => (
        <tr key={index} >
          <td>
                <input type="checkbox" onClick={(e)=>handleCheckbox( e ,tip._id)} />
    </td>
        <td className="title" onClick={() => { settipid(`${tip._id}` , setisupdate(true)) }}>
            <img src={tip.image} alt={tip.target} className="tip-img" />
            <p>{tip.category}</p>
          </td>
          <td>{tip.target}</td>
            <td>{tip.tip.length}</td>
            {target === "Baby" && <td>{tip.month || ""}</td>}
          <td>{tip.createdAt.split("T")[0]}</td>
        
        </tr>
    ));

    const handleMonths = (month) => {
        setmonthactive(month);
        const filtered = originalTips.filter(item => 
            item.month === month && ( item.target === "Baby" )
        );
        setTips(filtered);
        handleMonthsDropdownToggle();
    };

  function handleCategoryDropdownToggle() {
    if (categroyactive) {
      setDropdownClosing(true);
      setTimeout(() => {
        setcategoryactive(false);
        setDropdownClosing(false);
      }, 300);
    } else {
      setcategoryactive(true);
    }
  }
  function handleMonthsDropdownToggle() {
    if (monthsDropdownActive) {
      setMonthsDropdownClosing(true);
      setTimeout(() => {
        setMonthsDropdownActive(false);
        setMonthsDropdownClosing(false);
      }, 300);
    } else {
      setMonthsDropdownActive(true);
    }
  }

    return (
        <div className="tips-bashboard">
      {(open || isDeleting || isupdate) && (
    <div className="overlay"></div>
)}

        
               <div className="header">
                            <h2>
                            Articles
                            </h2>
                            <div className="search">
                                <input type="text" placeholder="Search for article" value={searchvalue} onChange={(e)=> setsearchvalue(e.target.value)} />
                                <div className="searchicon" onClick={search} >
                                <CiSearch className="icon" />
                                </div>
                            
            
                            </div>
                <div className="addtip">
                        <button className="newtip" onClick={()=> setopen(prev=> !prev)}>

                       
<p>    + add new article</p>
                        </button>
                    </div>
            </div>
                <div className="tips-header">
                <div className="numbers-tips">
  <p>
    All <span>({originalTips.length})</span>
  </p> 
  <p>
    Mamy tips <span>({originalTips.filter(tip => tip.target === "Mama").length})</span>
  </p>
  <p>
    Baby tips <span>({originalTips.filter(tip => tip.target === "Baby").length})</span>
  </p>
</div>

                <div className="table-header">
                    <div style={{display:"flex " , gap :"10px"}}>

                    
                    <div className="filters">
                        <div className="cat">

                        
                        
                        <button onClick={handleCategoryDropdownToggle}>
                          { target ?target :"categroy"}
                          <MdOutlineKeyboardArrowUp className={`${categroyactive?'active':"" } arrow-list`} />
                        </button>
                        {(categroyactive || dropdownClosing) && (
                          <div className={`cat-dropdown ${categroyactive && !dropdownClosing ? "show" : "hide"}`}>
                            <p onClick={() => {
                              settarget("Mama");
                              handleCategoryDropdownToggle();
                            }}>Mamy tips</p>
                            <p onClick={() => { settarget("Baby"); handleCategoryDropdownToggle(); }}>Baby Tips</p>
                            <p onClick={() => { settarget("all"); handleCategoryDropdownToggle();}}> All tips</p>
                          </div>
                        )}
                        </div>
                            <div className="months">
                                
                     
                        <button onClick={handleMonthsDropdownToggle}>
                                   {monthsactive ? `month ${monthsactive}` :" months"}
                                    <MdOutlineKeyboardArrowUp className={`${sortedmonths ?'active' : ""} arrow-list`} />
                                
                            </button>
                            {(monthsDropdownActive || monthsDropdownClosing) && (
                                <div className={`months-dropdown ${monthsDropdownActive && !monthsDropdownClosing ? "show" : "hide"}`}>
                                        {[...Array(12)].map((_, i) => (
                                          <p key={i+1} onClick={() => { handleMonths(i+1); handleMonthsDropdownToggle(); }}>month {i+1}</p>
                                        ))}
                                </div>

                            )}
                            </div>
                    </div>
                    </div>
             
                 
                </div>
             
               
            </div>
             <table className=" styled-table">
             <thead>
                    <tr>
                    <th >
  {deleteicon  && idarr.length ==!0? (
    <FaSquareMinus className="deleteicon"  onClick={()=>setIsDeleting(true)}  />
  ) : (
    <span style={{ width: "15px" , height:"23px", display:"inline-block"}}></span>
  )}
</th>
              <th>Article' Title</th>
               <th>Category</th>
                <th>Num Of Tips</th>                
                {target === "Baby" && <th onClick={handlesort}>Months   <span style={{ paddingLeft: "5px" }}>
                 {sortedmonths === "asc" ? <FaSortAmountUpAlt /> : <FaSortAmountDownAlt />}
                            </span></th>}
              <th onClick={handleSort} style={{ cursor: "pointer" }}>
               CreatedAt 
               <span style={{ paddingLeft: "5px" }}>
                {sortOrder === "asc" ? <FaSortAmountUpAlt /> : <FaSortAmountDownAlt />}
                            </span>
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
) : tisprow.length === 0 ? (
  <tbody>
    <tr>
      <td colSpan="10" style={{ textAlign: "center", padding: "40px", fontSize: "18px", color: "#777" }}>
  nN Babies Added Yet In System
      </td>
    </tr>
  </tbody>
) : (
  <tbody>{tisprow}</tbody>
)}
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
            {open && (
                <div className="createarticle">
                    <AddTip onClose={() => setopen(false)} onload={ ()=>setloadafter(true)}  />
                    </div>
            
        )}
        {
          isupdate && 
          <UpdateTip onClose={() => { setisupdate(false), setopen(false) }} onload={ ()=>setloadafter(true)} tipid={tipid}/>
          
        }
            {
                isDeleting &&
                <div className="ConfirmDelete">
                
                        <div className="deletebox">
                            {!loading ? (
                               <div className="iconbox">
                  
                               < RiDeleteBin6Line className="icon" />
                                     
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