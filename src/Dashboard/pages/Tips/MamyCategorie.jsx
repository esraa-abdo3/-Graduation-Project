import axios from "axios";
import "./MamyCategorie.css"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import "../../ComonetsDashboard/SideBar/Sidebar.css"
import { TiPlus } from "react-icons/ti";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
export default function MamyCategorie() {
    const [Tips, setTips] = useState([]);
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [categroyactive, setcategoryactive] = useState(false);
    const [sortactive, setsortactive] = useState(false);
    const [target, settarget] = useState("");
    const [sortOrder, setSortOrder] = useState(null); 
    const [sortedmonths, setsortmonths] = useState(null);
    const [searchvalue, setsearchvalue] = useState("");
    const [originalTips, setOriginalTips] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const  tipsPerPage = 6

   
    useEffect(() => {
        async function gettips() {
            try {
                const response = await axios.get(`https://carenest-serverside.vercel.app/tips/?${target ==="Mamy" ? "target=Mama&limit=6" :target ==="Baby"?"target=Baby&limit=34" :"limit=5"} `, {
                    headers: {
                        "Authorization": `${gettoken}`
                    }
                });
                setTips(response.data.data)
                setOriginalTips(response.data.data)
                console.log(response.data.data)
 
            } catch (error) {
                console.log("Error fetching babies:", error);
        
            }
        }
        if (gettoken) {
            gettips();
        }
        
    }, [gettoken, target])

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
   
    useEffect(() => {
        if (searchvalue.trim() !== "") {
            const searcheddata = originalTips.filter((e) =>
                capitalizeWords(e.category).includes(capitalizeWords(searchvalue.trim()))
            );
            setTips(searcheddata);
        } else {
            setTips(originalTips); 
        }
    }, [searchvalue, originalTips]); 
    
       
   
 
    const totalPages = Math.ceil(Tips.length / tipsPerPage);

    // 🔹 استخراج البيانات للصفحة الحالية
    const indexOfLastTip = currentPage * tipsPerPage;
    const indexOfFirstTip = indexOfLastTip - tipsPerPage;
    const currentTips = Tips.slice(indexOfFirstTip, indexOfLastTip);

    // 🔹 التنقل بين الصفحات
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const tisprow = currentTips.map((tip, index) => (
        <tr key={index}>
          <td className="title">
            <img src={tip.image} alt={tip.target} className="tip-img" />
            <p>{tip.category}</p>
          </td>
          <td>{tip.target}</td>
            <td>{tip.tip.length}</td>
            {target === "Baby" && <td>{tip.month || ""}</td>}
          <td>{tip.createdAt.split("T")[0]}</td>
        
        </tr>
    ));

      
 
    
    
    
    return (
        <div className="tips-bashboard">
            <div className="tips-header">
                <h2>CareNest Tips</h2>
                <div className="numbers-tips">
                <p>All <span>(41)</span></p> 
                    <p>mamy tips <span> (6)</span></p>
                    <p>Baby tips <span>(35)</span></p>

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
                            categroy
                               <MdOutlineKeyboardArrowUp   className={`${categroyactive?'active':"" } arrow-list`}onClick={()=>setcategoryactive(prev=>!prev)}/>
                            </button>
                            {categroyactive && (
                                     <div className="cat-dropdown">
                                  <p onClick={() => {
                               settarget("Mamy");
                              setcategoryactive(prev => !prev);
                                    }}>Mamy tips</p>
                                    <p onClick={() => { settarget("Baby") ,  setcategoryactive(prev => !prev);} }>Baby Tips</p>
                                    <p onClick={() => { settarget("all") , setcategoryactive(prev => !prev);}}> All tips</p>
     
                                 </div>

                            )
                                
                            }
                       
                            </div>
                     
                        <button disabled={target!=="Baby" && "disabled"}>
                            months
                            <MdOutlineKeyboardArrowUp   className={`${sortactive?'active':"" } arrow-list`}onClick={()=>setsortactive(prev=>!prev)}/>
                        </button>
                    </div>
                    </div>
             
                    <div className="addtip">
                        <button className="newtip">
 < TiPlus style={{fontWeight:"bold", fontSize:"17px"}} />
                       
<p>     add new tip </p>
                        </button>
                    </div>
                </div>
               
            </div>
             <table className="styled-table">
             <thead>
             <tr>
              <th>Tips' Title</th>
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

                {tisprow}
                <tbody>
                    
                </tbody>
            </table>
            <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
                        {index + 1}
                    </button>
                ))}
            </div>

        </div>
    )
}