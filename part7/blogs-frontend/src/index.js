import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import LoginPage from "./components/LoginPage";

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => root.render(<Provider store={ store }>
  <LoginPage />
</Provider>)

renderApp()
store.subscribe(renderApp)
