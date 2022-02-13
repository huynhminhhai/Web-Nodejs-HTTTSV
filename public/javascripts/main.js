$(function(){

  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  $('#get-button').on('click', function() {
    // Read and write from mongoDb
    
    var id_user = $('#id-poster').val()
    var position_admin = $('#position-admin').val()
    var flag = 0
    
    $.ajax({
      url: '/posts',
      contentType: 'application/json',
      success: function(response) {
        var tBodyEl = $('.body-posts');
        tBodyEl.html('');
        // console.log(Object.keys(response.posts).length)
        var start = flag
        var limit = flag + 10
        // console.log(start,limit)
        var t = 0
        response.posts.reverse().slice(start,limit).forEach(function(post) {
          t += 1;
          clas = "t"+t;

          let element = ''

          element += '<div class="site-img">'

          for (var i = 0 ; i< post.img.length; i++) {
            element += '<a href="'+post.img[i]+'" data-size="960x640"><img src="'+post.img[i]+'"/></a>'
          }

          element += '</div>'
          // console.log(element)
          
          tBodyEl.append('\
              <div class="posts">\
              <textarea rows="9" cols="70" class="urlVideo" hidden>'+ post.urlVideo +'</textarea>\
                <p class="id" hidden>'+ post._id +'</p>\
                <div class="header-post">\
                <div class="profile-post">\
                  <img class="profile-post-img" src="'+ post.postMan[0].img +'" alt="">\
                  <div class="profile-post-inf">\
                    <p class="profile-post-name"><a href="/user/'+id_user+'/'+ post.postMan[0]._id +'">'+ post.postMan[0].fullname +'</a></p>\
                    <p class="profile-post-date">'+ post.updatedAt +'</p>\
                  </div>\
                </div>\
                <div class="three-point">\
                  <a class="three-point-color nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                  </a>\
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">\
                    '+ (position_admin == "vip" ? '<button class="dropdown-item" id="delete-button">Xóa</button>' : '')  +'\
                    '+ (id_user == post.idP ? '<button class="dropdown-item" id="delete-button">Xóa</button>' : '')  +'\
                    '+ (id_user == post.idP ? '<button class="dropdown-item" id="update-button" data-toggle="modal" data-target="#myModal">Chỉnh sửa</button>' : '')  +'\
                  </div>\
                </div>\
              </div>\
              <div class="main-post">\
                <p class="text">'+ post.text +'</p>\
                '+ (post.img == "" ? '' : element) +' \
                '+ post.urlVideo +'\
              </div>\
              <div class="footer-post">\
                <form class="comment-form'+t+'">\
                  <input type="text" class="comment-post'+t+'" placeholder="Bạn đang nghĩ gì?">\
                </form>\
                <div class="commented '+ clas +'">\
                  \
                </div>\
              </div>\
            </div>\
          ');
          
          response.comments.slice().reverse().forEach(function(comment) {
            var element = ""
            if(post._id == comment.idPost) {
              element = '<div class="body-comment"><p class="id-comment" hidden>'+ comment._id +'</p><div class="body-commented"><img src="'+ comment.cmtMan[0].img +'" class="commented-img "><p class="commenter">'+comment.cmtMan[0].fullname+'</p><p class="commented-text">: ' + comment.text + '</p></div>'+ (id_user == comment.idC ? '<button class="delete-comment" >Xóa</button>' : '') +'</div>'
              $(".t"+t).append(element)
            }
          })
          
          flag += 1
          // console.log(flag)
        });

        $(window).scroll(function() {
          if($(window).scrollTop() + 1 >= $(document).height() - $(window).height()) {
            //console.log('ok')
            start = flag
            limit = flag + 10
            // console.log(start, limit)
            // console.log(response.posts.slice(start,limit))
            setTimeout(function() {
              response.posts.slice(start,limit).forEach(function(post) {
                t += 1;
                clas = "t"+t;

                let element = ''

                element += '<div class="site-img">'

                for (var i = 0 ; i< post.img.length; i++) {
                  element += '<a href="'+post.img[i]+'" data-size="960x640"><img src="'+post.img[i]+'"/></a>'
                }

                element += '</div>'
      
                tBodyEl.append('\
                    <div class="posts">\
                    <textarea rows="9" cols="70" class="urlVideo" hidden>'+ post.urlVideo +'</textarea>\
                      <p class="id" hidden>'+ post._id +'</p>\
                      <div class="header-post">\
                      <div class="profile-post">\
                        <img class="profile-post-img" src="'+ post.postMan[0].img +'" alt="">\
                        <div class="profile-post-inf">\
                          <p class="profile-post-name"><a href="/user/'+id_user+'/'+ post.postMan[0]._id +'">'+ post.postMan[0].fullname +'</a></p>\
                          <p class="profile-post-date">'+ post.updatedAt +'</p>\
                        </div>\
                      </div>\
                      <div class="three-point">\
                        <a class="three-point-color nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                        </a>\
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">\
                          '+ (position_admin == "vip" ? '<button class="dropdown-item" id="delete-button">Xóa</button>' : '')  +'\
                          '+ (id_user == post.idP ? '<button class="dropdown-item" id="delete-button">Xóa</button>' : '')  +'\
                          '+ (id_user == post.idP ? '<button class="dropdown-item" id="update-button" data-toggle="modal" data-target="#myModal">Chỉnh sửa</button>' : '')  +'\
                        </div>\
                      </div>\
                    </div>\
                    <div class="main-post">\
                      <p class="text">'+ post.text +'</p>\
                      '+ (post.img == "" ? '' : element) +' \
                      '+ post.urlVideo +'\
                    </div>\
                    <div class="footer-post">\
                      <form class="comment-form'+t+'">\
                        <input type="text" class="comment-post'+t+'" placeholder="Bạn đang nghĩ gì?">\
                      </form>\
                      <div class="commented '+ clas +'">\
                        \
                      </div>\
                    </div>\
                  </div>\
                ');
                
                response.comments.slice().reverse().forEach(function(comment) {
                  var element = ""
                  if(post._id == comment.idPost) {
                    element = '<div class="body-comment"><p class="id-comment" hidden>'+ comment._id +'</p><div class="body-commented"><img src="'+ comment.cmtMan[0].img +'" class="commented-img "><p class="commenter">'+comment.cmtMan[0].fullname+'</p><p class="commented-text">: ' + comment.text + '</p></div>'+ (id_user == comment.idC ? '<button class="delete-comment" >Xóa</button>' : '') +'</div>'
                    $(".t"+t).append(element)
                  }
                })
  
                flag += 1
                // console.log(flag)
              });
            }, 1000)
          }
        });
      }
    })
  })

  //Create
  $('#create-form').on('submit', (event) => {
    event.preventDefault();

    var createInput = $('#create-input');
    var totalImg = $('#file-img')[0].files.length;
    var urlVideo = $('#url-video');
    var idPoster = $('#id-poster');
    
    var formData = new FormData();


    for (var i = 0 ; i < totalImg ; i++) {
      formData.append("fileImg", $('#file-img')[0].files[i])
      //console.log($('#file-img')[0].files[i])
    }

    formData.append("text", createInput.val());
    // formData.append("file-img", fileImg);
    formData.append("urlvideo", urlVideo.val())
    formData.append("idPoster", idPoster.val());

    // console.log(formData)

    $.ajax({
      url: '/posts',
      method: 'POST',
      // dataType: 'json',
      contentType: false,
      processData: false,
      data: formData,
      success: (response) => {
        //console.log(response);
        createInput.val('');
        urlVideo.val('');
        $('#file-img').val('');
        $('#get-button').click();
      }
    })
  })


  // DELETE
  $('.body-posts').on('click', '#delete-button', function() {
    
    if (confirm("Bạn muốn xóa bài đăng của mình không?")) {
      var rowEl = $(this).closest('.posts');
      var id = rowEl.find('.id').text();
      //console.log(id)
      $.ajax({
          url: '/posts/' + id,
          method: 'DELETE',
          contentType: 'application/json',
          success: (response) => {
              //console.log(response);
              $('#get-button').click();
          }
      });
    }
    return false;
  });

  //UPDATE

  $('.body-posts').on('click', '#update-button', function() {
    var rowEl = $(this).closest('.posts');
    var id = rowEl.find('.id').text();
    var text = rowEl.find('.text').text();
    var urlvideo = rowEl.find('.urlVideo').text();
    // console.log(text, id ,urlvideo)
    $('#update-id-post').val(id);
    $('#update-text').val(text);
    $('#update-video').val(urlvideo);

    $('#update-form').on('submit', function(event) {
      event.preventDefault();
      var updateIdPost = $('#update-id-post').val();
      var updateText = $('#update-text').val();
      var updateVideo = $('#update-video').val();
      var updateImg = $('#update-img')[0].files[0];
      // console.log(updateIdPost, updateText, updateVideo, updateImg)

      var formData = new FormData();
      formData.append('id',updateIdPost);
      formData.append('text',updateText);
      formData.append('file-img',updateImg);
      formData.append('urlvideo',updateVideo);

      $.ajax({
        url: '/posts/' + id,
        method: 'PUT',
        contentType: false,
        processData: false,
        data: formData,
        success: (response) => {
          //console.log(response);
          $('#myModal').modal('toggle');
          $('#get-button').click();
        }
      })
    })

  })


// Create comment


  $('.body-posts').on('submit','form', function(e) {
    e.preventDefault()
    var rowEl = $(this).closest('.posts');
    var textCmt = rowEl.find('input').val();
    var id = rowEl.find('.id').text();
    var id_user = $('#id-poster').val()
    //console.log(textCmt)
    var formData = new FormData();
    formData.append("text",textCmt);
    formData.append("idPost",id);
    formData.append("idC",id_user);

    $.ajax({
      url: '/comments',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ textCmt: textCmt, idPost: id, idC: id_user }),
      success: function(response) {
          //console.log(response);
          // $('input').val('');
          $('#get-button').click();
      }
    });
  })
  

