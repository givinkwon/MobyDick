import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

import Container from "components/Container";
import InputComponent from "components/Input2";
import ButtonComponent from "components/Button";
import ButtonSpinnerComponent from "components/ButtonSpinner";
import CheckBoxComponent from "components/CheckBox";

import * as Text from "components/Text";
import { GRAY, DARKGRAY, PRIMARY, WHITE } from "static/style";

const search_ic = "static/icon/search.png";

@inject("Auth")
@observer
class MyCoinConatiner extends React.Component {
  render() {
    const { Auth } = this.props;
    return (
      <div style={{ width: "100%" }}>
        <Header>
          <Text.FontSize24
            style={{ marginRight: 5 }}
            color={WHITE}
            fontWeight={700}
          >
            나의 등급 |
          </Text.FontSize24>
          <Text.FontSize24 color="#ed7d31" fontWeight={500}>
            {Auth.logged_in_client && Auth.logged_in_client.client_class
              ? "프라임"
              : "일반"}
          </Text.FontSize24>
        </Header>

      </div>
    );
  }
}

export default MyCoinConatiner;

const Header = styled.div`
  height: 55px;
  background-color: ${PRIMARY};

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px #0005;

  display: flex;
 // align-items: center;
  justify-content: center;

  padding: 30px 10px;
  > p {
    //text-align: center;
    line-height: 1.3;
  }
`;
