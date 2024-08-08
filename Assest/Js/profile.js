import {
    getStorage,
    storage,
    ref,
    uploadBytes ,
    getDownloadURL,
    deleteObject
} from './firebase.js'


import {
    getFirestore,
    collection,
     addDoc,
     db,
     getDocs,
     deleteDoc,
     doc
} from './firebase.js'



let openPostBar = document.getElementById('openPostBar');
let upload_post_area = document.querySelector('.upload_post_area');
let closePostBar = upload_post_area.querySelector('i');

openPostBar.addEventListener('click', () => {
    upload_post_area.style.display = 'flex'
})

closePostBar.addEventListener('click', () => {
    upload_post_area.style.display = 'none'
})

let logoutArea_Img = document.querySelector('.logoutArea img');
let logoutArea_span = document.querySelector('.logoutArea span strong');

logoutArea_Img.src = sessionStorage.getItem('get_user_image')
logoutArea_span.textContent = sessionStorage.getItem('get_user_name')


let profile_user_name = document.querySelector('.top span');
profile_user_name.textContent = sessionStorage.getItem('get_user_name')

let profile_user_image = document.querySelector('.top img');
profile_user_image.src = sessionStorage.getItem('get_user_image')


// Get posts_area
let posts_area = document.querySelector('.posts_area');



// Get Uplload Post Btn
let uploadBtn = document.getElementById('uploadBtn');
// Get Uploaded File Input
let new_post_input = document.getElementById('new_post_input');
// Get Title inp
let post_title = document.getElementById('post_title');
// Get Desc TextArea
let post_desc = document.getElementById('post_desc');

// Create Collection for Posts
let postsCollection = collection(db, 'All_Posts');

// Get loader
let loader = document.querySelector('.loader');
let strRef;
uploadBtn.addEventListener('click', async(e) => {
    let Post_Title_trim = post_title.value.trim().toLowerCase();
    let Post_Desc_trim = post_desc.value.trim().toLowerCase();
    if(new_post_input.files.length > 0 && Post_Title_trim.length > 0 && Post_Desc_trim.length > 0){
        if(new_post_input.files[0].type.startsWith('image/')){
            e.target.disabled = true
            loader.style.display = 'block'
            closePostBar.style.display = 'none'
            strRef = ref(storage, `${sessionStorage.getItem('get_user_email')}/${new_post_input.files[0].name}`)

            uploadBytes(strRef, new_post_input.files[0]).then((snapshot) => {
                getDownloadURL(strRef)
                .then( async(url) => {
                  try {
                    const docRef = await addDoc(postsCollection, {
                        userName: sessionStorage.getItem('get_user_name'),
                        userEmail: sessionStorage.getItem('get_user_email'),
                        post_URL: url,
                        post_title: Post_Title_trim,
                        post_desc: Post_Desc_trim,
                        user_profile: sessionStorage.getItem('get_user_image'),
                        createdAt: new Date().toISOString(),
                    });
                    loader.style.display = 'none'
                    post_desc.value =''
                    post_title.value =''
                    setTimeout( async() => {
                    upload_post_area.style.display = 'none'
                    // location.reload()
                    get_posts()
            e.target.disabled = false

                    }, 500)

                  } catch (e) {
                    console.error("Error adding document: ", e);
                  Swal.fire(err)
                  }
                }).catch((err) => {
                  console.log(err);
                  Swal.fire(err)
            loader.style.display = 'none'

                })
              });

        }else{
            Swal.fire('Only Image is Supportable')
        }
    }else{
        Swal.fire('Invalid File or Desc or Title')
    }
})

const get_posts = async() => {
    const querySnapshot = await getDocs(postsCollection);
    posts_area.innerHTML = '';
    querySnapshot.forEach((doc) => {
        if(doc.data().userEmail == sessionStorage.getItem('get_user_email')){
            posts_area.innerHTML += `<div class="own_post"><img src="${doc.data().post_URL}" id="${doc.id}" alt="${doc.id}"></div>`
            document.querySelector('.viewPostsArea').innerHTML+= `<div class="viewPost">
                    <div class="viewPostTop">
                        <div class="viewPostTitle"><strong>Title:</strong> <span>${doc.data().post_title}</span></div>
                        <div class="viewPostDesc"><strong>Description:</strong> <span>${doc.data().post_desc}</span></div>
                    </div>
                    <img src="${doc.data().post_URL}" alt="">
                </div>`
        }
});
}

window.onload = () => {
    get_posts()
}



document.querySelector('.logoutArea').addEventListener('click', () => {
    document.querySelector('.downArea').classList.toggle('show')
    if(document.querySelector('.downArea').classList.contains('show')){
        document.querySelector('.logoutArea i').className = 'fa-solid fa-angle-up'
    }else{
        document.querySelector('.logoutArea i').className = 'fa-solid fa-angle-down'
    }
})

document.querySelector('title').innerHTML = `${sessionStorage.getItem('get_user_name')} ||  Profile`;

document.getElementById('logout').addEventListener('click', () => {
    location.href = './index.html'
    sessionStorage.removeItem('get_user_name')
    sessionStorage.removeItem('get_user_email')
    sessionStorage.removeItem('get_user_image')
});


document.getElementById('viewAllPosts').addEventListener('click', (e) => {
    document.querySelector('.viewPostsArea').classList.toggle('view')
    document.querySelector('.posts_area').classList.toggle('hide')
    if(document.querySelector('.viewPostsArea').classList.contains('view')){
        e.target.style.background = '#ccc'
        e.target.style.color = '#444'
        e.target.innerHTML = `<i class="fa-solid fa-eye-slash"></i> Hide All Post`
    }else{
        e.target.style.background = 'transparent'
        e.target.style.color = '#777'
        e.target.innerHTML = `<i class="fa-solid fa-eye"></i> View All Post`
    }
})