// Delete comment

  $('.body-posts').on('click', '.delete-comment', function() {
    if (confirm("Bạn muốn xóa bình luận của mình không?")) {
      var rowEl = $(this).closest('.body-comment');
      var id = rowEl.find('.id-comment').text();
      // console.log(id)
      $.ajax({
          url: '/comments/' + id,
          method: 'DELETE',
          contentType: 'application/json',
          success: (response) => {
              //console.log(response);
              $('#get-button').click();
          }
      });
    }
    return false;
  })


//noti

  $('#get-button').on('click', function(){

    $.ajax({
      url: '/noti',
      contentType: 'application/json',
      success: function(response) {

        var arr_position = $('.array-position')
        

        var id_user = $('#id-poster').val()
        var rowNoti = $('.noti');
        rowNoti.html('');

        response.forEach((user) => {
          if(user._id == id_user){
            user.position.forEach((position) => {
              rowNoti.append('\
              <a class="dropdown-item" href="/notifications/'+position+'/'+id_user+'">'+position+'</a>\
              ')
            })
          }
        })
      }
    })

  })

  $('#get-button').on('click', function(){

    $.ajax({
      url: '/noti-lists',
      contentType: 'application/json',
      success: function(response) {
        var id_user = $('#id-poster').val()
        var arr_position = []
        response.users.forEach((user) => {
          if(user._id == id_user){
            arr_position = user.position
          }
        })

        // console.log(arr_position)
        // console.log(response.notifications)
        // console.log(response.notifications.slice().reverse())

        var rowNoti = $('.body-notis');
        rowNoti.html('');

        response.notifications.reverse().slice(0,5).forEach((notification) => {
          rowNoti.append('\
              <div class="body-noti">\
                <div class="header-body-noti">\
                  <p class="faculty-noti"><a href="/noti/'+notification.faculty+'/'+id_user+'">['+notification.faculty+']</a> - </p>\
                  <p class="date-noti">'+notification.createdAt+'</p>\
                </div>\
                <a href="/detail-noti/'+notification._id+'/'+id_user+'" class="title-noti"><p class="title-noti">'+notification.title+'</p></a>\
                <div class="button-group">\
                '+(arr_position.includes("vip") == true ? '<p><a class="delete-noti" type="button" href="/delete-noti/'+notification._id+'">[Xóa]</a></p>': '')+'\
                '+(arr_position.includes(notification.faculty) == true ? '<p><a class="delete-noti" type="button" href="/delete-noti/'+notification._id+'">[Xóa]</a></p>': '')+'\
                '+(arr_position.includes(notification.faculty) == true ? '<p><a class="update-noti" type="button" href="/update-noti/'+notification._id+'">[Chỉnh sửa]</a></p>': '')+'\
                </div>\
              </div>\
          ')
        })
      }
    })

  })

