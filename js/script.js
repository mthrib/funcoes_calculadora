let tipoFuncao = '';
let grafico;

function setFunctionType(tipo) {
  tipoFuncao = tipo;
  const inputDiv = document.getElementById('inputs');
  inputDiv.innerHTML = `
    <input type="number" id="xMin" placeholder="x mínimo" />
    <input type="number" id="xMax" placeholder="x máximo" />
  `;

  if (tipo === 'afim') {
    inputDiv.innerHTML += `
      <p>y = ax + b</p>
      <input type="number" id="a" placeholder="Coeficiente a" />
      <input type="number" id="b" placeholder="Coeficiente b" />
    `;
  } else if (tipo === 'exponencial') {
    inputDiv.innerHTML += `
      <p>y = a^x</p>
      <input type="number" id="a" placeholder="Base a" />
    `;
  }
}

function gerarGrafico() {
  const xMin = parseInt(document.getElementById('xMin')?.value);
  const xMax = parseInt(document.getElementById('xMax')?.value);
  const a = parseFloat(document.getElementById('a')?.value);
  const b = tipoFuncao === 'afim' ? parseFloat(document.getElementById('b')?.value) : null;

  if (isNaN(xMin) || isNaN(xMax) || isNaN(a) || (tipoFuncao === 'afim' && isNaN(b))) {
    alert("Por favor, preencha todos os campos corretamente!");
    return;
  }

  if (xMax < xMin) {
    alert("O valor de x máximo deve ser maior ou igual ao x mínimo.");
    return;
  }

  const x = [];
  const y = [];

  for (let i = xMin; i <= xMax; i++) {
    x.push(i);
    if (tipoFuncao === 'afim') {
      y.push(a * i + b);
    } else if (tipoFuncao === 'exponencial') {
      y.push(Math.pow(a, i));
    }
  }

  const ctx = document.getElementById('grafico').getContext('2d');

  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: 'line',
    data: {
      labels: x,
      datasets: [{
        label: tipoFuncao === 'afim' ? 'Função Afim: y = ax + b' : 'Função Exponencial: y = a^x',
        data: y,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        pointBackgroundColor: '#2563eb',
        fill: true,
        tension: 0.25,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: 'x', color: '#555' },
          grid: { color: '#eee' }
        },
        y: {
          title: { display: true, text: 'y', color: '#555' },
          grid: { color: '#eee' }
        }
      },
      plugins: {
        legend: { labels: { color: '#333' } },
        zoom: {
          pan: { enabled: true, mode: 'xy', modifierKey: 'ctrl' },
          zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'xy' }
        }
      }
    }
  });
}
