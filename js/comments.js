//on document ready
$(function() {
  $('.comment').autoHeight();
  $(document).on("click", ".sendComment", enviarComentario);
  $(document).on("click", ".sendReply", enviarReply);
  $(document).on("click", ".reply", replyAtivado);
  $(document).on("click", ".fa-thumbs-up", likeComentario);
  $(document).on("click", ".fa-thumbs-down", dislikeComentario);
  $(document).change(contadorComentarios);
});

//send comment
function enviarComentario() {

  var comentario = $('.comment').val();
  var localComentario = $('.comments');
  var user = "";

  if (!isWhitespaceNotEmpty(comentario)) {

    localComentario.prepend(montarComentario(user, comentario));
    $('.comment').val('');

    Mensagem("Comentário enviado com sucesso!");

  }
}

//send reply
function enviarReply() {

  var replyTexto = $(this).parent().parent().find('.reply-comment').val();
  var localReply = $(this).parent().parent();
  var user = $(localReply).siblings('.user').text();

  $(this).parent(".reply-a-comment").slideToggle('hidden');

  if (!isWhitespaceNotEmpty(replyTexto)) {

    localReply.append(montarComentario(user, replyTexto));
    localReply.find('.reply-comment').val('');
    localReply.find('article').addClass('new-comment');
  }
}

//enabled reply
function replyAtivado() {

  var localReply = $(this).siblings(".reply-a-comment").slideToggle('hidden');

}

//create a new comment or reply
function montarComentario(user, texto) {

  return `<article>

              <img class="img-user" src="img/user.jpg" alt="Foto de Usuario Anonimo">
              <h4 class="user">Anonymous</h4>

              <p class="comment-text"><a class="user-text">${user}</a> ${texto}</p>

              <div class="response">

              <a class="reply">Reply</a>
              <i class="fa fa-thumbs-up" aria-hidden="true"></i><span class="likeCount">0</span>
              <i class="fa fa-thumbs-down" aria-hidden="true"></i><span class="dislikeCount">0</span>

              <div class="reply-a-comment hidden">
                <textarea class="reply-comment" rows="8" cols="80" placeholder="Reply this comment"></textarea>
                <a class="sendReply">Send</a>
              </div>

            </div>
      </article>`;

}

//receive a message to display on the screen
function Mensagem(mensagem) {

  var setMensagem = $('.message-comment').text(mensagem);

  setTimeout(function() {

    setMensagem.text('');

  }, 2000);

}

//textArea auto height
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

// Count likes in comment
function likeComentario() {

  var contador = $(this).siblings('.likeCount');
  var total = contador.text();

  if ($(this).hasClass('like')) {
    total = parseInt(--total);
    $(contador).text(total);
    $(this).removeClass('like');
  } else {
    total = parseInt(++total);
    $(contador).text(total);
    $(this).addClass('like');
  }
}

// Count dislikes in comment
function dislikeComentario() {

  var contador = $(this).siblings('.dislikeCount');
  var total = contador.text();

  if ($(this).hasClass('dislike')) {
    total = parseInt(--total);
    $(contador).text(total);
    $(this).removeClass('dislike');
  } else {
    total = parseInt(++total);
    $(contador).text(total);
    $(this).addClass('dislike');
  }
}

//count comments
function contadorComentarios() {

  var total = document.getElementsByTagName('article').length;
  $('.count-comments').text(++total);
}

//check if input has white space or empty string
function isWhitespaceNotEmpty(text) {
  return text.length > 0 && !/[^\s]/.test(text);
}
