import React from 'react'

import Input from '../../../../components/Input/Input'

import './FotoPerfilUsuarioStyle.scss'

class FotoPerfilUsuario extends React.Component {
  state={
    guardarFiles : {},
    base64 : '',
    
  }

  uploadImage = (e) => {
    const { files } = e.target
    console.log('e.target', files)
    
    if(files[0]){
      this.setState({
        guardarFiles : files[0]
      })

      const data = new FileReader() 
      data.onload = (ev) => {
        ev.preventDefault()
        const base64 = data.result
        this.setState({
          base64 : base64
        })
      }
      data.readAsDataURL(files[0])
    }
  }

  render(){

    const {
      base64
    } = this.state

    return(
      <>
        <div>
          <div className="cabeza-editar-perfil">
            <h2>Insertar foto de Perfil</h2>
          </div>

          <div className="container-foto-perfil-usuario">
            <div className="cuerpo-editar-perfil">
              <div className="footer-importar-foto">
                <div className="borde-perfil-usuario">
                  {base64 && <img className="img-perfil-usuario" src={base64} alt=""/> }
                
                </div>
                <Input
                  type="file"
                  onChange={this.uploadImage}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default FotoPerfilUsuario