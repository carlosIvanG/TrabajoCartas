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