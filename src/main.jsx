import React from 'react'
import ReactDOM from 'react-dom/client'
import { Layout } from './Layout'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <Layout />
  </Provider>
  
)
