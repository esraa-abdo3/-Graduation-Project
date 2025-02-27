import { useEffect, useState } from "react"
import "./Babystory.css"
import Cookies from "universal-cookie";
import axios from "axios";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import babysleep from "../../../../assets/modern-running-shoes-white-background_1078797-8372-removebg-preview.png"
import "../../MamyTips/MamaTips.css"
import Mainnavbar from "../../../../Componets/mainhomeprofile/Mainnavbar";
export default function Babystory() {
    const cookie = new Cookies();
    const nav=useNavigate()
    const gettoken = cookie.get("Bearer");
    const [stories, setstories] = useState([]);
    const contentperpage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const[Loading,Setloading]=useState(false)
 

    useEffect(() => {
        async function getsrories() {
            Setloading(true)
            try {
                const response = await axios.get('https://carenest-serverside.vercel.app/stories/?limit=19', {
                    headers: {
                        "Authorization": `${gettoken}`
                    }
                });
                setstories(response.data.data)
               
             Setloading(false)
 
            } catch (error) {
                console.log("Error fetching babies:", error);
                Setloading(false)
        
            }
        }
        if (gettoken) {
            getsrories();
        }
        
    }, [gettoken ])

    const totalPages = Math.ceil(stories.length / contentperpage);
const indexOfLastItem = currentPage * contentperpage;
const indexOfFirstItem = indexOfLastItem - contentperpage;
const currentItems = stories.slice(indexOfFirstItem, indexOfLastItem);
const storiescards = currentItems.map((story, index) => {
    return (
        <div className="card-story" key={index} 
            style={{ backgroundImage: `url(${story.image})`, animationDelay: `${index * 0.2}s` }}
            onClick={() => nav(`/babystories/${story._id}`)}
        >
            <div className="text">
                <h3>{story.title}</h3>
                <div className="icon">
                    <GoArrowRight className="right-arrow" />
                </div>
            </div>
        </div>
    );
});
const pageNumbers = [];
for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
        <button key={i} className={currentPage === i ? "active" : ""} onClick={() => setCurrentPage(i)}>
            {i}
        </button>
    );
}


    return (
        <div className="Baby-story">
            <Mainnavbar/>
            <div className="babystory-header">
                <div className="text">
                     <img src={babysleep} alt="" />
                    <h3>A world of dreams where bedtime tales come alive🌙 📚</h3>
                    

                </div>
                </div>
            <div className="cont babycont">
            <h5>Where dreams take flight, and bedtime stories come to life 🌙 ✨</h5>
                <div className="cards-story">
                    {Loading ? 
                        <>
                  
                            <div className="card-story-loading">
                                <div className="text">

                                </div>
                        </div>
                            <div className="card-story-loading">
                            <div className="text">
                                    
                                    </div>
                            </div>
                            <div className="card-story-loading">
                            <div className="text">
                                    
                                    </div>
                            </div>
                            <div className="card-story-loading">
                            <div className="text">
                                    
                                    </div>
                            </div>
                            <div className="card-story-loading">
                            <div className="text">
                                    
                                    </div>
                            </div>
                            <div className="card-story-loading">
                            <div className="text">
                                    
                                    </div>
                            </div>
                            <div className="card-story-loading">
                            <div className="text">
                                    
                                    </div>
                            </div>
                            <div className="card-story-loading">
                            <div className="text">
                                    
                                    </div>
                            </div>
                            </>
                     : <>
                    {storiescards }
                    </>}
           
                </div>
                
            <div className="pagination pagination-baby">{pageNumbers}</div>

                </div>
            </div>

     
    )
}