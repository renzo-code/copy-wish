import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Layout from '../../layout/'
import Local from './Local/Local'
import Popular from './Popular/Popular'
import Ofertas from './Ofertas/Ofertas'
import Categoria from './Categoria/Categoria'
import perfilUsuario from './perfilUsuario/perfilUsuario'


const Pages = ({ logeado = false }) => {
  return(
    <Layout>
      <Switch>
        <Route
          exact
          path="/"
          render={()=> {
            if (logeado === true) {
              return <Redirect to="/popular"/> 
            }
            return <Redirect to="/login"/>
          }}
        />
        <Route path="/local" component={Local}/>
        <Route path="/popular" component={Popular}/>
        <Route path="/ofertas" component={Ofertas}/>
        <Route path="/categoria" component={Categoria} />
        <Route path="/perfil-usuario" component={perfilUsuario} />
      </Switch>
    </Layout>
  )
}

export default Pages