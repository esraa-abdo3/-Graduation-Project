import "../AddPromocod/Addpromocode.css";
import reseticon from "../../../../../assets/Vectorreset.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { IoIosCloseCircle } from "react-icons/io";
import PropTypes from "prop-types"; 
Updatepromocode.propTypes = {
    codeid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default function Updatepromocode({ codeid, onClose }) { 
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [Form, setform] = useState({
        code: '',
        startAt: '',
        expireAt: '',
        value: '',
    });
    const [error, setErrors] = useState({});
    const [docid, setdocid] = useState(codeid);
    const[oldform, setoldform]=useState(null)
    useEffect(() => {
        getcodedetalis();
        
    },[codeid])
    async function getcodedetalis() {
        try {
            let res = await axios.get(`https://carenest-serverside.vercel.app/doctor/${codeid}/promocode`, {
                headers: {
                    Authorization: `${gettoken}`
                }
            });
            console.log(res)
            const codeDetalis = res.data.promocode
            setform({
                code: codeDetalis.code,
                startAt: formatDateToInput(codeDetalis.startAt) ||"",
                expireAt:formatDateToInput(codeDetalis.expireAt) ||"",
                value: codeDetalis.value||"",

            })
            setoldform(Form)
        
        }
        catch (error) {
            console.log(error)
        }
    
} 

    function handlechange(e) {
        const { name, value } = e.target;

        let filteredValue = value;

        if (name === "value") {
            filteredValue = value.replace(/[^0-9]/g, "");
        }

        const newForm = { ...Form, [name]: filteredValue };
        setform(newForm);
    }

    function validateForm() {
        const errors = {};

        if (!Form.code) {
            errors.code = "Code is required";
        }

        if (!Form.value) {
            errors.value = "Value is required";
        } else if (parseFloat(Form.value) <= 0) {
            errors.value = "Value must be a positive number";
        }

        if (!Form.startAt) {
            errors.startAt = "Start date is required";
        }

        if (!Form.expireAt) {
            errors.expireAt = "Expiration date is required";
        }

        if (Form.startAt && Form.expireAt) {
            const start = new Date(Form.startAt);
            const end = new Date(Form.expireAt);
            if (start >= end) {
                errors.date = "Start date must be earlier than expiration date";
            }
        }

        if (!docid) {
            errors.docid = "doctor id is required";
        }

        return errors;
    }

    async function handelUpdatepromocode(e) {
        e.preventDefault();
        const errorsafter = validateForm();
        if (Object.keys(errorsafter).length > 0) {
            setErrors(errorsafter);
            return;
        }
    
        const preparedForm = {
            ...Form,
            startAt: new Date(Form.startAt).toISOString(),
            expireAt: new Date(Form.expireAt).toISOString(),
            value: parseFloat(Form.value),
        };
    
        const preparedOldForm = {
            ...oldform,
            startAt: new Date(oldform.startAt).toISOString(),
            expireAt: new Date(oldform.expireAt).toISOString(),
            value: parseFloat(oldform.value),
        };
    
        const changedData = getChangedFields(preparedOldForm, preparedForm);
    
        if (Object.keys(changedData).length === 0) {
            alert("No changes detected");
            return;
        }
    
        console.log("Only sending changed data:", changedData);
    
        try {
            let res = await axios.put(  
                `https://carenest-serverside.vercel.app/doctor/${docid}/promocode`,
                changedData,
                {
                    headers: {
                        Authorization: `${gettoken}`,
                    },
                }
            );
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    
    function formatDateToInput(value) {
        if (!value) return "";
        const date = new Date(value);
        if (isNaN(date.getTime())) return "";
        return date.toISOString().split('T')[0]; 
    }
    
    function getChangedFields(oldData, newData) {
        const changes = {};
        for (const key in newData) {
            if (newData[key] !== oldData[key]) {
                changes[key] = newData[key];
            }
        }
        return changes;
    }
    function isValidDate(value) {
        const date = new Date(value);
        return !isNaN(date.getTime());
      }
      
    
    return (
        close && (
            <>
                <div className="Addpromo">
                    <div className="header">
                        <div>
                            <IoIosCloseCircle className="close" onClick={ onClose} />
                        </div>
                        <h2>Add new promocode</h2>
                    </div>

                    <form action="" onSubmit={handelUpdatepromocode}>
                        <div className="dates">
                            <div className="start">
                                <input
                                    type="date"
                                    style={{ padding: " 0 80px" }}
                                    onChange={handlechange}
                                    name="startAt"
                                    value={Form.startAt}
                                />
                                <p>start day :</p>
                                {error.startAt && <span className="error">{error.startAt}</span>}
                            </div>
                            <div className="end">
                                <input
                                    type="date"
                                    style={{ padding: " 0 80px" }}
                                    onChange={handlechange}
                                    name="expireAt"
                                    value={Form.expireAt}
                                />
                                <p>end day :</p>
                                {error.expireAt && <span className="error">{error.expireAt}</span>}
                            </div>
                        </div>
                        <div className="code">
                            <input
                                type="text"
                                placeholder="Abb75VNd"
                                style={{ padding: " 0 55px" }}
                                onChange={handlechange}
                                name="code"
                                value={Form.code}
                            />
                            <p>Code :</p>
                            {error.code && <span className="error">{error.code}</span>}
                        </div>
                        <div className="amount">
                            <input
                                type="text"
                                placeholder="EX:50%"
                                style={{ padding: " 0 135px" }}
                                onChange={handlechange}
                                name="value"
                                value={Form.value}
                            />
                            <p>Discount amount : </p>
                            {error.value && <span className="error">{error.value}</span>}
                        </div>

                        <div className="sendto">
                            <input
                                type="text"
                                placeholder="Ex:644c5ea7a05a3c3a7f90ab21"
                                value={docid}
                                onChange={(e) => setdocid(e.target.value)}
                            />
                            <p>send to :</p>
                            {error.docid && <span className="error">{error.docid}</span>}
                        </div>
                        <div className="buttons">
                            <button
                                className="reset"
                                onClick={() => {
                                    setform({ code: "", startAt: "", expireAt: "", value: "" });
                                    setdocid("");
                                    setErrors({});
                                }}
                            >
                                <img src={reseticon} alt="" />
                                <p className="restp">Reset all</p>
                            </button>
                            <button type="submit" className="submitcode">
                            Update
                            </button>
                        </div>
                    </form>
                </div>
            </>
        )
    );
}