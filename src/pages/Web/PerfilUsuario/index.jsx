import React from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import LayoutPerfilUsuario from './LayoutPerfilUsuario/LayoutPerfilUsuario'

import PerfilUsuario from './Perfil/PerfilUsuario'
import FotoPerfilUsuario from './FotoPerfilUsuario/FotoPerfilUsuario'
import DesactivarPerfilUsuario from './DesactivarPerfilUsuario/DesactivarPerfilUsuario'


const PagesPerfilUsuario = () => {
  return(
    <LayoutPerfilUsuario>
      <Switch>
        <Route
          exact
          path="/perfil-usuario"
          render={() => <Redirect to="/perfil-usuario/datos" />}
        />
        <Route path="/perfil-usuario/datos" component={PerfilUsuario} />
        <Route path="/perfil-usuario/foto" component={FotoPerfilUsuario} />
        <Route path="/perfil-usuario/desactivar" component={DesactivarPerfilUsuario} />
      </Switch>
    </LayoutPerfilUsuario>
  )
}

export default PagesPerfilUsuario
