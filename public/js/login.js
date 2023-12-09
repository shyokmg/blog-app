const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status >= 200 && response.status <= 299) {
        document.location.replace('/dashboard');
      } else {
        let errorMessage = 'Failed to login';
        if (response.status !== 500) {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = `Failed to login: ${errorData.message}`;
          }
        }
        alert(errorMessage);
      }
    }
  };

  document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);