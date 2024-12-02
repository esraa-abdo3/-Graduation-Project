
// import axios from "axios";
// import { useEffect, useState } from "react"
// import Cookies from "universal-cookie";
// import "./Myaccount.css"
// import ProfileNav from "../../../../Componets/profilenav/ProfileNav";
// import NextNavbar from "../../../../Componets/NextNavbar/NextNavbar";
// import { GrFormEdit } from "react-icons/gr";

// export default function Myaccount() {
//     const [mamyinfo, setmamyinfo] = useState(null);
//     console.log(mamyinfo)
//     const cookie = new Cookies();
//     const gettoken = cookie.get("Bearer");
    
//     /**first get the mamydetalis */
//     useEffect(() => {
//         async function getmamydetalis() {
//             try {
//                 let res = await axios.get("https://carenest-serverside.vercel.app/users/getMe", {
//                     headers: {
//                         Authorization: `${gettoken}`
//                     }
//                 })
//                 console.log(res.data.data)
//                 setmamyinfo(res.data.data); // لا تستخدم مصفوفة هنا، مباشرة تعيين الكائن
//             }
//             catch (error) {
//                 console.log(error)
//             }
//         }
//         getmamydetalis();
//     }, [gettoken]);

//     /** then handle change  */
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setmamyinfo({ ...mamyinfo, [name]: value });
//     };

//     // // تأكد من أن mamyinfo ليست null قبل عرض البيانات
//     // if (!mamyinfo) {
//     //     return <div>Loading...</div>; // يمكن أن تظهر رسالة تحميل أثناء جلب البيانات
//     // }
//     /** then update the date */
//     // async function updatemamysetiings() {
//     //     try {
//     //         let res = await axios.get(`https://carenest-serverside.vercel.app/users/updateMe`, {
//     //             headers: {
//     //                 Authorization :`${gettoken}`
//     //             }
//     //         })
            
//     //     }
//     //     catch (error) {
//     //         console.log(error)
//     //     }
        
//     // }
//     return (
//         <>
//             <ProfileNav />
//             <NextNavbar />
//             <div className="account-settings">
//                 <div className="main-header">
//                     <h2>account settings</h2>
//                 </div>
//                 <div className="basic-info">
//                     <h3>basic info</h3>
//                     <div className="firstname">
//                         <label>first name</label>
//                         <p style={{ display: "flex" }}>
//                             <input id="firstname" type="text" value={mamyinfo.firstName} name="firstName" onChange={handleChange} />
//                             <label htmlFor="firstname">
//                                 <GrFormEdit style={{ color: "#8ec3e1", fontSize: "24px" }} />
//                             </label>
//                         </p>
//                     </div>
//                     <div className="lastname">
//                         <label>last name</label>
//                         <p style={{ display: "flex" }}>
//                             <input id="lastname" type="text" value={mamyinfo.lastName} name="lastName" onChange={handleChange} />
//                             <label htmlFor="lastname">
//                                 <GrFormEdit style={{ color: "#8ec3e1", fontSize: "24px" }} />
//                             </label>
//                         </p>
//                     </div>
//                     <div className="dateb">
//                         <label>date of birth</label>
//                         <p style={{ display: "flex" }}>
//                             <input id="dateofbirth" className="datee" type="date" value={new Date(mamyinfo.BirthDay).toISOString().split('T')[0]} name="BirthDay" onChange={handleChange} />
//                             <label htmlFor="dateofbirth">
//                                 <GrFormEdit style={{ color: "#8ec3e1", fontSize: "24px" }} />
//                             </label>
//                         </p>
//                     </div>
//                     <div className="email">
//                         <label>email</label>
//                         <input type="email" value={mamyinfo.Email} disabled />
//                     </div>
//                 </div>
//                 <div className="account-info">
//                     <h3>account info</h3>
//                     <div className="email">
//                         <label>email</label>
//                         <input type="email" value={mamyinfo.Email} disabled />
//                     </div>
//                     <div className="password-account">
//                         <label>password</label>
//                         <input type="password" value={mamyinfo.password} disabled />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
// import axios from "axios";
// import { useEffect, useState } from "react"
// import Cookies from "universal-cookie";
// import "./Myaccount.css"
// import ProfileNav from "../../../../Componets/profilenav/ProfileNav";
// import NextNavbar from "../../../../Componets/NextNavbar/NextNavbar";
// import { GrFormEdit } from "react-icons/gr";

// export default function Myaccount() {
//     const [mamyinfo, setmamyinfo] = useState({
//         firstName: "",
//         lastName: "",
//         Email: "",
//         dateOfBirthOfMam:"",
//     });
//     const [updateData, setupdatwData] = useState({
//         name: "",
//         weight: "",
//         height: "",
//         dateOfBirthOfBaby: "",
//         ...mamyinfo,
//     });
//     console.log(mamyinfo)
//     const cookie = new Cookies();
//     const gettoken = cookie.get("Bearer");
    
