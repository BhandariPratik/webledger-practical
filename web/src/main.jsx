import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <Auth0Provider
    domain="dev-qhel2jqv5su4t7yt.us.auth0.com"
    clientId="nTqRrmjHwr3mniHCFvMVeQZTUpSCYblp"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience:'https://dev-qhel2jqv5su4t7yt.us.auth0.com/api/v2/'
    }}
  >
     <App/>
  </Auth0Provider>
  </StrictMode>,
)
