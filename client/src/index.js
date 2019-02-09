import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import store from './store'
import './css/config.css'
import { createMuiTheme } from '@material-ui/core/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'

// Needed for onTouchTap used by some material-ui components
// http://stackoverflow.com/a/34015469/988941
//injectTapEventPlugin();

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#673ab7"
    },
    secondary: {
      main: '#f44336'
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <div>
          <App />
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
try{
	registerServiceWorker();
}catch(error){
	console.log('erro registerServiceWorker')
}