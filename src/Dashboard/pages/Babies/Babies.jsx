import { IoFilterOutline } from "react-icons/io5";
import "./Babies.css"
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
// import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import { FaSquareMinus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
export default function Babies() {
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [Babies, setBabies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const babiesPerPage = 6
    const totalPages = Math.ceil(Babies.length / babiesPerPage);
    const indexOfLastTip = currentPage * babiesPerPage;
    const indexOfFirstTip = indexOfLastTip - babiesPerPage;
    const currentBabies = Babies.slice(indexOfFirstTip, indexOfLastTip);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [searchvalue, setsearchvalue] = useState("");
    const [orginalBabies, setorginalBabies] = useState([]);
    const [loader, setloader] = useState(false);
    const [idarr, setidarr] = useState([]);
    const [deleteicon, setdeleteicon] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loading, setloading] = useState(false);
    console.log(idarr)
    
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
        if (!idarr || idarr.length === 0) {
            console.log("No IDs selected for deletion.");
            return;
        }
        setloading(true)
    
        try {
            const deleteRequests = idarr.map((id) =>
                axios.delete(`https://carenest-serverside.vercel.app/babies/${id}`, {
                    headers: {
                        Authorization: `${gettoken}`
                    }
                })
            );
    
            const results = await Promise.all(deleteRequests);
            console.log("All deleted:", results.map(res => res.data));
    
            setidarr([]); 
            document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
                checkbox.checked = false;
            });
            setloading(false)
            setIsDeleting(false);
            setidarr([])
            
    
            // Refresh the babies list
            getBabies();
    
        } catch (error) {
            console.log("Error deleting items:", error);
        }
    }

    async function getBabies() {
         setloader(true)
        try {
            let res = await axios.get('https://carenest-serverside.vercel.app/babies/all', {
                headers: {
                    Authorization: `${gettoken}`
                }
            });
            console.log(res.data)
            setBabies(res.data.data)
            setorginalBabies(res.data.data)
            setloader(false)
           
            
        }
        catch (error) {
            console.log(error)
            setloader(false)
            
        }
        
    }
    useEffect(() => {
        getBabies()
        
    }, [])
    // const handleSort = () => {
    //     if (sortOrder === "asc") {
            
    //         const sorted = [...Babies].sort((a, b) => new Date(b.createdAt.split("T")[0]) - new Date(a.createdAt.split("T")[0]));
    //         setBabies(sorted);
    //         setSortOrder("desc");
    //     } else {
            
    //         const sorted = [...Babies].sort((a, b) => new Date(a.createdAt.split("T")[0]) - new Date(b.createdAt.split("T")[0]))
    //         setBabies(sorted);
    //         setSortOrder("asc");
    //     }
    // };
    // const handlesortupdate = () => {
    //     if (sortOrder === "asc") {
            
    //         const sorted = [...Babies].sort((a, b) => new Date(b.updatedAt.split("T")[0]) - new Date(a.updatedAt.split("T")[0]));
    //         setBabies(sorted);
    //         setSortOrder("desc");
    //     } else {
            
    //         const sorted = [...Babies].sort((a, b) => new Date(a.updatedAt.split("T")[0]) - new Date(b.updatedAt.split("T")[0]))
    //         setBabies(sorted);
    //         setSortOrder("asc");
    //     }
    // };
    function capitalizeWords(str) {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }
        function search() {
            if (searchvalue.trim() !== "") {
                const searcheddata = orginalBabies.filter((e) =>
                    capitalizeWords(e.name).includes(capitalizeWords(searchvalue.trim()))
                );
                setBabies(searcheddata);
            } else {
                setBabies(orginalBabies);
            }
        }
    const babyiesrow = currentBabies.map((baby, index) => {
        return (
          <tr key={index}>
            <td>
                <input type="checkbox" onClick={(e) => handleCheckbox(e, baby.id)} />
            </td>
            <td>{baby.name}</td>
            <td>{baby.gender}</td>
            <td>{baby.ageInWeeks}</td>
            <td>{baby.height ? baby.height : "N/A"}</td>
            <td>{baby.weight ? baby.weight : "N/A"}</td>
            <td>{baby.numOfMedicines}</td>
            <td> 3 </td>
            {/* <td> {baby.createdAt.split("T")[0]}</td>
            <td>{baby.updatedAt ? baby.updatedAt.split("T")[0] : "Not Update"}</td> */}
            <td className="babyactive" style={{ color: baby.active === true ? "#007AFF" : "#DC5AB0" }}>  { baby.active===true ?"True":"false"}</td>
          </tr>
        );
    });

      
    return (
        <>
            <div className="Dashboard-Babies">
                      { isDeleting && (
    <div className="overlay"></div>
)}
            <div className="header">
                <h2>
                Babys <span> ({Babies.length})</span>
                </h2>
                <div className="search">
                    <input type="text" placeholder="Search for Baby" value={searchvalue} onChange={(e)=> setsearchvalue(e.target.value)} />
                    <div className="searchicon" onClick={search}>
                    <CiSearch className="icon" />
                    </div>
                

                </div>
                <div className="filter">
                    <div className="filtericon">
                        <p> all</p>
                        <IoFilterOutline/>
                    </div>
                    
            </div>
                </div>
                <div className="table-container">
                <table className=" showcodes styled-table">
                         <thead>
                            <tr>
                                <th>
                            {deleteicon  && idarr.length !== 0? (
                              <FaSquareMinus className="deleteicon"  onClick={()=>setIsDeleting(true)}  />
                            ) : (
                              <span style={{ width: "15px" , height:"23px", display:"inline-block"}}></span>
                                    )}
                                    </th>
                             <th>Name</th>
                             <th>Gender</th>         
                             <th > Age</th>
                             <th> height</th>
                              <th>weight</th>
                             <th>Num. of medicines</th>
                              <th>Num. of cry</th>
                            {/* <th onClick={handleSort} >createdAt <span style={{ paddingLeft: "5px" }}>
                            {sortOrder === "asc" ? <FaSortAmountUpAlt /> : <FaSortAmountDownAlt />}
                           
                                        </span></th>
                                    <th onClick={handlesortupdate}> UpdateAt  <span style={{ paddingLeft: "5px" }}>
                            {sortOrder === "asc" ? <FaSortAmountUpAlt /> : <FaSortAmountDownAlt />}
                        </span></th> */}
                        <th>Active</th>
                                    </tr>
                                   </thead>
                                   {loader ? (
  <tbody>
    {[...Array(6)].map((_, i) => (
      <tr key={i}>
        <td colSpan="10">
          <div className="tr-loader"></div>
        </td>
      </tr>
    ))}
  </tbody>
) : (
  <tbody>{babyiesrow}</tbody>
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
           
        </>
    
)
}
