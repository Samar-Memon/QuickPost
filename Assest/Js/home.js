let logoutArea_Img = document.querySelector('.logoutArea img');
let logoutArea_span = document.querySelector('.logoutArea span strong');

logoutArea_Img.src = sessionStorage.getItem('get_user_image')
logoutArea_span.textContent = sessionStorage.getItem('get_user_name')


import {
    getFirestore,
    collection,
    addDoc,
    db,
    getDocs,
    deleteDoc,
    doc
} from './firebase.js'

const getPosts = async() => {
    document.querySelector('.loader').style.display = 'block'

    const querySnapshot = await getDocs(collection(db, "All_Posts"));
querySnapshot.forEach((doc) => {
    if(doc.data().userEmail != sessionStorage.getItem('get_user_email')){
    document.querySelector('.loader').style.display = 'none'
        document.querySelector('section').innerHTML += `<div class="post">
            <div class="post_top">
                <div><img src="${doc.data().user_profile}" alt="">
                    <span>${doc.data().userName}</span></div>
                    <div>
                    <i class="fa-regular fa-heart"></i>
                    <div class="timeStamp">${getTimeDifference(doc.data().createdAt)}</div>
                    </div>
            </div>
            <div class="post-details">
                <div class="title">${doc.data().post_title}</div>
                <p class="desc">${doc.data().post_desc}</p>
            </div>
            <div class="post_body">
                <img src="${doc.data().post_URL}" alt="">
            </div>
        </div>`
    }

document.querySelectorAll('.fa-heart').forEach(h => {
    h.addEventListener('click', () => {

        h.classList.toggle('fa-solid')
    })
})
});
}
getPosts()

document.querySelector('.logoutArea').addEventListener('click', () => {
    document.querySelector('.downArea').classList.toggle('show')
    if(document.querySelector('.downArea').classList.contains('show')){
        document.querySelector('.logoutArea i').className = 'fa-solid fa-angle-up'
    }else{
        document.querySelector('.logoutArea i').className = 'fa-solid fa-angle-down'
    }
})




document.getElementById('logout').addEventListener('click', () => {
    location.href = './index.html'
    sessionStorage.removeItem('get_user_name')
    sessionStorage.removeItem('get_user_email')
    sessionStorage.removeItem('get_user_image')
});

function getTimeDifference(date) {
    const now = new Date();
    const postDate = new Date(date); // Client-side timestamp ko JavaScript date me convert karna
    const timeDiff = Math.abs(now - postDate);
    const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return diffDays;
  }


  document.querySelectorAll('.post').forEach(post => {
    post.querySelector('.post_body img').addEventListener('click', (e) => {
        document.querySelector('.openImageArea').style.display = 'flex'

        document.querySelector('.openImageArea img').src = e.target.src
        document.querySelector('.openImageArea h1 strong').textContent = e.target.parentElement.parentElement.querySelector('.title').textContent
        document.querySelector('.openImageArea p strong').textContent = e.target.parentElement.parentElement.querySelector('.desc').textContent
        

    })
  })

  document.querySelector('.openImageArea i').addEventListener('click', (e) => {
    e.target.parentElement.style.display = 'none'
    
  })