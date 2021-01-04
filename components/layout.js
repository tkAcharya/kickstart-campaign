import React from 'react';

function CommonLayout(props){
  return (
    <div>
      <h1 />I am a header
      {props.children}
      <h2 />I am a footer
    </div>
  );
}


export default CommonLayout;
