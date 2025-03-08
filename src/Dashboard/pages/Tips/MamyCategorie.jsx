import axios from "axios";
import "./MamyCategorie.css"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import "../../ComonetsDashboard/SideBar/Sidebar.css"
import { TiPlus } from "react-icons/ti";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { FaSquareMinus } from "react-icons/fa6";
export default function CarenestTips() {
    const [Tips, setTips] = useState([]);
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [categroyactive, setcategoryactive] = useState(false);
    const [monthsactive, setmonthactive] = useState("");
    const [sortactive, setsortactive] = useState(false);
    const [target, settarget] = useState("");
    const [sortOrder, setSortOrder] = useState(null);
    const [sortedmonths, setsortmonths] = useState(null);
    const [searchvalue, setsearchvalue] = useState("");
    const [originalTips, setOriginalTips] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const tipsPerPage = 6
    const nav = useNavigate();
    const [deleteicon, setdeleteicon] = useState(false);
    const[idarr,setidarr]=useState([])

   
    useEffect(() => {
        async function gettips() {
            try {
                const response = await axios.get(`https://carenest-serverside.vercel.app/tips/?${target === "Mamy" ? "target=Mama&limit=6" : target === "Baby" ? "target=Baby&limit=34" : "limit=45"} `, {
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
    // search
   
    useEffect(() => {
        if (searchvalue.trim() !== "") {
            const searcheddata = originalTips.filter((e) =>
                capitalizeWords(e.category).includes(capitalizeWords(searchvalue.trim()))
            );
            setTips(searcheddata);
        } else {
            setTips(originalTips);
        }
    }, [searchvalue, originalTips, idarr]);


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
          // إضافة العنصر إذا لم يكن موجودًا
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
                Authorization: `${gettoken}`
              }
            })
          );
      
          const results = await Promise.all(deleteRequests);
            console.log("All deleted:", results.map(res => res.data));
            setidarr([])
            document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
                checkbox.checked = false;
            });
            
        } catch (error) {
          console.log("Error deleting items:", error);
        }
      }

 
    const totalPages = Math.ceil(Tips.length / tipsPerPage);

    // 🔹 استخراج البيانات للصفحة الحالية
    const indexOfLastTip = currentPage * tipsPerPage;
    const indexOfFirstTip = indexOfLastTip - tipsPerPage;
    const currentTips = Tips.slice(indexOfFirstTip, indexOfLastTip);

    // 🔹 التنقل بين الصفحات
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const tisprow = currentTips.map((tip, index) => (
        <tr key={index} >
          <td>
                <input type="checkbox" onClick={(e)=>handleCheckbox( e ,tip._id)} />
    </td>
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
    // const handleMonths = (month) => {
    //     setmonthactive(month);
    //     const filtered = originalTips.filter(item => item.month === month);
    //     setTips(filtered);
    // };
    const handleMonths = (month) => {
        setmonthactive(month);
    
        // تصفية البيانات بناءً على الفئة المحددة (Baby أو Mamy)
        const filtered = originalTips.filter(item => 
            item.month === month && (target === "Baby" ? item.target === "Baby" : true)
        );
    
        setTips(filtered);
    };
    
      
 
    
    
    
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
                                    { target ?target :"categroy"}
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
                            <div className="months">
                                
                     
                        <button disabled={target!=="Baby" && "disabled"}>
                                   {monthsactive ? `month ${monthsactive}` :" months"}
                                <MdOutlineKeyboardArrowUp className={`${sortedmonths ?'active' : ""} arrow-list`} onClick={() => setsortmonths(prev => !prev)} />
                                
                            </button>
                            {sortedmonths && (
                                <div className="months-dropdown">
                                        <p onClick={() => {
                                            handleMonths(1);
                                       
                                        setsortmonths(prev => !prev);
                                    }}>month1</p>
                                        <p onClick={() => { handleMonths(2); setsortmonths(prev => !prev); }}>month 2</p>
                                        <p onClick={() => { handleMonths(3); setsortmonths(prev => !prev); }}> month 3</p>
                                        <p onClick={() => {handleMonths(4) ; setsortmonths(prev => !prev); }}>month 4</p>
                                        <p onClick={() => {handleMonths(5) ; setsortmonths(prev => !prev); }}>month 5</p>
                                        <p onClick={() => { handleMonths(6); setsortmonths(prev => !prev); }}>month 6</p>
                                        <p onClick={() => { handleMonths(7); setsortmonths(prev => !prev); }}>month 7</p>
                                        <p onClick={() => { handleMonths(8); setsortmonths(prev => !prev); }}>month 8</p>
                                        <p onClick={() => { handleMonths(9); setsortmonths(prev => !prev); }}>month 9</p>
                                        <p onClick={() => { handleMonths(10); setsortmonths(prev => !prev); }}>month 10</p>
                                        <p onClick={() => { handleMonths(11); setsortmonths(prev => !prev); }}>month 11</p>
                                        <p onClick={() => { handleMonths(12);  setsortmonths(prev => !prev); }}>month 12</p>
     
                                </div>

                            )}
                            </div>
                    </div>
                    </div>
             
                    <div className="addtip">
                        <button className="newtip" onClick={()=>nav("/Dashboard/AddTip")}>
 < TiPlus style={{fontWeight:"bold", fontSize:"17px"}} />
                       
<p>     add new tip </p>
                        </button>
                    </div>
                </div>
               
            </div>
             <table className="styled-table">
             <thead>
                    <tr>
                    <th >
  {deleteicon ? (
    <FaSquareMinus className="deleteicon" onClick={handledelete}  />
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