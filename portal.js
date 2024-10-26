document.addEventListener("DOMContentLoaded", function () {
    const primaryMobileNav = document.querySelector(".primary-hamburger");
    const primaryNavbar = document.querySelector(".primary-menubar");
    const secondaryMobileNav = document.querySelector(".secondary-hamburger");
    const secondaryNavbar = document.querySelector(".secondary-menubar");
    const searchIcon = document.getElementById("toggleSearchIcon");
    const searchBarCont = document.querySelector(".search-bar-cont");
    const applnConts = document.querySelectorAll(".appln-cont");
    const hrSection = document.querySelector(".hr-cont");

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

    const toggleHR = () => {
        applnConts.forEach((cont) => {
            cont.style.display = "none";
        });

        if (hrSection) {
            hrSection.style.display = "flex";
            hrSection.style.justifyContent = "center";
        }
    };

    const hideHR = () => {
        if (hrSection) {
            hrSection.style.display = "none";
        }
        applnConts.forEach((cont) => {
            cont.style.display = "grid";
        });
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

    // Add event listener for the HR Updates link
    const hrLink = document.getElementById("hr-btn");
    if (hrLink) {
        hrLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor behavior
            toggleHR();
        });
    }

    // Add event listeners for category links
    const categoryLinks = document.querySelectorAll(".category-link");
    categoryLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor behavior
            hideHR();
            // Show the selected category container
            const targetId = this.getAttribute("href").substring(1);
            const targetContainer = document.getElementById(targetId);
            if (targetContainer) {
                applnConts.forEach((cont) => {
                    cont.style.display = "none";
                });
                targetContainer.style.display = "grid";
            }
        });
    });
});

const leftBtn = document.querySelector(".nav-scroll-btn.left");
const rightBtn = document.querySelector(".nav-scroll-btn.right");
const navLinks = document.querySelector(".nav-links");
const navLinksWrapper = document.querySelector(".nav-links-wrapper");

let scrollAmount = 0;
const SCROLL_STEP = 140;

rightBtn.addEventListener("click", () => {
    const maxScrollLeft = navLinks.scrollWidth - navLinksWrapper.clientWidth;
    if (scrollAmount < maxScrollLeft) {
        scrollAmount += SCROLL_STEP;
        if (scrollAmount > maxScrollLeft) {
            scrollAmount = maxScrollLeft;
        }
        navLinks.style.transform = `translateX(-${scrollAmount}px)`;
    }
});

