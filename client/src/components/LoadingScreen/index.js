import React from 'react';

import './index.scss';

export default function LoadingScreen() {
  return (
    <div className="loading--screen">
      <div className="loader">
        <div className="loader__figure"></div>
        <p className="loader__label">Tathagat</p>
      </div>
    </div>
  );
}