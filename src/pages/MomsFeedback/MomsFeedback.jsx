import  { useEffect, useState } from 'react';
import './MomsFeedback.css';
import Footer from "../../Componets/Footer/Footer"
import Mainnavbar from "../../Componets/mainhomeprofile/Mainnavbar"
import userimage from "../../assets/userprofile.jpg"
import Cookies from "universal-cookie";
const FEEDBACK_API = 'https://carenest-serverside.vercel.app/feedback';
import Navbar from "../../Componets/Navbar/Navbar"

const MomsFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const cookie = new Cookies();
  const gettoken = cookie.get('Bearer');

  useEffect(() => {
    fetch(FEEDBACK_API)
      .then(res => res.json())
      .then(data => {
        setFeedbacks(data.feedbacks || []);
        setStats(data.stats || null);
        setLoading(false);
      });
  }, [submitSuccess]);

  const handleAddFeedback = () => {
    if (!gettoken) {
      window.location.href = '/Auth/Login';
      return;
    }
    setShowModal(true);
    setRating(0);
    setTitle("");
    setSubmitError("");
    setSubmitSuccess("");
  };

  const handleSubmit = async () => {
    if (rating < 1) {
      setSubmitError("Please select a rating.");
      return;
    }
    setSubmitLoading(true);
    setSubmitError("");
    setSubmitSuccess("");
    try {
      const res = await fetch(FEEDBACK_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': gettoken
        },
        body: JSON.stringify({ title, ratings: rating })
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.message || 'Failed to submit feedback.');
      } else {
        setSubmitSuccess('Thank you for your feedback!');
        setShowModal(false);
        setTimeout(() => setSubmitSuccess(''), 2000);
      }
    } catch (err) {
      setSubmitError('Something went wrong.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
  {gettoken ?   <Mainnavbar /> :<Navbar />}
      <div className="feedback-container">
        <h1 className="feedback-title">Moms Feedback</h1>
        <button className="add-feedback-btn" onClick={handleAddFeedback}>Add Feedback</button>
        <p className="feedback-intro">
          We are happy that you used our application! Your feedback means a lot to us. If your experience was positive, we are proud. If not, we are always here to improve and support you.
        </p>
        {stats && (
          <div className="feedback-stats">
            <div><b style={{fontWeight:"500"}}>Average Rating:</b> {stats.averageRating} / 5</div>
            <div><b style={{fontWeight:"500"}}>Rating Percentage:</b> {stats.percentage}</div>
            <div><b style={{fontWeight:"500"}}>Total Feedbacks:</b> {stats.totalReports}</div>
          </div>
        )}
        {loading ? (
          <>
            <div className='Loaderstates'></div>
            <div className='feedbacksloader'>
              <div></div><div></div><div></div>
            </div>
          </>
        ) : (
          <div className="feedback-list">
            {feedbacks.map(fb => (
              <div className="feedback-card" key={fb._id}>
                <div className="feedback-user">
                  <img src={fb.user?.image || userimage} alt={fb.user?.firstName} />
                  <div>
                    <div className="feedback-name">{fb.user?.firstName} {fb.user?.lastName}</div>
                    <div className="feedback-rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < fb.ratings ? 'star filled' : 'star'}>&#9733;</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="feedback-content">
                  <div className="feedback-title-text">{fb.title}</div>
                  <div className="feedback-date">{new Date(fb.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-box feedback-modal">
              <button className="close-button visible-x" onClick={() => setShowModal(false)}>
                <span aria-label="Close" style={{fontSize: '2rem', color: '#d32f2f', fontWeight: 'bold', lineHeight: 1}}>&times;</span>
              </button>
              <h2 className="modal-title">Add Your Feedback</h2>
              <div className="modal-form">
                <div className="feedback-rating-input">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={i < (hoverRating || rating) ? 'star filled' : 'star'}
                      style={{ fontSize: '2rem', cursor: 'pointer' }}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(i + 1)}
                    >&#9733;</span>
                  ))}
                </div>
                <input
                  className="feedback-title-input"
                  type="text"
                  placeholder="Write your feedback (optional)"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  maxLength={100}
                />
                {submitError && <div className="feedback-error">{submitError}</div>}
                {submitSuccess && <div className="feedback-success">{submitSuccess}</div>}
                <div className="feedback-modal-btns">
               
                       <button className="cancel-feedback-btn" onClick={() => setShowModal(false)} disabled={submitLoading}>
                    Cancel
                    </button>
                       <button className="add-feedback-btn" onClick={handleSubmit} disabled={submitLoading}>
                    {submitLoading ? <div className="spinner-small"></div> : 'Submit'}
                  </button>
               
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default MomsFeedback; 