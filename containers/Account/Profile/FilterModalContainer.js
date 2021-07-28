import React from "react";
import styled, { css } from "styled-components";
import Background from "components/Background";
import InnerBoxComponent from "components/InnerBox";
import * as Title from "components/Title";
import * as Content from "components/Content";
import Button from "components/Button";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import Category from "../../../stores/Manufacture/Category";

const passimg = "static/images/passimg.svg";
const MainArr = ["제품", "기계/설비/장비", "부품", "공구류"];
const SubArr = [
  "제품",
  "기계/설비/장비",
  "부품",
  "공구류",
  "제품",
  "기계/설비/장비",
  "부품",
  "공구류",
];

const arrowRightImg = "/static/images/producer/arrow_right.svg";
const checkImg = "/static/images/producer/check.svg";

@inject("Category", "Partner")
@observer
class FilterModalContainer extends React.Component {
  async componentDidMount() {
    const { Category } = this.props;
    await Category.init();
    console.log("ASNCKLANSCLKNLAKSCNLKANSCLKNASLCK");
    var mainCategoryTypeDic = {};
    var subCategoryTypeDic = {};
    mainCategoryTypeDic["business"] = Category.mainbusiness_list;
    mainCategoryTypeDic["category"] = Category.maincategory_list;
    mainCategoryTypeDic["city"] = Category.city_list;
    mainCategoryTypeDic["material"] = Category.mainmaterial_list;
    mainCategoryTypeDic["develop"] = Category.developbig_list;

    // console.log(Category.mainbusiness_list);

    this.setState({ mainCategoryTypeDic: mainCategoryTypeDic });
    console.log(this.state.mainCategoryTypeDic);
  }
  state = {
    mainSelectIdx: 0,
    subSelectIdx: 0,
    mainCategoryTypeDic: {},

    // 공정 대분류
    develop_active: false,
    // 소재 대분류
    material_active: false,
  };
  activeHandler = (type, idx) => {
    const { Category } = this.props;

    if (type === "main") {
      if (idx === this.state.mainSelectIdx) {
        return true;
      } else {
        return false;
      }
    } else {
      if (Category.category_selected.includes(idx)) {
        return true;
      } else {
        return false;
      }
    }
  };

  buttonClick = (type, idx) => {
    const { Category } = this.props;

    if (Category.categoryActiveHandler(idx, type)) {
      console.log("remove selected");
      console.log(type, idx);
      Category.remove_selected(type, idx);
    } else {
      console.log("add selected");
      console.log(type, idx);
      Category.add_selected(type, idx);
    }
  };

  // 모달 종료하기
  modalclose = () => {
    const { Partner } = this.props;

    Partner.filter_dropdown = false;
  };

