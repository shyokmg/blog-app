const editFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-editpost').value.trim();
    const content = document.querySelector('#content-editpost').value.trim();

    if (title && content) {
        if (event.target.hasAttribute('data-id')) {
            const id = event.target.getAttribute('data-id');
            const response = await fetch(`/api/blogposts/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ id, title, content }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Failed to edit post')
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
