import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie";

export default function Allusers() {
     const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [users, setusers] = useState([])
    const[Loading,setLoading]=useState(false)
    
    //first get all users
    useEffect(() => {
        async function getallusers() {
            try {
                const response = await axios.get('https://carenest-serverside.vercel.app/users/all', {
                    headers: {
                        "Authorization": `${gettoken}`
                    }
                });
              setusers(response.data.data)
                setLoading(false);
            } catch (error) {
                console.log("Error fetching babies:", error);
                setLoading(false);
            }
        }
        if (gettoken) {
            getallusers();
        }
    }, [gettoken]);
//     const usertables = users.map((e => {
//         return (
//             <table>
                
//           </table>
//       )
//   }))

    return (
        <div className="Allusers">
            <table>
            <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
</table>
        </div>
    )
}