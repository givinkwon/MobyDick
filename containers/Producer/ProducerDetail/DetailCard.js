import React from "react";
import styled, { css } from "styled-components";
import dynamic from "next/dynamic";
import Router from "next/router";
import Modal from "../Review/ReviewWritingModal";
import ReviewCard from "../Review/ReviewCard";
import ReviewStarRating from "../Review/ReviewStarRating";
import { toJS } from "mobx";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const availableFileType1 = [
  "png",
  "jpeg",
  "gif",
  "bmp",
  "pdf",
  "csv",
  "xslx",
  "mp4",
  "webm",
  "mp3",
];

const availableFileType3 = ["doc", "docx", "txt", "html", "ppt", "pptx"];

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
  state = {
    avg_consult_score: 0,
    avg_kindness_score: 0,
    avg_communication_score: 0,
    avg_profession_score: 0,
  };

  openModal = () => {
    const { Partner } = this.props;
    // console.log("requestmodal open click");
    // this.setState({ modalOpen: true });
    Partner.reviewWritingModalActive = true;
  };
  closeModal = () => {
    const { Partner } = this.props;
    // console.log("requestmodal close click");

    Partner.reviewWritingModalActive = false;
  };

  componentDidMount = async () => {
    const { Partner } = this.props;
    // console.log("csfdffsdfd");
    console.log("mountmount");
    if (Partner.partner_detail_list.length == 0) {
      Router.push("/producer");
    }

    console.log(this.props.Partner.selectedIntroductionFileType);

    // if (this.props.Partner.selectedIntroductionFileType === "pptx") {
    //   var frameHTML =
    //     '<iframe src="https://docs.google.com/gview?url=' +
    //     this.props.Partner.selectedIntroductionFile +
    //     '&embedded=true" class="viewer" frameborder="0"></iframe>';
    //   document.getElementById("viewer-wrap").innerHTML = frameHTML;
    // }

    let total_consult_score = 0;
    let total_kindness_score = 0;
    let total_communication_score = 0;
    let total_profession_score = 0;
    console.log(Partner.partnerReviewList);

    await Partner.partnerReviewList[0].data.map((item, idx) => {
      total_consult_score += item.consult_score;
      total_kindness_score += item.kindness_score;
      total_communication_score += item.communication_score;
      total_profession_score += item.profession_score;
    });
    this.setState({
      avg_consult_score:
        total_consult_score / Partner.partnerReviewList[0].data.length,
      avg_kindness_score:
        total_consult_score / Partner.partnerReviewList[0].data.length,
      avg_communication_score:
        total_consult_score / Partner.partnerReviewList[0].data.length,
      avg_profession_score:
        total_consult_score / Partner.partnerReviewList[0].data.length,
    });
    console.log(total_consult_score);
    console.log(Partner.partnerReviewList[0].data.length);

    console.log(5 / 2);
    console.log(this.state.avg_consult_score);
    console.log(Math.floor(this.state.avg_consult_score));
  };

  render() {
    const { width, Partner } = this.props;

    const docs = [
      // {
      //   uri:
      //     "https://boltnnutplatform-test.s3.amazonaws.com/media/partner/2021/6/21/0fe2d8bf12da4838b4cb35625153a1f3_partner.docx",
      // },
      { uri: this.props.Partner.selectedIntroductionFile },
      // { uri: require("./example-files/pdf.pdf") } // local
    ];

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
            {Partner.partner_detail_list.length != 0 && (
              <name>{Partner.partner_detail_list[0].item.name}</name>
            )}
            {Partner.partner_detail_list.length != 0 && (
              <content>
                <span>{Partner.partner_detail_list[0].item.info_company}</span>
              </content>
            )}
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
              {availableFileType1.indexOf(
                this.props.Partner.selectedIntroductionFileType
              ) > -1 && (
                <FileViewerContainer
                  fileType={this.props.Partner.selectedIntroductionFileType}
                  filePath={this.props.Partner.selectedIntroductionFile}
                  onError={onError}
                />
              )}

              {/* {availableFileType2.indexOf(
                this.props.Partner.selectedIntroductionFileType
              ) > -1 && <PPTViewer id="viewer-wrap" />} */}

              {availableFileType3.indexOf(
                this.props.Partner.selectedIntroductionFileType
              ) > -1 && (
                <DOCViewer
                  documents={docs}
                  pluginRenderers={DocViewerRenderers}
                  height={width}
                  type={this.props.Partner.selectedIntroductionFileType}
                />
              )}
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
              {Partner.partner_detail_list.length != 0 && (
                <content>{Partner.partner_detail_list[0].item.deal}</content>
              )}
            </div>
            <div>
              <label>
                <span>진행한 제품군</span>
              </label>
              {Partner.partner_detail_list.length != 0 && (
                <content>{Partner.partner_detail_list[0].item.history}</content>
              )}
            </div>
          </DetailInfoBox>
          <ReviewBox>
            <label>평가 후기</label>

            <SummaryBox>
              <label>클라이언트 평균 만족도</label>
              <header>
                <mainscore>
                  <div>
                    <ReviewStarRating
                      width={31}
                      margin={4}
                      score={Math.floor(this.state.avg_consult_score)}
                    />
                  </div>
                  <div>
                    <span>{this.state.avg_consult_score.toFixed(2)}</span>
                    <span>전체 누적 평점</span>
                  </div>
                </mainscore>
                <subscore>
                  <div>
                    <span>친절도</span>
                    <div>
                      <ReviewStarRating width={15} margin={1} score={3} />
                    </div>
                  </div>

                  <div>
                    <span>연락 빈도</span>
                    <div>
                      <ReviewStarRating width={15} margin={1} score={2} />
                    </div>
                  </div>

                  <div>
                    <span>전문성</span>
                    <div>
                      <ReviewStarRating width={15} margin={1} score={5} />
                    </div>
                  </div>
                </subscore>
              </header>
            </SummaryBox>
            <content>
              {Partner.partnerReviewList &&
                console.log(toJS(Partner.partnerReviewList[0].data))}
              {Partner.partnerReviewList &&
                Partner.partnerReviewList[0].data.map((item, idx) => {
                  return (
                    <ReviewCard
                      data={item}
                      idx={idx}
                      totalCount={Partner.partnerReviewList[0].data.length}
                    />
                  );
                })}
            </content>

            {/* {Partner.reviewWritingModalActive && (
              <Layer>
                <span>
                  <Modal
                    width={width}
                    open={Partner.reviewWritingModalActive}
                    close={this.closeModal}
                  ></Modal>
                </span>
              </Layer>
            )} */}
          </ReviewBox>
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

const ReviewBox = styled.div`
  position: relative;
  // height: 500px;
  margin-top: 109px;
  > label {
    font-size: 24px;
    line-height: 40px;
    letter-spacing: -0.6px;
    color: #282c36;
    font-weight: bold;
  }
`;

const SummaryBox = styled.div`
  margin-top: 50px;
  margin-bottom: 34px;
  > label {
    font-size: 24px;
    line-height: 40px;
    letter-spacing: -0.6px;
    color: #282c36;
    font-weight: 500;
    margin-bottom: 24px;
    display: block;
  }
  > header {
    display: flex;
    justify-content: space-between;
    > mainscore {
      display: flex;
      > div:nth-of-type(1) {
        padding-top: 9px;
        box-sizing: border-box;
      }
      > div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        > span:nth-of-type(1) {
          align-self: center;
          font-size: 48px;
          line-height: 40px;
          letter-spacing: -1.2px;
          color: #282c36;
          font-weight: bold;
          margin-bottom: 12px;
        }
        > span:nth-of-type(2) {
          font-size: 16px;
          line-height: 24px;
          letter-spacing: -0.4px;
          color: #191919;
          font-weight: normal;
        }
      }
    }
    > subscore {
      display: flex;
      flex-direction: column;
      width: 165px;
      > div {
        margin-bottom: 9px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
`;

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.5);

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
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

const DOCViewer = styled(DocViewer)`
  > div:nth-of-type(1){
    display: none;
    z-index: 0;
  }
  > div:nth-of-type(2) {
    // border: 3px solid red;

    > div:nth-of-type(1) {
      // height: 1000px;
      height: ${(props) =>
        (props.type === "pptx" || props.type === "ppt") &&
        props.height / 2 - props.height / 5}px;
        height: ${(props) =>
          (props.type === "docx" || props.type === "doc") && 1200}px;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    > div:nth-of-type(2) {
      > div:nth-of-type(1) {
        height: ${(props) =>
          props.type === "pptx" || props.type === "ppt"
            ? props.height
              ? props.height / 3 + props.height / 3
              : 0
            : 300}px;


      }
      }
    }
  }
`;
