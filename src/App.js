import { Route, Switch } from 'react-router-dom'
import Main from './pages/Main'
import cls from './App.module.scss';
import FinishedRegister from './pages/FinishedRegister';
import Privacy from './pages/Privacy';
import { PrivateRoute } from './components/PrivateRoute';

const App = () => {
    return (
        <div className={cls.root}>
            <Switch>
                <Route path='/' exact component={Main} />
                <Route path='/privat-policy' exact render={() => (
                    <Privacy />
                )} />
                <PrivateRoute path='/finished-register' exact component={FinishedRegister} />
            </Switch>
        </div>
    )
}

export default App;