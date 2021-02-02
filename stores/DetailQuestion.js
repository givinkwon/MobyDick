import { observable, action } from "mobx";

import * as DetailQuestionAPI from "axios/DetailQuestion";
import Router from "next/router";

class DetailQuestion {
  @observable title_list = [];
  @observable select = [];
  @observable index = 0;
  @observable pageCount = 0;
  @observable nextPage = 0;
  @observable prevPage = [];
  @observable SelectChecked='';
  @observable SelectId=null;
  @observable proposal_type = 0;
  @action init = async () => {
    this.reset()
    await DetailQuestionAPI.loadTitle()
      .then(res => {
          this.title_list = res.data;
        }
      )
  };
  @action reset = () => {
    this.title_list = [];
    this.select = [];
    this.index = 0;
    this.pageCount = 0;
    this.nextPage = 0;
    this.prevPage = [];
    this.SelectChecked='';
    this.SelectId=null;
    this.proposal_type = 0;

  }
  @action loadSelectFromTitle = async (m_index) => {
    await DetailQuestionAPI.loadSelect(m_index)
      .then(res => {
          this.select = res.data;
        }
      )
  };

  @action loadProposalType = async (req) => {
    console.log(req)
    await DetailQuestionAPI.saveSelect(req)
      .then(res => {
          console.log(res)
          this.proposal_type = res.data.proposalId;
          console.log(this.proposal_type)
        }
      )
  };

}


export default new DetailQuestion()
