
import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Text, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input,  Label, Footer, FooterTab, Badge} from 'native-base';

class PageFooter extends React.Component {
  render() {
    const { activeTab } = this.props;
    const checkpointActive = activeTab === 'checkpoint';
    const searchActive = activeTab === 'search';
    const scanActive = activeTab === 'scan';

    return (
      <Footer>
        <FooterTab>
          <Button active={searchActive} vertical>
            <Icon active={searchActive} name="search" />
            <Text>查询</Text>
          </Button>
          <Button active={scanActive} vertical>
            <Icon active={scanActive} name="camera" />
            <Text>扫码</Text>
          </Button>
          <Button active={checkpointActive} vertical>
            <Icon active={checkpointActive} name="navigate" />
            <Text>关卡</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
 
  
});

export default PageFooter;

