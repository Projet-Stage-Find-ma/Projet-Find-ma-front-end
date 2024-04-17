import  {jwtDecode}  from "jwt-decode";


//decoding the token and extracting the user ID
export const getUserID =  () =>
{
    const token = localStorage.getItem('token');
    if(token)
    {
        const decodedToken = jwtDecode(token);
        return decodedToken.userId;
    }
    return null;
}


export const logout = () => {
    localStorage.removeItem('token');
}