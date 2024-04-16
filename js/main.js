// import { chkModuleJS } from "./myModule.js";
// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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

// chkModuleJS("Minyoung");
