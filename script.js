// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Add smooth scrolling to all navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href").substring(1)
    scrollToSection(targetId)
  })
})

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(0, 0, 0, 0.98)"
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.95)"
  }
})

// Reservation form handling
document.getElementById("reservationForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const data = Object.fromEntries(formData)

  // Simple validation
  const inputs = this.querySelectorAll("input[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false
      input.style.borderColor = "#e53e3e"
    } else {
      input.style.borderColor = "rgba(229, 62, 62, 0.3)"
    }
  })

  if (isValid) {
    // Show success message
    alert("თქვენი რეზერვაცია წარმატებით გაიგზავნა! ჩვენ დაგიკავშირდებით მალე.")
    this.reset()
  } else {
    alert("გთხოვთ შეავსოთ ყველა სავალდებულო ველი.")
  }
})

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".feature, .cocktail-card, .event-type").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Add hover effects for cocktail cards
document.querySelectorAll(".cocktail-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Experiment Section Interactive Effects
document.addEventListener("DOMContentLoaded", () => {
  const experimentSection = document.querySelector(".experiment-section")
  const flasks = document.querySelectorAll(".flask")

  // Add click interaction to flasks
  flasks.forEach((flask, index) => {
    flask.addEventListener("click", function () {
      // Add special effect on click
      this.style.transform = "scale(1.1)"
      this.style.transition = "transform 0.3s ease"

      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 300)

      // Create particle effect
      createParticles(this)
    })
  })

  // Create particle effect function
  function createParticles(element) {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    for (let i = 0; i < 6; i++) {
      const particle = document.createElement("div")
      particle.style.position = "fixed"
      particle.style.left = centerX + "px"
      particle.style.top = centerY + "px"
      particle.style.width = "4px"
      particle.style.height = "4px"
      particle.style.background = "#e53e3e"
      particle.style.borderRadius = "50%"
      particle.style.pointerEvents = "none"
      particle.style.zIndex = "9999"

      document.body.appendChild(particle)

      const angle = (i * 60 * Math.PI) / 180
      const distance = 50
      const endX = centerX + Math.cos(angle) * distance
      const endY = centerY + Math.sin(angle) * distance

      particle.animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
          { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 },
        ],
        {
          duration: 800,
          easing: "ease-out",
        },
      ).onfinish = () => {
        particle.remove()
      }
    }
  }

  // Enhanced scroll animation for experiment section
  const experimentObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const flasks = entry.target.querySelectorAll(".flask")
          flasks.forEach((flask, index) => {
            setTimeout(() => {
              flask.style.opacity = "1"
              flask.style.transform = "translateY(0)"
            }, index * 200)
          })
        }
      })
    },
    { threshold: 0.3 },
  )

  if (experimentSection) {
    // Initialize flask opacity
    flasks.forEach((flask) => {
      flask.style.opacity = "0"
      flask.style.transform = "translateY(30px)"
      flask.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    })

    experimentObserver.observe(experimentSection)
  }
})
