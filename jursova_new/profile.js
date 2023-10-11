let user_id = localStorage.getItem('user_id');
console.log(user_id);

function get_user_info(){
    db.collection('users').doc(user_id).get().then(res =>{
        let user_info = res.data();
        document.getElementById('name').value = user_info.name;
        document.getElementById('lastname').value = user_info.lastname;
        document.getElementById('email').value = user_info.email;
        document.getElementById('password').value = user_info.password;
    })
}
get_user_info();

function edit(x,y){
   let elem =  document.getElementById(x)
    elem.removeAttribute('readonly');
    elem.classList.add('input_edit')
    document.getElementById(y).innerHTML = `
        <button onclick="save('${x}','${y}')">Зберегти</button>
    `
}
function save(x1,y1){
    let elem =  document.getElementById(x1)
    elem.setAttribute('readonly','');
    elem.classList.remove('input_edit')
    document.getElementById(y1).innerHTML = `
        
    `
    var updateData = {};
  updateData[x1] = elem.value;

    
    db.collection('users').doc(user_id).update(updateData).then(res=>{
        console.log('успіх')
    })
}
function signOut() {
    console.log('Clicked the signOut link'); // Add this line to check if the event handler is being triggered
    firebase.auth().signOut().then(() => {
        console.log('Sign-out successful.');
    }).catch((error) => {
        console.error('Sign-out error:', error);
    });
    setTimeout(function () {
        window.location.href = `z1.html`;
    }, 1000);
}





document.getElementById('upload-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    const storageRef = storage.ref();
    console.log(fileInput)
    console.log(file)
    console.log(storageRef)
  
    const fileRef = storageRef.child('images/' + file.name);
  
    fileRef.put(file).then(snapshot => {
      console.log('Файл завантажено успішно');
    }).catch(error => {
      console.error('Помилка завантаження файлу', error);
    });
  });


  const fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', function (e) {
  const file = e.target.files[0];
  const storageRef = storage.ref();

  const fileRef = storageRef.child('images/' + file.name);

  fileRef.put(file).then(snapshot => {
    console.log('Файл завантажено успішно');
  }).catch(error => {
    console.error('Помилка завантаження файлу', error);
  });
});
  