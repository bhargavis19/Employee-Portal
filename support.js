document.addEventListener("DOMContentLoaded", function () {
    const primaryMobileNav = document.querySelector(".primary-hamburger");
    const primaryNavbar = document.querySelector(".primary-menubar");
    const secondaryMobileNav = document.querySelector(".secondary-hamburger");
    const secondaryNavbar = document.querySelector(".secondary-menubar");
    const searchIcon = document.getElementById("toggleSearchIcon");
    const searchBarCont = document.querySelector(".search-bar-cont");

    const toggleNav = (navbar, mobileNav) => {
        navbar.classList.toggle("active");
        mobileNav.classList.toggle("hamburger-active");
    };

    const toggleSearchBar = () => {
        searchBarCont.style.display =
            searchBarCont.style.display === "none" ||
            searchBarCont.style.display === ""
                ? "block"
                : "none";
    };

    if (primaryMobileNav && primaryNavbar) {
        primaryMobileNav.addEventListener("click", () =>
            toggleNav(primaryNavbar, primaryMobileNav),
        );
    }

    if (secondaryMobileNav && secondaryNavbar) {
        secondaryMobileNav.addEventListener("click", () =>
            toggleNav(secondaryNavbar, secondaryMobileNav),
        );
    }

    if (searchIcon) {
        searchIcon.addEventListener("click", toggleSearchBar);
    }


});

const search = () => {
    const searchbox = document.getElementById("find").value.toUpperCase();
    const rows = document.querySelectorAll(".table tbody tr");
  
    rows.forEach((row) => {
      let cells = row.querySelectorAll("td");
      let found = false;
      cells.forEach((cell) => {
        let textValue = cell.textContent || cell.innerText;
        if (textValue.toUpperCase().indexOf(searchbox) > -1) {
          found = true;
        }
      });
      if (found) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
};
  
document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.getElementById('editBtn');
    const cells = document.querySelectorAll('#contactsTable td');
  
    let isEditing = false;
  
    editBtn.addEventListener('click', function() {
      if (isEditing) {
        // Save changes
        cells.forEach(cell => {
          cell.contentEditable = 'false';
        });
        editBtn.textContent = 'Edit';
        isEditing = false;
      } else {
        // Enable editing
        cells.forEach(cell => {
          cell.contentEditable = 'true';
        });
        editBtn.textContent = 'Save';
        isEditing = true;
      }
    });
  });  