import React, {useState} from 'react'
import {
  Heading,
  Box,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import {Container} from './'

const Protection = ({children}) => {
  const officialPassword = 'crumbleLakes13'
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [allowed, setAllowed] = useState(false)

  const passValidation = () =>
    if (password === officialPassword) {
      localStorage.setItem('adminToken', 'validToken'); // Token could be a JWT
      setAuthenticated(true);
    } else {
      setError('Wrong password!');
    }
  };

  // Check token on component mount
    useEffect(() => {
      const token = localStorage.getItem('adminToken');
      if (token === 'validToken') {
        setAuthenticated(true);
      }
    }, []);

    return authenticated ? (
      children
    ) : (
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={passValidation}>Submit</button>
        {error && <p>{error}</p>}
      </div>
    );
  };


export default Protection
