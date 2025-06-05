let tipoFuncao = '';
let grafico;

Chart.register(window['chartjs-plugin-zoom'].default || Chart.Zoom);

function setFunctionType(tipo) {
  tipoFuncao = tipo;
  const inputDiv = document.getElementById('inputs');
  inputDiv.innerHTML = '';

  if (tipo === 'afim') {
    inputDiv.innerHTML = `
      <p>y = ax + b</p>
      <input type="number" id="a" placeholder="Coeficiente a" />
      <input type="number" id="b" placeholder="Coeficiente b" />
      <input type="number" id="xMin" placeholder="x mínimo" />
      <input type="number" id="xMax" placeholder="x máximo" />
    `;
  } else if (tipo === 'exponencial') {
    inputDiv.innerHTML = `
      <p>y = a<sup>x</sup></p>
      <input type="number" id="a" placeholder="Base a" />
      <input type="number" id="xMin" placeholder="x mínimo" />
      <input type="number" id="xMax" placeholder="x máximo" />
    `;
  }
}

function gerarGrafico() {
  const a = parseFloat(document.getElementById('a')?.value);
  const bInput = document.getElementById('b');
  const b = bInput ? parseFloat(bInput.value) : null;
  const xMin = parseInt(document.getElementById('xMin')?.value);
  const xMax = parseInt(document.getElementById('xMax')?.value);

  if (isNaN(xMin) || isNaN(xMax) || xMin >= xMax) {
    alert("Informe um intervalo válido para x (x mínimo menor que x máximo)!");
    return;
  }

  if (tipoFuncao === 'afim') {
    if (isNaN(a) || isNaN(b)) {
      alert("Por favor, preencha os coeficientes a e b corretamente!");
      return;
    }
  } else if (tipoFuncao === 'exponencial') {
    if (isNaN(a)) {
      alert("Por favor, preencha a base a corretamente!");
      return;
    }
  } else {
    alert("Selecione uma função primeiro!");
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
      datasets: [
        {
          label:
            tipoFuncao === 'afim'
              ? 'Função Afim: y = ax + b'
              : 'Função Exponencial: y = a^x',
          data: y,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          pointBackgroundColor: '#2563eb',
          fill: true,
          tension: 0.25,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'x',
            color: '#555',
          },
          grid: {
            color: '#eee',
          },
        },
        y: {
          title: {
            display: true,
            text: 'y',
            color: '#555',
          },
          grid: {
            color: '#eee',
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: '#333',
          },
        },
        zoom: {
          pan: {
            enabled: true,
            mode: 'xy',
            modifierKey: 'ctrl',
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'xy',
          },
        },
      },
    },
  });
}
