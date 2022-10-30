const API_URL = 'https://635e0272ed25a0b5fe3d1c12.mockapi.io';


const toBody = document.querySelector('tbody');

// Delete -> DELETE Operation ( Removes an entity )
const deletePost = async (postId) => {
  await fetch(
    `${API_URL}/posts/${postId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  );
  toBody.removeChild(document.getElementById(postId));
};

const addPostToTable = (postInfo) => {
  const { id, image, likes, caption } = postInfo;
  const postRow = document.createElement('tr');
  postRow.id = id;

  const tdId = document.createElement('td');
  tdId.innerText = id;
  const tdImage = document.createElement('td');
  tdImage.style.width = '150px';

  const imageEle = document.createElement('img');
  imageEle.src = image;
  imageEle.height = '100';
  imageEle.width = '100';
  tdImage.appendChild(imageEle);

  const tdLikes = document.createElement('td');
  tdLikes.innerText = likes;
  const tdCaption = document.createElement('td');
  tdCaption.innerText = caption;
  tdCaption.style.width = '300px';

  const tdActions = document.createElement('td');

  const editBtn = document.createElement('button');
  editBtn.setAttribute('class', 'btn btn-warning m-1');
  editBtn.innerText = 'Edit';
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'btn btn-danger m-1');
  deleteBtn.innerText = 'Delete';

  deleteBtn.addEventListener('click', () => {
    deletePost(`${id}`);
  });

  tdActions.append(editBtn, deleteBtn);
  postRow.append(tdId, tdImage, tdCaption, tdLikes, tdActions);

  toBody.appendChild(postRow);
}

// Read --> GET Operation ( Get All Details  ) 
const getPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  const posts = await response.json();
  // DOM Manipulation
  posts.forEach(addPostToTable);
}

// Read ---> GET Operation ( Get One Details  ) 
const getIndividualPost = async (postId) => {
  const response = await fetch(`${API_URL}/posts/${postId}`);
  const posts = await response.json();
  console.log(posts);
}

// Create ---> POST Operation ( Create a data )
const createPost = async (postInfo) => {
  const response = await fetch(
    `${API_URL}/posts`,
    {
      method: 'POST',
      body: JSON.stringify(postInfo),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  );
  const responseJson = await response.json();
  addPostToTable(responseJson);
};


// Update ---> PUT Operation ( Update/Edit Data )
const editPost = async (updatedInfo, postId) => {
  const response = await fetch(
    `${API_URL}/posts/${postId}`,
    {
      method: 'PUT',
      body: JSON.stringify(updatedInfo),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  );
  const responseJson = response.json();
  console.log(responseJson);
};

const overlay = document.getElementById('overlay');

overlay.addEventListener('click', () => {
  closeForm();
});

const openForm = () => {
  overlay.style.display = 'flex';
}

const closeForm = () => {
  overlay.style.display = 'none';
}

const postForm = document.getElementById('post-form');

postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let data = {};

  Array.from(e.target.elements).forEach((element) => {
    if (element.nodeName === 'INPUT') {
      data[element.name] = element.value;
    }
  });

  createPost(data);

  closeForm();
});

postForm.addEventListener('click', (e) => {
  e.stopPropagation();

});


window.addEventListener('DOMContentLoaded', () => {
  getPosts();
  // getIndividualPost('1');

  // createPost({
  //   caption: 'Random Image',
  //   image: 'https://picsum.photos/200/300',
  //   likes: 10
  // });

  // editPost({
  //   caption: 'Edting a Post',
  //   image: 'https://picsum.photos/200/300',
  //   likes: 10
  // }, '2');

  // deletePost('4');

});