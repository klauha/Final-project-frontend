import { Input } from '../../common/Input/Input'
import "./Login.css"
import { login } from '../../services/apiCalls'
import { useNavigate } from 'react-router-dom'
import { decodeToken } from 'react-jwt'
import { Header } from '../../common/Header/Header'
import { Button } from '../../common/Button/Button'

const [bodyCredentials, setBodyCredentials] = useState(
    {
      email: "",
      password: ""
    }
  )

  const [bodyCredentialsError, setBodyCredentialsError] = useState(
    {
      email: "",
      password: ""
    }
  )