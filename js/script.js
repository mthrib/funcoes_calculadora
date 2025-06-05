let tipoFuncao = '';
let grafico;

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
      <p>y = a · b<sup>x</sup></p>
      <input type="number" id="a" placeholder="Coeficiente a" />
      <input type="number" id="b" placeholder="Base b" />
      <input type="number" id="xMin" placeholder="x mínimo" />
      <input type="number" id="xMax" placeholder="x máximo" />
    `;
  }
}

function gerarGrafico() {
  const a = parseFloat(document.getElementById('a')?.value);
  const b = parseFloat(document.getElementById('b')?.value);
  const xMin = parseInt(document.getElementById('xMin')?.value);
  const xMax = parseInt(document.getElementById('xMax')?.value);

  if (isNaN(a) || isNaN(b) || isNaN(xMin) || isNaN(xMax)) {
    alert("Preencha todos os campos corretamente!");
    return;
  }
  if (xMin >= xMax) {
    alert("x mínimo deve ser menor que x máximo!");
    return;
  }

  const x = [];
  const y = [];

  for (let i = xMin; i <= xMax; i++) {
    x.push(i);
    if (tipoFuncao === 'afim') {
      y.push(a * i + b);
    } else if (tipoFuncao === 'exponencial') {
      y.push(a * Math.pow(b, i));
    }
  }

  const ctx = document.getElementById('grafico').getContext('2d');

  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: 'line',
    data: {
      labels: x,
      datasets: [{
        label: tipoFuncao === 'afim'
          ? `Função Afim: y = ${a}x + ${b}`
          : `Função Exponencial: y = ${a}·${b}^x`,
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
          title: {
            display: true,
            text: 'x',
            color: '#555'
          },
          grid: {
            color: '#eee'
          }
        },
        y: {
          title: {
            display: true,
            text: 'y',
            color: '#555'
          },
          grid: {
            color: '#eee'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#333'
          }
        }
      }
    }
  });
}
