import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, remove } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqfN1_1HT6_BO0zTDtv6PZPOPimwLzjGQ",
  authDomain: "collegevotingsystem-8b89f.firebaseapp.com",
  databaseURL: "https://collegevotingsystem-8b89f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "collegevotingsystem-8b89f",
  storageBucket: "collegevotingsystem-8b89f.appspot.com",
  messagingSenderId: "546434080143",
  appId: "1:546434080143:web:962cbca57be4fd7a4f7ffa",
  measurementId: "G-VBMX35BHER"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.activateVoting = function () {
  set(ref(db, 'votingStatus/active'), true);
  alert("Voting session activated.");
};

window.confirmReset = function () {
  if (confirm("⚠️ Are you sure you want to reset all votes? This cannot be undone.")) {
    remove(ref(db, 'votes')).then(() => {
      alert("✅ All votes have been reset.");
    });
  }
};
