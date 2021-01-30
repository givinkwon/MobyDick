import React, {Component} from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import 'intersection-observer'; // polyfill
import Observer from "@researchgate/react-intersection-observer";
import NewButton from 'components/NewButton';
import LogoSlider from "../LogoImageSlider";
import * as DetailQuestionApi from "axios/DetailQuestion";
import DetailQuestion from "stores/DetailQuestion";

//Slider
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";

const ThumbImage = "/static/images/request/RequestCard/Thumb.png";
var titleData=[];

@inject('Request', 'DetailQuestion')
@observer
class MobileRequestCardContainer extends Component {
  state = {
    percentage: 0,
    buttonActiveCount: 0,
    targets: null,
    active: false
  }

  // handleChange = (event, newValue) => {
  //   this.setState({percentage: newValue})
  // }

  CustomSliderThumbComponent = (props) => {
    const { Request } = this.props;
    return (
      <div {...props}>
        <img src={ThumbImage} />
        <ThumbText> {Request.percentage}% </ThumbText>
      </div>
    );
  }

  componentDidMount() {
    this.setState({...this.state, buttonActiveCount: document.getElementsByClassName("Input").length,
      targets: document.getElementsByClassName("Input")}
    );
  }

  componentDidUpdate() {
    const { targets,active } = this.state;
    console.log(this.state);
    if (this.fullChecker(targets) == true && active == false) {
      this.setState({...this.state, active: true})
    } else if (this.fullChecker(targets) == false && active == true) {
      this.setState({...this.state, active: false})
    };
  }

  fullChecker(data) {
    const { buttonActiveCount, active } = this.state;
    let counter = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].value.length != 0) {
        counter += 1
      }
    }
    if (counter == buttonActiveCount) {
      return true
    } else {
      return false
    };
  }

  prevButtonClick = () => {
    const { Request, DetailQuestion } = this.props;

    switch (Request.step_index) {
      case 1:
        if (Request.step1_index == 2) {
          Request.step1_index = 1;
          Request.percentage -= 15;
        }
        break;
      case 2:
        titleData.pop();
        console.log(titleData);

        if (DetailQuestion.prevPage.length > 0)
        {
          if (DetailQuestion.index != 4)
          {
            DetailQuestion.pageCount -= 1;
          }
          DetailQuestion.index = DetailQuestion.prevPage.pop();
          DetailQuestion.loadSelectFromTitle(DetailQuestion.index);
          Request.percentage -= 14;
        }
        else {
          Request.step_index = 1;
          Request.percentage -= 15;
        }

        break;

    }
  }
  nextButtonClick = () => {
    const { Request, DetailQuestion } = this.props;

    switch(Request.step_index)
    {
      case 1:
        if (Request.step1_index == 1) {
          Request.step1_index = 2;
          Request.percentage += 15;
        } else {
          try {
            Request.createRequest();
            Request.step_index = 2;
            Request.percentage += 15;
            DetailQuestion.index=1; //여기서 1로 초기화해주는 이유는 밑에 prev버튼 조건 때문
          } catch(e) {
            console.log(e);
          }
          } 
        break;
      case 2:
        if(DetailQuestion.nextPage)
        {
          titleData.push({"title_id":DetailQuestion.index,"title_select":DetailQuestion.SelectId});
          DetailQuestion.prevPage.push(DetailQuestion.index);
          DetailQuestion.index = DetailQuestion.nextPage;
          DetailQuestion.nextPage=null;
          DetailQuestion.SelectChecked='';
          if(DetailQuestion.index!=4)
          {
            DetailQuestion.pageCount += 1;
          }
          DetailQuestion.loadSelectFromTitle(DetailQuestion.index);
        }
        else {
          titleData.push({"title_id":DetailQuestion.index,"title_select":DetailQuestion.SelectId});
          var SelectSaveData = {
            "request": Request.created_request,
            "data": titleData,
          }
          DetailQuestionApi.saveSelect(SelectSaveData);
          Request.step_index = 3;
        }
        Request.percentage += 14;
        break;
    }
  }
  render() {
    const { active } = this.state;
    const { Request, DetailQuestion } = this.props;
    return(
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <Header color={"#0a2165"}>
          {/* {this.props.title} */}
          기본 정보 입력 1/2
        </Header>
        <CustomSlider value={Request.percentage}/>
        <ContentBox>
          {this.props.content}
        </ContentBox>
        <MatchingText>요청하신 000 제품 개발에 최적화된 제조 파트너사를 매칭중입니다.</MatchingText>
        {/* <LogoSlider/> */}
        <SliderText>5가지 질문만 완성해주면 가견적이 나옵니다!</SliderText>
        <ButtonContainer>
          <NewButton active={ Request.step1_index!=1 && DetailQuestion.index!=1 } onClick={ this.prevButtonClick }>이전</NewButton>
          <div style={{marginRight: 14}} />
          <NewButton active={ active } onClick={ this.nextButtonClick }>다음</NewButton>
        </ButtonContainer>
    </div>
    )
  }
}

export default withRouter(MobileRequestCardContainer);

const Header = styled(Content.FontSize16)`
  width: auto;
  height: 46px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.13;
  letter-spacing: -0.4px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
`

const CustomSlider = withStyles({
  root: {
    color: '#0933b3',
    height: 4,
    width: '100%',
    borderRadius: 10,
    cursor:'default',
    position: "absolute",
    left: 0,
    paddingTop: 46,
    paddingBottom: 0
  },
  thumb: {
    display:'none'
  },
  track: {
    height: 4,
  },
  rail: {
    color: '#c6c7cc',
    opacity: 1,
    height: 4,
    borderRadius: 10,
  },
})(Slider);

const ThumbText = styled(Title.FontSize20)`
  position: relative;
  text-align:center;
  color: #0933b3;
  font-weight: bold;
`

const SliderText = styled(Content.FontSize13)`
  position: relative;
  height: 19px;
  text-align:center;
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.16px;
`

const MatchingText = styled(Content.FontSize15)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  color: #282c36;
  text-align:center;
  margin-bottom:20px;
`
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 120px;
`