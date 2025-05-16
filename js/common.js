// Common JavaScript functionality for the website

// Animation and scroll handling
var eleArr = [];
var eleInc = 0;

// Checks if an element is in the viewport and animates it
function checkEle(i) {
    const elem = $(".elem");
    var viewPortSize = $(window).height();
    if (eleArr[i] == 1) {
        var rect = elem[i].getBoundingClientRect();
        if (viewPortSize - rect.y > -50) {
            $(".elem").eq(i).animate({ opacity: 1 }, 1200);
            for (eleInc; eleInc < i; eleInc++) {
                $(".elem").eq(eleInc).animate({ opacity: 1 }, 1200);
                eleArr[eleInc] = 0;
            }
        }
    }
}

// Initialize animation elements
function initAnimations() {
    // Reset arrays for fresh initialization
    eleArr = [];
    eleInc = 0;
    
    // Add a 1 to the array for each ele in the elem class
    for (var i = 0; i < $(".elem").length; i++) {
        eleArr.push(1);
        checkEle(i);
    }
}

// Handle scroll events for animations
function handleScroll() {
    const elem = $(".elem");
    var viewPortSize = $(window).height();
    checkEle(eleInc, 0);

    for (var i = eleInc; i < $(".elem").length; i++) {
        checkEle(i);
    }

    if (eleInc >= elem.length) {
        $(window).off("scroll");
    }
}

// Set active link in navigation based on current page
function setActiveLink(pageName) {
    $('.links a[href="' + pageName + '"]').addClass('active');
    $('.dropdown-links a[href="' + pageName + '"]').addClass('active');
}

// Load header component and set page title
function loadHeader(pageTitle, pageName) {
    $("#header-placeholder").load("components/header.html", function() {
        $(".header-central-title h2").text(pageTitle);
        setActiveLink(pageName);
    });
}

// Load footer component and reinitialize animations
function loadFooter() {
    $("#footer-placeholder").load("components/footer.html", function() {
        // Reinitialize animations after footer is loaded
        initAnimations();
    });
}

// Initialize page
function initPage(pageTitle, pageName) {
    $(document).ready(function() {
        initAnimations();
        loadHeader(pageTitle, pageName);
        loadFooter();
        
        // Set up scroll handler
        $(window).scroll(handleScroll);
    });
} 