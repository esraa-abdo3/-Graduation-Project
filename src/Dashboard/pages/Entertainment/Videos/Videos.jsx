import  { useEffect, useState } from 'react'
import './Videos.css'
import Cookies from "universal-cookie";
import axios from 'axios';
import AddVideoModal from './AddVideoModal';
import AddChannel from './ِAddChannel';


export default function Videos() {
    const cookie = new Cookies();
    const gettoken = cookie.get('Bearer');
    const [channels, setChannels] = useState([]);
    const [videos, setVideos] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [videoToDelete, setVideoToDelete] = useState(null);
    const [ShowConfirmPopupChannel, setShowConfirmPopupChannel] = useState(false);

    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const filteredVideos = videos.filter(video =>
        video.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
    const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  

  const handleDeleteVideo = async (id) => {
    if (!selectedChannel || !id) {
        console.log("Missing channel ID or video ID");
        return;
    }
    try {
        const res = await axios.patch(`https://carenest-serverside.vercel.app/channels/${selectedChannel}/delete/${id}`,{}, {
            headers: {
                Authorization: `${gettoken}`
            }
        });
        console.log('Video is deleted');
        getChannelVideos(selectedChannel);
    } catch (err) {
        console.log('error=>', err.response?.data || err.message);
    }
}

    const handleDeleteChannel = async (id)=>{
        try{
            const res =await axios.delete(`https://carenest-serverside.vercel.app/channels/${id}`,{
                headers: {
                    Authorization: `${gettoken}`
                }
            })
            console.log('Channel is deleted');
            fetchData();
        }catch(err){
            console.log('error=>',err)
        }
    }

    const getChannelVideos = async (channelId) => {
        setLoading(true);
        try {
            const res = await axios.get(`https://carenest-serverside.vercel.app/channels/${channelId}`, {
                headers: { Authorization: `${gettoken}` },
            });
            setVideos(res.data.data.videos || []);
            setSelectedChannel(channelId);
            setSelectedVideo(null);
        } catch (err) {
            console.log('Failed to fetch videos', err);
        } finally {
            setLoading(false);
        }
    };
    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get('https://carenest-serverside.vercel.app/channels/?limit=19', {
                headers: { Authorization: `${gettoken}` },
            });
            
            setChannels(res.data.data);
            
            if (res.data.data.length > 0) {
                const firstChannelId = res.data.data[0]._id;
                setSelectedChannel(firstChannelId);
                
            
                 const videoRes = await axios.get(`https://carenest-serverside.vercel.app/channels/${firstChannelId}`, {
                     headers: { Authorization: `${gettoken}` },
                 });
                 setVideos(videoRes.data.data.videos || []);
             }
             setLoading(false);
        } catch (err) {
            console.log('Failed to fetch data', err);
            setLoading(false);
        }
    };
    
    console.log(selectedChannel)

    useEffect(() => {
            fetchData();
        }, []);









  return (
    <div className='DashVideos'>
    <h3 className='title'>Videos</h3>

        <div className="videos-logo">
        <i className="fa-solid fa-plus addchannel" onClick={openModal}></i>
        <AddChannel closeModal={closeModal} fetchData={fetchData} showModal={showModal}/> 
        {channels.length > 0 &&
    channels.map((channel) => (
        <div 
            key={channel._id} 
            className={`channel-card ${selectedChannel === channel._id ? 'active' : ''}`} 
        
            onClick={() => {
                setSelectedChannel(channel._id);
                getChannelVideos(channel._id);
            }}
        >
            <img src={channel.logo} alt={channel.name} className="channel-logo" />
        </div>
    ))
}
        </div>
        <div className="videos-container">
        <div className='voicesBox1'>
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
        <div className='btnadddell'>
        <button className='delChannel'
        onClick={()=>{
            setShowConfirmPopupChannel(true)
            }}
        >Delete Channel</button>
        <button  className='add-new' onClick={() => setIsAddOpen(true)}>Add new video</button>
        </div>
        <AddVideoModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} fetchData={fetchData} selectedChannel={selectedChannel}/>
      </div>

      

            {selectedVideo && (
                <div className="video-player">
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${selectedVideo}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            <div className="videos-cards">
                {loading ? (
                    <>
                        <div className='video-card-loading'></div>
                        <div className='video-card-loading'></div>
                        <div className='video-card-loading'></div>
                        <div className='video-card-loading'></div>
                        <div className='video-card-loading'></div>
                    </>
                ) : (
                    paginatedVideos.map((video, index) => {
                        const videoId = video.url.split("v=")[1]?.split("&")[0];

                        return (
                            <div key={video._id} className="video-card" onClick={() => setSelectedVideo(videoId)}
                                style={{ animationDelay: `${index * 0.2}s` }}>
                                <img
                                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                    alt={video.name}
                                    className="video-thumbnail"
                                />
                                <div className='dashDel'>
                                    <h3>{video.name}</h3>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            setVideoToDelete(video._id);
                                            setShowConfirmPopup(true);
                                        }}
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>


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
      <p>Are you sure to delete Video?</p>
      <div className="popup-buttons">
        <button className='cancelDel' onClick={() => setShowConfirmPopup(false)}>Cancel</button>
        <button
        className='confirmDel'
          onClick={() => {
            handleDeleteVideo(videoToDelete);
            setShowConfirmPopup(false);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
{ShowConfirmPopupChannel && (
  <div className="popup-overlay">
    <div className="popup-box">
      <p>Are you sure to delete Channel?</p>
      <div className="popup-buttons">
        <button className='cancelDel' onClick={() => setShowConfirmPopupChannel(false)}>Cancel</button>
        <button
        className='confirmDel'
          onClick={() => {
            handleDeleteChannel(selectedChannel);
            setShowConfirmPopupChannel(false);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  )
}
