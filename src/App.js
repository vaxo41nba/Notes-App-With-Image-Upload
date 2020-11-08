import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import reducer from "./redux/rootReducer";

import "./App.css";
import Notes from "./pages/Notes";
import AddNote from "./pages/AddNote";
import NoteEditView from "./pages/NoteEditView";
import NoteEditViewDemo from "./pages/NoteEditViewDemo";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Demo from "./pages/Demo";
import Header from "./components/Header";
import Authentication from "./components/Authentication";

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // chrome devtools thing
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Authentication(Notes)} />
            <Route path="/addnote" component={AddNote} />
            <Route path="/view-edit-note/:id" component={NoteEditView} />
            <Route
              path="/view-edit-note-demo/:id"
              component={NoteEditViewDemo}
            />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route path="/demo" component={Demo} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
