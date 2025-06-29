import React, { useEffect, useState } from 'react'
import Cookies from "universal-cookie";
import './Users.css'
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default function Users() {
    const [searchTerm, setSearchTerm] = useState("");
    const [result , setResult] = useState('');
    const [users,setUsers] =useState([]);
    const [dataAge,setDataAge] =useState([]);
    const [loading, setLoading] = useState(true);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
    );

    const cookie= new Cookies();
    const gettoken = cookie.get('Bearer');


    const getUsersDash= async()=>{
        try{
            const res=await axios.get('https://carenest-serverside.vercel.app/dashboard/users',{
            headers: {
                        Authorization: `${gettoken}`,
                    }
        })
        console.log(res.data.data)
        console.log(res.data.results)
        setResult(res.data.results);
        setUsers(res.data.data)
        }catch(err){
            console.log('Failed to get users!');
        }finally {
        setLoading(false);
        }
    }
    useEffect(()=>{
        getUsersDash();
        getDataGraph();
    },[])

    // const getDataGraph = async ()=>{
    //     try{
    //         const res = await axios.get('https://carenest-serverside.vercel.app/dashboard/age-distribution',{
    //             headers: {
    //                     Authorization: `${gettoken}`,
    //                 }
    //         })
    //         setDataAge(res.data);
    //         console.log(res.data)
    //     }catch(err){
    //         console.error('Failed to get data Age!');
    //         console.log(err)
    //     }
    // }


    
     const getDataGraph = async () => {
        try {
            const res = await axios.get('https://carenest-serverside.vercel.app/dashboard/age-distribution', {
                headers: {
                    Authorization: `${gettoken}`,
                },
            });

            const ageGroups = [
                "18-19", "20-21", "22-23", "24-25",
                "26-27", "28-29", "30-31", "32-33", "34-35",
                "36-37", "38-39", '+40'
            ];

            const getAgeGroup = (age) => {
                for (let group of ageGroups) {
                    const [min, max] = group.split("-").map(Number);
                    if (age >= min && age <= max) return group;
                }
                return null;
            };

            const grouped = {};
            res.data.forEach(({ age, count }) => {
                const group = getAgeGroup(age);
                if (group) {
                    grouped[group] = (grouped[group] || 0) + count;
                }
            });

            const finalData = ageGroups.map(group => ({
                age: group,
                count: grouped[group] || 0,
            }));
            finalData.unshift({ age: "", count:null });

            setDataAge(finalData);
        } catch (err) {
            console.error('Failed to get age data!');
        }
    };
    

  return (
    <div className='userDash'>
        <div className='tableUser'>
            <div className='titleUsers'>
                <h3>Users ({result})</h3>
                <div className='boxSearch'>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                type="text"
                placeholder="Search for name or email"
                className="voiceSearch"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
        </div>
            </div>
            <div className='tableWrapper'>
                <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Number of Baby</th>
                        <th>Number of baby’s cries</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
    [...Array(6)].map((_, i) => (
      <tr key={i} className="skeleton-row">
        {[...Array(6)].map((_, j) => (
          <td key={j}>
            <div className="skeleton-cell"></div>
          </td>
        ))}
      </tr>
    ))
                ) : (
                    paginatedUsers.map((user) => (
                        <tr key={user._id}>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.age?user.age:"-"}</td>
                            <td>{user.numberOfBabies}</td>
                            <td>{user.numberOfCries}</td>
                        <td>
                        {user.isActive ? (
                        <button className='btnTrueActive'>True</button>
                        ) : (
                        <button className='btnFalseActive'>False</button>
                        )}
                        </td>
                        </tr>
                    ))
                )}
            </tbody>
                </table>
            </div>
            <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "activePage" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
            </div>
        </div>


        <div className='graphUser'>
            <h3>Age Statistics</h3>
            <div style={{ width: '100%', height: 350 ,padding:'10px 0',paddingRight:'25px' ,boxShadow:'0px 2px 12px rgba(0, 0, 0, 0.23)',borderRadius:'15px'}}>
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataAge}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" scale="point" />
                <YAxis />
                <Tooltip />
                <Line type="catmullRom" dataKey="count" stroke="#0A6AA6"  strokeWidth={1.5} />
                </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  )
}