//     /**first get the mamydetalis */
//     useEffect(() => {
//         async function getmamydetalis() {
//             try {
//                 let res = await axios.get("https://carenest-serverside.vercel.app/users/getMe", {
//                     headers: {
//                         Authorization: `${gettoken}`
//                     }
//                 })
//                 console.log(res.data.data)
//                 setmamyinfo({
//                     firstName: res.data.data.firstName,
//                     lastName: res.data.data.lastName,
//                     dateOfBirthOfMam: res.data.data.BirthDay,
//                     Email:res.data.data.Email,
//                 });
//             }
//             catch (error) {
//                 console.log(error)
//             }
//         }
//         getmamydetalis();
//     }, [gettoken]);

//     /**handle change  */
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setupdatwData({ ...updateData, [name]: value }); // تحديث الكائن بدون تغيير المصفوفة
//     };
//     /**then check validation */
    
//     function validateForm() {
//         const errors = {};
        
//        //1- first name
//         if (!mamyinfo.firstName) {
//             errors.firstName = "first name required";
//         } else if (mamyinfo.firstName.length < 3) {
//             errors.firstName = "first name must be at least 3 characters long";
//         } else if (!/^[A-Za-z]+$/.test(mamyinfo.firstName)) {
//             errors.firstName = "firstname should only contain English letters";
//         }
        
//            //2- last name
//         if (mamyinfo.lastName) {
//             errors.lastName = "last name required";
//         } else if (mamyinfo.lastName.length < 3) {
//             errors.lastName = "last name must be at least 3 characters long";
//         } else if (!/^[A-Za-z]+$/.test(mamyinfo.lastName)) {
//             errors.lastName = "lastname should only contain English letters";
//         }
        
//         // 3-email
//         if (!mamyinfo.Email) {
//             errors.Email = "Email required";
//         } else if (!/^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/.test(mamyinfo.Email)) {
//             errors.Email = "email must start with a character, match the '@' symbol, and end with 'gmail.com'";
//         }
//         // date
//         if (!mamyinfo.dateOfBirthOfMam) {
//             errors.dateOfBirthOfMam = "Date of birth is required";
//         } else if (!/^\d{4}-\d{2}-\d{2}$/.test(mamyinfo.dateOfBirthOfMam)) {
//             errors.dateOfBirthOfMam = "Invalid date format. Use YYYY-MM-DD";
//         } else if (new Date(mamyinfo.dateOfBirthOfMam) >= new Date()) {
//             errors.dateOfBirthOfMam = "Date of birth must be in the past";
//         }
    
//         return errors;
//     }
//     /** send the update value */
//     async function handleupdate() {
//         try {
//             let res = await axios.put("https://carenest-serverside.vercel.app/users/updateMe", updateData, {
//                 headers: {
//                     Authorization:`${gettoken}`
                    

//                 }
//             })
//             console.log(res)
//         }
//         catch (error) {
//             console.log(error)
//         }
//     }
//     console.log(updateData)
 

//     return (
//         <>
//             <ProfileNav />
//             <NextNavbar />
//             <div className="account-settings">
//                 <div className="main-header">
//                     <h2>account settings</h2>
//                     <button> save</button>
//                 </div>
//                 <div className="basic-info">
//                     <h3>basic info</h3>
//                     <form className="profile-settings-form">
//                     <div className="firstname">
//                         <label>first name</label>
//                         <p style={{ display: "flex" }}>
//                             <input id="firstname" type="text" value={mamyinfo.firstName} name="firstName" onChange={handleChange} />
//                             <label htmlFor="firstname">
//                                 <GrFormEdit style={{ color: "#8ec3e1", fontSize: "24px" }} />
//                             </label>
//                         </p>
//                     </div>
//                     <div className="lastname">
//                         <label>last name</label>
//                         <p style={{ display: "flex" }}>
//                             <input id="lastname" type="text" value={mamyinfo.lastName} name="lastName" onChange={handleChange} />
//                             <label htmlFor="lastname">
//                                 <GrFormEdit style={{ color: "#8ec3e1", fontSize: "24px" }} />
//                             </label>
//                         </p>
//                     </div>
//                     <div className="dateb">
//                         <label>date of birth</label>
//                         <p style={{ display: "flex" }}>
//                         <input
//   id="dateofbirth"
//   className="datee"
//   type="date"
//   value={mamyinfo.dateOfBirthOfMam ? new Date(mamyinfo.dateOfBirthOfMam).toISOString().split('T')[0] : ""}
//   name="dateOfBirthOfMam"
//   onChange={handleChange}
// />



