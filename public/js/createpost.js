// Create post handler
const createFormHandler = async (event) => {
    event.preventDefault();
    
    // Get form post data
    const title = document.querySelector('#title-createpost').value.trim();
    const content = document.querySelector('#content-createpost').value.trim();

    // Check if data exists
    if (title && content) {
        const response = await fetch(`/api/blogposts`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // Redirect to dashboard once post is created
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post')
        }
    }
};

document
    .querySelector('.createpost-form')
    .addEventListener('submit', createFormHandler);
