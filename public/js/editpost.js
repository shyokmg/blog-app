const editFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title-editpost').value.trim();
    const content = document.querySelector('#content-editpost').value.trim();
  
    if (title && content) {
      const dataID = document.querySelector('#content-editpost');
      if (dataID.hasAttribute('data-id')) {
        const id = dataID.getAttribute('data-id');
        const response = await fetch(`/api/blogposts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status >= 200 && response.status <= 299) {
          document.location.replace('/dashboard');
        } else {
          let errorMessage = 'Failed to edit post';
          if (response.status !== 500) {
            const errorData = await response.json();
            if (errorData && errorData.message) {
              errorMessage = `Failed to edit post: ${errorData.message}`;
            }
          }
          alert(errorMessage);
        }
      }
    }
  };

const deleteButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogposts/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post')
        }
    }
};

document
  .querySelector('.editpost-form')
  .addEventListener('submit', editFormHandler);

document
  .querySelector('.btn-danger')
  .addEventListener('click', deleteButtonHandler);