//Delete noti

  $('.body-notis').on('click', '.delete-noti', function() {
    if (confirm("Bạn có chắc muốn xóa thông báo này không?")) {
      return true;
    }
    return false;
  })

  $('.body-notiFaculty').on('click', '.delete-noti', function() {
    if (confirm("Bạn có chắc muốn xóa thông báo này không?")) {
      return true;
    }
    return false;
  })



// Personal post

  $('#get-button').on('click', function() {
    var id = $('.id').val();
    var id_user = $('.idUser').val();
    // console.log(id,id_user)
    $.ajax({
      url: '/post-personal/' + id_user + '/' + id,
      contentType: 'application/json',
      success: function(response) {
        var bodyE = $('.body-post-personal')
        bodyE.html('')
        // console.log(response.posts)
        var t = 0
        response.posts.slice().reverse().forEach((post) => {
          t += 1;
          clas = "c"+t;
          let element = ''

          element += '<div class="site-img1">'

          for (var i = 0 ; i< post.img.length; i++) {
            element += '<a href="'+post.img[i]+'" data-size="960x640"><img src="/'+post.img[i]+'"/></a>'
          }

          element += '</div>'

          bodyE.append('\
          <div class="posts-personal">\
              <p class="id-post" hidden>'+ post._id +'</p>\
              <div class="header-post-personal">\
                  <div class="profile-post-personal">\
                      <img class="profile-post-img" src="/'+ post.postMan[0].img +'" alt="">\
                      <div class="profile-post-personal-inf">\
                          <p class="profile-post-personal-name">'+ post.postMan[0].fullname +'</p>\
                          <p class="profile-post-personal-date">'+ post.updatedAt +'</p>\
                      </div>\
                  </div>\
                  <div class="three-point">\
                      <a class="three-point-color nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                      </a>\
                      <div class="dropdown-menu" aria-labelledby="navbarDropdown">\
                          '+ (id_user == post.idP ? '<button class="dropdown-item" id="delete-button">Xóa</button>' : '')  +'\
                          '+ (id_user == post.idP ? '<button class="dropdown-item" id="update-button" data-toggle="modal" data-target="#myModal">Chỉnh sửa</button>' : '')  +'\
                      </div>\
                  </div>\
              </div>\
              <div class="main-post-personal">\
                  <p class="text-personal">'+post.text+'</p>\
                  '+ (post.img == "" ? '' : element) +' \
                  '+ post.urlVideo +'\
              </div>\
              <div class="footer-post-personal">\
                  <form class="comment-form-personal'+t+'">\
                      <input type="text" class="comment-post-personal'+t+'" placeholder="Bạn đang nghĩ gì?">\
                  </form>\
                  <div class="commented-personal '+ clas +'">\
                      \
                  </div>\
              </div>\
          </div>\
          ')
          response.comments.slice().reverse().forEach(function(comment) {
            var element = ""
            if(post._id == comment.idPost) {
              element = '<div class="body-comment-personal"><p class="id-comment-personal" hidden>'+ comment._id +'</p><div class="body-commented-personal"><img src="/'+ comment.cmtMan[0].img +'" class="commented-img-personal "><p class="commenter-personal">'+comment.cmtMan[0].fullname+'</p><p class="commented-text-personal">: ' + comment.text + '</p></div>'+ (id_user == comment.idC ? '<button class="delete-comment-personal" >Xóa</button>' : '') +'</div>'
              $(".c"+t).append(element)
            }
          })
        })
      }
    })
  })

