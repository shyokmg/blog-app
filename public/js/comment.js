const commentFormHandler = async (event) => {
    event.preventDefault();
    console.log('Comment Submitted')
    const comment = document.querySelector('#comment').value.trim();

        const blogpost_id = document.querySelector('#comment').getAttribute('data-id');
        if (blogpost_id && comment) {
            const response = await fetch(`/api/comments`, {
                method: 'POST',
                body: JSON.stringify({ blogpost_id, comment }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to comment on post')
            }
        }  
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);
