import { useEffect, useState } from "react";
import "./Allstories.css"
import { CiSearch } from "react-icons/ci";
import { TiPlus } from "react-icons/ti";
import Cookies from "universal-cookie";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaSquareMinus } from "react-icons/fa6";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import Addstory from "../AddStory/Addstory";
import Updatestory from "../UpdateStory/UpdateStory";
export default function DashboardStories() {
      const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [open, setopen] = useState(false);
    const [Stories, setstories] = useState([]);
    const [orginalstories, setorginalstories] = useState([]);
    const [loading, setloading] = useState(false);
    const [storiesnumber, setstoriesnumber] = useState("");
        const [currentPage, setCurrentPage] = useState(1);
    const tipsPerPage = 6
        const totalPages = Math.ceil(Stories.length / tipsPerPage);
        const indexOfLastTip = currentPage * tipsPerPage;
        const indexOfFirstTip = indexOfLastTip - tipsPerPage;
    const currentTips = Stories.slice(indexOfFirstTip, indexOfLastTip);
    const [idarr, setidarr] = useState([]);
    const [deleteicon, setdeleteicon] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loadafter, setloadafter] = useState(false);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortUpdatedOrder, setSortUpdatedOrder] = useState(null);
    const [searchvalue, setsearchvalue] = useState("");
    const [isupdate, setisupdate] = useState(false);
    const[storyid,setstoryid]=useState("")
    console.log(idarr)

    
    
        const paginate = (pageNumber) => setCurrentPage(pageNumber);
        const storyrow = currentTips.map((story, index) => (
            <tr key={index} >
              <td>
                    <input type="checkbox"  onClick={(e)=>handleCheckbox( e ,story._id)} />
        </td>
                <td className="title" onClick={() => {
                    setisupdate(true)
                    setstoryid(story._id)
              }}>
                <img src={story.image !==null && story.image }  className="tip-img" />
               <p> 
      <span>{story.title}</span> 
                  
                    </p>
    
                </td>
                
       
                <td>{new Date(story.updatedAt).toISOString().split("T")[0]}</td>
                   <td>{new Date(story.createdAt).toISOString().split("T")[0]}</td>

          
    
    
               
            
            </tr>
        ));
      async function getStories() {
                setloading(true)
                try {
                    const response = await axios.get(`https://carenest-serverside.vercel.app/stories `, {
                        headers: {
                            "Authorization": `${gettoken}`
                        }
                    });
                    setloading(false)
                    setstoriesnumber(response.data.data.length)
                    setstories(response.data.data);
                    setorginalstories(response.data.data)
                    console.log(response.data.data)
                 
     
                } catch (error) {
                    setloading(false)
                    console.log("Error fetching babies:", error);
            
                }
    }
    useEffect(() => {
        getStories()
        
    }, [])
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
                   axios.delete(`https://carenest-serverside.vercel.app/stories/${id}`, {
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
                 getStories();
                 setidarr([])
                 
               
                   
               } catch (error) {
                   setloading(false)
                 console.log("Error deleting items:", error);
               }
    }
        const handlesort = () => {
        if (sortOrder === "asc") {
            
            const sorted = [...Stories].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setstories(sorted);
            setSortOrder("desc");
        } else {
            
            const sorted = [...Stories].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            setstories(sorted);
            setSortOrder("asc");
        }
    };
    const handleSortUpdated = () => {
  if (sortUpdatedOrder === "asc") {
    const sorted = [...Stories].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setstories(sorted);
    setSortUpdatedOrder("desc");
  } else {
    const sorted = [...Stories].sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    setstories(sorted);
    setSortUpdatedOrder("asc");
  }
    };
        function capitalizeWords(str) {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }
    
    // search
   
    useEffect(() => {
        if (searchvalue.trim() !== "") {
            const searcheddata = orginalstories.filter((e) =>
                capitalizeWords(e.title).includes(capitalizeWords(searchvalue.trim()))
            );
            setstories(searcheddata);
        } else {
            setstories(orginalstories);
        }
    }, [searchvalue, orginalstories, idarr]);

    return (
        <div className="DashboardStories tips-bashboard">
                              {(open || isDeleting || isupdate) && (
    <div className="overlay"></div>
)}
 <div className="header">
                <h2> Stories</h2>
                <div className="search">
                                <input type="text" placeholder="Search for story" value={searchvalue} onChange={(e)=> setsearchvalue(e.target.value)} />
                                <div className="searchicon"  >
                                <CiSearch className="icon" />
                                </div>
                            
            
                            </div>
       <div className="addtip">
                        <button className="newtip" onClick={()=> setopen(prev=> !prev)}>
 < TiPlus style={{fontWeight:"bold", fontSize:"17px"}} />
                       
<p>     add new story </p>
                        </button>
                    </div>
         
            

               
            </div>
              <div className="table-responsive">
                             <table className="styled-table">
                                 <thead>
                                     <tr className="doctorsdtr">
                                         <th >
                                        {idarr.length > 0 ? (
  <FaSquareMinus className="deleteicon" onClick={() => setIsDeleting(true)} />
) : (
  <span style={{ width: "15px", height: "23px", display: "inline-block" }}></span>
)}

                                         </th>
                                         <th>Story Title</th>
                    
                            <th onClick={handlesort}>created at
                                <span style={{ paddingLeft: "5px" }}>
                                             {sortOrder === "asc" ? <FaSortAmountUpAlt /> : <FaSortAmountDownAlt />}
                                         </span>
                             </th>
                          <th onClick={handleSortUpdated}>
  update at
  <span style={{ paddingLeft: "5px" }}>
    {sortUpdatedOrder === "asc" ? <FaSortAmountUpAlt /> : <FaSortAmountDownAlt />}
  </span>
</th>

                           
                                     
                        
                                     </tr>
                                 </thead>
                                 {loading ? (
                                     <tbody>
                                         {[...Array(6)].map((_, i) => (
                                             <tr key={i}>
                                                 <td colSpan="7">
                                                     <div className="tr-loader"></div>
                                                 </td>
                                             </tr>
                                         ))}
                                     </tbody>
                                 ) : storyrow.length === 0 ? (
                                     <tbody>
                                         <tr>
                                             <td colSpan="7" style={{ textAlign: "center", padding: "40px", fontSize: "18px", color: "#777" }}>
                                                 no stories  found
                                             </td>
                                         </tr>
                                     </tbody>
                                 ) : (
                                     <tbody>{storyrow}</tbody>
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
                            <div className="createstory">
                                <Addstory onClose={() => setopen(false)} getStories={getStories}  />
                                </div>
                        
            )}
                {isupdate && (
                            <div className="updatestory">
                    <Updatestory onClose={() => {
                        setopen(false)
                        setisupdate(false)
                    }
                    } getStories={getStories} id={storyid} />
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