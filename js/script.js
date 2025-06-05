let tipoFuncao = '';
let grafico;

// Registra o plugin globalmente (muito importante)
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
    `;
  } else if (tipo === 'exponencial') {
    inputDiv.innerHTML = `
      <p>y = a · b<sup>x</sup></p>
      <input type="number" id="a" placeholder="Coeficiente a" />
      <input type="number" id="b" placeholder="Base b" />
    `;
  }
}

function gerarGrafico() {
  const a = parseFloat(document.getElementById('a')?.value);
  const b = parseFloat(document.getElementById('b')?.value);

  if (isNaN(a) || isNaN(b)) {
    alert("Por favor, preencha todos os campos corretamente!");
    return;
  }

  const x = [];
  const y = [];

  for (let i = -10; i <= 10; i++) {
    x.push(i);
    if (tipoFuncao === 'afim') {
    y.push(a * i + b);
    } else if (tipoFuncao === 'exponencial') {
        y.push(Math.pow(a, i));  // aqui tiramos o 'a *' e 'b' e só usamos a^i
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
            modifierKey: 'ctrl', // só pan segurando Ctrl (opcional)
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
