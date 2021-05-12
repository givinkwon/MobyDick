import React from "react";
import styled from "styled-components";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";

const message_img = "static/images/manufacturer/message.png";
const call_img = "static/images/manufacturer/call.png";
const file_img = "static/images/file.png";
const file_img2 = "static/images/manufacturer/file.png";

@inject("Partner")
@observer
class ProposalCard extends React.Component {
  state = {
    width: null,
    introduction: false,
    call: false,
    message: false,
    active: false,
  };

  componentDidMount() {
    const { width } = this.props;
    console.log(width);
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  activeHandler = (type) => {
    switch (type) {
      case "file":
        if (this.state.introduction) {
          this.setState({ introduction: false });
        } else {
          this.setState({ introduction: true });
        }

        break;
      case "call":
        if (this.state.call) {
          this.setState({ call: false });
        } else {
          this.setState({ call: true });
        }
        break;
      case "message":
        if (this.state.message) {
          this.setState({ message: false });
        } else {
          this.setState({ message: true });
        }
        break;
      case "active":
        if (this.state.active) {
          this.setState({ active: false });
        } else {
          this.setState({ active: true });
        }
    }
  };
  render() {
    // const {
    //   data,
    //   middleCategory,
    //   mainCategory,
    //   newData,
    //   checkTotal,
    //   customer,
    // } = this.props;
    const { data, width, Partner, categoryData, idx } = this.props;
    console.log(width);
    console.log(toJS(categoryData));
    console.log(toJS(idx));
    let category_data;
    // category_data =
    //   categoryData &&
    //   categoryData.splice(categoryData.length / 2, categoryData.length / 2);
    console.log(toJS(category_data));
    // console.log(toJS(data));

    return (
      <>
        {width > 767.98 ? (
          <Card
            active={this.state.active}
            onMouseOver={() => {
              this.activeHandler("active");
            }}
            onMouseOut={() => {
              this.activeHandler("active");
            }}
          >
            {/* <HeaderWrapper>
            <Title>sdfdsf</Title>
            <Content>sdfdsf</Content>
          </HeaderWrapper>
          <CategoryWrapper>
            <SubTitle>
              <span>카테고리</span>
            </SubTitle>
            <CategoryBox>
              <span>sdfdsf</span>
            </CategoryBox>
            <CategoryBox>
              <span>dsfdsf</span>
            </CategoryBox>
          </CategoryWrapper>
          <FooterWrapper>
            <div style={{ display: "inline-flex" }}>
              <SubTitle>희망개발기간</SubTitle>
              <Content>sdfdsf</Content>
            </div>
            <PriceTagBox>
              <span class="tag1"> 견적 </span>
              <span class="tag2">dsfdsf</span>
            </PriceTagBox>
          </FooterWrapper> */}
            <Header>
              <Logo>
                <img src={data.logo} />
              </Logo>
            </Header>
            <Main>
              <Name>{data.name}</Name>
              <Phone>
                {data.real_phone ? (
                  <span>☎ {data.real_phone}</span>
                ) : (
                  <span>전화번호 없음</span>
                )}
              </Phone>
              <InfoOne>{data.info_company}</InfoOne>
              <InfoTwo>
                {/* {Partner.category_ary.map((item, idx) => {
                  console.log(item);
                })} */}
                {/* {console.log(category_data)} */}
                {/* {category_data &&
                  category_data.map((item, idx) => {
                    return <span>{item}</span>;
                  })} */}
                {categoryData &&
                  categoryData.map((item, idx) => {
                    return <span>{item}</span>;
                  })}
                {/* <span>디자인</span>
                <span>기구설계</span>
                <span>금형제작</span>
                <span>양산</span> */}
              </InfoTwo>
            </Main>
            <AdditionBox>
              {/* <div>
                <img
                  src={file_img}
                  active={this.state.introduction}
                  onMouseOver={() => {
                    this.activeHandler("file");
                  }}
                  onMouseOut={() => {
                    this.activeHandler("file");
                  }}
                />
                <img
                  src={call_img}
                  active={this.state.call}
                  onMouseOver={() => {
                    this.activeHandler("call");
                  }}
                  onMouseOut={() => {
                    this.activeHandler("call");
                  }}
                />
                <img
                  src={message_img}
                  active={this.state.message}
                  onMouseOver={() => {
                    this.activeHandler("message");
                  }}
                  onMouseOut={() => {
                    this.activeHandler("message");
                  }}
                />
                <div>
                  <span
                    style={{
                      display: `${this.state.introduction ? "block" : "none"}`,
                    }}
                  >
                    <span>회사 소개서 보기</span>
                  </span>
                  <span
                    style={{
                      display: `${this.state.call ? "block" : "none"}`,
                    }}
                  >
                    {data.real_phone ? (
                      <span>{data.real_phone}</span>
                    ) : (
                      <span>전화번호 없음</span>
                    )}
                  </span>
                  <span
                    style={{
                      display: `${this.state.message ? "block" : "none"}`,
                    }}
                  >
                    <span>톡톡톡</span>
                  </span>
                </div>
              </div>
              <div></div> */}
              <div>
                <img src={file_img2} />
                <span>회사 소개서 보기</span>
              </div>
            </AdditionBox>
          </Card>
        ) : (
          <Card
            active={this.state.active}
            onMouseOver={() => {
              this.activeHandler("active");
            }}
            onMouseOut={() => {
              this.activeHandler("active");
            }}
          >
            {/* <HeaderWrapper>
          <Title>sdfdsf</Title>
          <Content>sdfdsf</Content>
        </HeaderWrapper>
        <CategoryWrapper>
          <SubTitle>
            <span>카테고리</span>
          </SubTitle>
          <CategoryBox>
            <span>sdfdsf</span>
          </CategoryBox>
          <CategoryBox>
            <span>dsfdsf</span>
          </CategoryBox>
        </CategoryWrapper>
        <FooterWrapper>
          <div style={{ display: "inline-flex" }}>
            <SubTitle>희망개발기간</SubTitle>
            <Content>sdfdsf</Content>
          </div>
          <PriceTagBox>
            <span class="tag1"> 견적 </span>
            <span class="tag2">dsfdsf</span>
          </PriceTagBox>
        </FooterWrapper> */}
            <Main>
              <Name>{data.name}</Name>
              <InfoOne>{data.info_company}</InfoOne>
              {/* <InfoOne>develop 들어가야함</InfoOne> */}
              <Information>
                <div>
                  <img src={call_img} />
                  {data.real_phone ? (
                    <span>{data.real_phone}</span>
                  ) : (
                    <span>전화번호 없음</span>
                  )}
                </div>
                <div>
                  <span>회사 소개서 보기</span>
                </div>
              </Information>
            </Main>

            {/* <AdditionBox>
              <div>
                <img
                  src={file_img}
                  active={this.state.introduction}
                  onMouseOver={() => {
                    this.activeHandler("file");
                  }}
                  onMouseOut={() => {
                    this.activeHandler("file");
                  }}
                />
                <img
                  src={call_img}
                  active={this.state.call}
                  onMouseOver={() => {
                    this.activeHandler("call");
                  }}
                  onMouseOut={() => {
                    this.activeHandler("call");
                  }}
                />
                <img
                  src={message_img}
                  active={this.state.message}
                  onMouseOver={() => {
                    this.activeHandler("message");
                  }}
                  onMouseOut={() => {
                    this.activeHandler("message");
                  }}
                />
                <div>
                  <span
                    style={{
                      display: `${this.state.introduction ? "block" : "none"}`,
                    }}
                  >
                    <span>회사 소개서 보기</span>
                  </span>
                  <span
                    style={{
                      display: `${this.state.call ? "block" : "none"}`,
                    }}
                  >
                    {data.real_phone ? (
                      <span>{data.real_phone}</span>
                    ) : (
                      <span>전화번호 없음</span>
                    )}
                  </span>
                  <span
                    style={{
                      display: `${this.state.message ? "block" : "none"}`,
                    }}
                  >
                    <span>톡톡톡</span>
                  </span>
                </div>
              </div>
              <div></div>
            </AdditionBox> */}
          </Card>
        )}
      </>
    );
  }
}

export default ProposalCard;

const Card = styled.div`
  width: 100%;
  //width: 987px;
  position: relative;
  object-fit: contain;
  border-radius: 10px;
  //box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border: ${(props) =>
    props.active ? "2px solid #0933b3" : "1px solid #c6c7cc"};
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);

  display: flex;

  @media (min-width: 0px) and (max-width: 767.98px) {
    // height: 108px;

    padding-left: 14px;
    padding-right: 14px;
    padding-top: 14px;

    margin-top: 14px;
    box-sizing: border-box;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 100%;
    margin-bottom: 34px;
    padding: 33px 0px 30px 34px;
    box-sizing: border-box;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    height: 100%;
    margin-bottom: 34px;
    padding: 33px 0px 30px 34px;
    box-sizing: border-box;
  }
  @media (min-width: 1300px) {
    //height: 195px;
    margin-bottom: 34px;
    padding: 33px 0px 30px 34px;
    box-sizing: border-box;
  }
`;

const Header = styled.div`
  //border: 2px solid red;
  //width: 14%;
  //flex-grow: 1;
  margin-right: 34px;
`;
const Logo = styled.div`
  > img {
    width: 123px;
    height: 123px;
  }
`;
const Main = styled.div`
  //border: 2px solid blue;
  //flex-grow: 5;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 60%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 60%;
  }
  @media (min-width: 1300px) {
    width: 60%;
  }
`;
const Name = styled.div`
  font-size: 20px;
  line-height: 40px;
  letter-spacing: -0.5px;
  color: #282c36;
  font-weight: bold;
  margin-bottom: 8px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    color: #0933b3;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.4px;
  }
`;
const Phone = styled.div`
  font-size: 16px;
  line-height: 40px;
  letter-spacing: -0.4px;
  color: #282c36;
  font-weight: 500;
  margin-bottom: 16px;
`;
const InfoOne = styled.div`
  //height: 100%;
  //height: 50px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    color: #282c36;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.33px;
  }
`;
const InfoTwo = styled.div`
margin-top: 16px;
  > span {
    background-color: #e1e2e4;
    border: 1px solid #ffffff;
    border-radius: 5px;
    padding 5px 12px;
    box-sizing: border-box;
    margin-right: 21px;
    display: inline-block;
  }
`;

const AdditionBox = styled.div`
  //border: 2px solid green;
  > div {
    display: flex;
    align-items: center;
    width: 100%;
    position: absolute;
    top: 80%;
    left: 82%;
    > span {
      font-size: 18px;
      line-height: 40px;
      letter-spacing: -0.45px;
      color: #555963;
    }
    > img {
      margin-left: 14px;
    }
    > div {
      position: absolute;
      width: 130%;

      span {
        // border: 2px solid orange;

        height: 34px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
        background-color: #ffffff;
        border: 1px solid #ffffff;
        border-radius: 5px;
        position: absolute;

        top: 0;
        // left: 40%;
        width: 100%;
        color: #0933b3;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        > span {
          // position: absolute;
          // top: 50%;
          // left: 50%;
          // transform: translate(-50%, -50%);
        }
      }
      > span:nth-of-type(1) {
        left: -30%;
      }
      > span:nth-of-type(2) {
        left: 0%;
      }
      > span:nth-of-type(3) {
        left: 30%;
      }
    }
  }
  > div:nth-child {
    border: 2px solid orange;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Information = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  > div:nth-of-type(1) {
    > img {
      margin-right: 4px;
      width: 11px;
      height: 10px;
    }
    > span {
      font-size: 12px;
      line-height: 34px;
      letter-spacing: -0.3px;
    }
  }
  > div:nth-of-type(2) {
    > span {
      font-size: 14px;
      color: #282c36;
      font-weight: bold;
    }
  }
`;
