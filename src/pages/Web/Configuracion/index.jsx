import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LayoutConfiguracion from './LayoutConfiguracion/LayoutConfiguracion'
import CategoriaConfiguracion from './CategoriaConfiguracion/CategoriaConfiguracion'
import MarcaConfiguracion from './MarcaConfiguracion/MarcaConfiguracion'
import ProductoConfiguracion from './ProductoConfiguracion/ProductoConfiguracion'


const PagesConfiguracion = () => {
  return(
    <LayoutConfiguracion>
      <Switch>
        <Route
          exact
          path="/configuracion"
          render={() => <Redirect to="/configuracion/categoria" />}
        />
        <Route path="/configuracion/categoria" component={CategoriaConfiguracion} />
        <Route path="/configuracion/marca" component={MarcaConfiguracion} />
        <Route path="/configuracion/producto" component={ProductoConfiguracion} />
      </Switch>
    </LayoutConfiguracion>
  )
}

export default  PagesConfiguracion
