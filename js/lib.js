$(function() {
  $('.mycarousel').mycarousel();

  $('#prev').on('click', function() {
    $('.mycarousel').mycarousel('scroll', '-=1');
  });

  $('#next').on('click', function() {
    $('.mycarousel').mycarousel('scroll', '+=1');
  });

  var tmpl = _.template(document.getElementById('tmpl-profile').innerHTML);
  var result = tmpl({
    profileName: 'Рубашкин Денис Иванович',
    workplace: 'Сотрудник MDM',
    reasons: ['Заборы строить не интересно', 'Мало платят', 'Приходится работать по ночам'],
    phoneNumber: '+380504745351',
    facebook: 'https://www.facebook.com/profile.php?id=100012546065190',
    feedback: 'Могу помочь с MS SQL'
    });
  
  console.log(result);
  var element = document.createElement('div');
  element.innerHTML = result;
  document.body.appendChild( element.childNodes[1] );
})

