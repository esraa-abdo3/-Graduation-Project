import { createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const BabyContext = createContext();

const BabyProvider = ({ children }) => {
  const cookie = new Cookies();
  const [allBabies, setAllBabies] = useState([]);
  const [activeBaby, setActiveBaby] = useState("Choose your little");
  const [activeBabyId, setActiveBabyId] = useState(null); 
  const [activebabyage, setactivebabyage] = useState("")
  const [activebabyweight, setactivebabyweight] = useState("");
  const[activebabyheight,setactivebabyheight]=useState("")
  

  const gettoken = cookie.get("Bearer");

  useEffect(() => {
    async function fetchBabies() {
      try {
        let res = await axios.get(
          "https://carenest-serverside.vercel.app/babies/allBabiesOfLoggedUser",
          {
            headers: {
              Authorization: `${gettoken}`,
            },
          }
        );

        setAllBabies(res.data.data);

        const getid = cookie.get("activebaby");

        if (getid === "all") {
          setActiveBaby("all babies");
          setActiveBabyId("all");
        } else if (!getid) {
          const lastBabyId = res.data.data[res.data.data.length - 1]._id;
          cookie.set("activebaby", lastBabyId);
          setActiveBabyId(lastBabyId);
          setActiveBaby(res.data.data[res.data.data.length - 1].name);
          setactivebabyage(res.data.data[res.data.data.length - 1].birthDay)
          setactivebabyweight(res.data.data[res.data.data.length - 1].weight)
          setactivebabyweight(res.data.data[res.data.data.length - 1].height)
        } else {
          const activeBabyData = res.data.data.find((baby) => baby._id === getid);
          if (activeBabyData) {
            setActiveBaby(activeBabyData.name);
            setactivebabyage(activeBabyData.birthDay)
            setactivebabyweight(activeBabyData.weight)
            setactivebabyheight(activeBabyData.height)
            setActiveBabyId(getid);
          }
        }

       
      } catch (error) {
        console.log("Error fetching babies:", error);
      
      }
    }

    fetchBabies();
  }, [gettoken]);

  const handleActiveBabyChange = async (id) => {
    cookie.set("activebaby", id);

    if (id === "all") {
      setActiveBaby("all babies");
      setActiveBabyId("all");
      return;
    }

    try {
      let response = await axios.get(
        `https://carenest-serverside.vercel.app/babies/${id}`,
        {
          headers: {
            Authorization: `${gettoken}`,
          },
        }
      );
      setActiveBaby(response.data.data.name);
      setActiveBabyId(id);
      setactivebabyage(response.data.data.birthDay)
      setactivebabyheight(response.data.data.height)
      setactivebabyweight(response.data.data.weight)
    } catch (err) {
      console.log("Error fetching baby details:", err);
    }
  };

  return (
    <BabyContext.Provider
      value={{
        allBabies,
        activeBaby,
        activeBabyId,
        activebabyage,
        activebabyheight,
        activebabyweight,
        handleActiveBabyChange,
      }}
    >
      {children}
    </BabyContext.Provider>
  );
};

export { BabyContext, BabyProvider };

