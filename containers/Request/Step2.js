import React from 'react'
import styled from 'styled-components'
import * as Title from 'components/Title'
import RequestCardContainer from './RequestCard';
import { inject, observer } from 'mobx-react';
import 'intersection-observer'; // polyfill

const Qimage = "static/images/request/Step2/Q.png";


@inject('DetailQuestion')
@observer
class Step2Container extends React.Component {
  state = {
    title: "제품은 어떤 소재인가요?",
    question: ["예", "아니오"],
    index: 1
  }
  
  componentDidMount() {
    const {DetailQuestion} = this.props;
    DetailQuestion.init();
    this.setState({loading:true});
  }

  content = () => {
    const { title, question,loading } = this.state;

    let test = (e) => {
      console.log(e.target.innerText)
    }
    const {DetailQuestion} = this.props;

    return (

      <>
        <TitleContainer>
          <img src={ Qimage }/>
          <TitleQue>{this.state.title}&nbsp;&nbsp;&nbsp;&nbsp;{this.state.index}/5</TitleQue>
          {/* <TitleQue>{this.state.title}&nbsp;&nbsp;&nbsp;&nbsp;{this.state.index}/5</TitleQue> */}
          {/* <TitleQue>{DetailQuestion.title_list.results[1].question}</TitleQue> */}
        </TitleContainer>
        <SelectContainer>
          {
            this.state.question.map((question) => {
              return (
              <>
                <input style={{display: 'none'}} value={Request.select_big ? Request.select_big.maincategory : ''} class="Input"/>
                <Select onClick = {test}>
                  <Text id={'queText'} color={"#282c36"}>
                    {question}
                  </Text>
                </Select>
              </>
              )}
            )
          }
        </SelectContainer>
      </>
    );
  }

  render(){
    const content = this.content();
    const { DetailQuestion } = this.props
    
    return (
      <RequestCardContainer title={"제품 정보 선택"} content = { content }>
        
      </RequestCardContainer>
    );
  }
}

export default Step2Container;



const TitleContainer = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const TitleQue = styled(Title.FontSize24)`
  font-weight: bold;
  letter-spacing: -0.6px;
  color: #282c36;
  display: inline;
  margin-left: 10px;
`
const SelectContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-left: 33px;
`
const Text = styled(Title.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.16px;
  color: ${(props) => (props.color ? props.color : '#282c36')};
  margin-left: 10px;
`
const Select = styled.button`
  border: none;
  width: 686px;
  height: 46px;
  background-color: #ffffff;
  object-fit: contain;
  border-radius: 3px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  outline: 0;
  border: 0;
  &:hover {
    border: solid 2px #0933b3;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  }
`
