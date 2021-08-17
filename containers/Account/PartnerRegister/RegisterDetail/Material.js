import React, { Component } from "react";
import InnerBox from "components/InnerBox";
import * as Content from "components/Content";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import CheckBoxComponent from "./CheckBoxComponent";
const topCategoryOuterStyles = {
  borderRadius: "5px",
  border: "1px solid #e1e2e4",
  marginBottom: 20,
};

const outerStyles = {
  borderRadius: "5px",
  border: "1px solid #e1e2e4",
  marginBottom: 20,
};

const innerStyles = {
  padding: "40px 78px",
};
@inject("Category")
@observer
class MaterialContainer extends Component {
  componentDidMount() {
    // console.log("===================================");
    // console.log(toJS(this.props.Category.mainbusiness_list));
    // console.log(toJS(this.props.Category.maincategory_list));
    // console.log(toJS(this.props.Category.category_list));
    // console.log("===================================");
    this.props.Category.isChecked("category");
  }
  render() {
    const { Category } = this.props;
    return (
      <>
        <Font18 style={{ textAlign: "left", width: "100%", marginBottom: 16 }}>
          소재
        </Font18>
        <InnerBox
          outerStyles={outerStyles}
          innerStyles={innerStyles}
          Content={() => {
            return (
              <CategoryBox>
                {Category.mainmaterial_list.map((item, mainIdx) => {
                  return (
                    <ContentBox>
                      <HeaderText>
                        <Font18>{item.maincategory} </Font18>
                        <Font16
                          style={{
                            color: "#86888c",
                            fontWeight: 500,
                          }}
                        >
                          (중복 선택 가능)
                        </Font16>
                      </HeaderText>

                      <CheckItemBox>
                        <CheckItem>
                          <CheckBoxComponent
                            isCheckAll={true}
                            type={"material"}
                            selectedList={Category.material_selected}
                            item={item}
                            arrIdx={mainIdx}
                            wholeList={item.material_set}
                          />
                        </CheckItem>
                        <CheckItem></CheckItem>
                        <CheckItem></CheckItem>
                        {item.material_set.map((subItem, subIdx) => {
                          return (
                            <CheckItem>
                              <CheckBoxComponent
                                isCheckAll={false}
                                type={"material"}
                                selectedList={Category.material_selected}
                                item={subItem}
                              />
                            </CheckItem>
                          );
                        })}
                      </CheckItemBox>
                    </ContentBox>
                  );
                })}
              </CategoryBox>
            );
          }}
        ></InnerBox>
      </>
    );
  }
}

export default MaterialContainer;

const CheckItem = styled.label`
  width: 33%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const CheckItemBox = styled.div`
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  /* align-content: space-between; */
  justify-content: space-between;
`;
const CategoryBox = styled.div`
  div:nth-last-child(1) {
    margin-bottom: 0;
  }
`;
const ContentBox = styled.div`
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HeaderText = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #e1e2e4;
  padding-bottom: 17px;
`;
const Font18 = styled(Content.FontSize18)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
  text-align: left;
  color: #1e2222;
`;

const Font16 = styled(Content.FontSize16)`
  white-space: nowrap;
  margin-left: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.13;
  letter-spacing: -0.4px;
  text-align: left;
  color: #1e2222;

  overflow-x: auto;
`;