leftBtn.addEventListener("click", () => {
    if (scrollAmount > 0) {
        scrollAmount -= SCROLL_STEP;
        if (scrollAmount < 0) {
            scrollAmount = 0;
        }
        navLinks.style.transform = `translateX(-${scrollAmount}px)`;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.getElementById("calendar-container");
    const holidayListContainer = document.getElementById("holiday-list");

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    loadHolidaysAndRenderCalendar(currentMonth, currentYear);

    function loadHolidaysAndRenderCalendar(month, year) {
        const holidaysURL = "holidays.csv";

        fetch(holidaysURL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((data) => {
                const holidays = parseCSV(data);
                console.log("Parsed holidays:", holidays);

                renderCalendar(month, year, holidays);
                renderHolidayList(month, year, holidays);
            })
            .catch((error) =>
                console.error("Error fetching or parsing holidays:", error),
            );
    }

    function parseCSV(csv) {
        const lines = csv.trim().split("\n");
        const headers = lines.shift().split(",");
        const holidays = lines.map((line) => {
            const values = line.split(",");
            return {
                date: values[0].trim(),
                holiday_name: values[1].trim(),
            };
        });
        return holidays;
    }

    function renderCalendar(month, year, holidays) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const monthName = monthNames[month];

        let calendarHTML = `
            <div class="calendar-header">
                <button id="prev-month" class="nav-button">&lt;</button>
                <h4>${monthName} ${year}</h4>
                <button id="next-month" class="nav-button">&gt;</button>
            </div>
            <table class="calendar-table">
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
        `;

        let dayCount = 1;
        for (let i = 0; i < 6; i++) {
            calendarHTML += "<tr>";
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    calendarHTML += "<td></td>";
                } else if (dayCount > daysInMonth) {
                    calendarHTML += "<td></td>";
                } else {
                    const dateString = `${year}-${(month + 1).toString().padStart(2, "0")}-${dayCount.toString().padStart(2, "0")}`;
                    const holiday = holidays.find((h) => h.date === dateString);

                    if (holiday) {
                        calendarHTML += `<td class="holiday" data-title="${holiday.holiday_name}">${dayCount}</td>`;
                    } else {
                        calendarHTML += `<td>${dayCount}</td>`;
                    }
                    dayCount++;
                }
            }
            calendarHTML += "</tr>";
            if (dayCount > daysInMonth) break;
        }

        calendarHTML += `
                </tbody>
            </table>
        `;

        calendarContainer.innerHTML = calendarHTML;

        document
            .getElementById("prev-month")
            .addEventListener("click", function () {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                loadHolidaysAndRenderCalendar(currentMonth, currentYear);
            });

        document
            .getElementById("next-month")
            .addEventListener("click", function () {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                loadHolidaysAndRenderCalendar(currentMonth, currentYear);
            });
    }

    function renderHolidayList(month, year, holidays) {
        const holidayList = holidays.filter((h) => {
            const date = new Date(h.date);
            return date.getMonth() === month && date.getFullYear() === year;
        });

        let holidayListHTML = "<p>Holidays</p>";
        if (holidayList.length > 0) {
            holidayListHTML += "<ul>";
            holidayList.forEach((holiday) => {
                const date = new Date(holiday.date);
                holidayListHTML += `<li>${holiday.holiday_name} - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</li>`;
            });
            holidayListHTML += "</ul>";
        } else {
            holidayListHTML += "<p>No holidays for this month.</p>";
        }

        holidayListContainer.innerHTML = holidayListHTML;
    }
});

function setActiveClassPrimaryNavbar() {
    const links = document.querySelectorAll(".UL li a");
    links.forEach((link) => {
        link.addEventListener("click", function () {
            links.forEach((l) => l.classList.remove("active-category"));

            this.classList.add("active-category");
        });
    });
}

