// Функція для роботи з іконками
const toggleIcons = (leftIcon, rightIcon, showLeft) => {
    leftIcon.style.width = showLeft ? '2.5rem' : '0';
    leftIcon.style.height = showLeft ? '2.5rem' : '0';
    leftIcon.style.opacity = showLeft ? '1' : '0';

    rightIcon.style.width = showLeft ? '0' : '2.5rem';
    rightIcon.style.height = showLeft ? '0' : '2.5rem';
    rightIcon.style.opacity = showLeft ? '0' : '1';
};

// Функція для роботи з текстами
const toggleTexts = (texts, showFirst) => {
    if (texts.length === 2) {
        texts[0].style.transform = showFirst ? 'translateY(0)' : 'translateY(-150%)';
        texts[1].style.transform = showFirst ? 'translateY(150%)' : 'translateY(0)';
    }
};
document.querySelectorAll('[data-hover-elem]').forEach(elem => {
    const texts = elem.querySelectorAll('.button__text');
    const clientText = elem.querySelector('.clients__text-wrap');
    

    elem.addEventListener('mouseenter', () => { 
        toggleTexts(texts, false);

        clientText.classList.add('active');
    });
    elem.addEventListener('mouseleave', () => { 
        toggleTexts(texts, true);

        clientText.classList.remove('active');
    });
});

document.querySelectorAll('[data-button-flex]').forEach(button => {

    const leftIcon = button.querySelector('.icon-scale');
    const rightIcon = button.querySelector('.icon-scale--is-2');
    const texts = button.querySelectorAll('.button__text');

    button.addEventListener('mouseenter', () => { toggleIcons(leftIcon,rightIcon, false); toggleTexts(texts, false) });
    button.addEventListener('mouseleave', () => { toggleIcons(leftIcon,rightIcon, true); toggleTexts(texts, true) });
});

document.querySelectorAll('[data-change-bg]').forEach(button => {
    const buttonBg = button.querySelector('.bg-color-black');
    const iconChangeWhite = button.querySelector('.is-absolute');
    const iconChangeBlack = button.querySelector('.transform-black');

    button.addEventListener('mouseenter',function(){
        buttonBg.style.transform = 'scale(1)';
        iconChangeWhite.style.transform = 'translate(0)';
        iconChangeBlack.style.transform = 'translate(180%)';
    });
    button.addEventListener('mouseleave',function(){
        buttonBg.style.transform = 'scale(0)';
        iconChangeWhite.style.transform = 'translate(-180%)';
        iconChangeBlack.style.transform = 'translate(0)';
    });
})
document.addEventListener('DOMContentLoaded', function() {
    const imagesContainer = document.querySelector('[data-home-images]');
    const wordsContainer = document.querySelector('[data-h1-words]');
    if(imagesContainer && wordsContainer){
        const images = imagesContainer.children;
        const words = wordsContainer.children;
    let currentIndex = 1;

    setInterval(function() {
     Array.from(images).forEach((image, index) => {
        image.classList.remove("active", "done");
        if (index === currentIndex) {
            image.classList.add("active");
        }
        if (index === currentIndex - 1 || currentIndex === 0 && index === images.length) {
            image.classList.add("active", "done");
        }
     });

      const lettersCurrent = words[currentIndex].querySelectorAll("em");
      const lettersPrev = currentIndex > 0 ? words[currentIndex - 1].querySelectorAll("em") : words[words.length - 1].querySelectorAll("em");

      let delay = 100;

      lettersCurrent.forEach((letter, index) => {
        setTimeout(() => {
            letter.classList.add("active");
        }, index * delay);
      });
      lettersPrev.forEach((letter, index) => {
        setTimeout(() => {
            letter.classList.add("active","done");
        }, index * delay)
      });
      Array.from(words).forEach((word) => {
        word.querySelectorAll("em").forEach((letter) => {
            if( 
                !Array.from(lettersCurrent).includes(letter) &&
                !Array.from(lettersPrev).includes(letter)
        ) {
            letter.classList.remove("active", "done");
            }
        });
      });
      const wordWidth = words[currentIndex].offsetWidth;
      document.querySelector("[data-h1-words]").style.width = wordWidth + "px";

      currentIndex = (currentIndex + 1) % images.length;     
  }, 3000);
    }
    
    
});