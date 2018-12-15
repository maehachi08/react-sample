$(function() {
    $('select.dropdown').dropdown();
    $(':checkbox').radiocheck();
    $('#refine_members_research').click(function(){
        $('.ui.suimodal')
            .suimodal('show')
        ;
    });


});
