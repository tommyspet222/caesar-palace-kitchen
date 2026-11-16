"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

function closeNavigation() {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  primaryNav.classList.remove("is-open");
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) closeNavigation();
  });
}

const filterButtons = document.querySelectorAll("[data-filter]");
const menuCards = document.querySelectorAll(".menu-card[data-category]");
const filterStatus = document.querySelector(".filter-status");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filterButton) => {
      const selected = filterButton === button;
      filterButton.classList.toggle("is-active", selected);
      filterButton.setAttribute("aria-pressed", String(selected));
    });

    menuCards.forEach((card) => {
      const visible = selectedCategory === "all" || card.dataset.category === selectedCategory;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (filterStatus) {
      filterStatus.textContent = `${visibleCount} menu ${visibleCount === 1 ? "category" : "categories"} shown.`;
    }
  });
});

const inquiryForm = document.querySelector("#inquiry-form");
const formStatus = document.querySelector("#form-status");
const businessEmail = "caesarpalacekitchen@gmail.com";

if (inquiryForm && formStatus) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.classList.remove("is-error", "is-success");

    if (!inquiryForm.checkValidity()) {
      inquiryForm.reportValidity();
      formStatus.textContent = "Please complete the required fields and enter a valid email address.";
      formStatus.classList.add("is-error");
      return;
    }

    const formData = new FormData(inquiryForm);
    const subject = `Caesar Palace Kitchen enquiry: ${formData.get("enquiry")}`;
    const body = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Phone: ${formData.get("phone") || "Not provided"}`,
      `Enquiry: ${formData.get("enquiry")}`,
      "",
      "Message:",
      formData.get("message")
    ].join("\n");
    const mailto = `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    formStatus.textContent = "Your email app should open with this message. Review it and press Send; this website does not store or send your details.";
    formStatus.classList.add("is-success");
    window.location.href = mailto;
  });
}

const whatsappLinks = document.querySelectorAll("[data-whatsapp-link], [data-dish-name]");
const whatsappNumber = "+2348159208870";
const digitsOnly = whatsappNumber.replace(/\D/g, "");
const normalizedNumber = digitsOnly.startsWith("0") ? `234${digitsOnly.slice(1)}` : digitsOnly;

whatsappLinks.forEach((link) => {
  const dishName = link.dataset.dishName;
  const message = dishName
    ? `Hello Caesar Palace Kitchen, I would like to enquire about ${dishName}. Please share availability, details and pricing.`
    : "";
  const messageQuery = message ? `?text=${encodeURIComponent(message)}` : "";
  link.href = `https://wa.me/${normalizedNumber}${messageQuery}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  if (link.id === "contact-whatsapp-link") {
    link.setAttribute("aria-label", "Message Caesar Palace Kitchen on WhatsApp at +234 815 920 8870");
  }
});

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());
