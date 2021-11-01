import React from 'react'
import styles from './Navigation.module.scss'
import { navRoutes } from 'components/global/Router/Router'
import { history } from '_libs/_helpers/history'
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
// import { links } from '_data/links.json'

export function navigate(event: any): void {
  typeof event.target.value === 'string' && history.push(event.target.value);
}
const Navigation: React.FC<any> = ({history}) => {
  const { t } = useTranslation('navigation');
  const [location, setLocation] = React.useState(history.location.pathname)
  React.useEffect( () => {
    history.listen((location: any, action: any) => {
      setLocation(location.pathname)
    })
  // emulate once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className={styles.Navigation} data-testid="Navigationtest">
    <nav>
      <ul className={styles.routes}>
        {navRoutes.map((r) =>
          <li key={r.path} className={`${r.path}`}>
            <div className="routes">
              <Button className={[`${location === r.path? 'active' : ''}`]} label={r.name && t(r.name)} value={r.path} onClick={navigate} />
            </div>
          </li>
        )}
      </ul>
    </nav>
  </div>
)
}

export default Navigation;
