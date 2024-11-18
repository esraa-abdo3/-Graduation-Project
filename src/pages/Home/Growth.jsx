
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './Growth.css';
import g from "../../assets/growth.webp";
import babygrowth from "../../assets/babygrowth.webp";
import grothy from "../../assets/ruler (1).webp";
import feet from "../../assets/feet (1).webp";

export default function Growth() {
  return (
    <div className='growth'>
    
      <LazyLoadImage 
        src={feet} 
        alt="img" 
        className='feetGrowth' 
        effect="blur" 
      />
    
      <div className='cont'>
        <div className='title-home'>
          <div className='flex'>
            {/* Lazy loading مع تأثير الفيد */}
            <LazyLoadImage 
              src={g} 
              alt="Growth image" 
              className='g' 
              loading='lazy' 
              effect="fade" 
            />
            <h2>Baby Growth</h2>
          </div>
         
          <div className='growthtext'>
            <p>We know how important your child's development is. We're here to provide you with helpful insights. Our goal is to support you at every stage of their growth.</p>
            <div className='btnex'>
              <button className="btn-explore">Explore Now</button>
            </div>
          </div>
        </div>

        <div className='card-growth'>
          <div className='right'>
            {/* Lazy loading مع تأثير البلور */}
            <LazyLoadImage 
              src={grothy} 
              alt="Growth ruler" 
              className='grothy' 
              effect="blur" 
            />
            <div className='growthimgs'>
              {/* Lazy loading مع تأثير الفيد */}
              <LazyLoadImage 
                src={babygrowth} 
                alt="Baby Growth" 
                loading='lazy' 
                effect="fade" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
