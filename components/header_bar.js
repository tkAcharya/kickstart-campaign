import React , {Component} from 'react';
import {Menu} from 'semantic-ui-react';


function HeaderBar () {
  return (
    <Menu style = {{marginTop: '10px'}}>
      <Menu.Item>
            CrowdCoin
      </Menu.Item>


      <Menu.Menu position="right">
          <Menu.Item>
                Campaigns
          </Menu.Item>
      </Menu.Menu>

      <Menu.Item>
            +
      </Menu.Item>
    </Menu>
  );
}


export default HeaderBar;
