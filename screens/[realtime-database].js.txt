Link:
https://www.youtube.com/watch?v=5V_TsdFwf50


# Realtime Database =====================
- database() return về Database

- ref() là 1 method của Database, nó return về Reference, readmore về Reference:
https://firebase.google.com/docs/reference/js/firebase.database.Reference?authuser=0
  -- database().ref(<path>: undefined | string) return về 1 Reference, link:
https://rnfirebase.io/reference/database#ref
  -- Tham chiếu tới root Database:
firebase.database().ref()
  -- Tham chiếu tới child Database:
firebase.database().ref("child/path") 

- update() là method của Reference, nó return về 1 Promise
  -- database().ref().update({id, name}) 
https://firebase.google.com/docs/reference/js/firebase.database.Reference?authuser=0#update

- on('value', (dataSnapshot) => {...}) là method của Reference, 
  -- đọc dữ liệu và lắng nghe sự thay đổi của dữ liệu, 
  -- nó nhận vào:
    --- tham số thứ nhất là EventType (gồm: "value" | "child_added" | "child_changed" | "child_moved" | "child_removed" )
    --- tham số thứ hai là 1 callback, có param là 1 DataSnapshot, để duyệt qua param này,
  ta sử dụng method forEach() của DataSnapshot (không giống array.forEach())
    --- link: https://firebase.google.com/docs/reference/js/firebase.database.Reference#on
vd: Ta có:
  /
  |_ users
      |_ id1: {...}
      |_ id2: {...}
  Để trích xuất id1 và id2 trong Database ta sử dụng các method: on() & forEach() & val():
  database().ref('/users').on('value', (dataSnapshot) => dataSnapshot.forEach(item => console.log(item.val()))) -> id1, id2


- forEach() là method của DataSnapshot, link:
https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot#foreach


- database().ref().push().key;
  -- database.ref() sẽ cho ra địa chỉ: https://minhphong1515.firebaseio.com/
  -- method push() sẽ tạo ra 1 khóa mới với mã bất kỳ, vd:
  database.ref().push() sẽ cho ra địa chỉ: https://minhphong1515.firebaseio.com/-MMRdUtIglZZv2sZ6_Jg
  -- Với thuộc tính key, có 2 ý nghĩa:
    1 - là thuộc tính của method push(), theo tài liệu, để lấy giá trị của method push() ta
    sử dụng thuộc tính .key, link:
    https://firebase.google.com/docs/database/web/lists-of-data#append_to_a_list_of_data
    vd: push().key => trả về -MMRdUtIglZZv2sZ6_Jg

    2 - là thuộc tính của ThenalbeReference, link:
    https://firebase.google.com/docs/reference/js/firebase.database.ThenableReference#key
    vì method push() trả về 1 ThenableReference, mà ThenableReference có 1 thuộc tính là .key,
    mà thuộc tính này trả về 'phần cuối của đường dẫn path'
    vd: database().ref().push() sẽ cho ra địa chỉ: https://minhphong1515.firebaseio.com/-MMRdUtIglZZv2sZ6_Jg
    Khi ta thêm .key vào:
    database().ref().push().key thì nó sẽ trả về phần cuối của đường dẫn là: -MMRdUtIglZZv2sZ6_Jg






