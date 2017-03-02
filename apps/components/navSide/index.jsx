import React from 'react';
import { Menu, Icon, Switch } from 'antd';
import Loginfo from './loginfo.jsx';

require('./index.css');

const SubMenu = Menu.SubMenu;
const $NAVIGATION = window.$GLOBALCONFIG.$NAVIGATION;

class NavSide extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
	    theme: 'dark',
	    current: '1',
	  }
  }
  handleClick(e)
  {
    this.setState({
      current: e.key,
    });
  }
  render()
  {
  	let k = 1;
  	const menus = $NAVIGATION.map((menu, i) =>
         	{
         		return (
         			<SubMenu
         			 key={ `sub_${i}` }
     				 title={<span><Icon type={ menu.iconType } /><span>{ menu.name }</span></span>}
         			>
         			{
         				menu.children.map((item, i) =>
         				{
         					return (
         						<Menu.Item key={ k++ }>{ item.name }</Menu.Item>
         						);
         				})
         			}
         			</SubMenu>
         			);
         	})
    return (
      <div className="sideBar">
      	<Loginfo />
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick.bind(this)}
          defaultOpenKeys={['sub_0']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >

        { menus }

        </Menu>
      </div>
    );
  }
}

export default NavSide;