function setActiveClassSecondaryNavbar() {
    const links = document.querySelectorAll(".nav-links .navink-btn");
    links.forEach((link) => {
        link.addEventListener("click", function () {
            links.forEach((l) => l.classList.remove("active-category"));

            this.classList.add("active-category");
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setActiveClassPrimaryNavbar();
    setActiveClassSecondaryNavbar();
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("find");
    const applContainers = document.querySelectorAll(".appln-cont");
    const searchResultsContainer = document.getElementById("search-results");
    const navLinks = document.querySelectorAll(".nav-links .navink-btn");

    let activeCategoryId = null;

    const noResultsMessage = document.createElement("div");
    noResultsMessage.textContent = "No results";
    noResultsMessage.style.display = "none";
    searchResultsContainer.appendChild(noResultsMessage);

    function search() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const uniqueResults = new Set();

        applContainers.forEach((container) => {
            container.style.display = "none";
        });

        searchResultsContainer.innerHTML = "";

        if (searchTerm !== "") {
            applContainers.forEach((container) => {
                const apps = container.querySelectorAll(".appln");
                apps.forEach((app) => {
                    const textContent = app.textContent.toLowerCase();
                    if (
                        textContent.includes(searchTerm) &&
                        !uniqueResults.has(textContent)
                    ) {
                        uniqueResults.add(textContent);

                        const appClone = app.cloneNode(true);
                        searchResultsContainer.appendChild(appClone);
                    }
                });
            });

            if (searchResultsContainer.children.length > 0) {
                searchResultsContainer.style.display = "grid";
                noResultsMessage.style.display = "none";
            } else {
                searchResultsContainer.style.display = "block";
                noResultsMessage.style.display = "block";
            }

            // Remove background color from all navLinks
            navLinks.forEach((link) => {
                link.classList.remove("active");
                link.classList.add("no-bg");
            });
        } else {
            // Handle when search input is empty

            if (activeCategoryId) {
                const activeContainer =
                    document.getElementById(activeCategoryId);
                if (activeContainer) {
                    activeContainer.style.display = "grid";
                }
            } else {
                applContainers.forEach((container) => {
                    const isFavorite =
                        container.classList.contains("favorites");
                    if (isFavorite) {
                        container.style.display = "grid";
                    }
                });
            }
            searchResultsContainer.style.display = "none";
            noResultsMessage.style.display = "none";

            if (activeCategoryId) {
                const activeLink = document.querySelector(
                    `.nav-links .navink-btn[href="#${activeCategoryId}"]`,
                );
                if (activeLink) {
                    activeLink.classList.remove("no-bg");
                    activeLink.classList.add("active");
                }
            }
        }
    }

    searchInput.addEventListener("input", search);

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);

            activeCategoryId = targetId;

            applContainers.forEach((container) => {
                container.style.display = "none";
            });
            const activeContainer = document.getElementById(targetId);
            if (activeContainer) {
                activeContainer.style.display = "grid";
            }

            // Remove background color from all navLinks
            navLinks.forEach((link) => {
                link.classList.remove("active");
                link.classList.add("no-bg");
            });

            // Add background color to clicked navLink
            this.classList.add("active");
            this.classList.remove("no-bg");

            searchResultsContainer.style.display = "none"; // Hide search results when navigating
            noResultsMessage.style.display = "none"; // Hide no results message when navigating

            history.replaceState(null, null, `#${targetId}`);
        });
    });

    const initialHash = window.location.hash.substring(1);
    const initialCategory =
        document.getElementById(initialHash) ||
        document.querySelector(".appln-cont");
    if (initialCategory) {
        activeCategoryId = initialCategory.id;
        initialCategory.style.display = "grid";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navink-btn");
    const applContainers = document.querySelectorAll(".appln-cont");

    applContainers.forEach((container) => {
        if (container.id !== "applicationContainer") {
            container.style.display = "none";
        }
    });

    const handleNavClick = (event) => {
        event.preventDefault();
        const targetId = event.target.getAttribute("href").substring(1);

        applContainers.forEach((container) => {
            container.style.display = "none";
        });

        const targetContainer = document.getElementById(targetId);
        if (targetContainer) {
            targetContainer.style.display = "grid";
        }
    };

    navLinks.forEach((link) => {
        link.addEventListener("click", handleNavClick);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navink-btn");

    const handleNavClick = (event) => {
        event.preventDefault();

        navLinks.forEach((link) => {
            link.classList.remove("selected");
        });

        event.target.classList.add("selected");
    };

    navLinks.forEach((link) => {
        link.addEventListener("click", handleNavClick);
    });
});

function toggleBookmark(id) {
    var image = document.getElementById(id);
    var currentSrc = image.getAttribute("src");
    var bookmark1 = "images/Bookmark (1).png";
    var bookmark2 = "images/Bookmark (2).png";

    if (currentSrc.includes(bookmark1)) {
        image.src = bookmark2;
    } else if (currentSrc.includes(bookmark2)) {
        image.src = bookmark1;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const profileContainer = document.querySelector(".profile-container");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    profileContainer.addEventListener("click", function (event) {
        event.preventDefault();

        dropdownMenu.style.display =
            dropdownMenu.style.display === "block" ? "none" : "block";

        const dropdownRect = dropdownMenu.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const margin = 10;
        const overflowRight = dropdownRect.right - windowWidth + margin;
        const overflowLeft = dropdownRect.left - margin;

        if (overflowRight > 0) {
            dropdownMenu.style.left =
                parseFloat(getComputedStyle(dropdownMenu).left) -
                overflowRight +
                "px";
        } else if (overflowLeft < 0) {
            dropdownMenu.style.left =
                parseFloat(getComputedStyle(dropdownMenu).left) -
                overflowLeft +
                "px";
        }
    });

    document.addEventListener("click", function (event) {
        if (!profileContainer.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
});
