import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";

import { inject, observer } from "mobx-react";

import Request from "./Request";
import RequestComplete from "./RequestComplete";

@inject("Request")
@observer
class RequestContainer extends React.Component {
  render() {
    const { Request, width } = this.props;

    return (
      <>
        <Background>
          <Containerv1 style={{ width: 792 }}>
            {/* <RequestComplete /> */}
            <Request />
          </Containerv1>
        </Background>
      </>
    );
  }
}

export default RequestContainer;
