import React from "react";
import styled, { css } from "styled-components";
import * as Content from "components/Content";
import * as Title from "components/Title";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

import Container from "components/Containerv1";
import Background from "components/Background";
import ChatItemContainer from "components/ChatItem";
import ChatTestContainer from "containers/Info2/ChatTest";

import NoProject from "containers/Project/NoProject";
import Router from "next/router";
@inject("Project", "Auth", "Partner")
@observer
class MyProject extends React.Component {
  state = {
    Answerlist: [],
    selectedRoom: null,
    Partnerprojectlist: [],
    clientPhone: null,
    projectName: null,
  };
  modalHandler = async (id, idx) => {
    this.setState({
      selectedRoom: id,
      projectName: this.state.Partnerprojectlist[idx].name,
      // clientPhone: this.state.Partnerprojectlist[idx].clientPhone,
      projectId: this.state.Partnerprojectlist[idx].project,
    });
    // alert(id);
    const { Project } = this.props;
    Project.chatModalActive = !Project.chatModalActive;
    // this.setState({ modalActive: !this.state.modalActive });
  };
  pushToDetail = async (id) => {
    const { Project } = this.props;

    await Project.getProjectDetail(id);
    Project.selectedProjectId = id;
    // await Router.push(`/project/${id}`);
    Project.setProjectDetailData(id);
  };

  async getProject(data) {
    const { Project } = this.props;
    const partnerprojectlist = this.state.Partnerprojectlist;
    console.log("getProject")
    await Project.getProjectDetail(data.project);

    // await Project.getProjectDetail(data.project);
    console.log("adsfsdafad");
    console.log(toJS(Project.projectDetailData));

    // console.log(this.props.Partner.clientInfo.user.phone);
    console.log(toJS(Project.projectDetailData));
    // await this.props.Partner.getClientInfo(
    //   Project.projectDetailData.request_set[0].client
    // );

    if (Project.projectDetailData) {
      partnerprojectlist.push({
        name: Project.projectDetailData.request_set[0]
          ? Project.projectDetailData.request_set[0].name
          : "미지정", // 프로젝트 이름
        project: Project.projectDetailData.id,
        content: data.content1,
        // clientPhone: this.props.Partner.clientInfo.user.phone,
        answerId: data.id,
      });
      console.log(partnerprojectlist);
      this.setState({ Partnerprojectlist: partnerprojectlist });
    }
    // await this.props.Partner.getClientInfo(
    //   Project.projectDetailData.request_set[0].client
    // );
  }


  async componentDidMount() {
    const { Auth, Project, Partner } = this.props;
    const partnerdetail = this.state.PartnerDetail;
    await Auth.checkLogin();
    if (Auth.logged_in_partner) {
      console.log(toJS(Auth.logged_in_partner.answer_set));
      console.log(toJS(Partner.answer_set));
      Partner.answer_set = Auth.logged_in_partner.answer_set;
      Partner.getPartnerDetail(Auth.logged_in_partner.id);
      Partner.answer_set.map((data) => {
        this.getProject(data);
      });
    }
  }
  render() {
    const { Project, Partner, Auth } = this.props;
    const { Partnerprojectlist } = this.state;
    return (
      <Background>
        <Container style={{ flexDirection: "column" }}>
          {Project.chatModalActive && (
            // <Layer onClick={this.modalHandler}>
            <Layer>
              {/* <Postcode /> */}
              <ChatTestContainer
                roomName={this.state.selectedRoom}
              ></ChatTestContainer>
            </Layer>
          )}
          <>
            {Partnerprojectlist && Partnerprojectlist[0] ? (
              Partnerprojectlist.map((data, idx) => {
                return (
                  <>
                    <BoxContainer>
                      <Font22>{data.name}</Font22>
                      {this.state.Partnerprojectlist[idx] && Partner.detail && (
                        <ChatItemContainer
                          logo={Partner.detail.logo}
                          name={Partner.detail.name}
                          id={data.answerId}
                          project={data.project}
                          content={data.content}
                          modalHandler={() => {
                            this.modalHandler(data.answerId, idx);
                          }}
                          user={Auth}
                          pushToDetail={this.pushToDetail}
                        />
                      )}
                    </BoxContainer>
                  </>
                );
              })
            ) : (
              <NoProject />
            )}
          </>
        </Container>
      </Background>
    );
  }
}

export default MyProject;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background: #00000080;
`;

const BoxContainer = styled.div`
  margin-top: 52px;
  margin-bottom: 98px;
`;

const PartnerInfo = styled.div`
  display: flex;
`;

const PartnerBox = styled.div`
  margin-bottom: 12px;
  // width: 100%;
  height: 56px;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: var(--white);
  display: flex;
  // justify-content: space-around;
  justify-content: space-between;
  // align-items: center;
  padding: 0 28px 0 28px;
`;

const BoxLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const IconBox = styled.div`
  width: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 21px;
`;
const Icon = styled.div`
  position: relative;
  cursor: pointer;
`;
const ChatNotice = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  // bottom: 15px;
  bottom: 8px;
  left: 12px;
  border-radius: 50%;
  // padding: 3px 7px 2px;
  display: ${(props) => (props.active ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  object-fit: contain;
  background-color: #ff3400;
`;

const GoToProject = styled.div`
  cursor: pointer;
`;

const Font14 = styled(Content.FontSize14)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.86;
  letter-spacing: -0.35px;
  text-align: left;
  color: #ffffff;
`;
const Font16 = styled(Content.FontSize16)`
  font-weight: normal;
  letter-spacing: -0.4px !important;
  color: #282c36;
  line-height: 1.5;
  border-bottom: 1px solid;
  white-space: nowrap;
`;

const Font18 = styled(Content.FontSize18)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.22;
  letter-spacing: -0.45px;
  color: #86888c;
`;

const Font20 = styled(Title.FontSize20)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: -0.5px;
  color: #282c36;
`;
const Font22 = styled(Content.FontSize22)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.36;
  letter-spacing: -0.55px;
  color: #282c36;
`;