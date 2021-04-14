import Header from './components/header/header'
import Main from './components/main/main'
import Footer from './components/footer/footer'
import About from './components/about/about'
import FullPost from './components/fullPost/fullPost'
import Signup from './components/auth/signup'
import Login from './components/auth/login'
import Dashboard from './components/auth/dashboard'
import PrivateRoute from './components/auth/privateRoute'
import ForgotPassword from './components/auth/forgotPassword'
import UpdateProfile from './components/auth/updateProfile'
import CompleteProfile from './components/auth/completeProfile'
import { Route, Switch, Redirect } from 'react-router-dom'

import { useAuth  } from './context/authContext'

function App() {

  const {currentUser} = useAuth()

  return (
    // <AuthProvider>
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/about" component={About} />
        <Route path="/post/:id" exact component={FullPost} />
        {!currentUser && 
          <>
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          </>
        }
        <PrivateRoute path="/update-profile" component={UpdateProfile} />
        <PrivateRoute path="/complete-profile" component={CompleteProfile} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <Redirect to="/" />
      </Switch>
      

      <Footer />
    </div>
    // </AuthProvider>
  );
}

export default App;
