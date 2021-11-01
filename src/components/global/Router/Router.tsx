import React from 'react';
import styles from './Router.module.scss';
import views from 'components/views/index'
// import config from '_config'
import { history } from '_libs/_helpers'
import { Route, Router, Switch, 
  // BrowserRouter, HashRouter 
} from 'react-router-dom';

const RootComponent = 'Home';
const ErrorComponent = 'Error';
const excludeComponents = ['Error']

const routes = [
  { ...views.find((view) => view.name === RootComponent), path: '/' },
  ...views.filter((view) => view.name !== RootComponent && view.name !== ErrorComponent)
    .map((view) => { return { ...view, path: `${view.path}` } }),
  { ...views.find((view) => view.name === ErrorComponent), path: '/**' },
]


//routes for Navigation
export const navRoutes = [
  { ...views.find((view) => view.name === RootComponent), path: '/' },
  ...views.filter((view) => view.name !== RootComponent && !excludeComponents.includes(view.name))
    .map((view) => { return { ...view, path: `${view.path.split('/:')[0]}` } }),
]

const Routes: React.FC = () => {

  return (
    <div className={`${styles.SwitchContainer} content`} data-testid="Router">
      <Router 
      history={history}
      // basename={config.app.basename}
      >
        <Switch>
          {routes.map((t) => {
          return (
            <Route
              key={`${t.name}`}
              exact={t.path.split('/:')[1] ? false : true}
              path={t.path}
              component={t.Component}
            />
          )})}
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;
