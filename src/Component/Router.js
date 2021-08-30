import { filter } from "minimatch";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home.js";
import Filter from "./Filter.js";
import Details from "./Details";
import Header from "./Header.js";
function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path='/' component={Home} />
      <Route path='/filter' component={Filter} />
      <Route path='/details' component={Details} />
    </BrowserRouter>
  );
}

export default Router;
