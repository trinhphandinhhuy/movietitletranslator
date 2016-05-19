var Books = (function () {

    var $books = $('#bk-list > li > div.bk-book'), booksCount = $books.length;

    function init() {

        $books.each(function () {

            var $book = $(this),
                $other = $books.not($book),
                $parent = $book.parent(),
                $page = $book.children('div.bk-page'),
                $bookview = $parent.find('button.bk-bookview'),
                $content = $page.children('div.bk-content'), current = 0;

            $parent.find('div.bk-bookback').on('click', function () {

                $bookview.removeClass('bk-active');

                if ($book.data('flip')) {

                    $book.data({ opened: false, flip: false }).removeClass('bk-viewback').addClass('bk-bookdefault');

                }
                else {

                    $book.data({ opened: false, flip: true }).removeClass('bk-viewinside bk-bookdefault').addClass('bk-viewback');

                }

            });

        });

    }

    return { init: init };

})();