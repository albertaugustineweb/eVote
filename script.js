import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

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

const candidates = [
  {
    name: "Priya Sharma",
    class: "Grade 10 - B",
    motto: "Your voice, my action!",
    image: "images/priya.jpg"
  },
  {
    name: "Aman Patel",
    class: "Grade 10 - A",
    motto: "Together for better!",
    image: "images/aman.jpg"
  }
];

function renderCandidates() {
  const container = document.getElementById("candidatesContainer");
  candidates.forEach((c, index) => {
    const card = document.createElement("div");
    card.className = "candidate-card";
    card.innerHTML = `
      <img src="${c.image}" alt="${c.name}">
      <h3>${c.name}</h3>
      <p><strong>Class:</strong> ${c.class}</p>
      <p><em>"${c.motto}"</em></p>
      <button onclick="vote(${index})">Vote</button>
    `;
    container.appendChild(card);
  });
}

window.vote = async function(index) {
  const statusSnap = await get(ref(db, 'votingStatus/active'));
  if (!statusSnap.exists() || statusSnap.val() !== true) {
    alert("Voting not allowed. Ask admin.");
    return;
  }

  const candidateName = candidates[index].name;
  const voteRef = ref(db, 'votes/' + candidateName);
  const voteSnap = await get(voteRef);
  const currentVotes = voteSnap.exists() ? voteSnap.val() : 0;

  await set(voteRef, currentVotes + 1);
  await set(ref(db, 'votingStatus/active'), false);
  alert("Your vote has been cast.");
  location.reload();
};

async function checkVotingStatus() {
  const statusSnap = await get(ref(db, 'votingStatus/active'));
  const status = statusSnap.exists() ? statusSnap.val() : false;
  document.getElementById("status").innerText = status ? "Voting is active ✅" : "Voting is inactive ❌";
}

checkVotingStatus();
renderCandidates();
