import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIIxbpgYkbvH-EX-RDdrOX8rdziEBwSHA",
  authDomain: "sparta-ccbfe.firebaseapp.com",
  projectId: "sparta-ccbfe",
  storageBucket: "sparta-ccbfe.appspot.com",
  messagingSenderId: "137119719673",
  appId: "1:137119719673:web:4aa90eb4c5e3d5f4a18228",
  measurementId: "G-B8P5ZXYR0S",
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

$(document).ready(async function () {
  let querySnapshot = await getDocs(collection(db, "til"));
  let docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  docs.sort((a, b) => new Date(a.listDate) - new Date(b.listDate));

  let title = row["list"];
  let tilDate = row["listDate"];
  let isDone = row["done"] || false;

  let temp_html = `
        <div class="lists ${isDone ? "done" : ""}" data-id="${row.id}">
          <div class="txt" id="openModal">${list}<span>${listDate}까지 완료해야 합니다.</span></div>
          <div class="chkbox">
            <div class="outer-circle">
              <div class="inner-circle"></div>
            </div>
          </div>
        </div>
      `;

  $(".accordion").append(temp_html);
});

$(document).ready(async function () {
  let querySnapshot = await getDocs(collection(db, "todolist"));
  let docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  docs.sort((a, b) => new Date(a.listDate) - new Date(b.listDate));

  docs.forEach((row) => {
    let list = row["list"];
    let listDate = row["listDate"];
    let isDone = row["done"] || false;

    let temp_html = `
          <div class="lists ${isDone ? "done" : ""}" data-id="${row.id}">
            <div class="txt" id="openModal">${list}<span>${listDate}까지 완료해야 합니다.</span></div>
            <div class="chkbox">
              <div class="outer-circle">
                <div class="inner-circle"></div>
              </div>
            </div>
          </div>
        `;

    $(".myTodoList").append(temp_html);
  });
});

$(document).on("click", ".myTodoList .chkbox", async function () {
  $(this).closest(".lists").toggleClass("done");

  let docId = $(this).closest(".lists").attr("data-id");
  let isDone = $(this).closest(".lists").hasClass("done");
  let docRef = doc(db, "todolist", docId);

  await updateDoc(docRef, {
    done: isDone,
  });
});

$(document).on("click", "#openModal", async function () {
  let docId = $(this).closest(".lists").attr("data-id");
  $(".modal-content .delete").attr("data-id", docId);

  $("#modal").fadeIn();
  $("body").css("background-color", "rgba(0, 0, 0, 0.5)");
});

$(document).on("click", ".modal-content .delete", async function () {
  let docId = $(this).attr("data-id");
  await deleteDoc(doc(db, "todolist", docId));
  $(`.lists[data-id="${docId}"]`).remove();
  $("#modal").fadeOut();
  $("body").css("background-color", "#fff");
});

$(".close").on("click", (e) => {
  $("#modal").fadeOut();
  $("body").css("background-color", "#fff");
});

$("#listAddBtn").click(async function () {
  let list = $("#todolist").val();
  let listDate = $("#todolistdate").val();

  let doc = {
    list: list,
    listDate: listDate,
    done: false,
  };

  if (list === "") {
    alert(" 해야 할 일을 적어주세요 🥹");
  } else if (listDate === "") {
    alert(" 마감기한을 넣어주세요 🥹");
  } else {
    await addDoc(collection(db, "todolist"), doc);
    alert("할 일을 성공적으로 추가하였습니다.");
    window.location.reload();
  }
});
