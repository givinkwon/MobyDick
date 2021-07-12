import React, {Component} from 'react'
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

import * as Text from 'components/Text'
import CloseModalButton from "components/CloseModalButton"
import {inject, observer} from "mobx-react";

@inject('Answer')
@observer
class CheckReviewModal extends Component {
  handleClick = (acceptance) => {
    const {Answer, rating, content, postReview, handleClose} = this.props;

    const activeReview = Answer.active_review
    handleClose();

    if(acceptance) {
      // 리뷰 post
      postReview()
    }
  }

  render() {
    const {Answer, open, handleClose} = this.props
    const activeReview = Answer.active_review

    return (
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="call-modal"
        aria-describedby="call-modal"
      >
        <DialogBody>
          <CloseModalButton handleClose={handleClose} />
          <Text.FontSize32 color="#404040" fontWeight={600}>
            { activeReview ? '리뷰를 수정하시겠습니까?' : '리뷰 작성을 완료하시겠습니까?' }
          </Text.FontSize32>
        </DialogBody>

        <DialogFooter>
          <Text.FontSize32 color="black" fontWeight={700} onClick={() => this.handleClick(true)}>
            예
          </Text.FontSize32>
          <Text.FontSize32 color="black" fontWeight={700} onClick={() => this.handleClick(false)}>
            아니오
          </Text.FontSize32>
        </DialogFooter>
      </StyledDialog>
    )
  }
}

export default CheckReviewModal

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
		border-top-left-radius: 9px !important;
 		border-top-right-radius: 9px !important;
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
    > div {
    	:nth-of-type(3) {
    		> div {
    			max-width: 500px;
    		}
    	}
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  	> div {
    	:nth-of-type(3) {
    		> div {
    			width: 720px;
    			max-width: 720px;
    		}
    	}
    }
  }
  @media (min-width: 992px) {
    > div {
    	:nth-of-type(3) {
    		> div {
    			width: 964px;
    			max-width: 964px;
    		}
    	}
    }
  }
`
const DialogBody = styled(DialogContent)`
	position: relative;
	background-color: #f5f5f5;
	padding: 60px 210px 40px !important;
	> p {
		word-break: keep-all;
		text-align: center;
		line-height: 1.25em;
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
    padding: 60px 30px 40px !important;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  	padding: 60px 150px 40px !important;
  }
`
const DialogFooter = styled(DialogContent)`
	background-color: #e6e6e6;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80px;
	padding: 0 !important;
	> p {
	  cursor: pointer;
	  flex: 1;
	  box-sizing: border-box;
	  height: 100%;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  border: 0.3px solid #a0a0a0;
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
    height: 50px;
  }
`
