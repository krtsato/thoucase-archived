import React from 'react'
import PropTypes from 'prop-types'
import withProps from 'recompose/withProps'
import {Route, Switch, Redirect} from 'react-router-dom'
import {Top} from 'packs/home/top'
import {About} from 'packs/home/about'
import {ShwIndex} from 'packs/showcases/index'
import {CrsIndex} from 'packs/crystals/index'
import {FrgIndex} from 'packs/fragments/index'
import {UsrIndex} from 'packs/users/index'
import {FrgNew} from 'packs/fragments/new'
import {Signin} from 'packs/users/signin'

export const Routes = ({isSignin, onGenChange}) => {
  /* raw component に props 付加 */
  const AddGenPropsTo = (rawComp) => {
    const compWithProps = withProps({onGenChange})(rawComp)
    return compWithProps
  }

  return (
    <main id='mainWrap'>
      <Switch>
        {/* Home */}
        <Route exact path={['/', '/top']} render={AddGenPropsTo(Top)} />
        <Route exact path='/about' render={AddGenPropsTo(About)} />
        {/* Users */}
        <Route exact path='/users' render={AddGenPropsTo(UsrIndex)} />
        <Route exact path='/signin' render={AddGenPropsTo(Signin)} />
        {/* Fragments */}
        <Route exact path='/fragments' render={AddGenPropsTo(FrgIndex)} />
        <AuthRoutes isSignin={isSignin}>
          <Switch>
            {/* Showcases */}
            <Route exact path='/showcases' render={AddGenPropsTo(ShwIndex)} />
            {/* Crystals */}
            <Route exact path='/crystals' render={AddGenPropsTo(CrsIndex)} />
            {/* Fragments */}
            <Route exact path='/fragments/new' render={AddGenPropsTo(FrgNew)} />
          </Switch>
        </AuthRoutes>
      </Switch>
    </main>
  )
}

/* Signin アクセス認可 */
const AuthRoutes = ({children, isSignin}) => (isSignin ? children : <Redirect exact to='/signin' />)

Routes.propTypes = {
  isSignin: PropTypes.bool,
  onGenChange: PropTypes.func
}

AuthRoutes.propTypes = {
  isSignin: PropTypes.bool,
  children: PropTypes.object
}

/* 追記予定
  <Route exact path='/users/new' component={UsrNew} />
  <Route exact path='/users/:id/edit' component={UsrEdit} />
  <Route exact path='/users/:id' component={UsrShow} />
  <Route exact path='/showcases/new' component={ShwNew} />
  <Route exact path='/showcases/:id/edit' component={ShwEdit} />
  <Route exact path='/showcases/:id' component={ShwShow} />
  <Route exact path='/crystals/new' component={CrsNew} />
  <Route exact path='/crystals/:id/edit' component={CrsEdit} />
  <Route exact path='/crystals/:id' component={CrsShow} />
  <Route exact path='/fragments/:id/edit' component={FrgEdit} />
  <Route exact path='/fragments/:id' component={FrgShow} />
*/