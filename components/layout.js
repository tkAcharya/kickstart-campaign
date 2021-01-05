import React from 'react';
import HeaderBar from './header_bar';
import {Container} from 'semantic-ui-react';

function CommonLayout(props){
  return (
    <Container>
      <HeaderBar />
      {props.children}
    </Container>
  );
}


export default CommonLayout;
