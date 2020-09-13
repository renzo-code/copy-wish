import React from 'react'
import Modal from '../../../components/Modal/Modal'
import { connect } from 'react-redux'

import { auth } from'../../../actions/login/auth'

class ModalRegistro extends React.Component {
  state = {
    
  }




  inputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }



  render(){
    return(
      <div>
        <Modal
          show={this.props.show}
          className="middle"
          onClose={this.props.onClose}
          onClick={this.props.onClick}
        >

        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  auth: store
})

const mapDispatchToProps = (dispatch) => ({
  postLogin:() => dispatch(auth())
})

const Main = connect(mapStateToProps, mapDispatchToProps)

export default Main(ModalRegistro)