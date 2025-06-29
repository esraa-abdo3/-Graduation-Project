
import { useEffect, useState } from 'react';
import './videos.css';
import Cookies from "universal-cookie";
import axios from 'axios';
import Mainnavbar from "../../../../Componets/mainhomeprofile/Mainnavbar";
import imgbg from '../../../../assets/vi2.png'
import imgbg2 from '../../../../assets/vi.png'

export default function Videos() {
    const cookie = new Cookies();
    const gettoken = cookie.get('Bearer');
    const [channels, setChannels] = useState([]);
    const [videos, setVideos] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                    
                    // Fetch videos of the first channel
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

        fetchData();
    }, []);

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

    return (
        <div className='videoPage'>
            <Mainnavbar />

            <div className='bg-imges'>
                <div className='imgbg2'>
                    <img src={imgbg2} alt="img" />
                </div>
                <div className='titlevideo'>
                    <h3>Fun Videos</h3>
                    <p>for your baby</p>

                    <div className="videos-logo">
                        {/* {loading ? (
                            <>
                                <div className='channel-card-load'></div>
                                <div className='channel-card-load'></div>
                                <div className='channel-card-load'></div>
                                <div className='channel-card-load'></div>
                                <div className='channel-card-load'></div>
                            </>
                        ) : (
                            channels.map((channel) => (
                                <div
                                    key={channel._id}
                                    className={`channel-card ${selectedChannel === channel._id ? 'active' : ''}`}
                                    onClick={() => getChannelVideos(channel._id)}
                                >
                                    <img src={channel.logo} alt={channel.name} className="channel-logo" />
                                </div>
                            ))
                        )} */}
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
                </div>
                <div className='imgbg'>
                    <img src={imgbg} alt="img" />
                </div>
            </div>

            <div className="videos-container">
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
                        videos.map((video,index) => {
                            const videoId = video.url.split("v=")[1];
                            return (
                                <div key={video._id} className="video-card" onClick={() => setSelectedVideo(videoId)}
                                style={{ animationDelay: `${index * 0.2}s` }} >
                                    <img
                                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                        alt={video.name}
                                        className="video-thumbnail"
                                    />
                                    <h3>{video.name}</h3>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

