$(document).ready(function() {
    $book = $("#edit-book");
    $chapter = $("#edit-chapter");
    $chapter_wrapper = $("#edit-chapter-wrapper");
    $example = $("#edit-example");
    $example_wrapper = $("#edit-example-wrapper");
    $error_wrapper = $("#comment-error-wrapper");
    $submit = $("#edit-submit");
    $ajax_loader = $("#ajax-loader");

    $book.change(function() {
        var pid = $(this).val();
        $.ajax({
            url: "ajax/book/"+pid,
            type: "GET",
            success: function(data) {
                $chapter.html(data);
                $chapter_wrapper.show();
            },
        });
    });

    $chapter.change(function() {
        var cid = $(this).val();
        $.ajax({
            url: "ajax/chapter/"+cid,
            type: "GET",
            success: function(data) {
                $example.html(data);
                $example_wrapper.show();
            },
        });
    });

    $example.change(function() {
        $error_wrapper.show();
        $submit.show();
    });

    $(document).ajaxStart(function() {
        $ajax_loader.show();
    });
    $(document).ajaxStop(function() {
        $ajax_loader.hide();
    });
});
