import "./Members.css"
import loginuser from "../../../../assets/mamyprofile.png"
import Cookies from "universal-cookie"
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAduR3n-Hhueu10matOF-2Ga4sIuEcptBY",
  authDomain: "carenest-438417.firebaseapp.com",
  projectId: "carenest-438417",
  storageBucket: "carenest-438417.firebasestorage.app",
  messagingSenderId: "675853062971",
  appId: "1:675853062971:web:599efb25eac0ca4a249d1e",
  measurementId: "G-DT7T2V1JG4",
};
import { useLocation } from "react-router-dom";
import Mainnavbar from "../../../../Componets/mainhomeprofile/Mainnavbar";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Members() {
    const cookie = new Cookies;
    const firstname = cookie.get("firstname");
    const lastname = cookie.get("lastname");
    const username = `${firstname} ${lastname}`;
    const Bearer = cookie.get("Bearer");
    const [members, setmembers] = useState([]);
    const [searchvalue, setsearchvalue] = useState("")
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const myUserId = cookie.get("id");
  const [userImage, setUserImage] = useState("");
  const[loadimg,setloadimg]=useState(true)
    useEffect(() => {
    async function getUserDetailsAndSetOnline() {
      try {
        const res = await axios.get("https://carenest-serverside.vercel.app/users/getMe", {
          headers: { Authorization: `${Bearer}` },
        });
          console.log(res.data.data)
        const image = res.data.data.image || "";
        
        setUserImage(image);
        setloadimg(false)

   

   
  
      } catch (error) {
        console.log(error);
      }
    }

   
      getUserDetailsAndSetOnline();
    
  }, [Bearer]);
    // function handlesearch(value) {
    //     if (value.trim() === "") {
    //       setmembers(membersOriginal); 
    //     } else {
    //       const filtered = membersOriginal.filter((e) =>
    //         e.name.toLowerCase().includes(value.toLowerCase())
    //       );
    //       setmembers(filtered);
    //     }
    //   }
      
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "onlineUsers"), (snapshot) => {
      const users = snapshot.docs
        .map((doc) => doc.data())
        .filter((user) => user.userId !== myUserId); 

      setOnlineUsers(users);
      setLoading(false);
    });

    return () => unsub();
  }, [myUserId]);
   
    
  // Filtered users based on search
  const filteredUsers = onlineUsers.filter(user => {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
    return fullName.includes(searchvalue.toLowerCase());
  });
   
    
  return (
      <>
      {location.pathname === "/Members" && (
<Mainnavbar/>
      )}
       <div className="Memberss">
            <div className="loginusers">
          <div className="img" style={{ position: "relative" }}>
            {
              loadimg ?
                <div className="mememberloader">
              </div>
                : (
                <img src={userImage.length >0 ? userImage :loginuser} alt="loginuser" className="loginimg" />
                )
            }
                   
                    <span className="online-img"></span>

                </div>
                <h4> {username} </h4>

            </div>
            <div className="serarch">
                <input type="text" className="searchMembers" placeholder="search" value={searchvalue} onChange={(e)=>setsearchvalue(e.target.value)}></input>
                <CiSearch  className="searchicon" />
            </div>
            <div className="Members">
              <h4>Online members</h4>

           {loading ? (
        <div className="members-skeleton-grid">
          {[1,2].map(i => (
            <div className="members-skeleton-card" key={i}>
              <div className="members-skeleton-avatar"></div>
              <div className="members-skeleton-lines">
                <div className="members-skeleton-line" style={{width: '60%'}}></div>
                
              </div>
            </div>
          ))}
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="users-grid">
          {filteredUsers.map((user) => (
            <div key={user.userId} className="user-card">
              <img
                src={user.userImage}
                alt="user"
                width={40}
                height={40}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid green",
                }}
              />
              <p>{user.firstName} {user.lastName}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="offlineusers">No users found.</p> 
      )}
          

        </div>
  

        </div>

      </>
       
    )
}