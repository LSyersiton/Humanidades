document.querySelectorAll('.carousel').forEach(function (carousel) {
    var slides = carousel.querySelector('.slides');
    var items = slides.querySelectorAll('img');
    var dotsBox = carousel.querySelector('.dots');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var behavior = reduce ? 'auto' : 'smooth';
 
    function goTo(i) {
        i = (i + items.length) % items.length;
        slides.scrollTo({ left: i * slides.clientWidth, behavior: behavior });
    }
    function current() {
        return Math.round(slides.scrollLeft / slides.clientWidth);
    }
 
    items.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot';
        dot.setAttribute('aria-label', 'Ir a la imagen ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dotsBox.appendChild(dot);
    });
    var dots = dotsBox.querySelectorAll('.dot');
 
    function update() {
        var c = current();
        dots.forEach(function (d, i) { d.classList.toggle('active', i === c); });
    }
 
    carousel.querySelector('.prev').addEventListener('click', function () { goTo(current() - 1); });
    carousel.querySelector('.next').addEventListener('click', function () { goTo(current() + 1); });
    slides.addEventListener('scroll', update, { passive: true });
    update();
});