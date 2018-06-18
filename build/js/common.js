// captcha
// var onloadCallback = function() {
//     mysitekey = '6Leq4jcUAAAAAK9o3wR7h_lpIMQvOQ2Kr2Ldr-00';
//
//     if($('#callback_g').length ){
//         grecaptcha.render('callback_g', {
//             'sitekey' : mysitekey
//         });
//     }
// }
$(function () {


    var body = $('body');
    var mql = window.matchMedia('all and (max-width: 767px)');
    if (mql.matches) {
        $('.mobile_click').click(function () {
            $('.top_menu').slideToggle();
        });

    } // end of resize < 768
    else {


    } // end of Resize > 768
    // jsDesc: slick set
    $('.aside_slider').slick({
        dots: true,
        autoplay: true,
        infinite: false,
        speed: 300,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 99999,
                settings: "unslick"
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // jsDesc: fancybox
    $(".fancybox").fancybox({
        buttons: ['close']
    });
    $('[data-event]').on('click', function () {
        if ($(this).data('event') == 'fancy') {
            $.fancybox.open({
                src: '#' + $(this).data('name'),
                slideClass: 'modal_forms',
            });
        }
    });

    // плавный скролл

    $(".top_menu").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href');
        var top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

    // register modal component
    Vue.component('modal', {
        template: '#modal-template'
    })

// start app
    new Vue({
        el: '#app',
        data: {
            showModal: false
        }
    })

    // carousel

    Vue.component('carousel-component', {
        render: function (createElement) {
            return createElement('div', { class: 'carousel-component' },
                this.items.map((item, index) =>
                createElement('div', {
                    'class': 'carousel-page' + (this.current === index ? ' active' : ''),
                    style: {
                        transform: `translate3d(${this.position(index) * 100}%, 0, 0)`,
                    }
                }, [item])
            ).concat([
                createElement('button', {
                    'class': 'carousel-nav-prev',
                    on: { click: () => { this.decreaseCurrent(); } }
        }, 'Prev'),
            createElement('button', {
                'class': 'carousel-nav-next',
                on: { click: () => { this.increaseCurrent(); } }
        }, 'Next')
            ])
            );
        },
        data: function() {
            return {
                current: 0
            };
        },
        computed: {
            items: function() {
                return this.$slots.default.filter(function(item) {
                    return item.componentOptions !== undefined &&
                        item.componentOptions.tag === 'carousel-item';
                });
            }
        },
        methods: {
            decreaseCurrent: function() {
                this.current += this.items.length - 1;
                this.current %= this.items.length;
            },
            increaseCurrent: function() {
                this.current += 1;
                this.current %= this.items.length;
            },
            position: function(index) {
                if (index === this.current) return 0;
                if (index === (this.current + 1) % this.items.length) return 1;
                return -1;
            }
        }
    });

    Vue.component('carousel-item', {
        render: function (createElement) {
            return createElement('div', { class: 'carousel-item' }, this.$slots.default);
        }
    });

    new Vue({
        el: '.carousel'
    });







});
