document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.querySelector('.post-container');
    const loadMoreButton = document.querySelector('#load-more');

    let currentPage = 0;
    const postsPerPage = 3;
    let posts = [];

    // Función para cargar los datos del JSON
    function loadPostsFromJSON() {
        fetch('data/posts.json')
            .then(response => response.json())
            .then(data => {
                posts = data;
                loadMoreButton.addEventListener('click', loadMorePosts);
                loadMorePosts(); // Cargar los primeros posts al cargar la página
            })
            .catch(error => console.error('Error al cargar los posts:', error));
    }

    // Función para cargar más posts
    function loadMorePosts() {
        const start = currentPage * postsPerPage;
        const end = start + postsPerPage;
        const postsToLoad = posts.slice(start, end);

        postsToLoad.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('flavor-card');
            postElement.innerHTML = `
          <img src="${post.image}" alt="${post.title}">
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <button>Details &rarr;</button>
        `;
            postsContainer.appendChild(postElement);
        });

        currentPage++;

        // Ocultar el botón si no hay más posts para cargar
        if (currentPage * postsPerPage >= posts.length) {
            loadMoreButton.style.display = 'none';
        }
    }

    loadPostsFromJSON();
});
