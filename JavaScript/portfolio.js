const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }else{
        entry.target.classList.remove("active");
      }
    });
  },
  {
    threshold: 0.05,
  }
);

document.querySelectorAll(".animate-on-scroll").forEach((section) => {
  observer.observe(section);
});

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

document.querySelector("#bg-toggler").addEventListener("click",()=>{
    const icon=document.querySelector("#icon");
    document.body.classList.toggle("dark-mode");
    document.querySelector("header").classList.toggle("dark-mode");
    document.querySelector("main").classList.toggle("dark-mode");
    document.querySelector("footer").classList.toggle("dark-mode");
    document.querySelector("nav").classList.toggle("dark-mode");
    Array.from(document.querySelectorAll(".nav-link")).map(link=>link.classList.toggle("dark-mode"));
    if (document.body.classList.contains("dark-mode")){
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }else{
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
    
})


var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        status.classList.add("alert");
        status.classList.add("alert-success");
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}
form.addEventListener("submit", handleSubmit);
