const inicar = () => {
    fetch('https://carlosreneas.github.io/endpoints/cartas.json')
        .then(res => res.text())
        .then(res => {
            let _text = res.replace("[", "");
            let _text2 = _text.replace("]", ",");
            return res;
        }).then(res => {
            let data = JSON.parse(res);
            let arr = [];
            data = data.data;
               for (let i in data) {
                   arr.push({numero:data[i].numero, carta:data[i].carta, valor:parseInt(data[i].valor)});
                  // let carta = data[i];
                 //  localStorage.setItem(carta.carta, JSON.stringify(carta))
               }
            localStorage.setItem("cartas", JSON.stringify(arr))
        });
}

const test = () => {
    console.log("test");
}
const mostrarCartas = () => {
    let cartas = JSON.parse(localStorage.getItem("cartas"));
   // cartas.sort((a, b) => a.valor - b.valor)
    let div = document.querySelector("#cartas");
    div.innerHTML = "";
    for (let i in cartas) {
        let carta = cartas[i];
        let img = document.createElement("img");
        img.className = "carta";
        img.setAttribute("src", `img/${carta.numero}.png`);
        img.setAttribute("onClick", `javascript:incrementarCarta(${carta.numero});`)
        div.appendChild(img);
    }
    mostrarTabla(cartas);
}

const mostrarTabla = (cartas) => {

    let tbody = document.querySelector("#tablaCartas");
    tbody.innerHTML = "";
    for (let i in cartas) {
        let carta = cartas[i];
        let tr = document.createElement("tr");
        
        let tdNumero = document.createElement("td");
        let tdCarta = document.createElement("td");
        let tdValor = document.createElement("td");
        
        tdNumero.textContent = carta.numero;
        tdCarta.textContent = carta.carta;
        tdValor.textContent = carta.valor;
        tr.appendChild(tdNumero);
        tr.appendChild(tdCarta);
        tr.appendChild(tdValor);

        tbody.appendChild(tr);
    }
}
const isLogged = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    return (user != null);
}

const salir = () => {
    borrarUsuario();
    loadLogin();
}
const borrarUsuario = () => {
    localStorage.removeItem("user");
}
const loadLogin = () => {
    document.getElementById('contenido').innerHTML = '';
    let html = fetch('login.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('contenido').innerHTML = html;
        })
}
const loadCartas = () => {
    document.getElementById('contenido').innerHTML = '';
    let html = fetch('juego.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('contenido').innerHTML = html;
        }).then(() => {
            mostrarCartas();
        })
}
window.onload = () => {
    inicar();
    if (isLogged()) {
        loadCartas();
    } else {
        loadLogin();
    }
}

const login = () => {
    let username = document.querySelector('#fname').value
    const password = document.querySelector('#lname').value
    if (username == "admin" && password == 1234) {
        let user = {
            username: username,
            password: password
        }
        localStorage.setItem('user', JSON.stringify(user));
        loadCartas();
    } else {
        let div = document.querySelector("#msgLogin");
        div.innerHTML = "";
        div.className = "alert-danger";
        let mensaje = document.createElement("p");
        mensaje.textContent = "Usuario o clave incorrecto!";
        div.appendChild(mensaje);
    }

}

const incrementarCarta = (numero_carta) => {
    let cartas = JSON.parse(localStorage.getItem("cartas"));
    for(let i in cartas){
        let carta = cartas[i];
        if (carta.numero == numero_carta) {
            carta.valor++;
            break;
        }
    }
    console.log(cartas);
    cartas.sort((a, b) => b.valor - a.valor);
    localStorage.setItem("cartas", JSON.stringify(cartas));
    mostrarCartas();
}
const registrarCarta=(numero, nombre)=>{
    let cartas = JSON.parse(localStorage.getItem("cartas"));
    cartas.push({numero:numero,carta:nombre,valor:"0"});
    cartas.sort((a, b) => b.valor - a.valor);
    localStorage.setItem("cartas", JSON.stringify(cartas));
    console.log(cartas);
    mostrarCartas();
}


/**
 * btn.onclick  = () =>{
    let numero= document.getElementById("#number").value
    let cart= document.getElementById("#cart").value
    registrarCarta(numero, cart);
}
 */

const addCarta = () => {
    let numero= document.getElementById("number").value
    let cart= document.getElementById("cart").value
    registrarCarta(numero, cart);
}
