const inicar = () => {
    fetch('https://carlosreneas.github.io/endpoints/cartas.json')
        .then(res => res.text())
        .then(res => {
            let _text = res.replace("[", "");
            let _text2 = _text.replace("]", ",");
            return res;
        }).then(res => {
            let data = JSON.parse(res);
            data = data.data;
            for (let i in data) {
                let carta = data[i];
                localStorage.setItem(carta.carta, JSON.stringify(carta))
            }
        })
}
window.onload = () => {
    inicar()
}

const login = () => {
    let username = document.querySelector('#fname').value
    const password = document.querySelector('#lname').value

    let user = {
        username: username,
        password: password
    }

    localStorage.setItem('user', JSON.stringify(user))
    console.log(`El usuario es ${user}, y la clave es ${password}`)
    let _user = localStorage.getItem('user')
    _user = JSON.parse(_user)
    console.log(`El usuario es ${_user.username}, y la clave es ${_user.password}`)
ocultar()
}
function ocultar() {
    document.getElementById("cuerpo2").style.display="contents"
    document.getElementById("cuerpo1").style.display="none"
}