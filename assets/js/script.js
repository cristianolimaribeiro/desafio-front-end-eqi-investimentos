const API_URL = 'http://localhost:3000'
const INDICATORS_URL = '/indicadores'
const SIMULATIONS_URL = '/simulacoes'
const TYPE_YELD = 'tipoRendimento='
const TYPE_INDEXING = 'tipoIndexacao='
const BTN_BRUTO = document.querySelector('#btn_bruto')
const BTN_LIQUIDO = document.querySelector('#btn_liquido')
const BTN_PRE = document.querySelector('#btn_pre')
const BTN_POS = document.querySelector('#btn_pos')
const BTN_FIXADO = document.querySelector('#btn_fixado')
const aporteInicial = document.querySelector('#aporte_inicial')
const prazos = document.querySelector('#prazos')
const aporteMensal = document.querySelector('#aporte_mensal')
const rentabilidade = document.querySelector('#rentabilidade')
const BTN_SIMULAR = document.querySelector('#btn_simular')
const BTN_LIMPA_CAMPOS = document.querySelector('#btn_limpa_campos')
let showChart = null

window.addEventListener('load', () => {
    const CDI = document.querySelector('#cdi')
    const IPCA = document.querySelector('#ipca')

    fetch(`${API_URL}${INDICATORS_URL}`)
        .then((res) => {
            return res.json()
        })
        .then((indicators) => {

            CDI.value = `${indicators[0].valor}%`
            IPCA.value = `${indicators[1].valor}%`
        })
        .catch((error) => {
            console.log('Não foi possível concluir a requisição');
        });
    document.querySelectorAll('.input_text').forEach((input) => {
        input.addEventListener('focusout', verifyEmptyField);
    });
})


BTN_BRUTO.addEventListener('click', (e) => {
    e.preventDefault()
    BTN_BRUTO.classList.add('active')
    BTN_LIQUIDO.classList.remove('active')
})
BTN_LIQUIDO.addEventListener('click', (e) => {
    e.preventDefault()
    BTN_LIQUIDO.classList.add('active')
    BTN_BRUTO.classList.remove('active')
})
BTN_PRE.addEventListener('click', (e) => {
    e.preventDefault()
    BTN_PRE.classList.add('active')
    BTN_POS.classList.remove('active')
    BTN_FIXADO.classList.remove('active')
})
BTN_POS.addEventListener('click', (e) => {
    e.preventDefault()
    BTN_POS.classList.add('active')
    BTN_PRE.classList.remove('active')
    BTN_FIXADO.classList.remove('active')
})
BTN_FIXADO.addEventListener('click', (e) => {
    e.preventDefault()
    BTN_FIXADO.classList.add('active')
    BTN_PRE.classList.remove('active')
    BTN_POS.classList.remove('active')
})

function catchApiSimulations(yelds, indexings) {
    fetch(`${API_URL}${SIMULATIONS_URL}?${TYPE_YELD}${yelds}&${TYPE_INDEXING}${indexings}`)
        .then((result) => {
            return result.json()
        })
        .then((simulations) => {


            const valor_final_bruto = document.querySelector('#valor_final_bruto')
            const aliquota_ir = document.querySelector('#aliquota_ir')
            const valor_pago_ir = document.querySelector('#valor_pago_ir')
            const valor_final_liquido = document.querySelector('#valor_final_liquido')
            const valor_total_investido = document.querySelector('#valor_total_investido')
            const ganho_liquido = document.querySelector('#ganho_liquido')



            const aliquotaIR = simulations[0].aliquotaIR
            const ganhoLiquido = simulations[0].ganhoLiquido.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            const valorFinalBruto = simulations[0].valorFinalBruto.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            const valorFinalLiquido = simulations[0].valorFinalLiquido.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            const valorPagoIR = simulations[0].valorPagoIR.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            const valorTotalInvestido = simulations[0].valorTotalInvestido.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            const chartDisplay = simulations[0].graficoValores
            const contextCanvas = document.querySelector('.canvas').getContext('2d')

            

            valor_final_bruto.innerHTML = valorFinalBruto
            aliquota_ir.innerHTML = `${aliquotaIR}%`
            valor_pago_ir.innerHTML = valorPagoIR
            valor_final_liquido.innerHTML = valorFinalLiquido
            valor_total_investido.innerHTML = valorTotalInvestido
            ganho_liquido.innerHTML = ganhoLiquido

            

            showChart = new Chart(contextCanvas, {

                type: 'bar',
                data: {
                    labels: Object.keys(chartDisplay.comAporte),
                    datasets: [{
                        label: 'Sem aporte',
                        backgroundColor: '#000',
                        data: Object.values(chartDisplay.semAporte),
                        stack: 'Stack 0'
                    }, {
                        label: 'Com aporte',
                        backgroundColor: '#ED8E53',
                        data: Object.values(chartDisplay.comAporte),
                        stack: 'Stack 0'
                    }]

                },
                options: {
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                            
                        },
                        y: {
                            grid: {
                                display: false
                            },
                            display: false,
                            
                        }
                    },
                    interaction: {
                        intersect: false,
                    },
                    display: false
                }
                

            })
        })
        .catch((error) => {
            console.log(`Erro na requisição: ${error}`)
        });
}