  render() {
    const { Category, type } = this.props;
    console.log(this.props.type);
    console.log(this.state.mainSelectIdx);

    console.log(this.state.develop_active);
    console.log(this.state.mainCategoryTypeDic["develop"]);
    console.log(toJS(this.state.mainCategoryTypeDic["develop"]));

    return (
      <ModalBox>
        <MainCategoryBox>
          <>
            {/* 공정 선택일 때 */}
            {this.props.type === "develop" &&
              this.state.mainCategoryTypeDic["develop"] &&
              toJS(this.state.mainCategoryTypeDic["develop"]).map(
                (data, idx) => {
                  return (
                    <MainCategoryButton
                      onClick={() => {
                        this.buttonClick("main", idx);
                      }}
                      active={this.activeHandler("main", idx)}
                    >
                      <MainCategoryFont>
                        {
                          this.state.mainCategoryTypeDic["develop"][idx]
                            .maincategory
                        }
                      </MainCategoryFont>
                      <img src={arrowRightImg} />
                    </MainCategoryButton>
                  );
                }
              )}

            {/* 소재 선택일 때 */}
            {this.props.type === "material" &&
              this.state.mainCategoryTypeDic["material"] &&
              toJS(this.state.mainCategoryTypeDic["material"]).map(
                (data, idx) => {
                  return (
                    <MainCategoryButton
                      onClick={() => {
                        this.buttonClick("main", idx);
                      }}
                      active={this.activeHandler("main", idx)}
                    >
                      <MainCategoryFont>
                        {
                          this.state.mainCategoryTypeDic["material"][idx]
                            .maincategory
                        }
                      </MainCategoryFont>
                      <img src={arrowRightImg} />
                    </MainCategoryButton>
                  );
                }
              )}

            {/* map으로 뿌리기 */}
            {this.props.type != "develop&material" &&
              this.props.type != "city" &&
              this.state.mainCategoryTypeDic[type] &&
              toJS(this.state.mainCategoryTypeDic[type]).map((data, idx) => {
                return (
                  <MainCategoryButton
                    onClick={() => {
                      this.buttonClick("main", idx);
                    }}
                    active={this.activeHandler("main", idx)}
                  >
                    <MainCategoryFont>
                      {this.state.mainCategoryTypeDic[type][idx].maincategory}
                    </MainCategoryFont>
                    <img src={arrowRightImg} />
                  </MainCategoryButton>
                );
              })}
          </>
        </MainCategoryBox>

        <div style={{ width: "73.4%" }}>
          <SubCategoryBox>
            <SubInnerBox>
              {/* 카테고리 선택 */}
              {type == "business" &&
                Category.mainbusiness_list[this.state.mainSelectIdx] &&
                Category.mainbusiness_list[
                  this.state.mainSelectIdx
                ].business_set.map((sub_data, idx) => {
                  return (
                    <SubCategoryButton
                      onClick={() => {
                        this.buttonClick("sub", sub_data.id);
                      }}
                      active={Category.categoryActiveHandler(sub_data.id, type)}
                    >
                      <CheckBox
                        active={Category.categoryActiveHandler(
                          sub_data.id,
                          type
                        )}
                      >
                        <img src={checkImg} />
                      </CheckBox>
                      <SubCategoryFont>{sub_data.category}</SubCategoryFont>
                    </SubCategoryButton>
                  );
                })}
              {/* city 일 떄 */}
              {this.props.type == "city" &&
                this.state.mainCategoryTypeDic[type] &&
                toJS(this.state.mainCategoryTypeDic[type]).map((data, idx) => {
                  return (
                    <SubCategoryButton
                      onClick={() => {
                        this.buttonClick("main", data.id);
                      }}
                      active={Category.categoryActiveHandler(data.id, type)}
                    >
                      <CheckBox
                        active={Category.categoryActiveHandler(data.id, type)}
                      >
                        <img src={checkImg} />
                      </CheckBox>

                      <SubCategoryFont>
                        {this.state.mainCategoryTypeDic[type][idx].maincategory}
                      </SubCategoryFont>
                    </SubCategoryButton>
                  );
                })}

              {/* 업체 분류 선택 */}
              {type == "category" &&
                Category.maincategory_list[this.state.mainSelectIdx] &&
                Category.maincategory_list[
                  this.state.mainSelectIdx
                ].category_set.map((sub_data, idx) => {
                  return (
                    <SubCategoryButton
                      onClick={() => {
                        this.buttonClick("sub", sub_data.id);
                      }}
                      active={Category.categoryActiveHandler(sub_data.id, type)}
                    >
                      <CheckBox
                        active={Category.categoryActiveHandler(
                          sub_data.id,
                          type
                        )}
                      >
                        <img src={checkImg} />
                      </CheckBox>

                      <SubCategoryFont>{sub_data.category}</SubCategoryFont>
                    </SubCategoryButton>
                  );
                })}

              {console.log("2323232323232323")}
              {console.log(this.state.develop_active)}
              {console.log(Category.developbig_list[this.state.mainSelectIdx])}

              {/* 공정 분류 선택 */}
              {this.props.type === "develop" &&
                Category.developbig_list[this.state.mainSelectIdx] &&
                Category.developbig_list[
                  this.state.mainSelectIdx
                ].develop_set.map((sub_data, idx) => {
                  return (
                    <SubCategoryButton
                      onClick={() => {
                        this.buttonClick("develop", sub_data.id);
                      }}
                      active={Category.categoryActiveHandler(
                        sub_data.id,
                        "develop"
                      )}
                    >
                      <CheckBox
                        active={Category.categoryActiveHandler(
                          sub_data.id,
                          "develop"
                        )}
                      >
                        <img src={checkImg} />
                      </CheckBox>

                      <SubCategoryFont>{sub_data.category}</SubCategoryFont>
                    </SubCategoryButton>
                  );
                })}

              {/* 소재 분류 선택 */}
              {this.props.type === "material" &&
                Category.mainmaterial_list[this.state.mainSelectIdx] &&
                Category.mainmaterial_list[
                  this.state.mainSelectIdx
                ].material_set.map((sub_data, idx) => {
                  return (
                    <SubCategoryButton
                      onClick={() => {
                        this.buttonClick("material", sub_data.id);
                      }}
                      active={Category.categoryActiveHandler(
                        sub_data.id,
                        "material"
                      )}
                    >
                      <CheckBox
                        active={Category.categoryActiveHandler(
                          sub_data.id,
                          "material"
                        )}
                      >
                        <img src={checkImg} />
                      </CheckBox>
                      <SubCategoryFont>{sub_data.category}</SubCategoryFont>
                    </SubCategoryButton>
                  );
                })}
            </SubInnerBox>
          </SubCategoryBox>
          <ButtonBox>
            <ButtonComponent
              style={{ width: "80px", height: "42px", marginRight: "16px" }}
              backgroundColor={"#ffffff"}
              borderRadius={5}
              borderWidth={0.5}
              borderColor={"#c6c7cc"}
              onClick={Category.reset_selected}
            >
              <MainCategoryFont color={"#282c36"} fontWeight={500}>
                초기화
              </MainCategoryFont>
            </ButtonComponent>
            <ButtonComponent
              style={{ width: "80px", height: "42px" }}
              backgroundColor={"#0933b3"}
              borderRadius={5}
              onClick={this.modalclose}
            >
              <MainCategoryFont
                color={"#ffffff"}
                fontWeight={500}
                onClick={async () => {
                  console.log(this.props.type);
                  console.log(toJS(Category.business_selected));

                  await Category.getNameByCategory(this.props.type);
                  this.setState({ g: 3 });
                }}
              >
                적용
              </MainCategoryFont>
            </ButtonComponent>
          </ButtonBox>
        </div>
      </ModalBox>
    );
  }
}

