const { useCallback } = require("react");

Link
https://www.youtube.com/watch?v=XnV0IdSYj18&list=PLOrIp4IaHcFObpa3kgxjc2w7V8Hqhyl2u&index=10

docs:
https://firebase.google.com/docs/storage/web/start?authuser=0
https://rnfirebase.io/storage/usage


const storageRef = storage().ref('images/tempImage10.png');



======================================================================
=== Upload file ======================================
======================================================================

const task = storageRef.putString(dataURL, storage.StringFormat.DATA_URL);
equivalent
const task = storeageRef.putString(dataURL, 'data_url')

- Để upload file, ta sử dụng method putFile()
- Để upload 1 ảnh URL base64, ta sử dụng method putString()

- putString()
Nhận vào 1 URL base64, 

put(), putFile(), putString() luôn return về 1 UploadTask | Task
* UploadTask là Quá trình tải lên 1 đối tượng, cho phép bạn theo dõi và quản lý khi upload
link: https://rnfirebase.io/storage/usage#tasks

putFile() => 
put('Blob') => nhận vào 1 Blob
putString(dataURL, 'DATA_URL') 
- vói: 
  -- param1 là 1 String
  -- param2 là kiểu của param1 gồm: 'base64' | 'base64url' | 'data-url' và 'raw'
vd: const dataURL = 'data:image/gif;base64,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'; 


- storage.StringFormat.DATA_URL
StringFormat là 1 statics của storage, link:
https://rnfirebase.io/reference/storage#TaskEvent

==========================================
=== Theo dõi tiến trình upload ===========
==========================================

log ra tiến trình đang upload
task.on('state_changed', (taskSnapshot) => {
  console.log(
    `${taskSnapshot.bytesTransferred} transferredout of ${taskSnapshot.totalBytes}`,
  );
});

- hàm on() - link: https://firebase.google.com/docs/reference/js/firebase.storage.UploadTask#on
on('state_changed', cb_next, cb_err, complete) là method của Task,
để theo dõi tiến trình upload, hàm on() sẽ được gọi, khi tiến trình
upload thay đổi,
- vd: khi ta upload 1 ảnh dung lượng khoảng 1Mb, khi upload
ảnh này, tốc độ upload là 250kbps, như vậy tiến trình upload ảnh này khoảng 4s,
và xảy ra 4 event trong quá trình upload, và khi xảy ra sự kiện nó sẽ gọi hàm
callback có param là taskSnapshot
- xem thêm các vd tại: https://rnfirebase.io/reference/storage/tasksnapshotobserver
- với
  - param1: là 1 sự kiện, giá trị là 'state_changed', (required)
  - param2: là nextOrObserver (là hàm next() hoặc 1 Observer )


- Các cách viết khác:
var next = function(snapshot) {};
var error = function(error) {};
var complete = function() {};

// The first example.
uploadTask.on('state_changed', next, error, complete);

// This is equivalent to the first example.
uploadTask.on('state_changed', {
  'next': next,
  'error': error,
  'complete': complete
});

// This is equivalent to the first example.
var subscribe = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
subscribe(next, error, complete);

// This is equivalent to the first example.
var subscribe = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
subscribe({
  'next': next,
  'error': error,
  'complete': complete
});

- hàm then() của Task, nhận vào 1 useCallback,
callback có param là 1 TaskSnapshot, link về TaskSnapShot: https://rnfirebase.io/reference/storage/tasksnapshot




