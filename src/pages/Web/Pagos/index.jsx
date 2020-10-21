import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import LayoutMetodosDePago from './LayoutMetodosDePago/LayoutMetodosDePago'
import PagoConTarjeta from './PagoConTarjeta/PagoConTarjeta'
import Pago2 from './Pago2/Pago2'

const PagesMetodosDePago = () => {
  return(
    <LayoutMetodosDePago>
      <Switch>
        <Route
          exact
          path="/metodo-pago"
          render={()=><Redirect to="/metodo-pago/tarjeta"/>}
        />
        <Route path="/metodo-pago/tarjeta" component={PagoConTarjeta} />
        <Route path="/metodo-pago/2" component={Pago2} />
      </Switch>
    </LayoutMetodosDePago>
  )
}

export default PagesMetodosDePago