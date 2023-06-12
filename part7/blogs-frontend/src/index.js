import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import LoginPage from "./components/LoginPage";

const Root = () => {
  return (
    <Provider store={ store }>
      <LoginPage />
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
