// import axios from "axios";
// import { useState } from "react";
// import Cookies from "universal-cookie";
// import { useNavigate } from "react-router-dom";
// import "./Deleteme.css"

// export default function DeleteMe() {
//   const cookie = new Cookies();
//   const gettoken = cookie.get("Bearer");
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [confirmDelete, setConfirmDelete] = useState(false);
//   const [error, setError] = useState("");

//   async function handleDeleteMe() {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.delete("https://carenest-serverside.vercel.app/users/deleteMe", {
//         headers: {
//           Authorization: `Bearer ${gettoken}`
//         }
//       });

//       cookie.remove("Bearer");
//       navigate("/signup");
//     } catch (error) {
//       console.error(error);
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="deleteme">
//       <h2>Account Deletion</h2>
//       <p>We are sad to see you go, see you again!</p>

//       <div className="delete-button-container">
//         <button onClick={()=>setConfirmDelete(true)} disabled={loading}>
//         Delete account
//         </button>
//       </div>


//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// }
import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import './Deleteme.css'

export default function DeleteMe() {
  const cookie = new Cookies();
  const gettoken = cookie.get("Bearer");
  const navigate = useNavigate();

  const [loadingdelete, setLoadingDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState("");

  // 1 - عند الضغط على "Delete your account"
  function showDeleteConfirmation() {
    setConfirmDelete(true);
  }

  // 2 - لما المستخدم يضغط "No"
  function cancelDelete() {
    setConfirmDelete(false);
  }

  // 3 - لما المستخدم يضغط "Yes"
  async function handleDeleteConfirmed() {
    setLoadingDelete(true);
    setError("");

    try {
      await axios.delete("https://carenest-serverside.vercel.app/users/deleteMe", {
        headers: {
          Authorization: `Bearer ${gettoken}`
        }
      });

      // Remove token
      cookie.remove("Bearer");

      // Navigate to signup page
      navigate("/signup");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoadingDelete(false);
      setConfirmDelete(false);
    }
  }

  return (
    <div className="deleteme">
      <h2>Account Deletion</h2>
      <p>We are sad to see you go, see you again!</p>

      <div className="delete-button-container">
        <button onClick={showDeleteConfirmation}>
          Delete your account
        </button>
      </div>

  
      {confirmDelete && (
        <div className="confirmation-dialog show">
          <p>Are you sure you want to delete your account?</p>
          <div>
            <button onClick={handleDeleteConfirmed} className="delyes">
              {loadingdelete ? <div className="spinner-small"></div> : "Yes"}
            </button>
            <button onClick={cancelDelete} className="delno">No</button>
          </div>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

