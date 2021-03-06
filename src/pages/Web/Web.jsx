import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Layout from '../../layout'
import Local from './Local/Local'
import Popular from './Popular/Popular'
import Ofertas from './Ofertas/Ofertas'
import Categoria from './Categoria/Categoria'
import PerfilUsuario from './PerfilUsuario'
import LayoutConfiguracion from './Configuracion'
import LayoutMetodosDePago from './Pagos'

const Pages = () => {

  return(
    <Layout>
      <Switch>
        <Route
          exact
          path="/"
          render={()=> <Redirect to='/login' />}
        />
        <Route path="/local" component={Local}/>
        <Route path="/popular" component={Popular}/>
        <Route path="/ofertas" component={Ofertas}/>
        <Route path="/categoria" component={Categoria} />
        <Route path="/perfil-usuario" component={PerfilUsuario} />
        <Route path="/configuracion" component={LayoutConfiguracion} />
        <Route path="/metodo-pago" component={LayoutMetodosDePago} />
      </Switch>
    </Layout>
  )
}

  export default Pages