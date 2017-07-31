//on document ready
$(function() {
  $('.comment').autoHeight();
  $(document).on("click", ".sendComment", enviarComentario);
  $(document).on("click", ".sendReply", enviarReply);
  $(document).on("click", ".reply", replyAtivado);
  $(document).on("click", ".fa-thumbs-up", likeComentario);

  $(document).change(contadorComentarios);
});

//countComments
function contadorComentarios() {

  var total = document.getElementsByTagName('article').length;
  $('.count-comments').text(total + 1);
}


//sendComment
function enviarComentario() {

  var comentario = $('.comment').val();
  var localComentario = $('.comments');
  var user = "";

  if (!comentario.length == 0) {

    localComentario.prepend(montarComentario(user, comentario));
    $('.comment').val('');

    Mensagem("Comentário enviado com sucesso!");

  }
}

//sendReply
function enviarReply() {

  var replyTexto = $(this).parent().parent().find('.reply-comment').val();
  var localReply = $(this).parent().parent();
  var user = $(localReply).siblings('.user').text();

  $(this).parent(".reply-a-comment").slideToggle('hidden');

  if (!replyTexto.length == 0) {

    localReply.append(montarComentario(user, replyTexto));
    localReply.find('.reply-comment').val('');
    localReply.find('article').addClass('new-comment');
  }
}

//EnabledReply
function replyAtivado() {

  var localReply = $(this).siblings(".reply-a-comment").slideToggle('hidden');

}

//Create a new comment or reply
function montarComentario(user, texto) {

  return `<article>

              <img class="img-user" src="img/user.jpg" alt="Foto de Usuario Anonimo">
              <h4 class="user">Anonymous</h4>

              <p class="comment-text"><a class="user-text">${user}</a> ${texto}</p>

              <div class="response">

              <a class="reply">Reply</a>
              <i class="fa fa-thumbs-up" aria-hidden="true"></i><span class="count">0</span>

              <div class="reply-a-comment hidden">
                <textarea class="reply-comment" rows="8" cols="80" placeholder="Reply this comment"></textarea>
                <a class="sendReply">Send</a>
              </div>

            </div>
      </article>`;

}

//Receive a message to display on the screen
function Mensagem(mensagem) {

  var setMensagem = $('.message-comment').text(mensagem);

  setTimeout(function() {

    setMensagem.text('');

  }, 2000);

}

//TextArea autoHeight
jQuery.fn.extend({

  autoHeight: function() {

    function autoHeight_(element) {

      return jQuery(element)
        .css({
          'height': 'auto',
          'overflow-y': 'hidden'
        })
        .height(element.scrollHeight);

    }

    return this.each(function() {

      autoHeight_(this).on('input', function() {

        autoHeight_(this);

      });
    });
  }
});


function likeComentario() {

  var contador = $(this).siblings('.count');
  var totalLikes = contador.text();

  if ($(this).hasClass('like')) {
    totalLikes = parseInt(--totalLikes);
    $(contador).text(totalLikes);
    $(this).removeClass('like');
  } else {
    totalLikes = parseInt(++totalLikes);
    $(contador).text(totalLikes);
    $(this).addClass('like');
  }
}
