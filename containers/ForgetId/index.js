import React from 'react'
import Head from 'next/head'
import { inject, observer } from 'mobx-react'

import FormConatiner from './Form'

@inject('Auth')
@observer
class ForgetIdConatiner extends React.Component {
  render(){
    const { Auth } = this.props
    return (
      <>
        {Auth.step === 0 && <FormConatiner/>}
        {Auth.step === 1 && <CompleteContainer/>}
      </>
    )
    
    
  }
}

export default ForgetIdConatiner