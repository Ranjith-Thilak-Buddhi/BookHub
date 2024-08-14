import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute/index'

import HomePage from './components/HomePage/index'
import LoginPage from './components/LoginPage/index'
import BookShelvesPage from './components/BookShelvesPage/index'
import BookItemPage from './components/BookItemPage/index'
import NotFoundPage from './components/NotFoundPage/index'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={HomePage} />
    <ProtectedRoute exact path="/shelf" component={BookShelvesPage} />
    <ProtectedRoute exact path="/books/:id" component={BookItemPage} />
    <Route exact path="/not-found" component={NotFoundPage} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
