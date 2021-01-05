import React from 'react';
import HeaderBar from './header_bar';
import {Container} from 'semantic-ui-react';

function CommonLayout(props){
  return (
    <Container>
        <link
      rel="stylesheet"
      href="//cdn.jsdelivr.net/npm/semantic-ui@2.0.1/dist/semantic.min.css"
    />
      <HeaderBar />
      {props.children}
    </Container>
  );
}


export default CommonLayout;
