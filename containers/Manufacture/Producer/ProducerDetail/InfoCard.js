import React from "react";
import WritingContainer from "./Writing";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";

@inject("Partner", "Auth")
@observer
class InfoCard extends React.Component {
  componentDidMount = () => {
    console.log("InfoCard Container");
  };
  render() {
    const { src, name, content, marginLeft } = this.props;

    return (
      <>
        <Card marginLeft={marginLeft}>
          <header>
            <img src={src} />
            <name>{name}</name>
          </header>
          <content>{content}</content>
        </Card>
      </>
    );
  }
}

export default InfoCard;

const Card = styled.div`
  border: 1px solid #c6c7cc;
  border-radius: 5px;
  width: 33%;
  margin-left: 21px;
  min-height: 144px;
  padding: 12px 10px;
  box-sizing: border-box;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : 0)}px;
  header {
    display: flex;
    margin-bottom: 25px;
    name {
      font-size: 15px;
      line-height: 22px;
      letter-spacing: -0.38px;
      color: #555963;
      font-weight: normal;
    }
  }
  content {
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.45px;
    color: #282c36;
    font-weight: normal;
  }
`;
