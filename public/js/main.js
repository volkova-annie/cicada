axios.get('https://randomuser.me/api/?results=24').then(response => {
  const data = response.data.results;
  appendData(data);
}, error => {
  console.error(error);
});

function appendData(data) {
  const elem = document.querySelector('.counsil');

  data.forEach(i => {
    const card = document.createElement('div');
    card.className = 'counsil-card';
    const avatar = document.createElement('div');
    avatar.className = 'counsil-avatar';
    const img = document.createElement('img');
    img.setAttribute('src', i.picture.large);
    img.setAttribute('alt', '');

    avatar.appendChild(img);

    const name = document.createElement('div');
    name.className = 'counsil-name';
    name.innerText = i.name.first + ' ' + i.name.last;
    const position = document.createElement('div');
    position.className = 'counsil-position';
    position.innerText = i.location.city;

    card.appendChild(avatar);
    card.appendChild(name);
    card.appendChild(position);

    elem.appendChild(card);
  });
}