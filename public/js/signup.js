const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password, }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status >= 200 && response.status <= 299) {
        document.location.replace('/dashboard');
      } else {
        let errorMessage = 'Failed to sign up';
        if (response.status !== 500) {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = `Failed to sign up: ${errorData.message}`;
          }
        }
        alert(errorMessage);
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  