export default FilterModalContainer;

const ModalBox = styled.div`
  display: flex;
  width: 95%;
  height: 293px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  margin-top: 10px;
  align-self: center;
  border-radius: 10px;
  overflow: hidden;
`;

const AddCategoryBox = styled.div`
  height: 100%;
  width: 26.6%;
  border-right: 1px solid #e1e2e4;
  // overflow-y: scroll;
`;

const AddCategoryButton = styled.div`
  background: ${(props) => (props.active ? "#ededef" : "none")};

  height: 46px;

  display: flex;

  justify-content: space-between;

  align-items: center;
  padding: 12px 12px 12px 20px;
  box-sizing: border-box;
  cursor: pointer;

  > img {
    display: ${(props) => (props.active ? "block" : "none")};
  }

  > p {
    color: ${(props) => props.active && "#0933b3"};
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 6px 6px 6px 10px;
    > img {
      width: 12px;
      height: 12px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 9px 9px 9px 15px;
    > img {
      width: 14px;
      height: 14px;
    }
  }
`;

const MainCategoryBox = styled.div`
  height: 100%;
  width: 26.6%;
  border-right: 1px solid #e1e2e4;
  // overflow-y: scroll;
`;

const MainCategoryButton = styled.div`
  background: ${(props) => (props.active ? "#ededef" : "none")};
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px 12px 20px;
  box-sizing: border-box;
  > img {
    display: ${(props) => (props.active ? "block" : "none")};
  }
  > p {
    color: ${(props) => props.active && "#0933b3"};
  }
  cursor: pointer;

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 3px;
    > img {
      width: 12px;
      height: 12px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 6px 6px 6px 9px;
    > img {
      width: 14px;
      height: 14px;
    }
  }
`;

const SubCategoryBox = styled.div`
  height: 80%;
  border-bottom: 1px solid #e1e2e4;
  overflow-y: scroll;

  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 85%;
  }
`;

const SubInnerBox = styled.div`
  padding: 20px 18px;
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 9px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 27px 15px;
  }
`;
const SubCategoryButton = styled.div`
  width: 50%;
  // background: ${(props) => (props.active ? "#ededef" : "none")};
  background: none;
  /* height:30px; */
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 20%;
  padding-right: 20px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 15%;
  }
`;

const AddCategoryFont = styled(Content.FontSize15)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.27;
  letter-spacing: -0.38px;
  text-align: left;
  color: #282c36;
  word-break: break-word;
}



  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 11px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 13px;
  }
`;

const MainCategoryFont = styled(Content.FontSize15)`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "normal")};
  font-stretch: normal;
  font-style: normal;
  line-height: 2.27;
  letter-spacing: -0.38px;
  text-align: left;
  color: ${(props) => (props.color ? props.color : "#282c36")};
  word-break: break-word;
}



  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 11px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 13px;
  }
`;

const SubCategoryFont = styled(Content.FontSize14)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.43;
  letter-spacing: -0.35px;
  text-align: left;
  color: #282c36;
  cursor: pointer;
  word-break: break-word;
}



  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 10px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 12px;
  }
`;

const ButtonComponent = styled(Button)`
  width: 80px;
  height: 42px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 65px !important;
    height: 30px !important;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 73px !important;
    height: 36px !important;
  }
`;

const CheckBox = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid #c6c7cc;
  margin-right: 12px;
  cursor: pointer;
  > img {
    display: ${(props) => (props.active ? "block" : "none")};
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 14px;
    height: 14px;
    min-width: 14px;
    min-height: 14px;
    position: relative;
    > img {
      width: 15px;
      height: 15px;
      position: absolute;
      top: -1px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 16px;
    height: 16px;
    > img {
      width: 17px;
      height: 17px;
    }
  }
`;
