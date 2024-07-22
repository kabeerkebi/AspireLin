import { GetCookie } from "../hooks/cookieHooks"

export const createTokenHeader = (image) => {
  // Get the tokens from cookies
  const token = GetCookie('token');
  const employerToken = GetCookie('employerToken');
  const adminToken = GetCookie('adminToken');
  
  // Logic to choose the appropriate token with priority: adminToken > employerToken > token
  let selectedToken;
  if (adminToken) {
    selectedToken = adminToken;
  } else if (employerToken) {
    selectedToken = employerToken;
  } else if (token) {
    selectedToken = token;
  } else {
    selectedToken = null;
  }
  
  return {
    headers: {
      'Content-Type': image ? 'multipart/form-data' : 'application/json',
      'x-access-token': `Bearer ${selectedToken}`
    }
  };
}
