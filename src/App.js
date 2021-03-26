import Header from './components/header/header'
import Main from './components/main/main'
import Footer from './components/footer/footer'
import About from './components/about/about'
import FullPost from './components/fullPost/fullPost'
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/about" component={About} />
        <Route path="/post/:id" exact component={FullPost} />
      </Switch>
      

      <Footer />
    </div>
  );
}

export default App;
