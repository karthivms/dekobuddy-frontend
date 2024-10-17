export const getUser = (token: string) => {
    if (!token) return null;
  
    try {
      const payload = token.split('.')[1]; 
      return JSON.parse(atob(payload));    
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  };
