
import { IoFilterOutline } from "react-icons/io5";
import "./Babies.css"
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
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
    const [sortOrder, setSortOrder] = useState(null);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [searchvalue, setsearchvalue] = useState("");
    const [orginalBabies, setorginalBabies] = useState([]);
    const[loader,setloader]=useState(false)
    async function getBabies() {
         setloader(true)
        try {
            let res = await axios.get('https://carenest-serverside.vercel.app/babies/all', {
                headers: {
                    Authorization: `${gettoken}`
                }
            });
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
    const handleSort = () => {
        if (sortOrder === "asc") {
            
            const sorted = [...Babies].sort((a, b) => new Date(b.createdAt.split("T")[0]) - new Date(a.createdAt.split("T")[0]));
            setBabies(sorted);
            setSortOrder("desc");
        } else {
            
            const sorted = [...Babies].sort((a, b) => new Date(a.createdAt.split("T")[0]) - new Date(b.createdAt.split("T")[0]))
            setBabies(sorted);
            setSortOrder("asc");
        }
    };
    const handlesortupdate = () => {
        if (sortOrder === "asc") {
            
            const sorted = [...Babies].sort((a, b) => new Date(b.updatedAt.split("T")[0]) - new Date(a.updatedAt.split("T")[0]));
            setBabies(sorted);
            setSortOrder("desc");
        } else {
            
            const sorted = [...Babies].sort((a, b) => new Date(a.updatedAt.split("T")[0]) - new Date(b.updatedAt.split("T")[0]))
            setBabies(sorted);
            setSortOrder("asc");
        }
    };
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
        const lastHeightEntry = [...baby.height]
          .reverse()
            .find(item => item.height !== null);
            const lastWeighttEntry = [...baby.weight]
            .reverse()
            .find(item => item.weight !== null);
       
        return (
          <tr key={index}>
            <td >{baby.name}</td>
            <td>{baby.gender}</td>
            <td>{baby.ageBaby}</td>
                <td>{lastHeightEntry ? lastHeightEntry.height : "N/A"}</td>
                <td>{lastWeighttEntry ? lastWeighttEntry.weight : "N/A"}</td>
                <td>{baby.medicationSchedule.length}</td>
                <td> 3 </td>
         
                <td> {baby.createdAt.split("T")[0]}</td>
                <td>{baby.updatedAt ? baby.updatedAt.split("T")[0] : "Not Update"}</td>
                <td className="babyactive" style={{ color: baby.active === true ? "#007AFF" : "#DC5AB0" }}>  { baby.active===true ?"True":"false"}</td>
          </tr>
        );
    });

      
    return (
        <>
                <div className="Dashboard-Babies">
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
                            <th>Name</th>
                             <th>Gender</th>         
                             <th > Age</th>
                             <th> height</th>
                              <th>weight</th>
                             <th>Num. of medicines</th>
                              <th>Num. of cry</th>
                            <th onClick={handleSort} >createdAt <span style={{ paddingLeft: "5px" }}>
                            {sortOrder === "asc" ? <FaSortAmountUpAlt /> : <FaSortAmountDownAlt />}
                           
                                        </span></th>
                                    <th onClick={handlesortupdate}> UpdateAt  <span style={{ paddingLeft: "5px" }}>
                            {sortOrder === "asc" ? <FaSortAmountUpAlt /> : <FaSortAmountDownAlt />}
                        </span></th>
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

        </div>
           
        </>
    
)
}
