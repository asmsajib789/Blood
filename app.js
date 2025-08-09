// Firebase কনফিগারেশন
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "",
    messagingSenderId: "YOUR_SENDER_ID"
};

// Firebase ইনিশিয়ালাইজ
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM লোড হওয়ার পর
document.addEventListener('DOMContentLoaded', function() {
    // রক্তদাতা রেজিস্ট্রেশন ফর্ম
    const donorForm = document.getElementById('donorForm');
    if (donorForm) {
        donorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const donor = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                bloodGroup: document.getElementById('bloodGroup').value,
                district: document.getElementById('district').value,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                status: "active"
            };

            // Firebase-এ ডেটা সেভ
            database.ref('donors').push(donor)
                .then(() => {
                    alert('ধন্যবাদ! আপনার তথ্য সফলভাবে রেজিস্টার করা হয়েছে।');
                    donorForm.reset();
                    updateReportCards(); // রিপোর্ট কার্ড আপডেট
                })
                .catch(error => {
                    console.error("Error saving donor data: ", error);
                    alert('ত্রুটি! আবার চেষ্টা করুন।');
                });
        });
    }

    // রক্ত অনুরোধ ফর্ম
    const bloodRequestForm = document.getElementById('bloodRequestForm');
    if (bloodRequestForm) {
        bloodRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const request = {
                patientName: document.getElementById('patientName').value,
                contactNumber: document.getElementById('contactNumber').value,
                requiredBloodGroup: document.getElementById('requiredBloodGroup').value,
                hospital: document.getElementById('hospital').value,
                address: document.getElementById('address').value,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                status: "pending"
            };

            // Firebase-এ ডেটা সেভ
            database.ref('bloodRequests').push(request)
                .then(() => {
                    alert('আপনার অনুরোধ সফলভাবে জমা হয়েছে। শীঘ্রই আমাদের স্বেচ্ছাসেবীরা আপনার সাথে যোগাযোগ করবে।');
                    bloodRequestForm.reset();
                })
                .catch(error => {
                    console.error("Error saving request data: ", error);
                    alert('ত্রুটি! আবার চেষ্টা করুন।');
                });
        });
    }

    // রিপোর্ট কার্ড আপডেট
    function updateReportCards() {
        // মোট রক্তদাতা
        database.ref('donors').once('value', function(snapshot) {
            const totalDonors = snapshot.numChildren();
            document.getElementById('totalUsers').textContent = totalDonors;
        });

        // মোট ডোনেশন (এখানে আপনি ডোনেশন কাউন্টার যোগ করতে পারেন)
        database.ref('donations').once('value', function(snapshot) {
            const totalDonations = snapshot.numChildren();
            document.getElementById('totalDonations').textContent = totalDonations;
        });
    }

    // প্রথম লোডে রিপোর্ট কার্ড আপডেট
    updateReportCards();
});

// মেনু স্ক্রল ইফেক্ট
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const modal = document.getElementById("registrationModal");
const btn = document.getElementById("openFormBtn");
const closeBtn = document.querySelector(".closeBtn");

btn.onclick = () => {
  modal.style.display = "block";
};

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
