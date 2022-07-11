interface Veiculo {
    nomeDoVeiculo: string,
    placaDoVeiculo: string,
    hora: any | string,
}
(function(){
const s = (procura: string): HTMLInputElement|null => {return document.querySelector(procura)}

function ler():Veiculo[]{
    return localStorage.patio? JSON.parse(localStorage.patio):[]
}

function salvar(veiculos: Veiculo[]){
    localStorage.setItem("patio",JSON.stringify(veiculos))

}

function renderizar(){
    
    s('#patio').innerHTML=''
        const patio = ler()

        if(patio.length){

            patio.forEach((veiculo) => adiciona(veiculo,false));
            
        }
    
    
}

function remover(placa: string){
    if(confirm('Deseja deletar essa entrada?')){ 
    salvar(ler().filter((nomeVeiculo)=>nomeVeiculo.placaDoVeiculo!==placa));
    renderizar();
    }
    else return;

}

function adiciona(veiculo: Veiculo,salva: boolean){
const row = document.createElement('tr')
row.innerHTML = '<td>'+veiculo.nomeDoVeiculo+'</td>'+'<td>'+veiculo.placaDoVeiculo+'</td>'+'<td>'+veiculo.hora+'</td>'+'<td><button class="delete" data-placa="'+veiculo.placaDoVeiculo+'">X</button></td>';
s('#patio')?.appendChild(row)

row.querySelector(".delete")?.addEventListener('click',function(){
remover(this.dataset.placa)
})

if(salva)salvar([...ler(),veiculo])
}

s('#cadastrar')?.addEventListener('click',() =>{
    const nome = s('#nome')?.value;
    const placa = s('#placa')?.value;
    const hora = new Date();
    if (!nome ||!placa) {alert('Digite os dois campos'); return}
    adiciona({nomeDoVeiculo: nome,placaDoVeiculo: placa,hora: hora}, true)
})
renderizar();
})()