//                             <label htmlFor="dateofbirth">
//                                 <GrFormEdit style={{ color: "#8ec3e1", fontSize: "24px" }} />
//                             </label>
//                         </p>
//                         </div>
//                         </form>
//                     <div className="email">
//                         <label>email</label>
//                         <input type="email" value={mamyinfo.Email} disabled  />
//                     </div>
//                 </div>
//                 <div className="account-info">
//                     <h3>account info</h3>
//                     <div className="email">
//                         <label>email</label>
//                         <input type="email" value={mamyinfo.Email} disabled />
//                     </div>
//                     <div className="password-account">
//                         <label>password</label>
//                         <input type="password" value={mamyinfo.password} disabled />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
import axios from "axios";
import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
import "./Myaccount.css"
import ProfileNav from "../../../Componets/profilenav/ProfileNav";
import NextNavbar from "../../../Componets/NextNavbar/NextNavbar";
import { GrFormEdit } from "react-icons/gr";

export default function Myaccount() {
    const [mamyinfo, setmamyinfo] = useState({
        firstName: "",
        lastName: "",
        Email: "",
        dateOfBirthOfMam: "",
    }); 
    const [updateData, setupdatwData] = useState({
        name: "",
        weight: "",
        height: "",
        dateOfBirthOfBaby: "",
        ...mamyinfo,
    });
    console.log(mamyinfo);
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    
    /**first get the mamydetalis */
    useEffect(() => {
        async function getmamydetalis() {
            try {
                let res = await axios.get("https://carenest-serverside.vercel.app/users/getMe", {
                    headers: {
                        Authorization: `${gettoken}`
                    }
                })
                console.log(res.data.data)
                const updatedMamyInfo = {
                    firstName: res.data.data.firstName,
                    lastName: res.data.data.lastName,
                    dateOfBirthOfMam: res.data.data.BirthDay,
                    Email: res.data.data.Email,
                };
                setmamyinfo(updatedMamyInfo); 
                // Also update updateData to reflect these values
                setupdatwData(prevState => ({
                    ...prevState,
                    ...updatedMamyInfo
                }));
            }
            catch (error) {
                console.log(error)
            }
        }
        getmamydetalis();
    }, [gettoken]);

    /**handle change */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setupdatwData(prevState => ({
            ...prevState,
            [name]: value
        })); 
    };

    /** send the update value */
    async function handleupdate() {
        try {
            let res = await axios.put("https://carenest-serverside.vercel.app/users/updateMe", updateData, {
                headers: {
                    Authorization:`${gettoken}`
                }
            });
            console.log(res);
        }
        catch (error) {
            console.log(error);
        }
    }

    console.log(updateData);

    return (
        <>
            <ProfileNav />
            <NextNavbar />
            <div className="account-settings">
                <div className="main-header">
                    <h2>account settings</h2>
                    <button onClick={handleupdate}>Save</button>
                </div>
                <div className="basic-info">
                    <h3>basic info</h3>
                    <form className="profile-settings-form">
                        <div className="firstname">
                            <label>first name</label>
                            <p style={{ display: "flex" }}>
                                <input
                                    id="firstname"
                                    type="text"
                                    value={updateData.firstName}
                                    name="firstName"
                                    onChange={handleChange}
                                />
                                <label htmlFor="firstname">
                                    <GrFormEdit style={{ color: "#8ec3e1", fontSize: "24px" }} />
                                </label>
                            </p>
                        </div>
                        <div className="lastname">
                            <label>last name</label>
                            <p style={{ display: "flex" }}>
                                <input
                                    id="lastname"
                                    type="text"
                                    value={updateData.lastName}
                                    name="lastName"
                                    onChange={handleChange}
                                />
                                <label htmlFor="lastname">
                                    <GrFormEdit style={{ color: "#8ec3e1", fontSize: "24px" }} />
                                </label>
                            </p>
                        </div>
                        <div className="dateb">
                            <label>date of birth</label>
                            <p style={{ display: "flex" }}>
                                <input
                                    id="dateofbirth"
                                    className="datee"
                                    type="date"
                                    value={updateData.dateOfBirthOfMam ? new Date(updateData.dateOfBirthOfMam).toISOString().split('T')[0] : ""}
                                    name="dateOfBirthOfMam"
                                    onChange={handleChange}
                                />
                                <label htmlFor="dateofbirth">
                                    <GrFormEdit style={{ color: "#8ec3e1", fontSize: "24px" }} />
                                </label>
                            </p>
                        </div>
                    </form>
                    <div className="email">
                        <label>email</label>
                        <input type="email" value={mamyinfo.Email} disabled />
                    </div>
                </div>
                <div className="account-info">
                    <h3>account info</h3>
                    <div className="email">
                        <label>email</label>
                         <input type="email" value={mamyinfo.Email} disabled />
                     </div>
                     <div className="password-account">
                         <label>password</label>
                        <input type="password" value={mamyinfo.password} disabled />                     </div>
                            </div>
                </div>
          
        </>
    );
}


