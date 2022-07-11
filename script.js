var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function () {
    var _a;
    var s = function (procura) { return document.querySelector(procura); };
    function ler() {
        return localStorage.patio ? JSON.parse(localStorage.patio) : [];
    }
    function salvar(veiculos) {
        localStorage.setItem("patio", JSON.stringify(veiculos));
    }
    function renderizar() {
        s('#patio').innerHTML = '';
        var patio = ler();
        if (patio.length) {
            console.log('quase');
            patio.forEach(function (veiculo) { return adiciona(veiculo, false); });
        }
    }
    function remover(placa) {
        if (confirm('Deseja deletar essa entrada?')) {
            salvar(ler().filter(function (nomeVeiculo) { return nomeVeiculo.placaDoVeiculo !== placa; }));
            renderizar();
        }
        else
            return;
    }
    function adiciona(veiculo, salva) {
        var _a, _b;
        var row = document.createElement('tr');
        row.innerHTML = '<td>' + veiculo.nomeDoVeiculo + '</td>' + '<td>' + veiculo.placaDoVeiculo + '</td>' + '<td>' + veiculo.hora + '</td>' + '<td><button class="delete" data-placa="' + veiculo.placaDoVeiculo + '">X</button></td>';
        (_a = s('#patio')) === null || _a === void 0 ? void 0 : _a.appendChild(row);
        (_b = row.querySelector(".delete")) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
            remover(this.dataset.placa);
        });
        if (salva)
            salvar(__spreadArray(__spreadArray([], ler(), true), [veiculo], false));
    }
    (_a = s('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        var _a, _b;
        var nome = (_a = s('#nome')) === null || _a === void 0 ? void 0 : _a.value;
        var placa = (_b = s('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        var hora = new Date();
        if (!nome || !placa) {
            alert('Digite os dois campos');
            return;
        }
        adiciona({ nomeDoVeiculo: nome, placaDoVeiculo: placa, hora: hora }, true);
    });
    renderizar();
})();