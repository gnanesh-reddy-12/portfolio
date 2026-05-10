document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const hiddenElements = document.querySelectorAll(
    ".hidden-left, .hidden-right"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.5
});

hiddenElements.forEach((el) => observer.observe(el));


function callData() {  
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => { 
            console.log(data);    
            document.getElementById('api-data').innerHTML = data[0].body;
        }
    );
}