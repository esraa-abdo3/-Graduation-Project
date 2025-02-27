
// import { useParams } from "react-router-dom";
// import "./StoryDetalis.css";
// import Cookies from "universal-cookie";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Mainnavbar from "../../../../Componets/mainhomeprofile/Mainnavbar";
// import img from "../../../../assets/book1.png"
// export default function StoryDetalis() {
//     const { storyid } = useParams();
//     const cookie = new Cookies();
//     const gettoken = cookie.get("Bearer");
//     const [storydetalis, setstorydetails] = useState(null);
//     const [loading, setloading] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const contentperpage = 2;

//     useEffect(() => {
//         async function getstory() {
//             try {
//                 setloading(true)
//                 const response = await axios.get(`https://carenest-serverside.vercel.app/stories/${storyid}`, {
//                     headers: {
//                         "Authorization": `${gettoken}`
//                     }
//                 });
//                 setstorydetails(response.data.data);
//               setloading(false)
//             } catch (error) {
//                 console.log("Error fetching story:", error);
//                 setloading(false)
//             }
//         }
//         if (gettoken) {
//             getstory();
//         }
//     }, [gettoken, storyid]);

//     if (!storydetalis) {
//         return <div>Loading...</div>;
//     }
//     const words = storydetalis.content.split(" ");
//     const wordsPerSection = Math.ceil(words.length / 7);
//     const formattedContent = [];
//     for (let i = 0; i < words.length; i += wordsPerSection) {
//         formattedContent.push(words.slice(i, i + wordsPerSection).join(" "));
//     }

//     const structuredContent = [];
//     structuredContent.push(formattedContent.slice(0, 2).join(" "));
//     structuredContent.push(formattedContent.slice(2, 4).join(" "));

//     for (let i = 5; i < formattedContent.length; i += 2) {
//         structuredContent.push(formattedContent.slice(i, i + 2).join(" "));
//     }

//     const totalPages = Math.ceil(structuredContent.length / contentperpage);

//     const indexOfLastTip = currentPage * contentperpage;
//     const indexOfFirstTip = indexOfLastTip - contentperpage;
//     const currentTips = structuredContent.slice(indexOfFirstTip, indexOfLastTip);

//     const nextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };
    
//     const prevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     return (
//         <div className="storydetalis">
//             <Mainnavbar/>
//             <div className="headerstory">
//                 <img src={img}></img>
//             </div>
//             <div className="cont">
//                 {loading ? (
//                     <>
//                              <div className="story-container-load">
//                     <div className="story-title-load">
//                         <h2></h2>
//                     </div>
//                     <div className="content">
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                                 <p></p>
//                     </div>
//                 </div>
//                     </>
//                 ) : (
//                     <div className="story-container">
//                     <div className="story-title">
//                         <h2>{storydetalis.title}</h2>
//                     </div>
//                     <div className="content">
//                         {currentTips.map((content, idx) => (
//                             <p key={idx}>{content}</p>
//                         ))}
//                     </div>
//                 </div>
                        
//                 )}
                
//                 <div className="pagination-story">
//                     <button
//                         onClick={prevPage}
//                         disabled={currentPage === 1}
//                         className={currentPage > 1 ? "active" : ""}
//                     >
//                         Previous
//                     </button>

//                     <button
//                         onClick={nextPage}
//                         disabled={currentPage === totalPages}
//                         className={currentPage < totalPages ? "active" : ""}
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
import { useParams } from "react-router-dom";
import "./StoryDetalis.css";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import Mainnavbar from "../../../../Componets/mainhomeprofile/Mainnavbar";
import img from "../../../../assets/book1.png";
import loadimg from "../../../../assets/freepikbackground.png"

export default function StoryDetalis() {
    const { storyid } = useParams();
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [storydetalis, setstorydetails] = useState(null);
    const [loading, setloading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const contentperpage = 2;

    useEffect(() => {
        async function getstory() {
            try {
                setloading(true);
                const response = await axios.get(`https://carenest-serverside.vercel.app/stories/${storyid}`, {
                    headers: {
                        "Authorization": `${gettoken}`
                    }
                });
                setstorydetails(response.data.data);
                console.log(response.data.data)
            } catch (error) {
                console.log("Error fetching story:", error);
            } finally {
                setloading(false);
            }
        }
        if (gettoken) {
            getstory();
        }
    }, [gettoken, storyid]);

    let structuredContent = [];
    if (storydetalis) {
        const words = storydetalis.content.split(" ");
        const wordsPerSection = Math.ceil(words.length / 7);
        const formattedContent = [];

        for (let i = 0; i < words.length; i += wordsPerSection) {
            formattedContent.push(words.slice(i, i + wordsPerSection).join(" "));
        }

        structuredContent.push(formattedContent.slice(0, 2).join(" "));
        structuredContent.push(formattedContent.slice(2, 4).join(" "));

        for (let i = 5; i < formattedContent.length; i += 2) {
            structuredContent.push(formattedContent.slice(i, i + 2).join(" "));
        }
    }

    const totalPages = Math.ceil(structuredContent.length / contentperpage);
    const indexOfLastTip = currentPage * contentperpage;
    const indexOfFirstTip = indexOfLastTip - contentperpage;
    const currentTips = structuredContent.slice(indexOfFirstTip, indexOfLastTip);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="storydetalis">
            <Mainnavbar />
            <div className="headerstory">
                {loading ? (
                    <img src={loadimg} alt="Story cover" />
                    
                ):   <img src={ storydetalis.imageWeb} alt="Story cover" />}
        
            </div>
            <div className="cont">
                {loading ? (
                    <>
                   
                    <div className="story-container-load">
                            <h2></h2>
                        <div className="content">
                            <div>
                            <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                     
                            </div>
                            <div>
                            <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                     
                                </div>
                 
                

                        </div>
                        <div className="pagination-story-load">
                         <button onClick={prevPage} disabled={currentPage === 1} className={currentPage > 1 ? "active" : ""}>
                       
                         </button>
                         <button onClick={nextPage} disabled={currentPage === totalPages} className={currentPage < totalPages ? "active" : ""}>
                          
                         </button>
                            </div>
                            
                    
                     
                        </div>
                        </>
                ) : (
                        <>
                                    <div className="story-container">
                        <div className="story-title">
                            <h2>{storydetalis?.title}</h2>
                        </div>
                        <div className="content">
                            {currentTips.map((content, idx) => (
                                <p key={idx}>{content}</p>
                            ))}
                        </div>
                        </div>
                    
                         <div className="pagination-story">
                         <button onClick={prevPage} disabled={currentPage === 1} className={currentPage > 1 ? "active" : ""}>
                             Previous
                         </button>
                         <button onClick={nextPage} disabled={currentPage === totalPages} className={currentPage < totalPages ? "active" : ""}>
                             Next
                         </button>
                            </div>
                            </>
            
                        
                )}
               
            </div>
        </div>
    );
}



