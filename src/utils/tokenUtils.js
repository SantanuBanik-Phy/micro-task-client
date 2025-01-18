export const getToken = () => {
    // Retrieve token from cookies
    const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

    // Fallback to localStorage
    const localToken = localStorage.getItem('jwtToken');

    return cookieToken || localToken;
};
