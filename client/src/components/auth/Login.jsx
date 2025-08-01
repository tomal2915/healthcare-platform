// components/auth/Login.jsx
import { useState } from 'react';
import { usePHI } from '../../hooks/usePHI';
import SecureInput from '../common/SecureInput';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { logPHIAccess } = usePHI();

  const handleSubmit = (e) => {
    e.preventDefault();
    logPHIAccess('Login attempt');
    // Auth logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <SecureInput 
        type="email"
        label="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
      />
      <SecureInput
        type="password"
        label="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
      />
      <button type="submit">Login</button>
    </form>
  );
}