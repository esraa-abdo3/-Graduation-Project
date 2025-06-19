 import Navbar from "../../Componets/Navbar/Navbar"
import Welcome from "./Welcome"
import svg from "../../assets/clouds-bottom.svg"
import Top from "./Topfeaturs"
import Cry from "./Cryguide"
import Doctors from "./Doctors"
import wav from "../../assets/Untitled.svg"
import Enterainment from "./Enterainment"

import Chat from "./Chatmamys"
import Reminders from "./Reminders"
import Growth from "./Growth"
import Tips from "./Tips"
import Shopping from "./shoping"
import Footer from "../../Componets/Footer/Footer"
import top from "../../assets/Untitledtop.svg"


export default function Home() {
    return (
        <>
                 <Navbar />
            <Welcome />
            <Top />
             <img src={svg}  style={{backgroundColor:"rgb(215 239 249 / 28%)"}}>
            </img> 
            <Cry />
            <Reminders/>

         
           
         
          
            <Doctors />
             {/* <img src={wav} style={{backgroundImage:"rgb(215 239 249 / 28%)"}}  >
            </img>  */}
             <Growth />
            
           
             <Chat />
            <Enterainment />
           
          
            <Tips />
            
            
        
         
                 <Footer/>
       
           
       

           
          
            
           
         

           
        
        </>
   
    )
}