import React from 'react'
import Tabla from '../../../../components/Tabla/Tabla'
import { isEmpty, identity } from 'lodash'
import { connect } from 'react-redux'

import './CategoriaConfiguracion.scss'

import { create } from '../../../../actions/categoria/create'
import { list as obtenerCategoria } from '../../../../actions/categoria/list'

const dataCategoria = [
  "Nª",
  "Categoría",
  "Estado"
]

class CategoriaConfiguracion extends React.Component {
  state = {
    dataCategoria: [],
  }

  componentDidMount(){
    const { getCategoria } = this.props
    getCategoria()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEmpty(nextProps.listarCategoria) && nextProps.listarCategoria !== prevState.listCategoria) {
      return {
        listCategoria: nextProps.listarCategoria
      }
    }
    return null
  }

  render(){
    console.log('listCategoria', this.state.listCategoria)
    console.log('props',this.props)
    return(
      <div>
        <Tabla
          frame="50px 150px 100px"
          dataCabecera={dataCategoria}
        >
          {
            this.props.listarCategoria.map((item,i) =>{
              return(
                <div
                  className="cont-items-listar"
                  key={i}
                  style={{ gridTemplateColumns: "50px 150px 100px" }}
                >
                  <div className="items-listar">{item.id_categoria}</div>
                  <div className="items-listar">{item.categoria}</div>
                  <div className="items-listar">{item.estado}</div>
                </div>
              )
            })
          }
        </Tabla>

      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  createCategoria: store.categoria,
  listarCategoria: store.categoria.list.data
})

const mapDispatchToProps = (dispatch) => ({
  postCategoria: () => dispatch(create()),
  getCategoria: () => dispatch(obtenerCategoria())
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaConfiguracion)