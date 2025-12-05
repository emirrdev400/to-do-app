// varsayılan todos listesi
let todos = [];

// localStorage'da kayıt varsa decrypt et
let stored = localStorage.getItem("todos");
if(stored) todos = decrypt(stored);


// elementler
const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");


// GÖREV EKLE
addBtn.addEventListener("click", ()  => {
    const value = input.value.trim();
    if(value === "") return alert("İnput boş olamaz");

    todos.push(value);
    localStorage.setItem("todos", encrypt(todos)); // 🔥 KAYIT ŞİFRELİ

    addTodoToUI(value);
    input.value = "";
});


// UI'ye görev basma fonksiyonu
function addTodoToUI(text){
    const li = document.createElement("li");
    li.textContent = text;

    // tamamlandı
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✔";
    doneBtn.onclick = () => li.style.textDecoration = "line-through";

    // sil
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.onclick = () => {
        li.remove();
        todos = todos.filter(t => t !== text);
        localStorage.setItem("todos", encrypt(todos));
    }

    li.append(doneBtn, deleteBtn);
    todoList.appendChild(li);
}


// sayfa açılınca görevleri geri yükle
window.onload = () => {
    todos.forEach(item => addTodoToUI(item));
};


// ziyaretçi sayacı
let count = localStorage.getItem("visitorCount") || 0;
count++;
localStorage.setItem("visitorCount", count);
document.getElementById("visitorCount").textContent = "Site görüntülenme sayısı: " + count;


// şifreleme
function encrypt(data){
    return btoa(JSON.stringify(data));
}
function decrypt(data){
    return JSON.parse(atob(data));
}

// TÜM GÖREVLERİ SİL
const clearAll = document.getElementById("clearAll");

clearAll.addEventListener("click", () => {
    todoList.innerHTML = "";   // ekrandan sil
    todos = [];                // listeyi boşalt
    localStorage.setItem("todos", encrypt(todos)); // şifreli olarak temiz kaydet

    alert("Tüm görevler başarıyla silindi!");
});
