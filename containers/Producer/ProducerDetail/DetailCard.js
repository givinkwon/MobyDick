import React from "react";
import styled, { css } from "styled-components";
import dynamic from "next/dynamic";

// @ts-ignore
const FileViewer = dynamic(() => import("react-file-viewer"), {
  ssr: false,
});
import { inject, observer } from "mobx-react";
import * as Title from "components/Title";
const waterMarkImg = "/static/images/logo_marine@2x.png";
// const file = "./Case-Study-Shell.pdf";
const type = "pdf";

const onError = (e) => {
  console.log(e, "error in file-viewer");
};

@inject("Partner")
@observer
class DetailCardContainer extends React.Component {
  render() {
    const { width, Partner } = this.props;
    console.log(this.props.Partner.selectedIntroductionFile);
    console.log(Partner.partner_detail_list);
    return (
      <>
        <Card
          width={width}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          <HeaderBox>
            <tag>
              <span>활동 가능</span>
            </tag>
            <name>{Partner.partner_detail_list[0].item.name}</name>
            <content>
              <span>{Partner.partner_detail_list[0].item.info_company}</span>
            </content>
          </HeaderBox>
          <div
            onCentextMenu={(e) => {
              e.preventDefault();
            }}
            style={{
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              zIndex: 1,
            }}
          >
            <div style={{ opacity: 0.2 }}>
              <img src={waterMarkImg} />
            </div>
          </div>
          <InnerBox>
            {/* <TopInlineBox>
              <div>활동 가능</div>
              <div style={{ textAlign: "left" }}>등록일자 ~~~</div>
            </TopInlineBox> */}

            <IntroductionBox width={width}>
              <Font24>회사소개서</Font24>
              <FileViewerContainer
                fileType={this.props.Partner.selectedIntroductionFileType}
                filePath={this.props.Partner.selectedIntroductionFile}
                onError={onError}
              />
            </IntroductionBox>
          </InnerBox>

          <DetailInfoBox>
            <div>
              <label>
                <span>지역</span>
              </label>
              <content>{Partner.city_name}</content>
            </div>
            <div>
              <label>
                <span>주요실적</span>
              </label>
              <content>{Partner.partner_detail_list[0].item.deal}</content>
            </div>
            <div>
              <label>
                <span>진행한 제품군</span>
              </label>
              <content>{Partner.partner_detail_list[0].item.history}</content>
            </div>
          </DetailInfoBox>
        </Card>
      </>
    );
  }
}

export default DetailCardContainer;

const Font24 = styled(Title.FontSize24)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 16px !important;
    line-height: 40px;
    letter-spacing: -0.4px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;
const IntroductionBox = styled.div`
  width: auto;
  text-align: center;

  @media (min-width: 0px) and (max-width: 767.98px) {
    canvas {
      width: ${(props) => (props.width ? props.width - 100 : "")}px;
    }
  }
`;
const TopInlineBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Card = styled.div`
  margin-top: 50px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 54px 32px;
  box-sizing: border-box;

  > div:nth-of-type(2) {
    > div {
      > img {
        width: 100%;
      }
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 21px 14px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 174px;
  tag {
    width: 118px;
    height: 40px;
    border-radius: 3px;
    background-color: #0933b3;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 34px;
    span {
      color: #ffffff;
      font-size: 18px;
      line-height: 30px;
      letter-spacing: -0.18px;
      font-weight: 500;
    }
  }
  name {
    font-size: 26px;
    line-height: 52px;
    letter-spacinig: -0.65px;
    color: #282c36;
    font-weight: bold;
    margin-bottom: 34px;
  }
  content {
    span {
      font-size: 18px;
      line-height: 34px;
      letter-spacing: -0.45px;
      color: #414550;
      font-weight: normal;
      white-space: pre-wrap;
      word-break: keep-all;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 32px;
    tag {
      width: 68px;
      height: 26px;
      margin-bottom: 14px;
      span {
        font-size: 12px;
        letter-spacing: -0.12px;
      }
    }
    name {
      font-size: 16px;
      line-height: 15px;
      letter-spacinig: -0.4px;
      margin-bottom: 24px;
    }
    content {
      border: 1px solid #c6c7cc;
      border-radius: 5px;
      padding: 24px 16px;
      box-sizing: border-box;
      span {
        font-size: 14px;
        line-height: 26px;
        letter-spacing: -0.35px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {

    margin-bottom:96px;
    tag {
      width: 88px;
      height: 32px;
      margin-bottom: 20px;
      span {
        font-size: 14px;
        letter-spacing: -0.12px;
      }
    }
    name {
      font-size: 20px;
      line-height: 15px;
      letter-spacinig: -0.4px;
      margin-bottom: 20px;
    }
    content {
      span {
        font-size: 16px;
        line-height: 26px;
        letter-spacing: -0.35px;
      }
    }
  }

  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-bottom: 144px;
    tag {
      width: 104px;
      height: 36px;
      margin-bottom: 28px;
      span {
        font-size: 16px;
        letter-spacing: -0.12px;
      }
    }
    name {
      font-size: 23px;
      line-height: 15px;
      letter-spacinig: -0.4px;
      margin-bottom: 24px;
    }
    content {
      span {
        font-size: 17px;
        line-height: 26px;
        letter-spacing: -0.35px;
      }
    }
  }

`;
const InnerBox = styled.div`
  width: 100%;
  padding: 54px 0 54px 0;

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 14px 0;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 29px 0;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 44px 0;
  }
  @media (min-width: 1300px) {
  }
`;

const DetailInfoBox = styled.div`
  background-color: #f6f6f6;
  padding: 41px 69px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    margin-bottom: 40px;
    width: 100%;
    label {
      width: 25%;
      span {
        font-size: 18px;
        line-height: 27px;
        letter-spacing: -0.45px;
        color: #191919;
        font-weight: bold;
      }
    }
    content {
      width: 90%;
      font-size: 18px;
      line-height: 27px;
      letter-spacing: -0.45px;
      word-break: keep-all;
    }
  }
  div:last-child {
    margin-bottom: 0px;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 16px 8px;

    div {
      display: block;
      margin-bottom: 40px;
      label {
        width: 100%;
        display: block;
        span {
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.45px;
        }
      }
      content {
        font-size: 12px;
        line-height: 20px;
        letter-spacing: -0.45px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 24px 16px;
    div {
      margin-bottom: 40px;
      label {
        span {
          font-size: 16px;
          line-height: 27px;
          letter-spacing: -0.45px;
        }
      }
      content {
        font-size: 14px;
        line-height: 27px;
      }
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 31px 31px;
    div {
      margin-bottom: 40px;
      label {
        span {
          font-size: 17px;
          line-height: 27px;
          letter-spacing: -0.45px;
        }
      }
      content {
        font-size: 16px;
        line-height: 27px;
      }
    }
  }
  @media (min-width: 1300px) {
  }
`;
const FileViewerContainer = styled(FileViewer)``;