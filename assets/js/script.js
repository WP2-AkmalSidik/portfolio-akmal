"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]",
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]",
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// form submit and toast notification logic
const toast = document.querySelector("[data-toast]");
const toastClose = document.querySelector("[data-toast-close]");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Change button text and disable it while sending
    const originalText = formBtn.innerHTML;
    formBtn.innerHTML = "<ion-icon name='sync-outline' class='spin'></ion-icon> <span>Mengirim...</span>";
    formBtn.disabled = true;

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // Show Toast
        if (toast) toast.classList.add("active");
        
        // Hide Toast after 5 seconds
        setTimeout(() => {
          if (toast) toast.classList.remove("active");
        }, 5000);

        // Reset form
        form.reset();
        formBtn.innerHTML = originalText;
        formBtn.disabled = true; // Disabled again because form is now empty
      })
      .catch((error) => {
        console.error("Error:", error);
        formBtn.innerHTML = originalText;
        formBtn.disabled = false;
        alert("Mohon maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
      });
  });
}

if (toastClose) {
  toastClose.addEventListener("click", function () {
    toast.classList.remove("active");
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// project modal variables
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");

const projectModalImg = document.querySelector("[data-project-modal-img]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalText = document.querySelector("[data-project-modal-text]");

const projectItems = document.querySelectorAll(".project-item");

// project modal toggle function
const projectModalFunc = function () {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
};

// add click event to all project items
for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener("click", function (e) {
    e.preventDefault();
    projectModalImg.src = this.querySelector("img").src;
    projectModalImg.alt = this.querySelector("img").alt;
    projectModalTitle.innerHTML = this.querySelector(".project-title").innerHTML;
    projectModalCategory.innerHTML = this.querySelector(".project-category").innerHTML;
    
    // Check if there is a specific description, otherwise use a default one
    let desc = this.dataset.projectDesc || "Deskripsi lengkap untuk proyek " + this.querySelector(".project-title").innerHTML + " belum tersedia. Proyek ini dikembangkan dengan fokus pada performa yang maksimal dan pengalaman pengguna yang responsif.";
    projectModalText.innerHTML = "<p>" + desc + "</p>";

    projectModalFunc();
  });
}

// add click event to project modal close button
if(projectModalCloseBtn) projectModalCloseBtn.addEventListener("click", projectModalFunc);
if(projectOverlay) projectOverlay.addEventListener("click", projectModalFunc);
