import React from 'react';
import './CareNestInsights.css';
import insightsImg from '../../assets/chart.png';

const CareNestInsights = () => {
  return (
    <div className="insights-container">
      <div className="insights-content">
        <h1>CareNest Insights</h1>
        <p>
          Welcome to CareNest Insights! Here, we share the latest articles, research, and tips on motherhood, child health, and parenting. Our team of experts and mothers is dedicated to providing you with rich, reliable content to help you make better decisions for your family. Discover the latest in motherhood and follow our analysis on the topics that matter most to you.
        </p>
      </div>
      <div className="insights-image">
        <img src={insightsImg} alt="CareNest Insights" />
      </div>
    </div>
  );
};

export default CareNestInsights; 