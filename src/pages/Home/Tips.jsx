
import { LazyLoadImage } from 'react-lazy-load-image-component'; 
import tipsImg from "../../assets/tipsmamy.webp";
import lamp from "../../assets/lamp.webp";
import books from "../../assets/books.webp";
import openBook from "../../assets/open book.webp";
import "./Tips.css";

export default function Tips() {
  return (
    <div className='tips'>
        <div className='cont'>
            <div>
               
                <LazyLoadImage src={tipsImg} alt="Tips Image" className='tipsimg' loading='lazy' effect='fade'/>
                <LazyLoadImage src={lamp} alt="Lamp Image" className='lampimg' loading='lazy' effect='fade'/>
                <LazyLoadImage src={books} alt="Books Image" className='bookimg' loading='lazy' effect='fade'/>
                
                <div className='tipstext'>
                    <h2>Mamay Tips</h2>
                    <p>We offer helpful tips for mothers on how to care for their babies, addressing everything from feeding and sleep routines to soothing techniques and developmental milestones.</p>
                    <button className="btn-explore">Explore Now</button> 
                </div>
                
                <LazyLoadImage src={openBook} alt="Open Book Image" className='openbookimg' loading='lazy' effect='fade'/>
            </div>
        </div>
    </div>
  );
}
