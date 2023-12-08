const createFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-createpost').value.trim();
    const content = document.querySelector('#content-createpost').value.trim();

    if (title && content) {
        const response = await fetch(`/api/blogposts`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post')
        }
    }
};

document
    .querySelector('.createpost-form')
    .addEventListener('submit', createFormHandler);
