import { truncate } from "fs";

$(document).ready(function() {
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.delete", handleNoteSave);
    $(document).on("click", ".btn.delete", handleNoteDelete);

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/headlines?saved=true")
        .then(function(data) {
            if (data && data.length) {
                renderArticles(data);
            }
            else {
                renderEmpty();
            }
        });
    }

    function renderArticles(articles) {
        var articlePanels = [];
        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels);
        
    }

        function createPanel(article) {  //change to card??
        var panel = 
        $(["<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        article.headline,
        "<a class='btn btn-success save'>",
        "Save Article",
        "</a>",
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        article.summary,
        "</div>",
        "</div>"
    ].join(""));
    panel.data("_id", article._id);
    return panel;
    }

    function renderEmpty() {
        var emptyAlert =
        $(["<div class='alert alert-warning text-center'>",
        "<h4>No New Articles</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>What Would You Like To Do?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class='scrpae-new'>Try Scraping New Articles</a><h4>",
        "<h4><a href='/saved'>Go to Saved Articles</a><h4>",
        "</div>",
        "</div>"
    ].join(""));
    articleContainer.append(emptyAlert);
    }

    // // function handleArticleSave() {
    //     var articleToSave = $(this).parents(".panel").data();
    //     articleToSave.saved = true;

    //     $.ajax({
    //         method: "PATCH",
    //         url: "/api/headlines",
    //         data: articleToSave
    //     })
    //     .then(function(data) {
    //         if (data.ok) {
    //             initPage();
    //         }
    //     });
    // }

    // function handleArticleScrape() {
    //     $.get("/api/fetch")
    //     .then(function(date) {
    //         initPage();
    //         bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
    //     });
    function renderNotesList(data) {
        var notesToRender = [];
        var currentNote;
        if(!data.notes.length) {
            currentNote = [
                "<li class='list-group-item'>",
                "No Notes",
                "</li>"
            ].join("");
            notesToRender.push(currentNote);       
        }
        else {
            for (var i = 0; i < data.notes.length; i++) {
                currentNote = $([
                    "<li class='list-group-item note'>",
                    data.notes[i].noteText,
                    "<button class='btn btn-danger note-delete'>x</button>",
                    "</li>"
                ].join(""));
                currentNote.children("button").data("_id", data.notes[i]._id);
                notesToRender.push(currentNote);
                }
            }
            $(".note-container").append(notesToRender);
        }
    
    //     function handleArticleDelete() {
    //     var articleToDelete = $(this).parents(".panel").data();
    //     $.ajax({
    //       method: "DELETE",
    //       url:"/api/headlines/" + articleToDelete._id  
    //     }).then(function(data) {
    //         if (data.ok) {
    //             initPage();
    //         }
    //     });
    // }

    function handleArticleNotes() {
        var currentArticle = $(this).parent(".panel").data();
        $.get("/api/notes/" + currentArticle._id).then(function(data) {
            var ModalText = [
                "<div class='container-fluid text-center'>",
                "<h4>Article Notes:",
                currentArticle._id,
                "</h4>",
                "<ul class='list-group note-container'>",
                "</ul>",
                "<textarea placeholder='New Note rows = '4' cols='60'></textarea>",
                "<button class='btn btn-success save'>Save Note</button>",
                "</div>"
            ].join("");
            bootbox.dialog({
                message: ModalText,
                closeButton: true
            });
            var noteDate = {
                _id: currentArticle._id,
                notes: data || []
            };
            $(".btn.save").data("article", noteData);
            renderNotesList(noteData);
        });
    }

    function handleNoteSave() {
        var noteData;
        var newNote = $(".bootbox-body textarea").val().trim();
        if (newNote) {
            noteData = {
                _id: $(this).data("article")._id,
                noteText: newNote
            };
            $.post("api/notes", noteData).then(function() {
                bootbox.hideAll();
            });
        }
    }

    function handleNoteDelete() {
        var noteToDelete = $(this).data("_id");
        $.ajax({
            url: "/api/notes/" = noteToDelete,
            method: "DELETE"
        }).then(function() {
            bootbox.hideAll();
        });
    }
});