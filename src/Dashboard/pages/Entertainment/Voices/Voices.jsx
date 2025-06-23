import React, { useEffect, useState } from 'react';
import './Voices.css';
import axios from 'axios';
import Cookies from "universal-cookie";
import zzz from '../../../../assets/zzz.png'
import AddVoiceModal from './AddVoiceModal';


export default function Voices() {
  const [voices, setVoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [audioObj, setAudioObj] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [voiceToDelete, setVoiceToDelete] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const cookie = new Cookies();
  const gettoken = cookie.get('Bearer');

  
  const filteredVoices = voices.filter(voice =>
    voice.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  
  const totalPages = Math.ceil(filteredVoices.length / itemsPerPage);
  const paginatedVoices = filteredVoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  
  const playAudio = (index) => {
    if (audioObj) {
      audioObj.pause();
      if (currentPlaying === index) {
        setCurrentPlaying(null);
        return;
      }
    }

    const audio = new Audio(voices[index].audio);
    setAudioObj(audio);
    setCurrentPlaying(index);

    audio.addEventListener("timeupdate", () => {
      const percentage = (audio.currentTime / audio.duration) * 100;
      setProgress(percentage);
    });

    audio.play();
  };

  const handleDeleteVoice = async (id) => {
    try{
        const res =await axios.delete(`https://carenest-serverside.vercel.app/relaxSounds/${id}`,{
            headers: {
                Authorization: `${gettoken}`
            }
        })
        console.log('Voice is deleted');
        getallVoices();
    }catch(err){
        console.log('error=>',err)
    }
  }
  
  const getallVoices = async () => {
    try {
      const res = await axios.get('https://carenest-serverside.vercel.app/relaxSounds/?limit=19', {
        headers: {
          Authorization: `${gettoken}`
        }
      });
      setVoices(res.data.data);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  useEffect(() => {
    getallVoices();
  }, []);

  return (
    <div className='VoicesDash'>
      <div className='voicesBox1'>
        <h3>Sweet sleep</h3>
        <div className='boxSearch'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
            type="text"
            placeholder="Search for Sweet Sleep's title"
            className="voiceSearch"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <button className='add-new' onClick={() => setIsAddOpen(true)}>Add new sweet sleep</button>
        <AddVoiceModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} getallVoices={getallVoices} />
      </div>

      <div className="voicesBox2">
        {paginatedVoices.map((voice, index) => {
          const realIndex = (currentPage - 1) * itemsPerPage + index;
          return (
            <div className="voiceItem" key={realIndex}>
              <button onClick={() => playAudio(realIndex)}>
                {currentPlaying === realIndex ? <i className="fa-solid fa-pause"></i> :<i className="fa-solid fa-play"></i>}
              </button>
              <div className='nVp'>
              <p className="voiceTitle">{voice.name}</p>
              {currentPlaying === realIndex && (
                  <div className="progressBar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                  </div>
                )}
              </div>
              <img className="sleepIcon" src={zzz}/>
              <button className="deleteBtn" onClick={()=>{
                setVoiceToDelete(voice._id)
                setShowConfirmPopup(true)
                }}>
                    <i className="fa-solid fa-trash"></i></button>
            </div>
          );
        })}
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



{showConfirmPopup && (
  <div className="popup-overlay">
    <div className="popup-box">
      <p>Are you sure to delete audio?</p>
      <div className="popup-buttons">
        <button className='cancelDel' onClick={() => setShowConfirmPopup(false)}>Cancel</button>
        <button
        className='confirmDel'
          onClick={() => {
            handleDeleteVoice(voiceToDelete);
            setShowConfirmPopup(false);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
