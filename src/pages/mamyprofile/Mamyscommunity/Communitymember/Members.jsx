import "./Members.css"
import loginuser from "../../../../assets/mamyprofile.png"
import Cookies from "universal-cookie"
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";



export default function Members() {
    const cookie = new Cookies;
    const firstname = cookie.get("firstname");
    const lastname = cookie.get("lastname");
    const username = `${firstname} ${lastname}`;
    const Bearer = cookie.get("Bearer");
    const [members, setmembers] = useState([]);
    const [onlinemember, setonlinemembers] = useState([])
    const [searchvalue, setsearchvalue] = useState("")
    const [membersOriginal, setmembersOriginal] = useState([])
    function handlesearch(value) {
        if (value.trim() === "") {
          setmembers(membersOriginal); 
        } else {
          const filtered = membersOriginal.filter((e) =>
            e.name.toLowerCase().includes(value.toLowerCase())
          );
          setmembers(filtered);
        }
      }
      
    async function getmembers() {
        try {
          let res = await axios.get('https://carenest-serverside.vercel.app/community/', {
            headers: {
              Authorization: `${Bearer}`
            }
          });
      
          const newMembers = res.data;
          const uniqueNames = new Set();
          const filtered = [];
      
          newMembers.forEach(member => {
            if (
              member.fullName && 
              !uniqueNames.has(member.fullName)
            ) {
              uniqueNames.add(member.fullName);
              filtered.push({
                name: member.fullName,
                img: member.userImage
              });
            }
          });
      
            setmembers(filtered);
            setmembersOriginal(filtered)
      
        } catch (err) {
          console.log(err);
        }
    }
    async function GetOnlineUsers() {
        try {
            let res = await axios.get('https://carenest-serverside.vercel.app/community/online', {
                headers: {
                    Authorization:`${Bearer}`
                }
            })
            console.log(res.data.data)
            const onlineUsers = res.data.data;

            const formattedUsers = onlineUsers.map(user => ({
              name: user.firstName + ' ' + user.lastName,
            }));
        
            setonlinemembers(formattedUsers); 
      
            
        }
        catch (err) {
            console.log(err)
            
        }
        
    }
    useEffect(() => {
     
        GetOnlineUsers()
        getmembers()
        
    }, [])
  console.log(members);
  console.log(onlinemember)
   
    
    return (
        <div className="Members">
            <div className="loginusers">
                <div className="img" style={{position:"relative"}}>
                    <img src={loginuser} alt="loginuser" className="loginimg" />
                    <span className="online-img"></span>

                </div>
                <h4> {username} </h4>

            </div>
            <div className="serarch">
                <input type="text" className="searchMembers" placeholder="search" value={searchvalue} onChange={(e)=>setsearchvalue(e.target.value)}></input>
                <CiSearch  className="searchicon" onClick={()=>handlesearch(searchvalue)}/>
            </div>
            <div className="Members">
                <p>Community member</p>
                {members.map((member, index) => {
                const isonline = onlinemember.some((e) => e.name === member.name);

                    const isme= member.name==username
                    
                    return (

                        <>
                            <div className={isme? "Member isme" :"Member"} key={index}>
                                <div style={{position:"relative"}}>
                                <img src={member.img === null ? loginuser : member.img} alt="" />
                                {isonline && (
                                    <span className="online"></span>
                                )}

                                </div>
                           
                                
                                <h3>{member.name}</h3>
                                {isme && (
                                    <span className="me" style={{color:'#777'}}>
                                        (me)

                                    </span>
                                )}
                            

                </div>
                        </>
                    )
                })}
              
          

        </div>
  

        </div>
    )
}