// Create comment
  $('.body-post-personal').on('submit','form', function(e) {
    e.preventDefault()
    var rowEl = $(this).closest('.posts-personal');
    var textCmt = rowEl.find('input').val();
    var idPost = rowEl.find('.id-post').text();
    var id_user = $('#id-user').val();
    // console.log(textCmt, idPost, id_user)
    // var formData = new FormData();
    // formData.append("text",textCmt);
    // formData.append("idPost",idPost);
    // formData.append("idC",id_user);

    $.ajax({
      url: '/comments',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ textCmt: textCmt, idPost: idPost, idC: id_user }),
      success: function(response) {
          //console.log(response);
          // $('input').val('');
          $('#get-button').click();
      }
    });
  })


// Delete comment

  $('.body-post-personal').on('click', '.delete-comment-personal', function() {
    // console.log('ok')
    if (confirm("Bạn muốn xóa bình luận của mình không?")) {
      var rowEl = $(this).closest('.body-comment-personal');
      var id = rowEl.find('.id-comment-personal').text();
      // console.log(id)
      $.ajax({
          url: '/comments/' + id,
          method: 'DELETE',
          contentType: 'application/json',
          success: (response) => {
              //console.log(response);
              $('#get-button').click();
          }
      });
    }
    return false;
  })


  $('#get-button').on('click', function() {

    var faculty = $('.notiFaculty').text();
    var bodyNotiFaculty = $('.body-notiFaculty');
    var idUser = $('#idUser').val()
    bodyNotiFaculty.html('');

    $.ajax({
      url: '/noti-faculty/' + faculty + '/'+ idUser,
      contentType: 'application/json',
      success: function(response) {
        var arr_position = []
        if(!response.user.position) {
          arr_position = ['Student']
        }else {
          arr_position = response.user.position
        }
        // console.log(arr_position)
        // console.log(response)
        response.notis.slice().reverse().forEach((noti) => {
          bodyNotiFaculty.append('\
            <div class="notiFaculty-group">\
              <p class="notiFaculty-title"><a href="/detail-noti/'+noti._id+'/'+idUser+'">'+noti.title+'</a></p>\
              <p class="notiFaculty-date">'+noti.updatedAt+'</p>\
              <div class="button-group">\
                '+(arr_position.includes("vip") == true ? '<p><a class="delete-noti" type="button" href="/delete-noti/'+noti._id+'">[Xóa]</a></p>': '')+'\
                '+(arr_position.includes(noti.faculty) == true ? '<p><a class="delete-noti" type="button" href="/delete-noti/'+noti._id+'">[Xóa]</a></p>': '')+'\
                '+(arr_position.includes(noti.faculty) == true ? '<p><a class="update-noti" type="button" href="/update-noti/'+noti._id+'">[Chỉnh sửa]</a></p>': '')+'\
                </div>\
            </div>\
            <hr>\
          ')
        })
      }
    })
  })

  var page = 0;
  var pageLimit = 10;
  var totalNoti = 0;
  var numberPage = 1;

  notiPage();

  $('.prev-btn').on('click', function() {
    if(page > 0) {
      page -= 10;
      pageLimit -= 10
      numberPage --;
      notiPage();
    }
    // console.log("Prev page: " + numberPage)
  })

  $('.next-btn').on('click', function() {
    if(pageLimit < totalNoti) {
      page += 10;
      pageLimit += 10
      numberPage ++;
      // console.log('test'+pageLimit, totalNoti)
      notiPage();
    }
    // console.log("Next page: " + numberPage)
  })

  function notiPage() {
    var idUser = $('#idUser').val()
    var bodyAllnoti = $('.all-notis')
    bodyAllnoti.html('')
    $('.numberPage').text('Page: ' + numberPage)
    $.ajax({
      url: '/allNoti',
      contentType: 'application/json',
      success: function(response) {
        totalNoti = Object.keys(response.notis).length
        // console.log(page, pageLimit)
        response.notis.reverse().slice(page, pageLimit).forEach((noti) => {
          bodyAllnoti.append('\
            <div class="notiFaculty-group">\
             <p class="notiFaculty-title"><a href="/detail-noti/'+noti._id+'/'+idUser+'">'+noti.title+'</a></p>\
             <p class="notiFaculty-date">'+noti.updatedAt+'</p>\
             <p class="notiFaculty-date">['+noti.faculty+']</p>\
            </div>\
            <hr>\
          ')
        })
      }
    })
  }
  

  $('#get-button').on('click', function() {
    // containerF.append('<div class="card-deck"></div>')
    cardDeck = $('.card-deck');
    cardDeck.html('')

    var id_user = $('#id-poster').val();
    

    $.ajax({
      url: '/faculties',
      contentType: 'application/json',
      success: function(response) {
        // console.log(response)
        //console.log(id_user)
        response.faculties.forEach((faculty) => {
          cardDeck.append('\
            <div class="col-6 col-sm-4 col-md-3 col-lg-2">\
              <a href="/noti/'+faculty.faculty+'/'+id_user+'">\
                <div class="card h-100">\
                  <img src="https://images.squarespace-cdn.com/content/v1/5930dc9237c5817c00b10842/1557979868721-ZFEVPV8NS06PZ21ZC174/ke17ZwdGBToddI8pDm48kBtpJ0h6oTA_T7DonTC8zFdZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIBqmMCQ1OP129tpEIJko8bi_9nfbnt8dRsNvtvnXdL8M/images.png" alt="">\
                  <div class="content">\
                    <p>'+faculty.faculty+'</p>\
                  </div>\
                </div>\
              </a>\
            </div>\
          ')
        })

      }
    })
  })

  if(document.getElementById('get-button')) {
    document.getElementById('get-button').click();
  }

  // console.log('olo')

  // window.onload = () => {

      const socket = io();
      toastr.options = {
          timeOut: 2000,
          positionClass : 'toast-top-center',
          extendedTimeOut: 0,
          fadeOut: 0,
          fadeIn: 0,
          showDuration: 0,
          hideDuration: 0,
          debug: false
      };
  
      
      socket.on('new-notification', (resp) => {
        toastr.info(resp)
        alert(resp)
      });
  
      
      $('#button-post-noti').on('click', function() {
        let msg = document.getElementById('noti-text').value;
        let faculty = document.getElementById('notification-faculty').value;
        let message = faculty + ' vừa đăng 1 thông báo: ' + msg
        if(msg.trim() !== '') {
          socket.emit("send-notification", message);
         // console.log(message)
        }
      })
    
  // }


});