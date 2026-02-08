import React from 'react';

export const MapWidget = () => {
    return (
        <div className="widget-card map-widget">
            <h3>Bali, Indonesia</h3>
            <div className="map-placeholder">
                [Interactive Map Placeholder]
            </div>
            <style jsx>{`
        .widget-card { background: var(--bg-card); padding: 1rem; border-radius: var(--radius-lg); width: 100%; box-shadow: var(--shadow-md); }
        .map-placeholder { background: #2a303c; height: 200px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: var(--text-secondary); margin-top: 1rem; }
      `}</style>
        </div>
    );
};

export const BudgetBreakdown = () => {
    return (
        <div className="widget-card">
            <h3>Estimated Budget</h3>
            <div className="budget-item">
                <span>Flights</span>
                <span>$850</span>
            </div>
            <div className="budget-item">
                <span>Accommodation</span>
                <span>$600</span>
            </div>
            <div className="budget-item total">
                <span>Total</span>
                <span>$1,450</span>
            </div>
            <style jsx>{`
        .widget-card { background: var(--bg-card); padding: 1rem; border-radius: var(--radius-lg); width: 100%; box-shadow: var(--shadow-md); }
        .budget-item { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); }
        .budget-item.total { font-weight: bold; border-top: 1px solid var(--text-primary); border-bottom: none; margin-top: 0.5rem; pt: 0.5rem; color: var(--success); }
      `}</style>
        </div>
    );
};

export const FlightCard = () => {
    return (
        <div className="widget-card">
            <h3>Flight Options</h3>
            <div className="flight-option">
                <div className="airline-logo">SQ</div>
                <div className="route">NYC ➔ DPS</div>
                <div className="price">$850</div>
            </div>
            <style jsx>{`
        .widget-card { background: var(--bg-card); padding: 1rem; border-radius: var(--radius-lg); width: 100%; box-shadow: var(--shadow-md); }
        .flight-option { display: flex; align-items: center; justify-content: space-between; background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); margin-top: 0.5rem; }
        .airline-logo { width: 32px; height: 32px; background: white; color: black; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8rem; }
        .price { color: var(--accent-color); font-weight: bold; }
      `}</style>
        </div>
    );
}
