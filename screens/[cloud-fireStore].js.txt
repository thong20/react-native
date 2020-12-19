// Link: https://firebase.google.com/docs/firestore/quickstart?authuser=0

const { firebase } = require("@react-native-firebase/auth");
const { get } = require("react-native/Libraries/Utilities/PixelRatio");

const usersRef = firebase.collection('Users');

// ======================================================================
// === Tạo 1 collection và doc mới ======================================
// ======================================================================
// Cách 1: Sử dụng hàm add() return về 1 Promise
usersRef
  .add({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815,
  })
  .then((docRef) => console.log('Document written with ID: ', docRef.id))
  .catch((error) => console.error('Error adding document: ', error));

// Cách 2: Sử dụng hàm doc() và set()
usersRef.doc('1234').set({
  name: 'abc',
  age: '22',
});

// Với cách 1, id của "document" sẽ tự tạo auto-generate
/*
  Với cách 2, ta có thể tùy chỉnh id cho "doc" là 1234 và
  hàm set() có thể modify lại dữ liệu của "doc" có id 1234, vd:
*/

usersRef.doc('1234').set({
  name: 'thong',
});
// lúc này "doc" 1234 sẽ có giá trị là {name: 'thong'} thay vì {name: 'abc', age: '22'}

// ======================================================================
// === Update dữ liệu ===================================================
// ======================================================================
/*
  Để update lại giá trị của "doc", ta sử dụng method update()
  Ta có:
  /
  |_ Users
        |_ 1234
              |_ name: 'abc'
              |_ age: '22'
*/
usersRef.doc('1234').update({
  name: 'Trump',
});
/*
  Kết quả:
  /
  |_ Users
      |_ 1234
          |_ name: 'Trump'
          |_ age: '22'
*/
// Vậy hàm update() không xóa dữ liệu giống như hàm set()

// ======================================================================
// === Fetch / Get - Đọc dữ liệu  =======================================
// ======================================================================

để đọc dữ liệu 1 lần "One-time read" ta sử dụng hàm get()
hàm get() trả về 1 Promise QuerySnapshot (Promise<QuerySnapshot>),
nghĩa là, hàm .then() nhận vào 1 callback và callback này có params là 1
QuerySnapshot, vd: ...get().then(snapshot => {...})
link: https://rnfirebase.io/reference/firestore/collectionreference#get
vd: 
firebase().collection('Users').get() => Promise QuerySnapshot

để duyệt qua dữ liệu của QuerySnapshot này ta có thể sử dụng
method .forEach() của QuerySnapshot
link: https://firebase.google.com/docs/reference/node/firebase.firestore.QuerySnapshot?authuser=0&hl=en#foreach
- Hàm .forEach() nhận vào 1 callback, callback này trả về
1 QueryDocumentSnapshot
- link: https://firebase.google.com/docs/reference/node/firebase.firestore.QueryDocumentSnapshot?authuser=0&hl=en
- QueryDocumentSnapshot chứa dữ liệu được đọc từ "docs", để trích xuất
dữ liệu này ta sử dụng 1 trong 2 method là .data() || .get("field") 
vd:
firebase().collection('Users')
  .get()
  .then(snapshot => snapshot.forEach(item => console.log(item.data())))



