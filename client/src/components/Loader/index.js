import React from 'react';

import './index.scss';

export default function Loader(props) {
  return (
    <div className="loader">
      <div className="loader__figure"></div>
      {!props.label ? null : <p className="loader__label">Prepcha</p>}
    </div>
  );
}