function checkConditionHandler() {

    if (BTN_PRE.classList.contains('active') && BTN_BRUTO.classList.contains('active')) {
        let typeYelds = 'bruto'
        let typeIndexings = 'pre'

        catchApiSimulations(typeYelds, typeIndexings)
    } else if (BTN_POS.classList.contains('active') && BTN_BRUTO.classList.contains('active')) {
        let typeYelds = 'bruto'
        let typeIndexings = 'pos'

        catchApiSimulations(typeYelds, typeIndexings)
    } else if (BTN_FIXADO.classList.contains('active') && BTN_BRUTO.classList.contains('active')) {
        let typeYelds = 'bruto'
        let typeIndexings = 'ipca'

        catchApiSimulations(typeYelds, typeIndexings)
    } else if (BTN_PRE.classList.contains('active') && BTN_LIQUIDO.classList.contains('active')) {
        let typeYelds = 'liquido'
        let typeIndexings = 'pre'

        catchApiSimulations(typeYelds, typeIndexings)
    } else if (BTN_POS.classList.contains('active') && BTN_LIQUIDO.classList.contains('active')) {
        let typeYelds = 'liquido'
        let typeIndexings = 'pos'

        catchApiSimulations(typeYelds, typeIndexings)
    } else if (BTN_FIXADO.classList.contains('active') && BTN_LIQUIDO.classList.contains('active')) {
        let typeYelds = 'liquido'
        let typeIndexings = 'ipca'

        catchApiSimulations(typeYelds, typeIndexings)
    }
}

function verifyEmptyField() {


    if (aporteInicial.value === '' || prazos.value === '' || aporteMensal.value === '' || rentabilidade.value === '') {

        BTN_SIMULAR.setAttribute('disabled', 'disabled')
        BTN_SIMULAR.classList.add('btn_disabled')
    } else {
        BTN_SIMULAR.removeAttribute('disabled', 'disabled')
        BTN_SIMULAR.classList.remove('btn_disabled')
        BTN_SIMULAR.classList.add('btn_enabled')
    }
}
BTN_LIMPA_CAMPOS.addEventListener('click', (e) =>{
    e.preventDefault()

    aporteInicial.value = ''
    prazos.value = ''
    aporteMensal.value = ''
    rentabilidade.value = ''

    BTN_SIMULAR.setAttribute('disabled', 'disabled')
    BTN_SIMULAR.classList.remove('btn_enabled')
    BTN_SIMULAR.classList.add('btn_disabled')
    document.querySelector('.container_resultados').classList.add('results_hidden')
})

BTN_SIMULAR.addEventListener('click', (e) => {
    document.querySelector('.container_resultados').classList.remove('results_hidden')
    if (showChart != null) {
        showChart.destroy();
    }

    e.preventDefault()

    checkConditionHandler()

})