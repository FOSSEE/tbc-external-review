$(document).ready(function() {

    var basePath = Drupal.settings.basePath;
    var modPath = basePath + "tbc_external_review/";
    /* for "tbc_external_review/comments" page */
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
            url: modPath + "ajax/book/"+pid,
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
            url: modPath + "ajax/chapter/"+cid,
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

    /* for "tbc_external_review/manage_comments/#some_number" page */
    $view_comment = $(".view-comment");
    $lightbox_wrapper = $("#lightbox-wrapper");
    $lightbox_inner = $("#lightbox-inner");
    $view_comment.click(function(e) {
        var comment_id = $(this).attr("data-comment");
        
        $.ajax({
            url: modPath + "ajax/comment/" + comment_id,
            type: "GET",
            dataType: "html",
            success: function(data) {
                $lightbox_inner.html(data);
                $lightbox_wrapper.lightbox_me({
                    centered: true
                });
            },
        });
        e.preventDefault();
    });

    $(document).ajaxStart(function() {
        $ajax_loader.show();
    });
    $(document).ajaxStop(function() {
        $ajax_loader.hide();
    });
});
