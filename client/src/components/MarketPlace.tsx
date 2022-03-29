import React from 'react';

const MarketPlace = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                <h1>Marketplace</h1>
                <p>Check out the offerings below and make a purchase!</p>
            </div>
            <section
                style={{
                    marginTop: '20px',
                    paddingTop: '50px',
                    width: '90vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    borderTop: '2px blue solid',
                }}
            >
                <div style={{ border: '2px blue solid', height: '500px', width: '300px' }}></div>
            </section>
        </div>
    );
};

export default MarketPlace;
