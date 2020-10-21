import React from 'react'
import { connect } from 'react-redux'

import Input from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'

import { edit as editarFotoPefil } from '../../../../actions/fotoPerfil/edit'

import './FotoPerfilUsuarioStyle.scss'

const localObjUsuario = JSON.parse(localStorage.getItem("jwt"))
console.log('localObjUsuario',localObjUsuario)

class FotoPerfilUsuario extends React.Component {
  state={
    guardarFiles : {},
    base64 : '',
  }

  uploadImage = (e) => {
    const { files } = e.target
    // console.log('e.target', files)
    
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

  guardarImagen = () => {
    const {
      base64,
      guardarFiles
    } = this.state
    
    const {
      putFotoPerfil
    } = this.props

    const formData = new FormData()
    formData.append("file", guardarFiles)
    formData.append("base64", base64)
    formData.append("idUsuario", localObjUsuario.reply.id_usuario)
    formData.append("size", guardarFiles.size)

    console.log('dataFotoPerfil', guardarFiles)
    putFotoPerfil(formData)
  }

  render(){
    console.log('enviarFotoPerfil',this.props)

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
                  { base64 && <img className="img-perfil-usuario" src={base64} alt=""/> }
                </div>
                <Input
                  type="file"
                  onChange={this.uploadImage}
                />
                <Button
                  name="Guardar Imagen"
                  onClick={this.guardarImagen}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (store) => ({
  editFotoPerfil : store.fotoPerfil.create.data
})

const mapDispatchToProps = (dispatch) => ({
  putFotoPerfil : (fotoUsuario) => dispatch(editarFotoPefil(fotoUsuario))
})

export default connect(mapStateToProps, mapDispatchToProps)(FotoPerfilUsuario)